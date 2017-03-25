var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var format = d3.format(",d");

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

d3.csv("./public/datasets/players.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.id = d.name.replace(' ', '-');
    d.value = parseFloat(d.war);
  });

  data = data.slice(0, 300);

  var root = d3.hierarchy({children: data})
      .sum(function(d) { return d.value; });

  var node = svg.selectAll(".node")
    .data(pack(root).leaves())
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
      .attr("id", function(d) { return d.id; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return d.data.team; });

  node.append("title")
      .text(function(d) { return `${d.data.name} - ${d.data.value}`; });
});