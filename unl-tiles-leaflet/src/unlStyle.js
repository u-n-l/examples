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
                size: 11,
                priority: 100,
                fill: "hsl(0, 0%, 59%)",
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
                fill: "hsl(0, 0%, 59%)",
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
            color: "#ededed",
            order: "global.sort_rank",
          },
        },
      },
      urban_area: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              kind: "urban_area",
            },
          ],
        },
        draw: {
          polygons: {
            color: "#ededed",
            order: "global.sort_rank",
          },
        },
      },
      park_national: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              kind: "national_park",
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      park: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
          ],
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
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      pitch: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              kind: "pitch",
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      hopital: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              kind: "hospital",
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      cemetery: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              kind: "cemetery",
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      bridge: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              kind: "bridge",
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      zoo: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
          ],
          any: [
            {
              kind: ["sport", "sports_centre", "attraction", "zoo"],
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      religion: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              kind: "religion",
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      industrial: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
          ],
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
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      farmyard: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
          ],
          any: [
            {
              kind: ["animal", "aviary", "zoo", "farm", "farmland", "farmyard"],
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      beach: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
          ],
          any: [
            {
              kind: "beach",
            },
            "function() { return feature.kind.endsWith ('_site');}",
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      aerodrome: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              kind: "aerodrome",
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      runway: {
        data: {
          source: "omv",
          layer: "landuse",
        },
        filter: {
          all: [
            {
              $geometry: "polygon",
            },
            {
              kind: "runway",
            },
          ],
        },
        draw: {
          polygons: {
            color: "#d9f3d3",
            order: "global.sort_rank",
          },
        },
      },
      pier: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter: {
          all: null,
          any: [
            {
              kind_detail: "pier",
            },
            {
              landuse_kind: "pier",
            },
          ],
        },
        draw: {
          lines: {
            color: "hsl(0, 0%, 95%)",
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
        data: {
          source: "omv",
          layer: "roads",
        },
        filter: {
          all: [
            {
              $geometry: "line",
            },
            {
              kind: "rail",
            },
            {
              kind_detail: ["rail", "light_rail", "tram"],
            },
            {
              service: ["siding", "industrial", "yard", "spur", "crossover"],
            },
          ],
        },
        draw: {
          lines: {
            color: "hsl(0, 0%, 95%)",
            width: 2,
            order: "global.sort_rank",
          },
        },
      },
      railway_s_bahn: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter: {
          all: [
            {
              $geometry: "line",
            },
            {
              kind: ["rail", "light_rail", "tram"],
            },
          ],
          not: [
            {
              is_tunnel: true,
            },
          ],
        },
        draw: {
          background: {
            style: "lines",
            order: "global.sort_rank",
            color: "hsl(0, 0%, 95%)",
            width: [
              [9, 300],
              [11, 70],
              [13, 18],
              [14, 10],
              [15, 5],
              [17, 1.5],
            ],
          },
          dashes: {
            style: "lines",
            order: "function() { return feature.sort_rank + 1.25; }",
            color: "hsl(0, 0%, 95%)",
            width: 5,
            dash: [0.2, 2],
          },
        },
      },
      railway_s_bahn_tunnel: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter: {
          all: [
            {
              $geometry: "line",
            },
            {
              kind: ["rail", "light_rail", "tram"],
            },
            {
              is_tunnel: true,
            },
          ],
        },
        draw: {
          background: {
            style: "lines",
            order: "global.sort_rank",
            color: "hsl(0, 0%, 95%)",
            width: [
              [13, 7],
              [14, 5],
            ],
          },
          dashes: {
            style: "lines",
            order: "function() { return feature.sort_rank + 1.25; }",
            color: "hsl(0, 0%, 95%)",
            width: 5,
            dash: [0.2, 2],
          },
        },
      },
      tram: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter: {
          all: [
            {
              $geometry: "line",
            },
            {
              kind: "rail",
            },
            {
              kind_detail: "tram",
            },
          ],
        },
        draw: {
          lines: {
            color: "hsl(0, 0%, 95%)",
            width: [
              [13, 6],
              [16, 3],
              [17, 1.6],
            ],
            order: "global.sort_rank",
          },
        },
      },
      ferry: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter: {
          all: [
            {
              kind: "ferry",
            },
            {
              not: [
                {
                  kind: "rail",
                },
              ],
            },
          ],
        },
        draw: {
          lines: {
            color: "hsl(0, 0%, 95%)",
            width: [
              [5, 640],
              [6, 320],
              [7, 160],
              [8, 80],
              [9, 30],
              [10, 18],
              [11, 12],
              [12, 6],
              [13, 3],
              [14, 2],
            ],
            order: "global.sort_rank",
            dash: [8, 4],
          },
        },
        label: {
          filter: [
            {
              $zoom: {
                min: 15,
              },
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
                priority: 25,
                fill: "hsl(0, 0%, 44%)",
                stroke: {
                  color: [1, 1, 1, 0.3],
                  width: 2,
                },
              },
            },
          },
        },
      },
      parking_aisles: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter: {
          not: [
            {
              kind: "rail",
            },
          ],
          all: [
            {
              kind_detail: ["driveway", "drive_through", "parking_aisle"],
            },
          ],
        },
        draw: {
          lines: {
            color: "hsl(0, 0%, 100%)",
            width: 5,
            order: "global.sort_rank",
          },
        },
      },
      pedestrian: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter:
          "function() {return (feature.kind == 'path' && (feature.kind_detail.startsWith('pedestrian') || feature.kind_detail.startsWith('footway')))}",
        draw: {
          sidewalk_casing: {
            style: "lines",
            color: "hsl(0, 0%, 100%)",
            width: [
              [13, 26],
              [14, 18],
              [16, 9],
              [18, 7],
            ],
            order: "global.sort_rank",
          },
          sidewalk_line: {
            style: "lines",
            color: "hsl(0, 0%, 100%)",
            width: [
              [13, 26],
              [14, 18],
              [16, 7],
              [18, 5],
            ],
            order: "function() { return feature.sort_rank + 2; }",
          },
        },
        label: {
          filter: [
            {
              $zoom: {
                min: 15,
              },
            },
          ],
          draw: {
            text: {
              font: {
                text_source: "global.language_text_source",
                family: "FiraGo",
                size: 16,
                order: "function() { return feature.sort_rank + 1; }",
                priority: 15,
                fill: "hsl(0, 0%, 50%)",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
      },
      residential: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter:
          "function() { return (feature.kind == 'minor_road' && ( feature.kind_detail== 'unclassified') || (feature.kind_detail == 'residential') || (feature.kind_detail == 'service' ))}",
        draw: {
          road_casing: {
            style: "lines",
            color: "hsl(0, 0%, 100%)",
            order: "global.sort_rank",
            width: [
              [13, 40],
              [14, 36],
              [16, 12],
              [18, 10],
            ],
          },
          road_line: {
            style: "lines",
            color: "hsl(0, 0%, 100%)",
            order: "function() { return feature.sort_rank + 0.5; }",
            width: [
              [13, 40],
              [14, 28],
              [16, 9],
              [18, 8],
            ],
          },
        },
        label: {
          filter: [
            {
              $zoom: {
                min: 16,
              },
            },
          ],
          draw: {
            text: {
              font: {
                text_source: "global.language_text_source",
                family: "FiraGo",
                size: 12,
                priority: 15,
                fill: "hsl(0, 0%, 50%)",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
      },
      secondary: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter:
          "function() {return (feature.kind == 'major_road' && feature.kind_detail.startsWith('secondary'))}",
        draw: {
          road_casing: {
            style: "lines",
            color: "#fef9e1",
            order: "global.sort_rank",
            width: [
              [10, 500],
              [11, 260],
              [12, 140],
              [13, 70],
              [14, 60],
              [16, 18],
              [18, 14],
            ],
          },
          road_line: {
            style: "lines",
            color: "#fef9e1",
            order: "function() { return feature.sort_rank + 0.5; }",
            width: [
              [10, 320],
              [11, 180],
              [12, 100],
              [13, 56],
              [14, 46],
              [16, 14],
              [18, 12],
            ],
          },
        },
        label: {
          filter: [
            {
              $zoom: {
                min: 14,
              },
            },
          ],
          draw: {
            text: {
              font: {
                text_source: "global.language_text_source",
                family: "FiraGo",
                size: 16,
                priority: 15,
                fill: "hsl(0, 0%, 40%)",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
      },
      tertiary: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter:
          "function() {return (feature.kind == 'major_road' && (feature.kind_detail.startsWith('tertiary')))}",
        draw: {
          road_casing: {
            style: "lines",
            color: "#fef9e1",
            order: "global.sort_rank",
            width: [
              [11, 220],
              [12, 120],
              [13, 66],
              [14, 46],
              [16, 15],
              [18, 12],
            ],
          },
          road_line: {
            style: "lines",
            color: "#fef9e1",
            order: "function() { return feature.sort_rank + 5; }",
            width: [
              [11, 140],
              [12, 90],
              [13, 50],
              [14, 36],
              [16, 12],
              [18, 10],
            ],
          },
        },
        label: {
          filter: [
            {
              $zoom: {
                min: 15,
              },
            },
          ],
          draw: {
            text: {
              font: {
                text_source: "global.language_text_source",
                family: "FiraGo",
                size: 16,
                priority: 20,
                fill: "hsl(0, 0%, 40%)",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
      },
      trunk: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter:
          "function() { return (feature.kind == 'highway' && (feature.kind_detail.startsWith('trunk')))}",
        draw: {
          road_casing: {
            style: "lines",
            color: "#eac650",
            order: "global.sort_rank",
            width: [
              [5, 5000],
              [6, 3000],
              [7, 2200],
              [8, 1900],
              [9, 1200],
              [10, 640],
              [11, 340],
              [12, 180],
              [13, 90],
              [14, 70],
              [16, 22],
              [18, 16],
            ],
          },
          road_line: {
            style: "lines",
            color: "#eac650",
            order: "function() { return feature.sort_rank + 5; }",
            width: [
              [5, 5000],
              [6, 3000],
              [7, 2200],
              [8, 1300],
              [9, 800],
              [10, 440],
              [11, 240],
              [12, 130],
              [13, 70],
              [14, 54],
              [16, 18],
              [18, 14],
            ],
          },
        },
      },
      primary: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter:
          "function() { return (feature.kind == 'major_road' && ( feature.kind_detail.startsWith('primary')))}",
        draw: {
          road_casing: {
            style: "lines",
            color: "#f2e5ab",
            order: "global.sort_rank",
            width: [
              [8, 1900],
              [9, 1200],
              [10, 640],
              [11, 340],
              [12, 180],
              [13, 90],
              [14, 70],
              [16, 22],
              [18, 16],
            ],
          },
          road_line: {
            style: "lines",
            color: "#f2e5ab",
            order: "function() { return feature.sort_rank + 5; }",
            width: [
              [8, 1300],
              [9, 800],
              [10, 440],
              [11, 240],
              [12, 130],
              [13, 70],
              [14, 54],
              [16, 18],
              [18, 14],
            ],
          },
        },
        label_low: {
          filter: {
            all: [
              {
                $zoom: {
                  min: 13,
                },
              },
            ],
          },
          draw: {
            text: {
              repeat_distance: "100px",
              font: {
                text_source: "global.language_text_source",
                family: "FiraGo",
                size: 16,
                priority: 25,
                fill: "hsl(0, 0%, 40%)",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
        label_high: {
          filter: [
            {
              $zoom: {
                min: 13,
              },
            },
          ],
          draw: {
            text: {
              repeat_distance: "100px",
              font: {
                text_source: "global.language_text_source",
                family: "FiraGo",
                size: 16,
                priority: 25,
                fill: "hsl(0, 0%, 40%)",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
      },
      highway: {
        data: {
          source: "omv",
          layer: "roads",
        },
        filter:
          "function() { return (feature.kind == 'highway' && (feature.kind_detail.startsWith('motorway')))}",
        draw: {
          road_casing: {
            style: "lines",
            color: "#eac650",
            order: "global.sort_rank",
            width: [
              [5, 7000],
              [6, 4600],
              [7, 3200],
              [8, 2400],
              [9, 1400],
              [10, 800],
              [11, 430],
              [12, 240],
              [13, 130],
              [14, 90],
              [16, 30],
              [18, 18],
            ],
          },
          road_line: {
            style: "lines",
            color: "#eac650",
            order: "function() { return feature.sort_rank + 5; }",
            width: [
              [5, 7000],
              [6, 4600],
              [7, 3200],
              [8, 1700],
              [9, 1020],
              [10, 600],
              [11, 320],
              [12, 190],
              [13, 104],
              [14, 70],
              [16, 26],
              [18, 16],
            ],
          },
        },
        link: {
          filter: {
            is_link: true,
          },
          draw: {
            link_casing: {
              style: "lines",
              color: "hsl(0, 0%, 100%)",
              order: "global.sort_rank",
              width: [
                [12, 120],
                [13, 50],
                [14, 36],
                [16, 18],
                [18, 14],
              ],
            },
            link_line: {
              style: "lines",
              color: "hsl(0, 0%, 100%)",
              order: "function() { return feature.sort_rank + 5; }",
              width: [
                [12, 100],
                [13, 40],
                [14, 24],
                [16, 14],
                [18, 12],
              ],
            },
          },
        },
        label: {
          filter: {
            all: [
              {
                $zoom: {
                  min: 13,
                },
              },
            ],
          },
          draw: {
            text: {
              repeat_distance: "100px",
              font: {
                text_source: "global.language_text_source",
                family: "FiraGo",
                size: 16,
                priority: 25,
                fill: "hsl(0, 0%, 40%)",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
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
            color: "rgba(47, 68, 75, 1)",
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
            color: "rgba(47, 68, 75, 1)",
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
                fill: "hsl(0, 0%, 50%)",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
      },
      disputed_border: {
        data: {
          source: "omv",
          layer: "boundaries",
        },
        filter: {
          all: [
            {
              $geometry: "line",
            },
          ],
          any: [
            {
              kind: [
                "disputed",
                "indefinite",
                "indeterminate",
                "lease_limit",
                "line_of_control",
                "overlay_limit",
              ],
            },
          ],
        },
        draw: {
          boundary_casing: {
            style: "lines",
            dash: [2, 2],
            color: "rgba(47, 68, 75, 1)",
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
            dash: [2, 2],
            color: "rgba(47, 68, 75, 1)",
            order: "function() { return feature.sort_rank + 5; }",
            width: [
              [2, 8000],
              [3, 5200],
              [4, 3000],
              [5, 2000],
              [6, 1440],
              [7, 1040],
              [8, 540],
              [9, 280],
              [10, 180],
              [11, 120],
              [12, 60],
              [13, 30],
              [14, 20],
              [15, 10],
              [16, 4],
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
                fill: "hsl(0, 0%, 50%)",
                stroke: {
                  color: [1, 1, 1, 0.5],
                  width: 2,
                },
              },
            },
          },
        },
      },
      region_border: {
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
              kind: "region",
            },
          ],
        },
        draw: {
          border_line: {
            style: "lines'",
            color: "hsl(0, 0%, 72%)",
            order: "function() { return feature.sort_rank + 5; }",
            width: [
              [2, 1200],
              [3, 600],
              [4, 300],
              [5, 200],
              [6, 120],
              [7, 60],
              [8, 40],
              [9, 24],
              [10, 16],
              [11, 10],
              [12, 6],
              [13, 4],
              [14, 2],
            ],
          },
        },
      },
      some_layer: {
        data: {
          source: "omv",
          layer: "boundaries",
        },
        filter: [
          {
            $geometry: "point",
          },
        ],
        draw: {
          text: {
            font: {
              family: "FiraGO",
              text_source: "global.language_text_source",
              size: 27.2,
              priority: 200,
              fill: "hsl(0, 0%, 72%)",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: 1,
              },
            },
          },
        },
      },
      earth_layer_island_label: {
        data: {
          source: "omv",
          layer: "earth",
        },
        filter: {
          all: [
            {
              $zoom: {
                min: 11,
              },
            },
            {
              kind: "island",
            },
          ],
        },
        draw: {
          text: {
            text_source: "global.language_text_source",
            text_wrap: 40,
            priority: 1,
            font: {
              family: "FiraGo",
              weight: 400,
              fill: "hsl(0, 0%, 50%)",
              size: 16,
            },
          },
        },
      },
      earth_layer_land_label: {
        data: {
          source: "omv",
          layer: "earth",
        },
        filter: {
          all: [
            {
              kind: "continent",
            },
          ],
          not: [
            {
              kind: "island",
            },
          ],
        },
        draw: {
          text: {
            text_source: "global.language_text_source",
            font: {
              family: "FiraGo",
              weight: 400,
              fill: "hsl(0, 0%, 50%)",
              size: 30,
              priority: 1,
            },
          },
        },
      },
      country: {
        data: {
          source: "omv",
          layer: "places",
        },
        filter: {
          all: [
            {
              kind: "country",
            },
          ],
        },
        draw: {
          text: {
            text_source: "global.language_text_source",
            text_wrap: 30,
            priority: 10,
            font: {
              family: "FiraGo",
              size: [
                [1, 8],
                [2, 10],
                [3, 12],
                [4, 14],
                [5, 16],
              ],
              fill: "hsl(0, 0%, 50%)",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: "1.5px",
              },
              transform: "uppercase",
              weight: 400,
            },
          },
        },
      },
      locality_10million_capital: {
        data: {
          source: "omv",
          layer: "places",
        },
        filter:
          "function() { return ((((feature.kind == 'locality' )&& feature.population) && (feature.population > 10000000 || feature.country_capital))&& feature.country_capital)}",
        draw: {
          text: {
            text_source: "global.language_text_source",
            text_wrap: 30,
            priority: 39,
            font: {
              family: "FiraGo",
              weight: "bold",
              size: [
                [1, 9.6],
                [2, 11.2],
                [3, 12.8],
                [4, 14.4],
                [5, 16],
                [6, 19.2],
                [7, 22.4],
                [8, 25.6],
                [9, 28.8],
                [10, 32],
              ],
              fill: "hsl(0, 0%, 40%)",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: [
                  [4, 2],
                  [6, 3],
                  [10, 6],
                  [12, 8],
                ],
              },
            },
          },
        },
      },
      locality_10million: {
        data: {
          source: "omv",
          layer: "places",
        },
        filter:
          "function() { return ((feature.kind == 'locality' && feature.population) && (feature.population > 10000000 || feature.country_capital))}",
        draw: {
          text: {
            text_source: "global.language_text_source",
            text_wrap: 30,
            priority: 39,
            font: {
              size: [
                [1, 9.6],
                [2, 11.2],
                [3, 12.8],
                [4, 14.4],
                [5, 16],
                [6, 19.2],
                [7, 22.4],
                [8, 25.6],
                [9, 28.8],
                [10, 32],
              ],
              fill: "hsl(0, 0%, 40%)",
              family: "FiraGO",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: [
                  [4, 1.5],
                  [6, 2],
                  [10, 4],
                  [12, 5],
                ],
              },
            },
          },
        },
      },
      locality_label_1million: {
        data: {
          source: "omv",
          layer: "places",
        },
        filter:
          "function() { return (feature.kind = 'locality' && feature.population && (feature.region_capital || feature.population > 1000000))}",
        draw: {
          text: {
            text_source: "global.language_text_source",
            text_wrap: 30,
            priority: 40,
            font: {
              size: [
                [2, 9.6],
                [3, 11.2],
                [4, 12.8],
                [5, 14.4],
                [6, 16],
                [7, 19.2],
                [8, 22.4],
                [9, 25.6],
                [10, 28.8],
                [11, 32],
              ],
              fill: "hsl(0, 0%, 40%)",
              family: "FiraGO",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: [
                  [2, 1],
                  [4, 1.5],
                  [6, 2],
                  [10, 4],
                  [12, 5],
                ],
              },
            },
          },
        },
      },
      locality_label_400k: {
        data: {
          source: "omv",
          layer: "places",
        },
        filter:
          "function() { return (feature.kind = 'locality' && feature.population && feature.population > 400000)}",
        draw: {
          text: {
            text_source: "global.language_text_source",
            text_wrap: 30,
            priority: 41,
            font: {
              size: [
                [4, 11.2],
                [5, 12.8],
                [6, 16],
                [7, 19.2],
                [8, 22.4],
                [9, 24],
                [10, 25.6],
                [11, 27.2],
              ],
              fill: "hsl(0, 0%, 40%)",
              family: "FiraGO",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: [
                  [4, 1],
                  [6, 2],
                  [8, 3],
                  [10, 4],
                  [12, 5],
                ],
              },
            },
          },
        },
      },
      locality_label_100k: {
        data: {
          source: "omv",
          layer: "places",
        },
        filter: {
          all: [
            "function() { return (feature.kind = 'locality' && feature.population > 100000)}",
            {
              $zoom: {
                min: 5,
              },
            },
          ],
        },
        draw: {
          text: {
            text_source: "global.language_text_source",
            text_wrap: 30,
            priority: 42,
            font: {
              family: "FiraGO",
              weight: 400,
              size: [
                [4, 9.6],
                [5, 11.2],
                [6, 12.8],
                [7, 16],
                [8, 19.2],
                [9, 20.8],
                [10, 22.4],
                [11, 24],
                [12, 25.6],
              ],
              fill: "hsl(0, 0%, 40%)",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: [
                  [5, 1],
                  [8, 3],
                  [10, 4],
                  [12, 5],
                ],
              },
            },
          },
        },
      },
      locality_label_50k: {
        data: {
          source: "omv",
          layer: "places",
        },
        filter: {
          all: [
            "function() { return (feature.kind = 'locality' && feature.population > 50000)}",
            {
              $zoom: {
                min: 5,
              },
            },
          ],
        },
        draw: {
          text: {
            text_source: "global.language_text_source",
            text_wrap: 30,
            priority: 43,
            font: {
              family: "FiraGo",
              size: [
                [10, 16],
                [11, 19.2],
                [12, 22.4],
                [13, 24],
              ],
              fill: "hsl(0, 0%, 40%)",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: [
                  [10, 2],
                  [12, 3],
                ],
              },
            },
          },
        },
      },
      locality_label_10k: {
        data: {
          source: "omv",
          layer: "places",
        },
        filter: {
          all: [
            "function() { return (feature.kind = 'locality' && feature.population > 10000)}",
            {
              $zoom: {
                min: 9,
              },
            },
          ],
        },
        draw: {
          text: {
            text_source: "global.language_text_source",
            text_wrap: 30,
            priority: 44,
            font: {
              family: "FiraGo",
              size: [
                [11, 16],
                [12, 17.6],
                [13, 19.2],
                [14, 20.8],
                [15, 22.4],
              ],
              fill: "hsl(0, 0%, 40%)",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: [
                  [10, 2],
                  [12, 3],
                ],
              },
            },
          },
        },
      },
      locality_label: {
        data: {
          source: "omv",
          layer: "places",
        },
        filter: {
          all: [
            "function() { return (feature.kind = 'locality' && feature.population <= 10000)}",
            {
              $zoom: {
                min: 11,
              },
            },
          ],
        },
        draw: {
          text: {
            text_source: "global.language_text_source",
            priority: 50,
            font: {
              size: [
                [11, 12.8],
                [12, 14.4],
                [13, 16],
                [14, 17.6],
                [15, 19.2],
              ],
              fill: "hsl(0, 0%, 40%)",
              family: "FiraGO",
              stroke: {
                color: [1, 1, 1, 0.5],
                width: "2px",
              },
            },
          },
        },
      },
      building_outline: {
        data: {
          source: "omv",
          layer: "buildings",
        },
        filter: {
          all: [
            {
              $zoom: {
                min: 14,
              },
            },
          ],
        },
        draw: {
          lines: {
            color: [0.09, 0.125, 0.137, 0.5],
            order: "global.sort_rank",
            width: 1,
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
            color: "hsl(0, 0%, 77%)",
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
