# Forest terrain materials

1024 px maps from [ambientCG](https://ambientcg.com), licensed CC0 1.0 (public domain, no attribution required).

| File | Source asset | Used for |
|---|---|---|
| earth-color.jpg, earth-normal.jpg | Rock051 | Diggable earth (type 1), gradient-mapped to the forest palette |
| moss-color.jpg, moss-normal.jpg | Moss002 | Grass and moss cap on exposed ground |
| stone-color.jpg, stone-normal.jpg | Rock064 | Indestructible blocks (type 2) and the exit arch |

Normal maps are the OpenGL (`NormalGL`) variants. `src/forest-hd.js` bakes them into the terrain at 2× resolution.
