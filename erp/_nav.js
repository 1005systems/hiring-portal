/* shared chrome for signed-in pages */
(function(){
  if(!ERP.guard()) return;
  var page=location.pathname.split('/').pop();
  var on=function(p){ return page===p?' class="on"':''; };
  document.getElementById('top').innerHTML='<span class="logo">1005 Logistics ERP <small>v3.2.1</small></span><span class="sp"></span><span class="u">'+ERP.user()+' · Demo tenant</span><a href="#" id="logout">Sign out</a>';
  document.getElementById('side').innerHTML=
    '<h4>Modules</h4><a href="app.html"'+on('app.html')+'>Dashboard</a><a href="customers.html"'+on('customers.html')+'>Customers</a><a href="invoices.html"'+on('invoices.html')+'>Invoices</a><a href="#" >Inventory</a><a href="#" >Fleet</a>'+
    '<h4>HR</h4><a href="postings.html"'+(page==='postings.html'||page==='posting.html'?' class="on"':'')+'>Job Postings</a><a href="#">Employees</a><a href="#">Payroll</a>'+
    '<h4>Admin</h4><a href="#">Settings</a><a href="#">Audit Log</a>';
  document.getElementById('logout').onclick=function(e){e.preventDefault();ERP.logout();};
})();
