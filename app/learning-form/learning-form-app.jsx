import Image from 'next/image';
import Link from 'next/link';
const {Button,Badge,InputField,Textarea,Radio,Checkbox,FeaturedIcon,Avatar}=window.DesignSystem_cbd181;

const LF_STATUS_MAP={pending:{label:'รอดำเนินการ',color:'warning'},draft:{label:'บันทึกร่าง',color:'gray'},completed:{label:'เสร็จสิ้น',color:'success'}};
function computeLfStatus(savedCount,total){
  if(savedCount===0)return 'pending';
  if(savedCount<total)return 'draft';
  return 'completed';
}

function TopBar(){
  return React.createElement('header',{className:'ltop'},
    React.createElement(Link,{className:'ltop-back',href:'/learning-form-overview'},React.createElement(Icon,{name:'chevron-left',size:16}),'กลับ'),
    React.createElement('div',{className:'ltop-left'},
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
    React.createElement(Link,{href:'/learning-form-overview'},'ภาพรวม Learning Form'),
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

function EmployeeSearchInput({value,onChange,onSelect}){
  const [open,setOpen]=React.useState(false);
  const digits=(value||'').replace(/[^0-9]/g,'');
  const matches=digits?Object.entries(window.LF_EMPLOYEES).filter(([id])=>id.startsWith(digits)):[];
  function pick(id,emp){onSelect(id,emp);setOpen(false);}
  return React.createElement('div',{className:'lemp-search'},
    React.createElement(InputField,{fieldType:'default',size:'md',placeholder:'ค้นหารหัสพนักงาน',leadingIcon:React.createElement(Icon,{name:'search',size:16}),value:value,onChange:v=>{onChange(v);setOpen(true);},onFocus:()=>setOpen(true)}),
    open&&matches.length>0&&React.createElement('div',{className:'lemp-dropdown'},
      matches.map(([id,emp])=>React.createElement('button',{key:id,type:'button',className:'lemp-option',onClick:()=>pick(id,emp)},
        React.createElement('span',{className:'lemp-option-prefix'},id.slice(0,digits.length)),id.slice(digits.length),
        ' '+emp.name+' ('+id+')'
      ))
    )
  );
}

function PersonEditField({label,person,onChange}){
  const resolved=!!person.name;
  function reset(){onChange({empId:'',name:'',position:'',tel:''});}
  return React.createElement('div',{className:'lperson-field'},
    React.createElement('span',{className:'lperson-role'},label),
    resolved?
      React.createElement('div',{className:'lperson-block lperson-block--resolved'},
        React.createElement('div',{className:'lperson-block--resolved-top'},
          React.createElement(Avatar,{variant:'text',size:'md',text:person.name.slice(0,1),className:'lperson-avatar'}),
          React.createElement('div',{className:'lperson-block-text'},
            React.createElement('span',{className:'lperson-name2'},person.name),
            React.createElement('div',{className:'lperson-meta lperson-meta--stacked'},
              React.createElement('span',null,'ตำแหน่ง: '+person.position),
              React.createElement('span',null,'รหัสพนักงาน: '+person.empId),
              React.createElement('span',null,'โทร: '+person.tel)
            )
          )
        ),
        React.createElement(Button,{variant:'secondary',size:'sm',onClick:reset},'เปลี่ยน')
      ):
      React.createElement(EmployeeSearchInput,{value:person.empId,onChange:v=>onChange({...person,empId:v.replace(/[^0-9]/g,'').slice(0,6)}),onSelect:(id,emp)=>onChange({empId:id,name:emp.name,position:emp.position,tel:emp.tel})})
  );
}

function ParticipantsEditRow({people,onChange}){
  function updateAt(i,next){onChange(people.map((p,idx)=>idx===i?next:p));}
  function addPerson(){onChange([...people,{name:'',position:'',empId:'',tel:''}]);}
  function removePerson(i){onChange(people.filter((_,idx)=>idx!==i));}
  return React.createElement('div',{className:'lparticipants'},
    React.createElement('div',{className:'lfield-label-row'},
      React.createElement('span',{className:'lfield-label'},'ผู้เข้าร่วมจัดทำ'),
      React.createElement(Button,{variant:'tertiary',size:'sm',className:'lfc-btn-purple',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addPerson},'เพิ่มคน')
    ),
    React.createElement('div',{className:'lpeople-grid'},
      people.map((p,i)=>{
        const resolved=!!p.name;
        function reset(){updateAt(i,{empId:'',name:'',position:'',tel:''});}
        return React.createElement('div',{key:i,className:'lparticipant-slot'},
          resolved?
            React.createElement('div',{className:'lperson-block lperson-block--resolved lperson-block--participant'},
              React.createElement('div',{className:'lperson-block--resolved-top'},
                React.createElement(Avatar,{variant:'text',size:'md',text:p.name.slice(0,1),className:'lperson-avatar'}),
                React.createElement('div',{className:'lperson-block-text'},
                  React.createElement('span',{className:'lperson-name2'},p.name),
                  React.createElement('div',{className:'lperson-meta lperson-meta--stacked'},
                    React.createElement('span',null,'ตำแหน่ง: '+p.position),
                    React.createElement('span',null,'รหัส: '+p.empId),
                    React.createElement('span',null,'โทร: '+p.tel)
                  )
                )
              ),
              React.createElement('div',{className:'lperson-block-actions'},
                React.createElement(Button,{variant:'secondary',size:'sm',onClick:reset},'เปลี่ยน'),
                React.createElement(Button,{variant:'secondary-destructive',size:'sm',onClick:()=>removePerson(i)},'ลบ')
              )
            ):
            React.createElement('div',{className:'lparticipant-search-row'},
              React.createElement(EmployeeSearchInput,{value:p.empId,onChange:v=>updateAt(i,{...p,empId:v.replace(/[^0-9]/g,'').slice(0,6)}),onSelect:(id,emp)=>updateAt(i,{empId:id,name:emp.name,position:emp.position,tel:emp.tel})}),
              React.createElement(Button,{variant:'secondary-destructive',size:'sm',onClick:()=>removePerson(i)},'ลบ')
            )
        );
      })
    )
  );
}

function ObjectiveList(){
  const [objectives,setObjectives]=React.useState([window.LF_META.objective]);
  function update(i,v){setObjectives(objectives.map((o,idx)=>idx===i?v:o));}
  function addItem(){setObjectives([...objectives,'']);}
  function removeItem(i){setObjectives(objectives.filter((_,idx)=>idx!==i));}
  return React.createElement('div',{className:'lmeta-field lmeta-field--wide'},
    React.createElement('div',{className:'lfield-label-row'},
      React.createElement('span',{className:'lfield-label'},'วัตถุประสงค์ของกระบวนการ'),
      React.createElement(Button,{variant:'tertiary',size:'sm',className:'lfc-btn-purple',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addItem},'เพิ่มข้อ')
    ),
    objectives.map((o,i)=>React.createElement('div',{key:i,className:'lobjective-row'},
      React.createElement('span',{className:'lobjective-num'},(i+1)+'.'),
      React.createElement(InputField,{fieldType:'default',size:'md',placeholder:'ระบุวัตถุประสงค์',value:o,onChange:v=>update(i,v)}),
      objectives.length>1&&React.createElement('button',{type:'button',className:'lobjective-remove',onClick:()=>removeItem(i)},React.createElement(Icon,{name:'x',size:15}))
    ))
  );
}

function DiagramUploadSection({title,hint,redNote}){
  const [files,setFiles]=React.useState([]);
  function onPick(e){
    const list=Array.from(e.target.files||[]).map(f=>({name:f.name,url:URL.createObjectURL(f)}));
    setFiles(prev=>[...prev,...list]);
    e.target.value='';
  }
  function removeFile(i){setFiles(files.filter((_,idx)=>idx!==i));}
  return React.createElement(SectionCard,{title,hint},
    redNote&&React.createElement('p',{className:'ldiagram-rednote'},React.createElement(Icon,{name:'alert-triangle',size:16}),redNote),
    React.createElement('label',{className:'ldiagram-drop'},
      React.createElement(Icon,{name:'upload',size:22}),
      React.createElement('span',null,'อัปโหลดรูปภาพแผนภาพกระบวนการ'),
      React.createElement('span',{className:'ldiagram-drop-hint'},'รองรับ PNG, JPG (คลิกเพื่อเลือกไฟล์)'),
      React.createElement('input',{type:'file',accept:'image/*',multiple:true,onChange:onPick,style:{display:'none'}})
    ),
    files.length>0&&React.createElement('div',{className:'ldiagram-preview-grid'},
      files.map((f,i)=>React.createElement('div',{key:i,className:'ldiagram-preview'},
        React.createElement('img',{src:f.url,alt:f.name}),
        React.createElement('div',{className:'ldiagram-preview-name'},f.name),
        React.createElement('button',{className:'ldiagram-preview-remove',onClick:()=>removeFile(i)},React.createElement(Icon,{name:'x',size:14}))
      ))
    )
  );
}

function DiagramBeforeSection(){
  return React.createElement(DiagramUploadSection,{
    title:'ส่วนที่ 1 — แผนภาพกระบวนการก่อนการปรับปรุงประจำปี',
    hint:'แผนภาพรวมทั้งกระบวนการก่อนการปรับปรุง อาจอยู่ในรูปแบบ Work Flow หรือ SIPOC (ถ้ามี)',
    redNote:'สำหรับหน่วยงานที่ใช้ตอบเกณฑ์ Core Business Enabler ของ กฟภ. ให้แสดงภาพกระบวนการในส่วนนี้'
  });
}

function DiagramAfterSection(){
  return React.createElement(DiagramUploadSection,{
    title:'ส่วนที่ 4 — ผลการปรับปรุงกระบวนการประจำปี',
    hint:'แผนภาพกระบวนการหลังการปรับปรุงและนำมาใช้ในการดำเนินการประจำปีถัดไป ซึ่งเกิดจากการกำหนดการพัฒนา/ปรับปรุงในส่วนที่ 4 (ถ้ามี)',
    redNote:'สำหรับหน่วยงานที่ใช้ตอบเกณฑ์ Core Business Enabler ของ กฟภ. ให้แสดงภาพกระบวนการในส่วนนี้'
  });
}

function MetaSection(){
  const m=window.LF_META;
  const [recorder,setRecorder]=React.useState({...window.LF_CURRENT_USER,role:'ผู้บันทึกข้อมูล'});
  const [reviewer,setReviewer]=React.useState(m.reviewer);
  const [approver,setApprover]=React.useState(m.approver);
  const [participants,setParticipants]=React.useState(m.participants);
  return React.createElement(SectionCard,{title:'ส่วนที่ 0 — ข้อมูลพื้นฐานการประเมินและปรับปรุงกระบวนการ'},
    React.createElement('div',{className:'lmeta-grid'},
      React.createElement('div',{className:'lmeta-field lmeta-field--wide'},
        React.createElement('span',{className:'lfield-label'},'ชื่อกระบวนการ'),
        React.createElement('div',{className:'lba-process-list'},
          window.LF_BA_PROCESS_OPTIONS.map((o,idx)=>React.createElement('div',{key:o.key,className:'lba-process-item'},
            React.createElement('span',{className:'lba-process-num'},idx+1),
            React.createElement('span',null,o.label)
          ))
        )
      ),
      React.createElement(ObjectiveList),
      React.createElement('div',{className:'lmeta-field lmeta-field--wide'},
        React.createElement('span',{className:'lfield-label'},'หน่วยงานผู้รับผิดชอบ'),
        React.createElement('div',{className:'lfield-static'},m.division)
      )
    ),
    React.createElement('div',{className:'lpeople-grid'},
      React.createElement(PersonEditField,{label:'ผู้บันทึกข้อมูล',person:recorder,onChange:setRecorder}),
      React.createElement(PersonEditField,{label:'ผู้ตรวจสอบข้อมูล',person:reviewer,onChange:setReviewer}),
      React.createElement(PersonEditField,{label:'ผู้อนุมัติข้อมูล',person:approver,onChange:setApprover})
    ),
    React.createElement(ParticipantsEditRow,{people:participants,onChange:setParticipants})
  );
}

function MetricCard({item,onChange}){
  function set(field,value){onChange({...item,[field]:value});}
  function toggleFollowup(key){
    const has=item.followup.includes(key);
    set('followup',has?item.followup.filter(k=>k!==key):[...item.followup,key]);
  }
  function toggleControlCriteria(key){
    const list=item.controlCriteria||[];
    const has=list.includes(key);
    set('controlCriteria',has?list.filter(k=>k!==key):[...list,key]);
  }
  const pointType=item.isControl?'control':(item.isCritical?'critical':'none');
  function setPointType(next){
    if(next==='control')onChange({...item,isCritical:false,isControl:true});
    else if(next==='none')onChange({...item,isCritical:false,isControl:false});
    else onChange({...item,isCritical:true,isControl:false});
  }
  return React.createElement('div',{className:'card lmetric-card'},
    React.createElement('div',{className:'lmetric-head'},
      React.createElement('span',{className:'lmetric-step'},item.step)
    ),
    React.createElement('div',{className:'lmetric-metric-block'},
      React.createElement('span',{className:'lfield-label'},'ตัวชี้วัด'),
      React.createElement('p',{className:'lmetric-name'},item.metric)
    ),
    React.createElement('div',{className:'lmetric-body'},
      React.createElement('div',{className:'lmetric-section'},
        React.createElement('span',{className:'lfield-label lfield-label-lg'},'ประเภท'),
        React.createElement('div',{className:'lmetric-point-tags'},
          React.createElement(Radio,{size:'sm',name:'point-type-'+item.id,label:'Critical Point',isChecked:pointType==='critical',onChange:()=>setPointType('critical')}),
          React.createElement(Radio,{size:'sm',name:'point-type-'+item.id,label:'Control Point',isChecked:pointType==='control',onChange:()=>setPointType('control')}),
          React.createElement(Radio,{size:'sm',name:'point-type-'+item.id,label:'ไม่เป็นประเภทใดเลย',isChecked:pointType==='none',onChange:()=>setPointType('none')})
        )
      ),
      React.createElement('span',{className:'lfield-label lfield-label-lg'},'ผลการดำเนินงานตามตัวชี้วัด'),
      React.createElement('div',{className:'lmetric-stats'},
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label lstat-label-purple'},'เป้าหมายปี '+window.LF_META.year,React.createElement('span',{className:'lc-required'},' *')),React.createElement(InputField,{fieldType:'default',size:'sm',value:item.target,onChange:v=>set('target',v)})),
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label lstat-label-purple'},'ผล '+window.LF_META.year,React.createElement('span',{className:'lc-required'},' *')),React.createElement(InputField,{fieldType:'default',size:'sm',value:item.result2568,onChange:v=>set('result2568',v)})),
        React.createElement('div',{className:'lstat lstat-readonly'},React.createElement('span',{className:'lstat-label'},'ผล 2567'),React.createElement('span',{className:'lstat-value'},item.result2567)),
        React.createElement('div',{className:'lstat lstat-readonly'},React.createElement('span',{className:'lstat-label'},'ผล 2566'),React.createElement('span',{className:'lstat-value'},item.result2566))
      ),
      React.createElement('div',{className:'lissue-parent-label'},'ประเด็นพิจารณาผลการดำเนินงาน'),
      pointType!=='control'?
      React.createElement('div',{className:'lmetric-analysis-grid'},
        React.createElement('div',{className:'lmetric-pbar'},
          React.createElement('div',{className:'lmetric-pbar-head'},'ผลการวิเคราะห์'),
          React.createElement('div',{className:'lmetric-pbar-body'},
            React.createElement('div',{className:'lcheck-group'},
              window.LF_ANALYSIS_OPTIONS.map(o=>React.createElement(Radio,{key:o.key,size:'sm',label:o.label,isChecked:(item.analysisList||(item.analysis?[item.analysis]:[])).includes(o.key),onChange:()=>set('analysisList',[o.key])}))
            ),
            React.createElement(Textarea,{label:'รายละเอียดการวิเคราะห์',placeholder:'ระบุรายละเอียดการวิเคราะห์',value:item.analysisDetail,onChange:v=>set('analysisDetail',v)})
          )
        ),
        React.createElement('div',{className:'lmetric-pbar'},
          React.createElement('div',{className:'lmetric-pbar-head'},'แนวทางการพัฒนา/ปรับปรุง'),
          React.createElement('div',{className:'lmetric-pbar-body'},
            React.createElement('div',{className:'lcheck-group'},
              window.LF_FOLLOWUP_OPTIONS.map(o=>React.createElement(Checkbox,{key:o.key,size:'sm',label:o.label,isChecked:item.followup.includes(o.key),onChange:()=>toggleFollowup(o.key)}))
            ),
            React.createElement(Textarea,{label:'รายละเอียดการพัฒนา/ปรับปรุง',placeholder:'ระบุแนวทางการพัฒนา/ปรับปรุง',value:item.improvementDetail,onChange:v=>set('improvementDetail',v)})
          )
        )
      ):
      React.createElement('div',{className:'lmetric-analysis-grid'},
        React.createElement('div',{className:'lmetric-pbar'},
          React.createElement('div',{className:'lmetric-pbar-head'},'หลักเกณฑ์การประเมิน',React.createElement('span',{className:'lc-required'},' *')),
          React.createElement('div',{className:'lmetric-pbar-body'},
            React.createElement('div',{className:'lcheck-group'},
              window.LF_CONTROL_CRITERIA.map(o=>React.createElement(Checkbox,{key:o.key,size:'sm',label:o.label+' ('+o.tag+')',isChecked:(item.controlCriteria||[]).includes(o.key),onChange:()=>toggleControlCriteria(o.key)}))
            )
          )
        ),
        React.createElement('div',{className:'lmetric-pbar'},
          React.createElement('div',{className:'lmetric-pbar-head'},'แนวทางการแก้ไข',React.createElement('span',{className:'lc-required'},' *')),
          React.createElement('div',{className:'lmetric-pbar-body'},
            React.createElement(Textarea,{label:'รายละเอียดแนวทางการแก้ไข',placeholder:'ระบุแนวทางการแก้ไข',value:item.controlFix||'',onChange:v=>set('controlFix',v)})
          )
        )
      )
    )
  );
}

function EffectivenessSection(){
  const [leading,setLeading]=React.useState(window.LF_LEADING_METRICS);
  const [lagging,setLagging]=React.useState(window.LF_LAGGING_METRICS);
  const [tab,setTab]=React.useState('leading');
  function updateLeading(next){setLeading(leading.map(i=>i.id===next.id?next:i));}
  function updateLagging(next){setLagging(lagging.map(i=>i.id===next.id?next:i));}
  const hasCritical=[...leading,...lagging].some(i=>i.isCritical);
  return React.createElement(SectionCard,{title:'ส่วนที่ 2 — ผลการดำเนินงานตามตัวชี้วัด (ย้อนหลัง 3 ปี)',
    hint:'ระบุผลการดำเนินงานและเลือก Critical/Control Point สำหรับแต่ละตัวชี้วัด'},
    !hasCritical&&React.createElement('div',{className:'linfo-banner'},
      React.createElement(Icon,{name:'info-circle',size:18}),
      React.createElement('span',null,'ต้องเลือกอย่างน้อยหนึ่งตัวชี้วัด/กระบวนการเป็น Critical Point')
    ),
    React.createElement('div',{className:'lmetric-tabs'},
      React.createElement('button',{type:'button',className:'lmetric-tab'+(tab==='leading'?' is-active':''),onClick:()=>setTab('leading')},'ตัวชี้วัดประสิทธิภาพ / ตัวชี้วัดนำ (Leading)'),
      React.createElement('button',{type:'button',className:'lmetric-tab'+(tab==='lagging'?' is-active':''),onClick:()=>setTab('lagging')},'ตัวชี้วัดประสิทธิผล / ตัวชี้วัดตาม (Lagging)')
    ),
    tab==='leading'?
      React.createElement('div',{className:'lmetric-list'},leading.map(item=>React.createElement(MetricCard,{key:item.id,item,onChange:updateLeading}))):
      React.createElement('div',{className:'lmetric-list'},lagging.map(item=>React.createElement(MetricCard,{key:item.id,item,onChange:updateLagging})))
  );
}

function IssueCard({item,onChange}){
  function set(field,value){onChange({...item,[field]:value});}
  const yearOptions=Array.from({length:8},(_,i)=>2569+i);
  return React.createElement('div',{className:'card lissue-card'},
    React.createElement('div',{className:'lissue-head'},
      React.createElement('span',{className:'lissue-title'},item.title),
      React.createElement('span',{className:'lissue-hint'},item.hint)
    ),
    React.createElement('div',{className:'lissue-body'},
      React.createElement(Textarea,{label:'ผลการวิเคราะห์',value:item.analysis,onChange:v=>set('analysis',v)}),
      React.createElement(Textarea,{label:'แนวทางการพัฒนา/ปรับปรุง',value:item.direction,onChange:v=>set('direction',v)})
    ),
    React.createElement('div',{className:'lissue-meta-row'},
      React.createElement('div',{className:'lissue-meta-field'},
        React.createElement('span',{className:'lfield-label'},'ชื่อกระบวนการที่ปรับปรุง'),
        React.createElement('select',{className:'lqir-issue-select',value:item.improveProcess||'',onChange:e=>set('improveProcess',e.target.value)},
          React.createElement('option',{value:''},'เลือกกระบวนการ'),
          window.LF_BA_PROCESS_OPTIONS.map(o=>React.createElement('option',{key:o.key,value:o.key},o.label)),
          React.createElement('option',{value:'other'},'อื่นๆ')
        )
      ),
      React.createElement('div',{className:'lissue-meta-field'},
        React.createElement('span',{className:'lfield-label'},'ปีที่ดำเนินการ'),
        React.createElement('select',{className:'lqir-issue-select',value:item.improveYear||'',onChange:e=>set('improveYear',e.target.value)},
          React.createElement('option',{value:''},'เลือกปี'),
          yearOptions.map(y=>React.createElement('option',{key:y,value:y},'พ.ศ. '+y))
        )
      )
    )
  );
}

function IssuesPrioritiesSection(){
  const [issues,setIssues]=React.useState(window.LF_ISSUES);
  const [qirGroups,setQirGroups]=React.useState([{id:Date.now(),issueKey:window.LF_ISSUES[0].key,rows:window.LF_QIR_ACTIVITIES.map(r=>({...r}))}]);
  function updateIssue(next){setIssues(issues.map(i=>i.key===next.key?next:i));}
  function setGroupIssue(gid,key){setQirGroups(qirGroups.map(g=>g.id===gid?{...g,issueKey:key}:g));}
  function updateQir(gid,rid,field,value){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.map(r=>r.id===rid?{...r,[field]:value}:r)}));}
  function addQirRow(gid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:[...g.rows,{id:Date.now(),activity:'',weight:0,saved:false}]}));}
  function removeQirRow(gid,rid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.filter(r=>r.id!==rid)}));}
  function addGroup(){setQirGroups([...qirGroups,{id:Date.now(),issueKey:window.LF_ISSUES[0].key,rows:[{id:Date.now()+1,activity:'',weight:0,saved:false}]}]);}
  function duplicateGroup(gid){
    const g=qirGroups.find(x=>x.id===gid);
    if(!g)return;
    const idx=qirGroups.findIndex(x=>x.id===gid);
    const copy={id:Date.now(),issueKey:g.issueKey,rows:g.rows.map((r,i)=>({...r,id:Date.now()+i+1,saved:false}))};
    const next=[...qirGroups];
    next.splice(idx+1,0,copy);
    setQirGroups(next);
  }
  function removeGroup(gid){setQirGroups(qirGroups.filter(g=>g.id!==gid));}
  return React.createElement(React.Fragment,null,
    React.createElement(SectionCard,{title:'ส่วนที่ 3 — ประเด็นพิจารณาสำหรับการประเมินและปรับปรุงกระบวนการ'},
      issues.map(item=>React.createElement(IssueCard,{key:item.key,item,onChange:updateIssue}))
    ),
    React.createElement('div',{className:'lqir-spacer'}),
    React.createElement(SectionCard,{title:'QIR — บันทึกกิจกรรมที่จะดำเนินการ',hint:'จัดกลุ่มกิจกรรมตามประเด็นพิจารณา — น้ำหนักรวมของแต่ละกลุ่มต้องเท่ากับ 100',
      action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addGroup},'เพิ่มกลุ่มประเด็นพิจารณา')},
      qirGroups.map((g,gi)=>{
        const qirTotal=g.rows.reduce((s,r)=>s+(Number(r.weight)||0),0);
        return React.createElement('div',{key:g.id,className:'lqir-group'},
          React.createElement('div',{className:'lqir-group-head'},
            React.createElement('div',{className:'lqir-group-select'},
              React.createElement('span',{className:'lfield-label'},'ประเด็นพิจารณา'),
              React.createElement('select',{className:'lqir-issue-select',value:g.issueKey,onChange:e=>setGroupIssue(g.id,e.target.value)},
                window.LF_ISSUES.map(o=>React.createElement('option',{key:o.key,value:o.key},o.title))
              )
            ),
            React.createElement('div',{className:'lqir-group-actions'},
              React.createElement(Button,{variant:'secondary',size:'sm',leadingIcon:React.createElement(Icon,{name:'copy-01',size:14}),onClick:()=>duplicateGroup(g.id)},'ทำซ้ำกลุ่มนี้'),
              qirGroups.length>1&&React.createElement(Button,{variant:'secondary-destructive',size:'sm',onClick:()=>removeGroup(g.id)},'ลบกลุ่ม')
            )
          ),
          React.createElement('table',{className:'ltable'},
            React.createElement('thead',null,React.createElement('tr',null,['รายการ','กิจกรรมที่จะดำเนินการ','น้ำหนัก',''].map((h,i)=>React.createElement('th',{key:i},h)))),
            React.createElement('tbody',null,g.rows.map((r,i)=>React.createElement('tr',{key:r.id},
              React.createElement('td',null,i+1),
              React.createElement('td',null,React.createElement(InputField,{fieldType:'default',size:'sm',value:r.activity,onChange:v=>updateQir(g.id,r.id,'activity',v)})),
              React.createElement('td',{className:'lqir-weight'},React.createElement(InputField,{fieldType:'default',size:'sm',value:String(r.weight),onChange:v=>updateQir(g.id,r.id,'weight',v.replace(/[^0-9]/g,''))})),
              React.createElement('td',null,
                React.createElement(Button,{variant:'secondary',size:'sm',onClick:()=>updateQir(g.id,r.id,'saved',true)},'บันทึก'),
                React.createElement('button',{className:'lqir-remove',onClick:()=>removeQirRow(g.id,r.id)},React.createElement(Icon,{name:'x',size:15}))
              )
            )))
          ),
          React.createElement(Button,{variant:'tertiary',size:'sm',className:'lfc-btn-purple',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>addQirRow(g.id)},'เพิ่มกิจกรรม'),
          React.createElement('div',{className:'lqir-footer'},
            React.createElement('span',null,'Info :: น้ำหนักรวมกัน ไม่เกิน 100'),
            React.createElement('span',{className:'lqir-total'},qirTotal)
          ),
          React.createElement('div',{className:'lqir-status'+(qirTotal===100?' is-ok':qirTotal>100?' is-error':'')},
            React.createElement(Icon,{name:qirTotal===100?'check':'alert-triangle',size:14}),
            qirTotal===100?'น้ำหนักรวมครบ 100 — สามารถบันทึกได้':qirTotal>100?'น้ำหนักรวมเกิน 100 — กรุณาปรับแก้':'น้ำหนักรวมยังไม่ครบ 100'
          )
        );
      })
    )
  );
}

function AddMetricModal({onClose,onAdd}){
  const [type,setType]=React.useState('leading');
  const stepOptions=type==='leading'?window.LF_BA_PROCESS_OPTIONS.map(o=>o.label):[window.LF_META.ba+' '+window.LF_META.baLabel];
  const [step,setStep]=React.useState(stepOptions[0]);
  function findPrefill(t,s){
    const src=t==='leading'?window.LF_LEADING_METRICS:window.LF_LAGGING_METRICS;
    return src.find(m=>m.step===s);
  }
  const initial=findPrefill(type,stepOptions[0]);
  const [metric,setMetric]=React.useState(initial?initial.metric:'');
  const [target,setTarget]=React.useState(initial?initial.target:'');
  function changeType(next){
    const opts=next==='leading'?window.LF_BA_PROCESS_OPTIONS.map(o=>o.label):[window.LF_META.ba+' '+window.LF_META.baLabel];
    setType(next);setStep(opts[0]);
    const pre=findPrefill(next,opts[0]);
    setMetric(pre?pre.metric:'');setTarget(pre?pre.target:'');
  }
  function changeStep(s){
    setStep(s);
    const pre=findPrefill(type,s);
    setMetric(pre?pre.metric:'');setTarget(pre?pre.target:'');
  }
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'เพิ่มตัวชี้วัด'),
        React.createElement('button',{className:'lfa-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      React.createElement('div',{className:'lmodal-body'},
        React.createElement('div',{className:'lissue-meta-field'},
          React.createElement('span',{className:'lfield-label'},'ประเภทตัวชี้วัด'),
          React.createElement('div',{className:'lmetric-point-tags'},
            React.createElement(Radio,{size:'sm',label:'ตัวชี้วัดประสิทธิภาพ / ตัวชี้วัดนำ (Leading)',isChecked:type==='leading',onChange:()=>changeType('leading')}),
            React.createElement(Radio,{size:'sm',label:'ตัวชี้วัดประสิทธิผล / ตัวชี้วัดตาม (Lagging)',isChecked:type==='lagging',onChange:()=>changeType('lagging')})
          )
        ),
        React.createElement('div',{className:'lissue-meta-field'},
          React.createElement('span',{className:'lfield-label'},'ขั้นตอน'),
          React.createElement('select',{className:'lqir-issue-select',value:step,onChange:e=>changeStep(e.target.value)},
            stepOptions.map(o=>React.createElement('option',{key:o,value:o},o))
          )
        ),
        React.createElement(Textarea,{label:'ตัวชี้วัด',value:metric,onChange:setMetric}),
        React.createElement(InputField,{fieldType:'default',size:'md',label:'เป้าหมายปีถัดไป',value:target,onChange:setTarget})
      ),
      React.createElement('div',{className:'lmodal-foot'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',onClick:()=>onAdd({type,step,metric,target})},'เพิ่มตัวชี้วัด')
      )
    )
  );
}

function NextYearMetricsSection(){
  const [leading,setLeading]=React.useState(window.LF_NEXT_LEADING);
  const [lagging,setLagging]=React.useState(window.LF_NEXT_LAGGING);
  const [modalOpen,setModalOpen]=React.useState(false);
  const [addToast,setAddToast]=React.useState(false);
  function removeLeading(id){setLeading(leading.filter(r=>r.id!==id));}
  function removeLagging(id){setLagging(lagging.filter(r=>r.id!==id));}
  function handleAdd(data){
    const row={id:Date.now(),step:data.step,metric:data.metric,target:data.target};
    if(data.type==='leading')setLeading([...leading,row]);else setLagging([...lagging,row]);
    setModalOpen(false);
    setAddToast(true);
    setTimeout(()=>setAddToast(false),3000);
  }
  return React.createElement(React.Fragment,null,
  React.createElement(SectionCard,{title:'ส่วนที่ 5 — การกำหนดตัวชี้วัดและเป้าหมายของกระบวนการปีถัดไป',
    action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>setModalOpen(true)},'เพิ่มตัวชี้วัด')},
    React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิภาพ / ตัวชี้วัดนำ (Leading)'),
    React.createElement('table',{className:'ltable'},
      React.createElement('thead',null,React.createElement('tr',null,['ขั้นตอน','ตัวชี้วัด','เป้าหมายปีถัดไป',''].map((h,i)=>React.createElement('th',{key:i},h)))),
      React.createElement('tbody',null,leading.map(r=>React.createElement('tr',{key:r.id},
        React.createElement('td',null,r.step),React.createElement('td',null,r.metric),React.createElement('td',null,r.target),
        React.createElement('td',null,React.createElement(Button,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>removeLeading(r.id)},'ลบ'))
      )))
    ),
    React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิผล / ตัวชี้วัดตาม (Lagging)'),
    React.createElement('table',{className:'ltable'},
      React.createElement('thead',null,React.createElement('tr',null,['ขั้นตอน','ตัวชี้วัด','เป้าหมายปีถัดไป',''].map((h,i)=>React.createElement('th',{key:i},h)))),
      React.createElement('tbody',null,lagging.map(r=>React.createElement('tr',{key:r.id},
        React.createElement('td',null,r.step),React.createElement('td',null,r.metric),React.createElement('td',null,r.target),
        React.createElement('td',null,React.createElement(Button,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>removeLagging(r.id)},'ลบ'))
      )))
    )
  ),
  modalOpen&&React.createElement(AddMetricModal,{onClose:()=>setModalOpen(false),onAdd:handleAdd}),
  addToast&&React.createElement('div',{className:'ltoast'},React.createElement(Icon,{name:'check-circle',size:16}),'เพิ่มตัวชี้วัดเรียบร้อยแล้ว')
  );
}

function KnowledgeCard({item,onChange}){
  function set(field,value){onChange({...item,[field]:value});}
  function toggleList(field,key){
    const list=item[field]||[];
    onChange({...item,[field]:list.includes(key)?list.filter(k=>k!==key):[...list,key]});
  }
  const LOCATIONS=[{key:'kmsi',label:'KM-Si'},{key:'kmcs',label:'KMCS'}];
  const METHODS=[
    {key:'meeting',label:'การประชุม / บรรยาย / เสวนา'},
    {key:'story',label:'การเล่าประสบการณ์'},
    {key:'practice',label:'การฝึกปฏิบัติ'},
    {key:'lesson',label:'การถอดบทเรียน'},
    {key:'social',label:'Social Media/e-mail'},
    {key:'compile',label:'การรวบรวมแนวปฏิบัติที่ดี (Good Practice Compilation)'}
  ];
  const OUTCOMES=[
    {key:'time',label:'ระยะเวลา'},
    {key:'items',label:'จำนวนชิ้นงานที่เกิดขึ้น'},
    {key:'cost',label:'ลดค่าใช้จ่าย'},
    {key:'innovation',label:'ชิ้นงานนวัตกรรม'}
  ];
  return React.createElement('div',{className:'card lknow-card2'},
    React.createElement('div',{className:'lknow-section'},
      React.createElement('span',{className:'lknow-section-head'},'1. หัวข้อองค์ความรู้'),
      React.createElement('div',{className:'lmetric-point-tags'},
        React.createElement(Radio,{size:'sm',label:'องค์ความรู้เดิม',isChecked:item.knowType==='existing',onChange:()=>set('knowType','existing')}),
        React.createElement(Radio,{size:'sm',label:'องค์ความรู้ใหม่',isChecked:item.knowType==='new',onChange:()=>set('knowType','new')})
      ),
      item.knowType==='existing'?
        React.createElement('div',{className:'lknow-fields'},
          React.createElement(InputField,{fieldType:'default',size:'sm',label:'ชื่อองค์ความรู้ในระบบ KM-Si (Content ID)',placeholder:'ระบุ Content ID',value:item.contentId,onChange:v=>set('contentId',v)}),
          React.createElement(InputField,{fieldType:'default',size:'sm',label:'อื่นๆ',placeholder:'ระบุ',value:item.topicOther,onChange:v=>set('topicOther',v)})
        ):
        React.createElement('div',{className:'lknow-fields'},
          React.createElement(InputField,{fieldType:'default',size:'sm',label:'ระบุหัวข้อองค์ความรู้',placeholder:'ระบุหัวข้อองค์ความรู้',value:item.topic,onChange:v=>set('topic',v)})
        ),
      React.createElement('div',{className:'lknow-subblock'},
        React.createElement('span',{className:'lknow-subhead'},'ที่อยู่ในการจัดเก็บ'),
        React.createElement('div',{className:'lcheck-group--row lknow-loc-row'},
          LOCATIONS.map(o=>React.createElement(Checkbox,{key:o.key,size:'sm',label:o.label,isChecked:(item.location||[]).includes(o.key),onChange:()=>toggleList('location',o.key)})),
          React.createElement('div',{className:'lknow-loc-other'},
            React.createElement(Checkbox,{size:'sm',label:'อื่นๆ',isChecked:(item.location||[]).includes('other'),onChange:()=>toggleList('location','other')}),
            (item.location||[]).includes('other')&&React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:'ระบุ',value:item.locationOther,onChange:v=>set('locationOther',v)})
          )
        )
      )
    ),
    React.createElement('div',{className:'lknow-section'},
      React.createElement('span',{className:'lknow-section-head'},'2. รูปแบบ/วิธีการในการแลกเปลี่ยนเรียนรู้'),
      React.createElement('div',{className:'lcheck-group lcheck-group--2col'},
        METHODS.map(o=>React.createElement(Checkbox,{key:o.key,size:'sm',label:o.label,isChecked:(item.methods||[]).includes(o.key),onChange:()=>toggleList('methods',o.key)}))
      )
    ),
    React.createElement('div',{className:'lknow-section'},
      React.createElement('span',{className:'lknow-section-head'},'3. ผลลัพธ์การแลกเปลี่ยนเรียนรู้'),
      React.createElement('div',{className:'lcheck-group--2col-row'},
        OUTCOMES.map(o=>React.createElement(Checkbox,{key:o.key,size:'sm',label:o.label,isChecked:(item.outcomes||[]).includes(o.key),onChange:()=>toggleList('outcomes',o.key)})),
        React.createElement('div',{className:'lknow-loc-other'},
          React.createElement(Checkbox,{size:'sm',label:'อื่นๆ',isChecked:(item.outcomes||[]).includes('other'),onChange:()=>toggleList('outcomes','other')}),
          (item.outcomes||[]).includes('other')&&React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:'ระบุ',value:item.outcomesOther,onChange:v=>set('outcomesOther',v)})
        )
      ),
      React.createElement('div',{className:'lknow-fields lknow-fields--pair'},
        React.createElement(InputField,{fieldType:'default',size:'sm',label:'รายละเอียดผลลัพธ์ก่อนปรับปรุง',placeholder:'ระบุ',value:item.before,onChange:v=>set('before',v)}),
        React.createElement(InputField,{fieldType:'default',size:'sm',label:'รายละเอียดผลลัพธ์หลังปรับปรุง',placeholder:'ระบุ',value:item.after,onChange:v=>set('after',v)})
      )
    )
  );
}

function KnowledgeSection(){
  const [rows,setRows]=React.useState(window.LF_KNOWLEDGE.map(r=>({
    id:r.id,knowType:r.type==='existing'?'existing':'new',
    contentId:r.contentId||'',topicOther:'',topic:r.type==='new'?r.topic:'',
    location:r.type==='existing'?['kmsi']:[],locationOther:'',
    methods:[],outcomes:[],outcomesOther:'',before:'',after:''
  })));
  function update(next){setRows(rows.map(r=>r.id===next.id?next:r));}
  function addRow(){setRows([...rows,{id:Date.now(),knowType:'new',contentId:'',topicOther:'',topic:'',location:[],locationOther:'',methods:[],outcomes:[],outcomesOther:'',before:'',after:''}]);}
  return React.createElement(SectionCard,{title:'ส่วนที่ 6 — องค์ความรู้ที่ใช้ / องค์ความรู้ใหม่ที่เกิดขึ้นจากการปรับปรุงกระบวนการ',
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

const LF_STEPS=[
{key:'meta',label:'ข้อมูลพื้นฐาน',hint:'กรอกข้อมูลพื้นฐานของกระบวนการและผู้เกี่ยวข้อง',Component:MetaSection},
{key:'diagram-before',label:'แผนภาพก่อนปรับปรุง',hint:'แนบแผนภาพกระบวนการก่อนการปรับปรุง (Work Flow/SIPOC)',Component:DiagramBeforeSection},
{key:'effectiveness',label:'ผลการดำเนินงานตามตัวชี้วัด',hint:'ทบทวนผลการดำเนินงานตามตัวชี้วัดย้อนหลัง 3 ปี',Component:EffectivenessSection},
{key:'issues',label:'ประเด็นพิจารณา',hint:'ระบุประเด็นพิจารณาสำหรับการปรับปรุงกระบวนการ และบันทึกกิจกรรม QIR',Component:IssuesPrioritiesSection},
{key:'diagram-after',label:'ผลการปรับปรุงกระบวนการ',hint:'แนบแผนภาพกระบวนการหลังการปรับปรุง',Component:DiagramAfterSection},
{key:'nextyear',label:'ตัวชี้วัดปีถัดไป',hint:'กำหนดตัวชี้วัดและเป้าหมายสำหรับปีถัดไป',Component:NextYearMetricsSection},
{key:'knowledge',label:'องค์ความรู้',hint:'บันทึกองค์ความรู้เดิมและองค์ความรู้ใหม่',Component:KnowledgeSection},
{key:'reports',label:'ออก Report',hint:'ออกรายงาน QIR สำหรับนำเสนอคณะกรรมการ',Component:QirReportsSection}
];

function ProgressRing({current,total}){
  const size=56;
  const pct=current/total;
  const stroke=6;
  const radius=(size-stroke)/2;
  const circumference=2*Math.PI*radius;
  const offset=circumference*(1-pct);
  return React.createElement('div',{className:'lstepper-ring-wrap'},
    React.createElement('svg',{className:'lstepper-ring',viewBox:`0 0 ${size} ${size}`},
      React.createElement('circle',{cx:size/2,cy:size/2,r:radius,fill:'none',stroke:'var(--pea-border-tertiary)',strokeWidth:stroke}),
      React.createElement('circle',{cx:size/2,cy:size/2,r:radius,fill:'none',stroke:'var(--pea-border-brand)',strokeWidth:stroke,strokeDasharray:circumference,strokeDashoffset:offset,strokeLinecap:'round',transform:`rotate(-90 ${size/2} ${size/2})`})
    ),
    React.createElement('span',{className:'lstepper-ring-text'},current+' / '+total)
  );
}

function Stepper({step,setStep,savedSteps}){
  const [expanded,setExpanded]=React.useState(false);
  React.useEffect(()=>{setExpanded(false);},[step]);
  const total=LF_STEPS.length;
  const current=LF_STEPS[step];
  const next=LF_STEPS[step+1];
  return React.createElement(React.Fragment,null,
    React.createElement('div',{className:'lstepper'},
      LF_STEPS.map((s,i)=>React.createElement('button',{key:s.key,type:'button',className:'lstepper-item'+(i===step?' is-active':'')+(savedSteps.has(i)?' is-done':''),onClick:()=>setStep(i)},
        React.createElement('span',{className:'lstepper-num'},savedSteps.has(i)?React.createElement(Icon,{name:'check',size:13}):i+1),
        React.createElement('span',{className:'lstepper-label'},s.label)
      ))
    ),
    React.createElement('div',{className:'lstepper-m'},
      React.createElement('button',{type:'button',className:'lstepper-m-head',onClick:()=>setExpanded(v=>!v)},
        React.createElement(ProgressRing,{current:step+1,total}),
        React.createElement('div',{className:'lstepper-m-info'},
          React.createElement('div',{className:'lstepper-m-title'},current.label),
          next&&React.createElement('div',{className:'lstepper-m-next'},'ถัดไป: '+next.label)
        ),
        React.createElement(Icon,{name:'chevron-down',size:20,className:'lstepper-m-chevron'+(expanded?' is-open':'')})
      ),
      expanded&&React.createElement('div',{className:'lstepper-m-list'},
        LF_STEPS.map((s,i)=>React.createElement('button',{key:s.key,type:'button',className:'lstepper-m-item'+(i===step?' is-active':'')+(savedSteps.has(i)?' is-done':''),onClick:()=>setStep(i)},
          React.createElement('span',{className:'lstepper-m-dot'},
            savedSteps.has(i)?React.createElement(Icon,{name:'check',size:12}):
            i===step?React.createElement('span',{className:'lstepper-m-dot-fill'}):null
          ),
          React.createElement('div',{className:'lstepper-m-item-text'},
            React.createElement('div',{className:'lstepper-m-item-title'},s.label),
            React.createElement('div',{className:'lstepper-m-item-hint'},s.hint)
          )
        ))
      )
    )
  );
}

function ConfirmModal({title,description,confirmLabel,cancelLabel,onConfirm,onCancel}){
  return React.createElement('div',{className:'lmodal-overlay',onClick:onCancel},
    React.createElement('div',{className:'lmodal-card',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'lmodal-rings'},
        React.createElement('span',{className:'lmodal-ring',style:{width:150,height:150,opacity:.5}}),
        React.createElement('span',{className:'lmodal-ring',style:{width:260,height:260,opacity:.35}}),
        React.createElement('span',{className:'lmodal-ring',style:{width:370,height:370,opacity:.2}}),
        React.createElement('span',{className:'lmodal-ring',style:{width:480,height:480,opacity:.1}})
      ),
      React.createElement('button',{type:'button',className:'lmodal-close','aria-label':'ปิด',onClick:onCancel},React.createElement(Icon,{name:'x',size:18})),
      React.createElement(FeaturedIcon,{size:'lg',color:'success',icon:React.createElement(Icon,{name:'check',size:22})}),
      React.createElement('h3',{className:'lmodal-title'},title),
      React.createElement('p',{className:'lmodal-desc'},description),
      React.createElement('div',{className:'lmodal-actions'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onCancel},cancelLabel||'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',onClick:onConfirm},confirmLabel||'ยืนยัน')
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

function EditableTitle({value,onChange}){
  const [editing,setEditing]=React.useState(false);
  const [draft,setDraft]=React.useState(value);
  const ref=React.useRef(null);
  React.useEffect(()=>{if(editing&&ref.current){ref.current.focus();ref.current.select();}},[editing]);
  function commit(){
    onChange(draft.trim()||value);
    setEditing(false);
  }
  if(editing){
    return React.createElement('input',{ref,className:'ltitle-edit-input',value:draft,
      onChange:e=>setDraft(e.target.value),onBlur:commit,
      onKeyDown:e=>{if(e.key==='Enter')commit();if(e.key==='Escape'){setDraft(value);setEditing(false);}}
    });
  }
  return React.createElement('h1',{className:'ltitle-editable',onDoubleClick:()=>{setDraft(value);setEditing(true);},title:'ดับเบิลคลิกเพื่อแก้ไขชื่อฟอร์ม'},
    value,
    React.createElement(Icon,{name:'edit',size:15,className:'ltitle-edit-icon'})
  );
}

function App(){
  const [step,setStep]=React.useState(0);
  const [savedSteps,setSavedSteps]=React.useState(()=>new Set());
  const [modal,setModal]=React.useState(null);
  const [guideOpen,setGuideOpen]=React.useState(false);
  const [formName,setFormName]=React.useState(window.LF_META.processName);
  const m=window.LF_META;
  const StepComponent=LF_STEPS[step].Component;
  const statusInfo=LF_STATUS_MAP[computeLfStatus(savedSteps.size,LF_STEPS.length)];
  function saveStep(){
    setModal({
      title:'ยืนยันการบันทึกข้อมูล',
      description:'ข้อมูลขั้นตอน "'+LF_STEPS[step].label+'" จะถูกบันทึก คุณยังสามารถกลับมาแก้ไขข้อมูลนี้ได้ภายหลัง',
      onConfirm:()=>{
        setSavedSteps(prev=>{const next=new Set(prev);next.add(step);return next;});
        setModal(null);
      }
    });
  }
  function saveAll(){
    setModal({
      title:'ยืนยันการบันทึกข้อมูลทั้งหมด',
      description:'ข้อมูลทุกขั้นตอนของ Learning Form นี้จะถูกบันทึก คุณยังสามารถกลับมาแก้ไขข้อมูลได้ภายหลัง',
      onConfirm:()=>{
        setSavedSteps(new Set(LF_STEPS.map((_,i)=>i)));
        setModal(null);
        window.location.href='/learning-form-overview';
      }
    });
  }
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'card ltitle-card'},
        React.createElement('div',{className:'ltitle-top'},
          React.createElement('div',{className:'ltitle-heading'},
            React.createElement(EditableTitle,{value:formName,onChange:setFormName}),
            React.createElement(Badge,{label:statusInfo.label,type:'pill-color',color:statusInfo.color,size:'sm'})
          ),
          React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'help-circle',size:16}),onClick:()=>setGuideOpen(true)},'คำอธิบายแบบฟอร์ม')
        ),
        React.createElement('div',{className:'ltitle-meta'},
          React.createElement('span',{className:'ltitle-meta-item'},m.division),
          React.createElement('span',{className:'ltitle-meta-divider'}),
          React.createElement('span',{className:'ltitle-meta-item'},'จัดทำเมื่อวันที่ '+m.createdDate)
        )
      ),
      React.createElement('div',{className:'lstep-layout'},
        React.createElement(Stepper,{step,setStep,savedSteps}),
        React.createElement('div',{className:'lstep-main'},
          React.createElement(StepComponent),
          React.createElement('div',{className:'lstep-nav'},
            React.createElement(Button,{variant:'secondary',size:'md',isDisabled:step===0,leadingIcon:React.createElement(Icon,{name:'chevron-left',size:16}),onClick:()=>setStep(s=>Math.max(0,s-1))},'ย้อนกลับ'),
            React.createElement('span',{className:'lstep-nav-count'},'ขั้นตอน '+(step+1)+' / '+LF_STEPS.length+(savedSteps.has(step)?' · บันทึกแล้ว':'')),
            React.createElement('div',{className:'lstep-nav-right'},
              React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'check',size:16}),onClick:saveStep},savedSteps.has(step)?'บันทึกอีกครั้ง':'บันทึก'),
              step<LF_STEPS.length-1?React.createElement(Button,{variant:'primary',size:'md',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>setStep(s=>Math.min(LF_STEPS.length-1,s+1))},'ถัดไป'):
              React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'check',size:16}),onClick:saveAll},'บันทึกทั้งหมด')
            )
          )
        )
      )
    ),
    modal&&React.createElement(ConfirmModal,{...modal,onCancel:()=>setModal(null)}),
    guideOpen&&React.createElement(FormGuideModal,{onClose:()=>setGuideOpen(false)})
  );
}

export default App;
