var chosenDisc;
var chosenSchool;

Plotly.d3.csv('data/NSF_expenditures_filtered.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

  var AllSchools = unpack(rows, 'NSFName'),
    AllDisc = unpack(rows, 'AcademicDiscipline'),
    allYear = unpack(rows, 'Year'),
    TotalExp = unpack(rows, 'TotalRDExpenditures'),
    AllSchools = unpack(rows, 'NSFName'),
    listofSchools = [],
    listofDisc = [],
    currentSchool,
    currentExp = [],
    currentYear = [],
    chosenSchoolList = [],
    schoolDisc = [],
    finalExp = [],
    finalYear = [];

  for (var i = 0; i < AllSchools.length; i++ ){
    if (listofSchools.indexOf(AllSchools[i]) === -1 ){
      listofSchools.push(AllSchools[i]);
    }
  }

  // function getDiscData(chosenDisc) {
  //   for (var i = 0 ; i < AllDisc.length ; i++){
  //     if (  AllDisc[i] === chosenDisc ) {
  //     } 
  //   }
  // };

for (var i = 0; i < AllDisc.length; i++ ){
    if (listofDisc.indexOf(AllDisc[i]) === -1 ){
      listofDisc.push(AllDisc[i]);
    }
  }
  
  function getSchoolData(chosenSchool) {
    var listofDisc = [];
    currentExp = [];
    currentYear = [];
    for (var i = 0 ; i < AllSchools.length ; i++){
      if (  AllSchools[i] === chosenSchool && chosenDisc) {
        chosenSchoolList.push(AllSchools[i]);
        schoolDisc.push(AllDisc[i]);
        currentExp.push(TotalExp[i]);
        currentYear.push(allYear[i]);  
      }
    }
  };
function getDiscData(chosenDisc) {
  var FinalExp = [];
  FinalYear = [];
  for (var i = 0; i < chosenSchoolList.length; i++ ){
    if (schoolDisc[i] === chosenDisc){
      finalExp.push(currentExp[i]);
      finalYear.push(currentYear[i]);
    }
  }
  console.log(FinalExp);
};

// Default Country Data
setBubblePlot('select your school');
function setBubblePlot() {
    getSchoolData(chosenSchool);
    getDiscData(chosenDisc); 

    var trace1 = {
      x: finalYear,
      y: finalExp,
      mode: 'lines+markers',
      marker: {
        size: 12, 
        opacity: 0.5
      }
    };

    var data = [trace1];

    var layout = {
      title: 'Expenditures for <br>'+ chosenSchool +' in ' + chosenDisc,
      xaxis: {
        range: [2003,2018],
        dtick: 1,
        title: "Year"
      },
      // yaxis: {
      //   scaleanchor: "x",
      //   title: "Expenditures"}
    };

    var options = {
      displayModeBar: false
    };
    Plotly.newPlot('plotdiv', data, layout, options);
    // Plotly.react('plotdiv', data, layout, options);
};

function deleteTrace(divId){
  Plotly.deleteTraces('plotdiv');
  var chosenDisc = [];
};


  
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    schoolSelector = innerContainer.querySelector('.schooldata');
    discSelector = innerContainer.querySelector('.discdata');
    // button = innerContainer.querySelector('.delete');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}

assignOptions(listofSchools, schoolSelector);
assignOptions(listofDisc, discSelector);

function updateSchool(){
  chosenSchool = schoolSelector.value;
  setBubblePlot();
}
function updateDisc(){
  chosenDisc = discSelector.value;
  setBubblePlot();
}
  
schoolSelector.addEventListener('change', updateSchool, false);
discSelector.addEventListener('change', updateDisc, false);
// button.addEventListener('delete', button);

});