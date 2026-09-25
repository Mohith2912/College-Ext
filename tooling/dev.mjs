import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const children=[];
for(const [app,port] of [['users','3000'],['admin','3001']]){
  const cli=require.resolve('next/dist/bin/next',{paths:[`${process.cwd()}/apps/${app}`]});
  children.push(spawn(process.execPath,[cli,'dev','--port',port],{cwd:`${process.cwd()}/apps/${app}`,env:process.env,stdio:'inherit',windowsHide:true}));
}
children.push(spawn(process.execPath,['tooling/mail.mjs'],{env:process.env,stdio:'inherit',windowsHide:true}));
for(const child of children)child.on('exit',code=>{if(code && code!==0){for(const sibling of children)sibling.kill();process.exitCode=code;}});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{for(const child of children)child.kill();process.exit();});
