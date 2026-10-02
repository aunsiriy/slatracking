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

const LFOA_MY_DEPT='ฝ่ายพัฒนาองค์กรและบริหารการเปลี่ยนแปลง (ฝพอ.)';
function getTrackRows(scope){
  const depts=window.LFOA_DEPTS||[];
  if(scope==='own'){
    const allYears=Object.keys(window.LFOA_PROGRESS).sort().reverse();
    return allYears.map(y=>{
      const p=(window.LFOA_PROGRESS[y]||{})[LFOA_MY_DEPT];
      const ref='own-'+y;
      return {year:y,dept:LFOA_MY_DEPT,line:'',ref,status:window.lfoResolveStatus(ref,p?p.status:'pending',p&&p.due),recorder:p?p.recorder:'—',date:p?p.date:'—',hasForm:!!p};
    });
  }
  const prog=(window.LFOA_PROGRESS||{})['2569']||{};
  return depts.filter(d=>d.dept!==LFOA_MY_DEPT).map(d=>{
    const p=prog[d.dept];
    const ref='dept-'+d.dept;
    return {dept:d.dept,line:d.line,ref,status:window.lfoResolveStatus(ref,p?p.status:'pending',p&&p.due),recorder:p?p.recorder:'—',date:p?p.date:'—',hasForm:!!p};
  });
}
const LFOA_KPI_ICON={pending:'file-text',draft:'edit',certified:'check-circle',overdue:'alert-triangle'};
function KpiCards({scope}){
  const rows=getTrackRows(scope);
  const SM=window.LFO_STATUS_MAP;
  const cards=window.LFO_STATUS_ORDER.map(key=>({
    icon:LFOA_KPI_ICON[key],
    label:SM[key].label,
    value:rows.filter(r=>r.status===key).length,
    color:SM[key].color
  }));
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

function TrackList({scope,setScope}){
  const [line,setLine]=React.useState('all');
  const [stat,setStat]=React.useState('all');
  const [search,setSearch]=React.useState('');
  const depts=window.LFOA_DEPTS||[];
  const SM=window.LFO_STATUS_MAP;
  const lineOptions=Array.from(new Set(depts.map(d=>d.line)));
  const rows=getTrackRows(scope);
  const counts={all:rows.length};
  window.LFO_STATUS_ORDER.forEach(key=>{counts[key]=rows.filter(r=>r.status===key).length;});
  const items=rows
    .filter(r=>line==='all'||r.line===line)
    .filter(r=>stat==='all'||r.status===stat)
    .filter(r=>!search.trim()||r.dept.toLowerCase().includes(search.trim().toLowerCase()));
  const chips=[['all','ทั้งหมด'],...window.LFO_STATUS_ORDER.map(key=>[key,SM[key].label])];
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
      React.createElement(window.SelectMenu,{style:{width:'224px'},value:line,onChange:setLine,options:[{value:'all',label:'ทุกสายงาน'},...lineOptions.map(l=>({value:l,label:l}))]}),
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
          return React.createElement('tr',{key:i,className:r.hasForm?'lftable-row':'lftrack-row-empty',onClick:r.hasForm?()=>{window.location.href=window.lfoFormHref(r.status,r.ref)+'&back=%2Flearning-form-overview-admin';}:undefined},
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

const LFOA_STATUS_PCT={certified:100,draft:50,pending:25,overdue:0,notstarted:0};

function DashBar({pct}){
  return React.createElement('div',{className:'lfadash-bar-track'},
    React.createElement('div',{className:'lfadash-bar-fill'+(pct>=100?' is-full':''),style:{width:Math.max(pct,2)+'%'}})
  );
}

function SubmissionDashboard(){
  const years=Object.keys(window.LFOA_PROGRESS||{}).sort().reverse();
  const [year,setYear]=React.useState(years[0]||'2569');
  const [tab,setTab]=React.useState('line');
  const [expanded,setExpanded]=React.useState({});
  function toggle(key){setExpanded(e=>({...e,[key]:!e[key]}));}
  const unitWord=tab==='line'?'ฝ่าย':'หน่วยงาน';

  let groups;
  if(tab==='line'){
    const depts=window.LFOA_DEPTS||[];
    const prog=(window.LFOA_PROGRESS||{})[year]||{};
    const lines=Array.from(new Set(depts.map(d=>d.line)));
    groups=lines.map(line=>{
      const children=depts.filter(d=>d.line===line).map(d=>{
        const st=(prog[d.dept]||{}).status||'notstarted';
        return {name:d.dept,pct:LFOA_STATUS_PCT[st],status:st};
      });
      const pct=children.length?Math.round(children.reduce((s,k)=>s+k.pct,0)/children.length):0;
      return {key:line,name:line,pct,count:children.length,done:children.filter(k=>k.pct>=100).length,children};
    });
  }else{
    groups=(window.LFOA_ZONES||[]).map(z=>{
      const children=z.units.map(u=>({name:u.name,pct:(u.pct||{})[year]||0}));
      const pct=children.length?Math.round(children.reduce((s,k)=>s+k.pct,0)/children.length):0;
      return {key:z.zone,name:z.zone,pct,count:children.length,done:children.filter(k=>k.pct>=100).length,children};
    });
  }
  const allKids=groups.reduce((a,g)=>a.concat(g.children),[]);
  const overallPct=allKids.length?Math.round(allKids.reduce((s,k)=>s+k.pct,0)/allKids.length):0;
  const overallDone=allKids.filter(k=>k.pct>=100).length;
  const phi=Math.PI*(1-overallPct/100);
  const ex=(100+90*Math.cos(phi)).toFixed(2);
  const ey=(100-90*Math.sin(phi)).toFixed(2);

  return React.createElement('div',{className:'card lfadash'},
    React.createElement('div',{className:'lfadash-head-row'},
      React.createElement('div',{className:'lfadash-head'},
        React.createElement('h3',null,'ภาพรวมการส่ง Learning Form'),
        React.createElement('p',{className:'lftrack-sub'},'สัดส่วนความคืบหน้าการจัดทำ Learning Form — กดที่แต่ละแถวเพื่อดูรายหน่วยงานภายใน')
      ),
      React.createElement('div',{className:'lfadash-filters'},
        React.createElement('div',{className:'lfscope-toggle'},
          React.createElement('button',{className:'lfscope-toggle-opt'+(tab==='line'?' is-active':''),onClick:()=>{setTab('line');setExpanded({});}},'สายงาน (สำนักงานใหญ่)'),
          React.createElement('button',{className:'lfscope-toggle-opt'+(tab==='zone'?' is-active':''),onClick:()=>{setTab('zone');setExpanded({});}},'แต่ละเขต')
        ),
        React.createElement(window.SelectMenu,{style:{width:'150px'},value:year,onChange:setYear,options:years.map(y=>({value:y,label:'ประจำปี '+y}))})
      )
    ),
    React.createElement('div',{className:'lfadash-body'},
      React.createElement('div',{className:'lfadash-gauge'},
        React.createElement('svg',{viewBox:'0 0 200 116',className:'lfadash-gauge-svg'},
          React.createElement('path',{d:'M 10 100 A 90 90 0 0 1 190 100',fill:'none',stroke:'var(--pea-bg-tertiary)',strokeWidth:16,strokeLinecap:'round'}),
          overallPct>0&&React.createElement('path',{d:'M 10 100 A 90 90 0 0 1 '+ex+' '+ey,fill:'none',stroke:overallPct>=100?'var(--pea-fg-success-primary)':'var(--pea-bg-brand-solid)',strokeWidth:16,strokeLinecap:'round'})
        ),
        React.createElement('div',{className:'lfadash-gauge-center'},
          React.createElement('span',{className:'lfadash-gauge-label'},'ความคืบหน้าโดยรวม'),
          React.createElement('span',{className:'lfadash-gauge-value'},overallPct+'%'),
          React.createElement('span',{className:'lfadash-gauge-sub'},overallDone+' / '+allKids.length+' '+unitWord+'ส่งครบ')
        )
      ),
      React.createElement('div',{className:'lfadash-tree'},
        groups.map(g=>React.createElement(React.Fragment,{key:g.key},
        React.createElement('button',{type:'button',className:'lfadash-node'+(expanded[g.key]?' is-open':''),onClick:()=>toggle(g.key)},
          React.createElement(Icon,{name:expanded[g.key]?'chevron-down':'chevron-right',size:16}),
          React.createElement('span',{className:'lfadash-node-name'},g.name),
          React.createElement(DashBar,{pct:g.pct}),
          React.createElement('span',{className:'lfadash-node-val'},g.pct+'%  ·  '+g.done+'/'+g.count+' '+unitWord)
        ),
        expanded[g.key]&&React.createElement('div',{className:'lfadash-children'},
          g.children.map((c,ci)=>React.createElement('div',{key:ci,className:'lfadash-child'},
            React.createElement('span',{className:'lfadash-child-name'},c.name),
            React.createElement(DashBar,{pct:c.pct}),
            React.createElement('span',{className:'lfadash-child-val'},c.pct+'%')
          ))
        )
      ))
      )
    )
  );
}

function App(){
  const [scope,setScope]=React.useState('own');
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
      React.createElement(SubmissionDashboard,null),
      React.createElement(KpiCards,{scope}),
      React.createElement(TrackList,{scope,setScope}),
      guideOpen&&React.createElement(FormGuideModal,{onClose:()=>setGuideOpen(false)})
    )
  );
}

export default App;
