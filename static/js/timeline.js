Plotly.d3.csv('NSF_expenditures_time.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

  var AllSchools = unpack(rows, 'NSFName'),
    AllDisc = unpack(rows, 'AcademicDiscipline'),
    allYear = unpack(rows, 'Year'),
    TotalExp = unpack(rows, 'TotalRDExpenditures'),
    listofSchools = [],
    listofDisc = [],
    currentCountry,
    currentExp = [],
    currentYear = [],
    TotalExp = [];

  for (var i = 0; i < AllSchools.length; i++ ){
    if (listofSchools.indexOf(AllSchools[i]) === -1 ){
      listofSchools.push(AllSchools[i]);
    }
  }

  for (var i = 0; i < AllDisc.length; i++ ){
    if (listofDisc.indexOf(AllDisc[i]) === -1 ){
      listofDisc.push(AllDisc[i]);
    }
  }

  function getDiscData(chosenDisc) {
    for (var i = 0 ; i < AllDisc.length ; i++){
      if (  AllDisc[i] === chosenDisc ) {
      } 
    }
  };
  
  function getSchoolData(chosenSchool) {
    currentExp = [];
    currentYear = [];
    for (var i = 0 ; i < AllSchools.length ; i++){
      if (  AllSchools[i] === chosenSchool ) {
        currentExp.push(TotalExp[i]);
        currentYear.push(allYear[i]);
      } 
    }
  };

// Default Country Data
setBubblePlot('Northwestern University');
  
function setBubblePlot(chosenSchool) {
    getSchoolData(chosenSchool);  

    var trace1 = {
      x: currentYear,
      y: currentExp,
      mode: 'lines+markers',
      marker: {
        size: 12, 
        opacity: 0.5
      }
    };

    var data = [trace1];

    var layout = {
      title: 'Expenditures for <br>'+ chosenSchool
    };

    var options = {
      displayModeBar: false
    };

    Plotly.newPlot('plotdiv', data, layout,options);
};
  
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    schoolSelector = innerContainer.querySelector('.schooldata');
    discSelector = innerContainer.querySelector('.discdata');

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
    setBubblePlot(schoolSelector.value);
}
  
schoolSelector.addEventListener('change', updateSchool, false);
});