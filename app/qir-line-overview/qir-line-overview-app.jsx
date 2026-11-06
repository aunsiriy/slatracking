const {Button}=window.DesignSystem_cbd181;

const QLO_LINE_NAME='สายงานดิจิทัลและการสื่อสาร';
const QLO_ROWS=[
  {year:'2569',recorder:'สวิชญา พฤกษหิรัญ',picked:0,lineAdded:0,date:'—',status:'pending'},
  {year:'2568',recorder:'สวิชญา พฤกษหิรัญ',picked:6,lineAdded:2,date:'05/10/2568',status:'submitted'},
  {year:'2567',recorder:'ธงชัย มีนวล',picked:5,lineAdded:1,date:'28/09/2567',status:'submitted'},
  {year:'2566',recorder:'ธงชัย มีนวล',picked:4,lineAdded:0,date:'01/10/2566',status:'submitted'}
];

// Tabs for the two distinct jobs this page covers: picking the year's QIR proposals
// (an annual, occasional task) vs. reporting progress on them every quarter (the
// recurring one). A small badge surfaces how many processes still need this quarter's
// report, mirroring the nav/tab badges in the reference mockup.
function QloTabs({active,setActive,pendingCount}){
  const tabs=[{key:'sel',label:'คัดเลือกประจำปี',icon:'calendar'},{key:'rep',label:'รายงานรายไตรมาส',icon:'trending-up'}];
  return React.createElement('nav',{className:'qlo-tabs'},
    tabs.map(t=>React.createElement('button',{key:t.key,type:'button',className:'qlo-tab'+(active===t.key?' is-active':''),onClick:()=>setActive(t.key)},
      React.createElement(Icon,{name:t.icon,size:16}),t.label,
      t.key==='rep'&&pendingCount>0&&React.createElement('span',{className:'qlo-tab-badge'},pendingCount)
    ))
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

function mergeRow(r){
  const stored=(typeof window!=='undefined'&&window.QLF_STORE)?window.QLF_STORE.get(r.year):null;
  if(!stored)return r;
  return {...r,
    status:stored.status||r.status,
    date:stored.submittedAt||r.date,
    picked:(stored.selectedIds||[]).length,
    lineAdded:(stored.ownGroups||[]).length,
    lastEditedAt:stored.lastEditedAt||null
  };
}

function App(){
  // The history table is a record of what's actually happened, so only years with a
  // real submitted selection belong in it — a year nobody has picked yet isn't "history".
  const rows=QLO_ROWS.map(mergeRow).filter(r=>r.status==='submitted');
  const [yearFilter,setYearFilter]=React.useState('all');
  const [search,setSearch]=React.useState('');

  const processes=window.qqBuildProcesses();
  const quarters=window.QIR_QUARTERLY_QUARTERS;
  const currentQuarter=quarters.find(q=>q.isCurrent)||quarters[quarters.length-1];
  const pendingCount=processes.filter(p=>{
    const rec=window.QQ_STORE.get(window.QIR_QUARTERLY_YEAR,p.key,currentQuarter.key);
    return !rec||rec.status!=='submitted';
  }).length;

  // Default tab follows whether there's a report due, not whatever tab was open last —
  // someone who just finished picking proposals in October shouldn't land back on the
  // selection tab in January when reports are waiting, and vice versa.
  const [tab,setTab]=React.useState(()=>pendingCount>0?'rep':'sel');
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
    window.location.href='/qir-line-form?year='+r.year+'&mode=view';
  }
  function goSelect(){
    const cur=QLO_ROWS.map(mergeRow).find(r=>r.status!=='submitted');
    window.location.href='/qir-line-form?year='+(cur?cur.year:QLO_ROWS[0].year);
  }

  return React.createElement(React.Fragment,null,
    React.createElement(window.PageHeader,{
      backHref:'/',
      avatarText:'สด',
      breadcrumb:[{label:'หน้าหลัก',href:'/'},{label:'ภาพรวม QIR สายงาน'}],
      title:'ภาพรวม QIR สายงาน',
      actions:tab==='sel'
        ?React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:goSelect},'คัดเลือกประจำปี')
        :React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'download',size:16}),onClick:()=>window.qqExportExcel(processes,quarters)},'Export Excel'),
      subtitle:tab==='sel'
        ?'ติดตามสถานะการคัดเลือก QIR ระดับสายงานของ '+QLO_LINE_NAME+' ในแต่ละรอบปี'
        :'ติดตามความคืบหน้ารายไตรมาสของ QIR ที่ '+QLO_LINE_NAME+' คัดเลือกไว้ · คลิกที่การ์ดไตรมาสเพื่อดูรายละเอียดหรือรายงานผล',
      tabs:React.createElement(QloTabs,{active:tab,setActive:setTab,pendingCount})
    }),
    tab==='sel'?React.createElement('main',{className:'lfcontent'},
      React.createElement(SelectionKpiCards,{rows}),
      React.createElement('div',{className:'card lsection'},
        React.createElement('div',{className:'lsection-head'},
          React.createElement('div',null,
            React.createElement('h3',null,'ประวัติการคัดเลือกรายปี'),
            React.createElement('p',{className:'lsection-hint'},'แต่ละปีระบุว่าได้ส่งผลการคัดเลือก QIR ของสายงานเรียบร้อยแล้วหรือยัง')
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
            React.createElement('span',{className:'qlo-empty-sub'},'เมื่อส่งผลการคัดเลือก QIR ของสายงานในปีใด ประวัติของปีนั้นจะมาแสดงที่นี่'),
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
                ['ประจำปี','ผู้คัดเลือก','ข้อเสนอที่คัดเลือก','QIR ของสายงาน','วันที่ส่ง',''].map((h,i)=>React.createElement('th',{key:i},h))
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
