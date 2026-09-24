// Authored multi-stage campaign layouts.
export const DIFFICULT_LAYOUTS=[
  {
    "id": 5,
    "name": "Branches and Ladders",
    "world": "Treetop Village",
    "theme": "treehouse",
    "total": 20,
    "target": 18,
    "spawnX": 105,
    "spawnY": 280,
    "dir": 1,
    "interval": 100,
    "exitX": 100,
    "exitY": 467,
    "stock": {
      "block": 2,
      "build": 1,
      "dig": 1,
      "bash": 2,
      "platform": 1
    },
    "terrain": [
      [
        40,
        330,
        250,
        95,
        1
      ],
      [
        40,
        265,
        14,
        80,
        2
      ],
      [
        230,
        230,
        250,
        40,
        1
      ],
      [
        545,
        230,
        415,
        44,
        1
      ],
      [
        730,
        170,
        28,
        60,
        1
      ],
      [
        948,
        165,
        12,
        80,
        2
      ],
      [
        837,
        355,
        56,
        12,
        1
      ],
      [
        500,
        467,
        460,
        50,
        1
      ],
      [
        40,
        467,
        390,
        50,
        1
      ],
      [
        946,
        402,
        14,
        90,
        2
      ],
      [
        40,
        402,
        12,
        90,
        2
      ],
      [
        728,
        391,
        62,
        76,
        1
      ],
      [
        424,
        439,
        79,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 2-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "ladder",
        "x": 250,
        "y": 330,
        "top": 230,
        "dir": 1
      },
      {
        "type": "pole",
        "x": 865,
        "y": 355,
        "bottom": 467,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 728,
        "y": 391,
        "w": 62,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            424
          ],
          [
            290,
            424
          ],
          [
            278,
            437
          ],
          [
            197.5,
            447
          ],
          [
            115,
            438
          ],
          [
            52,
            433
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            230,
            269
          ],
          [
            480,
            269
          ],
          [
            468,
            282
          ],
          [
            387.5,
            292
          ],
          [
            305,
            283
          ],
          [
            242,
            278
          ]
        ]
      }
    ],
    "height": 602,
    "difficulty": "Medium"
  },
  {
    "id": 6,
    "name": "The Pharaohs Staircase",
    "world": "Amber Tombs",
    "theme": "egypt",
    "total": 20,
    "target": 18,
    "spawnX": 895,
    "spawnY": 88,
    "dir": -1,
    "interval": 100,
    "exitX": 900,
    "exitY": 470,
    "stock": {
      "block": 2,
      "build": 0,
      "dig": 3,
      "bash": 1,
      "platform": 1
    },
    "terrain": [
      [
        610,
        125,
        350,
        28,
        1
      ],
      [
        410,
        225,
        380,
        28,
        1
      ],
      [
        40,
        325,
        530,
        44,
        1
      ],
      [
        946,
        60,
        14,
        75,
        2
      ],
      [
        610,
        60,
        14,
        93,
        2
      ],
      [
        410,
        160,
        14,
        93,
        2
      ],
      [
        40,
        260,
        12,
        85,
        2
      ],
      [
        40,
        470,
        350,
        50,
        1
      ],
      [
        455,
        470,
        505,
        50,
        1
      ],
      [
        40,
        405,
        14,
        90,
        2
      ],
      [
        948,
        405,
        12,
        90,
        2
      ],
      [
        235,
        394,
        38,
        76,
        1
      ],
      [
        387,
        442,
        74,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 2-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "rubble",
        "x": 235,
        "y": 394,
        "w": 38,
        "h": 76
      }
    ],
    "hazard": "sand",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            610,
            152
          ],
          [
            960,
            152
          ],
          [
            948,
            162
          ],
          [
            855,
            171
          ],
          [
            771,
            182
          ],
          [
            680,
            167
          ],
          [
            618,
            161
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            410,
            252
          ],
          [
            790,
            252
          ],
          [
            778,
            262
          ],
          [
            676,
            277
          ],
          [
            584.8,
            282
          ],
          [
            486,
            267
          ],
          [
            418,
            261
          ]
        ]
      }
    ],
    "height": 605,
    "difficulty": "Medium"
  },
  {
    "id": 7,
    "name": "Across the Asteroids",
    "world": "Moonflower Orbit",
    "theme": "space",
    "total": 20,
    "target": 18,
    "spawnX": 105,
    "spawnY": 250,
    "dir": 1,
    "interval": 100,
    "exitX": 100,
    "exitY": 445,
    "stock": {
      "block": 2,
      "build": 0,
      "dig": 1,
      "bash": 2,
      "platform": 1
    },
    "terrain": [
      [
        40,
        300,
        240,
        50,
        1
      ],
      [
        40,
        235,
        14,
        80,
        2
      ],
      [
        550,
        300,
        410,
        44,
        1
      ],
      [
        740,
        255,
        30,
        45,
        1
      ],
      [
        948,
        235,
        12,
        80,
        2
      ],
      [
        555,
        445,
        405,
        50,
        1
      ],
      [
        40,
        445,
        440,
        50,
        1
      ],
      [
        946,
        380,
        14,
        90,
        2
      ],
      [
        40,
        380,
        12,
        90,
        2
      ],
      [
        690,
        369,
        50,
        76,
        1
      ],
      [
        474,
        417,
        84,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 2-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "id": "shuttle",
        "type": "lift",
        "x": 275,
        "y": 300,
        "toX": 495,
        "toY": 300,
        "w": 60,
        "period": 720
      },
      {
        "type": "rubble",
        "x": 690,
        "y": 369,
        "w": 50,
        "h": 76
      }
    ],
    "hazard": "void",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            349
          ],
          [
            280,
            349
          ],
          [
            268,
            362
          ],
          [
            191.2,
            372
          ],
          [
            112,
            363
          ],
          [
            52,
            358
          ]
        ]
      }
    ],
    "gravity": 0.12,
    "height": 580,
    "difficulty": "Medium"
  },
  {
    "id": 8,
    "name": "The Sleeping Giant",
    "world": "Emberjaw Caldera",
    "theme": "volcano",
    "total": 20,
    "target": 18,
    "spawnX": 105,
    "spawnY": 120,
    "dir": 1,
    "interval": 100,
    "exitX": 100,
    "exitY": 380,
    "stock": {
      "block": 2,
      "build": 2,
      "dig": 2,
      "bash": 1,
      "platform": 1
    },
    "terrain": [
      [
        40,
        170,
        230,
        28,
        1
      ],
      [
        335,
        145,
        245,
        28,
        1
      ],
      [
        400,
        260,
        270,
        28,
        1
      ],
      [
        735,
        235,
        225,
        44,
        1
      ],
      [
        40,
        105,
        14,
        75,
        2
      ],
      [
        566,
        80,
        14,
        93,
        2
      ],
      [
        948,
        170,
        12,
        85,
        2
      ],
      [
        500,
        380,
        460,
        50,
        1
      ],
      [
        40,
        380,
        390,
        50,
        1
      ],
      [
        946,
        315,
        14,
        90,
        2
      ],
      [
        40,
        315,
        12,
        90,
        2
      ],
      [
        753,
        304,
        62,
        76,
        1
      ],
      [
        424,
        352,
        79,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 2-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "rubble",
        "x": 753,
        "y": 304,
        "w": 62,
        "h": 76
      }
    ],
    "hazard": "lava",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            197
          ],
          [
            270,
            197
          ],
          [
            258,
            207
          ],
          [
            201,
            216
          ],
          [
            145.8,
            227
          ],
          [
            86,
            212
          ],
          [
            48,
            206
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            335,
            172
          ],
          [
            580,
            172
          ],
          [
            568,
            182
          ],
          [
            506.5,
            197
          ],
          [
            447.7,
            202
          ],
          [
            384,
            187
          ],
          [
            343,
            181
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            400,
            287
          ],
          [
            670,
            287
          ],
          [
            658,
            297
          ],
          [
            589,
            306
          ],
          [
            524.2,
            317
          ],
          [
            454,
            302
          ],
          [
            408,
            296
          ]
        ]
      }
    ],
    "height": 515,
    "difficulty": "Medium"
  },
  {
    "id": 9,
    "name": "The Ice Slide",
    "world": "Aurora Fjord",
    "theme": "polar",
    "total": 20,
    "target": 18,
    "spawnX": 105,
    "spawnY": 90,
    "dir": 1,
    "interval": 100,
    "exitX": 100,
    "exitY": 425,
    "stock": {
      "block": 2,
      "build": 0,
      "dig": 1,
      "platform": 2,
      "bash": 2
    },
    "terrain": [
      [
        40,
        140,
        390,
        35,
        1
      ],
      [
        40,
        75,
        14,
        80,
        2
      ],
      [
        320,
        280,
        290,
        50,
        1
      ],
      [
        675,
        280,
        285,
        44,
        1
      ],
      [
        820,
        230,
        26,
        50,
        1
      ],
      [
        948,
        215,
        12,
        80,
        2
      ],
      [
        610,
        425,
        350,
        50,
        1
      ],
      [
        40,
        425,
        505,
        50,
        1
      ],
      [
        946,
        360,
        14,
        90,
        2
      ],
      [
        40,
        360,
        12,
        90,
        2
      ],
      [
        752,
        349,
        38,
        76,
        1
      ],
      [
        539,
        397,
        74,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 2-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "pole",
        "x": 405,
        "y": 140,
        "bottom": 280,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 752,
        "y": 349,
        "w": 38,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            174
          ],
          [
            430,
            174
          ],
          [
            418,
            187
          ],
          [
            285.7,
            197
          ],
          [
            157,
            188
          ],
          [
            52,
            183
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            320,
            329
          ],
          [
            610,
            329
          ],
          [
            598,
            342
          ],
          [
            502.7,
            352
          ],
          [
            407,
            343
          ],
          [
            332,
            338
          ]
        ]
      }
    ],
    "height": 560,
    "difficulty": "Medium"
  },
  {
    "id": 10,
    "name": "Gingerbread Detour",
    "world": "Sugarplum Valley",
    "theme": "candy",
    "total": 20,
    "target": 19,
    "spawnX": 105,
    "spawnY": 250,
    "dir": 1,
    "interval": 100,
    "exitX": 900,
    "exitY": 566,
    "stock": {
      "block": 1,
      "build": 1,
      "dig": 1,
      "bash": 4,
      "platform": 2,
      "mine": 1
    },
    "terrain": [
      [
        40,
        300,
        360,
        100,
        1
      ],
      [
        40,
        235,
        14,
        80,
        2
      ],
      [
        230,
        245,
        30,
        55,
        1
      ],
      [
        465,
        300,
        495,
        44,
        1
      ],
      [
        720,
        240,
        30,
        60,
        1
      ],
      [
        948,
        235,
        12,
        80,
        2
      ],
      [
        555,
        445,
        405,
        50,
        1
      ],
      [
        40,
        445,
        440,
        50,
        1
      ],
      [
        946,
        380,
        14,
        90,
        2
      ],
      [
        40,
        380,
        12,
        90,
        2
      ],
      [
        715,
        369,
        50,
        76,
        1
      ],
      [
        474,
        417,
        84,
        4,
        2
      ],
      [
        40,
        590,
        350,
        50,
        1
      ],
      [
        455,
        566,
        505,
        50,
        1
      ],
      [
        40,
        525,
        14,
        90,
        2
      ],
      [
        948,
        501,
        12,
        90,
        2
      ],
      [
        260,
        514,
        62,
        76,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "rubble",
        "x": 715,
        "y": 369,
        "w": 50,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 260,
        "y": 514,
        "w": 62,
        "h": 76
      }
    ],
    "hazard": "syrup",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            399
          ],
          [
            400,
            399
          ],
          [
            388,
            412
          ],
          [
            266.8,
            422
          ],
          [
            148,
            413
          ],
          [
            52,
            408
          ]
        ]
      }
    ],
    "height": 701,
    "difficulty": "Hard"
  },
  {
    "id": 11,
    "name": "The Column Garden",
    "world": "Rosewater Palace",
    "theme": "marble",
    "total": 20,
    "target": 19,
    "spawnX": 105,
    "spawnY": 250,
    "dir": 1,
    "interval": 100,
    "exitX": 900,
    "exitY": 521,
    "stock": {
      "block": 1,
      "build": 4,
      "dig": 1,
      "bash": 2,
      "platform": 1,
      "mine": 1
    },
    "terrain": [
      [
        40,
        300,
        180,
        28,
        1
      ],
      [
        285,
        275,
        150,
        28,
        1
      ],
      [
        500,
        250,
        150,
        28,
        1
      ],
      [
        715,
        225,
        245,
        44,
        1
      ],
      [
        40,
        235,
        14,
        75,
        2
      ],
      [
        948,
        160,
        12,
        85,
        2
      ],
      [
        842,
        350,
        56,
        12,
        1
      ],
      [
        500,
        400,
        460,
        50,
        1
      ],
      [
        40,
        400,
        390,
        50,
        1
      ],
      [
        946,
        335,
        14,
        90,
        2
      ],
      [
        40,
        335,
        12,
        90,
        2
      ],
      [
        678,
        324,
        62,
        76,
        1
      ],
      [
        424,
        372,
        79,
        4,
        2
      ],
      [
        40,
        545,
        405,
        50,
        1
      ],
      [
        520,
        521,
        440,
        50,
        1
      ],
      [
        40,
        480,
        14,
        90,
        2
      ],
      [
        948,
        456,
        12,
        90,
        2
      ],
      [
        185,
        469,
        38,
        76,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "pole",
        "x": 870,
        "y": 350,
        "bottom": 400,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 678,
        "y": 324,
        "w": 62,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 185,
        "y": 469,
        "w": 38,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            327
          ],
          [
            220,
            327
          ],
          [
            208,
            337
          ],
          [
            166,
            346
          ],
          [
            122.8,
            357
          ],
          [
            76,
            342
          ],
          [
            48,
            336
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            285,
            302
          ],
          [
            435,
            302
          ],
          [
            423,
            312
          ],
          [
            390,
            327
          ],
          [
            354,
            332
          ],
          [
            315,
            317
          ],
          [
            293,
            311
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            500,
            277
          ],
          [
            650,
            277
          ],
          [
            638,
            287
          ],
          [
            605,
            296
          ],
          [
            569,
            307
          ],
          [
            530,
            292
          ],
          [
            508,
            286
          ]
        ]
      }
    ],
    "height": 656,
    "difficulty": "Hard"
  },
  {
    "id": 12,
    "name": "Into the Fossil",
    "world": "Bonefern Caverns",
    "theme": "prehistoric",
    "total": 20,
    "target": 19,
    "spawnX": 105,
    "spawnY": 110,
    "dir": 1,
    "interval": 100,
    "exitX": 900,
    "exitY": 606,
    "stock": {
      "block": 1,
      "build": 1,
      "dig": 1,
      "mine": 2,
      "bash": 2,
      "platform": 1
    },
    "terrain": [
      [
        40,
        160,
        470,
        165,
        1
      ],
      [
        40,
        95,
        14,
        80,
        2
      ],
      [
        400,
        340,
        560,
        44,
        1
      ],
      [
        948,
        275,
        12,
        80,
        2
      ],
      [
        610,
        485,
        350,
        50,
        1
      ],
      [
        40,
        485,
        505,
        50,
        1
      ],
      [
        946,
        420,
        14,
        90,
        2
      ],
      [
        40,
        420,
        12,
        90,
        2
      ],
      [
        777,
        409,
        38,
        76,
        1
      ],
      [
        539,
        457,
        74,
        4,
        2
      ],
      [
        40,
        630,
        460,
        50,
        1
      ],
      [
        570,
        606,
        390,
        50,
        1
      ],
      [
        40,
        565,
        14,
        90,
        2
      ],
      [
        948,
        541,
        12,
        90,
        2
      ],
      [
        210,
        554,
        50,
        76,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "rubble",
        "x": 777,
        "y": 409,
        "w": 38,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 210,
        "y": 554,
        "w": 50,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            324
          ],
          [
            510,
            324
          ],
          [
            498,
            337
          ],
          [
            336.1,
            347
          ],
          [
            181,
            338
          ],
          [
            52,
            333
          ]
        ]
      }
    ],
    "height": 741,
    "difficulty": "Hard"
  },
  {
    "id": 13,
    "name": "Moat and Turrets",
    "world": "Briarstone Keep",
    "theme": "castle",
    "total": 20,
    "target": 19,
    "spawnX": 895,
    "spawnY": 180,
    "dir": -1,
    "interval": 100,
    "exitX": 100,
    "exitY": 541,
    "stock": {
      "block": 1,
      "build": 4,
      "dig": 2,
      "bash": 2,
      "platform": 1,
      "mine": 1
    },
    "terrain": [
      [
        730,
        230,
        230,
        28,
        1
      ],
      [
        370,
        180,
        200,
        28,
        1
      ],
      [
        270,
        300,
        260,
        28,
        1
      ],
      [
        40,
        275,
        165,
        44,
        1
      ],
      [
        946,
        165,
        14,
        75,
        2
      ],
      [
        370,
        115,
        14,
        93,
        2
      ],
      [
        40,
        210,
        12,
        85,
        2
      ],
      [
        40,
        420,
        405,
        50,
        1
      ],
      [
        520,
        420,
        440,
        50,
        1
      ],
      [
        40,
        355,
        14,
        90,
        2
      ],
      [
        948,
        355,
        12,
        90,
        2
      ],
      [
        210,
        344,
        50,
        76,
        1
      ],
      [
        442,
        392,
        84,
        4,
        2
      ],
      [
        610,
        565,
        350,
        50,
        1
      ],
      [
        40,
        541,
        505,
        50,
        1
      ],
      [
        946,
        500,
        14,
        90,
        2
      ],
      [
        40,
        476,
        12,
        90,
        2
      ],
      [
        703,
        489,
        62,
        76,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "rubble",
        "x": 210,
        "y": 344,
        "w": 50,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 703,
        "y": 489,
        "w": 62,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            730,
            257
          ],
          [
            960,
            257
          ],
          [
            948,
            267
          ],
          [
            891,
            276
          ],
          [
            835.8,
            287
          ],
          [
            776,
            272
          ],
          [
            738,
            266
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            370,
            207
          ],
          [
            570,
            207
          ],
          [
            558,
            217
          ],
          [
            510,
            232
          ],
          [
            462,
            237
          ],
          [
            410,
            222
          ],
          [
            378,
            216
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            270,
            327
          ],
          [
            530,
            327
          ],
          [
            518,
            337
          ],
          [
            452,
            346
          ],
          [
            389.6,
            357
          ],
          [
            322,
            342
          ],
          [
            278,
            336
          ]
        ]
      }
    ],
    "height": 676,
    "difficulty": "Hard"
  },
  {
    "id": 14,
    "name": "The Crooked Glen",
    "world": "Heather Highlands",
    "theme": "highland",
    "total": 20,
    "target": 19,
    "spawnX": 895,
    "spawnY": 210,
    "dir": -1,
    "interval": 100,
    "exitX": 100,
    "exitY": 521,
    "stock": {
      "block": 1,
      "build": 4,
      "dig": 1,
      "bash": 2,
      "platform": 1,
      "mine": 1
    },
    "terrain": [
      [
        770,
        260,
        190,
        28,
        1
      ],
      [
        560,
        235,
        140,
        28,
        1
      ],
      [
        350,
        210,
        140,
        28,
        1
      ],
      [
        40,
        185,
        240,
        44,
        1
      ],
      [
        946,
        195,
        14,
        75,
        2
      ],
      [
        40,
        120,
        12,
        85,
        2
      ],
      [
        102,
        310,
        56,
        12,
        1
      ],
      [
        40,
        400,
        460,
        50,
        1
      ],
      [
        570,
        400,
        390,
        50,
        1
      ],
      [
        40,
        335,
        14,
        90,
        2
      ],
      [
        948,
        335,
        12,
        90,
        2
      ],
      [
        235,
        324,
        62,
        76,
        1
      ],
      [
        497,
        372,
        79,
        4,
        2
      ],
      [
        555,
        545,
        405,
        50,
        1
      ],
      [
        40,
        521,
        440,
        50,
        1
      ],
      [
        946,
        480,
        14,
        90,
        2
      ],
      [
        40,
        456,
        12,
        90,
        2
      ],
      [
        702,
        469,
        38,
        76,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "pole",
        "x": 130,
        "y": 310,
        "bottom": 400,
        "dir": -1
      },
      {
        "type": "rubble",
        "x": 235,
        "y": 324,
        "w": 62,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 702,
        "y": 469,
        "w": 38,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            770,
            287
          ],
          [
            960,
            287
          ],
          [
            948,
            297
          ],
          [
            903,
            306
          ],
          [
            857.4,
            317
          ],
          [
            808,
            302
          ],
          [
            778,
            296
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            560,
            262
          ],
          [
            700,
            262
          ],
          [
            688,
            272
          ],
          [
            658,
            287
          ],
          [
            624.4,
            292
          ],
          [
            588,
            277
          ],
          [
            568,
            271
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            350,
            237
          ],
          [
            490,
            237
          ],
          [
            478,
            247
          ],
          [
            448,
            256
          ],
          [
            414.4,
            267
          ],
          [
            378,
            252
          ],
          [
            358,
            246
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            810,
            260
          ],
          [
            846,
            242
          ],
          [
            887.8,
            245
          ],
          [
            925,
            260
          ],
          [
            810,
            260
          ]
        ]
      }
    ],
    "height": 656,
    "difficulty": "Hard"
  },
  {
    "id": 15,
    "name": "The Great Bounce",
    "world": "Starlight Circus",
    "theme": "circus",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 250,
    "dir": 1,
    "interval": 90,
    "exitX": 100,
    "exitY": 716,
    "stock": {
      "block": 1,
      "build": 1,
      "dig": 2,
      "platform": 3,
      "bash": 3,
      "mine": 1
    },
    "terrain": [
      [
        40,
        300,
        260,
        55,
        1
      ],
      [
        40,
        235,
        14,
        80,
        2
      ],
      [
        390,
        300,
        210,
        50,
        1
      ],
      [
        665,
        300,
        295,
        44,
        1
      ],
      [
        948,
        235,
        12,
        80,
        2
      ],
      [
        610,
        450,
        350,
        50,
        1
      ],
      [
        40,
        450,
        505,
        50,
        1
      ],
      [
        946,
        385,
        14,
        90,
        2
      ],
      [
        40,
        385,
        12,
        90,
        2
      ],
      [
        702,
        374,
        38,
        76,
        1
      ],
      [
        539,
        422,
        74,
        4,
        2
      ],
      [
        40,
        595,
        460,
        50,
        1
      ],
      [
        570,
        571,
        390,
        50,
        1
      ],
      [
        40,
        530,
        14,
        90,
        2
      ],
      [
        948,
        506,
        12,
        90,
        2
      ],
      [
        185,
        519,
        50,
        76,
        1
      ],
      [
        555,
        716,
        405,
        50,
        1
      ],
      [
        40,
        716,
        440,
        50,
        1
      ],
      [
        946,
        651,
        14,
        90,
        2
      ],
      [
        40,
        651,
        12,
        90,
        2
      ],
      [
        728,
        640,
        62,
        76,
        1
      ],
      [
        474,
        688,
        84,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "trampoline",
        "x": 270,
        "y": 300,
        "w": 26,
        "speed": 2.4,
        "vy": -5.4,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 702,
        "y": 374,
        "w": 38,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 185,
        "y": 519,
        "w": 50,
        "h": 76
      },
      {
        "type": "switch",
        "x": 247,
        "y": 595,
        "target": "lower-trap-15"
      },
      {
        "id": "lower-trap-15",
        "type": "crusher",
        "x": 452,
        "y": 525,
        "w": 30,
        "h": 70,
        "period": 220,
        "active": 80
      },
      {
        "type": "rubble",
        "x": 728,
        "y": 640,
        "w": 62,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            354
          ],
          [
            300,
            354
          ],
          [
            288,
            367
          ],
          [
            203.8,
            377
          ],
          [
            118,
            368
          ],
          [
            52,
            363
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            390,
            349
          ],
          [
            600,
            349
          ],
          [
            588,
            362
          ],
          [
            522.3,
            372
          ],
          [
            453,
            363
          ],
          [
            402,
            358
          ]
        ]
      }
    ],
    "height": 851,
    "difficulty": "Extreme"
  },
  {
    "id": 16,
    "name": "Midnight Express",
    "world": "Moonlit Rooftops",
    "theme": "night",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 88,
    "dir": 1,
    "interval": 90,
    "exitX": 100,
    "exitY": 736,
    "stock": {
      "block": 1,
      "build": 2,
      "dig": 4,
      "bash": 3,
      "platform": 2,
      "mine": 1
    },
    "terrain": [
      [
        40,
        120,
        780,
        28,
        1
      ],
      [
        180,
        230,
        640,
        28,
        1
      ],
      [
        180,
        350,
        450,
        28,
        1
      ],
      [
        695,
        325,
        265,
        44,
        1
      ],
      [
        40,
        55,
        14,
        75,
        2
      ],
      [
        806,
        55,
        14,
        93,
        2
      ],
      [
        180,
        165,
        14,
        93,
        2
      ],
      [
        806,
        170,
        14,
        88,
        2
      ],
      [
        180,
        290,
        14,
        88,
        2
      ],
      [
        948,
        260,
        12,
        85,
        2
      ],
      [
        555,
        470,
        405,
        50,
        1
      ],
      [
        40,
        470,
        440,
        50,
        1
      ],
      [
        946,
        405,
        14,
        90,
        2
      ],
      [
        40,
        405,
        12,
        90,
        2
      ],
      [
        765,
        394,
        50,
        76,
        1
      ],
      [
        474,
        442,
        84,
        4,
        2
      ],
      [
        40,
        615,
        350,
        50,
        1
      ],
      [
        455,
        591,
        505,
        50,
        1
      ],
      [
        40,
        550,
        14,
        90,
        2
      ],
      [
        948,
        526,
        12,
        90,
        2
      ],
      [
        210,
        539,
        62,
        76,
        1
      ],
      [
        500,
        736,
        460,
        50,
        1
      ],
      [
        40,
        736,
        390,
        50,
        1
      ],
      [
        946,
        671,
        14,
        90,
        2
      ],
      [
        40,
        671,
        12,
        90,
        2
      ],
      [
        727,
        660,
        38,
        76,
        1
      ],
      [
        424,
        708,
        79,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "rubble",
        "x": 765,
        "y": 394,
        "w": 50,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 210,
        "y": 539,
        "w": 62,
        "h": 76
      },
      {
        "type": "switch",
        "x": 284,
        "y": 615,
        "target": "lower-trap-16"
      },
      {
        "id": "lower-trap-16",
        "type": "crusher",
        "x": 342,
        "y": 545,
        "w": 30,
        "h": 70,
        "period": 220,
        "active": 80
      },
      {
        "type": "rubble",
        "x": 727,
        "y": 660,
        "w": 38,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            147
          ],
          [
            820,
            147
          ],
          [
            808,
            157
          ],
          [
            586,
            166
          ],
          [
            398.8,
            177
          ],
          [
            196,
            162
          ],
          [
            48,
            156
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            180,
            257
          ],
          [
            820,
            257
          ],
          [
            808,
            267
          ],
          [
            628,
            282
          ],
          [
            474.40000000000003,
            287
          ],
          [
            308,
            272
          ],
          [
            188,
            266
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            180,
            377
          ],
          [
            630,
            377
          ],
          [
            618,
            387
          ],
          [
            495,
            396
          ],
          [
            387,
            407
          ],
          [
            270,
            392
          ],
          [
            188,
            386
          ]
        ]
      }
    ],
    "height": 871,
    "difficulty": "Extreme"
  },
  {
    "id": 17,
    "name": "The Obstacle Course",
    "world": "Lemming Games",
    "theme": "sports",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 250,
    "dir": 1,
    "interval": 90,
    "exitX": 100,
    "exitY": 716,
    "stock": {
      "block": 1,
      "build": 1,
      "dig": 2,
      "bash": 4,
      "platform": 2,
      "mine": 1
    },
    "terrain": [
      [
        40,
        300,
        240,
        55,
        1
      ],
      [
        40,
        235,
        14,
        80,
        2
      ],
      [
        370,
        300,
        180,
        55,
        1
      ],
      [
        640,
        300,
        320,
        44,
        1
      ],
      [
        820,
        255,
        25,
        45,
        1
      ],
      [
        948,
        235,
        12,
        80,
        2
      ],
      [
        500,
        450,
        460,
        50,
        1
      ],
      [
        40,
        450,
        390,
        50,
        1
      ],
      [
        946,
        385,
        14,
        90,
        2
      ],
      [
        40,
        385,
        12,
        90,
        2
      ],
      [
        728,
        374,
        62,
        76,
        1
      ],
      [
        424,
        422,
        79,
        4,
        2
      ],
      [
        40,
        595,
        405,
        50,
        1
      ],
      [
        520,
        571,
        440,
        50,
        1
      ],
      [
        40,
        530,
        14,
        90,
        2
      ],
      [
        948,
        506,
        12,
        90,
        2
      ],
      [
        235,
        519,
        38,
        76,
        1
      ],
      [
        610,
        716,
        350,
        50,
        1
      ],
      [
        40,
        716,
        505,
        50,
        1
      ],
      [
        946,
        651,
        14,
        90,
        2
      ],
      [
        40,
        651,
        12,
        90,
        2
      ],
      [
        690,
        640,
        50,
        76,
        1
      ],
      [
        539,
        688,
        74,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "trampoline",
        "x": 250,
        "y": 300,
        "w": 25,
        "speed": 2.4,
        "vy": -5.4,
        "dir": 1
      },
      {
        "type": "trampoline",
        "x": 520,
        "y": 300,
        "w": 25,
        "speed": 2.4,
        "vy": -5.4,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 728,
        "y": 374,
        "w": 62,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 235,
        "y": 519,
        "w": 38,
        "h": 76
      },
      {
        "type": "switch",
        "x": 285,
        "y": 595,
        "target": "lower-trap-17"
      },
      {
        "id": "lower-trap-17",
        "type": "crusher",
        "x": 397,
        "y": 525,
        "w": 30,
        "h": 70,
        "period": 220,
        "active": 80
      },
      {
        "type": "rubble",
        "x": 690,
        "y": 640,
        "w": 50,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            354
          ],
          [
            280,
            354
          ],
          [
            268,
            367
          ],
          [
            191.2,
            377
          ],
          [
            112,
            368
          ],
          [
            52,
            363
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            370,
            354
          ],
          [
            550,
            354
          ],
          [
            538,
            367
          ],
          [
            483.4,
            377
          ],
          [
            424,
            368
          ],
          [
            382,
            363
          ]
        ]
      }
    ],
    "height": 851,
    "difficulty": "Extreme"
  },
  {
    "id": 18,
    "name": "The Gravity Garden",
    "world": "Starport Nine",
    "theme": "station",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 280,
    "dir": 1,
    "interval": 90,
    "exitX": 100,
    "exitY": 716,
    "stock": {
      "block": 1,
      "build": 1,
      "dig": 2,
      "platform": 3,
      "bash": 3,
      "mine": 1
    },
    "terrain": [
      [
        40,
        330,
        310,
        50,
        1
      ],
      [
        40,
        265,
        14,
        80,
        2
      ],
      [
        280,
        220,
        280,
        40,
        1
      ],
      [
        625,
        220,
        335,
        44,
        1
      ],
      [
        948,
        155,
        12,
        80,
        2
      ],
      [
        837,
        345,
        56,
        12,
        1
      ],
      [
        610,
        450,
        350,
        50,
        1
      ],
      [
        40,
        450,
        505,
        50,
        1
      ],
      [
        946,
        385,
        14,
        90,
        2
      ],
      [
        40,
        385,
        12,
        90,
        2
      ],
      [
        727,
        374,
        38,
        76,
        1
      ],
      [
        539,
        422,
        74,
        4,
        2
      ],
      [
        40,
        595,
        460,
        50,
        1
      ],
      [
        570,
        571,
        390,
        50,
        1
      ],
      [
        40,
        530,
        14,
        90,
        2
      ],
      [
        948,
        506,
        12,
        90,
        2
      ],
      [
        260,
        519,
        50,
        76,
        1
      ],
      [
        555,
        716,
        405,
        50,
        1
      ],
      [
        40,
        716,
        440,
        50,
        1
      ],
      [
        946,
        651,
        14,
        90,
        2
      ],
      [
        40,
        651,
        12,
        90,
        2
      ],
      [
        753,
        640,
        62,
        76,
        1
      ],
      [
        474,
        688,
        84,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "ladder",
        "x": 300,
        "y": 330,
        "top": 220,
        "dir": 1
      },
      {
        "type": "switch",
        "x": 440,
        "y": 220,
        "target": "beam"
      },
      {
        "id": "beam",
        "type": "laser",
        "x": 785,
        "y": 165,
        "w": 5,
        "h": 55,
        "period": 180,
        "active": 65
      },
      {
        "type": "pole",
        "x": 865,
        "y": 345,
        "bottom": 450,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 727,
        "y": 374,
        "w": 38,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 260,
        "y": 519,
        "w": 50,
        "h": 76
      },
      {
        "type": "switch",
        "x": 322,
        "y": 595,
        "target": "lower-trap-18"
      },
      {
        "id": "lower-trap-18",
        "type": "laser",
        "x": 452,
        "y": 525,
        "w": 30,
        "h": 70,
        "period": 220,
        "active": 80
      },
      {
        "type": "rubble",
        "x": 753,
        "y": 640,
        "w": 62,
        "h": 76
      }
    ],
    "hazard": "void",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            379
          ],
          [
            350,
            379
          ],
          [
            338,
            392
          ],
          [
            235.3,
            402
          ],
          [
            133,
            393
          ],
          [
            52,
            388
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            280,
            259
          ],
          [
            560,
            259
          ],
          [
            548,
            272
          ],
          [
            456.4,
            282
          ],
          [
            364,
            273
          ],
          [
            292,
            268
          ]
        ]
      }
    ],
    "gravity": 0.12,
    "height": 851,
    "difficulty": "Extreme"
  },
  {
    "id": 19,
    "name": "Journey to the Rainbow",
    "world": "Prism Falls",
    "theme": "enchanted",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 100,
    "dir": 1,
    "interval": 90,
    "exitX": 100,
    "exitY": 716,
    "stock": {
      "block": 1,
      "build": 1,
      "dig": 2,
      "platform": 3,
      "bash": 4,
      "mine": 1
    },
    "terrain": [
      [
        40,
        150,
        280,
        40,
        1
      ],
      [
        40,
        85,
        14,
        80,
        2
      ],
      [
        200,
        270,
        260,
        60,
        1
      ],
      [
        550,
        270,
        180,
        45,
        1
      ],
      [
        795,
        270,
        165,
        44,
        1
      ],
      [
        865,
        225,
        24,
        45,
        1
      ],
      [
        948,
        205,
        12,
        80,
        2
      ],
      [
        862,
        395,
        56,
        12,
        1
      ],
      [
        555,
        450,
        405,
        50,
        1
      ],
      [
        40,
        450,
        440,
        50,
        1
      ],
      [
        946,
        385,
        14,
        90,
        2
      ],
      [
        40,
        385,
        12,
        90,
        2
      ],
      [
        690,
        374,
        50,
        76,
        1
      ],
      [
        474,
        422,
        84,
        4,
        2
      ],
      [
        40,
        595,
        350,
        50,
        1
      ],
      [
        455,
        571,
        505,
        50,
        1
      ],
      [
        40,
        530,
        14,
        90,
        2
      ],
      [
        948,
        506,
        12,
        90,
        2
      ],
      [
        185,
        519,
        62,
        76,
        1
      ],
      [
        500,
        716,
        460,
        50,
        1
      ],
      [
        40,
        716,
        390,
        50,
        1
      ],
      [
        946,
        651,
        14,
        90,
        2
      ],
      [
        40,
        651,
        12,
        90,
        2
      ],
      [
        752,
        640,
        38,
        76,
        1
      ],
      [
        424,
        688,
        79,
        4,
        2
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready."
    ],
    "objects": [
      {
        "type": "pole",
        "x": 290,
        "y": 150,
        "bottom": 270,
        "dir": 1
      },
      {
        "type": "trampoline",
        "x": 430,
        "y": 270,
        "w": 25,
        "speed": 2.4,
        "vy": -5.4,
        "dir": 1
      },
      {
        "type": "pole",
        "x": 890,
        "y": 395,
        "bottom": 450,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 690,
        "y": 374,
        "w": 50,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 185,
        "y": 519,
        "w": 62,
        "h": 76
      },
      {
        "type": "switch",
        "x": 259,
        "y": 595,
        "target": "lower-trap-19"
      },
      {
        "id": "lower-trap-19",
        "type": "crusher",
        "x": 342,
        "y": 525,
        "w": 30,
        "h": 70,
        "period": 220,
        "active": 80
      },
      {
        "type": "rubble",
        "x": 752,
        "y": 640,
        "w": 38,
        "h": 76
      }
    ],
    "hazard": "water",
    "shapes": [
      {
        "type": 1,
        "points": [
          [
            40,
            189
          ],
          [
            320,
            189
          ],
          [
            308,
            202
          ],
          [
            216.4,
            212
          ],
          [
            124,
            203
          ],
          [
            52,
            198
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            200,
            329
          ],
          [
            460,
            329
          ],
          [
            448,
            342
          ],
          [
            363.8,
            352
          ],
          [
            278,
            343
          ],
          [
            212,
            338
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            550,
            314
          ],
          [
            730,
            314
          ],
          [
            718,
            327
          ],
          [
            663.4,
            337
          ],
          [
            604,
            328
          ],
          [
            562,
            323
          ]
        ]
      }
    ],
    "height": 851,
    "difficulty": "Extreme"
  }
];
