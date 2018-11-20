//bring in data
var all_data;
var tbody = d3.select("#tablerow");

// unpack  rows
function unpack(rows, key){
  return rows.map(function(row) {return row[key]; });
}

function tableNSF(NSFData){
  var tbody = d3.select("#tablerow");
  for(var i = 0; i < NSFData.length; i++){
    var row_data = NSFData[i];
    var row_html = tbody.append("tr");
    var cell1 = row_html.append("td");
    cell1.text(row_data.NSFName);
    var cell2 = row_html.append("td");
    cell2.text(row_data.UnitId);
    var cell3 = row_html.append("td");
    cell3.text(row_data.Year);
    var cell4 = row_html.append("td");
    cell4.text(row_data.AcademicDiscipline);
    var cell5 = row_html.append("td");
    cell5.text(row_data.TotalRDExpenditures);
  }
}
function filterUni(){
  // d3.event.preventDefault();
  var school = d3.select("#unifilter").property("value");
  var filteredData = all_data;
  if(school){
    filteredData = filteredData.filter(row => row.NSFName === school);
  };
//   return filteredData;
tbody.html("");


filteredData.forEach(function(UniData){
  var row = tbody.append("tr");

  Object.entries(UniData).forEach(function([key, value]) {
    var cell = tbody.append("td");
    cell.text(value);
  });
});
};
d3.selectAll("#clickbutton").on("click",filterUni);

function renderTableAndChart(){
  //2)  Do filtering
  var filtered_data = filterUni();
  // 3) Build table
  tableNSF(all_data);
//   // 4) Build chart
// //   buildChart(all_data);
};

//1) Download csv
d3.csv('NSF_expenditures_time.csv').then(function(NSFData){  
  all_data = NSFData;
  renderTableAndChart();
  // console.log(all_data);
});
