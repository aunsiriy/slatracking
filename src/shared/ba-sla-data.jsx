const ORG_UNITS = [
{id:1,code:'กพอ.',name:'กองพัฒนาระบบงานองค์กร',level:'กอง',parent:'สายงานยุทธศาสตร์',status:'active',users:6},
{id:2,code:'บริการลูกค้า เขต 1',name:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',level:'ฝ่าย',parent:'สายงานบริการลูกค้า',status:'active',users:214},
{id:3,code:'วังโป่ง',name:'กฟอ.วังโป่ง',level:'แขวง',parent:'ฝ่ายบริการลูกค้า เขต 3',status:'active',users:38},
{id:4,code:'เชียงใหม่ 2',name:'แขวงเชียงใหม่ 2',level:'แขวง',parent:'ฝ่ายบริการลูกค้า เขต 1',status:'active',users:52},
{id:5,code:'ปฏิบัติการเขต 4',name:'ฝ่ายปฏิบัติการและบำรุงรักษา เขต 4',level:'ฝ่าย',parent:'สายงานระบบไฟฟ้า',status:'inactive',users:0}
];

const SLA_MASTER = [
{id:1,code:'KPI-001',name:'1. มีการนำเสนอแผนการดำเนินงานของระบบการจัดการองค์กรที่สำคัญตามหลักเกณฑ์การประเมินกระบวนการปฏิบัติงาน และการจัดการ Core Business Enablers ให้คณะกรรมการ กฟภ. ให้ความเห็นชอบ/อนุมัติ',target:'≤ 3 ชั่วโมง',owner:'ฝ่ายปฏิบัติการและบำรุงรักษา',formula:'เวลาที่แจ้งเสร็จ - เวลาที่รับแจ้ง',version:'v3.2',effective:'01/01/2569',status:'active'},
{id:2,code:'KPI-002',name:'อัตราการติดตั้งมิเตอร์ใหม่ภายใน 7 วัน',target:'≥ 95%',owner:'ฝ่ายบริการลูกค้า',formula:'จำนวนติดตั้งทันเวลา / จำนวนคำขอทั้งหมด',version:'v2.0',effective:'01/01/2569',status:'active'},
{id:3,code:'KPI-003',name:'อัตราความพึงพอใจลูกค้า',target:'≥ 90%',owner:'ฝ่ายบริการลูกค้า',formula:'คะแนนแบบสำรวจเฉลี่ย',version:'v1.4',effective:'01/07/2568',status:'active'},
{id:4,code:'KPI-004',name:'อัตราไฟดับเฉลี่ยต่อราย (SAIFI)',target:'≤ 4 ครั้ง/ปี',owner:'ฝ่ายวางแผนระบบไฟฟ้า',formula:'จำนวนครั้งไฟดับรวม / จำนวนผู้ใช้ไฟ',version:'v2.1',effective:'01/01/2569',status:'active'},
{id:5,code:'KPI-005',name:'เวลาตอบสนอง Call Center',target:'≥ 92%',owner:'ฝ่ายบริการลูกค้า',formula:'สายที่รับภายใน 30 วิ / สายทั้งหมด',version:'v1.0',effective:'01/01/2568',status:'inactive'}
];

const BA_GROUPS = [
{key:'governance',shortLabel:'GOVERNANCE (กำกับดูแล)',label:'Governance (กำกับดูแล)',hint:'กระบวนการกำกับดูแล นโยบาย และธรรมาภิบาลองค์กร',children:[
  {id:'s1',code:'S1',name:'การบริหารจัดการเชิงยุทธศาสตร์',status:'active',children:[
    {id:'s1.1',code:'S1.1',name:'กระบวนการวางแผนยุทธศาสตร์',status:'active',unit:'ฝ่าย',children:[
      {id:'s1.1.1',code:'S1.1.1',name:'งานจัดทำแผนยุทธศาสตร์',status:'active',unit:'กองพัฒนาระบบงานองค์กร'},
      {id:'s1.1.2',code:'S1.1.2',name:'งานวางกลยุทธ์และสนับสนุนการเปิดเสรีกิจการไฟฟ้า',status:'active',unit:'กองยุทธศาสตร์องค์กร'}
    ]},
    {id:'s1.2',code:'S1.2',name:'กระบวนการประเมินผล (Performance Management)',status:'active',unit:'ฝ่าย',children:[
      {id:'s1.2.1',code:'S1.2.1',name:'งานติดตามประเมินผลการดำเนินงานตามแผนยุทธศาสตร์และแผนปฏิบัติการ',status:'active',unit:'กองยุทธศาสตร์องค์กร'},
      {id:'s1.2.2',code:'S1.2.2',name:'งานสื่อสารและถ่ายทอด Performance Metrics',status:'active',unit:'กองยุทธศาสตร์องค์กร'},
      {id:'s1.2.3',code:'S1.2.3',name:'งานติดตามและประเมินผล',status:'active',unit:'กองพัฒนาระบบงานองค์กร'}
    ]},
    {id:'s1.3',code:'S1.3',name:'กระบวนการพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',status:'active',unit:'ฝ่าย',children:[
      {id:'s1.3.1',code:'S1.3.1',name:'งานพัฒนาระบบงาน/กระบวนการ',status:'active',unit:'กองพัฒนาระบบงานองค์กร'},
      {id:'s1.3.2',code:'S1.3.2',name:'งานบริหารโครงสร้างองค์กร',status:'active',unit:'กองพัฒนาระบบงานองค์กร'},
      {id:'s1.3.3',code:'S1.3.3',name:'งานบริหารการเปลี่ยนแปลง (Change Management)',status:'active',unit:'กองยุทธศาสตร์องค์กร'},
      {id:'s1.3.4',code:'S1.3.4',name:'Triple Transformation Capability Center (TCC)',status:'active',unit:'กองยุทธศาสตร์องค์กร'}
    ]}
  ]},
  {id:'s2',code:'S2',name:'การกำกับดูแล การบริหารความเสี่ยง และการปฏิบัติตามกฎหมาย กฎระเบียบ ข้อบังคับ',status:'active',children:[
    {id:'s2.1',code:'S2.1',name:'กระบวนการกำกับดูแลกิจการที่ดี',status:'active',unit:'ฝ่าย',children:[
      {id:'s2.1.1',code:'S2.1.1',name:'งานวางแผนกลยุทธ์ด้านการกำกับดูแลกิจการที่ดี',status:'active'},
      {id:'s2.1.2',code:'S2.1.2',name:'งานบริหารจัดการด้านการกำกับดูแลกิจการที่ดี',status:'active'}
    ]},
    {id:'s2.2',code:'S2.2',name:'กระบวนการกำกับดูแลเทคโนโลยีดิจิทัล (Digital Governance)',status:'active',unit:'ฝ่าย',children:[
      {id:'s2.2.1',code:'S2.2.1',name:'งานกำกับดูแลด้านเทคโนโลยีสารสนเทศ',status:'active'},
      {id:'s2.2.2',code:'S2.2.2',name:'งานกำกับดูแลและบริหารจัดการสถาปัตยกรรมองค์กร',status:'active'},
      {id:'s2.2.3',code:'S2.2.3',name:'งานกำกับดูแลข้อมูลและการคุ้มครองข้อมูลส่วนบุคคล',status:'active'}
    ]},
    {id:'s2.3',code:'S2.3',name:'กระบวนการบริหารความเสี่ยง',status:'active',unit:'ฝ่าย',children:[
      {id:'s2.3.1',code:'S2.3.1',name:'งานจัดทำแผนและประเมินผลการบริหารความเสี่ยง',status:'active'},
      {id:'s2.3.2',code:'S2.3.2',name:'งานพัฒนาเพื่อบริหารความเสี่ยง',status:'active'}
    ]},
    {id:'s2.4',code:'S2.4',name:'กระบวนการ Compliance',status:'active',unit:'ฝ่าย',children:[
      {id:'s2.4.1',code:'S2.4.1',name:'งานกำหนดแนวทางการกำกับการปฏิบัติตามกฎระเบียบขององค์กร (Compliance)',status:'active'},
      {id:'s2.4.2',code:'S2.4.2',name:'งานบริหารจัดการการกำกับดูแลการปฏิบัติตามกฎระเบียบขององค์กร',status:'active'}
    ]},
    {id:'s2.5',code:'S2.5',name:'กระบวนการควบคุมภายใน (Internal Control)',status:'active',unit:'ฝ่าย',children:[
      {id:'s2.5.1',code:'S2.5.1',name:'งานกำหนดแนวทางการประเมินผลควบคุมภายใน',status:'active'},
      {id:'s2.5.2',code:'S2.5.2',name:'งานบริหารจัดการและติดตามประเมินผลการควบคุมภายในองค์กร',status:'active'}
    ]},
    {id:'s2.6',code:'S2.6',name:'กระบวนการบริหารความต่อเนื่องทางธุรกิจ',status:'active',unit:'ฝ่าย',children:[
      {id:'s2.6.1',code:'S2.6.1',name:'งานจัดทำ/ทบทวน/ปรับปรุง นโยบาย โครงสร้าง ขอบเขตของระบบ BCM',status:'active'},
      {id:'s2.6.2',code:'S2.6.2',name:'งานบริหารจัดการ ติดตามและประเมินผล การบริหารความต่อเนื่องทางธุรกิจ',status:'active'}
    ]},
    {id:'s2.7',code:'S2.7',name:'กระบวนการบริหารจัดการทางด้านกฎหมาย',status:'active',unit:'ฝ่าย',children:[
      {id:'s2.7.1',code:'S2.7.1',name:'งานสอบสวนการกระทำผิด',status:'active'},
      {id:'s2.7.2',code:'S2.7.2',name:'งานการดำเนินคดีและการบังคับคดี',status:'active'},
      {id:'s2.7.3',code:'S2.7.3',name:'งานเกี่ยวกับนิติกรรมสัญญาและกฎหมาย',status:'active'}
    ]},
    {id:'s2.8',code:'S2.8',name:'กระบวนการจัดการด้านการตรวจสอบภายใน (Internal Audit)',status:'active',unit:'ฝ่าย',children:[
      {id:'s2.8.1',code:'S2.8.1',name:'งานบริหารจัดการหน่วยงานตรวจสอบภายใน',status:'active'},
      {id:'s2.8.2',code:'S2.8.2',name:'งานวางแผนการตรวจสอบ',status:'active'},
      {id:'s2.8.3',code:'S2.8.3',name:'งานปฏิบัติงานตรวจสอบและการรายงาน',status:'active'},
      {id:'s2.8.4',code:'S2.8.4',name:'งานบริการให้คำแนะนำปรึกษา',status:'active'},
      {id:'s2.8.5',code:'S2.8.5',name:'งานประสานงานคณะกรรมการตรวจสอบ',status:'active'},
      {id:'s2.8.6',code:'S2.8.6',name:'งานสนับสนุนการตรวจสอบทางด้านสารสนเทศ',status:'active'}
    ]}
  ]},
  {id:'s3',code:'S3',name:'การบริหารความยั่งยืนขององค์กร',status:'active',children:[
    {id:'s3.1',code:'S3.1',name:'กระบวนการบริหารจัดการด้านการบริหารความยั่งยืนและการจัดการผู้มีส่วนได้ส่วนเสีย',status:'active',unit:'ฝ่าย',children:[
      {id:'s3.1.1',code:'S3.1.1',name:'งานกำหนดวัตถุประสงค์ขอบเขตฯ และผู้มีส่วนได้ส่วนเสีย',status:'active'},
      {id:'s3.1.2',code:'S3.1.2',name:'งานวางแผนกลยุทธ์ด้านการบริหารความยั่งยืนและการจัดการผู้มีส่วนได้ส่วนเสีย',status:'active'},
      {id:'s3.1.3',code:'S3.1.3',name:'งานบริหารความยั่งยืนและความสัมพันธ์กับผู้มีส่วนได้ส่วนเสีย',status:'active'},
      {id:'s3.1.4',code:'S3.1.4',name:'งานเรียนรู้ปรับปรุงระบบงานด้านการบริหารความยั่งยืนและการจัดการผู้มีส่วนได้ส่วนเสีย',status:'active'}
    ]},
    {id:'s3.2',code:'S3.2',name:'กระบวนการบริหารจัดการด้านสังคมและสิ่งแวดล้อม (CSR)',status:'active',unit:'ฝ่าย',children:[
      {id:'s3.2.1',code:'S3.2.1',name:'งานวางแผนกลยุทธ์ด้านความรับผิดชอบต่อสังคมสิ่งแวดล้อมและด้านการบริหารจัดการก๊าชเรือนกระจก',status:'active'},
      {id:'s3.2.2',code:'S3.2.2',name:'งานบริหารจัดการด้านความรับผิดชอบต่อสังคมสิ่งแวดล้อมและด้านการบริหารจัดการก๊าชเรือนกระจก',status:'active'}
    ]}
  ]},
  {id:'s4',code:'S4',name:'การจัดการความรู้และนวัตกรรม',status:'active',children:[
    {id:'s4.1',code:'S4.1',name:'กระบวนการจัดการความรู้',status:'active',unit:'ฝ่าย',children:[
      {id:'s4.1.1',code:'S4.1.1',name:'งานวางแผนกลยุทธ์ด้านการจัดการความรู้',status:'active'},
      {id:'s4.1.2',code:'S4.1.2',name:'งานบริหารจัดการความรู้',status:'active'}
    ]},
    {id:'s4.2',code:'S4.2',name:'กระบวนการจัดการนวัตกรรม',status:'active',unit:'ฝ่าย',children:[
      {id:'s4.2.1',code:'S4.2.1',name:'งานวางแผนกลยุทธ์ด้านนวัตกรรม',status:'active'},
      {id:'s4.2.2',code:'S4.2.2',name:'งานบริหารจัดการงานวิจัย',status:'active'},
      {id:'s4.2.3',code:'S4.2.3',name:'งานจัดการนวัตกรรมองค์กร',status:'active'}
    ]}
  ]},
  {id:'s5',code:'S5',name:'การบริหารธุรกิจและการลงทุนธุรกิจเกี่ยวเนื่อง',status:'active',children:[
    {id:'s5.1',code:'S5.1',name:'กระบวนการวางแผนและบริหารธุรกิจเกี่ยวเนื่อง',status:'active',unit:'ฝ่าย',children:[]},
    {id:'s5.2',code:'S5.2',name:'กระบวนการกำกับบริษัทในเครือและบริษัทร่วมทุน',status:'active',unit:'ฝ่าย',children:[]}
  ]}
]},
{key:'core',shortLabel:'CORE (กระบวนการหลัก)',label:'Core (กระบวนการหลัก)',hint:'กระบวนการหลักที่ส่งมอบคุณค่าให้ผู้ใช้ไฟฟ้าโดยตรง',children:[
  {id:'c1',code:'C1',name:'การจัดหาพลังงานและบริหารจัดการการจำหน่ายไฟฟ้า (G D R)',status:'active',children:[
    {id:'c1.1',code:'C1.1',name:'กระบวนการบริหารจัดการจัดหาพลังงานไฟฟ้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c1.1.1',code:'C1.1.1',name:'งานจัดหาพลังงานไฟฟ้าตามความต้องการใช้ไฟฟ้า',status:'active',unit:'กองจัดหาพลังงาน'},
      {id:'c1.1.2',code:'C1.1.2',name:'งานรับซื้อพลังงานไฟฟ้าตามนโยบายภาครัฐ',status:'active',unit:'กองรับซื้อพลังงาน'},
      {id:'c1.1.3',code:'C1.1.3',name:'งานจัดการด้านอนุรักษ์พลังงานตามนโยบายภาครัฐ',status:'active',unit:'กองอนุรักษ์พลังงาน'},
      {id:'c1.1.4',code:'C1.1.4',name:'งานควบคุมระบบผลิตไฟฟ้า',status:'active',unit:'กองควบคุมระบบผลิตไฟฟ้า'}
    ]},
    {id:'c1.2',code:'C1.2',name:'กระบวนการบริหารจัดการการจำหน่ายไฟฟ้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c1.2.1',code:'C1.2.1',name:'งานวางแผนการจำหน่ายไฟฟ้า',status:'active'},
      {id:'c1.2.2',code:'C1.2.2',name:'งานจัดการการจำหน่ายไฟฟ้า',status:'active'},
      {id:'c1.2.3',code:'C1.2.3',name:'งานวิเคราะห์ความต้องการใช้ไฟฟ้า',status:'active'},
      {id:'c1.2.4',code:'C1.2.4',name:'งานจัดโครงสร้างอัตราค่าไฟฟ้าขายส่ง/ขายปลีก',status:'active'}
    ]}
  ]},
  {id:'c2',code:'C2',name:'การวางแผนและพัฒนาระบบไฟฟ้า (D)',status:'active',children:[
    {id:'c2.1',code:'C2.1',name:'กระบวนการวางแผนและพัฒนาระบบไฟฟ้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c2.1.1',code:'C2.1.1',name:'งานพยากรณ์ความต้องการไฟฟ้าระยะยาว ระดับมหภาคและจุลภาค',status:'active'},
      {id:'c2.1.2',code:'C2.1.2',name:'งานศึกษา วิเคราะห์และจัดทำข้อมูลเพื่อประกอบการจัดทำแผนพัฒนาระบบไฟฟ้า',status:'active'},
      {id:'c2.1.3',code:'C2.1.3',name:'งานจัดทำแผนพัฒนาระบบไฟฟ้า',status:'active'},
      {id:'c2.1.4',code:'C2.1.4',name:'งานวางแผนและศึกษาการดำเนินงานด้านพลังงานสะอาด (Green Tech)',status:'active'}
    ]}
  ]},
  {id:'c3',code:'C3',name:'การออกแบบสถานีไฟฟ้าและระบบไฟฟ้า (D)',status:'active',children:[
    {id:'c3.1',code:'C3.1',name:'กระบวนการออกแบบสถานีไฟฟ้าและระบบไฟฟ้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c3.1.1',code:'C3.1.1',name:'งานจัดหาและสำรวจที่ดิน',status:'active'},
      {id:'c3.1.2',code:'C3.1.2',name:'งานสำรวจและออกแบบสถานีไฟฟ้า',status:'active'},
      {id:'c3.1.3',code:'C3.1.3',name:'งานสำรวจและออกแบบระบบสายส่ง',status:'active'},
      {id:'c3.1.4',code:'C3.1.4',name:'งานสำรวจและออกแบบระบบจำหน่าย',status:'active'},
      {id:'c3.1.5',code:'C3.1.5',name:'งานกำหนดรายละเอียดทางเทคนิคของสถานีไฟฟ้าและระบบไฟฟ้า',status:'active'},
      {id:'c3.1.6',code:'C3.1.6',name:'งานกำหนดและควบคุมมาตรฐานของระบบไฟฟ้า',status:'active'}
    ]}
  ]},
  {id:'c4',code:'C4',name:'การก่อสร้างสถานีไฟฟ้าและระบบไฟฟ้า (D)',status:'active',children:[
    {id:'c4.1',code:'C4.1',name:'กระบวนการก่อสร้างสถานีไฟฟ้าและระบบไฟฟ้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c4.1.1',code:'C4.1.1',name:'งานจัดหาผู้รับจ้างก่อสร้าง สถานีไฟฟ้าและระบบไฟฟ้า แบบจ้างเหมา (Turnkey)',status:'active'},
      {id:'c4.1.2',code:'C4.1.2',name:'งานจัดทำแผนโครงการและบริหารโครงการ (Turnkey)',status:'active'},
      {id:'c4.1.3',code:'C4.1.3',name:'งานก่อสร้างสถานีไฟฟ้าและระบบไฟฟ้าโดย กฟภ.',status:'active'},
      {id:'c4.1.4',code:'C4.1.4',name:'งานจัดทำแผนโครงการและบริหารโครงการ โดย กฟภ.',status:'active'},
      {id:'c4.1.5',code:'C4.1.5',name:'งานจัดหาและผลิตพัสดุก่อสร้าง',status:'active'}
    ]}
  ]},
  {id:'c5',code:'C5',name:'การบริหารสินทรัพย์และบำรุงรักษาระบบไฟฟ้า (D)',status:'active',children:[
    {id:'c5.1',code:'C5.1',name:'กระบวนการบริหารสินทรัพย์ระบบไฟฟ้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c5.1.1',code:'C5.1.1',name:'งานวางแผนและพยากรณ์สินทรัพย์ระบบไฟฟ้า',status:'active'},
      {id:'c5.1.2',code:'C5.1.2',name:'งานบริหารข้อมูลทรัพย์สินและข้อมูลการใช้งาน',status:'active'},
      {id:'c5.1.3',code:'C5.1.3',name:'งานบริหารจัดการควบคุมคุณภาพสินทรัพย์ระบบไฟฟ้า',status:'active'}
    ]},
    {id:'c5.2',code:'C5.2',name:'กระบวนการบำรุงรักษาสถานีไฟฟ้าและระบบไฟฟ้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c5.2.1',code:'C5.2.1',name:'งานวางแผนและพยากรณ์บำรุงรักษาสถานีไฟฟ้าและระบบไฟฟ้า',status:'active'},
      {id:'c5.2.2',code:'C5.2.2',name:'งานบริหารจัดการบำรุงรักษาระบบไฟฟ้า',status:'active'}
    ]}
  ]},
  {id:'c6',code:'C6',name:'การปฏิบัติการระบบไฟฟ้า (D)',status:'active',children:[
    {id:'c6.1',code:'C6.1',name:'กระบวนการการปฏิบัติการระบบสายส่ง',status:'active',unit:'ฝ่าย',children:[
      {id:'c6.1.1',code:'C6.1.1',name:'งานวางแผนกลยุทธ์ด้านการปฏิบัติการ',status:'active'},
      {id:'c6.1.2',code:'C6.1.2',name:'งานบริหารจัดการเครือข่ายระบบสายส่ง',status:'active'},
      {id:'c6.1.3',code:'C6.1.3',name:'งานบริหารจัดการการดับไฟล่วงหน้าระบบสายส่ง',status:'active'},
      {id:'c6.1.4',code:'C6.1.4',name:'งานบริหารจัดการเหตุการณ์ระบบสายส่ง',status:'active'}
    ]},
    {id:'c6.2',code:'C6.2',name:'กระบวนการการปฏิบัติการภายในสถานีไฟฟ้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c6.2.1',code:'C6.2.1',name:'งานบริหารจัดการสถานีไฟฟ้า',status:'active'},
      {id:'c6.2.2',code:'C6.2.2',name:'งานบริหารจัดการการดับไฟล่วงหน้าในสถานีไฟฟ้า',status:'active'},
      {id:'c6.2.3',code:'C6.2.3',name:'งานบริหารจัดการเหตุการณ์ในสถานีไฟฟ้า',status:'active'}
    ]},
    {id:'c6.3',code:'C6.3',name:'กระบวนการการปฏิบัติการระบบจำหน่ายไฟฟ้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c6.3.1',code:'C6.3.1',name:'งานบริหารจัดการระบบจำหน่ายไฟฟ้า',status:'active'},
      {id:'c6.3.2',code:'C6.3.2',name:'งานบริหารจัดการการดับไฟล่วงหน้าในระบบจำหน่ายไฟฟ้า',status:'active'},
      {id:'c6.3.3',code:'C6.3.3',name:'งานบริหารจัดการเหตุการณ์ในระบบจำหน่ายไฟฟ้า',status:'active'}
    ]}
  ]},
  {id:'c7',code:'C7',name:'การสร้างความสัมพันธ์ลูกค้าและการตลาด (D R)',status:'active',children:[
    {id:'c7.1',code:'C7.1',name:'กระบวนการวางแผนกลยุทธ์ด้านลูกค้าและการตลาด',status:'active',unit:'ฝ่าย',children:[
      {id:'c7.1.1',code:'C7.1.1',name:'งานวางแผนกลยุทธ์ด้านลูกค้า',status:'active'},
      {id:'c7.1.2',code:'C7.1.2',name:'งานจัดกลุ่มลูกค้า',status:'active'},
      {id:'c7.1.3',code:'C7.1.3',name:'งานออกแบบ และพัฒนาประสบการณ์ใช้บริการของลูกค้า',status:'active'},
      {id:'c7.1.4',code:'C7.1.4',name:'งานติดตาม รวบรวม การรับฟังลูกค้าจากทุกช่องทาง',status:'active'},
      {id:'c7.1.5',code:'C7.1.5',name:'งานสำรวจ และวิเคราะห์สารสนเทศความต้องการ ความคาดหวัง ความพึงพอใจและความผูกพันของลูกค้า',status:'active'},
      {id:'c7.1.6',code:'C7.1.6',name:'งานสื่อสารการตลาด',status:'active'}
    ]},
    {id:'c7.2',code:'C7.2',name:'กระบวนการบริหารช่องทางการให้บริการ',status:'active',unit:'ฝ่าย',children:[
      {id:'c7.2.1',code:'C7.2.1',name:'งานพัฒนา ออกแบบช่องทางการให้บริการ (Physical และ Digital)',status:'active'},
      {id:'c7.2.2',code:'C7.2.2',name:'งานบริหารจัดการช่องทางการให้บริการ (Physical และ Digital)',status:'active'}
    ]},
    {id:'c7.3',code:'C7.3',name:'กระบวนการสร้างความสัมพันธ์กับลูกค้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c7.3.1',code:'C7.3.1',name:'งานวิเคราะห์จัดทำแผนและติดตามประเมินผลการบริหารความสัมพันธ์กับลูกค้า',status:'active'},
      {id:'c7.3.2',code:'C7.3.2',name:'งานบริหารความสัมพันธ์กับลูกค้ารายสำคัญ',status:'active'},
      {id:'c7.3.3',code:'C7.3.3',name:'งานสร้างความสัมพันธ์จากการสร้างประสบการณ์ที่ดีกับลูกค้า',status:'active'}
    ]},
    {id:'c7.4',code:'C7.4',name:'กระบวนการจัดการข้อร้องเรียนลูกค้า',status:'active',unit:'ฝ่าย',children:[
      {id:'c7.4.1',code:'C7.4.1',name:'งานบริหารจัดการข้อร้องเรียน',status:'active'},
      {id:'c7.4.2',code:'C7.4.2',name:'งานวิเคราะห์สาเหตุและกำหนดแนวทางในการเพิ่มประสิทธิภาพการบริหารจัดการข้อร้องเรียน',status:'active'}
    ]}
  ]},
  {id:'c8',code:'C8',name:'การบริการลูกค้า (D R)',status:'active',children:[
    {id:'c8.1',code:'C8.1',name:'กระบวนการบริการและสนับสนุนลูกค้าธุรกิจหลัก',status:'active',unit:'ฝ่าย',children:[
      {id:'c8.1.1',code:'C8.1.1',name:'งานบริการด้านขอใช้ไฟ',status:'active'},
      {id:'c8.1.2',code:'C8.1.2',name:'งานเชื่อมต่อเครื่องกำเนิดไฟฟ้า',status:'active'},
      {id:'c8.1.3',code:'C8.1.3',name:'งานโอนเปลี่ยนชื่อ เปลี่ยนและคืนหลักทรัพย์ค้ำประกัน',status:'active'},
      {id:'c8.1.4',code:'C8.1.4',name:'งานบริการจัดการด้านมิเตอร์',status:'active'},
      {id:'c8.1.5',code:'C8.1.5',name:'งานบริการด้านการจดหน่วย',status:'active'},
      {id:'c8.1.6',code:'C8.1.6',name:'งานบริการด้านการแจ้งค่าไฟฟ้า',status:'active'},
      {id:'c8.1.7',code:'C8.1.7',name:'งานบริการด้านการชำระค่าไฟฟ้า',status:'active'},
      {id:'c8.1.8',code:'C8.1.8',name:'งานบริการงดจ่ายไฟ',status:'active'},
      {id:'c8.1.9',code:'C8.1.9',name:'งานติดตามหนี้ค่าไฟฟ้า',status:'active'}
    ]},
    {id:'c8.2',code:'C8.2',name:'กระบวนการบริการและสนับสนุนลูกค้าธุรกิจเกี่ยวเนื่อง',status:'active',unit:'ฝ่าย',children:[
      {id:'c8.2.1',code:'C8.2.1',name:'งานให้บริการธุรกิจเกี่ยวเนื่องภายใน กฟภ.',status:'active'},
      {id:'c8.2.2',code:'C8.2.2',name:'งานให้บริการธุรกิจกลุ่ม B2B',status:'active'},
      {id:'c8.2.3',code:'C8.2.3',name:'งานให้บริการธุรกิจกลุ่ม B2C',status:'active'},
      {id:'c8.2.4',code:'C8.2.4',name:'งานสนับสนุนการพัฒนาศักยภาพบุคลากรด้านดิจิทัล',status:'active'}
    ]}
  ]}
]},
{key:'enable',shortLabel:'ENABLER (สนับสนุน)',label:'Enable (สนับสนุน)',hint:'กระบวนการสนับสนุนที่เอื้อให้กระบวนการหลักดำเนินไปได้',children:[
  {id:'e1',code:'E1',name:'การบริหารห่วงโซ่อุปทาน',status:'active',children:[
    {id:'e1.1',code:'E1.1',name:'กระบวนการวางแผนด้านพัสดุ',status:'active',unit:'ฝ่าย',children:[
      {id:'e1.1.1',code:'E1.1.1',name:'งานพยากรณ์และงานวางแผนความต้องการพัสดุ (พัสดุหลักและพัสดุสำรอง)',status:'active'},
      {id:'e1.1.2',code:'E1.1.2',name:'งานบริหารจัดการด้านพัสดุ',status:'active'},
      {id:'e1.1.3',code:'E1.1.3',name:'งานบริหารจัดการข้อมูลหลัก (Master Data) พัสดุ',status:'active'}
    ]},
    {id:'e1.2',code:'E1.2',name:'กระบวนการบริหารจัดการการจัดซื้อจัดจ้าง',status:'active',unit:'ฝ่าย',children:[
      {id:'e1.2.1',code:'E1.2.1',name:'งานขึ้นทะเบียนคู่ค้าหรือผู้รับจ้าง และขึ้นทะเบียนอุปกรณ์ไฟฟ้า',status:'active'},
      {id:'e1.2.2',code:'E1.2.2',name:'งานจัดการการจัดซื้อจัดจ้าง',status:'active'},
      {id:'e1.2.3',code:'E1.2.3',name:'งานบริหารจัดการความสัมพันธ์ของผู้ส่งมอบ คู่ค้า คู่ความร่วมมือ',status:'active'}
    ]},
    {id:'e1.3',code:'E1.3',name:'กระบวนการบริหารจัดการคลังพัสดุ',status:'active',unit:'ฝ่าย',children:[
      {id:'e1.3.1',code:'E1.3.1',name:'งานรับพัสดุ',status:'active'},
      {id:'e1.3.2',code:'E1.3.2',name:'งานวางแผนกระจายพัสดุ',status:'active'},
      {id:'e1.3.3',code:'E1.3.3',name:'งานจ่ายพัสดุ',status:'active'},
      {id:'e1.3.4',code:'E1.3.4',name:'งานบริหารจัดการคลังพัสดุ',status:'active'}
    ]},
    {id:'e1.4',code:'E1.4',name:'กระบวนการบริหารจัดการการส่งพัสดุ',status:'active',unit:'ฝ่าย',children:[
      {id:'e1.4.1',code:'E1.4.1',name:'งานวางแผนและจัดการเส้นทาง การขนส่งและโหลดขนส่ง',status:'active'},
      {id:'e1.4.2',code:'E1.4.2',name:'งานติดตามและควบคุมการขนส่งและ Logistic',status:'active'}
    ]}
  ]},
  {id:'e2',code:'E2',name:'งบประมาณ บัญชีและการเงิน',status:'active',children:[
    {id:'e2.1',code:'E2.1',name:'กระบวนการด้านงบประมาณ',status:'active',unit:'ฝ่าย',children:[
      {id:'e2.1.1',code:'E2.1.1',name:'งานวางแผนงบประมาณ',status:'active'},
      {id:'e2.1.2',code:'E2.1.2',name:'งานวิเคราะห์การเงินและจัดการเงินทุน',status:'active'},
      {id:'e2.1.3',code:'E2.1.3',name:'งานบริหารควบคุมและติดตามการดำเนินงานตามงบประมาณ',status:'active'}
    ]},
    {id:'e2.2',code:'E2.2',name:'กระบวนการด้านบัญชี',status:'active',unit:'ฝ่าย',children:[
      {id:'e2.2.1',code:'E2.2.1',name:'งานกำหนดและสอบทานนโยบายการบัญชี',status:'active'},
      {id:'e2.2.2',code:'E2.2.2',name:'งานบันทึกรายการรายบัญชีและบัญชีย่อย',status:'active'},
      {id:'e2.2.3',code:'E2.2.3',name:'งานปิดบัญชีประจำงวด',status:'active'},
      {id:'e2.2.4',code:'E2.2.4',name:'งานวิเคราะห์และการรายงาน',status:'active'}
    ]},
    {id:'e2.3',code:'E2.3',name:'กระบวนการด้านการเงิน',status:'active',unit:'ฝ่าย',children:[
      {id:'e2.3.1',code:'E2.3.1',name:'งานวางแผนจัดการด้านการเงิน',status:'active'},
      {id:'e2.3.2',code:'E2.3.2',name:'งานบริหารจัดการรายได้',status:'active'},
      {id:'e2.3.3',code:'E2.3.3',name:'งานบริหารจัดการด้านการเงิน ตรวจจ่าย และภาษี',status:'active'},
      {id:'e2.3.4',code:'E2.3.4',name:'งานวิเคราะห์กระแสเงินสดและความต้องการทางการเงิน',status:'active'},
      {id:'e2.3.5',code:'E2.3.5',name:'งานบริหารจัดการชำระหนี้เงินกู้',status:'active'}
    ]}
  ]},
  {id:'e3',code:'E3',name:'การบริหารและพัฒนาทรัพยากรบุคคล',status:'active',children:[
    {id:'e3.1',code:'E3.1',name:'กระบวนการบริหารทรัพยากรบุคคล',status:'active',unit:'ฝ่าย',children:[
      {id:'e3.1.1',code:'E3.1.1',name:'งานวางแผนยุทธศาสตร์ด้านบริหารทรัพยากรมนุษย์',status:'active'},
      {id:'e3.1.2',code:'E3.1.2',name:'งานวิเคราะห์อัตรากำลังส่วนเกินและส่วนขาด และความต้องการขององค์กร',status:'active'},
      {id:'e3.1.3',code:'E3.1.3',name:'งานจัดการการสรรหาบุคลากร',status:'active'},
      {id:'e3.1.4',code:'E3.1.4',name:'งานบริหารจัดการบุคลากร',status:'active'},
      {id:'e3.1.5',code:'E3.1.5',name:'งานจัดการประสิทธิภาพการปฏิบัติงานของบุคลากร',status:'active'},
      {id:'e3.1.6',code:'E3.1.6',name:'งานจัดการเส้นทางการเติบโต (Career path)',status:'active'}
    ]},
    {id:'e3.2',code:'E3.2',name:'กระบวนการพัฒนาทรัพยากรบุคคล',status:'active',unit:'ฝ่าย',children:[
      {id:'e3.2.1',code:'E3.2.1',name:'งานวางแผน จัดทำและพัฒนาแผนการเรียนรู้ของบุคลากร',status:'active'},
      {id:'e3.2.2',code:'E3.2.2',name:'งานบริหารจัดการด้านการฝึกอบรมบุคลากร',status:'active'},
      {id:'e3.2.3',code:'E3.2.3',name:'งานจัดการประสิทธิภาพการเรียนรู้ของพนักงาน',status:'active'}
    ]},
    {id:'e3.3',code:'E3.3',name:'กระบวนการบริหารจัดการสิทธิประโยชน์ สวัสดิการ และความผูกพันของบุคลากร',status:'active',unit:'ฝ่าย',children:[
      {id:'e3.3.1',code:'E3.3.1',name:'งานวางแผนการจัดการด้านสวัสดิการ',status:'active'},
      {id:'e3.3.2',code:'E3.3.2',name:'งานบริหารจัดการสวัสดิการและผลตอบแทนพนักงาน',status:'active'},
      {id:'e3.3.3',code:'E3.3.3',name:'งานจัดทำโครงสร้างเงินเดือนและสิทธิประโยชน์',status:'active'},
      {id:'e3.3.4',code:'E3.3.4',name:'งานบริหารจัดการความผูกพันของพนักงานและลูกจ้าง',status:'active'}
    ]},
    {id:'e3.4',code:'E3.4',name:'กระบวนการจัดการด้านความปลอดภัย อาชีวอนามัย และสภาพแวดล้อม ในการทำงาน',status:'active',unit:'ฝ่าย',children:[
      {id:'e3.4.1',code:'E3.4.1',name:'งานความปลอดภัย อาชีวอนามัย และสภาพแวดล้อม ในการทำงาน',status:'active'}
    ]}
  ]},
  {id:'e4',code:'E4',name:'การสื่อสารภาพลักษณ์องค์กร',status:'active',children:[
    {id:'e4.1',code:'E4.1',name:'กระบวนการสร้างภาพลักษณ์องค์กร',status:'active',unit:'ฝ่าย',children:[
      {id:'e4.1.1',code:'E4.1.1',name:'งานวางแผนกลยุทธ์ด้านการสร้างภาพลักษณ์องค์กร',status:'active'}
    ]},
    {id:'e4.2',code:'E4.2',name:'กระบวนการสื่อสาร',status:'active',unit:'ฝ่าย',children:[
      {id:'e4.2.1',code:'E4.2.1',name:'งานบริหารจัดการข้อมูลข่าวสารเพื่อการสื่อสารทั้งภายในและภายนอกองค์กร',status:'active'}
    ]}
  ]},
  {id:'e5',code:'E5',name:'การบริการองค์กร',status:'active',children:[
    {id:'e5.1',code:'E5.1',name:'กระบวนการบริการองค์กร',status:'active',unit:'ฝ่าย',children:[
      {id:'e5.1.1',code:'E5.1.1',name:'งานออกแบบและก่อสร้างอาคารสำนักงาน',status:'active'},
      {id:'e5.1.2',code:'E5.1.2',name:'งานบริหารจัดการพลังงาน',status:'active'},
      {id:'e5.1.3',code:'E5.1.3',name:'งานบริหารจัดการ บำรุงรักษา และดูแลสถานที่และทรัพย์สินของ กฟภ.',status:'active'},
      {id:'e5.1.4',code:'E5.1.4',name:'งานบริหารจัดการสิ่งอำนวยความสะดวกให้แก่พนักงาน กฟภ.',status:'active'},
      {id:'e5.1.5',code:'E5.1.5',name:'งานบริหารจัดการด้านประกันภัย และภาษีทรัพย์สิน',status:'active'},
      {id:'e5.1.6',code:'E5.1.6',name:'งานบริหารจัดการงานธุรการ',status:'active'},
      {id:'e5.1.7',code:'E5.1.7',name:'งานสนับสนุนการกำกับดูแล ของ คณะกรรมการ กฟภ. และผู้บริหารระดับสูง ของ กฟภ.',status:'active'},
      {id:'e5.1.8',code:'E5.1.8',name:'งานบริหารจัดการ เครื่องจักรกล เครื่องทุ่นแรง และยานพาหนะระบบไฟฟ้า',status:'active'},
      {id:'e5.1.9',code:'E5.1.9',name:'ประสานงานภูมิภาค',status:'active'}
    ]}
  ]},
  {id:'e6',code:'E6',name:'การบริหารจัดการเทคโนโลยีดิจิทัล',status:'active',children:[
    {id:'e6.1',code:'E6.1',name:'กระบวนการวางแผนกลยุทธ์และบริหารจัดการกลุ่มโครงการเทคโนโลยีดิจิทัล',status:'active',unit:'ฝ่าย',children:[
      {id:'e6.1.1',code:'E6.1.1',name:'งานวางแผนกลยุทธ์และวางแผนกลุ่มโครงการเทคโนโลยีดิจิทัล',status:'active'},
      {id:'e6.1.2',code:'E6.1.2',name:'งานบริหารจัดการกลุ่มโครงการเทคโนโลยีดิจิทัล',status:'active'},
      {id:'e6.1.3',code:'E6.1.3',name:'งานบริหาร IT Portfolio',status:'active'}
    ]},
    {id:'e6.2',code:'E6.2',name:'กระบวนการบริหารจัดการโครงการ',status:'active',unit:'ฝ่าย',children:[
      {id:'e6.2.1',code:'E6.2.1',name:'งานบริหารจัดการโครงการ',status:'active'},
      {id:'e6.2.2',code:'E6.2.2',name:'งานบริหารสัญญา',status:'active'}
    ]},
    {id:'e6.3',code:'E6.3',name:'กระบวนการพัฒนาระบบดิจิทัล',status:'active',unit:'ฝ่าย',children:[
      {id:'e6.3.1',code:'E6.3.1',name:'งานวางแผน และบริหารจัดการแผนพัฒนาระบบดิจิทัล',status:'active'},
      {id:'e6.3.2',code:'E6.3.2',name:'งานพัฒนาระบบดิจิทัล',status:'active'},
      {id:'e6.3.3',code:'E6.3.3',name:'กระบวนการบริหารจัดการโครงสร้างพื้นฐานด้านเทคโนโลยีดิจิทัล (Infrastructure)',status:'active'}
    ]},
    {id:'e6.4',code:'E6.4',name:'กระบวนการบริหารจัดการโครงสร้างพื้นฐานด้านเทคโนโลยี',status:'active',unit:'ฝ่าย',children:[
      {id:'e6.4.1',code:'E6.4.1',name:'งานวางแผนและพัฒนาสถาปัตยกรรมโครงสร้าง พื้นฐานเทคโนโลยีดิจิทัล',status:'active'},
      {id:'e6.4.2',code:'E6.4.2',name:'งานบริหารจัดการทรัพยากรระบบโครงสร้างพื้นฐาน เทคโนโลยีดิจิทัล',status:'active'}
    ]},
    {id:'e6.5',code:'E6.5',name:'กระบวนการบริหารจัดการความมั่นคงปลอดภัย',status:'active',unit:'ฝ่าย',children:[
      {id:'e6.5.1',code:'E6.5.1',name:'งานกำหนดนโยบายและวางแผนด้านความมั่นคงปลอดภัยสารสนเทศ',status:'active'},
      {id:'e6.5.2',code:'E6.5.2',name:'งานบริหารจัดการความมั่นคงปลอดภัย เทคโนโลยีสารสนเทศ',status:'active'},
      {id:'e6.5.3',code:'E6.5.3',name:'งานบริหารจัดการความมั่นคงปลอดภัยเทคโนโลยีปฏิบัติการ',status:'active'}
    ]},
    {id:'e6.6',code:'E6.6',name:'กระบวนการบริหารจัดการการบริการเทคโนโลยี (Digital Service)',status:'active',unit:'ฝ่าย',children:[
      {id:'e6.6.1',code:'E6.6.1',name:'งานบริหารจัดการ Digital Service Strategy',status:'active'},
      {id:'e6.6.2',code:'E6.6.2',name:'งานบริหารจัดการ Digital Service',status:'active'},
      {id:'e6.6.3',code:'E6.6.3',name:'งานบริหารจัดการ Digital Service Performance',status:'active'},
      {id:'e6.6.4',code:'E6.6.4',name:'งานบริหารความต่อเนื่องทางธุรกิจ',status:'active'},
      {id:'e6.6.5',code:'E6.6.5',name:'งานจัดการสิทธิ์การใช้งานสารสนเทศ',status:'active'}
    ]},
    {id:'e6.7',code:'E6.7',name:'กระบวนการบริหารจัดการข้อมูล',status:'active',unit:'ฝ่าย',children:[
      {id:'e6.7.1',code:'E6.7.1',name:'งานบริหารจัดการข้อมูลขนาดใหญ่',status:'active'},
      {id:'e6.7.2',code:'E6.7.2',name:'งานบริหารจัดการนำข้อมูลไปใช้ประโยชน์',status:'active'}
    ]}
  ]}
]}
];

const WORKLOAD_KPI = [
{unit:'ฝ่ายบริการลูกค้า เขต 1',reports:214,onTime:196,late:18,passRate:91.6},
{unit:'ฝ่ายบริการลูกค้า เขต 2',reports:188,onTime:171,late:17,passRate:91.0},
{unit:'ฝ่ายปฏิบัติการเขต 3',reports:96,onTime:80,late:16,passRate:83.3},
{unit:'ฝ่ายปฏิบัติการเขต 4',reports:74,onTime:69,late:5,passRate:93.2},
{unit:'กองพัฒนาระบบงานองค์กร',reports:12,onTime:12,late:0,passRate:100}
];

const KPI_TREND = [78,81,80,84,86,88,85,90,91,89,92,94];

const EMPLOYEES = [
{id:'60112',name:'สมชาย ใจดี',position:'วิศวกร 6',unit:'กองพัฒนาระบบงานองค์กร'},
{id:'602385',name:'วิภาวี ศรีสุข',position:'นักบริหารงานทั่วไป 5',unit:'กองยุทธศาสตร์องค์กร'},
{id:'60305',name:'ธนกร พงษ์ไพบูลย์',position:'วิศวกร 7',unit:'ฝ่ายวางแผนระบบไฟฟ้า'},
{id:'60417',name:'อรทัย มั่นคง',position:'นักวิเคราะห์นโยบายและแผน 6',unit:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)'},
{id:'60529',name:'ปิยะพงษ์ เรืองศรี',position:'วิศวกร 5',unit:'กองกลยุทธ์ดิจิทัล (กดท.)'}
];
const CURRENT_USER = {employeeId:'602385',name:'วิภาวี ศรีสุข',units:['กองยุทธศาสตร์องค์กร','กองพัฒนาระบบงานองค์กร']};

function flattenBaLevels(){
  const l0=[],l1=[],l2=[];
  BA_GROUPS.forEach(g=>g.children.forEach(n0=>{
    l0.push({code:n0.code,name:n0.name,group:g.shortLabel||g.label});
    (n0.children||[]).forEach(n1=>{
      l1.push({code:n1.code,name:n1.name,parent:n0.code});
      (n1.children||[]).forEach(n2=>{
        l2.push({code:n2.code,name:n2.name,parent:n1.code});
      });
    });
  }));
  return {l0,l1,l2};
}
const BA_LEVELS = flattenBaLevels();

Object.assign(window,{ORG_UNITS,SLA_MASTER,BA_GROUPS,WORKLOAD_KPI,KPI_TREND,EMPLOYEES,CURRENT_USER,BA_LEVELS});
