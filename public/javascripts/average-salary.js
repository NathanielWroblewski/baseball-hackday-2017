!function () {
var colors = {
  MIN: 'EC644B',
  CHW: 'D24D57',
  LAA: '96281B',
  NYY: 'DB0A5B',
  COL: 'F64747',
  STL: 'F1A9A0',
  CIN: '663399',
  SFG: '674172',
  CLE: 'AEA8D3',
  ARI: '913D88',
  TEX: '446CB3',
  OAK: 'E4F1FE',
  PHI: '4183D7',
  CHC: '59ABE3',
  HOU: '52B3D9',
  BAL: '4ECDC4',
  SDP: 'A2DED0',
  LAD: '87D37C',
  MIL: '26A65B',
  MIA: '66CC99',
  TBR: 'C8F7C5',
  SEA: 'F5D76E',
  DET: 'F7CA18',
  TOR: 'F4D03F',
  BOS: 'F2784B',
  PIT: 'EB974E',
  WSN: 'F9BF3B',
  ATL: '95A5A6',
  NYM: 'DADFE1',
  KCR: 'ECF0F1'
};

var svg = d3.select(".average-salary"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var format = d3.format(",d");

var pack = d3.pack()
    .size([width, height])
    .padding(1.5);

d3.csv("./public/datasets/players.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.id = d.name.replace(' ', '-')
    d.value = parseFloat(d.salary)
  })

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
      .style("fill", function(d) { return colors[d.data.team] });

  node.append("title")
      .text(function(d) { return `${d.data.name} - ${d.data.value}`; });
});
}();
