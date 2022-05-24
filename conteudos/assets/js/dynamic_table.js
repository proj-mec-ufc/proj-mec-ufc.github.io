///
function formatData(dataArray){
    let values = [];
    for(let i = 0; i < dataArray.length; i = i + 1 ) {
        let count = (dataArray[i].match(/,/g) || []).length; //find to count
        let tempValue = ""
        for (let x = 0; x <= count; x = x + 1){
            tempValue += dataArray[i].split(",")[x].trim();
            if (x<count)
                tempValue += ",";
        }
        values.push(tempValue);
    }
    return values;
}

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
    }
    return cols;
}

/// create tabulator
function createDynamicTable(dynamicTable, tableData, cols) {
    console.log(tableData);
    console.log(cols);

    tableData = Array.from(tableData);
    cols = Array.from(cols);
    
    if (dynamicTable.indexOf("#") == -1)
        dynamicTable = "#"+dynamicTable;

    cols = addTitleByField(cols);

    console.log(cols);
        
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
function createChart(chartObj, type="line", table, field, refField){
    let tableData = table.getData();
    let options = [];

    let data = {
        labels: [ selectField(tableData, refField) ],
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
        new Chartist.Bar(chartObj, data, null, responsiveOptions);
    }

}
