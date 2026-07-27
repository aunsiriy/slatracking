import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'lftop'},
    React.createElement('div',{className:'lftop-left'},
      React.createElement(Link,{className:'lftop-back',href:'/'},React.createElement(Icon,{name:'corner-up-left',size:16}),'กลับ'),
      React.createElement(Image,{className:'lftop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'lftop-word'},
        React.createElement('span',{className:'lftop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'lftop-sub'},'ภาพรวม Learning Form & QIR')
      )
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'lfbreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'ภาพรวม Learning Form')
  );
}

function KpiCards({year}){
  const s=window.LFO_SUMMARY;
  const cards=[
    {icon:'book',label:'Learning Form ทั้งหมด',value:s.total,color:'brand'},
    {icon:'calendar',label:`Learning Form ปี ${year}`,value:s.byYear[year]||0,color:'blue'},
    {icon:'clock',label:'รอดำเนินการ',value:s.pendingCount,color:'warning'}
  ];
  return React.createElement('div',{className:'lfkpi-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card lfkpi-card'},
      React.createElement('span',{className:`lfkpi-icon lfkpi-icon--${c.color}`},React.createElement(Icon,{name:c.icon,size:18})),
      React.createElement('div',null,
        React.createElement('div',{className:'lfkpi-value'},c.value),
        React.createElement('div',{className:'lfkpi-label'},c.label)
      )
    ))
  );
}

function MenuCards(){
  const cards=[
    {icon:'building',title:'Learning Form สายงานเขต / สำนักงานใหญ่',desc:'แบบฟอร์มทบทวนผลการดำเนินงานและวางแผนปรับปรุงกระบวนการ ระดับฝ่าย/เขต/สำนักงานใหญ่',cta:'ไปที่ Learning Form',href:'/learning-form'},
    {icon:'map-pin',title:'Learning Form สำหรับสำนักงานการไฟฟ้า',desc:'ภาพรวมเกณฑ์ P1-P11 และแบบฟอร์ม QIR ประจำปี สำหรับหน่วยงาน กฟฟ.',cta:'ไปที่ P1-P11 Overview',href:'/p1-p11-overview'}
  ];
  return React.createElement('div',{className:'lfmenu-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card lfmenu-card'},
      React.createElement('span',{className:'lfmenu-icon'},React.createElement(Icon,{name:c.icon,size:22})),
      React.createElement('h3',{className:'lfmenu-title'},c.title),
      React.createElement('p',{className:'lfmenu-desc'},c.desc),
      React.createElement(Button,{variant:'primary',size:'md',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>{window.location.href=c.href;}},c.cta)
    ))
  );
}

function RecentList({year,setYear}){
  const items=window.LFO_ITEMS.filter(it=>it.year===year);
  return React.createElement('div',{className:'card lflist-card'},
    React.createElement('div',{className:'lflist-head'},
      React.createElement('h3',null,'Learning Form ล่าสุด'),
      React.createElement('div',{className:'lfyear-filter'},
        window.LFO_YEARS.map(y=>React.createElement('button',{key:y,className:'lfyear-btn'+(y===year?' is-active':''),onClick:()=>setYear(y)},'ปี '+y))
      )
    ),
    React.createElement('div',{className:'lflist-rows'},
      items.length===0?React.createElement('div',{className:'lflist-empty'},'ไม่มี Learning Form ในปีที่เลือก'):
      items.map((it,i)=>{
        const s=window.LFO_STATUS_MAP[it.status];
        return React.createElement('div',{key:i,className:'lflist-row'},
          React.createElement('div',{className:'lflist-row-main'},
            React.createElement('div',{className:'lflist-row-process'},it.process),
            React.createElement('div',{className:'lflist-row-unit'},it.unit)
          ),
          React.createElement('span',{className:'ba-tag'},window.LFO_LEVEL_LABEL[it.level]),
          React.createElement(Badge,{label:s.label,type:'pill-color',color:s.color,size:'sm'})
        );
      })
    )
  );
}

function App(){
  const [year,setYear]=React.useState(window.LFO_YEARS[0]);
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfpage-head'},
        React.createElement('h1',null,'ภาพรวม Learning Form'),
        React.createElement('p',null,'สรุปจำนวน Learning Form ของคุณ และเลือกระดับหน่วยงานเพื่อเริ่มกรอกหรือทบทวนข้อมูล')
      ),
      React.createElement(KpiCards,{year}),
      React.createElement(MenuCards),
      React.createElement(RecentList,{year,setYear})
    )
  );
}

export default App;
