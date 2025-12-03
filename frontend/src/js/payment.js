const API = '/payment'
function getToken(){ return window.localStorage.getItem('token') }
async function search(){ const q=document.getElementById('q').value; const r=await fetch(`/payment/admin/search?s=${encodeURIComponent(q)}`, { headers: { 'Authorization': `Bearer ${getToken()}` } }); const j=await r.json(); render(j) }
function render(items){ const b=document.querySelector('#table-list tbody'); b.innerHTML=''; items.forEach(i=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${i.id}</td><td>${i.sale_id}</td><td>${i.amount}</td><td>${i.status}</td><td>${i.transaction_id}</td>`; b.appendChild(tr) }) }

document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('btn').addEventListener('click', search) })