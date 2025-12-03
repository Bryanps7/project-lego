const API = '/log'
function getToken(){ return window.localStorage.getItem('token') }
async function search(){ const q=document.getElementById('q').value; const r=await fetch(`/log/search?s=${encodeURIComponent(q)}`, { headers: { 'Authorization': `Bearer ${getToken()}` } }); const j=await r.json(); render(j) }
function render(items){ const b=document.querySelector('#table-list tbody'); b.innerHTML=''; items.forEach(i=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${i.id}</td><td>${i.user_id}</td><td>${i.action}</td><td>${i.description}</td><td>${i.ip_address}</td>`; b.appendChild(tr) }) }

document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('btn').addEventListener('click', search) })