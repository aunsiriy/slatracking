const STATUS_STEPS = [
{key:'not_reported',label:'ยังไม่รายงาน',short:'ยังไม่รายงาน',color:'gray',dotColor:'var(--pea-gray-500)',icon:'clock'},
{key:'draft',label:'บันทึกร่าง',short:'บันทึกร่าง',color:'gray-blue',dotColor:'var(--pea-gray-blue-500)',icon:'edit'},
{key:'submitted',label:'ส่งรายงานแล้ว',short:'ส่งแล้ว',color:'blue',dotColor:'var(--pea-blue-500)',icon:'file-text'},
{key:'returned',label:'ถูกคืนแก้ไข',short:'ถูกคืน',color:'orange',dotColor:'var(--pea-orange-500)',icon:'corner-up-left'},
{key:'resubmitted',label:'ส่งใหม่หลังแก้ไข',short:'ส่งใหม่',color:'indigo',dotColor:'var(--pea-indigo-500)',icon:'file-text'},
{key:'certified',label:'รับรองผลแล้ว',short:'รับรองแล้ว',color:'success',dotColor:'var(--pea-fg-success-primary)',icon:'shield-check'},
{key:'locked',label:'ล็อกข้อมูลแล้ว',short:'ล็อกแล้ว',color:'brand',dotColor:'var(--pea-fg-brand-primary)',icon:'lock'}
];

const PERIOD = {
  name:'กรกฎาคม 2569',
  cycle:'รายเดือน',
  openDate:'1 ก.ค. 2569',
  deadline:'20 ก.ค. 2569',
  closeDate:'25 ก.ค. 2569',
  daysLeft:3,
  status:'open'
};

const ACTIVITY_ALL = [
{id:1,actor:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',action:'ส่งรายงาน SLA',target:'"ระยะเวลาแก้ไขไฟฟ้าขัดข้อง"',statusKey:'submitted',time:'วันนี้ 09:42',audience:['admin','manager']},
{id:2,actor:'กนอ. · สมชาย ตั้งใจดี',action:'คืนแก้ไขรายงาน',target:'"อัตราการติดตั้งมิเตอร์ใหม่" — เอกสารหลักฐานไม่ครบ',statusKey:'returned',time:'วันนี้ 08:15',audience:['admin','manager','staff']},
{id:3,actor:'ผู้บริหารกอง · วิภา รักงาน',action:'รับรองผลรายงาน',target:'"อัตราความพึงพอใจลูกค้า"',statusKey:'certified',time:'เมื่อวาน 17:50',audience:['admin','manager']},
{id:4,actor:'กนอ.',action:'แก้ไข BA Master',target:'ปรับค่าเป้าหมาย KPI "เวลาตอบสนอง Call Center" จาก 90% เป็น 92%',statusKey:'locked',time:'เมื่อวาน 14:02',audience:['admin']},
{id:5,actor:'ผู้บริหารสายงาน · ประยุทธ์ มั่นคง',action:'มอบหมาย Learning Form ปี 2569',target:'ให้ 6 หน่วยงานในสายงาน',statusKey:'resubmitted',time:'2 วันที่แล้ว',audience:['admin','manager','staff']},
{id:6,actor:'กนอ.',action:'ล็อกข้อมูลรอบรายงาน',target:'มิถุนายน 2569',statusKey:'locked',time:'5 วันที่แล้ว',audience:['admin','manager']},
{id:7,actor:'ฝ่ายปฏิบัติการเขต 4',action:'ส่งรายงานใหม่หลังแก้ไข',target:'"ระยะเวลาการซ่อมแซมระบบจำหน่าย"',statusKey:'resubmitted',time:'6 วันที่แล้ว',audience:['admin']},
{id:8,actor:'ระบบ',action:'สร้าง QIR อัตโนมัติ',target:'จาก KPI ที่ไม่ผ่านเกณฑ์ "อัตราไฟดับเฉลี่ยต่อราย (SAIFI)"',statusKey:'returned',time:'6 วันที่แล้ว',audience:['admin','manager']}
];

const ROLES = {
  admin:{
    key:'admin',roleLabel:'กนอ. (System Admin)',shortLabel:'กนอ.',division:'กองพัฒนาระบบงานองค์กร (กพอ.)',
    person:'สมหญิง ดูแลดี',initials:'สด',scopeLabel:'ทุกหน่วยงานทั่วองค์กร',
    counts:{not_reported:32,draft:58,submitted:96,returned:21,resubmitted:34,certified:152,locked:35},
    bannerText:'มี 12 หน่วยงานยังไม่ส่งรายงาน SLA ประจำเดือนกรกฎาคม 2569',
    kpi:[
      {value:12,label:'หน่วยงานเกินกำหนดส่งวันนี้',cta:'ดูหน่วยงาน',color:'error'},
      {value:28,label:'QIR รอดำเนินการทั่วองค์กร',cta:'ดูรายละเอียด',color:'blue'},
      {value:35,label:'SLA ตกเกณฑ์ที่ต้องติดตาม',cta:'ไปที่รายงาน',color:'success'}
    ],
    cards:{
      ba:{enabled:true,badge:'จัดการได้',cta:'จัดการ BA Master',ctaVariant:'primary',stat:'5 รายการรอตรวจสอบ'},
      sla:{enabled:true,badge:'ภาพรวมองค์กร',cta:'ดูรายงานทั้งหมด',ctaVariant:'secondary',stat:'96 ส่งแล้ว · 21 ถูกคืน'},
      learning:{enabled:true,badge:'ภาพรวมองค์กร',cta:'จัดการ learning form',ctaVariant:'secondary',stat:'8 หน่วยงานอยู่ระหว่างวิเคราะห์',href:'/learning-form-overview-admin'}
    }
  },
  manager:{
    key:'manager',roleLabel:'ผู้บริหารระดับฝ่าย/เขต',shortLabel:'ฝ่าย/เขต',division:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',
    person:'ไฟฟ้า สว่างจ้า',initials:'ปม',scopeLabel:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',
    counts:{not_reported:2,draft:4,submitted:6,returned:2,resubmitted:3,certified:5,locked:2},
    bannerText:'คุณมีรายการที่ยังไม่รายงาน 4 รายการ ก่อนถึงกำหนดส่ง',
    kpi:[
      {value:8,label:'งานที่ต้องทำวันนี้',cta:'ดูงานของฉัน',color:'success'},
      {value:5,label:'QIR รอดำเนินการ',cta:'ดูรายละเอียด',color:'blue'},
      {value:3,label:'SLA ตกเกณฑ์ที่ต้องรายงานผล',cta:'ไปที่รายงาน',color:'error'}
    ],
    cards:{
      ba:{enabled:false,badge:'View only',cta:'ดูโครงสร้าง BA',ctaVariant:'secondary',stat:'อ้างอิงเท่านั้น'},
      sla:{enabled:true,badge:'ต้องดำเนินการ',cta:'ไปที่รายงาน SLA',ctaVariant:'primary',stat:'4 ต้องกรอก · 2 ถูกคืน',href:'/sla-overview'},
      learning:{enabled:true,badge:'ได้รับมอบหมาย',cta:'ไปที่ Learning Form',ctaVariant:'secondary',stat:'2 รายการรอดำเนินการ',href:'/learning-form-overview'}
    }
  },
  staff:{
    key:'staff',roleLabel:'พนักงานหน้างาน',shortLabel:'หน้างาน',division:'แขวงเชียงใหม่ 2',
    person:'มานี ใจดี',initials:'มจ',scopeLabel:'หน่วยงานของฉันเท่านั้น',
    counts:{not_reported:1,draft:1,submitted:1,returned:0,resubmitted:1,certified:1,locked:1},
    bannerText:'คุณมี Learning Form ที่ได้รับมอบหมาย 1 รายการ',
    kpi:[
      {value:2,label:'งานที่ต้องทำวันนี้',cta:'ดูงานของฉัน',color:'success'},
      {value:1,label:'Learning Form รอดำเนินการ',cta:'ไปที่ Learning Form',color:'blue'},
      {value:1,label:'SLA ของฉันที่ต้องติดตาม',cta:'ดูผลของฉัน',color:'error'}
    ],
    cards:{
      ba:{enabled:false,badge:'View only',cta:'ดูโครงสร้าง BA',ctaVariant:'secondary',stat:'อ้างอิงเท่านั้น'},
      sla:{enabled:false,badge:'ดูผลของฉัน',cta:'ดูผล SLA ของฉัน',ctaVariant:'secondary',stat:'1 รายการรอกรอก'},
      learning:{enabled:true,badge:'ได้รับมอบหมาย',cta:'กรอก Learning Form',ctaVariant:'primary',stat:'1 รายการ ครบกำหนด 20 ก.ค.',href:'/learning-form-overview'}
    }
  }
};

const FEATURE_ITEMS = [
];

const HELP_ITEMS = [
{icon:'book','label':'คู่มือการใช้งาน'},
{icon:'help-circle',label:'คำถามที่พบบ่อย (FAQ)'},
{icon:'alert-triangle',label:'แจ้งปัญหาการใช้งาน'}
];

const NOTIFICATIONS = [
{id:1,text:'รายงาน SLA เลขที่ ',ref:'RPT-2569-114',after:' ได้รับการรับรองแล้ว',time:'10 นาทีที่แล้ว',read:false},
{id:2,text:'รายงาน SLA เลขที่ ',ref:'RPT-2569-113',after:' รอการตรวจสอบจากหน่วยงานต้นสังกัด',time:'12/07/2569 16:00',read:false},
{id:3,text:'รายงาน SLA เลขที่ ',ref:'RPT-2569-112',after:' ถูกคืนแก้ไข กรุณาตรวจสอบ',time:'12/07/2569 09:20',read:false},
{id:4,text:'Learning Form ของ ',ref:'ฝ่ายบริการลูกค้า เขต 1',after:' ได้รับมอบหมายใหม่',time:'11/07/2569 14:05',read:false},
{id:5,text:'QIR ประจำปี 2569 ',ref:'',after:'ใกล้ครบกำหนดส่ง (เหลือ 3 วัน)',time:'10/07/2569 08:00',read:false},
{id:6,text:'SLA Master: ',ref:'อัตราการติดตั้งมิเตอร์ใหม่ภายใน 7 วัน',after:' มีการปรับปรุงเกณฑ์',time:'05/07/2569 10:00',read:true},
{id:7,text:'รายงาน SLA เลขที่ ',ref:'RPT-2569-098',after:' ได้รับการรับรองแล้ว',time:'01/07/2569 09:00',read:true}
];

Object.assign(window,{STATUS_STEPS,PERIOD,ACTIVITY_ALL,ROLES,FEATURE_ITEMS,HELP_ITEMS,NOTIFICATIONS});
