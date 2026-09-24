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
    "exitX": 900,
    "exitY": 588,
    "stock": {
      "block": 2,
      "build": 2,
      "bash": 4,
      "dig": 1,
      "platform": 1,
      "mine": 1
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
      ],
      [
        40,
        612,
        405,
        50,
        1
      ],
      [
        520,
        588,
        440,
        50,
        1
      ],
      [
        40,
        547,
        14,
        90,
        2
      ],
      [
        948,
        523,
        12,
        90,
        2
      ],
      [
        235,
        536,
        38,
        76,
        1
      ],
      [
        40,
        342,
        250,
        3,
        2
      ],
      [
        40,
        421,
        250,
        3,
        2
      ],
      [
        230,
        242,
        250,
        3,
        2
      ],
      [
        230,
        266,
        250,
        3,
        2
      ],
      [
        545,
        242,
        299,
        3,
        2
      ],
      [
        886,
        242,
        74,
        3,
        2
      ],
      [
        545,
        270,
        299,
        3,
        2
      ],
      [
        886,
        270,
        74,
        3,
        2
      ],
      [
        500,
        479,
        460,
        3,
        2
      ],
      [
        500,
        513,
        460,
        3,
        2
      ],
      [
        40,
        479,
        89,
        3,
        2
      ],
      [
        205,
        479,
        225,
        3,
        2
      ],
      [
        40,
        513,
        38,
        3,
        2
      ],
      [
        154,
        513,
        276,
        3,
        2
      ],
      [
        40,
        624,
        405,
        3,
        2
      ],
      [
        40,
        658,
        405,
        3,
        2
      ],
      [
        520,
        600,
        440,
        3,
        2
      ],
      [
        520,
        634,
        440,
        3,
        2
      ],
      [
        520,
        540,
        440,
        6,
        2
      ],
      [
        948,
        540,
        12,
        76,
        2
      ],
      [
        568,
        546,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
      },
      {
        "type": "rubble",
        "x": 235,
        "y": 536,
        "w": 38,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 568,
        "y": 546,
        "w": 26,
        "h": 42
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
    "height": 723,
    "difficulty": "Medium",
    "exitChamber": {
      "x": 520,
      "y": 588,
      "w": 440,
      "dir": 1
    },
    "challenge": {
      "jobCount": 9,
      "toolCount": 5
    }
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
    "exitX": 100,
    "exitY": 591,
    "stock": {
      "block": 2,
      "dig": 3,
      "bash": 3,
      "platform": 1,
      "mine": 1,
      "build": 1
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
      ],
      [
        500,
        615,
        460,
        50,
        1
      ],
      [
        40,
        591,
        390,
        50,
        1
      ],
      [
        946,
        550,
        14,
        90,
        2
      ],
      [
        40,
        526,
        12,
        90,
        2
      ],
      [
        690,
        539,
        50,
        76,
        1
      ],
      [
        610,
        137,
        79,
        3,
        2
      ],
      [
        731,
        137,
        229,
        3,
        2
      ],
      [
        610,
        149,
        79,
        3,
        2
      ],
      [
        731,
        149,
        229,
        3,
        2
      ],
      [
        410,
        237,
        69,
        3,
        2
      ],
      [
        521,
        237,
        269,
        3,
        2
      ],
      [
        410,
        249,
        69,
        3,
        2
      ],
      [
        521,
        249,
        269,
        3,
        2
      ],
      [
        40,
        337,
        69,
        3,
        2
      ],
      [
        151,
        337,
        419,
        3,
        2
      ],
      [
        40,
        365,
        69,
        3,
        2
      ],
      [
        151,
        365,
        419,
        3,
        2
      ],
      [
        40,
        482,
        350,
        3,
        2
      ],
      [
        40,
        516,
        350,
        3,
        2
      ],
      [
        455,
        482,
        340,
        3,
        2
      ],
      [
        871,
        482,
        89,
        3,
        2
      ],
      [
        455,
        516,
        391,
        3,
        2
      ],
      [
        922,
        516,
        38,
        3,
        2
      ],
      [
        500,
        627,
        460,
        3,
        2
      ],
      [
        500,
        661,
        460,
        3,
        2
      ],
      [
        40,
        603,
        390,
        3,
        2
      ],
      [
        40,
        637,
        390,
        3,
        2
      ],
      [
        40,
        543,
        390,
        6,
        2
      ],
      [
        40,
        543,
        12,
        76,
        2
      ],
      [
        356,
        549,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
    ],
    "objects": [
      {
        "type": "rubble",
        "x": 235,
        "y": 394,
        "w": 38,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 690,
        "y": 539,
        "w": 50,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 356,
        "y": 549,
        "w": 26,
        "h": 42
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
    "height": 726,
    "difficulty": "Medium",
    "exitChamber": {
      "x": 40,
      "y": 591,
      "w": 390,
      "dir": -1
    },
    "challenge": {
      "jobCount": 9,
      "toolCount": 5
    }
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
    "exitX": 900,
    "exitY": 566,
    "stock": {
      "block": 2,
      "bash": 4,
      "dig": 1,
      "platform": 1,
      "mine": 1,
      "build": 1
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
        185,
        514,
        62,
        76,
        1
      ],
      [
        40,
        312,
        240,
        3,
        2
      ],
      [
        40,
        346,
        240,
        3,
        2
      ],
      [
        550,
        312,
        294,
        3,
        2
      ],
      [
        886,
        312,
        74,
        3,
        2
      ],
      [
        550,
        340,
        294,
        3,
        2
      ],
      [
        886,
        340,
        74,
        3,
        2
      ],
      [
        555,
        457,
        405,
        3,
        2
      ],
      [
        555,
        491,
        405,
        3,
        2
      ],
      [
        40,
        457,
        89,
        3,
        2
      ],
      [
        205,
        457,
        275,
        3,
        2
      ],
      [
        40,
        491,
        38,
        3,
        2
      ],
      [
        154,
        491,
        326,
        3,
        2
      ],
      [
        40,
        602,
        350,
        3,
        2
      ],
      [
        40,
        636,
        350,
        3,
        2
      ],
      [
        455,
        578,
        505,
        3,
        2
      ],
      [
        455,
        612,
        505,
        3,
        2
      ],
      [
        455,
        518,
        505,
        6,
        2
      ],
      [
        948,
        518,
        12,
        76,
        2
      ],
      [
        503,
        524,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
      },
      {
        "type": "rubble",
        "x": 185,
        "y": 514,
        "w": 62,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 503,
        "y": 524,
        "w": 26,
        "h": 42
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
    "height": 701,
    "difficulty": "Medium",
    "exitChamber": {
      "x": 455,
      "y": 566,
      "w": 505,
      "dir": 1
    },
    "challenge": {
      "jobCount": 8,
      "toolCount": 5
    }
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
    "exitX": 900,
    "exitY": 501,
    "stock": {
      "block": 2,
      "build": 3,
      "dig": 2,
      "bash": 3,
      "platform": 1,
      "mine": 1
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
      ],
      [
        40,
        525,
        405,
        50,
        1
      ],
      [
        520,
        501,
        440,
        50,
        1
      ],
      [
        40,
        460,
        14,
        90,
        2
      ],
      [
        948,
        436,
        12,
        90,
        2
      ],
      [
        210,
        449,
        38,
        76,
        1
      ],
      [
        40,
        182,
        230,
        3,
        2
      ],
      [
        40,
        194,
        230,
        3,
        2
      ],
      [
        335,
        157,
        119,
        3,
        2
      ],
      [
        496,
        157,
        84,
        3,
        2
      ],
      [
        335,
        169,
        119,
        3,
        2
      ],
      [
        496,
        169,
        84,
        3,
        2
      ],
      [
        400,
        272,
        270,
        3,
        2
      ],
      [
        400,
        284,
        270,
        3,
        2
      ],
      [
        735,
        247,
        114,
        3,
        2
      ],
      [
        891,
        247,
        69,
        3,
        2
      ],
      [
        735,
        275,
        114,
        3,
        2
      ],
      [
        891,
        275,
        69,
        3,
        2
      ],
      [
        500,
        392,
        460,
        3,
        2
      ],
      [
        500,
        426,
        460,
        3,
        2
      ],
      [
        40,
        392,
        89,
        3,
        2
      ],
      [
        205,
        392,
        225,
        3,
        2
      ],
      [
        40,
        426,
        38,
        3,
        2
      ],
      [
        154,
        426,
        276,
        3,
        2
      ],
      [
        40,
        537,
        405,
        3,
        2
      ],
      [
        40,
        571,
        405,
        3,
        2
      ],
      [
        520,
        513,
        440,
        3,
        2
      ],
      [
        520,
        547,
        440,
        3,
        2
      ],
      [
        520,
        453,
        440,
        6,
        2
      ],
      [
        948,
        453,
        12,
        76,
        2
      ],
      [
        568,
        459,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
    ],
    "objects": [
      {
        "type": "rubble",
        "x": 753,
        "y": 304,
        "w": 62,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 210,
        "y": 449,
        "w": 38,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 568,
        "y": 459,
        "w": 26,
        "h": 42
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
    "height": 636,
    "difficulty": "Medium",
    "exitChamber": {
      "x": 520,
      "y": 501,
      "w": 440,
      "dir": 1
    },
    "challenge": {
      "jobCount": 10,
      "toolCount": 5
    }
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
    "exitX": 900,
    "exitY": 546,
    "stock": {
      "block": 2,
      "platform": 2,
      "bash": 4,
      "dig": 1,
      "mine": 1,
      "build": 1
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
      ],
      [
        40,
        570,
        460,
        50,
        1
      ],
      [
        570,
        546,
        390,
        50,
        1
      ],
      [
        40,
        505,
        14,
        90,
        2
      ],
      [
        948,
        481,
        12,
        90,
        2
      ],
      [
        235,
        494,
        50,
        76,
        1
      ],
      [
        40,
        152,
        390,
        3,
        2
      ],
      [
        40,
        171,
        390,
        3,
        2
      ],
      [
        320,
        292,
        290,
        3,
        2
      ],
      [
        320,
        326,
        290,
        3,
        2
      ],
      [
        675,
        292,
        169,
        3,
        2
      ],
      [
        886,
        292,
        74,
        3,
        2
      ],
      [
        675,
        320,
        169,
        3,
        2
      ],
      [
        886,
        320,
        74,
        3,
        2
      ],
      [
        610,
        437,
        350,
        3,
        2
      ],
      [
        610,
        471,
        350,
        3,
        2
      ],
      [
        40,
        437,
        89,
        3,
        2
      ],
      [
        205,
        437,
        340,
        3,
        2
      ],
      [
        40,
        471,
        38,
        3,
        2
      ],
      [
        154,
        471,
        391,
        3,
        2
      ],
      [
        40,
        582,
        460,
        3,
        2
      ],
      [
        40,
        616,
        460,
        3,
        2
      ],
      [
        570,
        558,
        390,
        3,
        2
      ],
      [
        570,
        592,
        390,
        3,
        2
      ],
      [
        570,
        498,
        390,
        6,
        2
      ],
      [
        948,
        498,
        12,
        76,
        2
      ],
      [
        618,
        504,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 3-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
      },
      {
        "type": "rubble",
        "x": 235,
        "y": 494,
        "w": 50,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 618,
        "y": 504,
        "w": 26,
        "h": 42
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
    "height": 681,
    "difficulty": "Medium",
    "exitChamber": {
      "x": 570,
      "y": 546,
      "w": 390,
      "dir": 1
    },
    "challenge": {
      "jobCount": 9,
      "toolCount": 5
    }
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
    "exitX": 100,
    "exitY": 711,
    "stock": {
      "block": 1,
      "bash": 6,
      "platform": 3,
      "dig": 2,
      "mine": 1,
      "build": 1
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
      ],
      [
        500,
        711,
        460,
        50,
        1
      ],
      [
        40,
        711,
        390,
        50,
        1
      ],
      [
        946,
        646,
        14,
        90,
        2
      ],
      [
        40,
        646,
        12,
        90,
        2
      ],
      [
        777,
        635,
        38,
        76,
        1
      ],
      [
        424,
        683,
        79,
        4,
        2
      ],
      [
        40,
        312,
        360,
        3,
        2
      ],
      [
        40,
        396,
        360,
        3,
        2
      ],
      [
        465,
        312,
        379,
        3,
        2
      ],
      [
        886,
        312,
        74,
        3,
        2
      ],
      [
        465,
        340,
        379,
        3,
        2
      ],
      [
        886,
        340,
        74,
        3,
        2
      ],
      [
        555,
        457,
        405,
        3,
        2
      ],
      [
        555,
        491,
        405,
        3,
        2
      ],
      [
        40,
        457,
        89,
        3,
        2
      ],
      [
        205,
        457,
        275,
        3,
        2
      ],
      [
        40,
        491,
        38,
        3,
        2
      ],
      [
        154,
        491,
        326,
        3,
        2
      ],
      [
        40,
        602,
        350,
        3,
        2
      ],
      [
        40,
        636,
        350,
        3,
        2
      ],
      [
        455,
        578,
        324,
        3,
        2
      ],
      [
        821,
        578,
        139,
        3,
        2
      ],
      [
        455,
        612,
        324,
        3,
        2
      ],
      [
        821,
        612,
        139,
        3,
        2
      ],
      [
        500,
        723,
        460,
        3,
        2
      ],
      [
        500,
        757,
        460,
        3,
        2
      ],
      [
        40,
        723,
        390,
        3,
        2
      ],
      [
        40,
        757,
        390,
        3,
        2
      ],
      [
        40,
        663,
        390,
        6,
        2
      ],
      [
        40,
        663,
        12,
        76,
        2
      ],
      [
        356,
        669,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
      },
      {
        "type": "rubble",
        "x": 777,
        "y": 635,
        "w": 38,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 356,
        "y": 669,
        "w": 26,
        "h": 42
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
    "height": 846,
    "difficulty": "Hard",
    "exitChamber": {
      "x": 40,
      "y": 711,
      "w": 390,
      "dir": -1
    },
    "challenge": {
      "jobCount": 13,
      "toolCount": 5
    }
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
    "exitX": 100,
    "exitY": 666,
    "stock": {
      "block": 1,
      "build": 4,
      "dig": 2,
      "bash": 4,
      "platform": 2,
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
      ],
      [
        610,
        666,
        350,
        50,
        1
      ],
      [
        40,
        666,
        505,
        50,
        1
      ],
      [
        946,
        601,
        14,
        90,
        2
      ],
      [
        40,
        601,
        12,
        90,
        2
      ],
      [
        740,
        590,
        50,
        76,
        1
      ],
      [
        539,
        638,
        74,
        4,
        2
      ],
      [
        40,
        312,
        180,
        3,
        2
      ],
      [
        40,
        324,
        180,
        3,
        2
      ],
      [
        285,
        287,
        150,
        3,
        2
      ],
      [
        285,
        299,
        150,
        3,
        2
      ],
      [
        500,
        262,
        150,
        3,
        2
      ],
      [
        500,
        274,
        150,
        3,
        2
      ],
      [
        715,
        237,
        134,
        3,
        2
      ],
      [
        891,
        237,
        69,
        3,
        2
      ],
      [
        715,
        265,
        134,
        3,
        2
      ],
      [
        891,
        265,
        69,
        3,
        2
      ],
      [
        500,
        412,
        460,
        3,
        2
      ],
      [
        500,
        446,
        460,
        3,
        2
      ],
      [
        40,
        412,
        89,
        3,
        2
      ],
      [
        205,
        412,
        225,
        3,
        2
      ],
      [
        40,
        446,
        38,
        3,
        2
      ],
      [
        154,
        446,
        276,
        3,
        2
      ],
      [
        40,
        557,
        405,
        3,
        2
      ],
      [
        40,
        591,
        405,
        3,
        2
      ],
      [
        520,
        533,
        259,
        3,
        2
      ],
      [
        821,
        533,
        139,
        3,
        2
      ],
      [
        520,
        567,
        259,
        3,
        2
      ],
      [
        821,
        567,
        139,
        3,
        2
      ],
      [
        610,
        678,
        350,
        3,
        2
      ],
      [
        610,
        712,
        350,
        3,
        2
      ],
      [
        40,
        678,
        505,
        3,
        2
      ],
      [
        40,
        712,
        505,
        3,
        2
      ],
      [
        40,
        618,
        505,
        6,
        2
      ],
      [
        40,
        618,
        12,
        76,
        2
      ],
      [
        471,
        624,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
      },
      {
        "type": "rubble",
        "x": 740,
        "y": 590,
        "w": 50,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 471,
        "y": 624,
        "w": 26,
        "h": 42
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
    "height": 801,
    "difficulty": "Hard",
    "exitChamber": {
      "x": 40,
      "y": 666,
      "w": 505,
      "dir": -1
    },
    "challenge": {
      "jobCount": 13,
      "toolCount": 5
    }
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
    "exitX": 100,
    "exitY": 751,
    "stock": {
      "block": 1,
      "mine": 2,
      "dig": 2,
      "bash": 4,
      "platform": 2,
      "build": 1
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
      ],
      [
        555,
        751,
        405,
        50,
        1
      ],
      [
        40,
        751,
        440,
        50,
        1
      ],
      [
        946,
        686,
        14,
        90,
        2
      ],
      [
        40,
        686,
        12,
        90,
        2
      ],
      [
        703,
        675,
        62,
        76,
        1
      ],
      [
        474,
        723,
        84,
        4,
        2
      ],
      [
        40,
        172,
        365,
        3,
        2
      ],
      [
        481,
        172,
        29,
        3,
        2
      ],
      [
        40,
        321,
        470,
        3,
        2
      ],
      [
        400,
        352,
        444,
        3,
        2
      ],
      [
        886,
        352,
        74,
        3,
        2
      ],
      [
        400,
        380,
        444,
        3,
        2
      ],
      [
        886,
        380,
        74,
        3,
        2
      ],
      [
        610,
        497,
        350,
        3,
        2
      ],
      [
        610,
        531,
        350,
        3,
        2
      ],
      [
        40,
        497,
        89,
        3,
        2
      ],
      [
        205,
        497,
        340,
        3,
        2
      ],
      [
        40,
        531,
        38,
        3,
        2
      ],
      [
        154,
        531,
        391,
        3,
        2
      ],
      [
        40,
        642,
        460,
        3,
        2
      ],
      [
        40,
        676,
        460,
        3,
        2
      ],
      [
        570,
        618,
        209,
        3,
        2
      ],
      [
        821,
        618,
        139,
        3,
        2
      ],
      [
        570,
        652,
        209,
        3,
        2
      ],
      [
        821,
        652,
        139,
        3,
        2
      ],
      [
        555,
        763,
        405,
        3,
        2
      ],
      [
        555,
        797,
        405,
        3,
        2
      ],
      [
        40,
        763,
        440,
        3,
        2
      ],
      [
        40,
        797,
        440,
        3,
        2
      ],
      [
        40,
        703,
        440,
        6,
        2
      ],
      [
        40,
        703,
        12,
        76,
        2
      ],
      [
        406,
        709,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
      },
      {
        "type": "rubble",
        "x": 703,
        "y": 675,
        "w": 62,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 406,
        "y": 709,
        "w": 26,
        "h": 42
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
    "height": 886,
    "difficulty": "Hard",
    "exitChamber": {
      "x": 40,
      "y": 751,
      "w": 440,
      "dir": -1
    },
    "challenge": {
      "jobCount": 11,
      "toolCount": 5
    }
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
    "exitX": 900,
    "exitY": 686,
    "stock": {
      "block": 1,
      "build": 4,
      "dig": 3,
      "bash": 4,
      "platform": 2,
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
      ],
      [
        40,
        686,
        460,
        50,
        1
      ],
      [
        570,
        686,
        390,
        50,
        1
      ],
      [
        40,
        621,
        14,
        90,
        2
      ],
      [
        948,
        621,
        12,
        90,
        2
      ],
      [
        260,
        610,
        38,
        76,
        1
      ],
      [
        497,
        658,
        79,
        4,
        2
      ],
      [
        730,
        242,
        230,
        3,
        2
      ],
      [
        730,
        254,
        230,
        3,
        2
      ],
      [
        370,
        192,
        59,
        3,
        2
      ],
      [
        471,
        192,
        99,
        3,
        2
      ],
      [
        370,
        204,
        59,
        3,
        2
      ],
      [
        471,
        204,
        99,
        3,
        2
      ],
      [
        270,
        312,
        260,
        3,
        2
      ],
      [
        270,
        324,
        260,
        3,
        2
      ],
      [
        40,
        287,
        69,
        3,
        2
      ],
      [
        151,
        287,
        54,
        3,
        2
      ],
      [
        40,
        315,
        69,
        3,
        2
      ],
      [
        151,
        315,
        54,
        3,
        2
      ],
      [
        40,
        432,
        405,
        3,
        2
      ],
      [
        40,
        466,
        405,
        3,
        2
      ],
      [
        520,
        432,
        275,
        3,
        2
      ],
      [
        871,
        432,
        89,
        3,
        2
      ],
      [
        520,
        466,
        326,
        3,
        2
      ],
      [
        922,
        466,
        38,
        3,
        2
      ],
      [
        610,
        577,
        350,
        3,
        2
      ],
      [
        610,
        611,
        350,
        3,
        2
      ],
      [
        40,
        553,
        139,
        3,
        2
      ],
      [
        221,
        553,
        324,
        3,
        2
      ],
      [
        40,
        587,
        139,
        3,
        2
      ],
      [
        221,
        587,
        324,
        3,
        2
      ],
      [
        40,
        698,
        460,
        3,
        2
      ],
      [
        40,
        732,
        460,
        3,
        2
      ],
      [
        570,
        698,
        390,
        3,
        2
      ],
      [
        570,
        732,
        390,
        3,
        2
      ],
      [
        570,
        638,
        390,
        6,
        2
      ],
      [
        948,
        638,
        12,
        76,
        2
      ],
      [
        618,
        644,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
      },
      {
        "type": "rubble",
        "x": 260,
        "y": 610,
        "w": 38,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 618,
        "y": 644,
        "w": 26,
        "h": 42
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
    "height": 821,
    "difficulty": "Hard",
    "exitChamber": {
      "x": 570,
      "y": 686,
      "w": 390,
      "dir": 1
    },
    "challenge": {
      "jobCount": 14,
      "toolCount": 5
    }
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
    "exitX": 900,
    "exitY": 666,
    "stock": {
      "block": 1,
      "build": 4,
      "dig": 2,
      "bash": 4,
      "platform": 2,
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
      ],
      [
        40,
        666,
        350,
        50,
        1
      ],
      [
        455,
        666,
        505,
        50,
        1
      ],
      [
        40,
        601,
        14,
        90,
        2
      ],
      [
        948,
        601,
        12,
        90,
        2
      ],
      [
        185,
        590,
        50,
        76,
        1
      ],
      [
        387,
        638,
        74,
        4,
        2
      ],
      [
        770,
        272,
        190,
        3,
        2
      ],
      [
        770,
        284,
        190,
        3,
        2
      ],
      [
        560,
        247,
        140,
        3,
        2
      ],
      [
        560,
        259,
        140,
        3,
        2
      ],
      [
        350,
        222,
        140,
        3,
        2
      ],
      [
        350,
        234,
        140,
        3,
        2
      ],
      [
        40,
        197,
        69,
        3,
        2
      ],
      [
        151,
        197,
        129,
        3,
        2
      ],
      [
        40,
        225,
        69,
        3,
        2
      ],
      [
        151,
        225,
        129,
        3,
        2
      ],
      [
        40,
        412,
        460,
        3,
        2
      ],
      [
        40,
        446,
        460,
        3,
        2
      ],
      [
        570,
        412,
        225,
        3,
        2
      ],
      [
        871,
        412,
        89,
        3,
        2
      ],
      [
        570,
        446,
        276,
        3,
        2
      ],
      [
        922,
        446,
        38,
        3,
        2
      ],
      [
        555,
        557,
        405,
        3,
        2
      ],
      [
        555,
        591,
        405,
        3,
        2
      ],
      [
        40,
        533,
        139,
        3,
        2
      ],
      [
        221,
        533,
        259,
        3,
        2
      ],
      [
        40,
        567,
        139,
        3,
        2
      ],
      [
        221,
        567,
        259,
        3,
        2
      ],
      [
        40,
        678,
        350,
        3,
        2
      ],
      [
        40,
        712,
        350,
        3,
        2
      ],
      [
        455,
        678,
        505,
        3,
        2
      ],
      [
        455,
        712,
        505,
        3,
        2
      ],
      [
        455,
        618,
        505,
        6,
        2
      ],
      [
        948,
        618,
        12,
        76,
        2
      ],
      [
        503,
        624,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "The exit is below the surface. Plan the whole 4-stage route before releasing the crowd.",
      "Cracked barriers are soft rock: tunnel through them with a Basher. Blue-grey lintels and pillars are steel.",
      "Use horizontal bridges under low lintels, stairs to raised landings, and controlled digging or mining to reach the next chamber. Hold the crowd until the route is ready.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
      },
      {
        "type": "rubble",
        "x": 185,
        "y": 590,
        "w": 50,
        "h": 76
      },
      {
        "type": "rubble",
        "x": 503,
        "y": 624,
        "w": 26,
        "h": 42
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
    "height": 801,
    "difficulty": "Hard",
    "exitChamber": {
      "x": 455,
      "y": 666,
      "w": 505,
      "dir": 1
    },
    "challenge": {
      "jobCount": 13,
      "toolCount": 5
    }
  },
  {
    "id": 15,
    "name": "Under the Big Top",
    "world": "Starlight Circus",
    "theme": "circus",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 250,
    "dir": 1,
    "interval": 90,
    "exitX": 165,
    "exitY": 696,
    "stock": {
      "block": 1,
      "platform": 3,
      "bash": 7,
      "dig": 2,
      "mine": 1,
      "build": 1
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
        36,
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
        627,
        450,
        333,
        26,
        1
      ],
      [
        330,
        450,
        235,
        28,
        1
      ],
      [
        948,
        395,
        12,
        75,
        2
      ],
      [
        330,
        395,
        12,
        75,
        2
      ],
      [
        758,
        386,
        32,
        64,
        1
      ],
      [
        560,
        422,
        70,
        4,
        2
      ],
      [
        250,
        595,
        280,
        34,
        1
      ],
      [
        600,
        571,
        180,
        28,
        1
      ],
      [
        250,
        540,
        12,
        75,
        2
      ],
      [
        768,
        516,
        12,
        75,
        2
      ],
      [
        398.4,
        531,
        38,
        64,
        1
      ],
      [
        429,
        696,
        371,
        26,
        1
      ],
      [
        100,
        696,
        267,
        28,
        1
      ],
      [
        788,
        641,
        12,
        75,
        2
      ],
      [
        100,
        641,
        12,
        75,
        2
      ],
      [
        586,
        632,
        44,
        64,
        1
      ],
      [
        362,
        668,
        70,
        4,
        2
      ],
      [
        40,
        312,
        260,
        3,
        2
      ],
      [
        40,
        351,
        260,
        3,
        2
      ],
      [
        390,
        312,
        210,
        3,
        2
      ],
      [
        390,
        346,
        210,
        3,
        2
      ],
      [
        665,
        312,
        179,
        3,
        2
      ],
      [
        886,
        312,
        74,
        3,
        2
      ],
      [
        665,
        332,
        179,
        3,
        2
      ],
      [
        886,
        332,
        74,
        3,
        2
      ],
      [
        627,
        462,
        333,
        3,
        2
      ],
      [
        627,
        472,
        333,
        3,
        2
      ],
      [
        330,
        462,
        14,
        3,
        2
      ],
      [
        420,
        462,
        145,
        3,
        2
      ],
      [
        402,
        474,
        163,
        3,
        2
      ],
      [
        250,
        607,
        280,
        3,
        2
      ],
      [
        250,
        625,
        280,
        3,
        2
      ],
      [
        600,
        583,
        74,
        3,
        2
      ],
      [
        716,
        583,
        64,
        3,
        2
      ],
      [
        600,
        595,
        74,
        3,
        2
      ],
      [
        716,
        595,
        64,
        3,
        2
      ],
      [
        429,
        708,
        371,
        3,
        2
      ],
      [
        429,
        718,
        371,
        3,
        2
      ],
      [
        100,
        708,
        267,
        3,
        2
      ],
      [
        100,
        720,
        267,
        3,
        2
      ],
      [
        100,
        648,
        267,
        6,
        2
      ],
      [
        100,
        648,
        12,
        76,
        2
      ],
      [
        293,
        654,
        26,
        42,
        1
      ],
      [
        714,
        258,
        26,
        42,
        1
      ],
      [
        490,
        408,
        26,
        42,
        1
      ],
      [
        649,
        529,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "A narrowing aerial ring leads to a wide final performance stage.",
      "Keep the crowd safe while a scout prepares tunnels and crossings. All twenty must reach the exit.",
      "Use the levers to disable traps. Mine or dig into the next area; the narrow chambers do not share the same crossing positions.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
        "x": 758,
        "y": 386,
        "w": 32,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 398.4,
        "y": 531,
        "w": 38,
        "h": 64
      },
      {
        "type": "switch",
        "x": 448.4,
        "y": 595,
        "target": "finale-15"
      },
      {
        "id": "finale-15",
        "type": "crusher",
        "x": 485,
        "y": 530,
        "w": 28,
        "h": 65,
        "period": 240,
        "active": 70
      },
      {
        "type": "rubble",
        "x": 586,
        "y": 632,
        "w": 44,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 293,
        "y": 654,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 714,
        "y": 258,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 490,
        "y": 408,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 649,
        "y": 529,
        "w": 26,
        "h": 42
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
      },
      {
        "type": 1,
        "points": [
          [
            662,
            475
          ],
          [
            925,
            475
          ],
          [
            843.45,
            504
          ],
          [
            726.9,
            490
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            365,
            477
          ],
          [
            530,
            477
          ],
          [
            482.75,
            506
          ],
          [
            400.5,
            492
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            285,
            628
          ],
          [
            495,
            628
          ],
          [
            432,
            657
          ],
          [
            334,
            643
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            635,
            598
          ],
          [
            745,
            598
          ],
          [
            717,
            627
          ],
          [
            654,
            613
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            464,
            721
          ],
          [
            765,
            721
          ],
          [
            670.15,
            750
          ],
          [
            540.3,
            736
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            135,
            723
          ],
          [
            332,
            723
          ],
          [
            273.55,
            752
          ],
          [
            180.1,
            738
          ]
        ]
      }
    ],
    "setPieces": [
      {
        "form": "circus-rings",
        "left": 330,
        "right": 960,
        "y": 450,
        "landing": 450,
        "room": 0
      },
      {
        "form": "circus-rings",
        "left": 250,
        "right": 780,
        "y": 595,
        "landing": 571,
        "room": 1
      },
      {
        "form": "circus-rings",
        "left": 100,
        "right": 800,
        "y": 696,
        "landing": 696,
        "room": 2
      }
    ],
    "height": 821,
    "layoutForm": "circus-rings",
    "difficulty": "Extreme",
    "exitChamber": {
      "x": 100,
      "y": 696,
      "w": 267,
      "dir": -1
    },
    "challenge": {
      "jobCount": 14,
      "toolCount": 5
    }
  },
  {
    "id": 16,
    "name": "Chimney Chase",
    "world": "Moonlit Rooftops",
    "theme": "night",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 88,
    "dir": 1,
    "interval": 90,
    "exitX": 125,
    "exitY": 736,
    "stock": {
      "block": 1,
      "dig": 4,
      "build": 2,
      "bash": 7,
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
        36,
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
        706,
        470,
        254,
        26,
        1
      ],
      [
        480,
        470,
        164,
        28,
        1
      ],
      [
        948,
        415,
        12,
        75,
        2
      ],
      [
        480,
        415,
        12,
        75,
        2
      ],
      [
        793.6,
        406,
        32,
        64,
        1
      ],
      [
        639,
        442,
        70,
        4,
        2
      ],
      [
        420,
        605,
        243,
        34,
        1
      ],
      [
        733,
        581,
        147,
        28,
        1
      ],
      [
        420,
        550,
        12,
        75,
        2
      ],
      [
        868,
        526,
        12,
        75,
        2
      ],
      [
        548.8,
        541,
        38,
        64,
        1
      ],
      [
        465,
        736,
        455,
        26,
        1
      ],
      [
        60,
        736,
        343,
        28,
        1
      ],
      [
        908,
        681,
        12,
        75,
        2
      ],
      [
        60,
        681,
        12,
        75,
        2
      ],
      [
        706,
        672,
        44,
        64,
        1
      ],
      [
        398,
        708,
        70,
        4,
        2
      ],
      [
        40,
        132,
        679,
        3,
        2
      ],
      [
        761,
        132,
        59,
        3,
        2
      ],
      [
        40,
        144,
        679,
        3,
        2
      ],
      [
        761,
        144,
        59,
        3,
        2
      ],
      [
        180,
        242,
        39,
        3,
        2
      ],
      [
        261,
        242,
        559,
        3,
        2
      ],
      [
        180,
        254,
        39,
        3,
        2
      ],
      [
        261,
        254,
        559,
        3,
        2
      ],
      [
        180,
        362,
        450,
        3,
        2
      ],
      [
        180,
        374,
        450,
        3,
        2
      ],
      [
        695,
        337,
        154,
        3,
        2
      ],
      [
        891,
        337,
        69,
        3,
        2
      ],
      [
        695,
        357,
        154,
        3,
        2
      ],
      [
        891,
        357,
        69,
        3,
        2
      ],
      [
        706,
        482,
        254,
        3,
        2
      ],
      [
        706,
        492,
        254,
        3,
        2
      ],
      [
        480,
        482,
        14,
        3,
        2
      ],
      [
        570,
        482,
        74,
        3,
        2
      ],
      [
        552,
        494,
        92,
        3,
        2
      ],
      [
        420,
        617,
        243,
        3,
        2
      ],
      [
        420,
        635,
        243,
        3,
        2
      ],
      [
        733,
        593,
        41,
        3,
        2
      ],
      [
        816,
        593,
        64,
        3,
        2
      ],
      [
        733,
        605,
        41,
        3,
        2
      ],
      [
        816,
        605,
        64,
        3,
        2
      ],
      [
        465,
        748,
        455,
        3,
        2
      ],
      [
        465,
        758,
        455,
        3,
        2
      ],
      [
        60,
        748,
        343,
        3,
        2
      ],
      [
        60,
        760,
        343,
        3,
        2
      ],
      [
        60,
        688,
        343,
        6,
        2
      ],
      [
        60,
        688,
        12,
        76,
        2
      ],
      [
        329,
        694,
        26,
        42,
        1
      ],
      [
        744,
        284,
        26,
        42,
        1
      ],
      [
        569,
        428,
        26,
        42,
        1
      ],
      [
        782,
        539,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "A cluster of narrow chimney towers opens onto a long final rooftop.",
      "Keep the crowd safe while a scout prepares tunnels and crossings. All twenty must reach the exit.",
      "Use the levers to disable traps. Mine or dig into the next area; the narrow chambers do not share the same crossing positions.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
    ],
    "objects": [
      {
        "type": "rubble",
        "x": 793.6,
        "y": 406,
        "w": 32,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 548.8,
        "y": 541,
        "w": 38,
        "h": 64
      },
      {
        "type": "switch",
        "x": 598.8,
        "y": 605,
        "target": "finale-16"
      },
      {
        "id": "finale-16",
        "type": "crusher",
        "x": 618,
        "y": 540,
        "w": 28,
        "h": 65,
        "period": 240,
        "active": 70
      },
      {
        "type": "rubble",
        "x": 706,
        "y": 672,
        "w": 44,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 329,
        "y": 694,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 744,
        "y": 284,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 569,
        "y": 428,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 782,
        "y": 539,
        "w": 26,
        "h": 42
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
      },
      {
        "type": 1,
        "points": [
          [
            741,
            495
          ],
          [
            925,
            495
          ],
          [
            925,
            558
          ],
          [
            741,
            558
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            515,
            497
          ],
          [
            609,
            497
          ],
          [
            609,
            560
          ],
          [
            515,
            560
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            455,
            638
          ],
          [
            628,
            638
          ],
          [
            628,
            701
          ],
          [
            455,
            701
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            768,
            608
          ],
          [
            845,
            608
          ],
          [
            845,
            671
          ],
          [
            768,
            671
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            500,
            761
          ],
          [
            885,
            761
          ],
          [
            885,
            824
          ],
          [
            500,
            824
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            95,
            763
          ],
          [
            368,
            763
          ],
          [
            368,
            826
          ],
          [
            95,
            826
          ]
        ]
      }
    ],
    "setPieces": [
      {
        "form": "rooftop-towers",
        "left": 480,
        "right": 960,
        "y": 470,
        "landing": 470,
        "room": 0
      },
      {
        "form": "rooftop-towers",
        "left": 420,
        "right": 880,
        "y": 605,
        "landing": 581,
        "room": 1
      },
      {
        "form": "rooftop-towers",
        "left": 60,
        "right": 920,
        "y": 736,
        "landing": 736,
        "room": 2
      }
    ],
    "height": 861,
    "layoutForm": "rooftop-towers",
    "difficulty": "Extreme",
    "exitChamber": {
      "x": 60,
      "y": 736,
      "w": 343,
      "dir": -1
    },
    "challenge": {
      "jobCount": 16,
      "toolCount": 5
    }
  },
  {
    "id": 17,
    "name": "The Championship Circuit",
    "world": "Lemming Games",
    "theme": "sports",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 250,
    "dir": 1,
    "interval": 90,
    "exitX": 305,
    "exitY": 746,
    "stock": {
      "block": 1,
      "bash": 9,
      "dig": 2,
      "platform": 2,
      "mine": 1,
      "build": 1
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
        36,
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
        840,
        420,
        50,
        10,
        1
      ],
      [
        515,
        475,
        445,
        26,
        1
      ],
      [
        120,
        475,
        315,
        28,
        1
      ],
      [
        948,
        420,
        12,
        75,
        2
      ],
      [
        120,
        420,
        12,
        75,
        2
      ],
      [
        725,
        411,
        65,
        64,
        1
      ],
      [
        430,
        447,
        88,
        4,
        2
      ],
      [
        60,
        620,
        477,
        34,
        1
      ],
      [
        617,
        596,
        343,
        28,
        1
      ],
      [
        60,
        565,
        12,
        75,
        2
      ],
      [
        948,
        541,
        12,
        75,
        2
      ],
      [
        230,
        556,
        65,
        64,
        1
      ],
      [
        565,
        746,
        365,
        26,
        1
      ],
      [
        240,
        746,
        245,
        28,
        1
      ],
      [
        918,
        691,
        12,
        75,
        2
      ],
      [
        240,
        691,
        12,
        75,
        2
      ],
      [
        695,
        682,
        65,
        64,
        1
      ],
      [
        480,
        718,
        88,
        4,
        2
      ],
      [
        40,
        312,
        240,
        3,
        2
      ],
      [
        40,
        351,
        240,
        3,
        2
      ],
      [
        370,
        312,
        180,
        3,
        2
      ],
      [
        370,
        351,
        180,
        3,
        2
      ],
      [
        640,
        312,
        204,
        3,
        2
      ],
      [
        886,
        312,
        74,
        3,
        2
      ],
      [
        640,
        332,
        204,
        3,
        2
      ],
      [
        886,
        332,
        74,
        3,
        2
      ],
      [
        515,
        487,
        445,
        3,
        2
      ],
      [
        515,
        497,
        445,
        3,
        2
      ],
      [
        120,
        487,
        14,
        3,
        2
      ],
      [
        210,
        487,
        225,
        3,
        2
      ],
      [
        192,
        499,
        243,
        3,
        2
      ],
      [
        60,
        632,
        477,
        3,
        2
      ],
      [
        60,
        650,
        477,
        3,
        2
      ],
      [
        617,
        608,
        237,
        3,
        2
      ],
      [
        896,
        608,
        64,
        3,
        2
      ],
      [
        617,
        620,
        237,
        3,
        2
      ],
      [
        896,
        620,
        64,
        3,
        2
      ],
      [
        565,
        758,
        365,
        3,
        2
      ],
      [
        565,
        768,
        365,
        3,
        2
      ],
      [
        240,
        758,
        245,
        3,
        2
      ],
      [
        240,
        770,
        245,
        3,
        2
      ],
      [
        240,
        698,
        245,
        6,
        2
      ],
      [
        240,
        698,
        12,
        76,
        2
      ],
      [
        411,
        704,
        26,
        42,
        1
      ],
      [
        360,
        433,
        26,
        42,
        1
      ],
      [
        666,
        554,
        26,
        42,
        1
      ],
      [
        170,
        246,
        24,
        54,
        1
      ],
      [
        430,
        246,
        24,
        54,
        1
      ]
    ],
    "hints": [
      "Three broad stadium circuits combine springboards, low crossings, uphill building and tunnel preparation.",
      "Keep the crowd safe while a scout prepares tunnels and crossings. All twenty must reach the exit.",
      "Use the levers to disable traps. Mine or dig into the next area; the narrow chambers do not share the same crossing positions.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
        "type": "pole",
        "x": 865,
        "y": 420,
        "bottom": 475,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 725,
        "y": 411,
        "w": 65,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 230,
        "y": 556,
        "w": 65,
        "h": 64
      },
      {
        "type": "switch",
        "x": 307,
        "y": 620,
        "target": "finale-17"
      },
      {
        "id": "finale-17",
        "type": "crusher",
        "x": 492,
        "y": 555,
        "w": 28,
        "h": 65,
        "period": 240,
        "active": 70
      },
      {
        "type": "rubble",
        "x": 695,
        "y": 682,
        "w": 65,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 411,
        "y": 704,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 360,
        "y": 433,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 666,
        "y": 554,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 170,
        "y": 246,
        "w": 24,
        "h": 54
      },
      {
        "type": "rubble",
        "x": 430,
        "y": 246,
        "w": 24,
        "h": 54
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
      },
      {
        "type": 1,
        "points": [
          [
            550,
            500
          ],
          [
            925,
            500
          ],
          [
            804.25,
            529
          ],
          [
            648.5,
            515
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            155,
            502
          ],
          [
            400,
            502
          ],
          [
            324.75,
            531
          ],
          [
            214.5,
            517
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            95,
            653
          ],
          [
            502,
            653
          ],
          [
            370.05,
            682
          ],
          [
            203.1,
            668
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            652,
            623
          ],
          [
            925,
            623
          ],
          [
            839.95,
            652
          ],
          [
            719.9,
            638
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            600,
            771
          ],
          [
            895,
            771
          ],
          [
            802.25,
            800
          ],
          [
            674.5,
            786
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            275,
            773
          ],
          [
            450,
            773
          ],
          [
            399.25,
            802
          ],
          [
            313.5,
            788
          ]
        ]
      }
    ],
    "setPieces": [
      {
        "form": "stadium-bowl",
        "left": 120,
        "right": 960,
        "y": 475,
        "landing": 475,
        "room": 0
      },
      {
        "form": "stadium-bowl",
        "left": 60,
        "right": 960,
        "y": 620,
        "landing": 596,
        "room": 1
      },
      {
        "form": "stadium-bowl",
        "left": 240,
        "right": 930,
        "y": 746,
        "landing": 746,
        "room": 2
      }
    ],
    "height": 871,
    "layoutForm": "stadium-bowl",
    "difficulty": "Extreme",
    "exitChamber": {
      "x": 240,
      "y": 746,
      "w": 245,
      "dir": -1
    },
    "challenge": {
      "jobCount": 15,
      "toolCount": 5
    }
  },
  {
    "id": 18,
    "name": "Orbital Maintenance",
    "world": "Starport Nine",
    "theme": "station",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 280,
    "dir": 1,
    "interval": 90,
    "exitX": 795,
    "exitY": 802,
    "stock": {
      "block": 1,
      "platform": 3,
      "bash": 9,
      "dig": 2,
      "mine": 2,
      "build": 2
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
        36,
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
        840,
        340,
        50,
        10,
        1
      ],
      [
        706,
        460,
        254,
        26,
        1
      ],
      [
        480,
        460,
        164,
        28,
        1
      ],
      [
        948,
        405,
        12,
        75,
        2
      ],
      [
        480,
        405,
        12,
        75,
        2
      ],
      [
        793.6,
        396,
        32,
        64,
        1
      ],
      [
        639,
        432,
        70,
        4,
        2
      ],
      [
        430,
        585,
        254,
        34,
        1
      ],
      [
        754,
        561,
        156,
        28,
        1
      ],
      [
        430,
        530,
        12,
        75,
        2
      ],
      [
        898,
        506,
        12,
        75,
        2
      ],
      [
        564.4,
        521,
        38,
        64,
        1
      ],
      [
        614,
        701,
        296,
        26,
        1
      ],
      [
        350,
        701,
        202,
        28,
        1
      ],
      [
        898,
        646,
        12,
        75,
        2
      ],
      [
        350,
        646,
        12,
        75,
        2
      ],
      [
        709.2,
        637,
        44,
        64,
        1
      ],
      [
        547,
        673,
        70,
        4,
        2
      ],
      [
        290,
        826,
        302,
        34,
        1
      ],
      [
        662,
        802,
        198,
        28,
        1
      ],
      [
        290,
        771,
        12,
        75,
        2
      ],
      [
        848,
        747,
        12,
        75,
        2
      ],
      [
        449.6,
        762,
        50,
        64,
        1
      ],
      [
        40,
        342,
        310,
        3,
        2
      ],
      [
        40,
        376,
        310,
        3,
        2
      ],
      [
        280,
        232,
        280,
        3,
        2
      ],
      [
        280,
        256,
        280,
        3,
        2
      ],
      [
        625,
        232,
        219,
        3,
        2
      ],
      [
        886,
        232,
        74,
        3,
        2
      ],
      [
        625,
        252,
        219,
        3,
        2
      ],
      [
        886,
        252,
        74,
        3,
        2
      ],
      [
        706,
        472,
        254,
        3,
        2
      ],
      [
        706,
        482,
        254,
        3,
        2
      ],
      [
        480,
        472,
        14,
        3,
        2
      ],
      [
        570,
        472,
        74,
        3,
        2
      ],
      [
        552,
        484,
        92,
        3,
        2
      ],
      [
        430,
        597,
        254,
        3,
        2
      ],
      [
        430,
        615,
        254,
        3,
        2
      ],
      [
        754,
        573,
        50,
        3,
        2
      ],
      [
        846,
        573,
        64,
        3,
        2
      ],
      [
        754,
        585,
        50,
        3,
        2
      ],
      [
        846,
        585,
        64,
        3,
        2
      ],
      [
        614,
        713,
        296,
        3,
        2
      ],
      [
        614,
        723,
        296,
        3,
        2
      ],
      [
        350,
        713,
        14,
        3,
        2
      ],
      [
        440,
        713,
        112,
        3,
        2
      ],
      [
        422,
        725,
        130,
        3,
        2
      ],
      [
        290,
        838,
        302,
        3,
        2
      ],
      [
        290,
        856,
        302,
        3,
        2
      ],
      [
        662,
        814,
        198,
        3,
        2
      ],
      [
        662,
        826,
        198,
        3,
        2
      ],
      [
        662,
        754,
        198,
        6,
        2
      ],
      [
        848,
        754,
        12,
        76,
        2
      ],
      [
        710,
        760,
        26,
        42,
        1
      ],
      [
        674,
        178,
        26,
        42,
        1
      ],
      [
        569,
        418,
        26,
        42,
        1
      ],
      [
        803,
        519,
        26,
        42,
        1
      ],
      [
        477,
        659,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "Four compact, offset service pods spiral down the station.",
      "Keep the crowd safe while a scout prepares tunnels and crossings. All twenty must reach the exit.",
      "Use the levers to disable traps. Mine or dig into the next area; the narrow chambers do not share the same crossing positions.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
        "y": 340,
        "bottom": 460,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 793.6,
        "y": 396,
        "w": 32,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 564.4,
        "y": 521,
        "w": 38,
        "h": 64
      },
      {
        "type": "switch",
        "x": 614.4,
        "y": 585,
        "target": "finale-18"
      },
      {
        "id": "finale-18",
        "type": "laser",
        "x": 639,
        "y": 520,
        "w": 28,
        "h": 65,
        "period": 240,
        "active": 70
      },
      {
        "type": "rubble",
        "x": 709.2,
        "y": 637,
        "w": 44,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 449.6,
        "y": 762,
        "w": 50,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 710,
        "y": 760,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 674,
        "y": 178,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 569,
        "y": 418,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 803,
        "y": 519,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 477,
        "y": 659,
        "w": 26,
        "h": 42
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
      },
      {
        "type": 1,
        "points": [
          [
            741,
            485
          ],
          [
            925,
            485
          ],
          [
            871.1,
            496
          ],
          [
            782.2,
            491
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            515,
            487
          ],
          [
            609,
            487
          ],
          [
            586.6,
            498
          ],
          [
            529.2,
            493
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            465,
            618
          ],
          [
            649,
            618
          ],
          [
            595.1,
            629
          ],
          [
            506.2,
            624
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            789,
            588
          ],
          [
            875,
            588
          ],
          [
            855.4,
            599
          ],
          [
            800.8,
            594
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            649,
            726
          ],
          [
            875,
            726
          ],
          [
            806.4,
            737
          ],
          [
            702.8,
            732
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            385,
            728
          ],
          [
            517,
            728
          ],
          [
            481.3,
            739
          ],
          [
            410.6,
            734
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            325,
            859
          ],
          [
            557,
            859
          ],
          [
            486.3,
            870
          ],
          [
            380.6,
            865
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            697,
            829
          ],
          [
            825,
            829
          ],
          [
            790.7,
            840
          ],
          [
            721.4,
            835
          ]
        ]
      }
    ],
    "gravity": 0.12,
    "setPieces": [
      {
        "form": "orbital-pods",
        "left": 480,
        "right": 960,
        "y": 460,
        "landing": 460,
        "room": 0
      },
      {
        "form": "orbital-pods",
        "left": 430,
        "right": 910,
        "y": 585,
        "landing": 561,
        "room": 1
      },
      {
        "form": "orbital-pods",
        "left": 350,
        "right": 910,
        "y": 701,
        "landing": 701,
        "room": 2
      },
      {
        "form": "orbital-pods",
        "left": 290,
        "right": 860,
        "y": 826,
        "landing": 802,
        "room": 3
      }
    ],
    "height": 927,
    "layoutForm": "orbital-pods",
    "difficulty": "Extreme",
    "exitChamber": {
      "x": 662,
      "y": 802,
      "w": 198,
      "dir": 1
    },
    "challenge": {
      "jobCount": 18,
      "toolCount": 5
    }
  },
  {
    "id": 19,
    "name": "Heart of Prism Falls",
    "world": "Prism Falls",
    "theme": "enchanted",
    "total": 20,
    "target": 20,
    "spawnX": 105,
    "spawnY": 100,
    "dir": 1,
    "interval": 90,
    "exitX": 105,
    "exitY": 706,
    "stock": {
      "block": 1,
      "platform": 3,
      "bash": 8,
      "dig": 2,
      "mine": 1,
      "build": 1
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
        36,
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
        865,
        390,
        50,
        10,
        1
      ],
      [
        541,
        445,
        439,
        26,
        1
      ],
      [
        150,
        445,
        329,
        28,
        1
      ],
      [
        968,
        390,
        12,
        75,
        2
      ],
      [
        150,
        390,
        12,
        75,
        2
      ],
      [
        778,
        381,
        32,
        64,
        1
      ],
      [
        474,
        417,
        70,
        4,
        2
      ],
      [
        90,
        580,
        270,
        34,
        1
      ],
      [
        430,
        556,
        170,
        28,
        1
      ],
      [
        90,
        525,
        12,
        75,
        2
      ],
      [
        588,
        501,
        12,
        75,
        2
      ],
      [
        232.8,
        516,
        38,
        64,
        1
      ],
      [
        308,
        706,
        302,
        26,
        1
      ],
      [
        40,
        706,
        206,
        28,
        1
      ],
      [
        598,
        651,
        12,
        75,
        2
      ],
      [
        40,
        651,
        12,
        75,
        2
      ],
      [
        406.4,
        642,
        44,
        64,
        1
      ],
      [
        241,
        678,
        70,
        4,
        2
      ],
      [
        40,
        162,
        280,
        3,
        2
      ],
      [
        40,
        186,
        280,
        3,
        2
      ],
      [
        200,
        282,
        260,
        3,
        2
      ],
      [
        200,
        326,
        260,
        3,
        2
      ],
      [
        550,
        282,
        180,
        3,
        2
      ],
      [
        550,
        311,
        180,
        3,
        2
      ],
      [
        795,
        282,
        74,
        3,
        2
      ],
      [
        911,
        282,
        49,
        3,
        2
      ],
      [
        795,
        302,
        74,
        3,
        2
      ],
      [
        911,
        302,
        49,
        3,
        2
      ],
      [
        541,
        457,
        439,
        3,
        2
      ],
      [
        541,
        467,
        439,
        3,
        2
      ],
      [
        150,
        457,
        14,
        3,
        2
      ],
      [
        240,
        457,
        239,
        3,
        2
      ],
      [
        222,
        469,
        257,
        3,
        2
      ],
      [
        90,
        592,
        270,
        3,
        2
      ],
      [
        90,
        610,
        270,
        3,
        2
      ],
      [
        430,
        568,
        64,
        3,
        2
      ],
      [
        536,
        568,
        64,
        3,
        2
      ],
      [
        430,
        580,
        64,
        3,
        2
      ],
      [
        536,
        580,
        64,
        3,
        2
      ],
      [
        308,
        718,
        302,
        3,
        2
      ],
      [
        308,
        728,
        302,
        3,
        2
      ],
      [
        40,
        718,
        206,
        3,
        2
      ],
      [
        40,
        730,
        206,
        3,
        2
      ],
      [
        40,
        658,
        206,
        6,
        2
      ],
      [
        40,
        658,
        12,
        76,
        2
      ],
      [
        172,
        664,
        26,
        42,
        1
      ],
      [
        844,
        228,
        26,
        42,
        1
      ],
      [
        404,
        403,
        26,
        42,
        1
      ],
      [
        479,
        514,
        26,
        42,
        1
      ]
    ],
    "hints": [
      "A broad crystal basin narrows into a waterfall gorge and a secluded final grotto.",
      "Keep the crowd safe while a scout prepares tunnels and crossings. All twenty must reach the exit.",
      "Use the levers to disable traps. Mine or dig into the next area; the narrow chambers do not share the same crossing positions.",
      "Steel seams stop shortcut shafts. Follow the soft mining channels, and approach the roofed exit from the side."
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
        "y": 390,
        "bottom": 445,
        "dir": 1
      },
      {
        "type": "rubble",
        "x": 778,
        "y": 381,
        "w": 32,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 232.8,
        "y": 516,
        "w": 38,
        "h": 64
      },
      {
        "type": "switch",
        "x": 282.8,
        "y": 580,
        "target": "finale-19"
      },
      {
        "id": "finale-19",
        "type": "crusher",
        "x": 315,
        "y": 515,
        "w": 28,
        "h": 65,
        "period": 240,
        "active": 70
      },
      {
        "type": "rubble",
        "x": 406.4,
        "y": 642,
        "w": 44,
        "h": 64
      },
      {
        "type": "rubble",
        "x": 172,
        "y": 664,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 844,
        "y": 228,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 404,
        "y": 403,
        "w": 26,
        "h": 42
      },
      {
        "type": "rubble",
        "x": 479,
        "y": 514,
        "w": 26,
        "h": 42
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
      },
      {
        "type": 1,
        "points": [
          [
            576,
            470
          ],
          [
            945,
            470
          ],
          [
            826.35,
            521
          ],
          [
            672.7,
            496
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            185,
            472
          ],
          [
            444,
            472
          ],
          [
            363.85,
            523
          ],
          [
            248.7,
            498
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            125,
            613
          ],
          [
            325,
            613
          ],
          [
            265.5,
            664
          ],
          [
            171,
            639
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            465,
            583
          ],
          [
            565,
            583
          ],
          [
            540.5,
            634
          ],
          [
            481,
            609
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            343,
            731
          ],
          [
            575,
            731
          ],
          [
            504.3,
            782
          ],
          [
            398.6,
            757
          ]
        ]
      },
      {
        "type": 1,
        "points": [
          [
            75,
            733
          ],
          [
            211,
            733
          ],
          [
            173.9,
            784
          ],
          [
            101.8,
            759
          ]
        ]
      }
    ],
    "setPieces": [
      {
        "form": "crystal-cascade",
        "left": 150,
        "right": 980,
        "y": 445,
        "landing": 445,
        "room": 0
      },
      {
        "form": "crystal-cascade",
        "left": 90,
        "right": 600,
        "y": 580,
        "landing": 556,
        "room": 1
      },
      {
        "form": "crystal-cascade",
        "left": 40,
        "right": 610,
        "y": 706,
        "landing": 706,
        "room": 2
      }
    ],
    "height": 831,
    "layoutForm": "crystal-cascade",
    "difficulty": "Extreme",
    "exitChamber": {
      "x": 40,
      "y": 706,
      "w": 206,
      "dir": -1
    },
    "challenge": {
      "jobCount": 15,
      "toolCount": 5
    }
  }
];
