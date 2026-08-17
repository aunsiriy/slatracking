import Image from 'next/image';
import Link from 'next/link';
const {Button,InputField}=window.DesignSystem_cbd181;

const SLA_MONTH_FULL={'ม.ค.':'มกราคม','ก.พ.':'กุมภาพันธ์','มี.ค.':'มีนาคม','เม.ย.':'เมษายน','พ.ค.':'พฤษภาคม','มิ.ย.':'มิถุนายน','ก.ค.':'กรกฎาคม','ส.ค.':'สิงหาคม','ก.ย.':'กันยายน','ต.ค.':'ตุลาคม','พ.ย.':'พฤศจิกายน','ธ.ค.':'ธันวาคม'};

const SLA_ROWS=[
{p:'P1',provider:['ผบร.','ผบง.'],receiver:['ผบบ.','ผปร.'],criteria:'ข้อมูลการตัดมิเตอร์ประจำวันที่มีการนำเข้าระบบ ISU ภายในเวลา 16.00 น.',total:'0',pass:'0',fail:'0'},
{p:'P1',provider:['ผบบ.','ผปร.'],receiver:['ผบร.','ผบง.'],criteria:'เอกสาร (ค่าไฟฟ้าค้างชำระ และค่าธรรมเนียมการต่อกลับ/ค่าประกันเรียกเก็บเพิ่ม) ที่มีข้อมูลถูกต้อง เอกสารครบถ้วน และได้รับเงินที่ครบถ้วนตามที่ระบุในใบเสร็จ ส่งภายใน 9.00 น.',total:'0',pass:'0',fail:'0'},
{p:'P2',provider:['ผบบ.','ผปร.'],receiver:['ผบบ.','ผปร.'],criteria:'จ่ายกระแสไฟฟ้าคืนได้ภายใน 4 ชั่วโมง',total:'117',pass:'117',fail:'0'},
{p:'P3',provider:['ผบส.','ผบค.'],receiver:['ลูกค้า'],criteria:'นอกเขตชุมชน ดำเนินการติดตั้งจ่ายไฟแก่ลูกค้ารายใหม่ภายใน 5 วันทำการ',total:'146',pass:'2',fail:'55'},
{p:'P3',provider:['ผบส.','ผบค.'],receiver:['ลูกค้า'],criteria:'ในเขตชุมชน ดำเนินการติดตั้งจ่ายไฟแก่ลูกค้ารายใหม่ภายใน 2 วันทำการ',total:'34',pass:'0',fail:'2'},
{p:'P4',provider:['ผบส.'],receiver:['ลูกค้า'],criteria:'ดำเนินการแก้ไขข้อร้องเรียนของลูกค้าให้เสร็จสิ้นภายใน 7 วันทำการ',total:'12',pass:'11',fail:'1'},
{p:'P5',provider:['ผบง.'],receiver:['ผบบ.'],criteria:'จัดทำรายงานผลการดำเนินงานประจำเดือนส่งภายในวันที่ 5 ของเดือนถัดไป',total:'1',pass:'1',fail:'0'},
{p:'P6',provider:['ผบค.'],receiver:['ลูกค้า'],criteria:'บำรุงรักษาระบบจำหน่ายตามแผนงานประจำเดือนไม่น้อยกว่าร้อยละ 90',total:'8',pass:'7',fail:'1'},
{p:'P9',provider:['ผบร.'],receiver:['ผปร.'],criteria:'ตรวจสอบและยืนยันข้อมูลหน่วยจำหน่ายภายใน 3 วันทำการ',total:'22',pass:'22',fail:'0'},
{p:'P10',provider:['ผปร.'],receiver:['ผบบ.'],criteria:'สรุปผลการใช้พลังงานไฟฟ้ารายเดือน ส่งภายในวันที่ 10 ของเดือนถัดไป',total:'1',pass:'1',fail:'0'}
];

const SCORE_OPTIONS=['1 - น้อยที่สุด','2 - น้อย','3 - ปานกลาง','4 - มาก','5 - มากที่สุด'];

function TopBar(){
  return React.createElement('header',{className:'ptop'},
    React.createElement('a',{className:'ptop-back',href:'#',onClick:e=>{e.preventDefault();history.back();}},React.createElement(Icon,{name:'chevron-left',size:16}),'กลับ'),
    React.createElement('div',{className:'ptop-left'},
      React.createElement(Image,{className:'ptop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'ptop-word'},
        React.createElement('span',{className:'ptop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'ptop-sub'},'การรายงานผลข้อตกลงระดับการให้บริการ (SLA)')
      )
    )
  );
}

function SlaRow({row}){
  const [total,setTotal]=React.useState(row.total);
  const [pass,setPass]=React.useState(row.pass);
  const [fail,setFail]=React.useState(row.fail);
  const [score,setScore]=React.useState('');
  const [note,setNote]=React.useState('');
  return React.createElement('tr',{className:'ptree-row'},
    React.createElement('td',{className:'pform-p'},row.p,React.createElement(Icon,{name:'help-circle',size:13})),
    React.createElement('td',{className:'pform-party'},row.provider.map(x=>React.createElement('span',{key:x},x))),
    React.createElement('td',{className:'pform-party'},row.receiver.map(x=>React.createElement('span',{key:x},x))),
    React.createElement('td',{className:'pform-criteria'},row.criteria),
    React.createElement('td',null,React.createElement(InputField,{fieldType:'default',size:'sm',value:total,onChange:setTotal})),
    React.createElement('td',null,React.createElement(InputField,{fieldType:'default',size:'sm',value:pass,onChange:setPass})),
    React.createElement('td',null,React.createElement(InputField,{fieldType:'default',size:'sm',value:fail,onChange:setFail})),
    React.createElement('td',null,
      React.createElement('select',{className:'pform-select',value:score,onChange:e=>setScore(e.target.value)},
        React.createElement('option',{value:''},'เลือกคะแนน'),
        SCORE_OPTIONS.map(o=>React.createElement('option',{key:o,value:o},o))
      )
    ),
    React.createElement('td',null,React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:'ระบุ',value:note,onChange:setNote}))
  );
}

function App(){
  const [unit,setUnit]=React.useState('การไฟฟ้าส่วนภูมิภาคจังหวัดพิษณุโลก');
  const [year,setYear]=React.useState('2569');
  const [monthAbbr,setMonthAbbr]=React.useState('ม.ค.');
  const [confirmOpen,setConfirmOpen]=React.useState(false);
  const [successOpen,setSuccessOpen]=React.useState(false);
  const [toast,setToast]=React.useState('');
  React.useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    setUnit(params.get('unit')||'การไฟฟ้าส่วนภูมิภาคจังหวัดพิษณุโลก');
    setYear(params.get('year')||'2569');
    setMonthAbbr(params.get('month')||'ม.ค.');
  },[]);
  const month=SLA_MONTH_FULL[monthAbbr]||monthAbbr;
  function doSave(){
    try{
      const key='p11_reported_'+year;
      const cur=JSON.parse(localStorage.getItem(key)||'{}');
      cur[monthAbbr]={recorder:{name:'สมชาย วัฒนกิจ',position:'พนักงานบันทึกข้อมูล 5'},approver:{name:'อรวรรณ ศิริพงษ์',position:'ผู้จัดการการไฟฟ้า'}};
      localStorage.setItem(key,JSON.stringify(cur));
      localStorage.setItem('p11_unit_approved_'+encodeURIComponent(unit),'1');
    }catch(e){}
    setConfirmOpen(false);
    setSuccessOpen(true);
  }
  function goToSummary(){
    window.location.href='/p1-p11-summary?unit='+encodeURIComponent(unit)+'&year='+year;
  }
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'pcontent'},
      React.createElement('nav',{className:'psum-crumb'},
        React.createElement(Link,{href:'/learning-form-overview'},'ข้อเสนอโอกาสในการปรับปรุงฯ (QIR)'),
        React.createElement(Icon,{name:'chevron-right',size:14}),
        React.createElement(Link,{href:'/p1-p11-overview'},'P1-P11 / QIR ประจำปี'),
        React.createElement(Icon,{name:'chevron-right',size:14}),
        React.createElement('span',{className:'is-current'},'การรายงานผลข้อตกลงระดับการให้บริการ (SLA)')
      ),
      React.createElement('div',{className:'psum-head'},
        React.createElement('h1',null,unit),
        React.createElement('p',null,'สรุปรายงานภาพรวม P1-P11 ประจำ เดือน'+month+' ปี '+year)
      ),
      React.createElement('div',{className:'psum-divider'}),
      React.createElement('div',{className:'pform-toolbar'},
        React.createElement(Button,{variant:'secondary',size:'md',trailingIcon:React.createElement(Icon,{name:'chevron-down',size:15})},'ส่งออกข้อมูล')
      ),
      React.createElement('div',{className:'card ptable-card'},
        React.createElement('table',{className:'ptable pform-table'},
          React.createElement('thead',null,React.createElement('tr',null,
            React.createElement('th',null,'P'),
            React.createElement('th',null,'ผู้ให้บริการ'),
            React.createElement('th',null,'ผู้รับบริการ'),
            React.createElement('th',null,'เกณฑ์ตามมาตรฐานคุณภาพบริการ (SLA)'),
            React.createElement('th',null,'จำนวนงานทั้งหมด'),
            React.createElement('th',null,'จำนวนงานที่ผ่านเกณฑ์'),
            React.createElement('th',null,'จำนวนงานที่ไม่ผ่านเกณฑ์'),
            React.createElement('th',null,'ระดับความพึงพอใจของผู้รับบริการ',React.createElement('span',{className:'pform-req'},'*')),
            React.createElement('th',null,'ข้อเสนอแนะอื่นๆ')
          )),
          React.createElement('tbody',null,SLA_ROWS.map((r,i)=>React.createElement(SlaRow,{key:i,row:r})))
        )
      ),
      React.createElement('div',{className:'pform-foot'},
        React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'chevron-left',size:16}),onClick:()=>history.back()},'ย้อนกลับ'),
        React.createElement('div',{className:'pform-foot-right'},
          React.createElement(Button,{variant:'secondary',size:'md',onClick:()=>setToast('บันทึกร่างเรียบร้อยแล้ว')},'บันทึกร่าง'),
          React.createElement(Button,{variant:'primary',size:'md',onClick:()=>setConfirmOpen(true)},'บันทึกรายงานผล')
        )
      ),
      confirmOpen&&React.createElement('div',{className:'pmodal-overlay',onClick:()=>setConfirmOpen(false)},
        React.createElement('div',{className:'pmodal-card',onClick:e=>e.stopPropagation()},
          React.createElement('span',{className:'pmodal-icon'},React.createElement(Icon,{name:'check-circle',size:26})),
          React.createElement('h3',null,'ยืนยันบันทึกรายงานผล SLA'),
          React.createElement('p',null,'ระบบจะบันทึกผลการรายงานเดือน'+month+' ปี '+year+' และส่งต่อให้ผู้อนุมัติดำเนินการต่อ'),
          React.createElement('div',{className:'pmodal-foot'},
            React.createElement(Button,{variant:'secondary',size:'md',onClick:()=>setConfirmOpen(false)},'ยกเลิก'),
            React.createElement(Button,{variant:'primary',size:'md',onClick:doSave},'ยืนยัน')
          )
        )
      ),
      successOpen&&React.createElement('div',{className:'pmodal-overlay'},
        React.createElement('div',{className:'pmodal-card',onClick:e=>e.stopPropagation()},
          React.createElement('span',{className:'pmodal-icon'},React.createElement(Icon,{name:'check-circle',size:26})),
          React.createElement('h3',null,'บันทึกเรียบร้อยแล้ว'),
          React.createElement('p',null,'บันทึกผลการรายงาน SLA เดือน'+month+' ปี '+year+' เรียบร้อยแล้ว ระบบจะพาไปยังหน้าสรุปรายงานภาพรวม P1-P11'),
          React.createElement('div',{className:'pmodal-foot'},
            React.createElement(Button,{variant:'primary',size:'md',onClick:goToSummary},'ตกลง')
          )
        )
      ),
      toast&&React.createElement('div',{className:'ptoast'},React.createElement(Icon,{name:'check-circle',size:16}),toast)
    )
  );
}

export default App;
