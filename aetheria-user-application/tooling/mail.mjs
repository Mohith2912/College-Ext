import { SMTPServer } from 'smtp-server';
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const dir=path.resolve('.local/mail');
await mkdir(dir,{recursive:true});
const smtp=new SMTPServer({
  disabledCommands:['AUTH','STARTTLS'],
  onData(stream,session,callback){
    let content='';
    stream.on('data',chunk=>{content+=chunk.toString();});
    stream.on('end',()=>{writeFile(path.join(dir,`${Date.now()}-${randomUUID()}.json`),JSON.stringify({to:session.envelope.rcptTo.map(r=>r.address),raw:content,receivedAt:new Date().toISOString()})).then(()=>callback()).catch(callback);});
  },
  size:1024*1024,
});
smtp.listen(1025,'127.0.0.1',()=>console.log('Local email delivery on 127.0.0.1:1025. Inbox: http://localhost:8025'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
createServer(async(req,res)=>{
  if(req.method!=='GET'){res.writeHead(405).end();return;}
  const messages=await Promise.all((await readdir(dir)).filter(f=>f.endsWith('.json')).sort().reverse().map(async f=>JSON.parse(await readFile(path.join(dir,f),'utf8'))));
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.url==='/api/messages'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify(messages));return;}
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><title>Aetheria local inbox</title><style>body{font:16px system-ui;max-width:900px;margin:48px auto;background:#f7f5ef;color:#292722}article{padding:24px;margin:16px 0;border:1px solid #cbc6bd;background:#fff}pre{white-space:pre-wrap;overflow-wrap:anywhere}a{color:#145b54}</style><h1>Local development inbox</h1><p>Messages stay on this computer. Use a real email service for deployment.</p>${messages.map(m=>`<article><b>${escape(m.to.join(', '))}</b><pre>${escape(m.raw).replace(/(https?:\/\/[^\s&lt;]+)/g,'<a href="$1">$1</a>')}</pre></article>`).join('') || '<p>No messages yet.</p>'}</html>`);
}).listen(8025,'127.0.0.1');
