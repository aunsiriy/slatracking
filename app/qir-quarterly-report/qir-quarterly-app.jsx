const {Button,Badge,InputField,Textarea}=window.DesignSystem_cbd181;

function QqTabs({active,setActive}){
  const tabs=[{key:'ov',label:'ภาพรวมรายไตรมาส',icon:'layout-grid'},{key:'fm',label:'ฟอร์มรายงาน',icon:'edit'}];
  return React.createElement('nav',{className:'qq-tabs'},
    tabs.map(t=>React.createElement('button',{
      key:t.key,type:'button',className:'qq-tab'+(active===t.key?' is-active':''),onClick:()=>setActive(t.key)
    },React.createElement(Icon,{name:t.icon,size:16}),t.label))
  );
}

// ภาพรวมรายไตรมาส — one row per QIR item the line already selected (own + dept-selected),
// one status cell per quarter. Pulled live from window.qqBuildProcesses() so it always
// matches whatever was confirmed on the selection-detail page.
function QqOverviewCell({process,quarter}){
  const rec=window.QQ_STORE.get(window.QIR_QUARTERLY_YEAR,process.key,quarter.key);
  if(!rec)return React.createElement('div',{className:'qq-cell qq-cell--future'},
    React.createElement(Icon,{name:'clock',size:14}),'ยังไม่ถึงรอบ'
  );
  const total=window.qqProcessTotal(process,quarter.index);
  const approved=!!rec.approvedBy;
  return React.createElement('div',{className:'qq-cell'},
    React.createElement('div',{className:'qq-cell-head'},
      React.createElement(Badge,{label:approved?'รับรองแล้ว':'รอรับรอง',type:'pill-color',color:approved?'success':'warning',size:'sm'}),
      React.createElement('span',{className:'qq-cell-pct'},total+'%')
    ),
    React.createElement('div',{className:'qq-progress'},React.createElement('div',{className:'qq-progress-bar',style:{width:total+'%'}})),
    React.createElement('div',{className:'qq-cell-person'},React.createElement(Icon,{name:'edit',size:12}),rec.reportedBy),
    approved?
      React.createElement('div',{className:'qq-cell-person'},React.createElement(Icon,{name:'check-circle',size:12}),rec.approvedBy):
      React.createElement('div',{className:'qq-cell-note'},'ยังไม่มีผู้รับรอง')
  );
}
function QqOverview({processes,quarters}){
  return React.createElement('div',{className:'card qq-ov-card'},
    React.createElement('div',{className:'qq-ov-head'},
      React.createElement('span',{className:'qq-ov-head-name'},'กระบวนการ / ข้อเสนอ QIR'),
      quarters.map(q=>React.createElement('span',{key:q.key,className:'qq-ov-head-q'},q.label,q.isCurrent&&React.createElement('span',{className:'qq-ov-head-current'},'ปัจจุบัน')))
    ),
    processes.length===0?React.createElement('div',{className:'qq-empty'},'สายงานยังไม่มี QIR ที่คัดเลือกไว้สำหรับปีนี้'):
    processes.map(p=>React.createElement('div',{key:p.key,className:'qq-ov-row'},
      React.createElement('div',{className:'qq-ov-info'},
        React.createElement('span',{className:'qq-ov-group'},p.isOwn?window.QLF_LINE_NAME:p.group),
        React.createElement('div',{className:'qq-ov-title'},p.title)
      ),
      quarters.map(q=>React.createElement(QqOverviewCell,{key:q.key,process:p,quarter:q}))
    ))
  );
}

// ฟอร์มรายงาน — report the CURRENT quarter only (past quarters are closed history,
// already shown in the overview). Sidebar mirrors the ต้องกรอก/รายงานแล้ว pattern used
// by every other report-form page in this app.
function QqProcessListItem({process,active,done,onSelect}){
  return React.createElement('button',{type:'button',className:'sidebar-item'+(active?' is-active':'')+(done?' is-complete':''),onClick:onSelect},
    React.createElement('span',{className:'sidebar-item-num'+(done?' is-done':'')},done?React.createElement(Icon,{name:'check',size:13}):React.createElement(Icon,{name:'file-text',size:13})),
    React.createElement('div',{className:'sidebar-item-body'},
      React.createElement('div',{className:'sidebar-item-title'},process.isOwn?window.QLF_LINE_NAME:process.group),
      React.createElement('div',{className:'sidebar-item-reason'},process.title)
    )
  );
}

function QqActivityRow({activity,draftValue,onChange,error}){
  const locked=window.qqIsLocked(activity,3);
  const prev=window.qqValueAt(activity,2);
  return React.createElement('tr',null,
    React.createElement('td',null,activity.name),
    React.createElement('td',{className:'qq-weight-cell'},activity.weight),
    React.createElement('td',{className:'qq-weight-cell'},prev+'%'),
    React.createElement('td',{className:'qq-value-cell'},
      locked?React.createElement('span',{className:'qq-locked'},React.createElement(Icon,{name:'lock-01',size:13}),'100%'):
        React.createElement(InputField,{fieldType:'default',size:'sm',type:'text',value:draftValue===null||draftValue===undefined?'':String(draftValue),placeholder:'0-100',onChange:v=>onChange(v.replace(/[^0-9]/g,'')),error})
    ),
    React.createElement('td',{className:'qq-weight-cell'},(activity.weight*(locked?100:(Number(draftValue)||0))/100).toFixed(2))
  );
}

function QqReportForm({process,quarter,onSaved}){
  const existing=window.QQ_STORE.get(window.QIR_QUARTERLY_YEAR,process.key,quarter.key);
  const [values,setValues]=React.useState(()=>{
    const init={};
    process.activities.forEach(a=>{
      const locked=window.qqIsLocked(a,quarter.index);
      init[a.id]=existing?existing.values[a.id]:(locked?100:'');
    });
    return init;
  });
  const [narrative,setNarrative]=React.useState(existing?existing.narrative:'');
  const [eff,setEff]=React.useState(existing&&existing.effectiveness?existing.effectiveness:{before:'',after:'',gain:''});
  const [errors,setErrors]=React.useState({});
  const isQ4=quarter.key==='q4';
  const submitted=existing&&existing.status==='submitted';

  function setVal(id,v){setValues(s=>({...s,[id]:v}));}
  function total(){return Math.round(process.activities.reduce((s,a)=>{
    const locked=window.qqIsLocked(a,quarter.index);
    const v=locked?100:Number(values[a.id]||0);
    return s+a.weight*v/100;
  },0));}
  function validate(){
    const errs={};
    process.activities.forEach(a=>{
      const locked=window.qqIsLocked(a,quarter.index);
      if(locked)return;
      const v=values[a.id];
      const prev=window.qqValueAt(a,quarter.index-1);
      if(v===''||v===null||v===undefined||isNaN(Number(v)))errs[a.id]='กรอกตัวเลข 0-100';
      else if(Number(v)>100)errs[a.id]='ต้องไม่เกิน 100';
      else if(Number(v)<prev)errs[a.id]='ต้องไม่ต่ำกว่าไตรมาสก่อน ('+prev+'%)';
    });
    if(!narrative.trim())errs.narrative='กรุณาระบุรายละเอียดผลการดำเนินงาน';
    if(isQ4&&(!eff.before.trim()||!eff.after.trim()||eff.gain===''))errs.eff='กรุณากรอกข้อมูลประสิทธิผลให้ครบ (เฉพาะไตรมาส 4)';
    return errs;
  }
  function save(status){
    const errs=status==='submitted'?validate():{};
    if(Object.keys(errs).length>0){setErrors(errs);return;}
    setErrors({});
    const record={
      status,values,narrative,effectiveness:isQ4?eff:null,
      reportedBy:window.LF_CURRENT_USER?window.LF_CURRENT_USER.name:'-',
      reportedAt:window.qqNow(),
      approvedBy:existing?existing.approvedBy:null,approvedAt:existing?existing.approvedAt:null
    };
    window.QQ_STORE.save(window.QIR_QUARTERLY_YEAR,process.key,quarter.key,record);
    onSaved(status);
  }

  return React.createElement(React.Fragment,null,
    React.createElement('div',{className:'card qq-form-card'},
      React.createElement('div',{className:'qq-form-head'},
        React.createElement('div',null,
          React.createElement('span',{className:'ba-tag'},process.isOwn?window.QLF_LINE_NAME:process.group),
          React.createElement('h2',{className:'qq-form-title'},process.title)
        ),
        submitted&&React.createElement(Badge,{label:'ส่งรายงานแล้ว',type:'pill-color',color:'success',size:'sm'})
      ),
      React.createElement('div',{className:'qq-table-wrap'},
        React.createElement('table',{className:'ltable qq-table'},
          React.createElement('thead',null,React.createElement('tr',null,
            ['กิจกรรมที่จะดำเนินการ','น้ำหนัก','ไตรมาสก่อน','ไตรมาสนี้ (%)','ร้อยละจริง'].map(h=>React.createElement('th',{key:h},h))
          )),
          React.createElement('tbody',null,
            process.activities.map(a=>React.createElement(QqActivityRow,{key:a.id,activity:a,draftValue:values[a.id],onChange:v=>setVal(a.id,v),error:errors[a.id]}))
          )
        ),
        React.createElement('div',{className:'qq-table-footer'},
          React.createElement('span',null,'รวมน้ำหนัก 100'),
          React.createElement('span',{className:'qq-table-total'},'รวม '+total()+'%')
        )
      ),
      React.createElement(Textarea,{label:'รายละเอียดผลการดำเนินงานไตรมาสนี้',isRequired:true,placeholder:'อธิบายสิ่งที่ดำเนินการในไตรมาสนี้ เช่น วันที่ประชุม หนังสือที่อ้างอิง ผลที่ได้',value:narrative,onChange:setNarrative,error:errors.narrative}),
      isQ4&&React.createElement('div',{className:'qq-eff-box'},
        React.createElement('div',{className:'qq-eff-head'},
          React.createElement(Icon,{name:'trending-up',size:16}),
          'ประสิทธิผลจากการปรับปรุงกระบวนการ',
          React.createElement('span',{className:'qq-eff-hint'},'กรอกเฉพาะไตรมาส 4')
        ),
        React.createElement('div',{className:'qq-eff-grid'},
          React.createElement(InputField,{fieldType:'default',label:'ก่อนปรับปรุง',size:'sm',value:eff.before,onChange:v=>setEff(s=>({...s,before:v}))}),
          React.createElement(InputField,{fieldType:'default',label:'หลังปรับปรุง',size:'sm',value:eff.after,onChange:v=>setEff(s=>({...s,after:v}))}),
          React.createElement(InputField,{fieldType:'default',label:'เพิ่มผลผลิต (ร้อยละ)',size:'sm',type:'text',value:eff.gain,onChange:v=>setEff(s=>({...s,gain:v.replace(/[^0-9.]/g,'')}))})
        ),
        errors.eff&&React.createElement('div',{className:'qq-eff-error'},errors.eff)
      ),
      React.createElement('div',{className:'qq-people-grid'},
        React.createElement('div',{className:'qq-people-card'},
          React.createElement('span',{className:'report-field-label'},React.createElement(Icon,{name:'edit',size:13}),'ผู้สรุป/รายงานผล'),
          React.createElement('div',{className:'qq-people-name'},window.LF_CURRENT_USER?window.LF_CURRENT_USER.name:'-'),
          React.createElement('div',{className:'qq-people-note'},'ระบบบันทึกเวลาเมื่อกดยืนยัน')
        ),
        React.createElement('div',{className:'qq-people-card qq-people-card--pending'},
          React.createElement('span',{className:'report-field-label'},React.createElement(Icon,{name:'check-circle',size:13}),window.QIR_QUARTERLY_APPROVER.position),
          React.createElement('div',{className:'qq-people-name'},window.QIR_QUARTERLY_APPROVER.name),
          React.createElement('div',{className:'qq-people-note qq-people-note--warn'},'รับรองหลังผู้รายงานยืนยัน')
        )
      )
    ),
    React.createElement('div',{className:'qq-form-actions'},
      React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'save-01',size:16}),onClick:()=>save('draft')},'บันทึกร่าง'),
      React.createElement(Button,{variant:'primary',size:'md',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>save('submitted')},'ยืนยันการรายงาน')
    )
  );
}

function QqForm({processes,currentQuarter}){
  const [activeKey,setActiveKey]=React.useState(processes[0]&&processes[0].key);
  const [toast,setToast]=React.useState(null);
  const active=processes.find(p=>p.key===activeKey)||null;
  function isDone(p){const r=window.QQ_STORE.get(window.QIR_QUARTERLY_YEAR,p.key,currentQuarter.key);return !!(r&&r.status==='submitted');}
  const pending=processes.filter(p=>!isDone(p));
  const done=processes.filter(p=>isDone(p));
  return React.createElement('div',{className:'report-layout qq-report-layout'},
    React.createElement('div',{className:'sidebar-col'},
      React.createElement('div',{className:'card sidebar-card'},
        React.createElement('div',{className:'sidebar-card-head'},
          React.createElement('div',{className:'sidebar-card-title'},'ต้องรายงานไตรมาสนี้ ',React.createElement('span',{className:'sidebar-count-badge'},pending.length))
        ),
        React.createElement('div',{className:'sidebar-list'},
          pending.map(p=>React.createElement(QqProcessListItem,{key:p.key,process:p,active:p.key===activeKey,done:false,onSelect:()=>setActiveKey(p.key)}))
        )
      ),
      done.length>0&&React.createElement('div',{className:'card sidebar-card sidebar-card--submitted'},
        React.createElement('div',{className:'sidebar-card-head'},
          React.createElement('div',{className:'sidebar-card-title'},'รายงานแล้ว ',React.createElement('span',{className:'sidebar-count-badge sidebar-count-badge--muted'},done.length))
        ),
        React.createElement('div',{className:'sidebar-list'},
          done.map(p=>React.createElement(QqProcessListItem,{key:p.key,process:p,active:p.key===activeKey,done:true,onSelect:()=>setActiveKey(p.key)}))
        )
      )
    ),
    React.createElement('div',{className:'panel-col'},
      active?React.createElement(QqReportForm,{key:active.key+currentQuarter.key,process:active,quarter:currentQuarter,onSaved:status=>{
        setToast(status==='submitted'?'ยืนยันการรายงานเรียบร้อยแล้ว':'บันทึกร่างเรียบร้อยแล้ว');
      }}):React.createElement('div',{className:'card panel-card panel-empty'},
        React.createElement(Icon,{name:'check-circle',size:28}),
        React.createElement('div',{className:'panel-empty-title'},'ไม่มี QIR ที่ต้องรายงานในไตรมาสนี้')
      )
    ),
    toast&&React.createElement('div',{className:'ltoast'},React.createElement(Icon,{name:'check-circle',size:16}),toast)
  );
}

function App(){
  const [tab,setTab]=React.useState(()=>{
    const q=new URLSearchParams(window.location.search).get('tab');
    return q==='fm'?'fm':'ov';
  });
  const processes=window.qqBuildProcesses();
  const quarters=window.QIR_QUARTERLY_QUARTERS;
  const currentQuarter=quarters.find(q=>q.isCurrent)||quarters[quarters.length-1];
  return React.createElement(React.Fragment,null,
    React.createElement(window.PageHeader,{maxWidth:'1240px',
      backHref:'/qir-line-overview',
      breadcrumb:[{label:'หน้าหลัก',href:'/'},{label:'ภาพรวม QIR สายงาน',href:'/qir-line-overview'},{label:'รายงานผล QIR รายไตรมาส'}],
      title:'รายงานผล QIR รายไตรมาส ประจำปี '+window.QIR_QUARTERLY_YEAR,
      actions:React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'download',size:16}),onClick:()=>window.qqExportExcel(processes,quarters)},'Export Excel'),
      subtitle:React.createElement(React.Fragment,null,
        React.createElement('p',{style:{margin:0}},'ติดตามความคืบหน้ารายไตรมาสของ QIR ที่ '+window.QLF_LINE_NAME+' คัดเลือกไว้'),
        React.createElement('p',{style:{margin:'2px 0 0'}},'รอบปัจจุบัน: '+currentQuarter.label+' ('+currentQuarter.range+')')
      ),
      tabs:React.createElement(QqTabs,{active:tab,setActive:setTab})
    }),
    React.createElement('main',{className:'qq-content'},
      tab==='ov'?React.createElement(QqOverview,{processes,quarters}):React.createElement(QqForm,{processes,currentQuarter})
    )
  );
}

export default App;
