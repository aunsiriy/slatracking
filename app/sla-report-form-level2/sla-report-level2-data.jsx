const SLA_REPORT_L2_PERIOD={name:'กรกฎาคม 2569',deadline:'20 ก.ค. 2569'};
const SLA_REPORT_L2_DEPT={name:'กองบริการลูกค้า 1 (เขต 1 ภาคเหนือ)'};

const SLA_REPORT_L2_ITEMS=[
{id:1,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',level2:'S1.3.1',level2Label:'งานตรวจสอบพื้นที่ติดตั้ง',
 slaName:'ระยะเวลาตรวจสอบพื้นที่ติดตั้งไม่เกิน 2 วันทำการ',customer:'ผู้ขอใช้ไฟรายใหม่ (ครัวเรือน/ธุรกิจ)',
 target:93,source:'ระบบ PEA Smart Service (Log งานภาคสนาม)',status:'not_reported',result:'',detail:'',improvement:''},
{id:2,level0:'S1',level0Label:'ระบบงานบริการลูกค้า',level1:'S1.3',level1Label:'กระบวนการติดตั้งมิเตอร์ใหม่',level2:'S1.3.2',level2Label:'งานติดตั้งอุปกรณ์วัดฟ้า',
 slaName:'ระยะเวลาติดตั้งอุปกรณ์วัดฟ้าไม่เกิน 3 วันทำการหลังตรวจสอบพื้นที่',customer:'ผู้ขอใช้ไฟรายใหม่ (ครัวเรือน/ธุรกิจ)',
 target:90,source:'ระบบ PEA Smart Service (รายงานอัตโนมัติ)',status:'returned',result:'84',
 detail:'ติดตั้งได้ตามแผนส่วนใหญ่ แต่มีความล่าช้าจากพื้นที่ห่างไกล 2 กรณี',improvement:'',returnNote:'กรุณาระบุจำนวนกรณีที่ล่าช้าและแผนจัดสรรทีมช่างเพิ่มเติม'},
{id:3,level0:'S2',level0Label:'ระบบงานปฏิบัติการระบบไฟฟ้า',level1:'S2.1',level1Label:'กระบวนการบำรุงรักษาระบบจำหน่าย',level2:'S2.1.4',level2Label:'งานตรวจสอบสายส่งประจำเดือน',
 slaName:'อัตราความครบถ้วนของการตรวจสอบสายส่งตามแผน',customer:'หน่วยงานปฏิบัติการภายในกอง',
 target:97,source:'แผนตรวจสอบสายส่งประจำเดือน (Checklist)',status:'not_reported',result:'',detail:'',improvement:''}
];

Object.assign(window,{SLA_REPORT_L2_PERIOD,SLA_REPORT_L2_DEPT,SLA_REPORT_L2_ITEMS});
