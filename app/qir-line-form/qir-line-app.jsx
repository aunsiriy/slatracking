const {Button,Badge,InputField,Checkbox}=window.DesignSystem_cbd181;
const {qlfProcessLabel}=window;
const QLF_STEPS=['คัดเลือก QIR ของฝ่าย','สรุปและยืนยัน'];

function HistoryCard({history}){
  const [desc,setDesc]=React.useState(true);
  const base=history||[];
  const items=desc?base.slice().reverse():base.slice();
  return React.createElement('div',{className:'card lsection'},
    React.createElement('div',{className:'lsection-head'},
      React.createElement('div',null,
        React.createElement('h3',null,'ประวัติการดำเนินการ'),
        React.createElement('p',{className:'lsection-hint'},'บันทึกวันที่ที่มีการส่งและแก้ไขผลการคัดเลือก')
      )
    ),
    items.length
      ?React.createElement('div',{className:'qlf-htable-wrap'},
        React.createElement('table',{className:'qlf-htable'},
          React.createElement('thead',null,
            React.createElement('tr',null,
              React.createElement('th',null,
                React.createElement('button',{type:'button',className:'qlf-hsort',onClick:()=>setDesc(!desc)},
                  'วันที่ / เวลา',React.createElement(Icon,{name:'switch-vertical-01',size:14})
                )
              ),
              React.createElement('th',null,'ผู้ดำเนินการ'),
              React.createElement('th',null,'ตำแหน่ง/สังกัด'),
              React.createElement('th',null,'รายละเอียด')
            )
          ),
          React.createElement('tbody',null,
            items.map((h,i)=>React.createElement('tr',{key:i},
              React.createElement('td',null,h.at),
              React.createElement('td',null,h.by||'-'),
              React.createElement('td',null,h.role||'-'),
              React.createElement('td',null,h.action)
            ))
          )
        )
      )
      :React.createElement('div',{className:'qlf-empty'},'ยังไม่มีประวัติ')
  );
}

function SectionCard({title,hint,action,children}){
  return React.createElement('div',{className:'card lsection'},
    React.createElement('div',{className:'lsection-head'},
      React.createElement('div',null,
        React.createElement('h3',null,title),
        hint&&React.createElement('p',{className:'lsection-hint'},hint)
      ),
      action
    ),
    children
  );
}

function Stepper({step,setStep}){
  return React.createElement('div',{className:'qlf-vstepper'},
    QLF_STEPS.map((label,i)=>React.createElement('button',{
      key:label,type:'button',
      className:'qlf-vstep'+(i===step?' is-active':'')+(i<step?' is-done':''),
      onClick:()=>{if(i<step)setStep(i);}},
      React.createElement('span',{className:'qlf-vstep-num'},i<step?React.createElement(Icon,{name:'check',size:13}):i+1),
      React.createElement('span',{className:'qlf-vstep-label'},label)
    ))
  );
}

function ProposalCard({proposal,selectable,checked,onToggle}){
  const total=proposal.activities.reduce((s,a)=>s+(Number(a.weight)||0),0);
  return React.createElement('div',{className:'qlf-prop-card'+(selectable&&checked?' is-selected':'')},
    React.createElement('div',{className:'qlf-dept-info'},
      selectable&&React.createElement('span',{className:'qlf-prop-check'},React.createElement(Checkbox,{size:'sm',isChecked:!!checked,onChange:onToggle})),
      React.createElement('div',{className:'qlf-dept-info-items'},
        React.createElement('div',{className:'qlf-dept-info-item'},
          React.createElement('span',{className:'qlf-dept-info-label'},'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)'),
          React.createElement('span',{className:'qlf-dept-info-value'},proposal.proposal)
        ),
        React.createElement('div',{className:'qlf-dept-info-item'},
          React.createElement('span',{className:'qlf-dept-info-label'},'สอดคล้องกับกระบวนการ'),
          React.createElement('span',{className:'qlf-dept-info-value'},qlfProcessLabel(proposal.processKey))
        )
      )
    ),
    React.createElement('table',{className:'ltable'},
      React.createElement('thead',null,React.createElement('tr',null,['รายการ','กิจกรรมที่จะดำเนินการ','น้ำหนัก'].map((h,i)=>React.createElement('th',{key:i},h)))),
      React.createElement('tbody',null,proposal.activities.map((a,i)=>React.createElement('tr',{key:i},
        React.createElement('td',null,i+1),
        React.createElement('td',null,a.name),
        React.createElement('td',{className:'lqir-weight'},a.weight)
      )))
    ),
    React.createElement('div',{className:'qlf-dept-foot'},
      React.createElement('span',null,'น้ำหนักรวม'),
      React.createElement('span',{className:'lqir-total'},total)
    )
  );
}

function DeptBlock({dept,proposals,selectable,selectedIds,onToggle}){
  return React.createElement('div',{className:'qlf-dept-block'},
    React.createElement('div',{className:'qlf-dept-block-head'},
      React.createElement('span',{className:'qlf-dept-block-icon'},React.createElement(Icon,{name:'building',size:18})),
      React.createElement('span',{className:'qlf-dept-name'},dept),
      React.createElement('span',{className:'qlf-dept-block-count'},proposals.length+' ข้อเสนอ')
    ),
    React.createElement('div',{className:'qlf-prop-list'},
      proposals.map(p=>React.createElement(ProposalCard,{
        key:p.id,proposal:p,selectable,
        checked:selectedIds?selectedIds.includes(p.id):false,
        onToggle:onToggle?()=>onToggle(p.id):undefined
      }))
    )
  );
}

function QirGroupList({qirGroups,setGroupProposal,setGroupProcess,updateQir,addQirRow,removeQirRow,duplicateGroup,removeGroup}){
  return qirGroups.map((g,gi)=>{
    const qirTotal=g.rows.reduce((s,r)=>s+(Number(r.weight)||0),0);
    return React.createElement('div',{key:g.id,className:'lqir-group'},
      React.createElement('div',{className:'lqir-group-toolbar'},
        React.createElement('span',{className:'lqir-group-name'},'กลุ่ม QIR ที่ '+(gi+1)),
        React.createElement('div',{className:'lqir-group-actions'},
          React.createElement(Button,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'copy-01',size:14}),onClick:()=>duplicateGroup(g.id)},'ทำซ้ำกลุ่มนี้'),
          React.createElement(Button,{variant:'tertiary',size:'sm',className:'lqir-btn-danger',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>removeGroup(g.id)},'ลบกลุ่ม')
        )
      ),
      React.createElement('div',{className:'lqir-group-head'},
        React.createElement('div',{className:'lqir-group-selects lqir-group-selects--stack'},
          React.createElement('div',{className:'lqir-group-select'},
            React.createElement('span',{className:'lfield-label'},'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)'),
            React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:'ระบุข้อเสนอโอกาสในการปรับปรุงกระบวนการ',value:g.proposal||'',onChange:v=>setGroupProposal(g.id,v)})
          ),
          React.createElement('div',{className:'lqir-group-select'},
            React.createElement('span',{className:'lfield-label'},'สอดคล้องกับกระบวนการ'),
            React.createElement(window.SelectMenu,{value:g.processKey,onChange:v=>setGroupProcess(g.id,v),options:window.LF_BA_PROCESS_OPTIONS.map(o=>({value:o.key,label:o.label}))})
          )
        )
      ),
      React.createElement('table',{className:'ltable'},
        React.createElement('thead',null,React.createElement('tr',null,['รายการ','กิจกรรมที่จะดำเนินการ','น้ำหนัก',''].map((h,i)=>React.createElement('th',{key:i},h)))),
        React.createElement('tbody',null,g.rows.map((r,i)=>React.createElement('tr',{key:r.id},
          React.createElement('td',null,i+1),
          React.createElement('td',null,React.createElement(InputField,{fieldType:'default',size:'sm',value:r.activity,onChange:v=>updateQir(g.id,r.id,'activity',v)})),
          React.createElement('td',{className:'lqir-weight'},React.createElement(InputField,{fieldType:'default',size:'sm',value:String(r.weight),onChange:v=>updateQir(g.id,r.id,'weight',v.replace(/[^0-9]/g,''))})),
          React.createElement('td',null,
            React.createElement('button',{className:'lqir-remove',onClick:()=>removeQirRow(g.id,r.id)},React.createElement(Icon,{name:'x',size:15}))
          )
        )))
      ),
      React.createElement(Button,{variant:'tertiary',size:'sm',className:'lfc-btn-purple',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>addQirRow(g.id)},'เพิ่มกิจกรรม'),
      React.createElement('div',{className:'lqir-footer'},
        React.createElement('span',null,'Info :: น้ำหนักรวมกัน ไม่เกิน 100'),
        React.createElement('div',{className:'lqir-total-status'},
          React.createElement('span',{className:'lqir-total'},qirTotal),
          React.createElement('span',{className:'lqir-status-inline'+(qirTotal===100?' is-ok':' is-error')},
            React.createElement(Icon,{name:qirTotal===100?'check':'alert-triangle',size:14}),
            qirTotal===100?'น้ำหนักรวมครบ 100':qirTotal>100?'กรุณาปรับแก้':'ยังไม่ครบ'
          )
        )
      )
    );
  });
}

function SelectStep({scopeName,scopeLabel,submissions,selectedIds,setSelectedIds,onNext,onCancel}){
  function toggle(id){setSelectedIds(selectedIds.includes(id)?selectedIds.filter(x=>x!==id):[...selectedIds,id]);}
  return React.createElement(React.Fragment,null,
    React.createElement(SectionCard,{
      title:'QIR ของฝ่ายภายใต้ '+scopeName,
      hint:'เลือกข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR) ของแต่ละฝ่ายที่จะนำเข้าสู่การพิจารณาระดับ'+scopeLabel},
      React.createElement('div',{className:'qlf-dept-list'},
        submissions.map(sub=>React.createElement(DeptBlock,{key:sub.id,dept:sub.dept,proposals:sub.proposals,selectable:true,selectedIds,onToggle:toggle}))
      )
    ),
    React.createElement('div',{className:'qlf-actions'},
      React.createElement('span',{className:'qlf-count'},'เลือกแล้ว '+selectedIds.length+' ข้อเสนอ'),
      React.createElement(Button,{variant:'secondary',size:'md',onClick:onCancel},'ยกเลิก'),
      React.createElement(Button,{variant:'primary',size:'md',isDisabled:selectedIds.length===0,trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:onNext},'ถัดไป')
    )
  );
}

function ConfirmStep({scopeLabel,selectedGroups,selectedCount,qirGroups,groupHandlers,addGroup,onBack,onSave,saveDisabled,saveLabel}){
  return React.createElement(React.Fragment,null,
    React.createElement('div',{className:'qlf-confirm-sections'},
      React.createElement(SectionCard,{
        title:'QIR ของ'+scopeLabel+' (เพิ่มโดยผู้คัดเลือก)',
        hint:'ผู้คัดเลือก'+scopeLabel+'สามารถเพิ่มกิจกรรม QIR ในระดับ'+scopeLabel+'ได้ที่นี่ — จะใส่หรือไม่ใส่ก็ได้ (ไม่บังคับ)',
        action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addGroup},'เพิ่ม QIR')},
        qirGroups.length>0
          ?React.createElement(QirGroupList,Object.assign({qirGroups},groupHandlers))
          :React.createElement('div',{className:'qlf-empty'},'ยังไม่มี QIR ของสายงาน — จะเพิ่มหรือไม่ก็ได้ หากต้องการเพิ่ม กด "เพิ่ม QIR" เพื่อเพิ่มกิจกรรมของคุณเอง')
      ),
      React.createElement(SectionCard,{
        title:'QIR ของฝ่ายที่คัดเลือก ('+selectedCount+')',
        hint:'ข้อมูล QIR ของฝ่ายที่คัดเลือกมาไม่สามารถแก้ไขได้'},
        selectedGroups.length>0
          ?React.createElement('div',{className:'qlf-dept-list'},
              selectedGroups.map(grp=>React.createElement(DeptBlock,{key:grp.id,dept:grp.dept,proposals:grp.proposals}))
            )
          :React.createElement('div',{className:'qlf-empty'},'ยังไม่ได้เลือกข้อเสนอ QIR ของฝ่ายใด')
      )
    ),
    React.createElement('div',{className:'qlf-actions'},
      React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'chevron-left',size:16}),onClick:onBack},'ย้อนกลับ'),
      React.createElement(Button,{variant:'primary',size:'md',isDisabled:saveDisabled,leadingIcon:React.createElement(Icon,{name:'check',size:16}),onClick:onSave},saveLabel||'บันทึกผล')
    )
  );
}

function ConfirmSaveModal({onCancel,onConfirm,title,text}){
  return React.createElement('div',{className:'qlf-modal-overlay',onClick:onCancel},
    React.createElement('div',{className:'qlf-modal',onClick:e=>e.stopPropagation()},
      React.createElement('span',{className:'qlf-modal-icon'},React.createElement(Icon,{name:'check-circle',size:26})),
      React.createElement('h3',{className:'qlf-modal-title'},title||'ยืนยันบันทึกผลการคัดเลือก'),
      React.createElement('p',{className:'qlf-modal-text'},text||'คุณได้ทำการคัดเลือก QIR ของสายงานประจำปีนี้เรียบร้อยแล้ว ระบบจะบันทึกผลและส่งเข้าสู่การพิจารณาระดับสายงาน — สามารถกลับมาแก้ไขได้ภายหลัง'),
      React.createElement('div',{className:'qlf-modal-foot'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onCancel},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',onClick:onConfirm},'ยืนยัน')
      )
    )
  );
}

function OwnQirReadOnly({qirGroups}){
  return React.createElement('div',{className:'qlf-dept-block'},
    React.createElement('div',{className:'qlf-prop-list'},
      qirGroups.map((g,gi)=>{
        const total=g.rows.reduce((s,r)=>s+(Number(r.weight)||0),0);
        return React.createElement('div',{key:g.id,className:'qlf-prop-card'},
          qirGroups.length>1&&React.createElement('span',{className:'qlf-prop-card-tag'},
            React.createElement(Icon,{name:'flag-01',size:13}),'กลุ่ม QIR ที่ '+(gi+1)
          ),
          React.createElement('div',{className:'qlf-dept-info'},
            React.createElement('div',{className:'qlf-dept-info-items'},
              React.createElement('div',{className:'qlf-dept-info-item'},
                React.createElement('span',{className:'qlf-dept-info-label'},'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)'),
                React.createElement('span',{className:'qlf-dept-info-value'},g.proposal||'-')
              ),
              React.createElement('div',{className:'qlf-dept-info-item'},
                React.createElement('span',{className:'qlf-dept-info-label'},'สอดคล้องกับกระบวนการ'),
                React.createElement('span',{className:'qlf-dept-info-value'},qlfProcessLabel(g.processKey))
              )
            )
          ),
          React.createElement('table',{className:'ltable'},
            React.createElement('thead',null,React.createElement('tr',null,['รายการ','กิจกรรมที่จะดำเนินการ','น้ำหนัก'].map((h,i)=>React.createElement('th',{key:i},h)))),
            React.createElement('tbody',null,g.rows.map((r,i)=>React.createElement('tr',{key:r.id||i},
              React.createElement('td',null,i+1),
              React.createElement('td',null,r.activity),
              React.createElement('td',{className:'lqir-weight'},r.weight)
            )))
          ),
          React.createElement('div',{className:'qlf-dept-foot'},
            React.createElement('span',null,'น้ำหนักรวม'),
            React.createElement('span',{className:'lqir-total'},total)
          )
        );
      })
    )
  );
}

function ViewTabs({active,setActive}){
  const tabs=[
    {key:'detail',label:'รายละเอียดผลการคัดเลือก',icon:'clipboard-check'},
    {key:'history',label:'ประวัติการดำเนินการ',icon:'clock-rewind'}
  ];
  return React.createElement('nav',{className:'qlf-view-tabs'},
    tabs.map(t=>React.createElement('button',{
      key:t.key,type:'button',
      className:'qlf-view-tab'+(active===t.key?' is-active':''),
      onClick:()=>setActive(t.key)},React.createElement(Icon,{name:t.icon,size:18}),t.label))
  );
}

function ViewMode({tab,stored,selectedGroups}){
  return React.createElement(React.Fragment,null,
    tab==='detail'
      ?React.createElement('div',{className:'qlf-confirm-sections'},
          React.createElement(SectionCard,{
            title:'QIR ของสายงาน (เพิ่มโดยผู้คัดเลือก)',
            hint:'ข้อมูลนี้อยู่ในสถานะส่งคัดเลือกแล้ว — กด "แก้ไข" เพื่อปรับปรุง'},
            (stored.ownGroups&&stored.ownGroups.length>0)
              ?React.createElement(OwnQirReadOnly,{qirGroups:stored.ownGroups})
              :React.createElement('div',{className:'qlf-empty'},'ไม่มี QIR ของสายงานที่เพิ่มเอง')
          ),
          React.createElement(SectionCard,{
            title:'QIR ของฝ่ายที่คัดเลือก ('+(stored.selectedIds||[]).length+')',
            hint:'ข้อเสนอ QIR ของฝ่ายที่สายงานคัดเลือกไว้'},
            selectedGroups.length>0
              ?React.createElement('div',{className:'qlf-dept-list'},
                  selectedGroups.map(grp=>React.createElement(DeptBlock,{key:grp.id,dept:grp.dept,proposals:grp.proposals}))
                )
              :React.createElement('div',{className:'qlf-empty'},'ไม่ได้เลือกข้อเสนอ QIR ของฝ่ายใด')
          )
        )
      :React.createElement(HistoryCard,{history:stored.history})
  );
}

const QLF_PARAMS=(typeof window!=='undefined')?new URLSearchParams(window.location.search):new URLSearchParams();
const QLF_YEAR=QLF_PARAMS.get('year')||'2569';
const QLF_SCOPE=QLF_PARAMS.get('scope')==='zone'?'zone':'line';
const QLF_SCOPE_DEF=(typeof window!=='undefined'&&window.QLF_SCOPES)?window.QLF_SCOPES[QLF_SCOPE]:{label:'สายงาน',name:'',submissions:[]};
const QLF_OVERVIEW_HREF='/qir-line-overview?scope='+QLF_SCOPE;
const QLF_STORED=(typeof window!=='undefined'&&window.QLF_STORE)?window.QLF_STORE.get(QLF_YEAR,QLF_SCOPE):null;
const QLF_WANT_VIEW=QLF_PARAMS.get('mode')==='view'&&!!QLF_STORED;

function App(){
  const [editing,setEditing]=React.useState(false);
  const viewMode=QLF_WANT_VIEW&&!editing;
  const isEdit=QLF_WANT_VIEW&&editing;
  const [step,setStep]=React.useState(0);
  React.useEffect(()=>{window.scrollTo({top:0,behavior:'auto'});},[step,editing]);
  const [selectedIds,setSelectedIds]=React.useState(()=>QLF_STORED?(QLF_STORED.selectedIds||[]).slice():[]);
  const [qirGroups,setQirGroups]=React.useState(()=>QLF_STORED?JSON.parse(JSON.stringify(QLF_STORED.ownGroups||[])):[]);
  const [confirmOpen,setConfirmOpen]=React.useState(false);
  const [saveToast,setSaveToast]=React.useState(false);
  const [viewTab,setViewTab]=React.useState('detail');
  function setGroupProposal(gid,text){setQirGroups(qirGroups.map(g=>g.id===gid?{...g,proposal:text}:g));}
  function setGroupProcess(gid,key){setQirGroups(qirGroups.map(g=>g.id===gid?{...g,processKey:key}:g));}
  function updateQir(gid,rid,field,value){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.map(r=>r.id===rid?{...r,[field]:value}:r)}));}
  function addQirRow(gid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:[...g.rows,{id:Date.now(),activity:'',weight:0,saved:false}]}));}
  function removeQirRow(gid,rid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.filter(r=>r.id!==rid)}));}
  function addGroup(){setQirGroups([...qirGroups,{id:Date.now(),proposal:'',processKey:window.LF_BA_PROCESS_OPTIONS[0].key,rows:[{id:Date.now()+1,activity:'',weight:0,saved:false}]}]);}
  function duplicateGroup(gid){
    const g=qirGroups.find(x=>x.id===gid);
    if(!g)return;
    const idx=qirGroups.findIndex(x=>x.id===gid);
    const copy={id:Date.now(),proposal:g.proposal,processKey:g.processKey,rows:g.rows.map((r,i)=>({...r,id:Date.now()+i+1,saved:false}))};
    const next=[...qirGroups];
    next.splice(idx+1,0,copy);
    setQirGroups(next);
  }
  function removeGroup(gid){setQirGroups(qirGroups.filter(g=>g.id!==gid));}
  const groupHandlers={setGroupProposal,setGroupProcess,updateQir,addQirRow,removeQirRow,duplicateGroup,removeGroup};
  const scopeLabel=QLF_SCOPE_DEF.label;
  const selectedGroups=QLF_SCOPE_DEF.submissions
    .map(s=>({id:s.id,dept:s.dept,proposals:s.proposals.filter(p=>selectedIds.includes(p.id))}))
    .filter(s=>s.proposals.length>0);
  const ownIncomplete=qirGroups.some(g=>g.rows.reduce((s,r)=>s+(Number(r.weight)||0),0)!==100);
  function handleSave(){setConfirmOpen(true);}
  function confirmSave(){
    setConfirmOpen(false);
    if(window.QLF_STORE)window.QLF_STORE.save(QLF_YEAR,{selectedIds,ownGroups:qirGroups},isEdit,QLF_SCOPE);
    setSaveToast(true);
    setTimeout(()=>{window.location.href=QLF_OVERVIEW_HREF;},1500);
  }
  function cancelWizard(){
    if(isEdit){setEditing(false);setStep(0);}
    else window.location.href=QLF_OVERVIEW_HREF;
  }
  const headText=viewMode
    ?'รายละเอียดผลการคัดเลือก QIR ของ'+scopeLabel+'ประจำปี '+QLF_YEAR
    :(isEdit?'แก้ไขผลการคัดเลือก QIR ของ'+scopeLabel+'ประจำปี '+QLF_YEAR:'คัดเลือก QIR ของฝ่ายภายใต้'+scopeLabel+' แล้วสรุปยืนยันผลการคัดเลือก');
  const headerTitle=React.createElement(React.Fragment,null,
    'QIR '+scopeLabel+' · ประจำปี '+QLF_YEAR,
    (viewMode||isEdit)&&React.createElement('span',{style:{marginLeft:'16px'}},React.createElement(Badge,{label:'ส่งคัดเลือกแล้ว',type:'pill-color',color:'success',size:'sm'}))
  );
  const headerSubtitle=React.createElement(React.Fragment,null,
    React.createElement('p',{style:{margin:0}},headText),
    QLF_STORED&&React.createElement('p',{className:'qlf-head-meta'},
      'ส่งเมื่อ '+QLF_STORED.submittedAt+(QLF_STORED.lastEditedAt?' · แก้ไขล่าสุด '+QLF_STORED.lastEditedAt:'')
    )
  );
  const headerActions=viewMode&&React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'edit',size:16}),onClick:()=>{setEditing(true);setStep(1);}},'แก้ไข');
  return React.createElement(React.Fragment,null,
    React.createElement(window.PageHeader,{
      backHref:QLF_OVERVIEW_HREF,
      avatarText:'สด',
      breadcrumb:[{label:'หน้าหลัก',href:'/'},{label:'ภาพรวม QIR '+scopeLabel,href:QLF_OVERVIEW_HREF},{label:viewMode?'รายละเอียด QIR '+scopeLabel:(isEdit?'แก้ไข QIR '+scopeLabel:'คัดเลือก QIR '+scopeLabel)}],
      title:headerTitle,
      actions:headerActions,
      subtitle:headerSubtitle,
      tabs:viewMode?React.createElement(ViewTabs,{active:viewTab,setActive:setViewTab}):null
    }),
    React.createElement('main',{className:'lfcontent'},
      isEdit&&React.createElement('div',{className:'qlf-edit-banner'},
        React.createElement(Icon,{name:'alert-triangle',size:16}),
        React.createElement('span',null,'กำลังแก้ไขผลการคัดเลือกที่ส่งแล้ว — เมื่อบันทึก ระบบจะบันทึกวันที่แก้ไขไว้ในประวัติ'),
        React.createElement(Button,{variant:'tertiary',size:'sm',onClick:()=>{setEditing(false);setStep(0);}},'ยกเลิกการแก้ไข')
      ),
      viewMode
        ?React.createElement(ViewMode,{tab:viewTab,stored:QLF_STORED,selectedGroups})
        :React.createElement('div',{className:'qlf-layout'},
            React.createElement(Stepper,{step,setStep}),
            React.createElement('div',{className:'qlf-main'},
              step===0
                ?React.createElement(SelectStep,{scopeName:QLF_SCOPE_DEF.name,scopeLabel,submissions:QLF_SCOPE_DEF.submissions,selectedIds,setSelectedIds,onNext:()=>setStep(1),onCancel:cancelWizard})
                :React.createElement(ConfirmStep,{scopeLabel,selectedGroups,selectedCount:selectedIds.length,qirGroups,groupHandlers,addGroup,onBack:()=>setStep(0),onSave:handleSave,saveDisabled:ownIncomplete,saveLabel:isEdit?'บันทึกการแก้ไข':'บันทึกผล'})
            )
          )
    ),
    confirmOpen&&React.createElement(ConfirmSaveModal,{onCancel:()=>setConfirmOpen(false),onConfirm:confirmSave,
      title:isEdit?'ยืนยันบันทึกการแก้ไข':'ยืนยันบันทึกผลการคัดเลือก',
      text:isEdit
        ?'ระบบจะบันทึกการแก้ไขผลการคัดเลือก QIR ของ'+scopeLabel+'ประจำปี '+QLF_YEAR+' และบันทึกวันที่แก้ไขไว้ในประวัติการดำเนินการ'
        :'คุณได้ทำการคัดเลือก QIR ของ'+scopeLabel+'ประจำปีนี้เรียบร้อยแล้ว ระบบจะบันทึกผลและส่งเข้าสู่การพิจารณาระดับ'+scopeLabel+' — สามารถกลับมาแก้ไขได้ภายหลัง'}),
    saveToast&&React.createElement('div',{className:'ltoast'},React.createElement(Icon,{name:'check-circle',size:16}),isEdit?'บันทึกการแก้ไขเรียบร้อยแล้ว':'บันทึกผลการคัดเลือก QIR เรียบร้อยแล้ว')
  );
}

export default App;
