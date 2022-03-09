///return line number
function getLine(value,field,correctValues) {
    for(var i=0; i<correctValues.length; i++){
        if(correctValues[i][field]==value)
            return i
    }
    return -1;
};

///verify if table is full filled
function verify(tableData,field) {
    let count = 0;
    for(var i=0; i<tableData.length; i++){
        //if content is number
        let value = tableData[i][field];
        if (!(value===""))
            if (!isNaN(parseInt(value, 10))) 
                count++;
    }
    if (count == tableData.length)
        return true;
    else
        return false;
};

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
        //cols[i]["editor"] = "cellEdited";
        //cols[i]["editorParams"] = editorParams;
    }
    return cols;
}

/// create tabulator
function createDynamicTable(dynamicTable, tableData, cols) {
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

function createChart(chartObj, type="line", table, field, refField){
    let tableData = table.getData();
    //let filled = verify(tableData,field);
    let options = [];

    // show if editable fields are/arent full filed
    //if (filled){
        var data = {
            labels: [ selectField(tableData, refField) ],
            series: [ selectField(tableData, field) ]
        };
        var responsiveOptions = [
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
                },
                axisY: {
                    offset: 60
                }
            };
            new Chartist.Line(chartObj, data, options, responsiveOptions);
        }
        else {
            new Chartist.Bar(chartObj, data, null, responsiveOptions);
        }
    //}
}
