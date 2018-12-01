var data = Plotly.d3.csv('/data/Tuition.csv', function(err, rows){
   function unpack(rows, key) {
       return rows.map(function(row) { return row[key]; });
   }
    var states = unpack(rows, 'State'),
    Avg_Tuitionfee_In = unpack(rows, 'Avg_Tuitionfee_In'),
    Avg_Tuitionfee_Out = unpack(rows, 'Avg_Tuitionfee_Out'),
    Avg_Debt_Mdn = unpack(rows, 'Avg_Debt_Mdn')
console.log(Avg_Tuitionfee_In)
var labels = ['Avg_Tuitionfee_In', 'Avg_Tuitionfee_Out']

// var data = Plotly.d3.csv('/data/Tuition.csv',function(err, rows){
//   function unpack(rows, key) {
//       return rows.map(function(row) { return row[key]; });
//   }
    var trace1 ={
        type: 'bar',
        name: 'In State Tuition',
        x: states,
        y: Avg_Tuitionfee_In,
        mode: 'markers',
        marker: {
          color: 'rgb(47,151,119)'
        }
    };
    var trace2 = {
      type:'bar',
      name:'Out of State Tuition',
      x: states,
      y: Avg_Tuitionfee_Out,
      mode: 'markers',
        marker: {
        color: 'rgb(96,120,186)'
        }
    };
    var trace3 ={
      type:'line',
      name: 'Avg Debt',
      x: states,
      y: Avg_Debt_Mdn,
      marker: {
        color: 'rgb(189,74,102)',
        size: 8
      },
      line: {
        color: 'rgb(189,74,102)',
        width: 4
      }
    }
    data1 = [trace1, trace2,trace3];
    var options = {
      displayModeBar: false
    };
    var layout = {barmode: 'stack'};
    Plotly.newPlot('myDiv', data1, layout,options);
  });


