const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import {mkdir,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1500,height:1050}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
const output=process.env.REVIEW_DIR||'review-output/first30';
await mkdir(output,{recursive:true});
for(let n=1;n<=30;n++){await page.goto('http://127.0.0.1:4174/original-worlds.html#'+n);await page.waitForFunction(()=>document.querySelector('#landscape')?.dataset.renderMilliseconds);await page.locator('#landscape').screenshot({path:`${output}/level-${n}.png`});}
await writeFile(output+'/errors.json',JSON.stringify(errors));
for(let chapter=0;chapter<3;chapter++){await page.setContent(`<style>body{margin:0;background:#101818;color:white;font:16px system-ui}.grid{display:grid;grid-template-columns:repeat(5,280px);gap:12px}img{width:280px;height:310px;object-fit:contain;object-position:top;background:#070c0d}figure{margin:0}figcaption{padding:5px}</style><div class="grid">${Array.from({length:10},(_,i)=>{const n=chapter*10+i+1;return `<figure><figcaption>Level ${n}</figcaption><img src="http://127.0.0.1:4174/${output}/level-${n}.png"></figure>`}).join('')}</div>`);await page.locator('img').last().waitFor();await page.evaluate(()=>Promise.all([...document.images].map(im=>im.decode())));await page.screenshot({path:`${output}/chapter-${chapter}.png`,fullPage:true});}
console.log(JSON.stringify({captured:30,errors}));await browser.close();
