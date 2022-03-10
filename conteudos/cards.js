iterativeSVG('assets/svg/Ceara_map.svg', '#mapa', () => {
    
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

// Elementos iteretivos
iterativeSVG('assets/svg/regua.svg', '#regua', (raiz) => {
    let chosen = SVG('#regua').findOne('#chosen');
    chosen.x(chosen.parent().width()/2);
    let group = SVG('g#marks');
    let balls = group.find('circle')
    let marks = group.children();
    //let text = SVG('text#texto');
    let count = 0;
    let step = 10;
    marks.each(m => {
        let c = m.findOne('circle');
        //console.log(element.attr('id'));
        c.css("opacity",'0');

        let txt = m.text(count);
        txt.x(c.x());
        txt.y(c.y());
        txt.css('font-size','4px');

        count += step;

        let r = m.findOne('rect');
        r.on("mouseover", (el) => {
            c.css("opacity",'1');              
        });

        r.on("mouseout", (el) => {
            if(r.selected != true){
                c.css("opacity",'0'); 
            }             
        });

        r.on("click", (el) => {
            r.selected = true;
            c.css("opacity",'1');
            chosen.text(chosen.text()+" "+txt.text());           
        });

    });

});