/* 1005 Logistics ERP demo — client-side only, synthetic data. */
(function(){
  var SESSION='erp_session';
  var U='candidate', P='findme';
  function here(){ return location.pathname.split('/').pop() || 'index.html'; }
  window.ERP = {
    login:function(u,p){ if(u===U&&p===P){ sessionStorage.setItem(SESSION,JSON.stringify({user:u,at:Date.now()})); return true;} return false; },
    logout:function(){ sessionStorage.removeItem(SESSION); location.href='index.html'; },
    guard:function(){ if(!sessionStorage.getItem(SESSION)){ location.replace('index.html?next='+encodeURIComponent(here())); return false;} return true; },
    user:function(){ try{return JSON.parse(sessionStorage.getItem(SESSION)).user;}catch(e){return null;} }
  };

  // Job postings (HR module). One is open. Guess which.
  var depts=['Operations','Finance','Warehouse','IT','Sales','HR','Fleet','Customer Service'];
  var P_=[
    [101,'Warehouse Supervisor — Night Shift','Warehouse','Kochi','closed','2024-02-12'],
    [102,'Accounts Payable Executive','Finance','Kochi','closed','2024-03-01'],
    [103,'Fleet Coordinator','Fleet','Coimbatore','closed','2024-03-19'],
    [104,'Customer Service Associate (Tamil/Malayalam)','Customer Service','Kochi','closed','2024-04-02'],
    [105,'IT Support Engineer L1','IT','Kochi','closed','2024-04-28'],
    [106,'Inside Sales Executive','Sales','Bengaluru','closed','2024-05-15'],
    [107,'Forklift Operator (x4)','Warehouse','Kochi','closed','2024-06-03'],
    [108,'HR Generalist','HR','Kochi','closed','2024-06-20'],
    [109,'Operations Analyst','Operations','Kochi','on hold','2024-07-11'],
    [110,'Procurement Officer','Finance','Kochi','closed','2024-08-05'],
    [111,'Senior Fleet Mechanic','Fleet','Coimbatore','closed','2024-09-09'],
    [112,'ERP Migration Consultant (contract)','IT','Remote','closed','2024-10-14'],
    [113,'Warehouse Associate — Cold Chain','Warehouse','Kochi','closed','2024-11-22'],
    [114,'Regional Sales Manager — South','Sales','Chennai','draft','2025-01-08'],
    [115,'Data Entry Operator (x2)','Operations','Kochi','closed','2025-02-17'],
    [116,'Payroll Specialist','HR','Kochi','draft','2025-03-30'],
    [1005,'AI/ML + Data Engineer — 1005 Intelligence Labs','IT','Remote (India)','open','2026-10-11'],
    [117,'Customer Service Team Lead','Customer Service','Kochi','closed','2025-05-04'],
    [118,'Last-Mile Delivery Planner','Operations','Bengaluru','on hold','2025-06-19'],
    [119,'IT Security Analyst','IT','Kochi','draft','2025-08-02'],
    [120,'Warehouse Manager — Coimbatore','Warehouse','Coimbatore','closed','2025-09-15'],
    [121,'Junior Accountant','Finance','Kochi','closed','2025-11-01'],
    [122,'Fleet Telematics Analyst','Fleet','Remote','draft','2026-01-20']
  ];
  window.ERP.postings = P_.map(function(r){ return {id:r[0],title:r[1],dept:r[2],location:r[3],status:r[4],updated:r[5]}; });
  window.ERP.badge=function(s){ var c={open:'b-open',closed:'b-closed',draft:'b-draft','on hold':'b-hold'}[s]||'b-closed'; return '<span class="badge '+c+'">'+s+'</span>'; };

  // Apply token. Revealed only after the reverse CAPTCHA. Not in page source as plain text on purpose.
  var K=[0x31,0x30,0x30,0x35];
  var T=[0x70,0x77,0x7e,0x61,0x1c,0x7,0x61,0x1,0x7a,0x1d,0x7d,0x7,0x69,0x74];
  window.ERP.token=function(){ var o=''; for(var i=0;i<T.length;i++) o+=String.fromCharCode(T[i]^K[i%4]); return o; };
})();
