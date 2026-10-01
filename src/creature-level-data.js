// Hand-authored routes follow the actual chambers, leaves, shells and branches.
export const CREATURE_IDS=[5,6,7,8,9,25,26,27,28,29];
export const CREATURE_PLANS=[
 ['The Ant Architects','Climb through the seed chambers, open the packed-earth plugs and repair the leaf bridge.'],
 ['A Shell of a Journey','Travel into the shell, then wind back up its pearly spiral to the mossy lip.'],
 ['Honey, I Shrunk the Lemmings','Open a shaft through the wax and parachute into the hive’s lower honey gallery.'],
 ['Feather Your Nest','Cross the woven nest, tunnel through the eggshell and climb the far branch.'],
 ['The Walnut Locksmith','Work up through the mouse’s walnut rooms and acorn balconies.'],
 ['Making a Mountain of a Molehill','Descend through the grassy roof into the mole’s mineral gallery.'],
 ['Silk Road','Repair the lower root crossing, climb the seedpod and return across the braided silk.'],
 ['The Chrysalis Crossing','Follow the milkweed arch, clear the chrysalis passage and build towards the flower.'],
 ['Beetle Backroad','Join the iridescent wing-case ramps across the hollow log.'],
 ['Do Not Wake the Hedgehog','Loop through the lower burrow and return along the curled autumn leaf.']
].map(([name,terrain])=>({name,terrain}));
const make=(file,source,paths,walls,gaps,ladders=[],shafts=[],extra={})=>({file:'assets/creature-comfort/'+file+'.png',source,paths,walls,gaps,ladders,shafts,world:'creature',...extra});
export const CREATURE_ROUTES=[
 make('01-ant-and-snail',[0,0,1254,580],[[[90,510],[260,510],[365,550],[585,555],[810,530],[885,450]],[[875,395],[730,410],[540,420],[355,405]],[[365,265],[490,278],[630,280],[720,267],[785,245],[935,245]]],[[510,555],[505,417]],[[700,747,270]],[[875,456,395,-1],[365,406,265,1]]),
 make('01-ant-and-snail',[0,591,1254,645],[[[885,465],[750,485],[650,500],[490,500],[410,465]],[[420,335],[525,330],[555,290]],[[550,160],[440,150],[310,150],[245,100],[145,100]]],[[650,500],[345,150]],[[530,578,500]],[[410,465,335,1],[550,295,160,-1]]),
 make('02-hive-and-nest',[0,15,1254,590],[[[90,75],[160,75],[200,118],[310,118],[360,135]],[[350,475],[475,480],[570,480],[695,487],[800,495],[860,485],[910,535],[955,535]]],[[585,482]],[[735,785,490]],[],[[350,132,475]],{gapRise:12}),
 make('02-hive-and-nest',[0,620,1254,610],[[[110,460],[260,460],[365,465],[445,400],[615,380],[685,385],[725,465],[890,485]],[[880,190],[940,190]]],[[480,395],[755,470]],[[275,325,460]],[[880,484,190,1]],[],{gapRise:0}),
 make('03-mouse-and-mole',[0,0,1254,580],[[[85,485],[240,530],[365,515],[440,480],[485,505],[595,490],[685,460],[795,450]],[[785,330],[650,320],[570,305]],[[580,210],[735,230],[805,245],[850,210],[930,150]]],[[280,525],[720,325]],[[755,803,236]],[[785,451,330,-1],[580,308,210,1]]),
 make('03-mouse-and-mole',[0,590,1254,635],[[[920,65],[865,65],[835,185],[755,220],[695,230],[630,170],[485,175]],[[500,480],[625,480],[720,490],[815,545],[930,545]]],[[725,225],[765,516]],[[570,615,480]],[],[[500,174,480]],{gapRise:0}),
 make('04-silk-and-butterfly',[0,0,1254,625],[[[100,450],[270,430],[425,465],[610,480],[780,470],[850,410]],[[840,310],[790,335],[700,350],[560,385],[470,350],[445,250],[350,280],[215,270]],[[220,130],[330,205],[450,220],[560,200],[690,235],[815,185],[920,180]]],[[335,445],[725,345]],[[535,585,474],[720,765,223]],[[840,419,310,-1],[220,270,130,1]],[],{gapRise:0}),
 make('04-silk-and-butterfly',[0,656,1254,562],[[[90,470],[180,470],[280,465],[400,360],[525,330],[650,285],[730,285]],[[730,190],[790,200],[865,155],[935,155]]],[[345,410],[640,285]],[[490,538,337]],[[720,285,190,1]],[],{gapRise:12}),
 make('05-beetle-and-hedgehog',[0,0,1254,520],[[[90,215],[175,220],[260,310],[340,390],[440,375],[510,300],[565,290],[580,215],[700,210],[850,215],[950,125]]],[[285,335],[775,212]],[[455,505,360]],[],[],{gapRise:0}),
 make('05-beetle-and-hedgehog',[0,520,1254,645],[[[900,525],[770,545],[625,530],[555,480],[435,475]],[[445,290],[360,235],[240,210],[155,210],[100,190]],[[110,90],[205,155],[280,165],[330,125],[430,175],[540,220],[610,315],[680,335],[720,305],[790,250],[920,205]]],[[700,538],[225,210],[485,198]],[[710,760,305]],[[445,475,290,-1],[110,194,90,1]],[],{gapRise:12})
];
// Rescue-tested budgets and star times.
const budgets=[{"stock":{"attract":1,"bash":2,"platform":1},"targetTime":125},{"stock":{"attract":1,"bash":2,"build":1},"targetTime":85},{"stock":{"float":12,"attract":1,"dig":1,"bash":1,"build":1},"targetTime":90},{"stock":{"attract":1,"platform":1,"bash":2},"targetTime":95},{"stock":{"attract":1,"bash":2,"build":1},"targetTime":100},{"stock":{"float":5,"attract":1,"bash":2,"dig":1,"platform":1},"targetTime":85},{"stock":{"attract":1,"bash":2,"platform":2},"targetTime":140},{"stock":{"attract":1,"bash":2,"build":1},"targetTime":80},{"stock":{"attract":1,"bash":2,"platform":1},"targetTime":80},{"stock":{"attract":1,"bash":3,"build":1},"targetTime":150}];
CREATURE_ROUTES.forEach((r,i)=>Object.assign(r,budgets[i]));
