// One art direction per map. Scenic silhouettes sit behind solid, editable terrain.
export const WORLDS=[
 ['woodland','Bramblewood','The Hollow Oak',['#142c2c','#416244'],['#6d4630','#815435','#966541','#583b2c','#b27c49'],['#b1cc65','#76984b','#4e703e'],'water'],
 ['beach','Shellshore Bay','Castles in the Sand',['#548b9d','#d4b989'],['#aa8452','#bd965d','#cda86d','#94724e','#e4c68a'],['#f3dc9d','#d8bc7c','#b49b68'],'water'],
 ['waterfall','Fernfall Grotto','Behind the Waterfall',['#172e40','#386f70'],['#455c61','#506e6e','#608580','#364e54','#78a298'],['#b5dcc0','#74a894','#52766a'],'water'],
 ['factory','Coppercoil Foundry','The Engine Room',['#242d37','#746352'],['#655449','#816657','#917568','#534640','#a28b73'],['#d6b977','#a78c62','#76694e'],'lava'],
 ['alpine','Cloudcap Ridge','Above the Clouds',['#517388','#b5cbca'],['#6f7d8c','#83949f','#93a9af','#546775','#b4c5c7'],['#edf3e4','#c1d7d6','#8cafb6'],'snow'],
 ['treehouse','Treetop Village','Branches and Ladders',['#183c35','#759263'],['#715135','#86613d','#a07143','#584329','#bc9156'],['#b5ce75','#76964c','#526d3c'],'water'],
 ['egypt','Amber Tombs','The Pharaohs Staircase',['#71536a','#dab780'],['#a67d47','#bc9152','#c9a76a','#8e6a3e','#dbbd81'],['#e8cf92','#c6a86a','#9c804e'],'sand'],
 ['space','Moonflower Orbit','Across the Asteroids',['#10192f','#343f64'],['#655e83','#746b95','#8b7dab','#504b6c','#a59cc0'],['#b7c2db','#8796b5','#596c93'],'void'],
 ['volcano','Emberjaw Caldera','The Sleeping Giant',['#241d30','#844139'],['#493d49','#5f4950','#705153','#342f3b','#986152'],['#b38d77','#886352','#604740'],'lava'],
 ['polar','Aurora Fjord','The Ice Slide',['#182a47','#508493'],['#4f86a1','#65a4bc','#83c3d2','#3b647c','#b3e1e5'],['#eff9ec','#bfe8e9','#8bbdce'],'snow'],
 ['candy','Sugarplum Valley','Gingerbread Detour',['#665379','#bd8fa1'],['#9e6654','#b57a61','#c88e73','#7b5148','#e5b48b'],['#f0d5dc','#d49ab5','#a4759d'],'syrup'],
 ['marble','Rosewater Palace','The Column Garden',['#4a445e','#a78e9b'],['#9f7792','#b48da5','#c9a8bb','#795a74','#e0c4ce'],['#efdbc9','#ceb5b8','#a68ca0'],'water'],
 ['prehistoric','Bonefern Caverns','Into the Fossil',['#252c30','#737c58'],['#746853','#8b7b61','#9d8c6e','#584f45','#b4a88b'],['#c4bd81','#91995f','#656e48'],'water'],
 ['castle','Briarstone Keep','Moat and Turrets',['#343e56','#7a8991'],['#646673','#7b7c88','#93959c','#4e505d','#b1aeb1'],['#b7c1a3','#909a89','#626d63'],'water'],
 ['highland','Heather Highlands','The Crooked Glen',['#476570','#b5b7a0'],['#655847','#7a6650','#92775b','#4c453a','#aa9170'],['#c0ce73','#8ca355','#597b44'],'snow'],
 ['circus','Starlight Circus','The Great Bounce',['#352447','#92677c'],['#957160','#ad8b74','#c19f88','#705850','#d9b99b'],['#e4c17c','#c39b64','#8e7054'],'water'],
 ['night','Moonlit Rooftops','Midnight Express',['#141b36','#424b68'],['#52526b','#696580','#7e7794','#3d3e55','#9890aa'],['#b6b2c4','#858499','#61637f'],'water'],
 ['sports','Lemming Games','The Obstacle Course',['#497e89','#acbfa4'],['#9a624c','#b57557','#ca8a62','#764b3c','#e1a87a'],['#c6d492','#90ab69','#668249'],'water'],
 ['station','Starport Nine','The Gravity Garden',['#15172e','#424362'],['#535b72','#67748b','#8397a5','#3e455d','#a1bcc3'],['#c8e1d5','#85b2b3','#5c8297'],'void'],
 ['enchanted','Prism Falls','Journey to the Rainbow',['#26334f','#83a4ad'],['#74618c','#8a78a1','#a192b4','#594c73','#bfafd0'],['#d3e3c1','#a6c3a6','#799e99'],'water']
].map(([key,world,name,sky,earth,grass,hazard])=>({key,world,name,sky,earth,grass,hazard,water:hazard==='syrup'?'#74506b':hazard==='sand'?'#988057':'#356a83',stone:['#596879','#72838d','#95a5a5','#415063']}));
export function applyWorlds(levels,themes){
 for(const [i,level] of levels.entries()){
  const world=WORLDS[i];themes[world.key]=world;level.theme=world.key;level.world=world.world;level.name=world.name;level.objects=[];level.hazard=world.hazard;
  // Tapered, irregular undersides make shelves into islands, roots and rock formations.
  level.shapes=level.terrain.filter(r=>r[4]===1&&r[3]<80).map(([x,y,w,h],n)=>({type:1,points:[[x,y+h-1],[x+w,y+h-1],[x+w-12,y+h+9],[x+w*.7,y+h+18+n%2*6],[x+w*.46,y+h+29],[x+w*.2,y+h+14],[x+8,y+h+8]]}));
 }
}
