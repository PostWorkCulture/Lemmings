import {readdirSync} from 'node:fs';import {spawnSync} from 'node:child_process';
for(const file of [...readdirSync('src').filter(n=>n.endsWith('.js')).map(n=>'src/'+n),'server.mjs']){const r=spawnSync(process.execPath,['--check',file],{stdio:'inherit'});if(r.status)process.exit(r.status);}
console.log('All game modules passed syntax checks.');
