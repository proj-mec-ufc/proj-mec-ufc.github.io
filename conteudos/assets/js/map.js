function drawMap(){
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
    var jsonLine = {
        "type":"FeatureCollection",
        // this is an array, add as many objects as you want
        "features":[
            {"type":"Feature",
            "id":"SummerTriangle",
            "properties": {
                // Name
                "n":"Summer Triangle",
                // Location of name text on the map
                "loc": [-67.5, 52]
            }, "geometry":{
                // the line object as an array of point coordinates, 
                // always as [ra -180..180 degrees, dec -90..90 degrees]
                "type":"MultiLineString",
                "coordinates":[[ -3.731862, -38.526669
                /*[-80.7653, 38.7837],
                [-62.3042, 8.8683],
                [-49.642, 45.2803],
                [-80.7653, 38.7837]*/
                ]]
            }
            }  
        ]
    };

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