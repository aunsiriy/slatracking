const SLA_REPORT_PERIOD={name:'กรกฎาคม 2569',deadline:'20 ก.ค. 2569'};
const SLA_REPORT_QUARTER_PERIOD={name:'ไตรมาส 3/2569',deadline:'15 ก.ย. 2569'};
const SLA_REPORT_DEPT={name:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)'};
const SLA_REPORT_RECORDER='วิภาวี ศรีสุข';

const SLA_REPORT_PERIODS_MONTHLY=[
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

const SLA_REPORT_PERIODS_QUARTERLY=[
{key:'q1',label:'Q1',range:'ม.ค. - มี.ค.',status:'done'},
{key:'q2',label:'Q2',range:'เม.ย. - มิ.ย.',status:'done'},
{key:'q3',label:'Q3',range:'ก.ค. - ก.ย.',status:'needs_fix',isCurrent:true,pendingCount:1},
{key:'q4',label:'Q4',range:'ต.ค. - ธ.ค.',status:'upcoming'}
];

const MONTH_HISTORY_LABELS=['ม.ค. 2569','ก.พ. 2569','มี.ค. 2569','เม.ย. 2569','พ.ค. 2569','มิ.ย. 2569'];
const QUARTER_HISTORY_LABELS=['Q1/2569','Q2/2569'];
const HISTORY_VARIANTS=[1,2,0,3,1,2];

function genHistory(target,labels){
 return labels.map((period,i)=>{
  const result=Math.max(0,Math.min(100,Number(target)+HISTORY_VARIANTS[i%HISTORY_VARIANTS.length]));
  const unit=period.startsWith('Q')?'ไตรมาส':'เดือน';
  return {period,result,target:Number(target),outcome:result>=Number(target)?'pass':'fail',recorder:SLA_REPORT_RECORDER,
   detail:'ดำเนินการตามแผนงานประจำ'+unit+'นี้ครบถ้วน ตรวจสอบและบันทึกผลตามรอบที่กำหนด'};
 });
}

const SLA_REPORT_ITEMS_RAW=[
{id:1,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',
 slaName:'ระยะเวลาติดตั้งมิเตอร์ใหม่ไม่เกิน 5 วันทำการ',customer:'ผู้ขอใช้ไฟรายใหม่ (ครัวเรือน/ธุรกิจ)',
 target:95,source:'ระบบ PEA Smart Service (รายงานอัตโนมัติ)',status:'not_reported',result:'',detail:'',improvement:'',
 dueDate:'20 ก.ค. 2569',overdue:true},
{id:2,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.5',level1Label:'กระบวนการแก้ไขไฟฟ้าขัดข้อง',
 slaName:'ระยะเวลาแก้ไขไฟฟ้าขัดข้องเฉลี่ยไม่เกิน 2 ชั่วโมง',customer:'ผู้ใช้ไฟทุกประเภทในเขตพื้นที่',
 target:90,source:'ระบบ Call Center 1129 + Log งานซ่อม',status:'submitted',result:'93',
 detail:'ตรวจสอบระยะเวลาเฉลี่ยจาก Log งานซ่อมทุกกรณีในเดือนนี้ อยู่ในเกณฑ์ที่กำหนด',improvement:'',
 dueDate:'20 ก.ค. 2569',overdue:false},
{id:3,level0:'S2',level0Label:'ระบบงานปฏิบัติการระบบไฟฟ้า',level1:'S2.1',level1Label:'กระบวนการบำรุงรักษาระบบจำหน่าย',
 slaName:'อัตราไฟดับเฉลี่ยต่อราย (SAIFI) ไม่เกินเกณฑ์มาตรฐาน',customer:'ผู้ใช้ไฟในพื้นที่รับผิดชอบ',
 target:92,source:'ระบบ OMS (Outage Management System)',status:'returned',result:'86',
 detail:'ดำเนินการบำรุงรักษาเชิงป้องกันครบตามแผน แต่มีเหตุขัดข้องจากพายุฝนในพื้นที่ 3 ครั้ง',improvement:'',
 returnNote:'หลักฐานแนบไม่ครบ กรุณาแนบรายงานเหตุขัดข้องรายครั้ง และระบุแนวทางแก้ไข',
 dueDate:'20 ก.ค. 2569',fixDueDate:'25 ก.ค. 2569',overdue:false},
{id:4,level0:'S3',level0Label:'ระบบงานบริหารลูกค้าสัมพันธ์',level1:'S3.2',level1Label:'กระบวนการตอบข้อร้องเรียน',
 slaName:'อัตราความพึงพอใจลูกค้าต่อการตอบข้อร้องเรียน',customer:'ลูกค้าที่ยื่นข้อร้องเรียน',
 target:88,source:'แบบสอบถามความพึงพอใจ (E-Survey)',status:'submitted',result:'84',
 detail:'ปิดข้อร้องเรียนได้ตามกำหนดเวลา แต่คะแนนความพึงพอใจเฉลี่ยยังต่ำกว่าเป้าหมายเล็กน้อย',
 improvement:'อยู่ระหว่างจัดอบรมทักษะการสื่อสารเพิ่มเติมให้เจ้าหน้าที่รับเรื่อง',
 dueDate:'20 ก.ค. 2569',overdue:false},
{id:5,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.4',level1Label:'กระบวนการจดหน่วยและคำนวณค่าไฟฟ้า',
 slaName:'ความถูกต้องของการจดหน่วยไฟฟ้าไม่น้อยกว่าร้อยละ 99',customer:'ผู้ใช้ไฟทุกประเภทในเขตพื้นที่',
 target:99,source:'ระบบจัดเก็บข้อมูลหน่วยไฟฟ้า (AMR/MDM)',status:'not_reported',result:'',detail:'',improvement:'',
 dueDate:'25 ก.ค. 2569',overdue:false},
{id:6,level0:'S3',level0Label:'ระบบงานบริหารลูกค้าสัมพันธ์',level1:'S3.3',level1Label:'กระบวนการให้บริการผ่านดิจิทัล (PEA Smart Plus)',
 slaName:'ร้อยละคำขอผ่าน PEA Smart Plus ที่ดำเนินการแล้วเสร็จตามกำหนด',customer:'ผู้ใช้บริการผ่านแอปพลิเคชัน PEA Smart Plus',
 target:90,source:'ระบบ PEA Smart Plus (รายงานอัตโนมัติ)',status:'submitted',result:'96',
 detail:'คำขอผ่านแอปพลิเคชันดำเนินการแล้วเสร็จตามกำหนดเวลาครบถ้วนเกือบทั้งหมด',improvement:'',
 dueDate:'20 ก.ค. 2569',overdue:false}
];

const SLA_REPORT_ITEMS=SLA_REPORT_ITEMS_RAW.map(it=>({...it,history:genHistory(it.target,MONTH_HISTORY_LABELS)}));

const SLA_REPORT_QUARTERLY_ITEMS_RAW=[
{id:101,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',
 metricName:'อัตราความถูกต้องของข้อมูลติดตั้งมิเตอร์ในระบบ',target:96,source:'ระบบตรวจสอบคุณภาพข้อมูล (Data QA)',status:'not_reported',result:'',detail:'',improvement:'',
 dueDate:'15 ก.ย. 2569',overdue:false},
{id:102,level0:'S2',level0Label:'ระบบงานปฏิบัติการระบบไฟฟ้า',level1:'S2.1',level1Label:'กระบวนการบำรุงรักษาระบบจำหน่าย',
 metricName:'อัตราการดำเนินการบำรุงรักษาเชิงป้องกันตามแผนไตรมาส',target:90,source:'แผนบำรุงรักษาประจำปี (PM Plan)',status:'submitted',result:'92',detail:'ดำเนินการบำรุงรักษาเชิงป้องกันครบตามแผนไตรมาสนี้',improvement:'',
 dueDate:'15 ก.ย. 2569',overdue:false},
{id:103,level0:'S3',level0Label:'ระบบงานบริหารลูกค้าสัมพันธ์',level1:'S3.2',level1Label:'กระบวนการตอบข้อร้องเรียน',
 metricName:'อัตราการปิดข้อร้องเรียนซ้ำภายในไตรมาส',target:85,source:'ระบบบริหารข้อร้องเรียน (CRM)',status:'returned',result:'78',
 detail:'ปิดข้อร้องเรียนซ้ำได้ตามเป้าหมายในสองเดือนแรก แต่เดือนสุดท้ายมีเคสสะสมเพิ่มขึ้น',improvement:'',
 returnNote:'กรุณาระบุสาเหตุที่ยอดข้อร้องเรียนซ้ำเพิ่มขึ้นในเดือนสุดท้ายให้ชัดเจน',
 dueDate:'15 ก.ย. 2569',fixDueDate:'22 ก.ย. 2569',overdue:false}
];

const SLA_REPORT_QUARTERLY_ITEMS=SLA_REPORT_QUARTERLY_ITEMS_RAW.map(it=>({...it,history:genHistory(it.target,QUARTER_HISTORY_LABELS)}));

Object.assign(window,{SLA_REPORT_PERIOD,SLA_REPORT_QUARTER_PERIOD,SLA_REPORT_DEPT,SLA_REPORT_RECORDER,
 SLA_REPORT_PERIODS_MONTHLY,SLA_REPORT_PERIODS_QUARTERLY,SLA_REPORT_ITEMS,SLA_REPORT_QUARTERLY_ITEMS});
