///
function formatColsData(dataArray){
    let values = [];
    for (let i = 0; i < dataArray.length; i = i + 1 ) {
        let line = dataArray[i].split(",");
        let ht = {};
        let strField1,strField2;

        for (let x = 0; x < line.length; x = x + 1){
            let pos0 = line[x].indexOf(":");
            let pos1 = line[x].indexOf("'")+1;
            let pos2 = (x==0)? line[x].length-1 : line[x].indexOf("'",pos1);
            strField1 = line[x].substring(0,pos0).trim();
            strField2 = line[x].substring(pos1,pos2).trim();
              
            ht[strField1] = strField2;
        }
        values.push(ht);
    }
    return values;
}
///
function formatValues(dataArray){
    let values = [];
    for (let i = 0; i < dataArray.length; i = i + 1 ) {
        let line = dataArray[i].split(",");
        let strField = "";

        for (let x = 0; x < line.length; x = x + 1){
            strField += line[x].trim();
            if (x<line.length-1)
                strField += ", "
        }
        values.push(strField)
    }
    return values;
}

///
function getValue(values,row,col) {
    let line = values[row].split(",");
    return line[col].trim().replace(/'/g,"");
};

///
function verifyAnswer(values,row,col,digited) {
    let value = getValue(values,row,col);
    if(value==digited)
        return true;
    else{
        if ((value=='0')&&(digited==''))
            return true;
    }
    return false;
};

function getColumnIndex(tableData,field){
    let i=0;
    for (const [key, value] of Object.entries(tableData[0])) {
        if(key==field)
            return i;
        i++;
    }
    return -1;
}

///return selected field
function selectField(tableData,field) {
    let newData = [];
    for(var i=0; i<tableData.length; i++)
        newData.push(tableData[i][field]); 
    return newData;
};

///add title and sorter
function addTitleByField(cols){ //, editorParams){
    for (let i=0; i<cols.length; i++){
        cols[i]["title"] = cols[i]["field"];
        cols[i]["sorter"] = "string";
    }
    return cols;
}

/// create tabulator
function createDynamicTable(dynamicTable, tableData, cols) {
    if (dynamicTable.indexOf("#") == -1)
        dynamicTable = "#" + dynamicTable;

    cols = addTitleByField(cols);

    var table = new Tabulator( dynamicTable , {
        data: tableData,
        layout:"fitColumns",
        columns: cols,
        ajaxConfig: {
            method:"post",
            headers: {
                "Content-type": 'application/json; charset=utf-8',
            },
        },
    });
    return table;
};

/// create chart
function createChart(chartObj, type="line", tableData, field) {
    tableData = tableData.getData();
    let options = [];
    let data = {
        labels: [ selectField(tableData, field) ],
        series: [ selectField(tableData, field) ]
    };
    let responsiveOptions = [
        ['screen and (min-width: 321px) and (max-width: 800px)', {
            seriesBarDistance: 8, //10,
            axisX: {
            labelInterpolationFnc: function (value) {
                return value;
            }
            }
        }],
        ['screen and (max-width: 320px)', {
            seriesBarDistance: 4, //5,
            axisX: {
            labelInterpolationFnc: function (value) {
                return value[0];
            }
            }
        }]
    ];

    if (type=='line'){
        options = {
            showPoint: true,
            lineSmooth: false,
            axisX: {
                showGrid: true,
                showLabel: true
            }
        };
        new Chartist.Line(chartObj, data, options, responsiveOptions);
    }
    else {
        options = {
            axisX: {
                labelInterpolationFnc: function(value, index) {
                    return index % 2 === 0 ? value : null;
                }
            }
        };
        new Chartist.Bar(chartObj, data, options, responsiveOptions);
    }

}

$( document ).ready(function() {
    let tableData = {}, values={}, tab = {};

    document.querySelectorAll('.dynamic_table').forEach(
        (element, index, array) => {
            let id = element.getAttribute("id");
            fieldsArray = element.getAttribute("columnFields");
            colsArray = fieldsArray.replace(/title/g,"field").split(";");
            let expectedValues = element.getAttribute("expectedValues").split(";");

            let colsData = formatColsData(colsArray);
            values[id] = formatValues(expectedValues);

            tableData[id] = [];
            let countLines = values[id].length;
            let refCol = "";
            let refValue = "";
            for (let i = 0; i < countLines; i = i + 1 ) {
                let ht = {};
                refValue = values[id][i].split(",");
                if (i==0)
                    refCol = colsData[0]["field"];
                for (let x = 0; x < colsData.length; x = x + 1){
                    var hashKey = Object.keys(colsData[x])["field"];
                    hashValue = (x==0) ? refValue[x].trim().replace(/'/g,"") : "";
                    ht[colsData[x]["field"]] = hashValue;
                }
                tableData[id].push(ht);
            }

            tab[id] = createDynamicTable( id, tableData[id], colsData );
            tab[id].on("cellEdited", function(cell){
                let row = cell.getRow();
                let field = cell.getColumn().getField();
                let digitedValue = row.getData()[field];

                let colIndex = getColumnIndex(tableData[id],field);
                let rowIndex = cell.getRow().getPosition();

                let answer = verifyAnswer(values[id], rowIndex, colIndex, digitedValue);

                let correct_color = element.getAttribute("correctColor");
                if (answer)
                    cell.getElement().style.backgroundColor = correct_color;
                else
                    cell.getElement().style.backgroundColor = "";

                if (element.getAttribute("graph")=="on")
                    createChart("#"+element.getAttribute("graphId"), element.getAttribute("graphType"), 
                                tab[id], element.getAttribute("graphField") );
            });

            if (element.getAttribute("graph")=="on")
                createChart("#"+element.getAttribute("graphId"), element.getAttribute("graphType"), 
                            tab[id], element.getAttribute("graphField") );
        }
    );

});
