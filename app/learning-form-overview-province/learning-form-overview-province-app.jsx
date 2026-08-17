import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,Avatar}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'ttb'},
    React.createElement('div',{className:'ttb-left'},
      React.createElement(Link,{href:'/',className:'back-link'},React.createElement(Icon,{name:'chevron-right',size:16,style:{transform:'rotate(180deg)'}}),'กลับ'),
      React.createElement('span',{className:'ttb-divider'}),
      React.createElement(Image,{src:'/sla-logo.svg',alt:'SLA',className:'ttb-logo',width:28,height:28}),
      React.createElement('span',{className:'ttb-title'},'SLA Tracking System')
    ),
    React.createElement('div',{className:'ttb-right'},
      React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'bell',size:19}),'aria-label':'การแจ้งเตือน'}),
      React.createElement(Avatar,{variant:'text',size:'sm',text:'สด'})
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'lfbreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'ภาพรวม Learning Form — การไฟฟ้าจังหวัด')
  );
}

function KpiCards({year,scope}){
  const items=window.LFO_ITEMS.filter(it=>it.scope===scope&&(scope!=='own'||it.year===year));
  const total=items.length;
  const pendingCount=items.filter(it=>it.status==='pending').length;
  const doneCount=items.filter(it=>it.status==='certified').length;
  const cards=[
    {icon:'book',label:'Learning Form ทั้งหมด',value:total,color:'brand'},
    {icon:'clock',label:'รอดำเนินการ',value:pendingCount,color:'warning'},
    {icon:'calendar',label:'เสร็จสิ้น',value:doneCount,color:'success'}
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

function MenuCards({onGuide}){
  const cards=[
    {icon:'help-circle',title:'คำอธิบายแบบฟอร์ม',desc:'รายละเอียดการกรอกข้อมูลส่วนที่ 0-7 ของ Learning Form พร้อมคำนิยามแต่ละหัวข้อ',cta:'ดูคำอธิบาย',variant:'secondary',onClick:onGuide},
    {icon:'download-01',title:'Export Learning Form',desc:'ดาวน์โหลดแบบฟอร์มที่กรอกแล้วเป็นไฟล์ PDF / Excel เพื่อจัดเก็บหรือส่งต่อ',cta:'Export',href:'#',variant:'secondary'}
  ];
  return React.createElement('div',{className:'lfmenu-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card lfmenu-card'},
      React.createElement('div',{className:'lfmenu-card-top'},
        React.createElement('span',{className:'lfmenu-icon'},React.createElement(Icon,{name:c.icon,size:22}))
      ),
      React.createElement('h3',{className:'lfmenu-title'},c.title),
      React.createElement('p',{className:'lfmenu-desc'},c.desc),
      React.createElement(Button,{variant:c.variant||'primary',size:'md',className:'lfmenu-cta-corner',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>{if(c.onClick)c.onClick();else window.location.href=c.href;}},c.cta)
    ))
  );
}

function RecentList({year,setYear,scope,setScope}){
  const [line,setLine]=React.useState('สายงานดิจิทัลและการสื่อสาร');
  const [otherYear,setOtherYear]=React.useState('all');
  const [search,setSearch]=React.useState('');
  function parseDate(d){const[dd,mm,yy]=d.split('/').map(Number);return new Date(yy,mm-1,dd).getTime();}
  const lineOptions=Array.from(new Set(['สายงานดิจิทัลและการสื่อสาร',...window.LFO_ITEMS.filter(it=>it.scope==='other').map(it=>it.line)]));
  const otherYearOptions=Array.from(new Set(window.LFO_ITEMS.filter(it=>it.scope==='other').map(it=>it.process)));
  const items=window.LFO_ITEMS.filter(it=>it.scope===scope&&(scope!=='own'||it.year===year))
    .filter(it=>scope!=='other'||line==='all'||it.line===line)
    .filter(it=>scope!=='other'||otherYear==='all'||it.process===otherYear)
    .filter(it=>scope!=='other'||!search.trim()||it.dept.toLowerCase().includes(search.trim().toLowerCase()))
    .slice().sort((a,b)=>parseDate(b.date)-parseDate(a.date));
  return React.createElement('div',{className:'card lflist-card'},
    React.createElement('div',{className:'lflist-head'},
      React.createElement('h3',null,'Learning Form ล่าสุด'),
    ),
    scope==='other'&&React.createElement('div',{className:'lfscope-filters'},
      React.createElement('div',{className:'lfscope-search'},
        React.createElement(Icon,{name:'search',size:15}),
        React.createElement('input',{placeholder:'ค้นหาฝ่าย...',value:search,onChange:e=>setSearch(e.target.value)})
      ),
      React.createElement('select',{className:'lfscope-select',style:{width:'224px',height:'39px'},value:line,onChange:e=>setLine(e.target.value)},
        React.createElement('option',{value:'all'},'ทุกสายงาน'),
        lineOptions.map(l=>React.createElement('option',{key:l,value:l},l))
      ),
      React.createElement('select',{className:'lfscope-select',style:{width:'160px',height:'39px'},value:otherYear,onChange:e=>setOtherYear(e.target.value)},
        React.createElement('option',{value:'all'},'ทุกปี'),
        otherYearOptions.map(p=>React.createElement('option',{key:p,value:p},p))
      ),
      React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'search',size:15})},'ค้นหา'),
      React.createElement(Button,{variant:'secondary',size:'md',onClick:()=>{setSearch('');setLine('all');}},'ล้างค่า')
    ),
    items.length===0?React.createElement('div',{className:'lflist-empty'},'ไม่มี Learning Form ในปีที่เลือก'):
    React.createElement('table',{className:'lftable'},
      React.createElement('thead',null,
        React.createElement('tr',null,
          scope==='other'&&React.createElement('th',null,'ฝ่ายที่รับผิดชอบ'),
          React.createElement('th',null,'ประจำปี'),
          React.createElement('th',null,'ผู้บันทึกข้อมูล'),
          React.createElement('th',null,'วันที่ดำเนินการ'),
          React.createElement('th',null,'สถานะ')
        )
      ),
      React.createElement('tbody',null,
        items.map((it,i)=>{
          const s=window.LFO_STATUS_MAP[it.status];
          return React.createElement('tr',{key:i,className:'lftable-row',onClick:()=>{window.location.href='/learning-form';}},
            scope==='other'&&React.createElement('td',null,it.dept),
            React.createElement('td',null,it.process),
            React.createElement('td',null,it.unit),
            React.createElement('td',null,it.date),
            React.createElement('td',null,React.createElement(Badge,{label:s.label,type:'pill-color',color:s.color,size:'sm'}))
          );
        })
      )
    )
  );
}

function FormGuideModal({onClose}){
  const [open,setOpen]=React.useState(0);
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card lfguide-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'คำอธิบายแบบฟอร์ม'),
        React.createElement('button',{className:'lfa-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      React.createElement('div',{className:'lfguide-list'},
        window.LFO_FORM_GUIDE.map((g,i)=>React.createElement('div',{key:i,className:'lfguide-item'+(open===i?' is-open':'')},
          React.createElement('button',{type:'button',className:'lfguide-item-head',onClick:()=>setOpen(o=>o===i?-1:i)},
            React.createElement('span',{className:'lfguide-item-part'},g.part),
            React.createElement('span',{className:'lfguide-item-title'},g.title),
            React.createElement(Icon,{name:open===i?'chevron-down':'chevron-right',size:16})
          ),
          open===i&&React.createElement('p',{className:'lfguide-item-desc'},g.desc)
        ))
      )
    )
  );
}

function App(){
  const [year,setYear]=React.useState(window.LFO_YEARS[0]);
  const [scope,setScope]=React.useState('own');
  const [guideOpen,setGuideOpen]=React.useState(false);
  const [savedToast,setSavedToast]=React.useState(false);
  const [hasDraft,setHasDraft]=React.useState(false);
  React.useEffect(()=>{
    try{setHasDraft(localStorage.getItem('lf_draft_started')==='1');}catch(e){}
  },[]);
  React.useEffect(()=>{
    let saved=false;
    try{saved=localStorage.getItem('lfo_just_saved')==='1';}catch(e){}
    if(saved){
      const item=window.LFO_ITEMS.find(it=>it.scope==='own'&&it.status==='pending');
      if(item)item.status='certified';
      try{localStorage.removeItem('lfo_just_saved');}catch(e){}
      setSavedToast(true);
      setTimeout(()=>setSavedToast(false),3500);
    }
  },[]);
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfpage-head'},
        React.createElement('div',null,
          React.createElement('h1',null,'ภาพรวม PEA Learning Form — การไฟฟ้าจังหวัด'),
          React.createElement('p',null,'สรุปจำนวน Learning Form ของคุณ และเลือกระดับหน่วยงานเพื่อเริ่มกรอกหรือทบทวนข้อมูล')
        ),
        React.createElement('div',{className:'lfpage-head-actions'},
          React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:()=>{window.location.href='/p1-p11-overview';}},'ทำ QIR ของตัวเอง')
        )
      ),
      React.createElement(MenuCards,{onGuide:()=>setGuideOpen(true)}),
      React.createElement(KpiCards,{year,scope}),
      React.createElement(RecentList,{year,setYear,scope,setScope})
    ),
    guideOpen&&React.createElement(FormGuideModal,{onClose:()=>setGuideOpen(false)}),
    savedToast&&React.createElement('div',{className:'ltoast'},React.createElement(Icon,{name:'check-circle',size:16}),'บันทึกทั้งหมดเรียบร้อยแล้ว')
  );
}

export default App;
