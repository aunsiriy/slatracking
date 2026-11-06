const {Button}=window.DesignSystem_cbd181;

// มุมมองของสายงาน (default) — ติดตามและคัดเลือก QIR ของฝ่ายภายใต้สายงาน
const QLO_LINE_NAME='สายงานดิจิทัลและการสื่อสาร';
const QLO_ROWS=[
  {year:'2569',recorder:'สวิชญา พฤกษหิรัญ',picked:0,lineAdded:0,date:'—',status:'pending'},
  {year:'2568',recorder:'สวิชญา พฤกษหิรัญ',picked:6,lineAdded:2,date:'05/10/2568',status:'submitted'},
  {year:'2567',recorder:'ธงชัย มีนวล',picked:5,lineAdded:1,date:'28/09/2567',status:'submitted'},
  {year:'2566',recorder:'ธงชัย มีนวล',picked:4,lineAdded:0,date:'01/10/2566',status:'submitted'}
];
// มุมมองของเขต — ใช้ flow เดียวกัน แต่คัดเลือก QIR จาก 3 ฝ่ายในเขต + 1 กองสนับสนุนงานเขต แทน
const QLO_ZONE_ROWS=[
  {year:'2569',recorder:'ดำรงค์ ศักดิ์สิทธิ์',picked:0,lineAdded:0,date:'—',status:'pending'},
  {year:'2568',recorder:'ดำรงค์ ศักดิ์สิทธิ์',picked:4,lineAdded:1,date:'03/10/2568',status:'submitted'},
  {year:'2567',recorder:'ดำรงค์ ศักดิ์สิทธิ์',picked:3,lineAdded:0,date:'25/09/2567',status:'submitted'}
];
const QLO_SCOPE_ROWS={line:QLO_ROWS,zone:QLO_ZONE_ROWS};

// A small pill toggle between the two scopes this page can run under — same flow for
// both, only which unit-level data feeds it differs (ฝ่ายของสายงาน vs ฝ่าย/กองของเขต).
function QloScopeToggle({scope,setScope}){
  return React.createElement('div',{className:'lfscope-toggle'},
    React.createElement('button',{type:'button',className:'lfscope-toggle-opt'+(scope==='line'?' is-active':''),onClick:()=>setScope('line')},'มุมมองของสายงาน'),
    React.createElement('button',{type:'button',className:'lfscope-toggle-opt'+(scope==='zone'?' is-active':''),onClick:()=>setScope('zone')},'มุมมองของเขต')
  );
}

// Tabs for the two distinct jobs this page covers: picking the year's QIR proposals
// (an annual, occasional task) vs. reporting progress on them every quarter (the
// recurring one). A small badge surfaces how many processes still need this quarter's
// report, mirroring the nav/tab badges in the reference mockup. The quarterly-reporting
// tab only applies to the line scope for now, so zone view only ever shows "sel".
function QloTabs({active,setActive,pendingCount,showReporting}){
  const tabs=[{key:'sel',label:'คัดเลือกประจำปี',icon:'calendar'}].concat(
    showReporting?[{key:'rep',label:'รายงานรายไตรมาส',icon:'trending-up'}]:[]
  );
  return React.createElement('nav',{className:'qlo-tabs'},
    tabs.map(t=>React.createElement('button',{key:t.key,type:'button',className:'qlo-tab'+(active===t.key?' is-active':''),onClick:()=>setActive(t.key)},
      React.createElement(Icon,{name:t.icon,size:16}),t.label,
      t.key==='rep'&&pendingCount>0&&React.createElement('span',{className:'qlo-tab-badge'},pendingCount)
    ))
  );
}

// Cumulative narrative log of what's been done on the line's QIR this fiscal year,
// one entry per quarter it was updated in (some quarters cover several dated actions).
// Shown collapsed by default above the KPI cards on the "รายงานรายไตรมาส" tab — a
// quick narrative overview distinct from the per-process quarterly grid below it.
const QLO_QUARTERLY_LOG=[
  {quarter:'Q1',lines:[
    'ศึกษาข้อมูลกระบวนการและปัญหาที่เกิดขึ้น เช่น ข้อร้องเรียนจากลูกค้าด้านการให้บริการ ปี 2567-2568, โครงสร้างการบริหารงานของ กฟภ. และ Kick off ประชุมกระบวนการ C7.3 กระบวนการสร้างความสัมพันธ์กับลูกค้า (Q1)'
  ]},
  {quarter:'Q2',lines:[
    '1. ประชุมหารือหน่วยงานที่เกี่ยวข้อง กสล. และ กสธ. เพื่อศึกษากระบวนการทำงานและรวบรวมข้อมูลในการจัดทำร่าง Workflow กระบวนการ C7.3 วันพุธที่ 8 เมษายน 2569',
    '2. กนอ. จัดทำร่าง Workflow กระบวนการ C7.3',
    '3. ประชุมหารือเพื่อพิจารณาจัดทำร่างกระบวนการ C7.3 กระบวนการจัดการข้อร้องเรียนลูกค้า วันพฤหัสบดีที่ 23 เมษายน 2569',
    '4. กนอ. มีหนังสือแจ้งเวียนให้ผู้เกี่ยวข้องกับกระบวนการ C7.3 พิจารณาตรวจสอบ Workflow ภายในวันศุกร์ที่ 22 พฤษภาคม 2569 (Q2)'
  ]},
  {quarter:'Q3',lines:[
    'จัดทำบันทึกขออนุเคราะห์พิจารณาตรวจสอบผังการไหลของกระบวนการ C7.3 กระบวนการสร้างความสัมพันธ์กับลูกค้า ตามหนังสือเลขที่ กนอ.(พร.(ภ))242/2569 ลงวันที่ 14 พฤษภาคม 2569 โดยอยู่ระหว่างรวบรวมข้อมูลเพื่อกำหนด Painpoint และประชุมหารือกับหน่วยงานที่เกี่ยวข้อง (Q3)'
  ]}
];

function QloQuarterlyLogSection({year}){
  const [open,setOpen]=React.useState(false);
  return React.createElement('div',{className:'card qlo-log'},
    React.createElement('button',{type:'button',className:'qlo-log-head',onClick:()=>setOpen(!open)},
      React.createElement('span',{className:'qlo-log-head-left'},
        React.createElement(Icon,{name:'file-text',size:18}),
        React.createElement('span',{className:'qlo-log-title'},'รายละเอียดผลการดำเนินงาน รายไตรมาส ปี '+year)
      ),
      React.createElement(Icon,{name:open?'chevron-down':'chevron-right',size:18})
    ),
    open&&React.createElement('div',{className:'qlo-log-body'},
      React.createElement('ul',{className:'qlo-log-list'},
        QLO_QUARTERLY_LOG.map((entry,i)=>React.createElement('li',{key:i,className:'qlo-log-item'},
          React.createElement('span',null,entry.lines[0]),
          entry.lines.length>1&&React.createElement('ul',{className:'qlo-log-sublist'},
            entry.lines.slice(1).map((ln,j)=>React.createElement('li',{key:j,className:'qlo-log-subitem'},ln))
          )
        ))
      )
    )
  );
}

function SelectionKpiCards({rows}){
  const total=rows.length;
  const latestYear=total?rows.map(r=>Number(r.year)).sort((a,b)=>b-a)[0]:null;
  const cards=[
    {icon:'calendar',label:'รอบปีทั้งหมด',value:total,color:'brand'},
    {icon:'check-circle',label:'ปีล่าสุดที่ส่ง',value:latestYear?'ปี '+latestYear:'—',color:'success'}
  ];
  return React.createElement('div',{className:'qlo-kpi-grid'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card qlo-kpi-card'},
      React.createElement('span',{className:'qlo-kpi-icon qlo-kpi-icon--'+c.color},React.createElement(Icon,{name:c.icon,size:18})),
      React.createElement('div',null,
        React.createElement('div',{className:'qlo-kpi-value'},c.value),
        React.createElement('div',{className:'qlo-kpi-label'},c.label)
      )
    ))
  );
}

// Same card shell, but speaking the quarterly-reporting tab's own language (which
// quarter, how many still unreported, how many already certified) instead of years.
function ReportingKpiCards({processes,currentQuarter,pendingCount}){
  const approved=processes.filter(p=>{
    const rec=window.QQ_STORE.get(window.QIR_QUARTERLY_YEAR,p.key,currentQuarter.key);
    return rec&&rec.status==='submitted'&&rec.approvedBy;
  }).length;
  const cards=[
    {icon:'calendar',label:'รอบที่ต้องรายงาน',value:currentQuarter.label,color:'brand'},
    {icon:'alert-triangle',label:'ยังไม่รายงาน',value:pendingCount+' กระบวนการ',color:pendingCount>0?'warning':'success'},
    {icon:'check-circle',label:'รับรองแล้ว',value:approved+' จาก '+processes.length,color:'success'}
  ];
  return React.createElement('div',{className:'qlo-kpi-grid qlo-kpi-grid--3'},
    cards.map((c,i)=>React.createElement('div',{key:i,className:'card qlo-kpi-card'},
      React.createElement('span',{className:'qlo-kpi-icon qlo-kpi-icon--'+c.color},React.createElement(Icon,{name:c.icon,size:18})),
      React.createElement('div',null,
        React.createElement('div',{className:'qlo-kpi-value'},c.value),
        React.createElement('div',{className:'qlo-kpi-label'},c.label)
      )
    ))
  );
}

function mergeRow(r,scope){
  const stored=(typeof window!=='undefined'&&window.QLF_STORE)?window.QLF_STORE.get(r.year,scope):null;
  if(!stored)return r;
  return {...r,
    status:stored.status||r.status,
    date:stored.submittedAt||r.date,
    picked:(stored.selectedIds||[]).length,
    lineAdded:(stored.ownGroups||[]).length,
    lastEditedAt:stored.lastEditedAt||null
  };
}

const QLO_INITIAL_SCOPE=(typeof window!=='undefined'&&new URLSearchParams(window.location.search).get('scope')==='zone')?'zone':'line';

function App(){
  const [scope,setScope]=React.useState(QLO_INITIAL_SCOPE);
  const isZone=scope==='zone';
  const scopeDef=(window.QLF_SCOPES||{})[scope]||{label:'สายงาน',name:QLO_LINE_NAME};
  const scopeLabel=scopeDef.label;
  const scopeName=scopeDef.name;
  const scopeRowsRaw=QLO_SCOPE_ROWS[scope];
  // The history table is a record of what's actually happened, so only years with a
  // real submitted selection belong in it — a year nobody has picked yet isn't "history".
  const rows=scopeRowsRaw.map(r=>mergeRow(r,scope)).filter(r=>r.status==='submitted');
  const [yearFilter,setYearFilter]=React.useState('all');
  const [search,setSearch]=React.useState('');

  // The quarterly-reporting engine only tracks the line scope for now, so the zone
  // view never shows that tab and always stays on the annual-selection one.
  const processes=isZone?[]:window.qqBuildProcesses();
  const quarters=window.QIR_QUARTERLY_QUARTERS;
  const currentQuarter=quarters.find(q=>q.isCurrent)||quarters[quarters.length-1];
  const pendingCount=isZone?0:processes.filter(p=>{
    const rec=window.QQ_STORE.get(window.QIR_QUARTERLY_YEAR,p.key,currentQuarter.key);
    return !rec||rec.status!=='submitted';
  }).length;

  // Default tab follows whether there's a report due, not whatever tab was open last —
  // someone who just finished picking proposals in October shouldn't land back on the
  // selection tab in January when reports are waiting, and vice versa. Zone view has
  // no reporting tab at all, so it always starts (and stays) on "sel".
  const [tab,setTab]=React.useState(()=>(!isZone&&pendingCount>0)?'rep':'sel');
  function changeScope(next){setScope(next);if(next==='zone')setTab('sel');}
  const [modal,setModal]=React.useState(null);
  const [toast,setToast]=React.useState(null);

  const yearOptions=rows.map(r=>r.year);
  const q=search.trim().toLowerCase();
  const filtered=rows
    .filter(r=>yearFilter==='all'||r.year===yearFilter)
    .filter(r=>!q||[r.year,r.recorder,r.date].join(' ').toLowerCase().includes(q));
  const hasFilter=yearFilter!=='all'||q!=='';
  function clearFilter(){setYearFilter('all');setSearch('');}
  function openRow(r){
    window.location.href='/qir-line-form?year='+r.year+'&mode=view&scope='+scope;
  }
  function goSelect(){
    const cur=scopeRowsRaw.map(r=>mergeRow(r,scope)).find(r=>r.status!=='submitted');
    window.location.href='/qir-line-form?year='+(cur?cur.year:scopeRowsRaw[0].year)+'&scope='+scope;
  }

  const scopeToggle=React.createElement(QloScopeToggle,{scope,setScope:changeScope});

  return React.createElement(React.Fragment,null,
    React.createElement(window.PageHeader,{
      backHref:'/',
      avatarText:'สด',
      breadcrumb:[{label:'หน้าหลัก',href:'/'},{label:'ภาพรวม QIR '+scopeLabel}],
      title:'ภาพรวม QIR '+scopeLabel,
      actions:React.createElement(React.Fragment,null,
        scopeToggle,
        tab==='sel'
          ?React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:goSelect},'คัดเลือกประจำปี')
          :React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'download',size:16}),onClick:()=>window.qqExportExcel(processes,quarters)},'Export Excel')
      ),
      subtitle:tab==='sel'
        ?'ติดตามสถานะการคัดเลือก QIR ระดับ'+scopeLabel+'ของ '+scopeName+' ในแต่ละรอบปี'
        :'ติดตามความคืบหน้ารายไตรมาสของ QIR ที่ '+scopeName+' คัดเลือกไว้ · คลิกที่การ์ดไตรมาสเพื่อดูรายละเอียดหรือรายงานผล',
      tabs:React.createElement(QloTabs,{active:tab,setActive:setTab,pendingCount,showReporting:!isZone})
    }),
    tab==='sel'?React.createElement('main',{className:'lfcontent'},
      React.createElement(SelectionKpiCards,{rows}),
      React.createElement('div',{className:'card lsection'},
        React.createElement('div',{className:'lsection-head'},
          React.createElement('div',null,
            React.createElement('h3',null,'ประวัติการคัดเลือกรายปี'),
            React.createElement('p',{className:'lsection-hint'},'แต่ละปีระบุว่าได้ส่งผลการคัดเลือก QIR ของ'+scopeLabel+'เรียบร้อยแล้วหรือยัง')
          )
        ),
        rows.length>0&&React.createElement('div',{className:'qlo-filters'},
          React.createElement('div',{className:'qlo-search'},
            React.createElement(Icon,{name:'search',size:15}),
            React.createElement('input',{placeholder:'ค้นหาปี / ผู้คัดเลือก...',value:search,onChange:e=>setSearch(e.target.value)})
          ),
          React.createElement(window.SelectMenu,{style:{width:'170px'},value:yearFilter,onChange:setYearFilter,options:[{value:'all',label:'ทุกปี'},...yearOptions.map(y=>({value:y,label:'ประจำปี '+y}))]}),
          hasFilter&&React.createElement(Button,{variant:'secondary',size:'md',onClick:clearFilter},'ล้างค่า')
        ),
        rows.length===0
          ?React.createElement('div',{className:'qlo-empty'},
            React.createElement(Icon,{name:'file-text',size:22}),
            React.createElement('span',{className:'qlo-empty-title'},'ยังไม่มีประวัติการคัดเลือก'),
            React.createElement('span',{className:'qlo-empty-sub'},'เมื่อส่งผลการคัดเลือก QIR ของ'+scopeLabel+'ในปีใด ประวัติของปีนั้นจะมาแสดงที่นี่'),
            React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:goSelect},'คัดเลือกประจำปี')
          )
          :filtered.length===0
            ?React.createElement('div',{className:'qlo-empty'},
              React.createElement(Icon,{name:'search',size:22}),
              React.createElement('span',{className:'qlo-empty-title'},'ไม่พบข้อมูลตามที่ค้นหา'),
              React.createElement('span',{className:'qlo-empty-sub'},'ลองปรับคำค้นหรือเลือกปีใหม่'),
              React.createElement(Button,{variant:'secondary',size:'sm',onClick:clearFilter},'ล้างตัวกรอง')
            )
            :React.createElement('table',{className:'ltable qlo-table'},
              React.createElement('thead',null,React.createElement('tr',null,
                ['ประจำปี','ผู้คัดเลือก','ข้อเสนอที่คัดเลือก','QIR ของ'+scopeLabel,'วันที่ส่ง',''].map((h,i)=>React.createElement('th',{key:i},h))
              )),
              React.createElement('tbody',null,filtered.map(r=>
                React.createElement('tr',{key:r.year,className:'qlo-row',onClick:()=>openRow(r)},
                  React.createElement('td',null,'ปี '+r.year),
                  React.createElement('td',null,r.recorder),
                  React.createElement('td',null,r.picked?r.picked+' ข้อเสนอ':'—'),
                  React.createElement('td',null,r.lineAdded?r.lineAdded+' รายการ':'—'),
                  React.createElement('td',null,
                    React.createElement('div',null,r.date),
                    r.lastEditedAt&&React.createElement('div',{className:'qlo-edited'},'แก้ไขล่าสุด '+r.lastEditedAt)
                  ),
                  React.createElement('td',{className:'qlo-row-action'},
                    React.createElement(Button,{variant:'tertiary',size:'sm',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:14}),onClick:e=>{e.stopPropagation();openRow(r);}},'ดูรายละเอียด')
                  )
                )
              ))
            )
      )
    ):React.createElement('main',{className:'lfcontent'},
      React.createElement(QloQuarterlyLogSection,{year:Number(window.QIR_QUARTERLY_YEAR)+1}),
      React.createElement(ReportingKpiCards,{processes,currentQuarter,pendingCount}),
      React.createElement(window.QqOverview,{processes,quarters,onOpenCell:(process,quarter,mode)=>setModal({process,quarter,mode})})
    ),
    modal&&React.createElement(window.QqDetailModal,{process:modal.process,quarter:modal.quarter,mode:modal.mode,
      onClose:()=>setModal(null),
      onSaved:status=>{
        setModal(null);
        setToast(status==='submitted'?'ยืนยันการรายงานเรียบร้อยแล้ว':'บันทึกร่างเรียบร้อยแล้ว');
      }
    }),
    toast&&React.createElement('div',{className:'ltoast'},React.createElement(Icon,{name:'check-circle',size:16}),toast)
  );
}

export default App;
