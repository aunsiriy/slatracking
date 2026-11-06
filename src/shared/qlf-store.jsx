'use client';

// Persistence for the QIR annual selection flow, shared by two scopes that use the
// exact same wizard (/qir-line-form) and overview (/qir-line-overview) but pick from a
// different set of units: "line" (สายงาน, picking from its ฝ่าย) and "zone" (เขต,
// picking from its 3 ฝ่าย + 1 กอง). A submitted yearly selection — the picked unit
// proposals, the scope's own QIR groups, the submit date and an edit-history log — is
// kept in localStorage keyed by scope+year. Exposed as window.QLF_STORE, whose
// get/save take an optional scope argument (defaults to 'line' for every existing
// call site that predates the zone scope).
//
// The scope names and their per-unit proposal catalogs also live here (not just in
// qir-line-app.jsx) so the quarterly progress report page can resolve a line
// submission's selectedIds back into full proposal + activity data too.

const QLF_LINE_NAME='สายงานดิจิทัลและการสื่อสาร';
const QLF_DEPT_SUBMISSIONS=[
  {id:'fpj',dept:'ฝ่ายพัฒนาระบบดิจิทัล (ฝพจ.)',proposals:[
    {id:'fpj-1',proposal:'ปรับปรุงตัวชี้วัดกระบวนการให้สะท้อนประสิทธิภาพและครอบคลุมผลลัพธ์',processKey:'s131',
     activities:[
       {name:'จัดทำแนวทางปรับปรุงตัวชี้วัดกระบวนการ',weight:50},
       {name:'สื่อสารและอบรมการใช้ตัวชี้วัดชุดใหม่ให้หน่วยงานในสังกัด',weight:50}
     ]},
    {id:'fpj-2',proposal:'ลดระยะเวลาการอนุมัติงานพัฒนาระบบด้วยเวิร์กโฟลว์ดิจิทัล',processKey:'s132',
     activities:[
       {name:'ออกแบบเวิร์กโฟลว์อนุมัติอิเล็กทรอนิกส์',weight:60},
       {name:'นำร่องใช้งานกับ 2 กระบวนการหลัก',weight:40}
     ]}
  ]},
  {id:'fdk',dept:'ฝ่ายกลยุทธ์ดิจิทัลและบริหารจัดการข้อมูล (ฝดข.)',proposals:[
    {id:'fdk-1',proposal:'ยกระดับการบูรณาการข้อมูลระหว่างระบบให้เป็นมาตรฐานเดียวกัน',processKey:'s132',
     activities:[
       {name:'ทบทวนสถาปัตยกรรมข้อมูลองค์กรและจัดทำ Data Catalog กลาง',weight:60},
       {name:'กำหนดมาตรฐานการแลกเปลี่ยนข้อมูลระหว่างระบบ',weight:40}
     ]}
  ]},
  {id:'fpd',dept:'ฝ่ายปฏิบัติการและบำรุงรักษาระบบดิจิทัล (ฝปด.)',proposals:[
    {id:'fpd-1',proposal:'รวมศูนย์การเฝ้าระวังและแจ้งเตือนระบบให้ตอบสนองได้เร็วขึ้น',processKey:'s131',
     activities:[
       {name:'รวมศูนย์การเฝ้าระวังและแจ้งเตือนระบบ (Monitoring & Alerting)',weight:100}
     ]}
  ]},
  {id:'frs',dept:'ฝ่ายระบบสื่อสาร (ฝรส.)',proposals:[
    {id:'frs-1',proposal:'จัดทำมาตรฐานการเชื่อมต่อโครงข่ายสื่อสารภายใน',processKey:'s132',
     activities:[
       {name:'จัดทำเอกสารมาตรฐานการเชื่อมต่อโครงข่ายสื่อสาร',weight:100}
     ]},
    {id:'frs-2',proposal:'ยกระดับความมั่นคงปลอดภัยของโครงข่ายสื่อสาร',processKey:'s132',
     activities:[
       {name:'ประเมินช่องโหว่และจัดทำแผนป้องกันเชิงรุก',weight:40},
       {name:'ติดตั้งระบบเฝ้าระวังภัยคุกคามโครงข่าย',weight:60}
     ]}
  ]}
];

// เขต — 3 ฝ่าย + 1 กอง ทุกเขตมีโครงสร้างหน่วยงานเดียวกัน (ตาม org-tree-data.js)
// ใช้เขต 2 (ภาคเหนือ) จังหวัดพิษณุโลก เป็นตัวอย่างสำหรับ demo นี้
const QLF_ZONE_NAME='การไฟฟ้าส่วนภูมิภาค เขต 2 (ภาคเหนือ) จังหวัดพิษณุโลก';
const QLF_ZONE_UNIT_SUBMISSIONS=[
  {id:'fob',dept:'ฝ่ายปฏิบัติการและบำรุงรักษา',proposals:[
    {id:'fob-1',proposal:'ลดระยะเวลาการแก้ไขไฟฟ้าขัดข้องด้วยระบบแจ้งเตือนอัตโนมัติ',processKey:'s131',
     activities:[
       {name:'จัดทำระบบแจ้งเตือนจุดเกิดเหตุไฟฟ้าขัดข้องแบบเรียลไทม์',weight:60},
       {name:'ฝึกอบรมทีมปฏิบัติการให้ตอบสนองตามมาตรฐานเวลาใหม่',weight:40}
     ]},
    {id:'fob-2',proposal:'ปรับปรุงแผนบำรุงรักษาเชิงป้องกันให้ครอบคลุมอุปกรณ์เสี่ยงสูง',processKey:'s132',
     activities:[
       {name:'จัดทำบัญชีอุปกรณ์เสี่ยงสูงและจัดลำดับความสำคัญ',weight:50},
       {name:'ปรับปฏิทินบำรุงรักษาเชิงป้องกันตามความเสี่ยง',weight:50}
     ]}
  ]},
  {id:'feb',dept:'ฝ่ายวิศวกรรมและบริการ',proposals:[
    {id:'feb-1',proposal:'ลดระยะเวลาติดตั้งมิเตอร์ให้ผู้ใช้ไฟรายใหม่',processKey:'s131',
     activities:[
       {name:'ปรับขั้นตอนขออนุมัติแบบก่อสร้างให้เป็นดิจิทัล',weight:55},
       {name:'จัดทีมติดตั้งเฉพาะกิจรองรับช่วงเร่งด่วน',weight:45}
     ]}
  ]},
  {id:'fsa',dept:'ฝ่ายสนับสนุนการบริหารงาน',proposals:[
    {id:'fsa-1',proposal:'ลดระยะเวลาการเบิกจ่ายพัสดุให้หน่วยปฏิบัติการ',processKey:'s132',
     activities:[
       {name:'ทบทวนขั้นตอนการอนุมัติเบิกพัสดุให้กระชับขึ้น',weight:50},
       {name:'นำระบบเบิกพัสดุออนไลน์มาใช้กับหน่วยงานในเขต',weight:50}
     ]}
  ]},
  {id:'ksk',dept:'กองสนับสนุนงานเขต',proposals:[
    {id:'ksk-1',proposal:'ยกระดับการสื่อสารและประสานงานระหว่างหน่วยงานภายในเขต',processKey:'s131',
     activities:[
       {name:'จัดทำช่องทางประสานงานกลางระหว่างฝ่ายในเขต',weight:100}
     ]}
  ]}
];

// Both scopes the /qir-line-form wizard and /qir-line-overview page can run under.
const QLF_SCOPES={
  line:{key:'line',label:'สายงาน',name:QLF_LINE_NAME,submissions:QLF_DEPT_SUBMISSIONS},
  zone:{key:'zone',label:'เขต',name:QLF_ZONE_NAME,submissions:QLF_ZONE_UNIT_SUBMISSIONS}
};

function qlfProcessLabel(key){const p=(window.LF_BA_PROCESS_OPTIONS||[]).find(x=>x.key===key);return p?p.label:key;}

function qlfKey(year,scope){return 'qlf_submission_'+(scope||'line')+'_'+year;}

function qlfNow(){
  const d=new Date();
  const p=n=>String(n).padStart(2,'0');
  return p(d.getDate())+'/'+p(d.getMonth()+1)+'/'+(d.getFullYear()+543)+' '+p(d.getHours())+':'+p(d.getMinutes());
}

function qlfGet(year,scope){
  try{const raw=localStorage.getItem(qlfKey(year,scope));return raw?JSON.parse(raw):null;}catch(e){return null;}
}

// Who performed the action, for the ผู้ดำเนินการ / ตำแหน่ง-สังกัด columns of the history log.
function qlfActor(scope){
  try{
    const u=(typeof window!=='undefined')?window.LF_CURRENT_USER:null;
    if(!u)return {by:'-',role:'-'};
    return {by:u.name,role:u.position+' · ผู้คัดเลือก QIR '+(QLF_SCOPES[scope||'line']||QLF_SCOPES.line).label};
  }catch(e){return {by:'-',role:'-'};}
}

// isEdit=false -> first submission; isEdit=true -> a later edit of a submission.
function qlfSave(year,payload,isEdit,scope){
  const existing=qlfGet(year,scope)||{};
  const at=qlfNow();
  const actor=qlfActor(scope);
  const history=(existing.history||[]).concat([{action:isEdit?'แก้ไขข้อมูล':'ส่งคัดเลือก',at,by:actor.by,role:actor.role}]);
  const rec={
    status:'submitted',
    selectedIds:(payload&&payload.selectedIds)||[],
    ownGroups:(payload&&payload.ownGroups)||[],
    submittedAt:existing.submittedAt||at,
    lastEditedAt:isEdit?at:(existing.lastEditedAt||null),
    history
  };
  try{localStorage.setItem(qlfKey(year,scope),JSON.stringify(rec));}catch(e){}
  return rec;
}

// Seed the mock "already submitted" years so the demo has data to view.
const QLF_SEED={
  '2568':{selectedIds:['fpj-1','fpj-2','fdk-1','fpd-1','frs-1','frs-2'],
    ownGroups:[
      {id:1,proposal:'บูรณาการระบบติดตามผล SLA ระดับสายงานให้เป็นแดชบอร์ดเดียว',processKey:'s131',rows:[{id:11,activity:'รวบรวมความต้องการจากฝ่ายในสังกัด',weight:40},{id:12,activity:'พัฒนาแดชบอร์ดต้นแบบและนำร่องใช้งาน',weight:60}]},
      {id:2,proposal:'ยกระดับมาตรฐานความมั่นคงปลอดภัยข้อมูลระดับสายงาน',processKey:'s132',rows:[{id:21,activity:'ประเมินความเสี่ยงและช่องโหว่ทั้งสายงาน',weight:50},{id:22,activity:'จัดทำแนวปฏิบัติกลางและอบรมบุคลากร',weight:50}]}
    ],submittedAt:'05/10/2568 10:20',
    history:[
      {action:'ส่งคัดเลือก',at:'05/10/2568 10:20',by:'ญาณิศา อุ่นศิริ',role:'นักวิเคราะห์นโยบายและแผน 5 · ผู้คัดเลือก QIR สายงาน'},
      {action:'แก้ไขข้อมูล',at:'14/10/2568 09:05',by:'ญาณิศา อุ่นศิริ',role:'นักวิเคราะห์นโยบายและแผน 5 · ผู้คัดเลือก QIR สายงาน'}
    ],lastEditedAt:'14/10/2568 09:05'},
  '2567':{selectedIds:['fpj-1','fdk-1','fpd-1','frs-1','frs-2'],
    ownGroups:[{id:1,proposal:'ลดขั้นตอนการอนุมัติงานข้ามฝ่ายด้วยระบบดิจิทัล',processKey:'s131',rows:[{id:11,activity:'ออกแบบเวิร์กโฟลว์อนุมัติกลางของสายงาน',weight:100}]}],
    submittedAt:'28/09/2567 14:05',
    history:[{action:'ส่งคัดเลือก',at:'28/09/2567 14:05',by:'ญาณิศา อุ่นศิริ',role:'นักวิเคราะห์นโยบายและแผน 5 · ผู้คัดเลือก QIR สายงาน'}],lastEditedAt:null},
  '2566':{selectedIds:['fpj-1','fdk-1','fpd-1','frs-1'],ownGroups:[],submittedAt:'01/10/2566 09:30',
    history:[{action:'ส่งคัดเลือก',at:'01/10/2566 09:30',by:'ปิยวัฒน์ อนุกูลสวัสดิ์',role:'วิศวกรไฟฟ้า 5 · ผู้คัดเลือก QIR สายงาน'}],lastEditedAt:null}
};

// Seed the zone scope's own (smaller) history, same shape as QLF_SEED.
const QLF_ZONE_SEED={
  '2568':{selectedIds:['fob-1','fob-2','feb-1','ksk-1'],
    ownGroups:[
      {id:1,proposal:'ยกระดับมาตรฐานความปลอดภัยในการทำงานของหน่วยปฏิบัติการทั้งเขต',processKey:'s131',rows:[{id:11,activity:'ทบทวนและอบรมมาตรฐานความปลอดภัยให้ทุกฝ่ายในเขต',weight:100}]}
    ],submittedAt:'03/10/2568 09:40',
    history:[{action:'ส่งคัดเลือก',at:'03/10/2568 09:40',by:'ดำรงค์ ศักดิ์สิทธิ์',role:'ผู้ช่วยผู้ว่าการเขต · ผู้คัดเลือก QIR เขต'}],lastEditedAt:null},
  '2567':{selectedIds:['fob-1','feb-1','fsa-1'],ownGroups:[],submittedAt:'25/09/2567 13:15',
    history:[{action:'ส่งคัดเลือก',at:'25/09/2567 13:15',by:'ดำรงค์ ศักดิ์สิทธิ์',role:'ผู้ช่วยผู้ว่าการเขต · ผู้คัดเลือก QIR เขต'}],lastEditedAt:null}
};

function qlfSeedOne(key,seed){
  try{
    Object.keys(seed).forEach(y=>{
      if(localStorage.getItem(key(y)))return;
      const s=seed[y];
      localStorage.setItem(key(y),JSON.stringify({
        status:'submitted',
        selectedIds:s.selectedIds,
        ownGroups:s.ownGroups,
        submittedAt:s.submittedAt,
        lastEditedAt:s.lastEditedAt,
        history:s.history
      }));
    });
  }catch(e){}
}

function qlfSeed(){
  qlfSeedOne(y=>qlfKey(y,'line'),QLF_SEED);
  qlfSeedOne(y=>qlfKey(y,'zone'),QLF_ZONE_SEED);
}

if(typeof window!=='undefined'){
  qlfSeed();
  window.QLF_STORE={get:qlfGet,save:qlfSave,now:qlfNow};
  Object.assign(window,{QLF_LINE_NAME,QLF_DEPT_SUBMISSIONS,QLF_ZONE_NAME,QLF_ZONE_UNIT_SUBMISSIONS,QLF_SCOPES,qlfProcessLabel});
}
