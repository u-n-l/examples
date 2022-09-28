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
