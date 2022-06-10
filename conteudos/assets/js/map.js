function getJson(option){
    //from: https://raw.githubusercontent.com/ofrohn/d3-celestial/master/data/asterisms.json
    //available: GreatDiamond, SummerTriangle, Cas-Cyg, Boo-Sgr, Cas-Aur
    switch (option){
        case "SummerTriangle":
            return {
                "type":"FeatureCollection",
                "features":[
                    {
                        "type": "Feature",
                        "id": "SummerTriangle",
                        "properties": {
                          "n": "Summer Triangle",
                          "es": "Triángulo Estival",
                          "loc": [
                            -67.5,
                            38
                          ],
                          "p": 1
                        },
                        "geometry": {
                          "type": "MultiLineString",
                          "coordinates": [
                            [
                              [
                                -80.7653,
                                38.7837
                              ],
                              [
                                -62.3042,
                                8.8683
                              ],
                              [
                                -49.642,
                                45.2803
                              ],
                              [
                                -80.7653,
                                38.7837
                              ]
                            ]
                          ]
                        }
                      }
                ]
            };
            break;
        case "Cas-Cyg":
            return {
                "type":"FeatureCollection",
                "features":[
                    {
                        "type": "Feature",
                        "id": "Cas-Cyg",
                        "properties": {
                          "n": "Cas-Cyg",
                          "es": "",
                          "loc": [
                            0,
                            0
                          ],
                          "p": 6
                        },
                        "geometry": {
                          "type": "MultiLineString",
                          "coordinates": [
                            [
                              [
                                21.454,
                                60.2353
                              ],
                              [
                                14.1772,
                                60.7167
                              ],
                              [
                                -0.015,
                                61
                              ],
                              [
                                0.015,
                                61
                              ],
                              [
                                -49.642,
                                45.2803
                              ],
                              [
                                -62.3042,
                                8.8683
                              ]
                            ]
                          ]
                        }
                      },
                ]
              };
            break;
        case "GreatDiamond":
            return {
                "type":"FeatureCollection",
                // this is an array, add as many objects as you want
                "features":[

                    {
                        "type": "Feature",
                        "id": "GreatDiamond",
                        "properties": {
                          "n": "Great Diamond",
                          "es": "Diamante de Virgo",
                          "loc": [
                            -163.5,
                            16
                          ],
                          "p": 1
                        },
                        "geometry": {
                          "type": "MultiLineString",
                          "coordinates": [
                            [
                              [
                                -146.0847,
                                19.1824
                              ],
                              [
                                -158.7018,
                                -11.1613
                              ],
                              [
                                177.2649,
                                14.5721
                              ],
                              [
                                -165.9931,
                                38.3184
                              ],
                              [
                                -146.0847,
                                19.1824
                              ]
                            ]
                          ]
                        }
                      }

                ]
            };
            break;
        case "Boo-Sgr":
            return {
                "type":"FeatureCollection",
                "features":[
                    {
                        "type": "Feature",
                        "id": "Boo-Sgr",
                        "properties": {
                          "n": "Boo-Sgr",
                          "es": "",
                          "loc": [
                            0,
                            0
                          ],
                          "p": 6
                        },
                        "geometry": {
                          "type": "MultiLineString",
                          "coordinates": [
                            [
                              [
                                -165.9931,
                                38.3184
                              ],
                              [
                                -146.0847,
                                19.1824
                              ],
                              [
                                -112.6481,
                                -26.432
                              ],
                              [
                                -90.015,
                                -34.3
                              ]
                            ]
                          ]
                        }
                    }

                ]
                };
            break;
        case "Cas-Aur":
            return {
                "type":"FeatureCollection",
                "features":[
                    {
                    "type": "Feature",
                    "id": "Cas-Aur",
                    "properties": {
                        "n": "Cas-Aur",
                        "es": "",
                        "loc": [
                        0,
                        0
                        ],
                        "p": 6
                    },
                    "geometry": {
                        "type": "MultiLineString",
                        "coordinates": [
                        [
                            [
                            14.1772,
                            60.7167
                            ],
                            [
                            21.454,
                            60.2353
                            ],
                            [
                            79.1723,
                            45.998
                            ]
                        ]
                        ]
                    }
                    }
                ]
                };
            break;
        /*case "":
            return {
                "type":"FeatureCollection",
                "features":[

                ]
                };
            break;*/
    }
}

function drawMap(asterism="GreatDiamond"){
    var config = {
        projection: "airy",
        center: [-65, 0],
        background: { fill: "#fff", stroke: "#000", opacity: 1, width: 1 },
        datapath: "https://ofrohn.github.io/data/",
        stars: {
          colors: false,
          names: false,
          style: { fill: "#000", opacity:1 },
          limit: 6,
          size: 5
        },
        dsos: { show: false },
        mw: {
          style: { fill:"#996", opacity: 0.1 }
        },
      };
    var lineStyle = { 
        stroke:"#f00", 
        fill: "rgba(255, 204, 204, 0.4)",
        width:3 
    };
    var textStyle = { 
        fill:"#f00", 
        font: "bold 15px Helvetica, Arial, sans-serif", 
        align: "center", 
        baseline: "bottom" 
    };

    var jsonLine = getJson(asterism);

    Celestial.add({type:"line", 
        callback: function(error, json) {
            if (error) return console.warn(error);
            // Load the geoJSON file and transform to correct coordinate system, if necessary
            var asterism = Celestial.getData(jsonLine, config.transform);

            // Add to celestial objects container in d3
            Celestial.container.selectAll(".asterisms")
                .data(asterism.features)
                .enter().append("path")
                .attr("class", "ast"); 
            // Trigger redraw to display changes
            Celestial.redraw();
        },
        redraw: function() {   
            // Select the added objects by class name as given previously
            Celestial.container.selectAll(".ast").each(function(d) {
            // Set line styles 
            Celestial.setStyle(lineStyle);
            // Project objects on map
            Celestial.map(d);
            // draw on canvas
            Celestial.context.fill();
            Celestial.context.stroke();
            
            // If point is visible (this doesn't work automatically for points)
            if (Celestial.clip(d.properties.loc)) {
                // get point coordinates
                pt = Celestial.mapProjection(d.properties.loc);
                // Set text styles       
                Celestial.setTextStyle(textStyle);
                // and draw text on canvas
                Celestial.context.fillText(d.properties.n, pt[0], pt[1]);
            }      
            })
        }
    });
    
    Celestial.display(config);
}

$( document ).ready(function() {
    if (document.getElementsByClassName('celestial-map').length>0){
        let asterism = document.getElementById('celestial-map').getAttribute("asterism");
        drawMap(asterism);
    }
});

// ver: https://github.com/ofrohn/d3-celestial/tree/master/data

// outras:
// https://www.npmjs.com/package/d3-celestial?activeTab=readme
// https://armchairastronautics.blogspot.com/2018/03/how-to-put-your-own-data-on-celestial.html