import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const app='users';
const port='3000';
const cli=require.resolve('next/dist/bin/next',{paths:[`${process.cwd()}/apps/${app}`]});
const child=spawn(process.execPath,[cli,'start','-p',process.env.PORT??port],{cwd:`${process.cwd()}/apps/${app}`,env:process.env,stdio:'inherit',windowsHide:true});
child.on('exit',code=>process.exit(code??1));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
