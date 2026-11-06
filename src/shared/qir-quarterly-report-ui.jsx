const {Button,Badge,InputField,Textarea}=window.DesignSystem_cbd181;

// Shared quarterly-reporting grid + detail modal, used by /qir-line-overview's
// "รายงานรายไตรมาส" tab. Depends on src/shared/qir-quarterly-data.jsx (window.QQ_STORE,
// window.qqBuildProcesses, etc.) being imported first.

// ภาพรวมรายไตรมาส — one row per QIR item the line already selected (own + dept-selected),
// one status cell per quarter. Pulled live from window.qqBuildProcesses() so it always
// matches whatever was confirmed on the selection-detail page. Each cell is the single
// entry point into reporting: a future quarter is inert, the current quarter's cell opens
// the editable form (whether or not anything's been reported yet), and a past quarter's
// cell opens a read-only view of what was submitted.
function QqOverviewCell({process,quarter,onOpen}){
  const rec=window.QQ_STORE.get(window.QIR_QUARTERLY_YEAR,process.key,quarter.key);
  const isCurrent=!!quarter.isCurrent;
  if(!rec&&!isCurrent)return React.createElement('div',{className:'qq-cell qq-cell--future'},
    React.createElement(Icon,{name:'clock',size:14}),'ยังไม่ถึงรอบ'
  );
  if(!rec&&isCurrent)return React.createElement('button',{type:'button',className:'qq-cell qq-cell--todo',onClick:()=>onOpen(process,quarter,'edit')},
    React.createElement(Icon,{name:'edit-05',size:16}),
    React.createElement('span',{className:'qq-cell-todo-text'},'ยังไม่รายงาน'),
    React.createElement('span',{className:'qq-cell-todo-cta'},'กรอกรายงาน ',React.createElement(Icon,{name:'arrow-right',size:12}))
  );
  const total=window.qqProcessTotal(process,quarter.index);
  const approved=!!rec.approvedBy;
  return React.createElement('button',{type:'button',className:'qq-cell',onClick:()=>onOpen(process,quarter,isCurrent?'edit':'view')},
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
function QqOverview({processes,quarters,onOpenCell}){
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
      quarters.map(q=>React.createElement(QqOverviewCell,{key:q.key,process:p,quarter:q,onOpen:onOpenCell}))
    ))
  );
}

function QqFieldStatic({label,value}){
  return React.createElement('div',{className:'qq-static-field'},
    React.createElement('span',{className:'report-field-label'},label),
    React.createElement('div',{className:'qq-static-value'},value||'-')
  );
}

function QqActivityRow({activity,draftValue,onChange,error,quarterIndex,readOnly}){
  const locked=window.qqIsLocked(activity,quarterIndex);
  const prev=quarterIndex>0?window.qqValueAt(activity,quarterIndex-1):null;
  const displayValue=locked?100:(Number(draftValue)||0);
  return React.createElement('tr',null,
    React.createElement('td',null,activity.name),
    React.createElement('td',{className:'qq-weight-cell'},activity.weight),
    React.createElement('td',{className:'qq-weight-cell'},prev===null?'-':prev+'%'),
    React.createElement('td',{className:'qq-value-cell'},
      locked?React.createElement('span',{className:'qq-locked'},React.createElement(Icon,{name:'lock-01',size:13}),'100%'):
      readOnly?React.createElement('span',{className:'qq-readonly-value'},(draftValue===null||draftValue===undefined||draftValue==='')?'-':draftValue+'%'):
        React.createElement(InputField,{fieldType:'default',size:'sm',type:'text',value:draftValue===null||draftValue===undefined?'':String(draftValue),placeholder:'0-100',onChange:v=>onChange(v.replace(/[^0-9]/g,'')),error})
    ),
    React.createElement('td',{className:'qq-weight-cell'},(activity.weight*displayValue/100).toFixed(2))
  );
}

// The report form itself — used both for the current quarter (editable, whether a draft
// already exists or not) and for a past quarter opened read-only from the overview grid.
function QqReportForm({process,quarter,onSaved,onClose,readOnly}){
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
            process.activities.map(a=>React.createElement(QqActivityRow,{key:a.id,activity:a,draftValue:values[a.id],onChange:v=>setVal(a.id,v),error:errors[a.id],quarterIndex:quarter.index,readOnly}))
          )
        ),
        React.createElement('div',{className:'qq-table-footer'},
          React.createElement('span',null,'รวมน้ำหนัก 100'),
          React.createElement('span',{className:'qq-table-total'},'รวม '+total()+'%')
        )
      ),
      readOnly?React.createElement(QqFieldStatic,{label:'รายละเอียดผลการดำเนินงานไตรมาสนี้',value:narrative}):
        React.createElement(Textarea,{label:'รายละเอียดผลการดำเนินงานไตรมาสนี้',isRequired:true,placeholder:'อธิบายสิ่งที่ดำเนินการในไตรมาสนี้ เช่น วันที่ประชุม หนังสือที่อ้างอิง ผลที่ได้',value:narrative,onChange:setNarrative,error:errors.narrative}),
      isQ4&&React.createElement('div',{className:'qq-eff-box'},
        React.createElement('div',{className:'qq-eff-head'},
          React.createElement(Icon,{name:'trending-up',size:16}),
          'ประสิทธิผลจากการปรับปรุงกระบวนการ',
          !readOnly&&React.createElement('span',{className:'qq-eff-hint'},'กรอกเฉพาะไตรมาส 4')
        ),
        readOnly?React.createElement('div',{className:'qq-eff-grid'},
          React.createElement(QqFieldStatic,{label:'ก่อนปรับปรุง',value:eff.before}),
          React.createElement(QqFieldStatic,{label:'หลังปรับปรุง',value:eff.after}),
          React.createElement(QqFieldStatic,{label:'เพิ่มผลผลิต (ร้อยละ)',value:eff.gain&&eff.gain+'%'})
        ):React.createElement('div',{className:'qq-eff-grid'},
          React.createElement(InputField,{fieldType:'default',label:'ก่อนปรับปรุง',size:'sm',value:eff.before,onChange:v=>setEff(s=>({...s,before:v}))}),
          React.createElement(InputField,{fieldType:'default',label:'หลังปรับปรุง',size:'sm',value:eff.after,onChange:v=>setEff(s=>({...s,after:v}))}),
          React.createElement(InputField,{fieldType:'default',label:'เพิ่มผลผลิต (ร้อยละ)',size:'sm',type:'text',value:eff.gain,onChange:v=>setEff(s=>({...s,gain:v.replace(/[^0-9.]/g,'')}))})
        ),
        !readOnly&&errors.eff&&React.createElement('div',{className:'qq-eff-error'},errors.eff)
      ),
      React.createElement('div',{className:'qq-people-grid'},
        React.createElement('div',{className:'qq-people-card'},
          React.createElement('span',{className:'report-field-label'},React.createElement(Icon,{name:'edit',size:13}),'ผู้สรุป/รายงานผล'),
          React.createElement('div',{className:'qq-people-name'},existing?existing.reportedBy:(window.LF_CURRENT_USER?window.LF_CURRENT_USER.name:'-')),
          React.createElement('div',{className:'qq-people-note'},readOnly?'รายงานเมื่อ '+existing.reportedAt:'ระบบบันทึกเวลาเมื่อกดยืนยัน')
        ),
        React.createElement('div',{className:'qq-people-card'+(existing&&existing.approvedBy?'':' qq-people-card--pending')},
          React.createElement('span',{className:'report-field-label'},React.createElement(Icon,{name:'check-circle',size:13}),window.QIR_QUARTERLY_APPROVER.position),
          React.createElement('div',{className:'qq-people-name'},window.QIR_QUARTERLY_APPROVER.name),
          existing&&existing.approvedBy?
            React.createElement('div',{className:'qq-people-note'},'รับรองเมื่อ '+existing.approvedAt):
            React.createElement('div',{className:'qq-people-note qq-people-note--warn'},'รับรองหลังผู้รายงานยืนยัน')
        )
      )
    ),
    React.createElement('div',{className:'qq-form-actions'},
      readOnly?React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ปิด'):
        React.createElement(React.Fragment,null,
          React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'save-01',size:16}),onClick:()=>save('draft')},'บันทึกร่าง'),
          React.createElement(Button,{variant:'primary',size:'md',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>save('submitted')},'ยืนยันการรายงาน')
        )
    )
  );
}

function QqDetailModal({process,quarter,mode,onClose,onSaved}){
  return React.createElement('div',{className:'qq-modal-overlay',onClick:onClose},
    React.createElement('div',{className:'qq-modal-card',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'qq-modal-head'},
        React.createElement('span',{className:'qq-modal-quarter'},quarter.label+' ('+quarter.range+')'),
        React.createElement('button',{type:'button',className:'qq-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      React.createElement('div',{className:'qq-modal-body'},
        React.createElement(QqReportForm,{key:process.key+quarter.key,process,quarter,readOnly:mode==='view',onClose,onSaved})
      )
    )
  );
}

Object.assign(window,{QqOverview,QqDetailModal});
