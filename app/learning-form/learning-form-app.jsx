import Image from 'next/image';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
pdfjs.GlobalWorkerOptions.workerSrc='https://unpkg.com/pdfjs-dist@'+pdfjs.version+'/build/pdf.worker.min.mjs';
const {Button,Badge,InputField,Textarea,Radio,Checkbox,Avatar}=window.DesignSystem_cbd181;
const MAX_DIAGRAM_FILE_SIZE=25*1024*1024;

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
          React.createElement(Avatar,{variant:'image',size:'md',src:window.LF_AVATARS[person.empId]||('https://i.pravatar.cc/64?u='+person.empId),alt:person.name,className:'lperson-avatar'}),
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
                React.createElement(Avatar,{variant:'image',size:'md',src:window.LF_AVATARS[p.empId]||('https://i.pravatar.cc/64?u='+p.empId),alt:p.name,className:'lperson-avatar'}),
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

function ProcessObjectiveList(){
  const [objectives,setObjectives]=React.useState(window.LF_BA_PROCESS_OPTIONS.map(o=>o.objective||''));
  function update(i,v){setObjectives(objectives.map((o,idx)=>idx===i?v:o));}
  return React.createElement('div',{className:'lmeta-field lmeta-field--wide'},
    React.createElement('div',{className:'lprocobj-headrow'},
      React.createElement('span',{className:'lfield-label'},'ชื่อกระบวนการ'),
      React.createElement('span',{className:'lfield-label'},'วัตถุประสงค์ของกระบวนการ')
    ),
    window.LF_BA_PROCESS_OPTIONS.map((o,i)=>React.createElement('div',{key:o.key,className:'lprocobj-row'},
      React.createElement('div',{className:'lprocobj-name'},
        React.createElement('span',{className:'lba-process-num'},i+1),
        React.createElement('span',null,o.label)
      ),
      React.createElement(Textarea,{size:'md',placeholder:'ระบุวัตถุประสงค์',value:objectives[i],onChange:v=>update(i,v),rows:2})
    ))
  );
}

function PdfPreviewModal({file,onClose}){
  const [numPages,setNumPages]=React.useState(0);
  const [pageNum,setPageNum]=React.useState(1);
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card lpdf-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'lpdf-modal-head'},
        React.createElement('span',{className:'lpdf-modal-title'},file.name),
        React.createElement('div',{className:'lpdf-modal-actions'},
          React.createElement('a',{className:'lpdf-modal-download',href:file.url,download:file.name,'aria-label':'ดาวน์โหลด'},React.createElement(Icon,{name:'download-01',size:16}),'ดาวน์โหลด'),
          React.createElement('button',{className:'lpdf-modal-close',onClick:onClose,'aria-label':'ปิด'},React.createElement(Icon,{name:'x',size:18}))
        )
      ),
      React.createElement('div',{className:'lpdf-modal-body'},
        React.createElement(Document,{file:file.url,onLoadSuccess:info=>{setNumPages(info.numPages);setPageNum(1);},loading:React.createElement('div',{className:'lpdf-loading'},'กำลังโหลด PDF...'),error:React.createElement('div',{className:'lpdf-loading'},'ไม่สามารถแสดงไฟล์ PDF นี้ได้')},
          React.createElement(Page,{pageNumber:pageNum,width:800})
        )
      ),
      numPages>1&&React.createElement('div',{className:'lpdf-modal-nav'},
        React.createElement(Button,{variant:'secondary',size:'sm',isDisabled:pageNum<=1,onClick:()=>setPageNum(p=>p-1)},'ก่อนหน้า'),
        React.createElement('span',{className:'lpdf-modal-page'},'หน้า '+pageNum+' / '+numPages),
        React.createElement(Button,{variant:'secondary',size:'sm',isDisabled:pageNum>=numPages,onClick:()=>setPageNum(p=>p+1)},'ถัดไป')
      )
    )
  );
}

function DiagramUploadSection({title,hint,redNote}){
  const [files,setFiles]=React.useState([]);
  const [error,setError]=React.useState('');
  const [lightboxIndex,setLightboxIndex]=React.useState(-1);
  const [pdfPreview,setPdfPreview]=React.useState(null);
  function onPick(e){
    const picked=Array.from(e.target.files||[]);
    e.target.value='';
    const oversized=picked.filter(f=>f.size>MAX_DIAGRAM_FILE_SIZE);
    const accepted=picked.filter(f=>f.size<=MAX_DIAGRAM_FILE_SIZE);
    setError(oversized.length?'ไฟล์ขนาดเกิน 25 MB ไม่ถูกอัปโหลด: '+oversized.map(f=>f.name).join(', '):'');
    const list=accepted.map(f=>({name:f.name,url:URL.createObjectURL(f),isPdf:f.type==='application/pdf'||f.name.toLowerCase().endsWith('.pdf')}));
    setFiles(prev=>[...prev,...list]);
  }
  function removeFile(i){setFiles(files.filter((_,idx)=>idx!==i));}
  const imageFiles=files.filter(f=>!f.isPdf);
  function openPreview(f){
    if(f.isPdf){setPdfPreview(f);}
    else{
      const imgIndex=imageFiles.indexOf(f);
      setLightboxIndex(imgIndex<0?0:imgIndex);
    }
  }
  return React.createElement(SectionCard,{title,hint},
    redNote&&React.createElement('p',{className:'ldiagram-rednote'},React.createElement(Icon,{name:'alert-triangle',size:16}),redNote),
    React.createElement('label',{className:'ldiagram-drop'},
      React.createElement(Icon,{name:'upload',size:22}),
      React.createElement('span',null,'อัปโหลดรูปภาพหรือเอกสารแผนภาพกระบวนการ'),
      React.createElement('span',{className:'ldiagram-drop-hint'},'รองรับ PNG, JPG, PDF ขนาดไม่เกิน 25 MB ต่อไฟล์ (คลิกเพื่อเลือกไฟล์)'),
      React.createElement('input',{type:'file',accept:'image/*,application/pdf',multiple:true,onChange:onPick,style:{display:'none'}})
    ),
    error&&React.createElement('p',{className:'ldiagram-error'},React.createElement(Icon,{name:'alert-triangle',size:14}),error),
    files.length>0&&React.createElement('div',{className:'ldiagram-preview-grid'},
      files.map((f,i)=>React.createElement('div',{key:i,className:'ldiagram-preview',onClick:()=>openPreview(f)},
        f.isPdf?React.createElement('div',{className:'ldiagram-preview-pdf'},React.createElement(Icon,{name:'file-text',size:28})):React.createElement('img',{src:f.url,alt:f.name}),
        React.createElement('div',{className:'ldiagram-preview-name'},f.name),
        React.createElement('button',{className:'ldiagram-preview-remove',onClick:e=>{e.stopPropagation();removeFile(i);}},React.createElement(Icon,{name:'x',size:14}))
      ))
    ),
    React.createElement(Lightbox,{
      open:lightboxIndex>=0,
      close:()=>setLightboxIndex(-1),
      index:lightboxIndex<0?0:lightboxIndex,
      slides:imageFiles.map(f=>({src:f.url,title:f.name})),
      plugins:[Zoom,Download]
    }),
    pdfPreview&&React.createElement(PdfPreviewModal,{file:pdfPreview,onClose:()=>setPdfPreview(null)})
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
    hint:'แผนภาพกระบวนการหลังการปรับปรุงและนำมาใช้ในการดำเนินการประจำปีถัดไป ซึ่งเกิดจากการกำหนดการพัฒนา/ปรับปรุงในส่วนที่ 3 (ถ้ามี)',
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
      React.createElement(ProcessObjectiveList),
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

function MetricCard({item,onChange,slaLabel}){
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
  const [open,setOpen]=React.useState(true);
  const hasTarget=String(item.target||'').trim()!=='';
  const hasResult=String(item.result2568||'').trim()!=='';
  const isComplete=pointType==='control'
    ?hasTarget&&hasResult&&(item.controlCriteria||[]).length>0&&String(item.controlFix||'').trim()!==''
    :hasTarget&&hasResult;
  return React.createElement('div',{className:'card lmetric-card'},
    React.createElement('button',{type:'button',className:'lmetric-toggle',onClick:()=>setOpen(!open)},
      React.createElement('div',{className:'lmetric-toggle-text'},
        item.subProcess&&React.createElement('div',{className:'lmetric-subproc'},item.subProcess),
        React.createElement('div',{className:'lmetric-metric-block'},
          React.createElement('span',{className:'lfield-label'},slaLabel||'ตัวชี้วัด'),
          React.createElement('p',{className:'lmetric-name'},item.metric)
        )
      ),
      React.createElement('span',{className:'lpoint-acc-right'},
        React.createElement(Badge,{size:'sm',type:'pill-color',color:isComplete?'success':'warning',icon:isComplete?'check':undefined,label:isComplete?'ครบแล้ว':'ยังไม่ครบ'}),
        React.createElement(Icon,{name:open?'chevron-up':'chevron-down',size:20})
      )
    ),
    open&&React.createElement('div',{className:'lmetric-body'},
      React.createElement('span',{className:'lfield-label lfield-label-lg'},'ผลการดำเนินงานตามตัวชี้วัด'),
      React.createElement('div',{className:'lmetric-stats'},
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label lstat-label-purple'},'เป้าหมายปี 2569',React.createElement('span',{className:'lc-required'},' *')),React.createElement(InputField,{fieldType:'default',size:'sm',value:item.target,onChange:v=>set('target',v)})),
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label lstat-label-purple'},'ผล 2569',React.createElement('span',{className:'lc-required'},' *')),React.createElement(InputField,{fieldType:'default',size:'sm',value:item.result2568,onChange:v=>set('result2568',v)})),
        React.createElement('div',{className:'lstat lstat-readonly'},React.createElement('span',{className:'lstat-label'},'ผล 2568'),React.createElement('span',{className:'lstat-value'},item.result2567)),
        React.createElement('div',{className:'lstat lstat-readonly'},React.createElement('span',{className:'lstat-label'},'ผล 2567'),React.createElement('span',{className:'lstat-value'},item.result2566))
      ),
      React.createElement('span',{className:'lfield-label lfield-label-lg'},'ผลการดำเนินของคู่แข่ง/คู่เทียบ'),
      React.createElement('div',{className:'lmetric-stats'},
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label lstat-label-purple'},'เป้าหมายปี 2569'),React.createElement(InputField,{fieldType:'default',size:'sm',value:item.competitorTarget||'',onChange:v=>set('competitorTarget',v)})),
        React.createElement('div',{className:'lstat'},React.createElement('span',{className:'lstat-label lstat-label-purple'},'ผล 2569'),React.createElement(InputField,{fieldType:'default',size:'sm',value:item.competitorResult||'',onChange:v=>set('competitorResult',v)}))
      ),
      React.createElement('div',{className:'lissue-parent-label'},'ประเด็นพิจารณาผลการดำเนินงานตามตัวชี้วัด'),
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
  const [tab,setTab]=React.useState(window.LF_BA_PROCESS_OPTIONS[0].label);
  function updateLeading(next){setLeading(leading.map(i=>i.id===next.id?next:i));}
  function updateLagging(next){setLagging(lagging.map(i=>i.id===next.id?next:i));}
  return React.createElement(SectionCard,{title:'ส่วนที่ 2.1 — ผลการดำเนินงานตามตัวชี้วัด (ย้อนหลัง 3 ปี)'},
    React.createElement('div',{className:'lmetric-tabs'},
      window.LF_BA_PROCESS_OPTIONS.map(o=>React.createElement('button',{key:o.key,type:'button',className:'lmetric-tab'+(tab===o.label?' is-active':''),onClick:()=>setTab(o.label)},o.label))
    ),
    React.createElement('div',{className:'lmetric-list'},
      React.createElement('div',{className:'lmetric-group lmetric-group--leading'},
        React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิภาพ / ตัวชี้วัดนำ (Leading)'),
        leading.filter(i=>i.step===tab).map(item=>React.createElement(MetricCard,{key:item.id,item,onChange:updateLeading}))
      ),
      React.createElement('div',{className:'lmetric-group lmetric-group--lagging'},
        React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิผล / ตัวชี้วัดตาม (Lagging)'),
        lagging.filter(i=>i.step===tab).map(item=>React.createElement(MetricCard,{key:item.id,item,slaLabel:'ตัวชี้วัดกระบวนการ (ระดับฝ่าย)',onChange:updateLagging}))
      )
    )
  );
}

const ADEQUACY_OPTIONS=[{key:'sufficient',label:'1. เพียงพอ'},{key:'insufficient',label:'2. ไม่เพียงพอ'}];

function PointFormCard({kind}){
  const isControl=kind==='control';
  const [step,setStep]=React.useState('');
  const [analysisKey,setAnalysisKey]=React.useState('');
  const [detail,setDetail]=React.useState('');
  const [open,setOpen]=React.useState(!isControl);
  const baseFilled=String(step||'').trim()!=='';
  const analysisFilled=analysisKey==='sufficient'?true:(analysisKey==='insufficient'?String(detail||'').trim()!=='':false);
  const complete=baseFilled&&analysisFilled;
  return React.createElement('div',{className:'lpoint-acc'},
    React.createElement('button',{type:'button',className:'lpoint-acc-head',onClick:()=>setOpen(!open)},
      React.createElement('span',{className:'lpoint-acc-titlewrap'},
        React.createElement('span',{className:'lpoint-acc-title'},isControl?'Control Point':'Critical Point',React.createElement('span',{className:'lc-required'},' *')),
        React.createElement('span',{className:'lpoint-acc-sub'},isControl?'จุดที่ต้องควบคุมให้เป็นไปตามเกณฑ์/มาตรฐาน — กรอกให้ครบทุกช่องก่อนบันทึก':'จุดที่ส่งผลสำคัญต่อผลลัพธ์ของกระบวนการ — กรอกให้ครบทุกช่องก่อนบันทึก')
      ),
      React.createElement('span',{className:'lpoint-acc-right'},
        React.createElement(Badge,{size:'sm',type:'pill-color',color:complete?'success':'warning',icon:complete?'check':undefined,label:complete?'ครบแล้ว':'ยังไม่ครบ'}),
        React.createElement(Icon,{name:open?'chevron-up':'chevron-down',size:20})
      )
    ),
    open&&React.createElement('div',{className:'card lmetric-card'},
      React.createElement(Textarea,{label:'ขั้นตอน',placeholder:'ระบุขั้นตอน',value:step,onChange:setStep}),
      React.createElement('div',{className:'lmetric-body'},
        React.createElement('div',{className:'lissue-parent-label'},'การประเมินการควบคุมภายใน'),
        React.createElement('div',{className:'lmetric-pbar'},
          React.createElement('div',{className:'lmetric-pbar-head'},'ผลการวิเคราะห์'),
          React.createElement('div',{className:'lmetric-pbar-body'},
            React.createElement('div',{className:'lcheck-group'},
              ADEQUACY_OPTIONS.map(o=>React.createElement(Radio,{key:o.key,size:'sm',label:o.label,isChecked:analysisKey===o.key,onChange:()=>setAnalysisKey(o.key)}))
            ),
            analysisKey==='insufficient'&&React.createElement(Textarea,{label:'รายละเอียด',placeholder:'ระบุรายละเอียด',value:detail,onChange:setDetail})
          )
        )
      )
    )
  );
}

function PointSection(){
  return React.createElement(SectionCard,{
    title:'ส่วนที่ 2.2 — การระบุ Critical Point และ Control Point',
    hint:'ระบุจุดที่ส่งผลสำคัญต่อผลลัพธ์ และจุดที่ต้องควบคุมให้เป็นไปตามเกณฑ์ — จำเป็นต้องกรอกทั้งสองส่วน'},
    React.createElement('div',{className:'lpoint-wrap'},
      React.createElement(PointFormCard,{kind:'critical'}),
      React.createElement(PointFormCard,{kind:'control'})
    )
  );
}

function CheckDropdown({options,value,onChange,placeholder}){
  const [open,setOpen]=React.useState(false);
  const ref=React.useRef(null);
  React.useEffect(()=>{
    function onDocClick(e){if(ref.current&&!ref.current.contains(e.target))setOpen(false);}
    document.addEventListener('mousedown',onDocClick);
    return ()=>document.removeEventListener('mousedown',onDocClick);
  },[]);
  const selected=value||[];
  function toggle(key){onChange(selected.includes(key)?selected.filter(k=>k!==key):[...selected,key]);}
  const labelText=selected.length?options.filter(o=>selected.includes(o.key)).map(o=>o.label).join(', '):(placeholder||'เลือก');
  return React.createElement('div',{className:'lprocess-multiselect',ref},
    React.createElement('button',{type:'button',className:'lprocess-multiselect-trigger',onClick:()=>setOpen(o=>!o)},
      React.createElement('span',{className:'lprocess-multiselect-label'},labelText),
      React.createElement(Icon,{name:open?'chevron-up':'chevron-down',size:16})
    ),
    open&&React.createElement('div',{className:'lprocess-multiselect-panel'},
      options.map(o=>React.createElement(Checkbox,{key:o.key,size:'sm',label:o.label,isChecked:selected.includes(o.key),onChange:()=>toggle(o.key)}))
    )
  );
}

function IssueCard({item,onChange}){
  function set(field,value){onChange({...item,[field]:value});}
  const yearOptions=Array.from({length:9},(_,i)=>2569+i);
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
        React.createElement(CheckDropdown,{options:[...window.LF_BA_PROCESS_OPTIONS.map(o=>({key:o.key,label:o.label})),{key:'other',label:'อื่นๆ'}],value:item.improveProcesses,onChange:v=>set('improveProcesses',v),placeholder:'เลือกกระบวนการ'})
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
  const [qirGroups,setQirGroups]=React.useState([{id:Date.now(),issueText:'',processKey:window.LF_BA_PROCESS_OPTIONS[0].key,rows:window.LF_QIR_ACTIVITIES.map(r=>({...r}))}]);
  function updateIssue(next){setIssues(issues.map(i=>i.key===next.key?next:i));}
  function setGroupIssueText(gid,text){setQirGroups(qirGroups.map(g=>g.id===gid?{...g,issueText:text}:g));}
  function setGroupProcess(gid,key){setQirGroups(qirGroups.map(g=>g.id===gid?{...g,processKey:key}:g));}
  function updateQir(gid,rid,field,value){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.map(r=>r.id===rid?{...r,[field]:value}:r)}));}
  function addQirRow(gid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:[...g.rows,{id:Date.now(),activity:'',weight:0,saved:false}]}));}
  function removeQirRow(gid,rid){setQirGroups(qirGroups.map(g=>g.id!==gid?g:{...g,rows:g.rows.filter(r=>r.id!==rid)}));}
  function addGroup(){setQirGroups([...qirGroups,{id:Date.now(),issueText:'',processKey:window.LF_BA_PROCESS_OPTIONS[0].key,rows:[{id:Date.now()+1,activity:'',weight:0,saved:false}]}]);}
  function duplicateGroup(gid){
    const g=qirGroups.find(x=>x.id===gid);
    if(!g)return;
    const idx=qirGroups.findIndex(x=>x.id===gid);
    const copy={id:Date.now(),issueText:g.issueText,processKey:g.processKey,rows:g.rows.map((r,i)=>({...r,id:Date.now()+i+1,saved:false}))};
    const next=[...qirGroups];
    next.splice(idx+1,0,copy);
    setQirGroups(next);
  }
  function removeGroup(gid){setQirGroups(qirGroups.filter(g=>g.id!==gid));}
  return React.createElement(React.Fragment,null,
    React.createElement(SectionCard,{title:'ส่วนที่ 3 — ประเด็นพิจารณาสำหรับการประเมินและปรับปรุงกระบวนการและจัดลำดับความสำคัญของแนวทางการพัฒนา/ปรับปรุง',hint:'ต้องเลือกอย่างน้อย 1 ประเด็นพิจารณา'},
      issues.map(item=>React.createElement(IssueCard,{key:item.key,item,onChange:updateIssue}))
    ),
    React.createElement('div',{className:'lqir-spacer'}),
    React.createElement(SectionCard,{title:'QIR — บันทึกกิจกรรมที่จะดำเนินการ',hint:'จัดกลุ่มตามกิจกรรมตามข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)',
      action:React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addGroup},'เพิ่ม QIR')},
      qirGroups.map((g,gi)=>{
        const qirTotal=g.rows.reduce((s,r)=>s+(Number(r.weight)||0),0);
        return React.createElement('div',{key:g.id,className:'lqir-group'},
          React.createElement('div',{className:'lqir-group-head'},
            React.createElement('div',{className:'lqir-group-select'},
              React.createElement('span',{className:'lfield-label'},'ข้อเสนอโอกาสในการปรับปรุงกระบวนการ (QIR)'),
              React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:'ระบุข้อเสนอโอกาสในการปรับปรุงกระบวนการ',value:g.issueText,onChange:v=>setGroupIssueText(g.id,v)})
            ),
            React.createElement('div',{className:'lqir-group-actions'},
              React.createElement(Button,{variant:'secondary',size:'sm',leadingIcon:React.createElement(Icon,{name:'copy-01',size:14}),onClick:()=>duplicateGroup(g.id)},'ทำซ้ำกลุ่มนี้'),
              qirGroups.length>1&&React.createElement(Button,{variant:'secondary-destructive',size:'sm',onClick:()=>removeGroup(g.id)},'ลบกลุ่ม')
            )
          ),
          React.createElement('div',{className:'lqir-group-select lqir-group-select--process'},
            React.createElement('span',{className:'lfield-label'},'สอดคล้องกับกระบวนการ'),
            React.createElement('select',{className:'lqir-issue-select',value:g.processKey,onChange:e=>setGroupProcess(g.id,e.target.value)},
              window.LF_BA_PROCESS_OPTIONS.map(o=>React.createElement('option',{key:o.key,value:o.key},o.label))
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
                qirTotal===100?'น้ำหนักรวมครบ 100':'ยังไม่ครบ'
              )
            )
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
  const [leading,setLeading]=React.useState([]);
  const [lagging,setLagging]=React.useState([]);
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
  const hasNext=leading.length>0||lagging.length>0;
  return React.createElement(React.Fragment,null,
  React.createElement(SectionCard,{title:'ส่วนที่ 5 — การกำหนดตัวชี้วัดและเป้าหมายของกระบวนการ ประจำปี'},
    React.createElement('div',{className:'lnextyear-card'},
      React.createElement('div',{className:'lnextyear-block-head'},
        React.createElement('h4',{className:'lnextyear-block-title'},'ปีปัจจุบัน')
      ),
      React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิภาพ / ตัวชี้วัดนำ (Leading)'),
      React.createElement('table',{className:'ltable'},
        React.createElement('thead',null,React.createElement('tr',null,['ขั้นตอน','ตัวชี้วัด','เป้าหมายปัจจุบัน'].map((h,i)=>React.createElement('th',{key:i},h)))),
        React.createElement('tbody',null,window.LF_LEADING_METRICS.map(r=>React.createElement('tr',{key:r.id},
          React.createElement('td',null,r.subProcess),React.createElement('td',null,r.metric),React.createElement('td',null,r.target)
        )))
      ),
      React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิผล / ตัวชี้วัดตาม (Lagging)'),
      React.createElement('table',{className:'ltable'},
        React.createElement('thead',null,React.createElement('tr',null,['ขั้นตอน','ตัวชี้วัด','เป้าหมายปัจจุบัน'].map((h,i)=>React.createElement('th',{key:i},h)))),
        React.createElement('tbody',null,window.LF_LAGGING_METRICS.map(r=>React.createElement('tr',{key:r.id},
          React.createElement('td',null,r.subProcess),React.createElement('td',null,r.metric),React.createElement('td',null,r.target)
        )))
      )
    ),
    React.createElement('div',{className:'lqir-spacer'}),
    React.createElement('div',{className:'lnextyear-card'},
      React.createElement('div',{className:'lnextyear-block-head'},
        React.createElement('h4',{className:'lnextyear-block-title'},'ปีถัดไป'),
        hasNext&&React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>setModalOpen(true)},'เพิ่มตัวชี้วัด')
      ),
      !hasNext&&React.createElement('div',{className:'lnextyear-empty'},
        React.createElement(Image,{src:'/assets/target.png',alt:'',width:56,height:56,className:'lnextyear-empty-icon'}),
        React.createElement('span',{className:'lnextyear-empty-text'},'ยังไม่มีการกำหนดตัวชี้วัดปีถัดไป — จะเพิ่มหรือไม่เพิ่มก็ได้ หากไม่เพิ่ม ระบบจะใช้ตัวชี้วัดและเป้าหมายเดิมเหมือนปีปัจจุบัน'),
        React.createElement(Button,{variant:'primary',size:'sm',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:()=>setModalOpen(true)},'เพิ่มตัวชี้วัด')
      ),
      leading.length>0&&React.createElement(React.Fragment,null,
        React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิภาพ / ตัวชี้วัดนำ (Leading)'),
        React.createElement('table',{className:'ltable'},
          React.createElement('thead',null,React.createElement('tr',null,['ขั้นตอน','ตัวชี้วัด','เป้าหมายปีถัดไป',''].map((h,i)=>React.createElement('th',{key:i},h)))),
          React.createElement('tbody',null,leading.map(r=>React.createElement('tr',{key:r.id},
            React.createElement('td',null,r.step),React.createElement('td',null,r.metric),React.createElement('td',null,r.target),
            React.createElement('td',null,React.createElement(Button,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>removeLeading(r.id)},'ลบ'))
          )))
        )
      ),
      lagging.length>0&&React.createElement(React.Fragment,null,
        React.createElement('div',{className:'lmetric-group-label'},'ตัวชี้วัดประสิทธิผล / ตัวชี้วัดตาม (Lagging)'),
        React.createElement('table',{className:'ltable'},
          React.createElement('thead',null,React.createElement('tr',null,['ขั้นตอน','ตัวชี้วัด','เป้าหมายปีถัดไป',''].map((h,i)=>React.createElement('th',{key:i},h)))),
          React.createElement('tbody',null,lagging.map(r=>React.createElement('tr',{key:r.id},
            React.createElement('td',null,r.step),React.createElement('td',null,r.metric),React.createElement('td',null,r.target),
            React.createElement('td',null,React.createElement(Button,{variant:'tertiary',size:'sm',leadingIcon:React.createElement(Icon,{name:'trash',size:14}),onClick:()=>removeLagging(r.id)},'ลบ'))
          )))
        )
      )
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
  const LOCATIONS=[{key:'kmsi',label:'KM-Si'},{key:'kmcs',label:'KMCS'},{key:'other',label:'อื่นๆ'}];
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
  function updateEntry(id,field,value){set('entries',(item.entries||[]).map(e=>e.id===id?{...e,[field]:value}:e));}
  function addEntry(){set('entries',[...(item.entries||[]),{id:Date.now(),knowType:'existing',name:'',location:[],locationOther:''}]);}
  function removeEntry(id){set('entries',(item.entries||[]).filter(e=>e.id!==id));}
  return React.createElement('div',{className:'card lknow-card2'},
    React.createElement('div',{className:'lknow-section lknow-section--fill'},
      React.createElement('span',{className:'lknow-section-head'},'1. หัวข้อองค์ความรู้'),
      React.createElement('div',{className:'lknow-table-scroll'},
      React.createElement('table',{className:'ltable lknow-table'},
        React.createElement('thead',null,React.createElement('tr',null,
          React.createElement('th',null,'รายการ'),
          React.createElement('th',null,'ประเภทองค์ความรู้'),
          React.createElement('th',{className:'lknow-name-col'},'ระบุชื่อหัวข้อองค์ความรู้'),
          React.createElement('th',null,'ที่อยู่จัดเก็บ'),
          React.createElement('th',null)
        )),
        React.createElement('tbody',null,(item.entries||[]).map((e,i)=>{
          const namePlaceholder=e.knowType==='new'?'ระบุหัวข้อองค์ความรู้':'ระบุชื่อองค์ความรู้ในระบบ KM-Si (Content ID)';
          return React.createElement('tr',{key:e.id},
            React.createElement('td',null,i+1),
            React.createElement('td',null,
              React.createElement('select',{className:'lqir-issue-select',value:e.knowType,onChange:ev=>updateEntry(e.id,'knowType',ev.target.value)},
                React.createElement('option',{value:'existing'},'องค์ความรู้เดิม'),
                React.createElement('option',{value:'new'},'องค์ความรู้ใหม่')
              )
            ),
            React.createElement('td',{className:'lknow-name-col'},React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:namePlaceholder,value:e.name,onChange:v=>updateEntry(e.id,'name',v)})),
            React.createElement('td',null,
              React.createElement(CheckDropdown,{options:LOCATIONS,value:e.location,onChange:v=>updateEntry(e.id,'location',v),placeholder:'เลือกที่อยู่จัดเก็บ'}),
              (e.location||[]).includes('other')&&React.createElement('div',{className:'lknow-loc-other-input'},
                React.createElement(InputField,{fieldType:'default',size:'sm',placeholder:'ระบุ',value:e.locationOther,onChange:v=>updateEntry(e.id,'locationOther',v)})
              )
            ),
            React.createElement('td',null,(item.entries||[]).length>1&&React.createElement('button',{className:'lqir-remove',onClick:()=>removeEntry(e.id)},React.createElement(Icon,{name:'x',size:15})))
          );
        }))
      )
      ),
      React.createElement(Button,{variant:'tertiary',size:'sm',className:'lfc-btn-purple',leadingIcon:React.createElement(Icon,{name:'plus',size:14}),onClick:addEntry},'เพิ่มองค์ความรู้')
    ),
    React.createElement('div',{className:'lknow-section lknow-section--fill'},
      React.createElement('span',{className:'lknow-section-head'},'2. รูปแบบ/วิธีการในการแลกเปลี่ยนเรียนรู้'),
      React.createElement('div',{className:'lcheck-group lcheck-group--2col'},
        METHODS.map(o=>React.createElement(Checkbox,{key:o.key,size:'sm',label:o.label,isChecked:(item.methods||[]).includes(o.key),onChange:()=>toggleList('methods',o.key)}))
      )
    ),
    React.createElement('div',{className:'lknow-section lknow-section--fill'},
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
    id:r.id,
    entries:[{id:Date.now()+r.id,knowType:r.type==='existing'?'existing':'new',name:r.type==='existing'?(r.contentId||''):(r.topic||''),location:r.type==='existing'?['kmsi']:[],locationOther:''}],
    methods:[],outcomes:[],outcomesOther:'',before:'',after:''
  })));
  function update(next){setRows(rows.map(r=>r.id===next.id?next:r));}
  function addRow(){setRows([...rows,{id:Date.now(),entries:[{id:Date.now()+1,knowType:'existing',name:'',location:[],locationOther:''}],methods:[],outcomes:[],outcomesOther:'',before:'',after:''}]);}
  return React.createElement(SectionCard,{title:'ส่วนที่ 6 — องค์ความรู้ที่ใช้ / องค์ความรู้ใหม่ที่เกิดขึ้นจากการปรับปรุงกระบวนการ'},
    rows.map(item=>React.createElement(KnowledgeCard,{key:item.id,item,onChange:update}))
  );
}

const LF_STEPS=[
{key:'meta',label:'ข้อมูลพื้นฐาน',hint:'กรอกข้อมูลพื้นฐานของกระบวนการและผู้เกี่ยวข้อง',Component:MetaSection},
{key:'diagram-before',label:'แผนภาพก่อนปรับปรุง',hint:'แนบแผนภาพกระบวนการก่อนการปรับปรุง (Work Flow/SIPOC)',Component:DiagramBeforeSection},
{key:'effectiveness',label:'ผลการดำเนินงานตามตัวชี้วัด',hint:'ทบทวนผลการดำเนินงานตามตัวชี้วัดย้อนหลัง 3 ปี และระบุ Critical/Control Point',Component:function(){return React.createElement(React.Fragment,null,React.createElement(EffectivenessSection,null),React.createElement('div',{className:'lqir-spacer'}),React.createElement(PointSection,null));}},
{key:'issues',label:'ประเด็นพิจารณา',hint:'ระบุประเด็นพิจารณาสำหรับการปรับปรุงกระบวนการ และบันทึกกิจกรรม QIR',Component:IssuesPrioritiesSection},
{key:'diagram-after',label:'ผลการปรับปรุงกระบวนการ',hint:'แนบแผนภาพกระบวนการหลังการปรับปรุง',Component:DiagramAfterSection},
{key:'nextyear',label:'ตัวชี้วัดปีถัดไป',hint:'กำหนดตัวชี้วัดและเป้าหมายสำหรับปีถัดไป',Component:NextYearMetricsSection},
{key:'knowledge',label:'องค์ความรู้',hint:'บันทึกองค์ความรู้เดิมและองค์ความรู้ใหม่',Component:KnowledgeSection}
];

function Stepper({step,setStep}){
  return React.createElement('div',{className:'lstepper'},
    LF_STEPS.map((s,i)=>React.createElement('button',{key:s.key,type:'button',className:'lstepper-item'+(i===step?' is-active':'')+(i<step?' is-done':''),onClick:()=>setStep(i)},
      React.createElement('span',{className:'lstepper-num'},i<step?React.createElement(Icon,{name:'check',size:13}):i),
      React.createElement('span',{className:'lstepper-label'},s.label)
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

function ExportPdfModal({onClose,onConfirm}){
  const [selected,setSelected]=React.useState(LF_STEPS.map(s=>s.key));
  function toggle(key){setSelected(sel=>sel.includes(key)?sel.filter(k=>k!==key):[...sel,key]);}
  const allChecked=selected.length===LF_STEPS.length;
  function toggleAll(){setSelected(allChecked?[]:LF_STEPS.map(s=>s.key));}
  const ordered=LF_STEPS.filter(s=>selected.includes(s.key)).map(s=>s.key);
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card lexport-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'modal-head'},
        React.createElement('h3',null,'เลือกขั้นตอนที่ต้องการ Export PDF'),
        React.createElement('button',{className:'lfa-modal-close',onClick:onClose},React.createElement(Icon,{name:'x',size:18}))
      ),
      React.createElement('div',{className:'lmodal-body'},
        React.createElement('p',{className:'lexport-modal-hint'},'ระบบจะรวมขั้นตอนที่เลือกเป็นไฟล์ PDF เดียว โดยแต่ละขั้นตอนจะขึ้นหน้าใหม่'),
        React.createElement('div',{className:'lexport-check lexport-check--all'},
          React.createElement(Checkbox,{size:'sm',label:'เลือกทั้งหมด',isChecked:allChecked,onChange:toggleAll})
        ),
        React.createElement('div',{className:'lexport-check-list'},
          LF_STEPS.map((s,i)=>React.createElement('div',{key:s.key,className:'lexport-check'},
            React.createElement(Checkbox,{size:'sm',label:(i+1)+'. '+s.label,isChecked:selected.includes(s.key),onChange:()=>toggle(s.key)})
          ))
        )
      ),
      React.createElement('div',{className:'lmodal-foot'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',isDisabled:ordered.length===0,leadingIcon:React.createElement(Icon,{name:'download-01',size:16}),onClick:()=>onConfirm(ordered)},'Export PDF ('+ordered.length+')')
      )
    )
  );
}

function SaveAllConfirmModal({onClose,onConfirm}){
  return React.createElement('div',{className:'modal-overlay',onClick:onClose},
    React.createElement('div',{className:'modal-card lsaveconfirm-modal',onClick:e=>e.stopPropagation()},
      React.createElement('div',{className:'lsaveconfirm-body'},
        React.createElement('span',{className:'lsaveconfirm-icon'},React.createElement(Icon,{name:'check-circle',size:28})),
        React.createElement('h3',null,'ยืนยันบันทึกการประเมินและปรับปรุงกระบวนการ',React.createElement('br',null),'ประจำปี 2569'),
        React.createElement('p',null,'ระบบจะบันทึกข้อมูลทุกส่วนของแบบฟอร์มนี้ หลังจากกดยืนยันยังสามารถแก้ไขข้อมูลในขั้นตอนนี้ได้อีก')
      ),
      React.createElement('div',{className:'lmodal-foot'},
        React.createElement(Button,{variant:'secondary',size:'md',onClick:onClose},'ยกเลิก'),
        React.createElement(Button,{variant:'primary',size:'md',onClick:onConfirm},'ยืนยัน')
      )
    )
  );
}

function App(){
  const [year,setYear]=React.useState(window.LF_META.year);
  const [step,setStep]=React.useState(0);
  const [guideOpen,setGuideOpen]=React.useState(false);
  const [draftToast,setDraftToast]=React.useState(null);
  const [saveConfirmOpen,setSaveConfirmOpen]=React.useState(false);
  const [exporting,setExporting]=React.useState(false);
  const [exportToast,setExportToast]=React.useState(null);
  const [exportModalOpen,setExportModalOpen]=React.useState(false);
  const [pendingExport,setPendingExport]=React.useState(null);
  const stepContentRef=React.useRef(null);
  const exportRef=React.useRef(null);
  React.useEffect(()=>{if(!draftToast)return;const t=setTimeout(()=>setDraftToast(null),2200);return()=>clearTimeout(t);},[draftToast]);
  React.useEffect(()=>{if(!exportToast)return;const t=setTimeout(()=>setExportToast(null),3200);return()=>clearTimeout(t);},[exportToast]);
  function confirmSaveAll(){
    try{localStorage.setItem('lfo_just_saved','1');}catch(e){}
    window.location.href='/learning-form-overview';
  }
  function startExport(keys){
    if(exporting||!keys.length)return;
    setExportModalOpen(false);
    setExporting(true);
    setPendingExport(keys);
  }
  React.useEffect(()=>{
    if(!pendingExport)return;
    let cancelled=false;
    (async()=>{
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      if(document.fonts&&document.fonts.ready){try{await document.fonts.ready;}catch(e){}}
      await new Promise(r=>setTimeout(r,150));
      if(cancelled)return;
      try{
        const host=exportRef.current;
        if(!host)throw new Error('export host missing');
        const sections=Array.from(host.querySelectorAll('.lexport-section'));
        const pdf=new jsPDF({orientation:'portrait',unit:'pt',format:'a4',compress:true});
        const pageWidth=pdf.internal.pageSize.getWidth();
        const pageHeight=pdf.internal.pageSize.getHeight();
        for(let i=0;i<sections.length;i++){
          const canvas=await html2canvas(sections[i],{scale:2,backgroundColor:'#ffffff',useCORS:true});
          const imgData=canvas.toDataURL('image/jpeg',0.92);
          const imgWidth=pageWidth;
          const imgHeight=canvas.height*imgWidth/canvas.width;
          let heightLeft=imgHeight;
          let position=0;
          if(i>0)pdf.addPage();
          pdf.addImage(imgData,'JPEG',0,position,imgWidth,imgHeight);
          heightLeft-=pageHeight;
          while(heightLeft>0){
            position=heightLeft-imgHeight;
            pdf.addPage();
            pdf.addImage(imgData,'JPEG',0,position,imgWidth,imgHeight);
            heightLeft-=pageHeight;
          }
        }
        const chosen=LF_STEPS.filter(s=>pendingExport.includes(s.key));
        const fileName=chosen.length===LF_STEPS.length?'LearningForm_ทุกขั้นตอน.pdf'
          :chosen.length===1?'LearningForm_'+chosen[0].label+'.pdf'
          :'LearningForm_'+chosen.length+'ขั้นตอน.pdf';
        pdf.save(fileName);
        if(!cancelled)setExportToast('สร้าง PDF สำเร็จ · '+fileName);
      }catch(err){
        console.error('export pdf failed',err);
        if(!cancelled)setExportToast('สร้าง PDF ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      }finally{
        if(!cancelled){setPendingExport(null);setExporting(false);}
      }
    })();
    return()=>{cancelled=true;};
  },[pendingExport]);
  const m=window.LF_META;
  const StepComponent=LF_STEPS[step].Component;
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar),
    React.createElement('main',{className:'lcontent'},
      React.createElement(Breadcrumb),
      React.createElement('div',{className:'card ltitle-card'},
        React.createElement('div',{className:'ltitle-top'},
          React.createElement('div',{className:'ltitle-heading'},
            React.createElement('h1',null,window.LF_META.processName),
            React.createElement(Badge,{label:'รอดำเนินการ',type:'pill-color',color:'warning',size:'sm'})
          ),
          React.createElement('div',{className:'ltitle-actions'},
            React.createElement(Button,{variant:'secondary',size:'md',isDisabled:exporting,leadingIcon:React.createElement(Icon,{name:'download-01',size:16}),onClick:()=>setExportModalOpen(true)},exporting?'กำลังสร้าง PDF...':'Export PDF'),
            React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'help-circle',size:16}),onClick:()=>setGuideOpen(true)},'คำอธิบายแบบฟอร์ม')
          )
        ),
        React.createElement('div',{className:'ltitle-meta'},
          React.createElement('span',{className:'ltitle-meta-item'},m.division),
          React.createElement('span',{className:'ltitle-meta-divider'}),
          React.createElement('span',{className:'ltitle-meta-item'},'จัดทำเมื่อวันที่ '+m.createdDate)
        )
      ),
      React.createElement('div',{className:'lstep-layout'},
        React.createElement(Stepper,{step,setStep}),
        React.createElement('div',{className:'lstep-main'},
          React.createElement('div',{ref:stepContentRef,className:'lstep-content'},React.createElement(StepComponent)),
          React.createElement('div',{className:'lstep-nav'},
            React.createElement(Button,{variant:'secondary',size:'md',isDisabled:step===0,leadingIcon:React.createElement(Icon,{name:'chevron-left',size:16}),onClick:()=>setStep(s=>Math.max(0,s-1))},'ย้อนกลับ'),
            React.createElement('span',{className:'lstep-nav-count'},'ขั้นตอน '+(step+1)+' / '+LF_STEPS.length),
            React.createElement('div',{className:'lstep-nav-right'},
              React.createElement(Button,{variant:'secondary',size:'md',leadingIcon:React.createElement(Icon,{name:'save-01',size:16}),onClick:()=>{try{localStorage.setItem('lf_draft_started','1');}catch(e){}setDraftToast('บันทึกร่างเรียบร้อยแล้ว');}},'บันทึกร่าง'),
              step<LF_STEPS.length-1?React.createElement(Button,{variant:'primary',size:'md',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>setStep(s=>Math.min(LF_STEPS.length-1,s+1))},'ถัดไป'):
              React.createElement(Button,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'check',size:16}),onClick:()=>setSaveConfirmOpen(true)},'บันทึกทั้งหมด')
            )
          )
        )
      )
    ),
    pendingExport&&React.createElement('div',{
      ref:exportRef,
      className:'lstep-content lexport-offscreen','aria-hidden':'true',
      style:{width:((stepContentRef.current&&stepContentRef.current.offsetWidth)||900)+'px'}
    },
      pendingExport.map(key=>{
        const s=LF_STEPS.find(x=>x.key===key);
        const idx=LF_STEPS.indexOf(s);
        return React.createElement('div',{key,className:'lexport-section'},
          React.createElement('h2',{className:'lexport-section-title'},'ขั้นตอนที่ '+(idx+1)+' — '+s.label),
          React.createElement(s.Component)
        );
      })
    ),
    guideOpen&&React.createElement(FormGuideModal,{onClose:()=>setGuideOpen(false)}),
    exportModalOpen&&React.createElement(ExportPdfModal,{onClose:()=>setExportModalOpen(false),onConfirm:startExport}),
    saveConfirmOpen&&React.createElement(SaveAllConfirmModal,{onClose:()=>setSaveConfirmOpen(false),onConfirm:confirmSaveAll}),
    draftToast&&React.createElement('div',{className:'toast'},React.createElement(Icon,{name:'check',size:16}),draftToast),
    exportToast&&React.createElement('div',{className:'toast'},React.createElement(Icon,{name:'check',size:16}),exportToast)
  );
}

export default App;
