(function(){
  const btn = document.createElement('button');
  btn.id = 'chatToggle';
  btn.textContent = 'Ask Core-IQ\u2122';
  Object.assign(btn.style,{position:'fixed',bottom:'20px',right:'20px',background:'#00ffae',border:'none',padding:'12px 16px',borderRadius:'8px',color:'#000',fontWeight:'bold',cursor:'pointer',zIndex:1000});
  document.body.appendChild(btn);
  const panel = document.createElement('div');
  panel.id = 'chatPanel';
  Object.assign(panel.style,{position:'fixed',bottom:'70px',right:'20px',width:'300px',background:'#111',color:'#fff',border:'1px solid #00ffae',borderRadius:'8px',padding:'10px',display:'none',zIndex:1000});
  panel.innerHTML = '<div id="chatMessages" style="max-height:200px;overflow:auto;font-size:0.9rem;margin-bottom:8px;"></div><input id="chatInput" style="width:calc(100% - 60px);padding:6px;background:#222;border:none;color:#fff;border-radius:4px;"/><button id="chatSend" style="float:right;margin-left:4px;background:#00ffae;border:none;color:#000;padding:6px 8px;border-radius:4px;font-weight:bold;">Send</button>';
  document.body.appendChild(panel);
  btn.addEventListener('click',()=>{panel.style.display=panel.style.display==='none'?'block':'none';});
  document.getElementById('chatSend').addEventListener('click',send);
  function send(){
    const input=document.getElementById('chatInput');
    const q=input.value.trim();
    if(!q) return;
    input.value='';
    const msg=document.createElement('div');
    msg.textContent='You: '+q;
    document.getElementById('chatMessages').appendChild(msg);
    fetch('/api/openai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:q})})
      .then(r=>r.json())
      .then(d=>{
        const res=document.createElement('div');
        res.textContent='AI: '+(d.answer||'No answer');
        document.getElementById('chatMessages').appendChild(res);
      })
      .catch(()=>{
        const res=document.createElement('div');res.textContent='AI: Error';document.getElementById('chatMessages').appendChild(res);
      });
  }
})();
