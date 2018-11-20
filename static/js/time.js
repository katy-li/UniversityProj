//if window is resized, this function is called
d3.select(window).on("resize", makeResponsive);

makeResponsive();

// reference other files to find time series
function makeResponsive() {

  //create SVG area
  var svgArea = d3.select("body").select("svg");
  
  //clear svg area
  if(!svgArea.empty()) {
    svgArea.remove();
  }

  //wrapper dimensions
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
  };

  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

  //append SVG element
  var svg = d3.select(".scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  //append group element
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //read csv
  d3.csv("NSF_expenditures_nu.csv").then(function(NSFData){

    //create data parser
    var dataParser = d3.timeParse("%Y");

    //parse data
    NSFData.forEach(function(data) {
      data.Year = dataParser(data.Year);
      data.TotalRDExpenditures = +data.TotalRDExpenditures;
    });

    //create scales
    var xTimeScale = d3.scaleTime()
    .domain(d3.extent(NSFData, d => d.Year))
    .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(NSFData, d => d.TotalRDExpenditures)])
    .range([height, 0]);


    //create axes
    var xAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
    var yAxis = d3.axisLeft(yLinearScale).ticks(10);
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    chartGroup.append("g")
    .call(yAxis);

    //line generator
    var line = d3.line()
    .x(d => xTimeScale(d.Year))
    .y(d => yLinearScale(d.TotalRDExpenditures));

    //append line
    chartGroup.append("path")
    .data([NSFData])
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "red");

    //append circles
    var circleGroup = chartGroup.selectAll("scatter")
    .data(NSFData)
    .enter()
    .append("scatter")
    .attr("cx", d=> xTimeScale(d.Year))
    .attr("cy", d=> yLinearScale(d.TotalRDExpenditures))
    .attr("fill", "gold")
    .attr("stroke-width", "1")
    .attr("stroke", "black");

    // //format year
    // var toolTip = d3.toolTip()
    // .attr("class", "tooltip")
    // .offset([80,-60])
    // .html(function(d){
    //   return(`<strong&{dateFormatter(d.Year)}<strong><<hr>${d.TotalRDExpenditures}
    //   Total Expenditures`)
    // })

    // // create tooltip in chartGroup
    // chartGroup.call(toolTip)

    // //mouseover event listener
    // circleGroup.on("mouseover", function(d){
    //   toolTip.show(d)
    // })

    // //mouseout event listender
    // .on("mouseout", function(d){
    //   toolTip.hide(d)
    // });
  });
}
