import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,InputField,Avatar}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'ttb'},
    React.createElement('div',{className:'ttb-left'},
      React.createElement(Link,{href:'/',className:'back-link'},React.createElement(Icon,{name:'chevron-right',size:16,style:{transform:'rotate(180deg)'}}),'กลับหน้าหลัก'),
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
    {icon:'clock',label:'รอดำเนินการ',value:s.pendingCount,color:'warning'},
    {icon:'calendar',label:'เสร็จสิ้น',value:s.total-s.pendingCount,color:'success'}
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

function FormGuideModal({onClose}){
  const [open,setOpen]=React.useState(0);
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card lfguide-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'คำอธิบายแบบฟอร์ม'),
        React.createElement('button',{className:'lfa-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      React.createElement('div',{className:'lfguide-list'},
        (window.LFO_FORM_GUIDE||[]).map((g,i)=>React.createElement('div',{key:i,className:'lfguide-item'+(open===i?' is-open':'')},
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

function MenuCards({onGuide}){
  const cards=[
    {icon:'help-circle',title:'คำอธิบายแบบฟอร์ม',desc:'รายละเอียดการกรอกข้อมูลส่วนที่ 0-7 ของ Learning Form พร้อมคำนิยามแต่ละหัวข้อ',cta:'ดูคำอธิบาย',onClick:onGuide},
    {icon:'download-01',title:'Export Learning Form',desc:'ดาวน์โหลดแบบฟอร์มของทุกหน่วยงานเป็นไฟล์ PDF / Excel เพื่อจัดเก็บหรือรายงาน',cta:'Export',href:'/learning-form-export'},
    {icon:'map-pin',title:'QIR การไฟฟ้าจังหวัด',desc:'ภาพรวมเกณฑ์ P1-P11 และแบบฟอร์ม QIR ประจำปี สำหรับหน่วยงาน กฟฟ.',cta:'ดู Overview P1-P11',href:'/p1-p11-overview'}
  ];
  return React.createElement('div',{className:'lfamenu-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card lfamenu-card'},
      React.createElement('span',{className:'lfamenu-icon'},React.createElement(Icon,{name:c.icon,size:22})),
      React.createElement('h3',{className:'lfamenu-title'},c.title),
      React.createElement('p',{className:'lfamenu-desc'},c.desc),
      React.createElement(Button,{variant:'secondary',size:'md',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>{if(c.onClick)c.onClick();else window.location.href=c.href;}},c.cta)
    ))
  );
}

function TrackList(){
  const [year,setYear]=React.useState('2569');
  const [scope,setScope]=React.useState('own');
  const [line,setLine]=React.useState('all');
  const [stat,setStat]=React.useState('all');
  const [search,setSearch]=React.useState('');
  const depts=window.LFOA_DEPTS||[];
  const prog=(window.LFOA_PROGRESS||{})[year]||{};
  const SM=window.LFOA_TRACK_STATUS;
  const lineOptions=Array.from(new Set(depts.map(d=>d.line)));
  const MY_DEPT='ฝ่ายพัฒนาองค์กรและบริหารการเปลี่ยนแปลง (ฝพอ.)';
  const allYears=Object.keys(window.LFOA_PROGRESS).sort().reverse();
  const ownRows=allYears.map(y=>{
    const p=(window.LFOA_PROGRESS[y]||{})[MY_DEPT];
    return {year:y,dept:MY_DEPT,line:'',status:p?p.status:'notstarted',recorder:p?p.recorder:'—',date:p?p.date:'—',hasForm:!!p};
  });
  const rows=scope==='own'?ownRows:depts.filter(d=>d.dept!==MY_DEPT).map(d=>{
    const p=prog[d.dept];
    return {dept:d.dept,line:d.line,status:p?p.status:'notstarted',recorder:p?p.recorder:'—',date:p?p.date:'—',hasForm:!!p};
  });
  const done=rows.filter(r=>r.status==='certified').length;
  const pct=Math.round(done/rows.length*100);
  const counts={all:rows.length,certified:done,pending:rows.filter(r=>r.status==='pending').length,draft:rows.filter(r=>r.status==='draft').length,notstarted:rows.filter(r=>r.status==='notstarted').length};
  const items=rows
    .filter(r=>line==='all'||r.line===line)
    .filter(r=>stat==='all'||r.status===stat)
    .filter(r=>!search.trim()||r.dept.toLowerCase().includes(search.trim().toLowerCase()));
  const chips=[['all','ทั้งหมด'],['certified','เสร็จสิ้น'],['pending','รอดำเนินการ'],['draft','ร่าง'],['notstarted','ยังไม่เริ่ม']];
  return React.createElement('div',{className:'card lflist-card'},
    React.createElement('div',{className:'lflist-head'},
      React.createElement('div',null,
        React.createElement('h3',null,scope==='own'?'Learning Form ล่าสุด':'ความคืบหน้าการจัดทำ Learning Form ทุกหน่วยงาน'),
        React.createElement('p',{className:'lftrack-sub'},scope==='own'?'รายงานประจำปีของหน่วยงานที่คุณรับผิดชอบ — คลิกที่แถวเพื่อดูหรือแก้ไขแบบฟอร์ม':'ติดตามว่าแต่ละฝ่ายจัดทำแบบฟอร์มประจำปีครบแล้วหรือยัง — คลิกที่แถวเพื่อดูรายละเอียดแบบฟอร์ม')
      ),
      React.createElement('div',{className:'lfscope-toggle'},
        React.createElement('button',{className:'lfscope-toggle-opt'+(scope==='own'?' is-active':''),onClick:()=>setScope('own')},'ระดับฝ่ายของตัวเอง'),
        React.createElement('button',{className:'lfscope-toggle-opt'+(scope==='other'?' is-active':''),onClick:()=>setScope('other')},'ดูระดับฝ่ายอื่นๆ')
      )
    ),
    scope==='other'&&React.createElement('div',{className:'lftrack-chips'},
      chips.map(([k,label])=>React.createElement('button',{key:k,type:'button',className:'lftrack-chip'+(stat===k?' is-active':''),onClick:()=>setStat(k)},
        label,React.createElement('span',{className:'lftrack-chip-n'},counts[k])
      ))
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
      React.createElement(Button,{variant:'secondary',size:'md',onClick:()=>{setSearch('');setLine('all');setStat('all');}},'ล้างค่า')
    ),
    items.length===0?React.createElement('div',{className:'lflist-empty'},'ไม่มีหน่วยงานตามเงื่อนไขที่เลือก'):
    React.createElement('table',{className:'lftable'},
      React.createElement('thead',null,
        React.createElement('tr',null,
          React.createElement('th',null,scope==='own'?'ประจำปี':'ฝ่ายที่รับผิดชอบ'),
          scope==='other'&&React.createElement('th',null,'สายงาน'),
          React.createElement('th',null,'ผู้บันทึกข้อมูล'),
          React.createElement('th',null,'วันที่ดำเนินการ'),
          React.createElement('th',null,'สถานะ'),
          React.createElement('th',null,'')
        )
      ),
      React.createElement('tbody',null,
        items.map((r,i)=>{
          const st=SM[r.status];
          return React.createElement('tr',{key:i,className:r.hasForm?'lftable-row':'lftrack-row-empty',onClick:r.hasForm?()=>{window.location.href='/learning-form';}:undefined},
            React.createElement('td',{className:'lftrack-dept'},scope==='own'?'การประเมินและปรับปรุงกระบวนการ ประจำปี '+r.year:r.dept),
            scope==='other'&&React.createElement('td',null,r.line),
            React.createElement('td',null,r.recorder),
            React.createElement('td',null,r.date),
            React.createElement('td',null,React.createElement(Badge,{label:st.label,type:'pill-color',color:st.color,size:'sm'})),
            React.createElement('td',{className:'lftrack-action'},
              r.hasForm?React.createElement('span',{className:'lftrack-link'},'ดูรายละเอียด',React.createElement(Icon,{name:'arrow-right',size:14})):React.createElement('span',{className:'lftrack-muted'},'ยังไม่มีแบบฟอร์ม')
            )
          );
        })
      )
    )
  );
}

function App(){
  const [year]=React.useState(window.LFOA_YEARS[0]);
  const [guideOpen,setGuideOpen]=React.useState(false);
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lfacontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'lfapage-head'},
        React.createElement('div',null,
          React.createElement('h1',null,'ภาพรวม Learning Form'),
          React.createElement('p',null,'สรุปจำนวน Learning Form ทั้งองค์กร และติดตามความคืบหน้าของแต่ละหน่วยงาน')
        ),
        React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:()=>{window.location.href='/learning-form';}},'สร้าง Learning Form ของตัวเอง')
      ),
      React.createElement(MenuCards,{onGuide:()=>setGuideOpen(true)}),
      React.createElement(KpiCards,{year}),
      React.createElement(TrackList,null),
      guideOpen&&React.createElement(FormGuideModal,{onClose:()=>setGuideOpen(false)})
    )
  );
}

export default App;
