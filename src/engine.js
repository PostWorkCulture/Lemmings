import {SKILLS} from './skills.js';
import {objectPosition,updateObjects,objectInteraction} from './objects.js';
import { LEVELS,rocketHeight } from './levels.js';
export const WIDTH = 1000, HEIGHT = 470;
export const EXIT_FRAMES = 96;
export const LEVEL = LEVELS[0];
export class Game {
  constructor(levelIndex=0) { this.reset(levelIndex); }
  reset(levelIndex=this.levelIndex??0) {
    if(!LEVELS[levelIndex])throw new RangeError('Unknown level');
    this.levelIndex=levelIndex;this.level=LEVELS[levelIndex];
    this.height=this.level.height||HEIGHT;this.hazardY=this.height-28;
    this.terrain = new Uint8Array(WIDTH * this.height);
    for(const rect of this.level.terrain)this.rect(...rect);
    for(const shape of this.level.shapes||[])this.polygon(shape.points,shape.type);
    if(this.level.hazard==='toys')this.rect(0,this.hazardY,WIDTH,28,2);
    this.units=[];this.effects=[]; this.lastSpawnTick=null; this.spawned=0; this.saved=0; this.lost=0; this.tick=0;
    this.disabledObjects=new Set();this.stock={...this.level.stock}; this.result=null; this.events=[]; this.revision=(this.revision||0)+1;
  }
  rect(x,y,w,h,type) {
    for(let yy=Math.max(0,Math.floor(y));yy<Math.min(this.height,Math.ceil(y+h));yy++)
      for(let xx=Math.max(0,Math.floor(x));xx<Math.min(WIDTH,Math.ceil(x+w));xx++) {
        const i=yy*WIDTH+xx;
        if(this.terrain[i]!==2 || type===2) this.terrain[i]=type;
      }
    this.revision=(this.revision||0)+1;
  }
  polygon(points,type=1){
    const lo=Math.max(0,Math.floor(Math.min(...points.map(p=>p[1])))),hi=Math.min(this.height,Math.ceil(Math.max(...points.map(p=>p[1]))));
    for(let y=lo;y<hi;y++){const xs=[];for(let i=0;i<points.length;i++){const [ax,ay]=points[i],[bx,by]=points[(i+1)%points.length];if((ay<=y&&by>y)||(by<=y&&ay>y))xs.push(ax+(y-ay)*(bx-ax)/(by-ay));}xs.sort((a,b)=>a-b);for(let i=0;i<xs.length;i+=2)this.rect(xs[i],y,xs[i+1]-xs[i],1,type);}
  }
  at(x,y) { x=Math.floor(x);y=Math.floor(y);if(x<0||x>=WIDTH||y<0||y>=this.height)return 0;for(const o of this.level.objects||[]){if(((o.type==='gate'&&!this.disabledObjects.has(o.id))||(o.type==='bridge'&&this.disabledObjects.has(o.id)))&&x>=o.x&&x<o.x+o.w&&y>=o.y&&y<o.y+o.h)return 2;}for(const o of this.level.objects||[])if(o.type==='lift'){const p=objectPosition(o,this.tick);if(x>=p.x&&x<=p.x+o.w&&y>=Math.floor(p.y)&&y<Math.floor(p.y)+5)return 2;}return this.terrain[y*WIDTH+x]; }
  spawn() { this.lastSpawnTick=this.tick;const entrance=this.level.entrances?.[this.spawned%this.level.entrances.length]||{x:this.level.spawnX,y:this.level.spawnY,dir:this.level.dir};const u={id:this.spawned++,x:entrance.x,y:entrance.y,dir:entrance.dir,state:'fall',vy:0,fallStart:entrance.y,jobTick:0,steps:0};u.arrival={x:entrance.x,y:entrance.y,startY:rocketHeight(this.level,entrance),age:0,duration:Math.max(1,Math.abs(entrance.y-(rocketHeight(this.level,entrance)))/1.5)};u.x=entrance.x;u.y=rocketHeight(this.level,entrance);this.units.push(u);return u; }
  canAssign(u,skill) {
    if(!u||!this.units.includes(u)||this.result||['exit','drown','saved','lost'].includes(u.state))return 'Choose a lemming first.';
    if(!SKILLS[skill])return 'Unknown skill.';
    if(['block','attract'].includes(skill)&&u.state===skill)return '';
    if(skill==='walk')return ['walk','fall','jump','ladder','pole','climb','swim','slide'].includes(u.state)?'Choose a lemming doing a job.':'';
    if((this.stock[skill]||0)<=0)return 'No more of that skill left.';
    if(SKILLS[skill].permanent&&u.abilities?.[skill])return 'This lemming already has that ability.';
    if(SKILLS[skill].air&&['walk','fall','jump'].includes(u.state))return '';
    if(u.state!=='walk')return 'Choose a walking lemming on solid ground.';
    if(!this.at(u.x,u.y))return 'Wait until this lemming lands.';
    if(['dig','mine'].includes(skill)&&this.at(u.x,u.y)===2)return 'That stone is too hard to dig through.';
    return '';
  }
  assign(id,skill) {
    const u=this.units.find(u=>u.id===id),error=this.canAssign(u,skill);if(error)return {ok:false,message:error};
    if(['block','attract'].includes(skill)&&u.state===skill)skill='walk';
    if(skill==='walk'&&u.state==='block')u.dir=u.releaseDir??u.dir;
    if(skill==='block')u.releaseDir=null;
    if(skill==='bash'){u.bashStarted=false;u.bashApproach=0;}
    if(skill!=='walk')this.stock[skill]--;
    if(SKILLS[skill].permanent){u.abilities={...u.abilities,[skill]:true};}
    else if(skill==='turn'){u.dir*=-1;}
    else {u.state=skill;u.jobTick=0;u.steps=0;if(skill==='jump'){u.vy=-4.2;u.vx=u.dir*2.2;u.fallStart=u.y;u.safeJump=true;}}
    this.events.push({tick:this.tick,id,skill});return {ok:true};
  }
  fall(u) { u.state='fall';u.vy=0;u.fallStart=u.y; }
  remove(u,saved=false) { if(['saved','lost'].includes(u.state))return;if(!saved)this.effects.push({type:'splat',x:Math.max(13,Math.min(WIDTH-13,u.x)),y:Math.min(this.height-5,u.y),tick:this.tick});u.state=saved?'saved':'lost';saved?this.saved++:this.lost++; }
  step() {
    if(this.result)return;
    if(this.spawned<this.level.total && this.tick%this.level.interval===0)this.spawn();
    updateObjects(this);this.tick++;this.effects=this.effects.filter(e=>this.tick-e.tick<=150);
    for(const u of this.units) {
      if(u.state==='saved'||u.state==='lost')continue;
      if(u.arrival){
        const a=u.arrival,p=Math.min(1,++a.age/a.duration);
        u.x=a.x;u.y=a.startY+(a.y-a.startY)*p;
        if(p===1){u.arrival=null;u.fallStart=u.y;u.vy=0;}
        continue;
      }
      if(u.state==='slide'){
        const slope=u.slideSlope;u.x-=slope.uphill*1.8;
        let floor=null;for(let y=u.y-5;y<=u.y+10;y++)if(this.at(u.x,y)&&!this.at(u.x,y-1)){floor=y;break;}
        if(floor!==null)u.y=floor;
        if((u.x-slope.baseX)*slope.uphill<=0||floor===null){u.state='walk';u.dir=-slope.uphill;u.slideSlope=null;}
        continue;
      }
      if(u.state==='walk'||u.state==='climb'){
        const slope=(this.level.slipperySlopes||[]).find(s=>u.x>=s.x&&u.x<s.x+s.w&&u.y>=s.y&&u.y<s.y+s.h&&u.y<s.ceiling&&u.dir===s.uphill&&this.at(u.x,u.y)!==3);
        if(slope){u.state='slide';u.slideSlope=slope;u.dir=-slope.uphill;continue;}
      }
      if(u.state==='drown'){
        if(this.tick-u.drownStart>=180)this.remove(u);
        continue;
      }
      if(u.state==='exit'){
        u.exitTick++;
        const approach=Math.max(0,Math.min(1,(u.exitTick-16)/26));
        u.x=u.exitStartX+(this.level.exitX-u.exitStartX)*approach;
        if(u.exitTick>=EXIT_FRAMES)this.remove(u,true);
        continue;
      }
      if(u.y>=this.hazardY&&u.abilities?.swim&&!['lava','void','sand','syrup','snow','toys'].includes(this.level.hazard)){u.state='swim';u.y=this.hazardY;}
      if(u.y>=this.hazardY&&this.level.hazard==='water'&&!u.abilities?.swim){
        u.state='drown';u.y=this.hazardY+3;u.drownStart=this.tick;u.shark=u.id%3===0;continue;
      }
      if((u.y>=this.hazardY&&u.state!=='swim'&&this.level.hazard!=='toys')||u.x<8||u.x>990){this.remove(u);continue;}
      if(objectInteraction(this,u))continue;
      if(u.riding&&['walk','block','attract'].includes(u.state))continue;
      if(u.state==='ladder'||u.state==='pole'){
        const o=u.object,target=u.state==='ladder'?o.top:o.bottom;u.y+=Math.sign(target-u.y)*Math.min(1.1,Math.abs(target-u.y));
        if(Math.abs(u.y-target)<.2){u.y=target;u.dir=o.dir||u.dir;u.x+=u.dir*12;while(o.surfaceExit&&u.y>0&&this.at(u.x,u.y-1))u.y--;u.state='walk';u.object=null;}continue;
      }
      if(u.state==='swim'){const nx=u.x+u.dir*.8;if(this.at(nx,this.hazardY-4)){u.y=this.hazardY-5;while(this.at(nx,u.y)&&u.y>this.hazardY-52)u.y--;u.y++;u.state='walk';}u.x=nx;continue;}
      if(u.state==='climb'){if(this.at(u.x-u.dir*2,u.y-25)){u.dir*=-1;this.fall(u);continue;}u.y-=.8;if(!this.at(u.x+u.dir*2,u.y-1)){u.x+=u.dir*4;u.y=Math.floor(u.y);u.state='walk';}continue;}
      if(u.state==='jump'){
        u.vy=Math.min(u.vy+.16,4);const nx=u.x+u.vx;
        if(this.at(nx,u.y-10)){u.vx=-u.vx;u.dir*=-1;}else u.x=nx;
        if(u.vy<0&&this.at(u.x,u.y-24+u.vy))u.vy=0;
        let landed=false;if(u.vy>=0)for(let y=u.y;y<=u.y+u.vy;y+=.5)if(this.at(u.x,y)){u.y=Math.floor(y);u.state='walk';u.vy=0;landed=true;break;}
        if(!landed)u.y+=u.vy;continue;
      }

      if(u.x>=this.level.exitX-12&&u.x<=this.level.exitX+20&&Math.abs(u.y-this.level.exitY)<5){u.state='exit';u.exitTick=0;u.exitStartX=u.x;continue;}
      if(u.state==='fall') {
        u.vy=Math.min(u.vy+(this.level.gravity||.19),u.abilities?.float?.9:4);
        let landed=false;
        for(let y=u.y;y<=u.y+u.vy;y+=.5)if(this.at(u.x,y)){u.y=Math.floor(y);landed=true;break;}
        if(landed){if(u.y-u.fallStart>155&&!u.abilities?.float)this.remove(u);else {u.state='walk';u.vy=0;}}else u.y+=u.vy;
        continue;
      }
      if(!this.at(u.x,u.y)){this.fall(u);continue;}
      if(u.state==='block'||u.state==='attract')continue;
      if(u.state==='walk'&&this.units.some(b=>b.state==='attract'&&Math.hypot(b.x-u.x,b.y-u.y)<70))continue;
      if(u.state==='explode'){if(++u.jobTick>=180){for(let y=-26;y<=26;y++){const w=Math.sqrt(26*26-y*y);this.rect(u.x-w,u.y-12+y,w*2,1,0);}this.remove(u);}continue;}
      if(u.state==='bash'||u.state==='mine'){
        if(++u.jobTick%8===0){const mining=u.state==='mine',nx=u.x+u.dir*3,ny=u.y+(mining?2:0);let steel=false,earth=false;
          for(let y=ny-22;y<ny+(mining?3:0);y++)for(let x=nx-7;x<nx+8;x++){const t=this.at(x,y);if(t===2||(t===1&&(this.level.oneWay||[]).some(z=>x>=z.x&&x<z.x+z.w&&y>=z.y&&y<z.y+z.h&&u.dir!==z.dir)))steel=true;if(t===1||t===3)earth=true;}
          if(steel){u.state='walk';continue;}if(!earth&&!mining){
            if(!u.bashStarted&&(u.bashApproach||0)<36){u.bashApproach=(u.bashApproach||0)+3;u.x=nx;if(!this.at(u.x,u.y))this.fall(u);continue;}
            u.state='walk';continue;
          }
          if(!mining)u.bashStarted=true;this.rect(nx-8,ny-23,16,23,0);u.x=nx;u.y=ny;if(!this.at(u.x,u.y))this.fall(u);
        }continue;
      }
      if(u.state==='platform'||u.state==='stack'){
        if(++u.jobTick%12===0){const stacking=u.state==='stack',nx=u.x+(stacking?0:u.dir*6),ny=u.y-(stacking?3:0);
          if(this.at(nx,ny-5)){u.state='walk';continue;}this.rect(stacking?u.x-6:Math.min(u.x,nx)-2,ny,stacking?12:16,stacking?3:2,3);u.x=nx;u.y=ny;if(++u.steps>=(stacking?12:16))u.state='walk';
        }continue;
      }

      if(u.state==='build') {
        if(++u.jobTick%12===0){
          if(this.at(u.x+u.dir*8,u.y-7)){u.state='walk';u.dir*=-1;continue;}
          const nx=u.x+u.dir*6,ny=u.y-2;
          this.rect(u.dir===1?u.x-2:nx-8,ny,16,2,3);
          u.x=nx;u.y=ny;u.steps++;
          if(u.steps>=16)u.state='walk';
        }
        continue;
      }
      if(u.state==='dig') {
        if(++u.jobTick%9===0) {
          let steel=false;for(let x=u.x-10;x<u.x+11;x++)if(this.at(x,u.y)===2)steel=true;
          if(steel){u.state='walk';continue;}
          this.rect(u.x-11,u.y,23,3,0);u.y+=3;
          if(!this.at(u.x,u.y))this.fall(u);
        }
        continue;
      }
      const blocker=this.units.find(b=>b.state==='block'&&b.id!==u.id&&Math.abs(b.y-u.y)<12&& (b.x-u.x)*u.dir>=0 && (b.x-u.x)*u.dir<12);
      if(blocker){const overlap=Math.abs(blocker.x-u.x)<.01;u.dir*=-1;blocker.releaseDir=u.dir;if(overlap)u.x+=u.dir*.65;continue;}
      const nx=u.x+u.dir*(u.abilities?.run?1.3:.65);
      const waiting=(this.level.objects||[]).some(o=>o.type==='lift'&&Math.abs(u.y-o.y)<2&&((u.dir===1&&u.x>=o.x-3&&u.x<=o.x+8)||(u.dir===-1&&u.x<=o.toX+o.w+3&&u.x>=o.toX+o.w-8))&&(!this.at(nx,u.y)||!this.at(nx+u.dir*4,u.y)));
      if(waiting)continue;
      let surface=null;
      for(let yy=u.y-4;yy<=u.y+5;yy++)if(this.at(nx,yy)&&!this.at(nx,yy-1)){surface=yy;break;}
      if(this.at(nx,u.y-5) || (surface===null&&this.at(nx,u.y))) {if(u.abilities?.climb){u.state='climb';}else u.dir*=-1;continue;}
      u.x=nx;
      if(surface!==null)u.y=surface;else this.fall(u);
    }
    this.units=this.units.filter(u=>u.state!=='saved'&&u.state!=='lost');
    if(this.saved+this.lost===this.level.total)this.result=this.saved>=this.level.target?'win':'lose';

  }
}
