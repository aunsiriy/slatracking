const {Button,Badge,Dot,Avatar,FeaturedIcon,Tag}=window.DesignSystem_cbd181;

function Hero({role}){
  const p=window.PERIOD;
  const glance=[
    {icon:'file-text',value:role.kpi[0].value,label:role.kpi[0].label,color:'brand'},
    {icon:'book',value:role.kpi[1].value,label:role.kpi[1].label,color:'blue'},
    {icon:'alert-triangle',value:role.kpi[2].value,label:role.kpi[2].label,color:'warning'},
    {icon:'shield-check',value:role.counts.certified,label:'รับรองผลแล้ว',color:'success'}
  ];
  return React.createElement('section',{className:'hero',style:{background:'url("/assets/hero-bg.jpg") center / cover no-repeat'}},
    React.createElement('div',{className:'hero-waves','aria-hidden':'true'},
      React.createElement('span',{className:'hero-wave hero-wave--1'}),
      React.createElement('span',{className:'hero-wave hero-wave--2'}),
      React.createElement('span',{className:'hero-wave hero-wave--3'})
    ),
    React.createElement('div',{className:'hero-text'},
      React.createElement(Badge,{label:`รอบ ${p.name} · เปิดรับข้อมูล`,type:'pill-color',color:'success',icon:'dot',size:'md'}),
      React.createElement('h1',null,'ระบบติดตามข้อตกลงการให้บริการ',React.createElement('br',null),'(SLA Tracking System)'),
      React.createElement('p',null,'ภาพรวมสถานะการรายงาน SLA และงานที่ต้องดำเนินการของคุณวันนี้')
    )
  );
}

function TodayOverview({role}){
  const glance=[
    {icon:'file-text',value:role.kpi[0].value,label:role.kpi[0].label,color:'brand'},
    {icon:'book',value:role.kpi[1].value,label:role.kpi[1].label,color:'blue'},
    {icon:'alert-triangle',value:role.kpi[2].value,label:role.kpi[2].label,color:'warning'},
    {icon:'shield-check',value:role.counts.certified,label:'รับรองผลแล้ว',color:'success'}
  ];
  return React.createElement('section',{className:'today-overview'},
    React.createElement('span',{className:'today-overview-title'},React.createElement(Icon,{name:'activity',size:14}),'ภาพรวมวันนี้'),
    React.createElement('div',{className:'today-overview-grid'},
      glance.map((g,i)=>React.createElement('div',{key:i,className:'card today-overview-card',style:{animationDelay:`${i*0.08+0.05}s`}},
        React.createElement('span',{className:`hero-glance-icon hero-glance-icon--${g.color}`},React.createElement(Icon,{name:g.icon,size:17})),
        React.createElement('div',{className:'today-overview-info'},
          React.createElement('span',{className:'today-overview-value'},g.value),
          React.createElement('span',{className:'today-overview-label'},g.label)
        )
      ))
    )
  );
}

const KPI_COLOR_VARS={success:'var(--pea-fg-success-primary)',blue:'var(--pea-blue-600)',error:'var(--pea-fg-error-primary)'};
function KpiCards({kpi}){
  const items=kpi.slice(2);
  return React.createElement('section',{className:'kpi-grid',style:{gridTemplateColumns:`repeat(${items.length},1fr)`}},
    items.map((k,i)=>React.createElement('div',{key:i,className:'card kpi-card'},
      React.createElement('div',{className:'kpi-value',style:{color:KPI_COLOR_VARS[k.color]}},k.value),
      React.createElement('div',{className:'kpi-label'},k.label),
      React.createElement(Button,{variant:'link-color',size:'sm',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:15})},k.cta)
    ))
  );
}

function SectionHeader({title,className}){
  return React.createElement('div',{className:'section-header'+(className?' '+className:'')},
    React.createElement('h2',null,title)
  );
}

const FEATURE_COLOR_VARS={brand:{bg:'var(--pea-bg-brand-primary)',fg:'var(--pea-fg-brand-primary)'},gray:{bg:'var(--pea-bg-tertiary)',fg:'var(--pea-fg-tertiary)'}};
function FeatureCard({icon,color,title,desc,cta}){
  const c=FEATURE_COLOR_VARS[color]||FEATURE_COLOR_VARS.gray;
  return React.createElement('div',{className:'card feature-card'},
    React.createElement('div',{className:'feature-icon',style:{background:c.bg,color:c.fg}},
      React.createElement(Icon,{name:icon,size:20})
    ),
    React.createElement('div',{className:'feature-body'},
      React.createElement('h4',null,title),
      React.createElement('p',null,desc),
      React.createElement(Button,{variant:'link-color',size:'sm',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:15})},cta)
    )
  );
}

function FeatureRow(){
  return React.createElement('div',{className:'feature-row'},
    window.FEATURE_ITEMS.map((f,i)=>React.createElement(FeatureCard,{key:i,...f}))
  );
}

function HelpSection(){
  return React.createElement('div',{className:'help-row'},
    window.HELP_ITEMS.map((h,i)=>React.createElement('a',{key:i,href:'#',className:'card help-card'},
      React.createElement(Icon,{name:h.icon,size:20}),
      React.createElement('span',null,h.label)
    ))
  );
}

function SiteFooter(){
  return React.createElement('footer',{className:'site-footer'},
    React.createElement('div',{className:'brand-mark footer-brand'},
      React.createElement('img',{className:'brand-logo footer-logo',src:'assets/sla-logo-checkmark.png',alt:'SLA'}),
      React.createElement('span',{className:'footer-word'},'PEA-SLA Tracking System')
    ),
    React.createElement('span',{className:'footer-copy'},'© 2569 การไฟฟ้าส่วนภูมิภาค. สงวนลิขสิทธิ์.')
  );
}

function NotificationPanel({notifications,setNotifications,onClose}){
  const [tab,setTab]=React.useState('all');
  const unread=notifications.filter(n=>!n.read);
  const list=tab==='all'?notifications:unread;
  function markAllRead(){setNotifications(list0=>list0.map(n=>({...n,read:true})));}
  function deleteAll(){setNotifications([]);}
  return React.createElement('div',{className:'notif-panel'},
    React.createElement('div',{className:'notif-panel-head'},
      React.createElement('h3',null,'แจ้งเตือน'),
      notifications.length>0&&React.createElement(Button,{variant:'secondary',size:'sm',onClick:deleteAll},'ลบทั้งหมด')
    ),
    React.createElement('div',{className:'notif-tabs'},
      React.createElement('button',{type:'button',className:'notif-tab'+(tab==='all'?' is-active':''),onClick:()=>setTab('all')},'ทั้งหมด'),
      React.createElement('button',{type:'button',className:'notif-tab'+(tab==='unread'?' is-active':''),onClick:()=>setTab('unread')},'ยังไม่อ่าน',unread.length>0&&React.createElement('span',{className:'notif-tab-count'},unread.length))
    ),
    React.createElement('div',{className:'notif-list'},
      list.length?list.map(n=>React.createElement('div',{key:n.id,className:'notif-item'+(n.read?'':' notif-item--unread')},
        React.createElement('div',{className:'notif-item-body'},
          React.createElement('p',null,n.text,n.ref&&React.createElement('span',{className:'notif-ref'},n.ref),n.after),
          React.createElement('a',{href:'#',className:'notif-detail-link'},'ดูรายละเอียด'),
          React.createElement('div',{className:'notif-item-time'},n.time)
        ),
        !n.read&&React.createElement('span',{className:'notif-dot'})
      )):React.createElement('div',{className:'notif-empty'},
        React.createElement(Icon,{name:'bell',size:26}),
        React.createElement('h4',null,'ไม่มีการแจ้งเตือน'),
        React.createElement('p',null,'รอติดตาม! การแจ้งเตือนเกี่ยวกับกิจกรรมของคุณจะแสดงขึ้นที่นี่')
      )
    ),
    React.createElement(Button,{variant:'primary',size:'md',className:'notif-mark-btn',isDisabled:unread.length===0,leadingIcon:React.createElement(Icon,{name:'check',size:16}),onClick:markAllRead},'ทำเครื่องหมายว่าอ่านแล้ว')
  );
}

function TopBar({role,setRoleKey}){
  const [menuOpen,setMenuOpen]=React.useState(false);
  const [navOpen,setNavOpen]=React.useState(false);
  const [notifOpen,setNotifOpen]=React.useState(false);
  const [notifications,setNotifications]=React.useState(()=>window.NOTIFICATIONS.slice());
  const unreadCount=notifications.filter(n=>!n.read).length;
  const navLinks=['Dashboard','BA & SLA Master','รายงาน SLA','Learning Form'];
  return React.createElement('header',{className:'topbar'},
    React.createElement('div',{className:'topbar-left'},
      React.createElement('div',{className:'brand-mark'},
        React.createElement('img',{className:'brand-logo',src:'sla-logo.svg',alt:'SLA'}),
        React.createElement('div',{className:'brand-word'},
          React.createElement('span',{className:'brand-word-title'},'PEA-SLA'),
          React.createElement('span',{className:'brand-word-sub'},'Tracking System')
        )
      ),
      React.createElement('nav',{className:'topnav'},
        navLinks.map(l=>
          React.createElement('a',{key:l,href:'#',className:'topnav-link'+(l==='Dashboard'?' active':'')},l)
        )
      ),
      React.createElement('div',{className:'nav-menu'},
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'layout-grid',size:19}),onClick:()=>setNavOpen(v=>!v),'aria-label':'เมนู','aria-expanded':navOpen}),
        navOpen&&React.createElement('div',{className:'nav-dropdown'},
          navLinks.map(l=>React.createElement('a',{key:l,href:'#',className:'dropdown-item'},l))
        )
      )
    ),
    React.createElement('div',{className:'topbar-right'},
      React.createElement('div',{className:'role-switcher',role:'group','aria-label':'สลับมุมมองตาม Role (สำหรับตรวจสอบ)'},
        Object.values(window.ROLES).map(r=>
          React.createElement(Button,{key:r.key,variant:role.key===r.key?'primary':'tertiary',size:'sm',className:'role-pill-btn',onClick:()=>setRoleKey(r.key)},r.shortLabel)
        )
      ),
      React.createElement('div',{className:'icon-btn-wrap'},
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'search',size:19}),'aria-label':'ค้นหา'})
      ),
      React.createElement('div',{className:'icon-btn-wrap'},
        React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'bell',size:19}),onClick:()=>setNotifOpen(v=>!v),'aria-label':'การแจ้งเตือน '+unreadCount+' รายการ'}),
        unreadCount>0&&React.createElement('span',{className:'notif-count'},unreadCount),
        notifOpen&&React.createElement(NotificationPanel,{notifications:notifications,setNotifications:setNotifications,onClose:()=>setNotifOpen(false)})
      ),
      React.createElement('div',{className:'user-menu'},
        React.createElement(Button,{variant:'tertiary',size:'lg',className:'user-trigger-btn',onClick:()=>setMenuOpen(v=>!v),'aria-expanded':menuOpen,
          leadingIcon:React.createElement(Avatar,{variant:'text',size:'sm',text:role.initials}),
          trailingIcon:React.createElement(Icon,{name:'chevron-down',size:16})},
          React.createElement('span',{className:'user-trigger-text'},
            React.createElement('span',{className:'user-name'},role.person),
            React.createElement('span',{className:'user-role'},role.roleLabel)
          )
        ),
        menuOpen&&React.createElement('div',{className:'user-dropdown'},
          React.createElement('a',{href:'#',className:'dropdown-item'},React.createElement(Icon,{name:'settings',size:16}),'ตั้งค่าบัญชี'),
          React.createElement('a',{href:'#',className:'dropdown-item'},React.createElement(Icon,{name:'help-circle',size:16}),'ช่วยเหลือ'),
          React.createElement('a',{href:'#',className:'dropdown-item'},React.createElement(Icon,{name:'external-link',size:16}),'ออกจากระบบ')
        )
      )
    )
  );
}

function NoticeBanner({role,onDismiss}){
  return React.createElement('div',{className:'notice-banner',role:'status'},
    React.createElement(Icon,{name:'alert-triangle',size:20,className:'notice-icon'}),
    React.createElement('div',{className:'notice-text'},
      React.createElement('strong',null,`เหลืออีก ${window.PERIOD.daysLeft} วัน `),
      `ก่อนถึงกำหนดส่งรายงาน SLA ประจำเดือน ${window.PERIOD.name} (${window.PERIOD.deadline}) — ${role.bannerText}`
    ),
    React.createElement(Button,{variant:'link-color',size:'sm',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16})},'ไปที่รายการ'),
    React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,className:'notice-close',leadingIcon:React.createElement(Icon,{name:'x',size:16}),'aria-label':'ปิดการแจ้งเตือน',onClick:onDismiss})
  );
}

function StatusSummaryBar({counts}){
  const total=window.STATUS_STEPS.reduce((s,st)=>s+counts[st.key],0);
  return React.createElement('section',{className:'card status-bar-card','aria-label':'สรุปสถานะ Workflow 7 สถานะ'},
    React.createElement('div',{className:'card-head'},
      React.createElement('h2',{className:'card-title'},'สถานะรายงาน SLA รอบนี้'),
      React.createElement('span',{className:'card-head-meta'},`ทั้งหมด ${total} รายการ · อัปเดตล่าสุด 30 วิ ก่อนหน้า`)
    ),
    React.createElement('div',{className:'status-bar'},
      window.STATUS_STEPS.map((st,i)=>
        React.createElement('div',{key:st.key,className:'status-cell',tabIndex:0,role:'button','aria-label':`${st.label} ${counts[st.key]} รายการ`},
          React.createElement('div',{className:'status-cell-top'},
            React.createElement(Dot,{size:'sm',color:st.dotColor}),
            React.createElement('span',{className:'status-count'},counts[st.key])
          ),
          React.createElement('span',{className:'status-label'},st.label)
        )
      )
    )
  );
}

function ModuleCard({icon,title,desc,descStyle,badge,cta,ctaVariant,stat,enabled,accent,slotId,href,cardStyle,titleStyle}){
  return React.createElement('div',{className:'card module-card-v2'+(accent?' is-accent':'')+(enabled?'':' is-view-only'),style:cardStyle},
    React.createElement('div',{className:'module-card-dots','aria-hidden':'true'}),
    React.createElement('div',{className:'module-card-top'},
      React.createElement(Badge,{label:badge,type:'pill-color',color:accent?'gray':'brand',size:'sm',className:accent?'module-badge-onaccent':''}),
      React.createElement('h3',{className:'module-card-title',style:titleStyle},title),
      React.createElement('p',{className:'module-card-desc',style:descStyle},desc)
    ),
    React.createElement('div',{className:'module-card-art'},
      React.createElement('image-slot',{id:slotId,shape:'rounded',radius:'12',placeholder:icon})
    ),
    React.createElement('div',{className:'module-card-footer-v2'},
      React.createElement(Button,{variant:accent?'secondary':ctaVariant,size:'md',className:accent?'module-cta-onaccent':'',trailingIcon:React.createElement(Icon,{name:'arrow-right',size:16}),onClick:()=>{if(href)window.location.href=href;}},cta)
    )
  );
}

function ModuleCards({role}){
  const c=role.cards;
  return React.createElement('section',{className:'module-grid'},
    React.createElement(ModuleCard,{icon:'BA & SLA Master',title:'BA & SLA Master',desc:'โครงสร้างสถาปัตยกรรมธุรกิจและตัวชี้วัด SLA ต้นแบบขององค์กร',slotId:'card-art-ba',href:role.key==='admin'?'ba-sla-master.html':'ba-structure-view.html',cardStyle:{backgroundColor:'var(--pea-base-white)'},titleStyle:{color:'var(--pea-base-black)'},descStyle:{color:'var(--pea-base-black)'},...c.ba}),
    React.createElement(ModuleCard,{icon:'รายงาน SLA',title:'SLA Tracking & รายงานผล',desc:['กรอกผล ตรวจสอบ',React.createElement('br',{key:'br'}),'และติดตามสถานะ SLA'],slotId:'card-art-sla',accent:true,...c.sla}),
    React.createElement(ModuleCard,{icon:'Learning Form & QIR',title:'Learning Form & QIR',desc:'ทบทวน SLA ที่ไม่ผ่านเกณฑ์และวางแผนปรับปรุงกระบวนการ',descStyle:{width:'118px',height:'59px'},slotId:'card-art-learning',...c.learning})
  );
}

function ActivityFeed({role}){
  const items=window.ACTIVITY_ALL.filter(a=>a.audience.includes(role.key));
  return React.createElement('section',{className:'card activity-card'},
    React.createElement('div',{className:'card-head'},
      React.createElement('span',{className:'card-head-meta'},`${items.length} เหตุการณ์ล่าสุด`),
      React.createElement(Button,{variant:'link-color',size:'sm'},'ดูทั้งหมด')
    ),
    React.createElement('ul',{className:'activity-list'},
      items.map(a=>{
        const st=window.STATUS_STEPS.find(s=>s.key===a.statusKey);
        return React.createElement('li',{key:a.id,className:'activity-item'},
          React.createElement('div',{className:'activity-dot'},React.createElement(Dot,{size:'sm'})),
          React.createElement('div',{className:'activity-body'},
            React.createElement('p',{className:'activity-line'},React.createElement('strong',null,a.actor),' ',a.action,' ',React.createElement('span',{className:'activity-target'},a.target)),
            React.createElement('div',{className:'activity-meta'},
              React.createElement(Badge,{label:st.label,type:'badge-color',color:st.color==='gray-blue'?'gray-blue':st.color,size:'sm'}),
              React.createElement('span',{className:'activity-time'},a.time)
            )
          )
        );
      })
    )
  );
}

function PeriodWidget(){
  const p=window.PERIOD;
  const pct=Math.round(((25-p.daysLeft)/25)*100);
  return React.createElement('div',{className:'card side-card period-widget'},
    React.createElement('div',{className:'side-card-head'},
      React.createElement(Icon,{name:'calendar',size:18}),
      React.createElement('h3',null,'รอบรายงานปัจจุบัน')
    ),
    React.createElement('div',{className:'period-name-row'},
      React.createElement('span',{className:'period-name'},p.name),
      React.createElement(Badge,{label:'เปิดรับข้อมูล',type:'pill-color',color:'success',icon:'dot',size:'sm'})
    ),
    React.createElement('div',{className:'period-progress'},
      React.createElement('div',{className:'period-progress-bar'},React.createElement('div',{className:'period-progress-fill',style:{width:pct+'%'}}))
    ),
    React.createElement('dl',{className:'period-dates'},
      React.createElement('div',null,React.createElement('dt',null,'เปิดรับ'),React.createElement('dd',null,p.openDate)),
      React.createElement('div',null,React.createElement('dt',null,'ครบกำหนดส่ง'),React.createElement('dd',{className:'is-warn'},p.deadline)),
      React.createElement('div',null,React.createElement('dt',null,'ปิดรอบ'),React.createElement('dd',null,p.closeDate))
    ),
    React.createElement('div',{className:'period-countdown'},
      React.createElement(Icon,{name:'clock',size:15}),
      `เหลือเวลาอีก ${p.daysLeft} วัน`
    )
  );
}

function RoleInfoCard({role}){
  return React.createElement('div',{className:'card side-card role-card'},
    React.createElement('div',{className:'role-card-top'},
      React.createElement(Avatar,{variant:'text',size:'lg',text:role.initials}),
      React.createElement('div',null,
        React.createElement('p',{className:'role-card-name'},role.person),
        React.createElement('p',{className:'role-card-role'},role.roleLabel)
      )
    ),
    React.createElement('div',{className:'role-card-row'},
      React.createElement(Icon,{name:'map-pin',size:15}),
      React.createElement('span',null,role.division)
    ),
    React.createElement('div',{className:'role-card-row'},
      React.createElement(Icon,{name:'shield-check',size:15}),
      React.createElement('span',null,'ขอบเขตข้อมูล: ',role.scopeLabel)
    )
  );
}

function QuickAccess({items}){
  return React.createElement('div',{className:'card side-card quick-access'},
    React.createElement('div',{className:'side-card-head'},
      React.createElement(Icon,{name:'sparkles',size:18}),
      React.createElement('h3',null,'Quick Access')
    ),
    React.createElement('ul',{className:'quick-list'},
      items.map((it,i)=>React.createElement('li',{key:i},
        React.createElement('a',{href:'#',className:'quick-item'},
          React.createElement('span',{className:'quick-icon'},React.createElement(Icon,{name:it.icon,size:18})),
          React.createElement('span',{className:'quick-text'},
            React.createElement('span',{className:'quick-label'},it.label),
            React.createElement('span',{className:'quick-sub'},it.sub)
          ),
          it.count!=null&&React.createElement('span',{className:'quick-count'},it.count),
          React.createElement(Icon,{name:'chevron-right',size:16,className:'quick-chevron'})
        )
      ))
    )
  );
}

function App(){
  const [roleKey,setRoleKey]=React.useState('manager');
  const [bannerOpen,setBannerOpen]=React.useState(true);
  const role=window.ROLES[roleKey];
  return React.createElement(React.Fragment,null,
    React.createElement(TopBar,{role,setRoleKey}),
    React.createElement('main',{className:'page'},
      bannerOpen&&React.createElement(NoticeBanner,{role,onDismiss:()=>setBannerOpen(false)}),
      React.createElement(Hero,{role}),
      React.createElement('div',{className:'layout'},
        React.createElement('div',{className:'layout-main'},
          React.createElement(TodayOverview,{role}),
          React.createElement(SectionHeader,{title:'ฟีเจอร์หลัก'}),
          React.createElement(ModuleCards,{role}),
          React.createElement(FeatureRow,null),
          React.createElement(SectionHeader,{title:'กิจกรรมล่าสุด (Audit Trail)'}),
          React.createElement(ActivityFeed,{role})
        ),
        React.createElement('aside',{className:'layout-side'},
          React.createElement(PeriodWidget,null),
          React.createElement(RoleInfoCard,{role}),
          React.createElement(QuickAccess,{items:role.quickAccess})
        )
      ),
      React.createElement(SectionHeader,{title:'ช่วยเหลือ',className:'section-header-help'}),
      React.createElement(HelpSection,null)
    ),
    React.createElement(SiteFooter,null)
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
