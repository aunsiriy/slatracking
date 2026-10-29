const SLA_REPORT_PERIOD={name:'กรกฎาคม 2569',deadline:'20 ก.ค. 2569'};
const SLA_REPORT_QUARTER_PERIOD={name:'ไตรมาส 3/2569',deadline:'15 ก.ย. 2569'};
// assignedReportType mocks the admin's per-department assignment: a department is
// assigned exactly one report type (monthly SLA or quarterly process metrics) — never both.
const SLA_REPORT_DEPT={name:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',assignedReportType:'monthly'};
const SLA_REPORT_RECORDER='วิภาวี ศรีสุข';

const MONTH_HISTORY_LABELS=['ม.ค. 2569','ก.พ. 2569','มี.ค. 2569','เม.ย. 2569','พ.ค. 2569','มิ.ย. 2569'];
const MONTH_HISTORY_MONTHNUM=[1,2,3,4,5,6];
const QUARTER_HISTORY_LABELS=['Q1/2569','Q2/2569'];
// quarterly rounds are confirmed the month after each quarter closes (Q1 ends มี.ค. -> confirmed เม.ย., Q2 ends มิ.ย. -> confirmed ก.ค.)
const QUARTER_HISTORY_MONTHNUM=[4,7];
// one deliberately negative slot (มี.ค.) so the "ไม่ผ่าน SLA" period status has a real example to show
const HISTORY_VARIANTS=[1,2,-5,3,1,2];
// day-of-month the round was first confirmed — mixed on-time (<=15) and late (>15) so the
// "ตรงเวลา" (timeliness) demo has real examples of both, independent of the ผ่าน/ไม่ผ่าน result above
const CONFIRM_DAY_VARIANTS=[12,16,9,14,15,18];

function genHistory(target,labels,monthNums){
 return labels.map((period,i)=>{
  const result=Math.max(0,Math.min(100,Number(target)+HISTORY_VARIANTS[i%HISTORY_VARIANTS.length]));
  const unit=period.startsWith('Q')?'ไตรมาส':'เดือน';
  const confirmMonth=monthNums[i%monthNums.length];
  const confirmDay=CONFIRM_DAY_VARIANTS[i%CONFIRM_DAY_VARIANTS.length];
  const confirmedAt='2026-'+String(confirmMonth).padStart(2,'0')+'-'+String(confirmDay).padStart(2,'0')+'T10:00:00+07:00';
  return {period,result,target:Number(target),outcome:result>=Number(target)?'pass':'fail',recorder:SLA_REPORT_RECORDER,reported:true,confirmedAt,
   detail:'ดำเนินการตามแผนงานประจำ'+unit+'นี้ครบถ้วน ตรวจสอบและบันทึกผลตามรอบที่กำหนด'};
 });
}

// A reported period's dot/label is an aggregate of every item's outcome that round:
// any single failed item makes the whole period "ไม่ผ่าน SLA".
function periodOutcome(itemsWithHistory,roundIndex){
 return itemsWithHistory.every(it=>it.history[roundIndex].outcome==='pass')?'pass':'fail';
}

// Seed a single "ยืนยันครั้งแรก" audit-log entry for items that start out already submitted,
// so the "ประวัติการแก้ไข" panel has something real to show immediately.
function genSeedLog(item,confirmedAt){
 const entries=[{field:'result',oldValue:'',newValue:item.result,editedBy:item.preparer,editedAt:confirmedAt}];
 if(item.detail)entries.push({field:'detail',oldValue:'',newValue:item.detail,editedBy:item.preparer,editedAt:confirmedAt});
 if(item.improvement)entries.push({field:'improvement',oldValue:'',newValue:item.improvement,editedBy:item.preparer,editedAt:confirmedAt});
 return entries;
}

// Report-status model: exactly 3 values — not_reported / overdue / submitted (ยังไม่รายงาน /
// รายงานเกินกำหนด / รายงานแล้ว). There is no separate "returned/ถูกคืนแก้ไข" status: a
// confirmed item can simply be edited again by anyone on its authorizedPreparers list — see
// ReportPanel's edit-after-confirm flow. Pass/fail (ผลลัพธ์) stays a wholly separate axis,
// computed from result vs target, never folded into this status.
const SLA_REPORT_ITEMS_RAW=[
{id:1,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',
 slaName:'ระยะเวลาติดตั้งมิเตอร์ใหม่ไม่เกิน 5 วันทำการ',customer:'ผู้ขอใช้ไฟรายใหม่ (ครัวเรือน/ธุรกิจ)',
 target:95,source:'ระบบ PEA Smart Service (รายงานอัตโนมัติ)',status:'overdue',result:'',detail:'',improvement:'',preparer:'',
 authorizedPreparers:['60417','60721'],first_confirmed_at:null,historyLog:[],
 dueDate:'20 ก.ค. 2569'},
{id:2,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.5',level1Label:'กระบวนการแก้ไขไฟฟ้าขัดข้อง',
 slaName:'ระยะเวลาแก้ไขไฟฟ้าขัดข้องเฉลี่ยไม่เกิน 2 ชั่วโมง',customer:'ผู้ใช้ไฟทุกประเภทในเขตพื้นที่',
 target:90,source:'ระบบ Call Center 1129 + Log งานซ่อม',status:'submitted',result:'93',
 detail:'ตรวจสอบระยะเวลาเฉลี่ยจาก Log งานซ่อมทุกกรณีในเดือนนี้ อยู่ในเกณฑ์ที่กำหนด',improvement:'',preparer:'60417',
 authorizedPreparers:['60417','602385'],first_confirmed_at:'2026-07-15T09:12:00+07:00',
 dueDate:'20 ก.ค. 2569'},
{id:3,level0:'S2',level0Label:'ระบบงานปฏิบัติการระบบไฟฟ้า',level1:'S2.1',level1Label:'กระบวนการบำรุงรักษาระบบจำหน่าย',
 slaName:'อัตราไฟดับเฉลี่ยต่อราย (SAIFI) ไม่เกินเกณฑ์มาตรฐาน',customer:'ผู้ใช้ไฟในพื้นที่รับผิดชอบ',
 target:92,source:'ระบบ OMS (Outage Management System)',status:'submitted',result:'86',
 detail:'ดำเนินการบำรุงรักษาเชิงป้องกันครบตามแผน แต่มีเหตุขัดข้องจากพายุฝนในพื้นที่ 3 ครั้ง',
 improvement:'ปรับแผนจัดสรรทีมช่างเพิ่มเติม และแนบรายงานเหตุขัดข้องรายครั้งประกอบ',preparer:'60417',
 authorizedPreparers:['60417'],first_confirmed_at:'2026-07-16T14:05:00+07:00',
 dueDate:'20 ก.ค. 2569'},
{id:4,level0:'S3',level0Label:'ระบบงานบริหารลูกค้าสัมพันธ์',level1:'S3.2',level1Label:'กระบวนการตอบข้อร้องเรียน',
 slaName:'อัตราความพึงพอใจลูกค้าต่อการตอบข้อร้องเรียน',customer:'ลูกค้าที่ยื่นข้อร้องเรียน',
 target:88,source:'แบบสอบถามความพึงพอใจ (E-Survey)',status:'submitted',result:'84',
 detail:'ปิดข้อร้องเรียนได้ตามกำหนดเวลา แต่คะแนนความพึงพอใจเฉลี่ยยังต่ำกว่าเป้าหมายเล็กน้อย',
 improvement:'อยู่ระหว่างจัดอบรมทักษะการสื่อสารเพิ่มเติมให้เจ้าหน้าที่รับเรื่อง',preparer:'60721',
 authorizedPreparers:['60721','602385'],first_confirmed_at:'2026-07-14T11:30:00+07:00',
 dueDate:'20 ก.ค. 2569'},
{id:5,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.4',level1Label:'กระบวนการจดหน่วยและคำนวณค่าไฟฟ้า',
 slaName:'ความถูกต้องของการจดหน่วยไฟฟ้าไม่น้อยกว่าร้อยละ 99',customer:'ผู้ใช้ไฟทุกประเภทในเขตพื้นที่',
 target:99,source:'ระบบจัดเก็บข้อมูลหน่วยไฟฟ้า (AMR/MDM)',status:'not_reported',result:'',detail:'',improvement:'',preparer:'',
 authorizedPreparers:['60417','60721'],first_confirmed_at:null,historyLog:[],
 dueDate:'25 ก.ค. 2569'},
{id:6,level0:'S3',level0Label:'ระบบงานบริหารลูกค้าสัมพันธ์',level1:'S3.3',level1Label:'กระบวนการให้บริการผ่านดิจิทัล (PEA Smart Plus)',
 slaName:'ร้อยละคำขอผ่าน PEA Smart Plus ที่ดำเนินการแล้วเสร็จตามกำหนด',customer:'ผู้ใช้บริการผ่านแอปพลิเคชัน PEA Smart Plus',
 target:90,source:'ระบบ PEA Smart Plus (รายงานอัตโนมัติ)',status:'submitted',result:'96',
 detail:'คำขอผ่านแอปพลิเคชันดำเนินการแล้วเสร็จตามกำหนดเวลาครบถ้วนเกือบทั้งหมด',improvement:'',preparer:'60417',
 authorizedPreparers:['60417','602385'],first_confirmed_at:'2026-07-13T16:40:00+07:00',
 dueDate:'20 ก.ค. 2569'}
];

const SLA_REPORT_ITEMS=SLA_REPORT_ITEMS_RAW.map(it=>{
 const withHistory={...it,history:genHistory(it.target,MONTH_HISTORY_LABELS,MONTH_HISTORY_MONTHNUM)};
 if(withHistory.status==='submitted'&&!withHistory.historyLog){
  withHistory.historyLog=genSeedLog(withHistory,withHistory.first_confirmed_at);
 }
 return withHistory;
});
// S1.3 also missed filing its มี.ค. round — demonstrates the "ยังไม่รายงาน" state in the
// history table (consistent with it being late again on the current ก.ค. round too).
{
 const s13=SLA_REPORT_ITEMS.find(it=>it.id===1);
 if(s13)s13.history[2]={...s13.history[2],reported:false,confirmedAt:null};
}

const SLA_REPORT_QUARTERLY_ITEMS_RAW=[
{id:101,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',
 metricName:'อัตราความถูกต้องของข้อมูลติดตั้งมิเตอร์ในระบบ',target:96,source:'ระบบตรวจสอบคุณภาพข้อมูล (Data QA)',status:'not_reported',result:'',detail:'',improvement:'',preparer:'',
 authorizedPreparers:['60417','60721'],first_confirmed_at:null,historyLog:[],
 dueDate:'15 ก.ย. 2569'},
{id:102,level0:'S2',level0Label:'ระบบงานปฏิบัติการระบบไฟฟ้า',level1:'S2.1',level1Label:'กระบวนการบำรุงรักษาระบบจำหน่าย',
 metricName:'อัตราการดำเนินการบำรุงรักษาเชิงป้องกันตามแผนไตรมาส',target:90,source:'แผนบำรุงรักษาประจำปี (PM Plan)',status:'submitted',result:'92',detail:'ดำเนินการบำรุงรักษาเชิงป้องกันครบตามแผนไตรมาสนี้',improvement:'',preparer:'60417',
 authorizedPreparers:['60417','602385'],first_confirmed_at:'2026-07-16T10:00:00+07:00',
 dueDate:'15 ก.ย. 2569'},
{id:103,level0:'S3',level0Label:'ระบบงานบริหารลูกค้าสัมพันธ์',level1:'S3.2',level1Label:'กระบวนการตอบข้อร้องเรียน',
 metricName:'อัตราการปิดข้อร้องเรียนซ้ำภายในไตรมาส',target:85,source:'ระบบบริหารข้อร้องเรียน (CRM)',status:'submitted',result:'78',
 detail:'ปิดข้อร้องเรียนซ้ำได้ตามเป้าหมายในสองเดือนแรก แต่เดือนสุดท้ายมีเคสสะสมเพิ่มขึ้น',
 improvement:'ระบุสาเหตุที่ยอดข้อร้องเรียนซ้ำเพิ่มขึ้นในเดือนสุดท้าย และวางแผนติดตามเพิ่มเติม',preparer:'60417',
 authorizedPreparers:['60417'],first_confirmed_at:'2026-07-17T13:20:00+07:00',
 dueDate:'15 ก.ย. 2569'}
];

const SLA_REPORT_QUARTERLY_ITEMS=SLA_REPORT_QUARTERLY_ITEMS_RAW.map(it=>{
 const withHistory={...it,history:genHistory(it.target,QUARTER_HISTORY_LABELS,QUARTER_HISTORY_MONTHNUM)};
 if(withHistory.status==='submitted'&&!withHistory.historyLog){
  withHistory.historyLog=genSeedLog(withHistory,withHistory.first_confirmed_at);
 }
 return withHistory;
});

// Period-bar status model: a reported round is either "pass" (ผ่าน SLA, green) or
// "fail" (ไม่ผ่าน SLA, red) based on the aggregate outcome above. The current round
// shows "overdue" (เลยกำหนด, red) once its deadline has passed while items are still
// pending. Every round, including ones still ahead, stays open to click into —
// "upcoming" just means no data has been filed for it yet.
const SLA_REPORT_PERIODS_MONTHLY=[
{key:'jan',label:'ม.ค.',status:periodOutcome(SLA_REPORT_ITEMS,0)},
{key:'feb',label:'ก.พ.',status:periodOutcome(SLA_REPORT_ITEMS,1)},
{key:'mar',label:'มี.ค.',status:periodOutcome(SLA_REPORT_ITEMS,2)},
{key:'apr',label:'เม.ย.',status:periodOutcome(SLA_REPORT_ITEMS,3)},
{key:'may',label:'พ.ค.',status:periodOutcome(SLA_REPORT_ITEMS,4)},
{key:'jun',label:'มิ.ย.',status:periodOutcome(SLA_REPORT_ITEMS,5)},
{key:'jul',label:'ก.ค.',status:'overdue',isCurrent:true,pendingCount:3},
{key:'aug',label:'ส.ค.',status:'upcoming'},
{key:'sep',label:'ก.ย.',status:'upcoming'},
{key:'oct',label:'ต.ค.',status:'upcoming'},
{key:'nov',label:'พ.ย.',status:'upcoming'},
{key:'dec',label:'ธ.ค.',status:'upcoming'}
];

const SLA_REPORT_PERIODS_QUARTERLY=[
{key:'q1',label:'Q1',range:'ม.ค. - มี.ค.',status:periodOutcome(SLA_REPORT_QUARTERLY_ITEMS,0)},
{key:'q2',label:'Q2',range:'เม.ย. - มิ.ย.',status:periodOutcome(SLA_REPORT_QUARTERLY_ITEMS,1)},
{key:'q3',label:'Q3',range:'ก.ค. - ก.ย.',status:'overdue',isCurrent:true,pendingCount:1},
{key:'q4',label:'Q4',range:'ต.ค. - ธ.ค.',status:'upcoming'}
];

Object.assign(window,{SLA_REPORT_PERIOD,SLA_REPORT_QUARTER_PERIOD,SLA_REPORT_DEPT,SLA_REPORT_RECORDER,
 SLA_REPORT_PERIODS_MONTHLY,SLA_REPORT_PERIODS_QUARTERLY,SLA_REPORT_ITEMS,SLA_REPORT_QUARTERLY_ITEMS});
