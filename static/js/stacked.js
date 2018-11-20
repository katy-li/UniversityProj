/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */

// var labels = ['Avg_Tuitionfee_In', 'Avg_Tuitionfee_Out']

// var data = Plotly.d3.csv('bubble.csv',  (err, rows) => {

//     var trace1{
//         type: 'bar',
//         name: 'in_tuition',
//         x: data.map(r => r.State),
//         y: data.map(r => r.Avg_Tuitionfee_In)
//       };
//     var trace2{
//         type:'bar',
//         name:'out_tuition',
//         x: data.map(r => r.State),
//         y: data.map(r=> r.Avg_Tuitionfee_Out)
//     };
// });
// var data1 = [trace1, trace2];
// var layout = {barmode: 'stack'};
// Plotly.newPlot('myDiv', data, layout);
// });


// // Create the Traces
// var data = Plotly.d3.csv('bubble.csv')
// console.log(data)

// var trace1 = {
//     x: data.State,
//     y: data.Avg_Tuitionfee_In,
//     mode: "markers",
//     type: "bar",
//     name: "in_tuition"
//   };
  
// var trace2 = {
//     x: data.State,
//     y: data.Avg_Tuitionfee_Out,
//     mode: "markers",
//     type: "bar",
//     name: "out_tuition"
//   };

//   // Create the data array for the plot
//   var data1 = [trace1, trace2];
  
//   // Define the plot layout
//   var layout = 
//     {barmode: 'stack'};
  
//   // Plot the chart to a div tag with id "plot"
//   Plotly.newPlot("myDiv", data1, layout);
  
var trace1 = {
    x: ['CA', 'NY', 'IL','FL','HI'],
    y: [28360, 27239, 26307,17919,11983],
    name: 'Avg In State Tuition',
    type: 'bar'
  };
  
  var trace2 = {
    x: ['CA', 'NY', 'IL','FL','HI'],
    y: [34175, 30574, 28696,23264,20731],
    name: 'Avg Out of State',
    type: 'bar'
  };

  var trace3 = {
  x: ['CA', 'NY', 'IL','FL','HI'],
  y: [16928, 17235, 17820, 14314,11250],
  mode: 'markers+lines',
  type: 'scatter',
  name:'Avg Debt'
};



var data = [trace1, trace2, trace3];
  
Plotly.newPlot('myDiv', data);