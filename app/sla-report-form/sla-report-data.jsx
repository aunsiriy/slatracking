const SLA_REPORT_PERIOD={name:'กรกฎาคม 2569',deadline:'20 ก.ค. 2569'};
const SLA_REPORT_QUARTER_PERIOD={name:'ไตรมาส 3/2569',deadline:'15 ก.ค. 2569'};
const SLA_REPORT_DEPT={name:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)'};

const SLA_REPORT_ITEMS=[
{id:1,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',
 slaName:'ระยะเวลาติดตั้งมิเตอร์ใหม่ไม่เกิน 5 วันทำการ',customer:'ผู้ขอใช้ไฟรายใหม่ (ครัวเรือน/ธุรกิจ)',
 target:95,source:'ระบบ PEA Smart Service (รายงานอัตโนมัติ)',status:'not_reported',result:'',detail:'',improvement:''},
{id:2,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.5',level1Label:'กระบวนการแก้ไขไฟฟ้าขัดข้อง',
 slaName:'ระยะเวลาแก้ไขไฟฟ้าขัดข้องเฉลี่ยไม่เกิน 2 ชั่วโมง',customer:'ผู้ใช้ไฟทุกประเภทในเขตพื้นที่',
 target:90,source:'ระบบ Call Center 1129 + Log งานซ่อม',status:'not_reported',result:'',detail:'',improvement:''},
{id:3,level0:'S2',level0Label:'ระบบงานปฏิบัติการระบบไฟฟ้า',level1:'S2.1',level1Label:'กระบวนการบำรุงรักษาระบบจำหน่าย',
 slaName:'อัตราไฟดับเฉลี่ยต่อราย (SAIFI) ไม่เกินเกณฑ์มาตรฐาน',customer:'ผู้ใช้ไฟในพื้นที่รับผิดชอบ',
 target:92,source:'ระบบ OMS (Outage Management System)',status:'returned',result:'86',
 detail:'ดำเนินการบำรุงรักษาเชิงป้องกันครบตามแผน แต่มีเหตุขัดข้องจากพายุฝนในพื้นที่ 3 ครั้ง',improvement:'',returnNote:'หลักฐานแนบไม่ครบ กรุณาแนบรายงานเหตุขัดข้องรายครั้งเพิ่มเติม'},
{id:4,level0:'S3',level0Label:'ระบบงานบริหารลูกค้าสัมพันธ์',level1:'S3.2',level1Label:'กระบวนการตอบข้อร้องเรียน',
 slaName:'อัตราความพึงพอใจลูกค้าต่อการตอบข้อร้องเรียน',customer:'ลูกค้าที่ยื่นข้อร้องเรียน',
 target:88,source:'แบบสอบถามความพึงพอใจ (E-Survey)',status:'returned',result:'80',
 detail:'ปิดข้อร้องเรียนได้ตามกำหนดเวลา 95% ของกรณีทั้งหมด',improvement:'อยู่ระหว่างจัดอบรมทักษะการสื่อสารเพิ่มเติมให้เจ้าหน้าที่รับเรื่อง',returnNote:'กรุณาระบุแนวทางแก้ไขให้ชัดเจนและมีกำหนดเวลาที่แล้วเสร็จ'}
];

const SLA_REPORT_QUARTERLY_ITEMS=[
{id:101,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',
 metricName:'อัตราความถูกต้องของข้อมูลติดตั้งมิเตอร์ในระบบ',target:96,source:'ระบบตรวจสอบคุณภาพข้อมูล (Data QA)',status:'not_reported',result:'',detail:'',improvement:''},
{id:102,level0:'S2',level0Label:'ระบบงานปฏิบัติการระบบไฟฟ้า',level1:'S2.1',level1Label:'กระบวนการบำรุงรักษาระบบจำหน่าย',
 metricName:'อัตราการดำเนินการบำรุงรักษาเชิงป้องกันตามแผนไตรมาส',target:90,source:'แผนบำรุงรักษาประจำปี (PM Plan)',status:'not_reported',result:'',detail:'',improvement:''},
{id:103,level0:'S3',level0Label:'ระบบงานบริหารลูกค้าสัมพันธ์',level1:'S3.2',level1Label:'กระบวนการตอบข้อร้องเรียน',
 metricName:'อัตราการปิดข้อร้องเรียนซ้ำภายในไตรมาส',target:85,source:'ระบบบริหารข้อร้องเรียน (CRM)',status:'returned',result:'78',
 detail:'ปิดข้อร้องเรียนซ้ำได้ตามเป้าหมายในสองเดือนแรก แต่เดือนสุดท้ายมีเคสสะสมเพิ่มขึ้น',improvement:'',returnNote:'กรุณาระบุสาเหตุที่ยอดข้อร้องเรียนซ้ำเพิ่มขึ้นในเดือนสุดท้ายให้ชัดเจน'}
];

Object.assign(window,{SLA_REPORT_PERIOD,SLA_REPORT_QUARTER_PERIOD,SLA_REPORT_DEPT,SLA_REPORT_ITEMS,SLA_REPORT_QUARTERLY_ITEMS});

