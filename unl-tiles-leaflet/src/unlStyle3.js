export const getUnlStyle = (apiKey, vpmId) => {
  return {
    global: {
      language: "en",
      language_text_source:
        "function() {\n    return (global.language && feature['name:'+global.language]) || feature.name;\n}\n",
      sort_rank: "function() {\n    return (feature.sort_rank)\n    }\n",
    },
    scene: {
      background: {
        color: "#ededed",
      },
    },
    fonts: {
      FiraGo: [
        {
          weight: 400,
          url: "https://assets.vector.hereapi.com/fonts/FiraGO-Regular.ttf",
        },
        {
          weight: 400,
        },
        {
          style: "italics",
          url: "https://assets.vector.hereapi.com/fonts/FiraGO-Italic.ttf",
        },
        {
          weight: 500,
          url: "https://assets.vector.hereapi.com/fonts/FiraGO-Medium.ttf",
        },
      ],
    },
    sources: {
      omv: {
        type: "MVT",
        url: "https://tiles.unl.global/v1/vector/1/{z}/{x}/{y}",
        request_headers: {
          "x-unl-api-key": apiKey,
          "x-unl-vpm-id": vpmId,
        },
      },
    },
    styles: {
      _transparent: {
        base: "polygons",
        blend: "overlay",
      },
    },
    layers: {
      water: {
        data: {
          source: "omv",
          layer: "water",
        },
        "water fill": {
          filter: [
            {
              $geometry: "polygon",
            },
          ],
          draw: {
            polygons: {
              order: "global.sort_rank",
              color: "#c8e0f9",
            },
          },
        },
        rivers: {
          filter: [
            {
              $geometry: "line",
            },
          ],
          draw: {
            text: {
              font: {
                family: "FiraGO",
                text_source: "global.language_text_source",
                text_wrap: 10,
                order: "global.sort_rank",
                size: 12.8,
                priority: 100,
                fill: "#c8e0f9",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
        lakes: {
          filter: {
            all: [
              "function() {return feature.min_zoom <= ($zoom)}",
              {
                $geometry: "point",
              },
            ],
          },
          draw: {
            text: {
              font: {
                family: "FiraGO",
                text_source: "global.language_text_source",
                text_wrap: 10,
                order: "global.sort_rank",
                size: 12.8,
                priority: 100,
                fill: "#012337",
                stroke: {
                  color: [1, 1, 1, 0.3],
                  width: 2,
                },
              },
            },
          },
        },
      },
      urban: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: "function() { return feature.kind.startsWith ('urban');}",
        draw: {
          polygons: {
            color: "#919EA3",
            order: "global.sort_rank",
          },
        },
      },
      urban_area: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: { all: [{ $geometry: "polygon" }, { kind: "urban_area" }] },
        draw: {
          polygons: {
            color: "#919EA3",
            order: "global.sort_rank",
          },
        },
      },
      park_national: {
        data: { source: "omv", layer: "landuse" },
        filter: {
          all: [{ $geometry: "polygon" }, { kind: "national_park" }],
        },
        draw: {
          polygons: {
            color: "#789185",
            order: "global.sort_rank",
          },
        },
      },

      park: {
        data: { source: "omv", layer: "landuse" },
        filter: {
          all: [{ $geometry: "polygon" }],
          any: [
            {
              kind: [
                "nature",
                "forest",
                "park",
                "wood",
                "natural_wood",
                "grass",
                "meadow",
                "village_green",
                "dog_park",
                "garden",
                "nature_reserve",
                "protected_area",
              ],
            },
          ],
        },
        draw: {
          polygons: {
            color: "#6C9478",
            order: "global.sort_rank",
          },
        },
      },

      pitch: {
        data: { source: "omv", layer: "landuse" },
        filter: {
          all: [{ $geometry: "polygon" }, { kind: "pitch" }],
        },
        draw: {
          polygons: {
            color: "#718989",
            order: "global.sort_rank",
          },
        },
      },

      hopital: {
        data: { source: "omv", layer: "landuse" },
        filter: {
          all: [{ $geometry: "polygon" }, { kind: "hospital" }],
        },
        draw: {
          polygons: {
            color: "#89878A",
            order: "global.sort_rank",
          },
        },
      },
      cemetery: {
        data: { source: "omv", layer: "landuse" },
        filter: {
          all: [{ $geometry: "polygon" }, { kind: "cemetery" }],
        },
        draw: {
          polygons: {
            color: "#718989",
            order: "global.sort_rank",
          },
        },
      },
      bridge: {
        data: { source: "omv", layer: "landuse" },
        filter: {
          all: [{ $geometry: "polygon" }, { kind: "bridge" }],
        },
        draw: {
          polygons: {
            color: "#7E939A",
            order: "global.sort_rank",
          },
        },
      },
      zoo: {
        data: { source: "omv", layer: "landuse" },
        filter: {
          all: [{ $geometry: "polygon" }],
          any: [
            {
              kind: ["sport", "sports_centre", "attraction", "zoo"],
            },
          ],
        },
        draw: {
          polygons: {
            color: "#728989",
            order: "global.sort_rank",
          },
        },
      },
      religion: {
        data: { source: "omv", layer: "landuse" },
        filter: {
          all: [{ $geometry: "polygon" }, { kind: "religion" }],
        },
        draw: {
          polygons: {
            color: "#0DF3ED",
            order: "global.sort_rank",
          },
        },
      },
      industrial: {
        data: { source: "omv", layer: "landuse" },
        filter: {
          all: [{ $geometry: "polygon" }],
          any: [
            {
              kind: [
                "common",
                "surface",
                "commercial",
                "military",
                "industrial",
              ],
            },
          ],
          draw: {
            polygons: {
              color: "#7B8990",
              order: "global.sort_rank",
            },
          },
        },

        farmyard: {
          data: { source: "omv", layer: "landuse" },
          filter: {
            all: [{ $geometry: "polygon" }],
            any: [
              {
                kind: [
                  "animal",
                  "aviary",
                  "zoo",
                  "farm",
                  "farmland",
                  "farmyard",
                ],
              },
            ],
          },
          draw: {
            polygons: {
              color: "#BFF90D",
              order: "global.sort_rank",
            },
          },
        },
        beach: {
          data: { source: "omv", layer: "landuse" },
          filter: {
            all: [{ $geometry: "polygon" }],
            any: [
              { kind: "beach" },
              "function() { return feature.kind.endsWith ('_site')",
            ],
          },
          draw: {
            polygons: {
              color: "#A9A992",
              order: "global.sort_rank",
            },
          },
        },
        aerodrome: {
          data: { source: "omv", layer: "landuse" },
          filter: {
            all: [{ $geometry: "polygon" }, { kind: "aerodrome" }],
          },
          draw: {
            polygons: {
              color: "#718189",
              order: "global.sort_rank",
            },
          },
        },
        runway: {
          data: { source: "omv", layer: "landuse" },
          filter: {
            all: [{ $geometry: "polygon" }, { kind: "runway" }],
          },
          draw: {
            polygons: {
              color: "#6A7A82",
              order: "global.sort_rank",
            },
          },
        },
        pier: {
          data: { source: "omv", layer: "roads" },
          filter: {
            any: [{ kind_detail: "pier" }, { landuse_kind: "pier" }],
          },
          draw: {
            lines: {
              color: "#FAFDFE",
              order: "global.sort_rank",
              width: [
                [13, 3],
                [14, 2.4],
                [15, 1.8],
              ],
            },
          },
        },

        railway_industrial: {
          data: { source: "omv", layer: "roads" },
          filter: {
            all: [
              { $geometry: "line" },
              { kind: "rail" },
              { kind_detail: ["rail", "light_rail", "tram"] },
              {
                service: ["siding", "industrial", "yard", "spur", "crossover"],
              },
            ],
          },
        },
        draw: {
          lines: {
            color: "#A4A8A2",
            width: 2,
            order: "global.sort_rank",
          },
        },
      },

      country_border: {
        data: {
          source: "omv",
          layer: "boundaries",
        },
        filter: {
          all: [
            {
              $geometry: "line",
            },
            {
              kind: "country",
            },
          ],
        },
        draw: {
          boundary_case: {
            style: "lines",
            color: "#52676e",
            order: "global.sort_rank",
            width: [
              [1, 20000],
              [2, 16000],
              [3, 14000],
              [4, 10000],
              [5, 6000],
              [6, 4000],
              [7, 2000],
              [8, 1000],
              [9, 500],
              [10, 240],
              [11, 160],
              [12, 80],
              [13, 40],
              [14, 20],
            ],
          },
          boundary_fill: {
            style: "lines",
            color: "#2F444B",
            order: "function() { return feature.sort_rank + 5; }",
            width: [
              [2, 4000],
              [3, 2800],
              [4, 2000],
              [5, 1000],
              [6, 440],
              [7, 180],
              [8, 100],
              [9, 60],
              [10, 40],
              [11, 30],
              [12, 20],
              [13, 10],
              [14, 4],
            ],
          },
        },
        label: {
          draw: {
            text: {
              font: {
                text_source: "global.language_text_source",
                family: "FiraGo",
                size: 12.8,
                priority: 1,
                fill: "#000",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
      },
      building_extrusion: {
        data: {
          source: "omv",
          layer: "buildings",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              $zoom: {
                min: 15,
              },
            },
          ],
        },
        draw: {
          _transparent: {
            color: [0.639, 0.671, 0.659, 0.9],
            order: "global.sort_rank",
            extrude: "function() { return feature.height; }",
          },
        },
      },
      building_address: {
        data: {
          source: "omv",
          layer: "buildings",
        },
        filter: {
          all: [
            {
              $geometry: "point",
            },
            {
              $zoom: {
                min: 21,
              },
            },
            {
              kind: "address",
            },
          ],
        },
        draw: {
          text: {
            text_source: "addr_housenumber",
            order: "global.sort_rank",
            font: {
              size: 8,
              fill: "#A9A9A9",
              family: "FiraGO",
              stroke: {
                color: "#595959",
                width: "2px",
              },
            },
          },
        },
      },
    },
  };
};
