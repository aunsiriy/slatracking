const USER_ROLES=[
{key:'admin',label:'Admin — กนอ. (System Admin)',desc:'เข้าถึงและจัดการได้ทุกส่วนของระบบ'},
{key:'manager',label:'Manager — ผู้บริหารระดับฝ่าย/เขต',desc:'จัดการข้อมูลและอนุมัติรายงานของหน่วยงานตนเอง'},
{key:'staff',label:'Staff — พนักงานหน้างาน',desc:'ดูข้อมูลและกรอกรายงานตามสิทธิ์ที่กำหนด'}
];
const ROLE_PRESET_PERMS={
admin:['users','org','arch','sla','sla_report','learning','ba_rel','work_process'],
manager:['sla','sla_report','learning'],
staff:['sla_report']
};
const PERMISSIONS=[
{key:'users',label:'จัดการผู้ใช้งานระบบ'},
{key:'org',label:'ตั้งค่าหน่วยงาน'},
{key:'arch',label:'ตั้งค่า Business Architecture'},
{key:'sla',label:'ตั้งค่า SLA Master'},
{key:'sla_report',label:'รายงานผล SLA'},
{key:'learning',label:'Learning Form & QIR'},
{key:'ba_rel',label:'BA Relationships'},
{key:'work_process',label:'Work Process'}
];
const SYSTEM_USERS=[
{id:1,username:'admin',fullName:'สมหญิง ดูแลดี',email:'admin@pea.co.th',phone:'081-234-5670',role:'admin',unit:'กองพัฒนาระบบงานองค์กร',permissions:ROLE_PRESET_PERMS.admin.slice(),status:'active',lastLogin:'23/07/2569 14:12'},
{id:2,username:'ฝพป',fullName:'ไฟฟ้า สว่างจ้า',email:'faipor@pea.co.th',phone:'081-234-5671',role:'manager',unit:'ฝ่ายบริการลูกค้า เขต 1 (ภาคเหนือ)',permissions:['sla','sla_report','learning'],status:'active',lastLogin:'22/07/2569 09:40'},
{id:3,username:'ฝคข',fullName:'มานี ใจดี',email:'fakhkh@pea.co.th',phone:'081-234-5672',role:'staff',unit:'แขวงเชียงใหม่ 2',permissions:['sla_report'],status:'active',lastLogin:'20/07/2569 11:05'},
{id:4,username:'ฝพจ',fullName:'วิภาวี ศรีสุข',email:'faipj@pea.co.th',phone:'081-234-5673',role:'manager',unit:'ฝ่ายเลขานุการองค์กร',permissions:['arch','ba_rel','work_process'],status:'inactive',lastLogin:'02/06/2569 16:20'},
{id:5,username:'กกก',fullName:'ปิยะพงษ์ เรืองศรี',email:'kkk@pea.co.th',phone:'081-234-5674',role:'staff',unit:'กองกิจการคณะกรรมการ',permissions:['learning'],status:'active',lastLogin:'19/07/2569 08:55'}
];
Object.assign(window,{USER_ROLES,ROLE_PRESET_PERMS,PERMISSIONS,SYSTEM_USERS});
