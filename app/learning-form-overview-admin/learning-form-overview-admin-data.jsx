const LFOA_YEARS=['2569','2568','2567'];
const LFOA_SUMMARY={total:47,byYear:{'2569':9,'2568':24,'2567':14},pendingCount:6};
const LFOA_UNITS=[
{key:'org1',name:'ฝ่ายพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',level:'district'},
{key:'org2',name:'เขต 1 (ภาคเหนือ)',level:'district'},
{key:'org3',name:'เขต 2 (ภาคตะวันออกเฉียงเหนือ)',level:'district'},
{key:'org4',name:'กฟฟ. เชียงใหม่ 2',level:'branch'},
{key:'org5',name:'กฟฟ. ขอนแก่น',level:'branch'},
{key:'org6',name:'กฟฟ. นครราชสีมา',level:'branch'}
];
const LFOA_ITEMS=[
{id:1,process:'S1.3 กระบวนการพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',unit:'ฝ่ายพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',level:'district',year:'2569',status:'draft'},
{id:2,process:'S2.1 กระบวนการบำรุงรักษาระบบจำหน่าย',unit:'เขต 1 (ภาคเหนือ)',level:'district',year:'2569',status:'pending'},
{id:3,process:'P4 กระบวนการให้บริการผู้ใช้ไฟรายใหญ่',unit:'กฟฟ. เชียงใหม่ 2',level:'branch',year:'2568',status:'completed'},
{id:4,process:'P7 กระบวนการบำรุงรักษาอุปกรณ์ไฟฟ้า',unit:'กฟฟ. ขอนแก่น',level:'branch',year:'2568',status:'pending'},
{id:5,process:'S1.3 กระบวนการพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',unit:'เขต 2 (ภาคตะวันออกเฉียงเหนือ)',level:'district',year:'2568',status:'completed'},
{id:6,process:'P2 กระบวนการติดตั้งมิเตอร์ใหม่',unit:'กฟฟ. นครราชสีมา',level:'branch',year:'2567',status:'completed'}
];
const LFOA_LEVEL_LABEL={district:'สายงานเขต/สำนักงานใหญ่',branch:'สำนักงานการไฟฟ้า (กฟฟ.)'};
const LFOA_STATUS_MAP={draft:{label:'บันทึกร่าง',color:'gray'},pending:{label:'รอดำเนินการ',color:'warning'},completed:{label:'เสร็จสิ้น',color:'success'}};
Object.assign(window,{LFOA_YEARS,LFOA_SUMMARY,LFOA_UNITS,LFOA_ITEMS,LFOA_LEVEL_LABEL,LFOA_STATUS_MAP});
