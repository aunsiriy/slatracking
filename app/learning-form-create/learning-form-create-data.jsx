const LFC_YEARS=['2569','2568','2567'];
const LFC_UNITS=[
{key:'org1',name:'ฝ่ายพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',level:'district'},
{key:'org2',name:'เขต 1 (ภาคเหนือ)',level:'district'},
{key:'org3',name:'เขต 2 (ภาคตะวันออกเฉียงเหนือ)',level:'district'},
{key:'org4',name:'กฟฟ. เชียงใหม่ 2',level:'branch'},
{key:'org5',name:'กฟฟ. ขอนแก่น',level:'branch'},
{key:'org6',name:'กฟฟ. นครราชสีมา',level:'branch'}
];
const LFC_LEVEL_LABEL={district:'สายงานเขต/สำนักงานใหญ่',branch:'สำนักงานการไฟฟ้า (กฟฟ.)'};
const LFC_EMPLOYEES={
'100234':{name:'สมชาย ใจดี',position:'วิศวกรไฟฟ้า 6',tel:'081-234-5678'},
'100589':{name:'วิภา รักงาน',position:'ผู้บริหารกอง',tel:'082-345-6789'},
'100721':{name:'ประยุทธ มั่นคง',position:'หัวหน้าแผนกระบบจำหน่าย',tel:'083-456-7890'},
'100915':{name:'กนกวรรณ ศรีสุข',position:'นักวิเคราะห์นโยบายและแผน 5',tel:'084-567-8901'},
'101044':{name:'ธนกร พงษ์ไพศาล',position:'วิศวกรไฟฟ้า 5',tel:'085-678-9012'}
};
function lfcLookupEmployee(empId){return LFC_EMPLOYEES[empId]||null;}
Object.assign(window,{LFC_YEARS,LFC_UNITS,LFC_LEVEL_LABEL,LFC_EMPLOYEES,lfcLookupEmployee});
