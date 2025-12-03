const API = '/coupon'

function getToken(){ return window.localStorage.getItem('token') }

async function fetchList(){ const res = await fetch(API); const j = await res.json(); render(j) }
function render(items){ const b=document.querySelector('#table-list tbody'); b.innerHTML=''; items.forEach(i=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${i.id}</td><td>${i.name}</td><td>${i.code}</td><td>${i.discount}</td><td><button data-id="${i.id}" class="del">Apagar</button></td>`; b.appendChild(tr) }) }

async function create(e){ e.preventDefault(); const f=e.target; const body={ name:f.name.value, code:f.code.value, discount:f.discount.value, expiration_date:f.expiration_date.value }; const token=getToken(); const r=await fetch(API,{ method:'POST', headers:{ 'Content-Type':'application/json','Authorization': `Bearer ${token}` }, body: JSON.stringify(body)}); const j=await r.json(); if(!r.ok) alert(j.error||JSON.stringify(j)); else{ alert('Criado'); fetchList() } }

document.addEventListener('DOMContentLoaded', ()=>{ document.getElementById('form-create').addEventListener('submit', create); document.querySelector('#table-list').addEventListener('click', async ev=>{ if(ev.target.matches('.del')){ const id=ev.target.dataset.id; const token=getToken(); if(!confirm('Apagar?')) return; const r=await fetch(`/coupon/${id}`,{ method:'DELETE', headers:{ 'Authorization': `Bearer ${token}` } }); const j=await r.json(); alert(j.message||j.error); fetchList(); } }) ; fetchList() })