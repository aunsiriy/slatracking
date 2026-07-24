const P11_MONTHS=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
const P11_YEARS=['2569','2568','2567'];
const P11_COLUMNS=['P2','P3','P3_PS','P4','P5','P6','P9','P10'];

const P11_STATUS_LEGEND=[
{key:'submitted',label:'ส่งแล้วยังไม่อนุมัติ',color:'blue'},
{key:'approved',label:'อนุมัติแล้ว',color:'success'},
{key:'overdue_sent',label:'ส่งแล้วแต่เลยกำหนด',color:'warning'},
{key:'overdue_not_sent',label:'เลยกำหนด ไม่ส่งเลย',color:'error'},
{key:'not_reported',label:'ยังไม่ได้รายงาน',color:'gray'}
];

const P11_TREE=[
{id:'u1',name:'สายงานดิจิทัลและการสื่อสาร',level:0,qir:'approved',children:[
  {id:'u2',name:'ผู้ช่วยผู้ว่าการดิจิทัลและการสื่อสาร (ดิจิทัล)',level:1,qir:null,children:[
    {id:'u3',name:'ฝ่ายพัฒนาระบบดิจิทัล',level:2,qir:'submitted',children:[
      {id:'u4',name:'กองออกแบบและพัฒนาระบบดิจิทัล 2',level:3,qir:'overdue_sent',children:[]}
    ]}
  ]}
]}
];

const QIR_ANNUAL_META={division:'สายงานดิจิทัลและการสื่อสาร',year:'2569',process:'S1.3 — กระบวนการพัฒนาองค์กรและบริหารการเปลี่ยนแปลง'};

const QIR_CRITERIA=[
{id:1,label:'1. สอดคล้องตามยุทธศาสตร์ขององค์กร'},
{id:2,label:'2. สามารถเชื่อมโยงกับกระบวนการทำงานที่สำคัญ (Key Work Process) หรือกระบวนการทำงาน (Work Process) ตามสถาปัตยกรรมธุรกิจ (Business Architecture: BA) ขององค์กร'},
{id:3,label:'3. เป็นไปตามโครงสร้างองค์กรและหน้าที่ความรับผิดชอบ (Job Description) ของหน่วยงาน'},
{id:4,label:'4. เพิ่มประสิทธิภาพการดำเนินงานในด้านต่าง ๆ',children:[
  {id:'4.1',label:'4.1 เพิ่มรายได้/ลดต้นทุน/เพิ่มสภาพคล่องทางการเงิน'},
  {id:'4.2',label:'4.2 เพิ่มความคล่องตัวในการปฏิบัติงาน/ลดขั้นตอนการปฏิบัติงาน'},
  {id:'4.3',label:'4.3 เพิ่มความผูกพันกับลูกค้าและผู้มีส่วนได้ส่วนเสีย (Stakeholder)/ลดข้อร้องเรียน'},
  {id:'4.4',label:'4.4 สร้างมาตรฐานการปฏิบัติงานของกระบวนการทำงาน'}
]}
];

const QIR_SUGGESTIONS=[
{id:1,label:'1. ด้านบุคลากร (People)',hasDetail:true},
{id:2,label:'2. ขั้นตอน/วิธีการปฏิบัติงาน (Process)',hasDetail:true},
{id:3,label:'3. เทคโนโลยี (Technology)',hasDetail:true},
{id:4,label:'4. อื่นๆ',hasDetail:true}
];

Object.assign(window,{P11_MONTHS,P11_YEARS,P11_COLUMNS,P11_STATUS_LEGEND,P11_TREE,QIR_ANNUAL_META,QIR_CRITERIA,QIR_SUGGESTIONS});
