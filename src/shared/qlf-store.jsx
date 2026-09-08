'use client';

// Persistence for the QIR สายงาน (line QIR) selection flow.
// This is a front-end prototype, so a submitted yearly selection — the
// picked dept proposals, the line's own QIR groups, the submit date and
// an edit-history log — is kept in localStorage keyed by year. Exposed as
// window.QLF_STORE.

function qlfKey(year){return 'qlf_submission_'+year;}

function qlfNow(){
  const d=new Date();
  const p=n=>String(n).padStart(2,'0');
  return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+(d.getFullYear()+543)+' '+p(d.getHours())+':'+p(d.getMinutes());
}

function qlfGet(year){
  try{const raw=localStorage.getItem(qlfKey(year));return raw?JSON.parse(raw):null;}catch(e){return null;}
}

// isEdit=false -> first submission; isEdit=true -> a later edit of a submission.
function qlfSave(year,payload,isEdit){
  const existing=qlfGet(year)||{};
  const at=qlfNow();
  const history=(existing.history||[]).concat([{action:isEdit?'แก้ไขข้อมูล':'ส่งคัดเลือก',at}]);
  const rec={
    status:'submitted',
    selectedIds:(payload&&payload.selectedIds)||[],
    ownGroups:(payload&&payload.ownGroups)||[],
    submittedAt:existing.submittedAt||at,
    lastEditedAt:isEdit?at:(existing.lastEditedAt||null),
    history
  };
  try{localStorage.setItem(qlfKey(year),JSON.stringify(rec));}catch(e){}
  return rec;
}

// Seed the mock "already submitted" years so the demo has data to view.
const QLF_SEED={
  '2568':{selectedIds:['fpj-1','fpj-2','fdk-1','fpd-1','frs-1','frs-2'],
    ownGroups:[
      {id:1,proposal:'บูรณาการระบบติดตามผล SLA ระดับสายงานให้เป็นแดชบอร์ดเดียว',processKey:'s131',rows:[{id:11,activity:'รวบรวมความต้องการจากฝ่ายในสังกัด',weight:40},{id:12,activity:'พัฒนาแดชบอร์ดต้นแบบและนำร่องใช้งาน',weight:60}]},
      {id:2,proposal:'ยกระดับมาตรฐานความมั่นคงปลอดภัยข้อมูลระดับสายงาน',processKey:'s132',rows:[{id:21,activity:'ประเมินความเสี่ยงและช่องโหว่ทั้งสายงาน',weight:50},{id:22,activity:'จัดทำแนวปฏิบัติกลางและอบรมบุคลากร',weight:50}]}
    ],submittedAt:'05/10/2568 10:20'},
  '2567':{selectedIds:['fpj-1','fdk-1','fpd-1','frs-1','frs-2'],
    ownGroups:[{id:1,proposal:'ลดขั้นตอนการอนุมัติงานข้ามฝ่ายด้วยระบบดิจิทัล',processKey:'s131',rows:[{id:11,activity:'ออกแบบเวิร์กโฟลว์อนุมัติกลางของสายงาน',weight:100}]}],
    submittedAt:'28/09/2567 14:05'},
  '2566':{selectedIds:['fpj-1','fdk-1','fpd-1','frs-1'],ownGroups:[],submittedAt:'01/10/2566 09:30'}
};

function qlfSeed(){
  try{
    Object.keys(QLF_SEED).forEach(y=>{
      if(localStorage.getItem(qlfKey(y)))return;
      const s=QLF_SEED[y];
      localStorage.setItem(qlfKey(y),JSON.stringify({
        status:'submitted',
        selectedIds:s.selectedIds,
        ownGroups:s.ownGroups,
        submittedAt:s.submittedAt,
        lastEditedAt:null,
        history:[{action:'ส่งคัดเลือก',at:s.submittedAt}]
      }));
    });
  }catch(e){}
}

if(typeof window!=='undefined'){
  qlfSeed();
  window.QLF_STORE={get:qlfGet,save:qlfSave,now:qlfNow};
}
