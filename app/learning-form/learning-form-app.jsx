import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,InputField,Textarea,Radio,Checkbox}=window.DesignSystem_cbd181;

function TopBar(){
  return React.createElement('header',{className:'ltop'},
    React.createElement('div',{className:'ltop-left'},
      React.createElement(Link,{className:'ltop-back',href:'/'},React.createElement(Icon,{name:'corner-up-left',size:16}),'กลับ'),
      React.createElement(Image,{className:'ltop-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
      React.createElement('div',{className:'ltop-word'},
        React.createElement('span',{className:'ltop-title'},'PEA-SLA Tracking System'),
        React.createElement('span',{className:'ltop-sub'},'Learning Form & QIR')
      )
    )
  );
}

function Breadcrumb(){
  return React.createElement('div',{className:'lbreadcrumb'},
    React.createElement(Link,{href:'/'},'หน้าหลัก'),
    React.createElement(Icon,{name:'chevron-right',size:14}),
    React.createElement('span',{className:'is-current'},'Learning Form · '+window.LF_META.processName)
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

function PersonBlock({p}){
  return React.createElement('div',{className:'lperson-block'},
    React.createElement('span',{className:'lperson-role'},p.role),
    React.createElement('span',{className:'lperson-name2'},p.name),
    React.createElement('span',{className:'lperson-meta'},p.position+' · รหัส '+p.empId+' · โทร '+p.tel)
  );
}

function MetaSection(){
  const m=window.LF_META;
  return React.createElement(SectionCard,{title:'ส่วนที่ 0 — ข้อมูลพื้นฐานของกระบวนการ'},
    React.createElement('div',{className:'lmeta-grid'},
      React.createElement('div',{className:'lmeta-field lmeta-field--wide'},
        React.createElement('span',{className:'lfield-label'},'ชื่อกระบวนการ (ตาม BA)'),
        React.createElement('div',{className:'lfield-static'},m.processName)
      ),
      React.createElement('div',{className:'lmeta-field lmeta-field--wide'},
        React.createElement('span',{className:'lfield-label'},'วัตถุประสงค์ของกระบวนการ'),
        React.createElement('div',{className:'lfield-static'},m.objective)
      ),
      React.createElement('div',{className:'lmeta-field'},
        React.createElement('span',{className:'lfield-label'},'หน่วยงานผู้รับผิดชอบ'),
        React.createElement('div',{className:'lfield-static'},m.division)
      )
    ),
    React.createElement('div',{className:'lpeople-grid'},
      React.createElement(PersonBlock,{p:m.recorder}),
      React.createElement(PersonBlock,{p:m.reviewer}),
      React.createElement(PersonBlock,{p:m.approver})
    ),
    m.participants.length>0&&React.createElement('div',{className:'lparticipants'},
      React.createElement('span',{className:'lfield-label'},'ผู้เข้าร่วมจัดทำ'),
      React.createElement('div',{className:'lparticipants-list'},
        m.participants.map((p,i)=>React.createElement('span',{key:i,className:'lparticipant-chip'},p.name+' · '+p.position))
      )
    )
  );
}

function computeStatus(result,target){return null;}

function MetricCard({item,onChange}){
  const [open,setOpen]=React.useState(false);
  function set(field,value){onChange({...item,[field]:value});}
  function toggleFollowup(key){
    const has=item.followup.includes(key);
    set('followup',has?item.followup.filter(k=>k!==key):[...item.followup,key]);
  }
  return React.createElement('div',{className:'card lmetric-card'},
    React.createElement('button',{className:'lmetric-head',onClick:()=>setOpen(v=>!v)},
      React.createElement('div',{className:'lmetric-head-main'},
        React.createElement('span',{className:'ba-tag'},item.step),
        React.createElement('span',{className:'lmetric-name'},item.metric)
      ),
      React.createElement(Icon,{name:'chevron-down',size:18,className:'lmetric-chevron'+(open?' is-open':'')})
    ),
    open&&React.createElement('div',{className:'lmetric-body'},
      React.createElement('div',{className:'lmetric-stats'},
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label'},'เป้าหมายปี '+window.LF_META.year),React.createElement('span',{className:'lstat-value'},item.target)),
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label'},'ผล '+window.LF_META.year),React.createElement('span',{className:'lstat-value'},item.result2568)),
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label'},'ผล 2567'),React.createElement('span',{className:'lstat-value'},item.result2567)),
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label'},'ผล 2566'),React.createElement('span',{className:'lstat-value'},item.result2566))
      ),
      React.createElement('div',{className:'lmetric-section'},
        React.createElement('span',{className:'lfield-label'},'ประเด็นพิจารณาผลการดำเนินงาน'),
        React.createElement('div',{className:'lradio-group'},
          window.LF_ANALYSIS_OPTIONS.map(o=>React.createElement('label',{key:o.key,className:'lradio-row'},
            React.createElement('input',{type:'radio',name:'analysis-'+item.id,checked:item.analysis===o.key,onChange:()=>set('analysis',o.key)}),
            o.label
          ))
        )
      ),
      React.createElement('div',{className:'lmetric-section'},
        React.createElement('span',{className:'lfield-label'},'แนวทางที่เกี่ยวข้อง'),
        React.createElement('div',{className:'lcheck-group'},
          window.LF_FOLLOWUP_OPTIONS.map(o=>React.createElement('label',{key:o.key,className:'lcheck-row'},
            React.createElement('input',{type:'checkbox',checked:item.followup.includes(o.key),onChange:()=>toggleFollowup(o.key)}),
            o.label
          ))
        )
      ),
      React.createElement(Textarea,{label:'รายละเอียดการวิเคราะห์',value:item.analysisDetail,onChange:v=>set('analysisDetail',v)}),
      React.createElement(Textarea,{label:'รายละเอียดการพัฒนา/ปรับปรุง',value:item.improvementDetail,onChange:v=>set('improvementDetail',v)})
    )
  );
}

function EffectivenessSection(){
  const [leading,setLeading]=React.useState(window.LF_LEADING_METRICS);
  const [lagging,setLagging]=React.useState(window.LF_LAGGING_METRICS);
  function updateLeading(next){setLeading(leading.map(i=>i.id===next.id?next:i));}
  function updateLagging(next){setLagging(lagging.map(i=>i.id===next.id?next:i));}
  return React.createElement(SectionCard,{title:'ส่วนที่ 2 — ผลการดำเนินงานตามตัวชี้วัด (ย้อนหลัง 3 ปี)',
    hint:'แตะที่รายการเพื่อดูรายละเอียดและกรอกผลการวิเคราะห์'},
    React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิภาพ / ตัวชี้วัดนำ (Leading)'),
    React.createElement('div',{className:'lmetric-list'},leading.map(item=>React.createElement(MetricCard,{key:item.id,item,onChange:updateLeading}))),
    React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิผล / ตัวชี้วัดตาม (Lagging)'),
    React.createElement('div',{className:'lmetric-list'},lagging.map(item=>React.createElement(MetricCard,{key:item.id,item,onChange:updateLagging})))
  );
}

function IssueCard({item,onChange}){
  function set(field,value){onChange({...item,[field]:value});}
  return React.createElement('div',{className:'card lissue-card'},
    React.createElement('div',{className:'lissue-head'},
      React.createElement('span',{className:'lissue-title'},item.title),
      React.createElement('span',{className:'lissue-hint'},item.hint)
    ),
    React.createElement('div',{className:'lissue-body'},
      React.createElement(Textarea,{label:'ผลการวิเคราะห์',value:item.analysis,onChange:v=>set('analysis',v)}),
      React.createElement(Textarea,{label:'แนวทางการพัฒนา/ปรับปรุง',value:item.direction,onChange:v=>set('direction',v)})
    )
  );
}

function IssuesSection(){
  const [issues,setIssues]=React.useState(window.LF_ISSUES);
  function update(next){setIssues(issues.map(i=>i.key===next.key?next:i));}
  return React.createElement(SectionCard,{title:'ส่วนที่ 3 — ประเด็นพิจารณาสำหรับการประเมินและปรับปรุงกระบวนการ'},
    issues.map(item=>React.createElement(IssueCard,{key:item.key,item,onChange:update}))
  );
}

function PrioritiesSection(){
  const [rows,setRows]=React.useState(window.LF_PRIORITIES);
  function update(id,field,value){setRows(rows.map(r=>r.id===id?{...r,[field]:value}:r));}
  function addRow(){setRows([...rows,{id:Date.now(),rank:rows.length+1,direction:'',process:'',method:'',duration:'y1'}]);}
  return React.createElement(SectionCard,{title:'ส่วนที่ 4 — การจัดลำดับความสำคัญของประเด็นการพัฒนา/ปรับปรุง',
    hint:'เลือกระยะเวลาที่สามารถดำเนินการได้ตามความซับซ้อนของการปรับปรุง',
    action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addRow},'เพิ่มลำดับ')},
    rows.map((r,i)=>React.createElement('div',{key:r.id,className:'card lpriority-card'},
      React.createElement('div',{className:'lpriority-rank'},'ลำดับ '+(i+1)),
      React.createElement('div',{className:'lpriority-grid'},
        React.createElement(InputField,{fieldType:'default',label:'แนวทางการพัฒนา/ปรับปรุง',size:'md',value:r.direction,onChange:v=>update(r.id,'direction',v)}),
        React.createElement(InputField,{fieldType:'default',label:'ชื่อกระบวนการที่ปรับปรุง',size:'md',value:r.process,onChange:v=>update(r.id,'process',v)}),
        React.createElement(InputField,{fieldType:'default',label:'วิธีการปรับปรุงการดำเนินงาน',size:'md',value:r.method,onChange:v=>update(r.id,'method',v)})
      ),
      React.createElement('div',{className:'lduration-group'},
        React.createElement('span',{className:'lfield-label'},'ปีที่ดำเนินการ'),
        React.createElement('div',{className:'lduration-options'},
          window.LF_PRIORITY_DURATIONS.map(d=>React.createElement('label',{key:d.key,className:'lduration-option'+(r.duration===d.key?' is-active':'')},
            React.createElement('input',{type:'radio',name:'duration-'+r.id,checked:r.duration===d.key,onChange:()=>update(r.id,'duration',d.key)}),
            React.createElement('div',null,React.createElement('div',{className:'lduration-label'},d.label),React.createElement('div',{className:'lduration-hint'},d.hint))
          ))
        )
      )
    ))
  );
}

function NextYearMetricsSection(){
  return React.createElement(SectionCard,{title:'ส่วนที่ 6 — ตัวชี้วัดและเป้าหมายปีถัดไป',
    action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14})},'เพิ่มตัวชี้วัด')},
    React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิภาพ / ตัวชี้วัดนำ (Leading)'),
    React.createElement('table',{className:'ltable'},
      React.createElement('thead',null,React.createElement('tr',null,['ขั้นตอน','ตัวชี้วัด','เป้าหมายปีถัดไป',''].map((h,i)=>React.createElement('th',{key:i},h)))),
      React.createElement('tbody',null,window.LF_NEXT_LEADING.map(r=>React.createElement('tr',{key:r.id},
        React.createElement('td',null,r.step),React.createElement('td',null,r.metric),React.createElement('td',null,r.target),
        React.createElement('td',null,React.createElement(Button,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'trash',size:14})},'ลบ'))
      )))
    ),
    React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิผล / ตัวชี้วัดตาม (Lagging)'),
    React.createElement('table',{className:'ltable'},
      React.createElement('thead',null,React.createElement('tr',null,['ขั้นตอน','ตัวชี้วัด','เป้าหมายปีถัดไป',''].map((h,i)=>React.createElement('th',{key:i},h)))),
      React.createElement('tbody',null,window.LF_NEXT_LAGGING.map(r=>React.createElement('tr',{key:r.id},
        React.createElement('td',null,r.step),React.createElement('td',null,r.metric),React.createElement('td',null,r.target),
        React.createElement('td',null,React.createElement(Button,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'trash',size:14})},'ลบ'))
      )))
    )
  );
}

function QirActivitiesSection(){
  const [rows,setRows]=React.useState(window.LF_QIR_ACTIVITIES);
  const total=rows.reduce((s,r)=>s+(Number(r.weight)||0),0);
  function update(id,field,value){setRows(rows.map(r=>r.id===id?{...r,[field]:value}:r));}
  function addRow(){setRows([...rows,{id:Date.now(),activity:'',weight:0,saved:false}]);}
  function removeRow(id){setRows(rows.filter(r=>r.id!==id));}
  return React.createElement(SectionCard,{title:'QIR — บันทึกกิจกรรมที่จะดำเนินการ',hint:'ผลรวมน้ำหนักของทุกกิจกรรมต้องเท่ากับ 100',
    action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addRow},'เพิ่มกิจกรรมที่จะดำเนินการ')},
    React.createElement('table',{className:'ltable'},
      React.createElement('thead',null,React.createElement('tr',null,['รายการ','กิจกรรมที่จะดำเนินการ','น้ำหนัก',''].map((h,i)=>React.createElement('th',{key:i},h)))),
      React.createElement('tbody',null,rows.map((r,i)=>React.createElement('tr',{key:r.id},
        React.createElement('td',null,i+1),
        React.createElement('td',null,React.createElement(InputField,{fieldType:'default',size:'sm',value:r.activity,onChange:v=>update(r.id,'activity',v)})),
        React.createElement('td',{className:'lqir-weight'},React.createElement(InputField,{fieldType:'default',size:'sm',value:String(r.weight),onChange:v=>update(r.id,'weight',v.replace(/[^0-9]/g,''))})),
        React.createElement('td',null,
          React.createElement(Button,{variant:'secondary',size:'sm',onClick:()=>update(r.id,'saved',true)},'บันทึก'),
          React.createElement('button',{className:'lqir-remove',onClick:()=>removeRow(r.id)},React.createElement(Icon,{name:'x',size:15}))
        )
      )))
    ),
    React.createElement('div',{className:'lqir-footer'},
      React.createElement('span',null,'Info :: น้ำหนักรวมกัน ไม่เกิน 100'),
      React.createElement('span',{className:'lqir-total'},total)
    ),
    React.createElement('div',{className:'lqir-status'+(total===100?' is-ok':total>100?' is-error':'')},
      React.createElement(Icon,{name:total===100?'check':'alert-triangle',size:14}),
      total===100?'น้ำหนักรวมครบ 100 — สามารถบันทึกได้':total>100?'น้ำหนักรวมเกิน 100 — กรุณาปรับแก้':'น้ำหนักรวมยังไม่ครบ 100'
    )
  );
}

function KnowledgeCard({item,onChange}){
  function set(field,value){onChange({...item,[field]:value});}
  return React.createElement('div',{className:'card lknowledge-card'},
    React.createElement('div',{className:'lknowledge-type'},
      React.createElement('label',{className:'lradio-row'},React.createElement('input',{type:'radio',name:'ktype-'+item.id,checked:item.type==='existing',onChange:()=>set('type','existing')}),'องค์ความรู้เดิม (จากระบบ KM-Si)'),
      React.createElement('label',{className:'lradio-row'},React.createElement('input',{type:'radio',name:'ktype-'+item.id,checked:item.type==='new',onChange:()=>set('type','new')}),'องค์ความรู้ใหม่')
    ),
    React.createElement('div',{className:'lknowledge-grid'},
      React.createElement(InputField,{fieldType:'default',label:'หัวข้อองค์ความรู้',size:'md',value:item.topic,onChange:v=>set('topic',v)}),
      item.type==='existing'&&React.createElement(InputField,{fieldType:'default',label:'Content ID (KM-Si)',size:'md',value:item.contentId,onChange:v=>set('contentId',v)}),
      React.createElement(InputField,{fieldType:'default',label:'ที่อยู่ในการจัดเก็บ',size:'md',value:item.location,onChange:v=>set('location',v)}),
      React.createElement(InputField,{fieldType:'default',label:'รูปแบบ/วิธีการแลกเปลี่ยนเรียนรู้',size:'md',value:item.shareMethod,onChange:v=>set('shareMethod',v)})
    )
  );
}

function KnowledgeSection(){
  const [rows,setRows]=React.useState(window.LF_KNOWLEDGE);
  function update(next){setRows(rows.map(r=>r.id===next.id?next:r));}
  function addRow(){setRows([...rows,{id:Date.now(),type:'new',topic:'',contentId:'',location:'',shareMethod:''}]);}
  return React.createElement(SectionCard,{title:'ส่วนที่ 7 — องค์ความรู้ที่ใช้ / องค์ความรู้ใหม่',
    hint:'แนบหลักฐานเชิงประจักษ์ของผลลัพธ์กระบวนการที่สำคัญ (ถ้ามี)',
    action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addRow},'เพิ่มองค์ความรู้')},
    rows.map(item=>React.createElement(KnowledgeCard,{key:item.id,item,onChange:update}))
  );
}

function QirReportsSection(){
  return React.createElement(SectionCard,{title:'ออก Report QIR สำหรับนำเสนอคณะกรรมการ'},
    React.createElement('p',{className:'lreport-desc'},'สร้างรายงาน QIR รายไตรมาสและรายปีจากข้อมูลในระบบโดยตรง แบ่งชีทตามสายงาน/เขต ไม่ต้องคัดลอกไปวางใน Excel'),
    React.createElement('div',{className:'lreport-grid'},
      React.createElement('div',{className:'lreport-card'},
        React.createElement('h4',null,'QIR รายไตรมาส'),
        React.createElement('p',null,'ชื่อกระบวนการ + ผลการดำเนินงานรายไตรมาส ระดับองค์กรและสายงาน'),
        React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'download',size:16})},'Export รายไตรมาส')
      ),
      React.createElement('div',{className:'lreport-card'},
        React.createElement('h4',null,'QIR รายปี'),
        React.createElement('p',null,'กระบวนการที่ผ่านการคัดเลือก แนวทางปรับปรุง ความสอดคล้องกับ BA และ % กิจกรรมตามแผน'),
        React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'download',size:16})},'Export รายปี')
      )
    )
  );
}

function App(){
  const [year,setYear]=React.useState(window.LF_META.year);
  const m=window.LF_META;
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'card ltitle-card'},
        React.createElement('div',{className:'ltitle-top'},
          React.createElement('h1',null,m.formName),
          React.createElement('div',{className:'ltitle-actions'},
            React.createElement('div',{className:'lyear-filter'},
              window.LF_YEARS.map(y=>React.createElement('button',{key:y,className:'lyear-btn'+(y===year?' is-active':''),onClick:()=>setYear(y)},'ปี '+y))
            ),
            React.createElement(Badge,{label:m.status,type:'pill-color',color:'success',size:'sm'})
          )
        ),
        React.createElement('p',{className:'ltitle-sub'},m.processName)
      ),
      React.createElement(MetaSection),
      React.createElement(EffectivenessSection),
      React.createElement(IssuesSection),
      React.createElement(PrioritiesSection),
      React.createElement(NextYearMetricsSection),
      React.createElement(QirActivitiesSection),
      React.createElement(KnowledgeSection),
      React.createElement(QirReportsSection)
    )
  );
}

export default App;
