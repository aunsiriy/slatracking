import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge}=window.DesignSystem_cbd181;

const STATUS_MAP={
  reported:{label:'รายงานแล้ว',color:'success'},
  not_reported:{label:'ยังไม่รายงาน',color:'gray'},
  overdue:{label:'รายงานเกินวันที่กำหนด',color:'error'}
};

function TopBar(){
  return React.createElement('header',{className:'otop'},
    React.createElement('div',{className:'otop-left'},
      React.createElement(Link,{className:'otop-back',href:'/'},React.createElement(Icon,{name:'corner-up-left',size:16}),'กลับ'),
      React.createElement(Image,{className:'otop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'otop-word'},
        React.createElement('span',{className:'otop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'otop-sub'},'ภาพรวมการรายงานผล SLA')
      )
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'obreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'ภาพรวมการรายงานผล SLA')
  );
}

function KpiCards({data,showAll}){
  const k=showAll?{kpiTotal:data.kpiTotal,pass:data.pass,fail:data.fail}:data.ownKpi;
  const cards=[
    {label:'KPI ทั้งหมด',value:k.kpiTotal,color:'brand',icon:'list-check'},
    {label:'ผ่าน SLA',value:k.pass,color:'success',icon:'shield-check'},
    {label:'ไม่ผ่าน SLA',value:k.fail,color:'error',icon:'alert-triangle'}
  ];
  return React.createElement('div',{className:'okpi-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card okpi-card'},
      React.createElement('span',{className:`okpi-icon okpi-icon--${c.color}`},React.createElement(Icon,{name:c.icon,size:18})),
      React.createElement('div',null,
        React.createElement('div',{className:'okpi-value'},c.value),
        React.createElement('div',{className:'okpi-label'},c.label)
      )
    ))
  );
}

function FeatureCards(){
  const cards=[
    {icon:'trending-up',title:'SLA Tracking',desc:'ติดตามสถานะ SLA ระดับหน้างานแบบ Workflow',cta:'ไปที่ SLA Tracking',href:'/sla-status-tracking'},
    {icon:'file-text',title:'รายงานผล SLA ระดับฝ่าย/เขต/สนง.ใหญ่',desc:'กรอกและส่งผลการดำเนินงาน SLA ประจำรอบ',cta:'ไปที่แบบฟอร์มรายงาน',href:'/sla-report-form'},
    {icon:'download',title:'ออกรายงาน',desc:'สรุปผล SLA ทุกหน่วยงาน พร้อม Export เป็น Excel',cta:'Export Excel',href:null}
  ];
  return React.createElement('div',{className:'ofeature-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card ofeature-card'},
      React.createElement('span',{className:'ofeature-icon'},React.createElement(Icon,{name:c.icon,size:20})),
      React.createElement('h3',{className:'ofeature-title'},c.title),
      React.createElement('p',{className:'ofeature-desc'},c.desc),
      React.createElement(Button,{variant:'secondary',size:'md',trailingIcon:React.createElement(Icon,{name:c.href?'arrow-right':'download',size:16}),
        onClick:()=>{if(c.href)window.location.href=c.href;}},c.cta)
    ))
  );
}

function ListSection({data,year,setYear,showAll,setShowAll}){
  const items=showAll?data.items:data.items.filter(it=>it.dept===window.SLA_OWN_UNIT);
  return React.createElement('div',{className:'card olist-card'},
    React.createElement('div',{className:'olist-head'},
      React.createElement('div',{className:'olist-head-title'},
        React.createElement('h3',null,showAll?'รายการ SLA ทุกหน่วยงาน':'รายการ SLA ของหน่วยงานฉัน'),
        React.createElement('span',{className:'olist-scope-note'},showAll?'แสดงทุกหน่วยงานในองค์กร':window.SLA_OWN_UNIT)
      ),
      React.createElement('div',{className:'olist-head-actions'},
        React.createElement('div',{className:'oyear-filter'},
          window.SLA_OVERVIEW_YEARS.map(y=>React.createElement('button',{key:y,className:'oyear-btn'+(y===year?' is-active':''),onClick:()=>setYear(y)},'ปี '+y))
        ),
        React.createElement(Button,{variant:showAll?'secondary':'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:showAll?'corner-up-left':'building',size:15}),onClick:()=>setShowAll(v=>!v)},showAll?'กลับไปหน่วยงานของฉัน':'ดูหน่วยงานอื่น')
      )
    ),
    React.createElement('div',{className:'olist-rows'},
      items.length===0?React.createElement('div',{className:'olist-empty'},'ไม่มีข้อมูล SLA ของหน่วยงานนี้ในปีที่เลือก'):
      items.map((it,i)=>{
        const s=STATUS_MAP[it.status];
        return React.createElement('div',{key:i,className:'olist-row'},
          React.createElement('span',{className:'ba-tag'},it.ba),
          React.createElement('div',{className:'olist-row-main'},
            React.createElement('div',{className:'olist-row-sla'},it.sla),
            React.createElement('div',{className:'olist-row-dept'},it.dept)
          ),
          React.createElement(Badge,{label:it.cycle,type:'pill-color',color:'gray',size:'sm'}),
          React.createElement(Badge,{label:s.label,type:'pill-color',color:s.color,size:'sm'})
        );
      })
    )
  );
}

function App(){
  const [year,setYear]=React.useState(window.SLA_OVERVIEW_YEARS[0]);
  const [showAll,setShowAll]=React.useState(false);
  const data=window.SLA_OVERVIEW_BY_YEAR[year];
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'ocontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'opage-head'},
        React.createElement('h1',null,'ภาพรวมการรายงานผล SLA'),
        React.createElement('p',null,'สรุปผลการดำเนินงาน SLA ของหน่วยงานคุณ กดดูหน่วยงานอื่นเพื่อดูภาพรวมทั้งองค์กร')
      ),
      React.createElement(KpiCards,{data,showAll}),
      React.createElement(FeatureCards),
      React.createElement(ListSection,{data,year,setYear,showAll,setShowAll})
    )
  );
}

export default App;
