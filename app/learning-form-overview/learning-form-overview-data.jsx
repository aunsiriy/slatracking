const LFO_YEARS=['2569','2568','2567'];
const LFO_SUMMARY={total:11,byYear:{'2569':2,'2568':6,'2567':3},pendingCount:2};
const LFO_ITEMS=[
{id:1,process:'S1.3 กระบวนการพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',unit:'ฝ่ายพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',level:'district',year:'2569',status:'draft',date:'12/06/2569'},
{id:2,process:'S2.1 กระบวนการบำรุงรักษาระบบจำหน่าย',unit:'เขต 1 (ภาคเหนือ)',level:'district',year:'2569',status:'pending',date:'01/06/2569'},
{id:3,process:'P4 กระบวนการให้บริการผู้ใช้ไฟรายใหญ่',unit:'กฟฟ. เชียงใหม่ 2',level:'branch',year:'2568',status:'completed',date:'20/03/2568'},
{id:4,process:'P7 กระบวนการบำรุงรักษาอุปกรณ์ไฟฟ้า',unit:'กฟฟ. เชียงใหม่ 2',level:'branch',year:'2568',status:'pending',date:'15/02/2568'},
{id:5,process:'S1.3 กระบวนการพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',unit:'ฝ่ายพัฒนาองค์กรและบริหารการเปลี่ยนแปลง',level:'district',year:'2568',status:'completed',date:'28/01/2568'},
{id:6,process:'P2 กระบวนการติดตั้งมิเตอร์ใหม่',unit:'กฟฟ. เชียงใหม่ 2',level:'branch',year:'2567',status:'completed',date:'10/11/2567'}
];
const LFO_LEVEL_LABEL={district:'สายงานเขต/สำนักงานใหญ่',branch:'สำนักงานการไฟฟ้า (กฟฟ.)'};
const LFO_STATUS_MAP={draft:{label:'บันทึกร่าง',color:'gray'},pending:{label:'รอดำเนินการ',color:'warning'},completed:{label:'เสร็จสิ้น',color:'success'}};
Object.assign(window,{LFO_YEARS,LFO_SUMMARY,LFO_ITEMS,LFO_LEVEL_LABEL,LFO_STATUS_MAP});
