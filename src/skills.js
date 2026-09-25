export const SKILLS={
 walk:{name:'Walker',help:'Stop a job or release a blocker. Unlimited uses.'},
 block:{name:'Blocker',help:'Turn the crowd back. Click again to release for free.'},
 build:{name:'Builder',help:'Build a rising staircase of 16 steps.'},
 dig:{name:'Digger',help:'Dig straight down through soft ground.'},
 bash:{name:'Basher',help:'Tunnel through soft walls. You can assign shortly before the wall; the lemming approaches before tunnelling.'},
 mine:{name:'Miner',help:'Cut a sloping tunnel down and forward. Steel stops the pick.'},
 platform:{name:'Platformer',help:'Build 16 horizontal steps across a gap.'},
 climb:{name:'Climber',help:'Permanently learn to climb vertical walls. Overhangs turn you back.',permanent:true},
 float:{name:'Parachuter',help:'Permanently gain a parachute for safe long falls.',permanent:true,air:true},
 jump:{name:'Jumper',help:'Take one long leap in the current direction.'},
 swim:{name:'Swimmer',help:'Permanently learn to survive water and swim to a bank. Lava is still deadly.',permanent:true,air:true},
 run:{name:'Runner',help:'Permanently walk twice as fast.',permanent:true},
 stack:{name:'Stacker',help:'Build a vertical column of 12 blocks, then step off.'},
 turn:{name:'Turner',help:'Turn this lemming around immediately.'},
 attract:{name:'Attractor',help:'Play music to hold nearby walkers. Walker stops the music.'},
 explode:{name:'Exploder',help:'After three seconds, sacrifice this lemming to open a circular hole. Steel survives.'}
};
export const SKILL_ORDER=Object.keys(SKILLS);
