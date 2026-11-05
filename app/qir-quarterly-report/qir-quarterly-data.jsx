'use client';

import * as XLSX from 'xlsx';

// Quarterly progress tracking for QIR items a line (สายงาน) already selected via
// /qir-line-form. The selection itself (ownGroups + the dept proposals it picked)
// lives in window.QLF_STORE / window.QLF_DEPT_SUBMISSIONS — this file only adds the
// ONGOING quarterly progress layer on top of that already-confirmed selection, plus
// its own localStorage-backed draft/submit store (same pattern as qlf-store.jsx).

const QIR_QUARTERLY_YEAR='2568'; // the most recently fully-submitted selection to track
const QIR_QUARTERLY_QUARTERS=[
  {key:'q1',index:0,label:'ไตรมาส 1',range:'ต.ค.-ธ.ค. 2568'},
  {key:'q2',index:1,label:'ไตรมาส 2',range:'ม.ค.-มี.ค. 2569'},
  {key:'q3',index:2,label:'ไตรมาส 3',range:'เม.ย.-มิ.ย. 2569'},
  {key:'q4',index:3,label:'ไตรมาส 4',range:'ก.ค.-ก.ย. 2569',isCurrent:true}
];
const QIR_QUARTERLY_APPROVER={name:'ปราณี มั่นคง',position:'ผู้ช่วยผู้ว่าการดิจิทัลและการสื่อสาร (ดิจิทัล)'};

// Deterministic mock progress curves (cumulative % at the end of each quarter) — picked
// per activity so some finish early (locked at 100 going forward) and some are still
// catching up by the current quarter, same texture as the reference mockup.
const QQ_CURVES=[
  [30,60,100,100],
  [25,55,80,100],
  [0,40,75,100],
  [50,100,100,100],
  [20,45,70,95],
  [35,65,90,100]
];
function qqCurveFor(seed){return QQ_CURVES[seed%QQ_CURVES.length];}

function qqBuildProcesses(){
  const stored=window.QLF_STORE.get(QIR_QUARTERLY_YEAR);
  const list=[];
  (stored&&stored.ownGroups||[]).forEach((g,gi)=>{
    list.push({
      key:'own-'+g.id,
      group:window.QLF_LINE_NAME,
      isOwn:true,
      title:g.proposal,
      processKey:g.processKey,
      activities:g.rows.map((r,ri)=>({id:r.id,name:r.activity,weight:r.weight,curve:qqCurveFor(gi*7+ri*3)}))
    });
  });
  const selectedIds=(stored&&stored.selectedIds)||[];
  let di=0;
  (window.QLF_DEPT_SUBMISSIONS||[]).forEach(sub=>{
    sub.proposals.filter(p=>selectedIds.includes(p.id)).forEach(p=>{
      list.push({
        key:'dept-'+p.id,
        group:sub.dept,
        isOwn:false,
        title:p.proposal,
        processKey:p.processKey,
        activities:p.activities.map((a,ai)=>({id:p.id+'-'+ai,name:a.name,weight:a.weight,curve:qqCurveFor((di+1)*5+ai*2)}))
      });
      di++;
    });
  });
  return list;
}

// A quarter is "locked done" for an activity once its curve already reached 100% in an
// earlier quarter — same rule as the reference mockup (prev value === 100).
function qqValueAt(activity,qIndex){return activity.curve[qIndex];}
function qqIsLocked(activity,qIndex){return qIndex>0&&activity.curve[qIndex-1]===100;}
function qqWeightedTotal(activity,qIndex){return activity.weight*qqValueAt(activity,qIndex)/100;}
function qqProcessTotal(process,qIndex){
  return Math.round(process.activities.reduce((s,a)=>s+qqWeightedTotal(a,qIndex),0));
}

function qqKey(year){return 'qq_quarterly_'+year;}
function qqGetAll(year){try{const raw=localStorage.getItem(qqKey(year));return raw?JSON.parse(raw):{};}catch(e){return {};}}
function qqNow(){
  const d=new Date();
  const p=n=>String(n).padStart(2,'0');
  return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+(d.getFullYear()+543)+' '+p(d.getHours())+':'+p(d.getMinutes());
}
// Per (process, quarter) saved record: {status:'draft'|'submitted', values:{activityId:number},
// narrative, effectiveness:{before,after,gain} (q4 only), reportedBy, reportedAt, approvedBy, approvedAt}
function qqGet(year,processKey,quarterKey){
  const all=qqGetAll(year);
  return (all[processKey]&&all[processKey][quarterKey])||null;
}
function qqSave(year,processKey,quarterKey,record){
  const all=qqGetAll(year);
  all[processKey]=all[processKey]||{};
  all[processKey][quarterKey]=record;
  try{localStorage.setItem(qqKey(year),JSON.stringify(all));}catch(e){}
  return record;
}

// Seeds ไตรมาส 1-3 as already-reported history for every process, so the overview has
// real-looking data to show and the current quarter's form has a "ไตรมาสก่อน" baseline —
// only when nothing is saved for that year yet, same guard as qlf-store's own seed.
function qqSeedHistory(){
  try{
    const processes=qqBuildProcesses();
    const all=qqGetAll(QIR_QUARTERLY_YEAR);
    if(Object.keys(all).length>0)return;
    processes.forEach((p,pi)=>{
      [0,1,2].forEach(qIndex=>{
        const q=QIR_QUARTERLY_QUARTERS[qIndex];
        const values={};
        p.activities.forEach(a=>{values[a.id]=qqValueAt(a,qIndex);});
        const approved=!(pi===1&&qIndex===2); // one deliberate "รอรับรอง" example, matching the reference mock
        qqSave(QIR_QUARTERLY_YEAR,p.key,q.key,{
          status:'submitted',values,
          narrative:'ดำเนินการตามแผนงาน'+q.label+'ตามที่กำหนดไว้ ไม่มีประเด็นติดขัด',
          effectiveness:null,
          reportedBy:window.LF_CURRENT_USER?window.LF_CURRENT_USER.name:'-',reportedAt:q.range,
          approvedBy:approved?QIR_QUARTERLY_APPROVER.name:null,approvedAt:approved?q.range:null
        });
      });
    });
  }catch(e){}
}

// One row per (process, quarter) — the flat shape reads better in a spreadsheet than
// trying to reproduce the overview grid's own layout.
function qqExportExcel(processes,quarters){
  const rows=[];
  processes.forEach(p=>{
    quarters.forEach(q=>{
      const rec=qqGet(QIR_QUARTERLY_YEAR,p.key,q.key);
      const total=rec?qqProcessTotal(p,q.index):null;
      rows.push({
        'หน่วยงาน/สายงาน':p.isOwn?window.QLF_LINE_NAME:p.group,
        'กระบวนการ / ข้อเสนอ QIR':p.title,
        'ไตรมาส':q.label,
        'ช่วงเวลา':q.range,
        'ความคืบหน้า (%)':total===null?'':total,
        'สถานะ':!rec?'ยังไม่ถึงรอบ':(rec.approvedBy?'รับรองแล้ว':'รอรับรอง'),
        'รายละเอียดผลการดำเนินงาน':rec?rec.narrative:'',
        'ผู้รายงาน':rec?rec.reportedBy:'',
        'วันที่รายงาน':rec?rec.reportedAt:'',
        'ผู้รับรอง':rec&&rec.approvedBy?rec.approvedBy:'',
        'วันที่รับรอง':rec&&rec.approvedAt?rec.approvedAt:''
      });
    });
  });
  const ws=XLSX.utils.json_to_sheet(rows);
  ws['!cols']=[{wch:26},{wch:44},{wch:10},{wch:16},{wch:14},{wch:12},{wch:40},{wch:18},{wch:14},{wch:18},{wch:14}];
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,'รายไตรมาส');
  XLSX.writeFile(wb,'รายงานผล QIR รายไตรมาส ปี '+QIR_QUARTERLY_YEAR+'.xlsx');
}

Object.assign(window,{
  QIR_QUARTERLY_YEAR,QIR_QUARTERLY_QUARTERS,QIR_QUARTERLY_APPROVER,
  qqBuildProcesses,qqValueAt,qqIsLocked,qqWeightedTotal,qqProcessTotal,qqNow,qqExportExcel,
  QQ_STORE:{get:qqGet,save:qqSave}
});
qqSeedHistory();
