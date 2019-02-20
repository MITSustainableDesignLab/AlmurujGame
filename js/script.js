function BuildMap3(data,title,units){
  building_geometries = [];
    building_data = [];
    topcard.innerHTML = project[0].pname + " | " + 'Map View';

  function bldGeoArray() {
    this.type;
    this.features;
  }

  function bldGeoObj() {
    this.geometry;
    this.properties;
    this.type;
  }

  function bldGeoProp() {
    this.name;
    this.oe;
    this.oenorm;
    this.temp;
    this.ee;
    this.co;
    this.da;
    this.wa;
    this.ba;
  }

  function bldGeoData() {
    this.code;
    this.value;
  }

  building_array = new bldGeoArray();

  building_array.type = "FeatureCollection";

  for (i = 0; i < buildings.length; i++) {

    var bld = new bldGeoObj();

    bld.geometry = buildings[i].geometry;
    bld.type = "Feature";

    var bldprop = new bldGeoProp();

    bldprop.name = buildings[i].bname;
    bldprop.oe = buildings[i].oe;
    bldprop.oenorm = buildings[i].oenorm;
    bldprop.temp = buildings[i].temp;
    bldprop.ee = buildings[i].ee;
    bldprop.co = buildings[i].co;
    bldprop.da = buildings[i].da;
    bldprop.wa = buildings[i].wa;
    bldprop.ba = buildings[i].ba;

    bld.properties = bldprop;

    building_geometries.push(bld);

    var blddata = new bldGeoData();

    blddata.code = buildings[i].bname;
    blddata.value = buildings[i][data];

    building_data.push(blddata);

  }

  building_array.features = building_geometries;
  filtervalues = building_data.map(function(a) {
    return a.value;
  });

  var max_s = (project[0]["max_"+data])

  var step1_s = 0
  var step2_s = Math.round(max_s / 4)
  var step3_s = Math.round(max_s / 3)
  var step4_s = Math.round(max_s / 2)
  var step5_s = Math.round(max_s)

  $('.range-slider').jRange({
    from: 0,
    to: max_s,
    scale: [step1_s, step2_s, step3_s, step4_s, step5_s],
    isRange: true,
  });


  rangeInput = document.getElementById("rangevalue");
  rangeInput2 = document.getElementById("rangevalue").textContent;
  leftslider = document.getElementsByClassName("pointer-label low");

  rangeInput.addEventListener("change", function() {
    document.getElementById("rangevalue").textContent = rangeInput.value;
  }, false);

  rangeInput.value = "0.00," + String(max_s)


  function titleMove(e) {
        var title = this.legend.title;

        title.translate(225, 0);
    }


  // Initiate the chart
  $('#scoremap').highcharts('Map', {

    title: {
      text: ''
    },

    credits: {
      enabled: false
    },

    chart: {
      marginTop: 0,
      marginLeft: 0,
      borderWidth: 0,
      height: 400,
      events: {
        load: titleMove,
        redraw: titleMove
    	},
    },

    tooltip: {
      formatter: function() {

        var s = '<b> Name: ' + this.point.name + '</b>' + '<br/>' + '' + this.point.value.toLocaleString() + ' ' + units;
        return s;

      }
    },

    plotOptions: {
      map: {
        borderColor: "white"
      },
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        point: {
          events: {
            click: function() {
              n = array_bname.indexOf(this.name)
              Overview2(n)
            }
          }
        }
      }
    },

    mapNavigation: {
      enabled: true,
      x: 5,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },

    legend: {
    		title: {
            	text: title + ' (' + units +')',
        	},
            layout: 'horizontal',
            borderWidth: 0,
            floating: true,
            verticalAlign: 'bottom',
            align: 'right',
            fontSize: '10px',
        },

    colorAxis: {
      stops: [
        [0, '#ed1e79'],
        [0.5, '#ffbe20'],
        [1.0, '#00a99d']
      ],
      max: project[0]["max_"+data],
      min: project[0]["min_"+data],
      tickColor: "#DCDCDC"
    },


    series: [{
      data: building_data,
      mapData: building_array,
      joinBy: ['name', 'code'],
      nullColor: '#cccccc',
      states: {
        hover: {
          color: '#ffe19f'
        }
      }
    }]
  });

