import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,InputField,Textarea}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'rtop'},
    React.createElement('div',{className:'rtop-left'},
      React.createElement(Image,{className:'rtop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'rtop-word'},
        React.createElement('span',{className:'rtop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'rtop-sub'},'รายงานผลการดำเนินงาน SLA')
      )
    ),
    React.createElement(Link,{className:'rtop-back',href:'/'},React.createElement(Icon,{name:'corner-up-left',size:16}),'กลับไปหน้าหลัก')
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'rbreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'รายงานผล SLA (ระดับฝ่าย)')
  );
}

function HierarchyIntro({tab,setTab}){
  return React.createElement('div',{className:'card intro-card'},
    React.createElement('div',{className:'intro-level'},
      React.createElement('span',{className:'intro-level-badge'},'1'),
      React.createElement('div',null,
        React.createElement('div',{className:'intro-level-title'},'ระดับฝ่าย · Level 1 กระบวนการทำงาน (Work Process) เช่น S1.3'),
        React.createElement('div',{className:'intro-level-desc'},'ประกอบด้วยการรายงาน 2 รูปแบบ ตามรอบเวลาที่กำหนด')
      )
    ),
    React.createElement('div',{className:'intro-tabs'},
      React.createElement('button',{className:'intro-tab'+(tab==='monthly'?' is-active':''),onClick:()=>setTab('monthly')},
        React.createElement('span',{className:'intro-tab-num'},'1.1'),
        React.createElement('div',null,
          React.createElement('div',{className:'intro-tab-title'},'รายงานผล SLA'),
          React.createElement('div',{className:'intro-tab-sub'},'รายเดือน')
        )
      ),
      React.createElement('button',{className:'intro-tab'+(tab==='quarterly'?' is-active':''),onClick:()=>setTab('quarterly')},
        React.createElement('span',{className:'intro-tab-num'},'1.2'),
        React.createElement('div',null,
          React.createElement('div',{className:'intro-tab-title'},'รายงานผลตัวชี้วัดกระบวนการ'),
          React.createElement('div',{className:'intro-tab-sub'},'รายไตรมาส')
        )
      )
    )
  );
}

function computeStatus(result,target){
  if(result===''||result===null||isNaN(Number(result)))return null;
  return Number(result)>=Number(target)?'pass':'fail';
}

function ReportItem({item,onChange,variant}){
  const isQuarterly=variant==='quarterly';
  const [open,setOpen]=React.useState(item.status==='returned');
  const status=computeStatus(item.result,item.target);
  const isSubmitted=item.status==='submitted';
  const detailOk=item.detail.trim().length>0;
  const improvementOk=status!=='fail'||item.improvement.trim().length>0;
  const resultOk=item.result!==''&&!isNaN(Number(item.result));
  const canSubmit=resultOk&&detailOk&&improvementOk&&!isSubmitted;

  function set(field,value){onChange({...item,[field]:value});}

  const statusBadge=isSubmitted?
    React.createElement(Badge,{label:'ส่งรายงานแล้ว',type:'pill-color',color:'blue',size:'sm'}):
    item.status==='returned'?
    React.createElement(Badge,{label:'ถูกคืนแก้ไข',type:'pill-color',color:'orange',size:'sm'}):
    status==='pass'?React.createElement(Badge,{label:'ผ่าน',type:'pill-color',color:'success',size:'sm'}):
    status==='fail'?React.createElement(Badge,{label:'ไม่ผ่าน',type:'pill-color',color:'error',size:'sm'}):
    React.createElement(Badge,{label:'ยังไม่รายงาน',type:'pill-color',color:'gray',size:'sm'});

  return React.createElement('div',{className:'card report-item'+(isSubmitted?' is-submitted':'')},
    React.createElement('button',{className:'report-item-head',onClick:()=>setOpen(v=>!v)},
      React.createElement('div',{className:'report-item-tags'},
        React.createElement('span',{className:'ba-tag'},item.level0+' · '+item.level0Label),
        React.createElement('span',{className:'ba-tag ba-tag--sub'},item.level1+' · '+item.level1Label)
      ),
      React.createElement('div',{className:'report-item-title'},isQuarterly?item.metricName:item.slaName),
      React.createElement('div',{className:'report-item-head-right'},
        statusBadge,
        item.status==='returned'&&!isSubmitted&&React.createElement('span',{className:'return-flag'},React.createElement(Icon,{name:'alert-triangle',size:14}),'ต้องแก้ไข'),
        React.createElement(Icon,{name:'chevron-down',size:18,className:'report-item-chevron'+(open?' is-open':'')})
      )
    ),
    open&&React.createElement('div',{className:'report-item-body'},
      item.returnNote&&!isSubmitted&&React.createElement('div',{className:'return-note'},
        React.createElement(Icon,{name:'corner-up-left',size:15}),
        React.createElement('span',null,React.createElement('strong',null,'ข้อคืนแก้ไขจาก กนอ.: '),item.returnNote)
      ),
      React.createElement('div',{className:'report-grid'},
        React.createElement('div',{className:'report-field'},
          React.createElement('span',{className:'report-field-label'},'ชื่อฝ่ายที่รายงาน'),
          React.createElement('div',{className:'report-field-static'},window.SLA_REPORT_DEPT.name)
        ),
        !isQuarterly&&React.createElement('div',{className:'report-field'},
          React.createElement(InputField,{fieldType:'default',label:'ผู้รับบริการ SLA',size:'md',value:item.customer,isDisabled:isSubmitted,onChange:v=>set('customer',v)})
        ),
        React.createElement('div',{className:'report-field'},
          React.createElement('span',{className:'report-field-label'},'ค่าเป้าหมาย (กำหนดโดย กนอ.)'),
          React.createElement('div',{className:'report-field-static'},item.target+'%')
        ),
        React.createElement('div',{className:'report-field'},
          React.createElement(InputField,{fieldType:'default',label:'แหล่งข้อมูลตรวจสอบ',size:'md',value:item.source,isDisabled:isSubmitted,onChange:v=>set('source',v)})
        ),
        React.createElement('div',{className:'report-field'},
          React.createElement(InputField,{fieldType:'default',label:'ผลการดำเนินงาน (%)',size:'md',type:'text',value:String(item.result),placeholder:'กรอกตัวเลขร้อยละ',isDisabled:isSubmitted,isRequired:true,onChange:v=>set('result',v.replace(/[^0-9.]/g,''))})
        ),
        React.createElement('div',{className:'report-field'},
          React.createElement('span',{className:'report-field-label'},'สถานะ ผ่าน/ไม่ผ่าน (คำนวณอัตโนมัติ)'),
          React.createElement('div',{className:'report-field-static'},statusBadge)
        )
      ),
      React.createElement(Textarea,{label:'รายละเอียดการดำเนินงาน',placeholder:'อธิบายรายละเอียดการดำเนินงาน...',isRequired:true,isDisabled:isSubmitted,value:item.detail,onChange:v=>set('detail',v)}),
      status==='fail'&&React.createElement(Textarea,{label:'แนวทางการแก้ไขปรับปรุง',placeholder:'ระบุแนวทางแก้ไข เนื่องจากผลไม่ผ่านเกณฑ์...',isRequired:true,isDisabled:isSubmitted,value:item.improvement,onChange:v=>set('improvement',v)}),
      React.createElement('div',{className:'report-item-footer'},
        isSubmitted?React.createElement('span',{className:'submitted-note'},React.createElement(Icon,{name:'check',size:16}),'ส่งให้ กนอ. เรียบร้อยแล้ว'):
        React.createElement(Button,{variant:'primary',size:'md',isDisabled:!canSubmit,trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>{set('status','submitted');setOpen(false);}},'ยืนยัน ส่ง กนอ.')
      )
    )
  );
}

function App(){
  const [tab,setTab]=React.useState('monthly');
  const [items,setItems]=React.useState(window.SLA_REPORT_ITEMS);
  const [qItems,setQItems]=React.useState(window.SLA_REPORT_QUARTERLY_ITEMS);
  const activeItems=tab==='monthly'?items:qItems;
  const setActiveItems=tab==='monthly'?setItems:setQItems;
  const p=tab==='monthly'?window.SLA_REPORT_PERIOD:window.SLA_REPORT_QUARTER_PERIOD;
  const pendingCount=activeItems.filter(i=>i.status!=='submitted').length;
  function updateItem(next){setActiveItems(activeItems.map(i=>i.id===next.id?next:i));}
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'rcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'rpage-head'},
        React.createElement('div',{className:'rpage-head-top'},
          React.createElement('h1',null,tab==='monthly'?'รายงานผลการดำเนินงาน SLA (ระดับฝ่าย)':'รายงานผลตัวชี้วัดกระบวนการ (ระดับฝ่าย)'),
          React.createElement(Link,{className:'rlevel-switch',href:'/sla-report-form-level2'},'สลับไปหน้ารายงานระดับกอง',React.createElement(Icon,{name:'arrow-right',size:14}))
        ),
        React.createElement('div',{className:'rpage-head-meta'},
          React.createElement(Badge,{label:'รอบ '+p.name,type:'pill-color',color:'success',icon:'dot',size:'md'}),
          React.createElement('span',{className:'rpage-deadline'},React.createElement(Icon,{name:'clock',size:14}),'กำหนดส่ง '+p.deadline),
          React.createElement('span',{className:'rpage-pending'},pendingCount+' รายการที่ต้องดำเนินการ')
        )
      ),
      React.createElement(HierarchyIntro,{tab,setTab}),
      React.createElement('div',{className:'report-list'},
        activeItems.map(item=>React.createElement(ReportItem,{key:item.id,item,onChange:updateItem,variant:tab}))
      )
    )
  );
}

export default App;
