// Authored rolling terrain between the flat ledges used for precision jobs.
// These are collision polygons, not painted scenery: walkers follow each crest,
// and soft slopes can be dug, mined and bashed just like the shelf underneath.
const RIDGES={
 5:[[540,300,100,13]],
 7:[[100,300,130,22],[560,300,110,18],[280,445,130,18],[255,590,80,12]],
 8:[[430,500,100,15]],
 9:[[205,140,90,16],[350,380,85,12],[715,380,150,24]],
 10:[[270,300,80,15],[500,300,150,24],[285,445,125,20],[90,590,95,17],[555,711,155,20]],
 11:[[95,300,65,12],[300,275,75,12],[510,250,70,12],[270,400,110,20],[230,545,130,18],[140,666,210,24]],
 12:[[285,320,110,22],[710,320,125,20]],
 13:[[790,230,100,18],[335,300,125,16],[280,420,95,18],[630,420,100,20],[315,541,120,22],[300,686,90,14]],
 14:[[810,260,90,16],[290,400,125,23],[600,400,120,22],[285,521,100,20],[550,666,160,25]],
 15:[[145,300,70,12],[685,300,45,8]],
 16:[[175,220,90,16],[455,220,60,10],[635,450,165,22]],
 17:[[250,475,90,17],[285,620,145,20],[680,746,35,7]],
 18:[[160,190,85,14],[440,340,125,19],[470,500,95,16]],
 19:[[175,160,85,13],[660,400,135,22]]
};

export function applyTerrainContours(levels){
 for(const level of levels){
  const ridges=[];
  for(const [x,y,w,rise] of RIDGES[level.id]||[]){
   const shelf=level.terrain.find(r=>r[0]<=x&&r[0]+r[2]>=x+w&&r[1]===y&&r[3]>=20);
   if(!shelf)continue;
   // A smooth fade gives control stations and entrances genuinely flat footing.
   const clearances=[{x:level.exitX,y:level.exitY,w:0},...(level.objects||[]).flatMap(o=>[o.y,o.top,o.bottom].filter(Number.isFinite).map(y=>({x:o.x,y,w:o.w||0})))];
   const points=[];
   for(let dx=0;dx<=w;dx+=2){
    const px=x+dx;let amount=Math.sin(Math.PI*dx/w)**2*rise;
    for(const o of clearances)if(Math.abs(o.y-y)<rise+28){const distance=Math.max(o.x-px,px-o.x-o.w,0);amount*=Math.min(1,Math.max(0,(distance-30)/24));}
    points.push([px,y-Math.round(amount)]);
   }
   points.push([x+w,y+2],[x,y+2]);
   ridges.push({type:shelf[4],points,contour:true});
  }
  level.shapes.push(...ridges);
 }
}
