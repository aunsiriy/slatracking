import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,FeaturedIcon}=window.DesignSystem_cbd181;

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

function GuideItem({item}){
  return React.createElement('li',{className:'fd-item'},
    React.createElement('span',{className:(item.bold?'fd-strong':'')+(item.underline?' fd-underline':'')},item.text),
    item.children&&React.createElement('ul',{className:'fd-sublist'},
      item.children.map((c,i)=>React.createElement(GuideItem,{key:i,item:c}))
    )
  );
}

function GuideBlock({block}){
  if(block.type==='p')return React.createElement('p',{className:'fd-p'+(block.bold?' fd-strong':'')},block.text);
  if(block.type==='list'){
    const Tag=block.ordered?'ol':'ul';
    return React.createElement(Tag,{className:'fd-list'+(block.ordered?' fd-list--ordered':'')},
      block.items.map((it,i)=>React.createElement(GuideItem,{key:i,item:it}))
    );
  }
  return null;
}

function FormGuideSection(){
  const [sectionOpen,setSectionOpen]=React.useState(false);
  const [openSet,setOpenSet]=React.useState(new Set());
  function toggle(i){
    setOpenSet(prev=>{
      const next=new Set(prev);
      if(next.has(i))next.delete(i);else next.add(i);
      return next;
    });
  }
  return React.createElement('div',{className:'card lfguide-card'},
    React.createElement('button',{type:'button',className:'lfguide-header',onClick:()=>setSectionOpen(v=>!v),'aria-expanded':sectionOpen},
      React.createElement(FeaturedIcon,{size:'md',color:'brand',variant:'light',icon:React.createElement(Icon,{name:'help-circle',size:20})}),
      React.createElement('div',{className:'lfguide-header-text'},
        React.createElement('h3',null,'คำอธิบายแบบฟอร์ม'),
        React.createElement('p',null,'แต่ละส่วนของ Learning Form คืออะไร กดเพื่อดูคำอธิบายแต่ละส่วน')
      ),
      React.createElement(Icon,{name:sectionOpen?'chevron-down':'chevron-right',size:20,className:'lfguide-header-chevron'})
    ),
    sectionOpen&&React.createElement('div',{className:'lfguide-acc'},
      window.LFO_FORM_GUIDE.map((s,i)=>{
        const isOpen=openSet.has(i);
        return React.createElement('div',{key:i,className:'lfguide-acc-item'+(isOpen?' is-open':'')},
          React.createElement('button',{type:'button',className:'lfguide-acc-head',onClick:()=>toggle(i),'aria-expanded':isOpen},
            React.createElement('span',{className:'lfguide-num-badge'},s.part),
            React.createElement('span',{className:'lfguide-acc-title'},s.title),
            React.createElement(Icon,{name:isOpen?'chevron-down':'chevron-right',size:18,className:'lfguide-acc-chevron'})
          ),
          isOpen&&React.createElement('div',{className:'lfguide-acc-body'},
            s.blocks.map((b,bi)=>React.createElement(GuideBlock,{key:bi,block:b}))
          )
        );
      })
    )
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
  function openForm(){window.location.href='/learning-form';}
  return React.createElement('div',{className:'card lflist-card'},
    React.createElement('div',{className:'lflist-head'},
      React.createElement('h3',null,'Learning Form ล่าสุด'),
      React.createElement('div',{className:'lfyear-filter'},
        window.LFO_YEARS.map(y=>React.createElement('button',{key:y,className:'lfyear-btn'+(y===year?' is-active':''),onClick:()=>setYear(y)},'ปี '+y))
      )
    ),
    items.length===0?React.createElement('div',{className:'lflist-empty'},'ไม่มี Learning Form ในปีที่เลือก'):
    React.createElement('div',{className:'lftable-wrap'},
      React.createElement('table',{className:'lftable'},
        React.createElement('thead',null,
          React.createElement('tr',null,
            ['ชื่อฟอร์ม','หน่วยงานที่รับผิดชอบ','วันที่ดำเนินการ','สถานะ'].map((h,i)=>React.createElement('th',{key:i},h))
          )
        ),
        React.createElement('tbody',null,
          items.map((it,i)=>{
            const s=window.LFO_STATUS_MAP[it.status];
            return React.createElement('tr',{key:i,className:'lftable-row',tabIndex:0,onClick:openForm,onKeyDown:e=>{if(e.key==='Enter')openForm();}},
              React.createElement('td',null,it.process),
              React.createElement('td',null,it.unit),
              React.createElement('td',null,it.date),
              React.createElement('td',null,React.createElement(Badge,{label:s.label,type:'pill-color',color:s.color,size:'sm'}))
            );
          })
        )
      )
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
      React.createElement(FormGuideSection),
      React.createElement(MenuCards),
      React.createElement(RecentList,{year,setYear})
    )
  );
}

export default App;
