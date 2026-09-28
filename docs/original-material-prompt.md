# Original-world material atlas

Method: built-in image generation. No external image API or CLI was used.

Saved runtime asset: `assets/terrain/original-materials.png`.

The renderer samples one quadrant per theme, applies theme brightness, and clips it to the real excavatable terrain. Snow, moss, steel and player-built steps remain game-rendered. The atlas is a surface material, not a picture of a level.

## Generation prompt

Use case: stylized-concept. Production asset for a charming side-view puzzle game. Create ONE square MATERIAL TEXTURE ATLAS divided precisely into four equal square quadrants, edge-to-edge, absolutely no gutters, no labels, no text, no objects, no sky, no grass, no perspective, no border. All four are orthographic close-up hand-painted 2D terrain surfaces, premium whimsical game art with broad readable forms, sculpted soft highlights, lovely organic details, subtle painterly grain, cohesive lighting upper left. TOP LEFT: rich warm oak heartwood and bark, large elegant flowing grain channels and a few broad irregular knot growth-rings, medium warm sienna/chestnut colour, gentle golden edge highlights, NOT wooden planks or boards, one continuous ancient organic tree surface. TOP RIGHT: beach-yellow sandstone, creamy honey gold, soft broad undulating sediment layers, occasional small rounded embedded pebbles, sun-worn natural rock, no bricks or masonry. BOTTOM LEFT: mountain glacier rock and ice, blue slate and glacial turquoise, enormous angular facets, sparse narrow pale blue mineral seams, soft milky frost, no snow caps because these are drawn separately by the game. BOTTOM RIGHT: evil volcanic obsidian, deep charcoal black and desaturated purple, broad hexagonal fractured basalt columns and chipped angular faces, restrained muted plum edge light, ABSOLUTELY NO bright lava, glowing cracks, flames, hot spots or orange. Each material fills its entire quadrant evenly, avoid extreme shadows and pure white highlights. The four material squares are intended to be cropped and applied inside actual destructible terrain silhouettes.
