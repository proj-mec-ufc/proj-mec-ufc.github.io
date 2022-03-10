    // Elementos iteretivos
    iterativeSVG('../conteudos/assets/svg/Ceara_map.svg', '#mapa', () => {
        /* let groups = SVG('#contar').find('g')
        groups.each(element => {
            console.log(element.attr('id'));
            element.on("mouseover", (e) => {
                //console.log(element);
                element.each((f, c) => {
                    console.log(c.id())
                    c.css({
                        fill: '#f25b47'
                    })
                });
            });
            element.on("mouseout", (e) => {
                //console.log(element);
                element.each((f, c) => {
                    console.log(c.id())
                    c.css({
                        fill: '#8c8c8c'
                    })
                });
            });
        }); */
    });

    // Graficos e tabelas
    //define some sample data
    var tabledata = [{
            id: 1,
            municipio: "Caucaia",
            distancia: "17",
            area: "1228",
            populacao: "361400"
        },
        {
            id: 3,
            municipio: "Sobral",
            distancia: "240",
            area: "2068",
            populacao: "210711"
        },
        {
            id: 4,
            municipio: "Quixeramobim",
            distancia: "203",
            area: "3275",
            populacao: "85565"
        },
        {
            id: 2,
            municipio: "Maranguape",
            distancia: "27",
            area: "591",
            populacao: "126486"
        },
    ];

    //create Tabulator on DOM element with id "example-table"
    var table = new Tabulator("#cidades-table", {
        //height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: tabledata, //assign data to table
        layout: "fitColumns", //fit columns to width of table (optional)
        columns: [ //Define Table Columns
            {
                title: "Município",
                field: "municipio",
                width: 150
            },
            {
                title: "Distância a Fortaleza (em quilômetros)",
                field: "distancia"
            },
            {
                title: "Área (em quilômetros quadrados)",
                field: "area"
            },
            {
                title: "População (número de habitantes em 2021)",
                field: "populacao"
            },
        ],
    });

    //trigger an alert message when the row is clicked
    /* table.on("rowClick", function(e, row){ 
        alert("Row " + row.getData().id + " Clicked!!!!");
        SVG('[muni="' + row.getData().id + '"]').css({ fill: '#f06' });
    }); */

    table.on("rowMouseOver", function (e, row) {
        //e - the event object
        //row - row component
        SVG('[muni="' + row.getData().id + '"]').css({
            fill: '#f06'
        });
        SVG('[cami="' + row.getData().id + '"]').css('stroke-width', '1565.000px');
    });

    table.on("rowMouseOut", function (e, row) {
        //e - the event object
        //row - row component
        SVG('[muni="' + row.getData().id + '"]').css({
            fill: '#0009f8ff'
        });
        SVG('[cami="' + row.getData().id + '"]').css('stroke-width', '264.583px');
    });