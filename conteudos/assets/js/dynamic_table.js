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
    //let line = values[row].split(",");
    let value = getValue(values,row,col);
    if(value==digited)
        return true;
    else{
        if ((value=='0')&&(digited==''))
            return true;
    }
    // if(line[col].trim().replace(/'/g,"")==digited)
    //     return true;
    // else{
    //     if ((line[col].trim().replace(/'/g,"")=='0')&&(digited==''))
    //         return true;
    // }
    return false;
};

// function getLine(value,field,correctValues) {
//     for(var i=0; i<correctValues.length; i++){
//         let correct = correctValues[i].split(",");

//         console.log(value);
//         console.log(field);
//         console.log(correctValues);

//         console.log(correct[field].trim().replace(/'/g,""));
        
//         if(correct[field].trim().replace(/'/g,"")==value){
//             console.log(i,"acertou");
//             return i;
//         }
//         console.log(i,correct);
//     }
//     return -1;
// };

function getColumnIndex(tableData,field){
    let i=0;
    for (const [key, value] of Object.entries(tableData[0])) {
        if(key==field)
            return i;
        i++;
    }
    return -1;
}

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
function createChart(chartObj, type="line", tableData) { //, field, refField){
    tableData = tableData.getData();
    let options = [];

    let data = {
        labels: [ selectField(tableData) ], //, refField) ],
        series: [ selectField(tableData) ] //, field) ]
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
