const {Button:UmButton,Badge:UmBadge,InputField:UmInputField,Toggle:UmToggle}=window.DesignSystem_cbd181;
function umCollectUnits(nodes,acc){(nodes||[]).forEach(n=>{if(n.level==='ฝ่าย/สำนัก'||n.level==='กอง/ร.ร.ช่าง กฟภ./สนง.')acc.push(n.name);if(n.children)umCollectUnits(n.children,acc);});return acc;}
let UM_UNITS=null;
function getUmUnits(){if(!UM_UNITS)UM_UNITS=umCollectUnits(window.ORG_TREE,[]);return UM_UNITS;}
function roleInfo(key){return window.USER_ROLES.find(r=>r.key===key)||window.USER_ROLES[2];}

function UserRow({user,active,onSelect}){
  const initials=(user.fullName||user.username).trim().slice(0,1);
  return React.createElement('div',{className:'um-row'+(active?' um-row--active':''),onClick:onSelect},
    React.createElement('div',{className:'um-avatar','data-role':user.role},initials),
    React.createElement('div',{className:'um-row-info'},
      React.createElement('div',{className:'um-row-name'},user.fullName||user.username),
      React.createElement('div',{className:'um-row-user'},'@'+user.username)
    ),
    React.createElement('div',{className:'um-row-right'},
      React.createElement(UmBadge,{label:roleInfo(user.role).label.split(' — ')[0],type:'pill-color',color:user.role==='admin'?'error':(user.role==='manager'?'blue':'gray'),size:'sm'}),
      user.status==='inactive'&&React.createElement('span',{className:'um-row-dot um-row-dot--off'}),
      user.status==='active'&&React.createElement('span',{className:'um-row-dot um-row-dot--on'})
    )
  );
}

function UserForm({initial,onCancel,onSave}){
  const isEdit=!!initial;
  const [username,setUsername]=React.useState(initial?initial.username:'');
  const [password,setPassword]=React.useState('');
  const [confirmPw,setConfirmPw]=React.useState('');
  const [showPw,setShowPw]=React.useState(false);
  const [fullName,setFullName]=React.useState(initial?initial.fullName:'');
  const [email,setEmail]=React.useState(initial?initial.email:'');
  const [phone,setPhone]=React.useState(initial?initial.phone:'');
  const [role,setRole]=React.useState(initial?initial.role:'staff');
  const [unit,setUnit]=React.useState(initial?initial.unit:'');
  const [permissions,setPermissions]=React.useState(initial?initial.permissions:window.ROLE_PRESET_PERMS.staff.slice());
  const [status,setStatus]=React.useState(initial?initial.status!=='inactive':true);
  const [touched,setTouched]=React.useState(false);
  const units=React.useMemo(getUmUnits,[]);

  function changeRole(v){setRole(v);setPermissions(window.ROLE_PRESET_PERMS[v]?window.ROLE_PRESET_PERMS[v].slice():[]);}
  function togglePerm(key){setPermissions(p=>p.includes(key)?p.filter(k=>k!==key):[...p,key]);}

  const emailValid=!email||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwMatch=isEdit?true:(password.length>=6&&password===confirmPw);
  const isValid=username.trim()!==''&&(isEdit?(password===''||password===confirmPw&&password.length>=6):pwMatch)&&emailValid;

  function handleSave(){
    setTouched(true);
    if(!isValid)return;
    onSave({
      id:initial?initial.id:Date.now(),
      username:username.trim(),
      ...(password?{password}:{}),
      fullName:fullName.trim(),email:email.trim(),phone:phone.trim(),
      role,unit,permissions,status:status?'active':'inactive',
      lastLogin:initial?initial.lastLogin:'ยังไม่เคยเข้าสู่ระบบ'
    });
  }

  return React.createElement('div',{className:'um-form'},
    React.createElement('div',{className:'um-form-head'},
      React.createElement('h3',null,isEdit?'แก้ไข: '+initial.username:'เพิ่มผู้ใช้ใหม่'),
      isEdit&&React.createElement('div',{className:'um-form-head-actions'},
        React.createElement(UmButton,{variant:'secondary',size:'sm',className:status?'um-danger-btn':'um-success-btn',onClick:()=>setStatus(!status)},status?'ปิดใช้งาน':'เปิดใช้งาน')
      )
    ),
    React.createElement('div',{className:'um-section'},
      React.createElement('div',{className:'um-section-title'},'ข้อมูลทั่วไป'),
      React.createElement('div',{className:'um-grid-2'},
        React.createElement(UmInputField,{fieldType:'default',label:React.createElement(React.Fragment,null,'ชื่อผู้ใช้ ',React.createElement('span',{className:'modal-label-required'},'*')),size:'md',value:username,onChange:setUsername,errorMessage:touched&&!username.trim()?'กรุณาระบุชื่อผู้ใช้':undefined}),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},isEdit?'รหัสผ่านใหม่ (เว้นว่าง = ไม่เปลี่ยน)':React.createElement(React.Fragment,null,'รหัสผ่าน ',React.createElement('span',{className:'modal-label-required'},'*'))),
          React.createElement('div',{className:'um-pw-wrap'},
            React.createElement('input',{type:showPw?'text':'password',className:'modal-select um-pw-input',value:password,onChange:e=>setPassword(e.target.value)}),
            React.createElement('button',{type:'button',className:'um-pw-eye',onClick:()=>setShowPw(!showPw)},React.createElement(Icon,{name:showPw?'eye-off':'eye',size:16}))
          )
        )
      ),
      (!isEdit||password)&&React.createElement('div',{className:'um-grid-2'},
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'ยืนยันรหัสผ่าน ',!isEdit&&React.createElement('span',{className:'modal-label-required'},'*')),
          React.createElement('input',{type:showPw?'text':'password',className:'modal-select',value:confirmPw,onChange:e=>setConfirmPw(e.target.value)}),
          touched&&password&&password!==confirmPw&&React.createElement('div',{className:'um-field-error'},'รหัสผ่านไม่ตรงกัน'),
          touched&&!isEdit&&password&&password.length<6&&React.createElement('div',{className:'um-field-error'},'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
        ),
        React.createElement('div',null)
      ),
      React.createElement('div',{className:'um-grid-2'},
        React.createElement(UmInputField,{fieldType:'default',label:'ชื่อ-นามสกุล',size:'md',value:fullName,onChange:setFullName}),
        React.createElement(UmInputField,{fieldType:'default',label:'อีเมล',size:'md',value:email,onChange:setEmail,errorMessage:touched&&!emailValid?'รูปแบบอีเมลไม่ถูกต้อง':undefined})
      ),
      React.createElement('div',{className:'um-grid-2'},
        React.createElement(UmInputField,{fieldType:'default',label:'เบอร์โทรศัพท์',size:'md',value:phone,onChange:setPhone}),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',{className:'modal-label'},'หน่วยงาน'),
          React.createElement('select',{className:'modal-select',value:unit,onChange:e=>setUnit(e.target.value)},
            React.createElement('option',{value:''},'— ไม่ระบุ —'),
            units.map(u=>React.createElement('option',{key:u,value:u},u))
          )
        )
      ),
      React.createElement('div',{className:'modal-field'},
        React.createElement('label',{className:'modal-label'},'บทบาท (Role)'),
        React.createElement('select',{className:'modal-select',value:role,onChange:e=>changeRole(e.target.value)},
          window.USER_ROLES.map(r=>React.createElement('option',{key:r.key,value:r.key},r.label))
        ),
        React.createElement('div',{className:'um-role-desc'},roleInfo(role).desc)
      )
    ),
    React.createElement('div',{className:'um-section'},
      React.createElement('div',{className:'um-section-title'},'สิทธิ์การเข้าถึง'),
      React.createElement('p',{className:'um-section-hint'},'สิทธิ์เริ่มต้นถูกกำหนดตามบทบาทที่เลือก สามารถปรับแต่งเพิ่มเติมได้ตามความเหมาะสม'),
      React.createElement('div',{className:'um-perm-grid'},
        window.PERMISSIONS.map(p=>React.createElement('label',{key:p.key,className:'um-perm-card'+(permissions.includes(p.key)?' um-perm-card--checked':'')},
          React.createElement('input',{type:'checkbox',checked:permissions.includes(p.key),onChange:()=>togglePerm(p.key)}),
          React.createElement('span',null,p.label)
        ))
      )
    ),
    React.createElement('div',{className:'um-form-footer'},
      React.createElement(UmButton,{variant:'primary',size:'md',onClick:handleSave},'บันทึก'),
      React.createElement(UmButton,{variant:'secondary',size:'md',onClick:onCancel},'ยกเลิก')
    )
  );
}

function UserManagementPanel(){
  const [users,setUsers]=React.useState(()=>window.SYSTEM_USERS.slice());
  const [q,setQ]=React.useState('');
  const [selectedId,setSelectedId]=React.useState(null);
  const [creating,setCreating]=React.useState(false);
  const [toast,setToast]=React.useState(null);

  const filtered=users.filter(u=>!q||u.username.includes(q)||(u.fullName||'').includes(q));
  const selected=selectedId?users.find(u=>u.id===selectedId):null;
  const activeCount=users.filter(u=>u.status==='active').length;
  const adminCount=users.filter(u=>u.role==='admin').length;

  function handleSave(data){
    setUsers(list=>{
      const exists=list.some(u=>u.id===data.id);
      return exists?list.map(u=>u.id===data.id?{...u,...data}:u):[data,...list];
    });
    setSelectedId(data.id);
    setCreating(false);
    setToast(selected||creating?'บันทึกผู้ใช้เรียบร้อยแล้ว':'เพิ่มผู้ใช้เรียบร้อยแล้ว');
  }
  function startCreate(){setCreating(true);setSelectedId(null);}

  React.useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(null),2400);return ()=>clearTimeout(t);},[toast]);

  return React.createElement('div',{className:'card panel'},
    React.createElement('div',{className:'panel-head'},
      React.createElement('div',null,
        React.createElement('h2',null,'จัดการผู้ใช้งานระบบ'),
        React.createElement('p',null,'จัดการบัญชีผู้ใช้ บทบาท และสิทธิ์การเข้าถึงระบบ SLA/BA')
      ),
      React.createElement(UmButton,{variant:'primary',size:'md',leadingIcon:React.createElement(Icon,{name:'plus',size:16}),onClick:startCreate},'เพิ่มผู้ใช้งาน')
    ),
    React.createElement('div',{className:'sla-stat-grid sla-stat-grid--4'},
      React.createElement('div',{className:'sla-stat-card'},React.createElement('div',{className:'sla-stat-label'},'ผู้ใช้ทั้งหมด'),React.createElement('div',{className:'sla-stat-value'},users.length)),
      React.createElement('div',{className:'sla-stat-card'},React.createElement('div',{className:'sla-stat-label'},'ใช้งานอยู่'),React.createElement('div',{className:'sla-stat-value'},activeCount)),
      React.createElement('div',{className:'sla-stat-card'},React.createElement('div',{className:'sla-stat-label'},'ปิดใช้งาน'),React.createElement('div',{className:'sla-stat-value'},users.length-activeCount)),
      React.createElement('div',{className:'sla-stat-card'},React.createElement('div',{className:'sla-stat-label'},'Admin'),React.createElement('div',{className:'sla-stat-value'},adminCount))
    ),
    React.createElement('div',{className:'um-layout'},
      React.createElement('div',{className:'um-list-panel'},
        React.createElement('div',{className:'um-list-toolbar'},
          React.createElement(UmInputField,{fieldType:'default',size:'md',placeholder:'ค้นหา...',value:q,onChange:setQ})
        ),
        React.createElement('div',{className:'um-list'},
          filtered.map(u=>React.createElement(UserRow,{key:u.id,user:u,active:selectedId===u.id,onSelect:()=>{setSelectedId(u.id);setCreating(false);}}))
        )
      ),
      React.createElement('div',{className:'um-detail-panel'},
        creating?React.createElement(UserForm,{onCancel:()=>setCreating(false),onSave:handleSave}):
        selected?React.createElement(UserForm,{key:selected.id,initial:selected,onCancel:()=>setSelectedId(null),onSave:handleSave}):
        React.createElement('div',{className:'um-empty'},React.createElement(Icon,{name:'user-01',size:28}),React.createElement('p',null,'เลือกผู้ใช้งานจากรายการ หรือกด + เพิ่ม'))
      )
    ),
    toast&&React.createElement('div',{className:'toast'},React.createElement(Icon,{name:'check-circle',size:16,className:'icon'}),toast)
  );
}
Object.assign(window,{UserManagementPanel});
