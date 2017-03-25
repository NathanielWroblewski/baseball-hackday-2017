var svg = d3.select("svg"),
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(2,2)"),
    format = d3.format(",d");

var pack = d3.pack()
    .size([diameter - 4, diameter - 4]);

d3.csv("./public/datasets/players.csv", function(error, root) {
  if (error) throw error;

  var table = d3.csvParse("./public/datasets/players.csv");

  root = d3.stratify()
      .id(function(d) { return d.name; })
      .parentid(function(d) { return d.team})
      (table);

  var node = g.selectAll(".node")
    .data(pack(root).descendants())
    .enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.name + "\n" + format(d.war); });

  node.append("circle")
      .attr("r", function(d) { return d.r; });

  node.filter(function(d) { return !d.children; }).append("text")
      .attr("dy", "0.3em")
      .text(function(d) { return d.name.substring(0, d.r / 3); });
});