/* global CONFIG */
!function(){
// Initialization
const e={orderBy:"startTime",showLocation:!1,offsetMax:72,offsetMin:4,showDeleted:!1,singleEvents:!0,maxResults:250};
// Read config form theme config file
Object.assign(e,CONFIG.calendar);const t=new Date,n=new Date,s=new Date;n.setHours(t.getHours()+e.offsetMax),s.setHours(t.getHours()-e.offsetMin);
// Build URL
const a={key:e.api_key,orderBy:e.orderBy,timeMax:n.toISOString(),timeMin:s.toISOString(),showDeleted:e.showDeleted,singleEvents:e.singleEvents,maxResults:e.maxResults},o=new URL(`https://www.googleapis.com/calendar/v3/calendars/${e.calendar_id}/events`);function i(n,s){const a=s.start.dateTime,o=s.end.dateTime,i={weekday:"short",hour:"2-digit",minute:"2-digit"},r="now"===n?"NOW":function(e,t){let n=e-t;const s=n>0?" ago":" later";return n=Math.abs(n),n<36e5?Math.round(n/6e4)+" minutes"+s:n<864e5?Math.round(n/36e5)+" hours"+s:n<2592e6?"about "+Math.round(n/864e5)+" days"+s:n<31536e6?"about "+Math.round(n/2592e6)+" months"+s:"about "+Math.round(n/31536e6)+" years"+s}(t,a),d=a.toLocaleTimeString([],i)+" - "+o.toLocaleTimeString([],i);let c="";e.showLocation&&s.location&&(c=`<span class="event-location event-details">${s.location}</span>`);let l="";s.description&&(l=`<span class="event-description event-details">${s.description}</span>`);return`<section class="event event-${n}">\n        <h2 class="event-summary">\n          ${s.summary}\n          <span class="event-relative-time">${r}</span>\n        </h2>\n        ${c}\n        <span class="event-duration event-details">${d}</span>\n        ${l}\n      </section>`}function r(){const e=document.querySelector(".event-list");e&&fetch(o.href).then(e=>e.json()).then(n=>{if(0===n.items.length)return void(e.innerHTML="<hr>");
// Clean the event list
e.innerHTML="";let s=0;// used to decide where to insert an <hr>
n.items.forEach(n=>{
// Parse data
const a=6e4*(new Date).getTimezoneOffset(),o=n.start.dateTime=new Date(n.start.dateTime||new Date(n.start.date).getTime()+a),r=n.end.dateTime=new Date(n.end.dateTime||new Date(n.end.date).getTime()+a);let d="now";r<t?d="past":o>t&&(d="future"),"future"===d&&s<t&&(e.innerHTML+="<hr>"),e.innerHTML+=i(d,n),s=r})})}Object.entries(a).forEach(e=>o.searchParams.append(...e)),r();const d=setInterval(r,6e4);document.addEventListener("pjax:send",()=>{clearInterval(d)})}();