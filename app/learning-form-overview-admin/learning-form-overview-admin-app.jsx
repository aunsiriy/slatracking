import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,InputField,Avatar}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'ttb'},
    React.createElement('div',{className:'ttb-left'},
      React.createElement(Link,{href:'/',className:'back-link'},React.createElement(Icon,{name:'chevron-right',size:16,style:{transform:'rotate(180deg)'}}),'กลับ'),
      React.createElement('span',{className:'ttb-divider'}),
      React.createElement(Image,{src:'/sla-logo.svg',alt:'SLA',className:'ttb-logo',width:28,height:28}),
      React.createElement('span',{className:'ttb-title'},'PEA-SLA Tracking System')
    ),
    React.createElement('div',{className:'ttb-right'},
      React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'bell',size:19}),'aria-label':'การแจ้งเตือน'}),
      React.createElement(Avatar,{variant:'text',size:'sm',text:'สด'})
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'lfabreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'ภาพรวม Learning Form')
  );
}

function KpiCards({year}){
  const s=window.LFOA_SUMMARY;
  const cards=[
    {icon:'book',label:'Learning Form ทั้งหมด (ทุกหน่วยงาน)',value:s.total,color:'brand'},
    {icon:'calendar',label:`Learning Form ปี ${year}`,value:s.byYear[year]||0,color:'blue'},
    {icon:'clock',label:'รอดำเนินการ',value:s.pendingCount,color:'warning'}
  ];
  return React.createElement('div',{className:'lfakpi-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card lfakpi-card'},
      React.createElement('span',{className:`lfakpi-icon lfakpi-icon--${c.color}`},React.createElement(Icon,{name:c.icon,size:18})),
      React.createElement('div',null,
        React.createElement('div',{className:'lfakpi-value'},c.value),
        React.createElement('div',{className:'lfakpi-label'},c.label)
      )
    ))
  );
}

function MenuCards(){
  const cards=[
    {icon:'building',title:'Learning Form สายงานเขต / สำนักงานใหญ่',desc:'แบบฟอร์มทบทวนผลการดำเนินงานและวางแผนปรับปรุงกระบวนการ ระดับฝ่าย/เขต/สำนักงานใหญ่',cta:'ไปที่ Learning Form',href:'/learning-form'},
    {icon:'map-pin',title:'Learning Form สำหรับสำนักงานการไฟฟ้า',desc:'ภาพรวมเกณฑ์ P1-P11 และแบบฟอร์ม QIR ประจำปี สำหรับหน่วยงาน กฟฟ.',cta:'ไปที่ P1-P11 Overview',href:'/p1-p11-overview'}
  ];
  return React.createElement('div',{className:'lfamenu-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card lfamenu-card'},
      React.createElement('span',{className:'lfamenu-icon'},React.createElement(Icon,{name:c.icon,size:22})),
      React.createElement('h3',{className:'lfamenu-title'},c.title),
      React.createElement('p',{className:'lfamenu-desc'},c.desc),
      React.createElement(Button,{variant:'primary',size:'md',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>{window.location.href=c.href;}},c.cta)
    ))
  );
}

function RecentList({year,setYear,items:allItems}){
  const items=allItems.filter(it=>it.year===year);
  return React.createElement('div',{className:'card lfalist-card'},
    React.createElement('div',{className:'lfalist-head'},
      React.createElement('h3',null,'Learning Form ล่าสุด (ทุกหน่วยงาน)'),
      React.createElement('div',{className:'lfayear-filter'},
        window.LFOA_YEARS.map(y=>React.createElement('button',{key:y,className:'lfayear-btn'+(y===year?' is-active':''),onClick:()=>setYear(y)},'ปี '+y))
      )
    ),
    React.createElement('div',{className:'lfalist-rows'},
      items.length===0?React.createElement('div',{className:'lfalist-empty'},'ไม่มี Learning Form ในปีที่เลือก'):
      items.map((it,i)=>{
        const s=window.LFOA_STATUS_MAP[it.status];
        return React.createElement('div',{key:i,className:'lfalist-row'},
          React.createElement('div',{className:'lfalist-row-main'},
            React.createElement('div',{className:'lfalist-row-process'},it.process),
            React.createElement('div',{className:'lfalist-row-unit'},it.unit)
          ),
          React.createElement('span',{className:'ba-tag'},window.LFOA_LEVEL_LABEL[it.level]),
          React.createElement(Badge,{label:s.label,type:'pill-color',color:s.color,size:'sm'})
        );
      })
    )
  );
}

function App(){
  const [year,setYear]=React.useState(window.LFOA_YEARS[0]);
  const [items,setItems]=React.useState(window.LFOA_ITEMS);
  const [toast,setToast]=React.useState(null);
  React.useEffect(()=>{window.LFOA_ITEMS=items;},[items]);
  React.useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(null),2600);return()=>clearTimeout(t);},[toast]);
  React.useEffect(()=>{
    const raw=sessionStorage.getItem('lfoa_pending_assign');
    if(!raw)return;
    sessionStorage.removeItem('lfoa_pending_assign');
    try{
      const pending=JSON.parse(raw);
      setItems(prev=>[...pending.items,...prev]);
      setYear(pending.year);
      setToast(`มอบหมาย Learning Form ให้ ${pending.count} หน่วยงานแล้ว`);
    }catch(e){}
  },[]);
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfacontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfapage-head'},
        React.createElement('div',null,
          React.createElement('h1',null,'ภาพรวม Learning Form'),
          React.createElement('p',null,'สรุปจำนวน Learning Form ทั้งองค์กร และมอบหมายการจัดทำให้หน่วยงานต่างๆ')
        ),
        React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:()=>{window.location.href='/learning-form-create';}},'สร้าง Learning Form')
      ),
      React.createElement(KpiCards,{year}),
      React.createElement(MenuCards),
      React.createElement(RecentList,{year,setYear:setYear,items}),
      toast&&React.createElement('div',{className:'toast'},React.createElement(Icon,{name:'check',size:16}),toast)
    )
  );
}

export default App;
