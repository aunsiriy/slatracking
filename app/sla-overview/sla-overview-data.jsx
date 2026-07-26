const SLA_OVERVIEW_YEARS=['2569','2568','2567'];
const SLA_OWN_UNIT='ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)';

const SLA_OVERVIEW_BY_YEAR={
'2569':{
  kpiTotal:48,pass:31,fail:9,
  ownKpi:{kpiTotal:12,pass:8,fail:2},
  items:[
    {ba:'S1.3',sla:'ระยะเวลาติดตั้งมิเตอร์ใหม่ไม่เกิน 5 วันทำการ',dept:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',cycle:'รายเดือน',status:'reported'},
    {ba:'S1.5',sla:'ระยะเวลาแก้ไขไฟฟ้าขัดข้องเฉลี่ยไม่เกิน 2 ชั่วโมง',dept:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',cycle:'รายเดือน',status:'not_reported'},
    {ba:'S2.1',sla:'อัตราไฟดับเฉลี่ยต่อราย (SAIFI) ไม่เกินเกณฑ์มาตรฐาน',dept:'ฝ่ายปฏิบัติการเขต 4',cycle:'รายเดือน',status:'overdue'},
    {ba:'S3.2',sla:'อัตราความพึงพอใจลูกค้าต่อการตอบข้อร้องเรียน',dept:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',cycle:'รายไตรมาส',status:'reported'},
    {ba:'S1.1',sla:'อัตราการติดตั้งมิเตอร์ใหม่ภายในกำหนด',dept:'สำนักงานใหญ่',cycle:'รายเดือน',status:'reported'},
    {ba:'S4.2',sla:'เวลาตอบสนอง Call Center 1129',dept:'ฝ่ายบริการลูกค้า เขต 2 (ภาคกลาง)',cycle:'รายเดือน',status:'overdue'},
    {ba:'S2.4',sla:'ระยะเวลาซ่อมแซมระบบจำหน่ายไฟฟ้า',dept:'ฝ่ายปฏิบัติการเขต 4',cycle:'รายไตรมาส',status:'not_reported'},
    {ba:'S3.1',sla:'อัตราการปิดข้อร้องเรียนตามกำหนดเวลา',dept:'สำนักงานใหญ่',cycle:'รายเดือน',status:'reported'}
  ]
},
'2568':{kpiTotal:44,pass:27,fail:11,ownKpi:{kpiTotal:10,pass:7,fail:3},items:[
  {ba:'S1.3',sla:'ระยะเวลาติดตั้งมิเตอร์ใหม่ไม่เกิน 5 วันทำการ',dept:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',cycle:'รายเดือน',status:'reported'},
  {ba:'S2.1',sla:'อัตราไฟดับเฉลี่ยต่อราย (SAIFI) ไม่เกินเกณฑ์มาตรฐาน',dept:'ฝ่ายปฏิบัติการเขต 4',cycle:'รายเดือน',status:'reported'},
  {ba:'S3.2',sla:'อัตราความพึงพอใจลูกค้าต่อการตอบข้อร้องเรียน',dept:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',cycle:'รายไตรมาส',status:'not_reported'}
]},
'2567':{kpiTotal:40,pass:30,fail:6,ownKpi:{kpiTotal:9,pass:8,fail:1},items:[
  {ba:'S1.3',sla:'ระยะเวลาติดตั้งมิเตอร์ใหม่ไม่เกิน 5 วันทำการ',dept:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',cycle:'รายเดือน',status:'reported'},
  {ba:'S4.2',sla:'เวลาตอบสนอง Call Center 1129',dept:'ฝ่ายบริการลูกค้า เขต 2 (ภาคกลาง)',cycle:'รายเดือน',status:'reported'}
]}
};

Object.assign(window,{SLA_OVERVIEW_YEARS,SLA_OVERVIEW_BY_YEAR,SLA_OWN_UNIT});
