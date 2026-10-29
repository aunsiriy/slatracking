const SLA_REPORT_L2_PERIOD={name:'กรกฎาคม 2569',deadline:'20 ก.ค. 2569'};
const SLA_REPORT_L2_DEPT={name:'กองบริการลูกค้า 1 (เขต 1 ภาคเหนือ)'};
const SLA_REPORT_L2_RECORDER='ธีรเดช มั่นคง';

// Level 2 (กอง) only reports monthly — there is no quarterly process-metric report at this level.
const SLA_REPORT_L2_PERIODS_MONTHLY=[
{key:'jan',label:'ม.ค.',status:'done'},
{key:'feb',label:'ก.พ.',status:'done'},
{key:'mar',label:'มี.ค.',status:'done'},
{key:'apr',label:'เม.ย.',status:'done'},
{key:'may',label:'พ.ค.',status:'done'},
{key:'jun',label:'มิ.ย.',status:'done'},
{key:'jul',label:'ก.ค.',status:'needs_fix',isCurrent:true,pendingCount:3},
{key:'aug',label:'ส.ค.',status:'upcoming'},
{key:'sep',label:'ก.ย.',status:'upcoming'},
{key:'oct',label:'ต.ค.',status:'upcoming'},
{key:'nov',label:'พ.ย.',status:'upcoming'},
{key:'dec',label:'ธ.ค.',status:'upcoming'}
];

const MONTH_HISTORY_LABELS=['ม.ค. 2569','ก.พ. 2569','มี.ค. 2569','เม.ย. 2569','พ.ค. 2569','มิ.ย. 2569'];
const HISTORY_VARIANTS=[1,2,0,3,1,2];

function genHistory(target){
 return MONTH_HISTORY_LABELS.map((period,i)=>{
  const result=Math.max(0,Math.min(100,Number(target)+HISTORY_VARIANTS[i%HISTORY_VARIANTS.length]));
  return {period,result,target:Number(target),outcome:result>=Number(target)?'pass':'fail',recorder:SLA_REPORT_L2_RECORDER,reported:true,
   detail:'ดำเนินการตามแผนงานประจำเดือนนี้ครบถ้วน ตรวจสอบและบันทึกผลตามรอบที่กำหนด'};
 });
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
const SLA_REPORT_L2_ITEMS_RAW=[
{id:1,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',level2:'S1.3.1',level2Label:'งานตรวจสอบพื้นที่ติดตั้ง',
 slaName:'ระยะเวลาตรวจสอบพื้นที่ติดตั้งไม่เกิน 2 วันทำการ',customer:'ผู้ขอใช้ไฟรายใหม่ (ครัวเรือน/ธุรกิจ)',
 target:93,source:'ระบบ PEA Smart Service (Log งานภาคสนาม)',status:'overdue',result:'',detail:'',improvement:'',preparer:'',
 authorizedPreparers:['60638'],first_confirmed_at:null,historyLog:[],
 dueDate:'20 ก.ค. 2569'},
{id:2,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',level2:'S1.3.2',level2Label:'งานติดตั้งอุปกรณ์วัดฟ้า',
 slaName:'ระยะเวลาติดตั้งอุปกรณ์วัดฟ้าไม่เกิน 3 วันทำการหลังตรวจสอบพื้นที่',customer:'ผู้ขอใช้ไฟรายใหม่ (ครัวเรือน/ธุรกิจ)',
 target:90,source:'ระบบ PEA Smart Service (รายงานอัตโนมัติ)',status:'submitted',result:'84',
 detail:'ติดตั้งได้ตามแผนส่วนใหญ่ แต่มีความล่าช้าจากพื้นที่ห่างไกล 2 กรณี',
 improvement:'ปรับแผนจัดสรรทีมช่างเพิ่มเติมสำหรับพื้นที่ห่างไกล และนัดหมายล่วงหน้ากับผู้ขอใช้ไฟ',preparer:'60638',
 authorizedPreparers:['60638'],first_confirmed_at:'2026-07-15T13:40:00+07:00',
 dueDate:'20 ก.ค. 2569'},
{id:3,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.1',level1Label:'กระบวนการวางแผนกลยุทธ์และพัฒนาธุรกิจ',level2:'S1.1.2',level2Label:'งานวางกลยุทธ์และสนับสนุนการเปิดเสรีกิจการไฟฟ้า',
 slaName:'ร้อยละความสำเร็จของแผนสนับสนุนการเปิดเสรีกิจการไฟฟ้าตามกำหนด',customer:'ผู้บริหารฝ่ายและหน่วยงานกำกับนโยบาย',
 target:85,source:'รายงานผลการศึกษาและแผนดำเนินงาน (สรุปรายเดือน)',status:'not_reported',result:'',detail:'',improvement:'',preparer:'',
 authorizedPreparers:['60638'],first_confirmed_at:null,historyLog:[],
 dueDate:'25 ก.ค. 2569'},
{id:4,level0:'S2',level0Label:'ระบบงานปฏิบัติการระบบไฟฟ้า',level1:'S2.1',level1Label:'กระบวนการบำรุงรักษาระบบจำหน่าย',level2:'S2.1.4',level2Label:'งานตรวจสอบสายส่งประจำเดือน',
 slaName:'อัตราความครบถ้วนของการตรวจสอบสายส่งตามแผน',customer:'หน่วยงานปฏิบัติการภายในกอง',
 target:97,source:'แผนตรวจสอบสายส่งประจำเดือน (Checklist)',status:'submitted',result:'98',
 detail:'ตรวจสอบสายส่งครบตามแผนทุกจุดในพื้นที่รับผิดชอบของกอง',improvement:'',preparer:'60638',
 authorizedPreparers:['60638','602385'],first_confirmed_at:'2026-07-14T08:50:00+07:00',
 dueDate:'20 ก.ค. 2569'},
{id:5,level0:'S2',level0Label:'ระบบงานปฏิบัติการระบบไฟฟ้า',level1:'S2.1',level1Label:'กระบวนการบำรุงรักษาระบบจำหน่าย',level2:'S2.1.2',level2Label:'งานบำรุงรักษาหม้อแปลงไฟฟ้าประจำเดือน',
 slaName:'อัตราการบำรุงรักษาหม้อแปลงไฟฟ้าตามแผนประจำเดือน',customer:'ผู้ใช้ไฟในพื้นที่รับผิดชอบของกอง',
 target:95,source:'แผนบำรุงรักษาหม้อแปลงไฟฟ้า (PM Checklist)',status:'submitted',result:'96',
 detail:'บำรุงรักษาหม้อแปลงไฟฟ้าครบตามแผนในพื้นที่รับผิดชอบ',improvement:'',preparer:'60638',
 authorizedPreparers:['60638','602385'],first_confirmed_at:'2026-07-13T10:15:00+07:00',
 dueDate:'20 ก.ค. 2569'},
{id:6,level0:'S3',level0Label:'ระบบงานบริหารลูกค้าสัมพันธ์',level1:'S3.2',level1Label:'กระบวนการตอบข้อร้องเรียน',level2:'S3.2.1',level2Label:'งานบันทึกและติดตามข้อร้องเรียนในกอง',
 slaName:'อัตราการบันทึกข้อร้องเรียนเข้าระบบภายใน 1 วันทำการ',customer:'ลูกค้าที่ยื่นข้อร้องเรียนในพื้นที่ของกอง',
 target:90,source:'ระบบบริหารข้อร้องเรียน (CRM)',status:'submitted',result:'82',
 detail:'บันทึกข้อร้องเรียนส่วนใหญ่ได้ตามกำหนด แต่ช่วงปลายเดือนมีเคสสะสมจากงานภาคสนาม',
 improvement:'ปรับผู้รับผิดชอบบันทึกข้อมูลเพิ่มอีก 1 คนในช่วงปลายเดือน',preparer:'60638',
 authorizedPreparers:['60638','602385'],first_confirmed_at:'2026-07-16T15:05:00+07:00',
 dueDate:'20 ก.ค. 2569'}
];

const SLA_REPORT_L2_ITEMS=SLA_REPORT_L2_ITEMS_RAW.map(it=>{
 const withHistory={...it,history:genHistory(it.target)};
 if(withHistory.status==='submitted'&&!withHistory.historyLog){
  withHistory.historyLog=genSeedLog(withHistory,withHistory.first_confirmed_at);
 }
 return withHistory;
});

Object.assign(window,{SLA_REPORT_L2_PERIOD,SLA_REPORT_L2_DEPT,SLA_REPORT_L2_RECORDER,
 SLA_REPORT_L2_PERIODS_MONTHLY,SLA_REPORT_L2_ITEMS});
