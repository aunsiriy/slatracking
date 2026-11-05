import Image from 'next/image';
import Link from 'next/link';
import './page-header.css';
const {Button,Avatar}=window.DesignSystem_cbd181;

function BackControl({backHref,onBack}){
  if(onBack)return React.createElement('button',{type:'button',className:'ph-back',onClick:onBack},React.createElement(Icon,{name:'chevron-left',size:18}),'กลับ');
  return React.createElement(Link,{className:'ph-back',href:backHref||'/'},React.createElement(Icon,{name:'chevron-left',size:18}),'กลับ');
}

// A full-bleed row (background + optional divider) with its actual content
// constrained to maxWidth and centered, so it lines up with the page's own
// body-content column instead of running edge to edge.
function Row({rowClassName,bordered,maxWidth,children}){
  return React.createElement('div',{className:rowClassName+(bordered?' ph-bordered':'')},
    React.createElement('div',{className:'ph-inner',style:{maxWidth:maxWidth||'1180px'}},children)
  );
}

function BreadcrumbRow({items,maxWidth}){
  return React.createElement(Row,{rowClassName:'ph-breadcrumb',maxWidth},
    items.map((it,i)=>React.createElement(React.Fragment,{key:i},
      i>0&&React.createElement(Icon,{name:'chevron-right',size:13}),
      it.href?React.createElement(Link,{href:it.href},it.label):React.createElement('span',{className:'is-current'},it.label)
    ))
  );
}

// Shared fixed header used across every route: 72px navbar (back + brand left,
// notification + profile right, always edge-to-edge) → optional breadcrumb →
// title row (+ optional actions) → optional subtitle → optional tabs. The
// breadcrumb/title/subtitle/tabs rows have their content width-matched to the
// page's own body content via `maxWidth` (pass the same max-width the page's
// content wrapper uses). Each present section below the navbar gets a gray
// divider except the breadcrumb (never dividered) and the last section. The
// whole header stays sticky to the viewport top instead of scrolling with
// page content.
function PageHeader({backHref,onBack,systemSubtitle,avatarText,breadcrumb,title,titleExtra,actions,subtitle,tabs,maxWidth}){
  const hasBreadcrumb=!!(breadcrumb&&breadcrumb.length);
  const sections=['navbar'];
  if(hasBreadcrumb)sections.push('breadcrumb');
  sections.push('title');
  if(subtitle)sections.push('subtitle');
  if(tabs)sections.push('tabs');
  const isLast=key=>sections.indexOf(key)===sections.length-1;

  return React.createElement('header',{className:'ph'},
    React.createElement('div',{className:'ph-navbar'+(isLast('navbar')?'':' ph-bordered')},
      React.createElement('div',{className:'ph-navbar-left'},
        React.createElement(BackControl,{backHref,onBack}),
        React.createElement('div',{className:'ph-brand'},
          React.createElement(Image,{className:'ph-brand-logo',src:'/assets/sla-logo-checkmark.png',alt:'SLA',width:36,height:36}),
          React.createElement('div',{className:'ph-brand-word'},
            React.createElement('span',{className:'ph-brand-title'},'SLA Tracking System'),
            systemSubtitle&&React.createElement('span',{className:'ph-brand-sub'},systemSubtitle)
          )
        )
      ),
      React.createElement('div',{className:'ph-navbar-right'},
        React.createElement('div',{className:'ph-bell-wrap'},
          React.createElement(Button,{variant:'tertiary',size:'sm',iconOnly:true,leadingIcon:React.createElement(Icon,{name:'bell',size:19}),'aria-label':'การแจ้งเตือน'}),
          React.createElement('span',{className:'ph-bell-dot'})
        ),
        React.createElement(Avatar,{variant:'text',size:'sm',text:avatarText||'PEA'})
      )
    ),
    hasBreadcrumb&&React.createElement(BreadcrumbRow,{items:breadcrumb,maxWidth}),
    React.createElement(Row,{rowClassName:'ph-titlerow',bordered:!isLast('title'),maxWidth},
      React.createElement('div',{className:'ph-title-col'},
        React.createElement('h1',{className:'ph-title'},title),
        titleExtra||null
      ),
      actions&&React.createElement('div',{className:'ph-actions'},actions)
    ),
    subtitle&&React.createElement(Row,{rowClassName:'ph-subtitle',bordered:!isLast('subtitle'),maxWidth},subtitle),
    tabs&&React.createElement(Row,{rowClassName:'ph-tabs',maxWidth},tabs)
  );
}
Object.assign(window,{PageHeader});
