Den.ApplicationController = Ember.Controller.extend({
 actions : {
	 create : function(){
	 	var width = 960,
	    height = 1200;

		var cluster = d3.layout.cluster()
		    .size([height, width - 160]);

		var diagonal = d3.svg.diagonal()
		    .projection(function(d) { return [d.y, d.x]; });

		var svg = d3.select("body").select(".ember-view").select("svg")
		    .attr("width", width)
		    .attr("height", height)
		  .append("g")
		    .attr("transform", "translate(40, 0)");

		var _this = this;

		d3.json("javascripts/sampleDefinition.json", function(error, root) {
			root = _this.changeNode(root);

			var nodes = cluster.nodes(root),
			    links = cluster.links(nodes);

			var link = svg.selectAll(".link");
			var link = svg.selectAll(".link")
			  .data(links)
			  .enter().append("path")
			  .attr("class", "link")
			  .attr("d", diagonal);

			var node = svg.selectAll(".node")
			  .data(nodes)
			  .enter().append("g")
			  .attr("class", "node")
			  .attr("transform", function(d) { 
			  	return "translate(" + d.y + "," + d.x + ")"; 
			  })

			node.append("circle")
			  .attr("r", 4.5);

			var restSize = 170;
		    node.append("svg:rect")
			    .attr("rx", 15)
			    .attr("ry", 15)
			    .attr("x", - restSize/2)
			    .attr("y", - restSize/2)
			    .attr("fill", "grey")
			    .attr("width", function(d){
			    	return (d.stc_company) ? 0 : restSize;
			    })
			    .attr("height", function(d){
			    	return (d.stc_company) ? 0 : restSize;
			    })

		    node.append("image")
		      .attr("xlink:href", function(d){
		      	return d.stc_picture;
		      })
		      .attr("x", - restSize/4)
		      .attr("y", - restSize/4)
		      .attr("width", 100)
		      .attr("height", 100);

			node.append("text")
			  .attr("dx", function(d) { 
			  	return d.stc_employees ? -8 : 8; 
			  })
			  .attr("dy", 3)
			  .attr("x", function(d){
			  	return (d.stc_company) ? -20 : -60;
			  })
			  .attr("y", function(d){
			  	return (d.stc_company) ? -10 : -70;
			  })
			  .attr("fill", function(d){
			  	return (d.stc_company) ? "black" : "white";
			  })
			  .style("text-anchor", function(d) { 
			  	return d.stc_employees ? "end" : "start"; 
			  })
			  .text(function(d) {
			  	return (d.stc_company) ? d.stc_company : (d.stc_name) ? d.stc_name : ""; 
  			  });

			node.append("text")
			  .attr("dy", 3)
			  .attr("x", -80)
			  .attr("y", 70)
			  .attr("fill", "white")
			  .text(function(d) {
			  	return "role : " + (d.stc_role) ? d.stc_role : "";
			  });
		});

		d3.select(self.frameElement).style("height", height + "px");
	 }
  },

  changeNode : function(node){
  	for (var key in node) {
  		if (node[key] instanceof Array) {
  			node.children = node[key];
  			node.children.NodeName = key;
  			this.changeNode(node[key]);
  			delete node[key];
  		};
	}
  	return node;
  } 
});