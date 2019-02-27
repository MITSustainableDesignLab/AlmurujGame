new Vue({
  el: '#app',
  data: {
    map: null,
    tileLayer: null,
    layers: [],  
    buildings: buildings,
  },
  mounted() {
    this.initMap();
  },
  methods: { 
    initMap() {
      var map = L.map("map", {
        crs: L.CRS.Simple,
        maxBounds: [[-1500, 1500], [-1500, 1500]],
      });
      L.geoJSON(buildings, {
        filter: function(building) {
          return building.geometry;
        }
      }).addTo(map); 
      this.map=map
    },
  },
});

var buildings = [
    {
      "id": "d0ac7e70-e1a1-4c3f-8483-34f0c0e65a61",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                65.760747008491307,
                -424.40339021803811
              ],
              [
                41.446271614171565,
                -436.1475091916509
              ],
              [
                54.213294406072237,
                -462.57975687552243
              ],
              [
                78.52776980039198,
                -450.83563790190965
              ],
              [
                65.760747008491307,
                -424.40339021803811
              ]
            ]
          ]
        ]
      },
      "properties": {
        "FloorCount": 1,
        "GrossFloorArea": 792.623670532968,
        "Height": 3.0,
        "Name": "C51_1_1",
        "Occupancy": 0,
        "TemplateName": null,
        "UseType": "Uncategorized",
        "WwrE": 0.2,
        "WwrN": 0.2,
        "WwrS": 0.2,
        "WwrW": 0.2
      },
      "type": "Feature"
    },
    {
      "id": "d358f2a9-253f-46ab-a47e-ba6b2b2b773f",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -632.36069429933559,
                -450.438288110774
              ],
              [
                -632.69046484620776,
                -449.69775416562334
              ],
              [
                -634.43546623550355,
                -450.47482868889347
              ],
              [
                -631.3356197301764,
                -457.43585532670841
              ],
              [
                -606.41433418460656,
                -446.33804405201226
              ],
              [
                -609.18441014294513,
                -440.117551359348
              ],
              [
                -632.36069429933559,
                -450.438288110774
              ]
            ]
          ]
        ]
      },
      "properties": {
        "FloorCount": 7,
        "GrossFloorArea": 1311.1906071638307,
        "Height": 21.0,
        "Name": "C373_1_1",
        "Occupancy": 0,
        "TemplateName": null,
        "UseType": "Uncategorized",
        "WwrE": 0.2,
        "WwrN": 0.2,
        "WwrS": 0.2,
        "WwrW": 0.2
      },
      "type": "Feature"
    },
    {
      "id": "6f78eafc-6b3f-42f3-98f4-f706a680b9d2",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                729.26946752797812,
                -735.14082872262225
              ],
              [
                725.97495109005831,
                -736.58059024624527
              ],
              [
                715.90559422317892,
                -713.53950936440378
              ],
              [
                687.58737564645708,
                -725.9150680527091
              ],
              [
                698.6587306043366,
                -751.24895863002166
              ],
              [
                730.27146561897825,
                -737.433638418559
              ],
              [
                729.26946752797812,
                -735.14082872262225
              ]
            ]
          ]
        ]
      },
      "properties": {
        "FloorCount": 8,
        "GrossFloorArea": 6907.3695307318812,
        "Height": 24.0,
        "Name": "C62_1_1",
        "Occupancy": 0,
        "TemplateName": null,
        "UseType": "Uncategorized",
        "WwrE": 0.2,
        "WwrN": 0.2,
        "WwrS": 0.2,
        "WwrW": 0.2
      },
      "type": "Feature"
    },
    {
      "id": "1277c836-0fc1-4f59-8279-62ad64f749d9",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -289.36503955873195,
                -574.85681522078812
              ],
              [
                -286.23104204039555,
                -580.49631982622668
              ],
              [
                -283.29969264834654,
                -578.86730409506708
              ],
              [
                -286.43369016656652,
                -573.22779948962852
              ],
              [
                -289.36503955873195,
                -574.85681522078812
              ]
            ]
          ]
        ]
      },
      "properties": {
        "FloorCount": 1,
        "GrossFloorArea": 21.636689655628711,
        "Height": 3.0,
        "Name": "C234_1_1",
        "Occupancy": 0,
        "TemplateName": null,
        "UseType": "Uncategorized",
        "WwrE": 0.2,
        "WwrN": 0.2,
        "WwrS": 0.2,
        "WwrW": 0.2
      },
      "type": "Feature"
    },
    {
      "id": "23cfeb92-269d-41b0-a776-40475c9ee1bd",
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -646.87951307208277,
                -1083.1470824875869
              ],
              [
                -643.18470865231939,
                -1076.0797549425624
              ],
              [
                -644.7759983924916,
                -1075.247827409301
              ],
              [
                -648.4708028123714,
                -1082.3151549547911
              ],
              [
                -646.87951307208277,
                -1083.1470824875869
              ]
            ]
          ]
        ]
      },
      "properties": {
        "FloorCount": 2,
        "GrossFloorArea": 28.639950679242094,
        "Height": 6.0,
        "Name": "C228_1_1",
        "Occupancy": 0,
        "TemplateName": null,
        "UseType": "Uncategorized",
        "WwrE": 0.2,
        "WwrN": 0.2,
        "WwrS": 0.2,
        "WwrW": 0.2
      },
      "type": "Feature"
    },
]


