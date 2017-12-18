var xmlHttpSearch;
var searchTxt;
function searchSplit(word, page){
	xmlHttpSearch = new GetXmlHttpObject();
	if (xmlHttpSearch == null) {
		alert("Browser does not support HTTP Request");
		return;
	}
	searchTxt = word;
	var url = "src/index_search.php";
	url = url + "?search=" + word;
	url = url + "&page=" + page;
	url = url + "&sid=" + Math.random();
	console.log(url);
	xmlHttpSearch.onreadystatechange = searchCompleted;
	xmlHttpSearch.open("GET", url, true);
	xmlHttpSearch.send(null);
}


function GetXmlHttpObject() {
	var xmlHttptmp = null;

	try {
		// Firefox, Opera 8.0+, Safari
		xmlHttptmp = new XMLHttpRequest();
	} catch (e) {
		// Internet Explorer
		try {
			xmlHttptmp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xmlHttptmp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttptmp;
}

function ajax_search(word) {
	$("#fountainG").css("display","block");
	var page = 1;
	console.log(word);
	searchSplit(word, page);
}

function searchCompleted() {
	if (xmlHttpSearch.readyState == 4 || xmlHttpSearch.readyState == "complete") {
		var init = xmlHttpSearch.responseText;
		var response = eval("(" + xmlHttpSearch.responseText + ")");
		console.log("response");
		console.log(response);
		var total = response.total;
		var pageCount = response.pageCount;
		var pageIndex = response.pageIndex;
		var videos = response.result;
		var videosCnt = videos.length;
		//console.log(total);

		var nextPage = (pageCount>0 && pageIndex<pageCount)? (parseInt(pageIndex)+1) : 0;
		var prePage = (pageCount>0 && pageIndex>0)?(parseInt(pageIndex)-1) : 0;
		// console.log("pageCount : " + pageCount + " | pageIndex : " + pageIndex + " | nextPage : " + nextPage + " | prePage : " + prePage);

		var hasPre = pageIndex!= 1;
		var hasNext = pageIndex!=pageCount;
		//console.log(videos)
		if (total>0){
			$("#searchinfo").text(total + " results for \"" + searchTxt + "\"");
		}
		else{
			$("#searchinfo").text("Sorry, your search yielded no results.");
		}
		for(i=0;i<10;i++){
            $("#videolist").append( "<div class='video' id='"+ videos[i].videoId +"'><div class='col-md-3 poster'><img src='img/"+videos[i].videoId+".jpg'></div><div class='col-md-9 videoinfo'><p class='title'>"+videos[i].title+"</p><p class='abstract'>"+videos[i].description+"</p><p class='time'>"+time_To_hhmmss(parseInt(videos[i].duration))+"</p></div></div>");
			$(".video").css("margin-bottom","10px");
		}

		var docs= [];
 
        for(i=0;i<videosCnt;i++){
  			docs_temp = {};
  			docs_temp["title"] = videos[i].title;
  			docs_temp["snippet"] = videos[i].description;
  			docs_temp["url"] = videos[i].videoId;
  			docs_temp["author"]=videos[i].author;
  			docs_temp["publishedTime"]=videos[i].publishedTime;
  			docs.push(docs_temp);
		}

		var DoubleClusterResult = run(docs);
		console.log("DoubleClusterResult");
		console.log(DoubleClusterResult);

		$(".video").click(function(){
			videoId = $(this).attr("id");
			var url = "video.php?id=" + encodeURIComponent(videoId);
        	window.open(url);
		})
	}
}
// function ()
function run(docs) {
	// body...
	var doubleClusterResult;
	var result = [];
		var clusterResult={};
	var pResult=carrot(docs);
	for (var i = 0; i < pResult.clusters.length; i++) {
           resultTemp={};
           resultTemp["pName"]=pResult.clusters[i].phrases;
           resultTemp["pDocIndexs"]=pResult.clusters[i].documents;
           resultTemp["cResult"]=[];
           //子类聚类
           var cdocs=[];
           for(var j=0;j<resultTemp["pDocIndexs"].length;j++){
           	   cdocsTemp={};
           	   cdocsTemp["title"]=docs[parseInt(resultTemp["pDocIndexs"][j])]["title"];
           	   cdocsTemp["snippet"]=docs[parseInt(resultTemp["pDocIndexs"][j])]["snippet"];
           	   cdocsTemp["url"]=docs[parseInt(resultTemp["pDocIndexs"][j])]["url"];
           	   cdocsTemp["index"]=resultTemp["pDocIndexs"][j];//记录子类索引与父类索引的对应关系
           	   cdocs.push(cdocsTemp);
           }
           var cdata=carrot(cdocs);
           for(var k=0;k<cdata.clusters.length;k++){
               	temp={};
               	temp["cName"]=cdata.clusters[k].phrases;
               	temp["cDocIndexs"]=[];
               	for(var m=0;m<cdata.clusters[k].documents.length;m++){
               		var id=cdocs[parseInt(cdata.clusters[k].documents[m])]["index"];
               		temp["cDocIndexs"].push(id);
               	}
               	resultTemp["cResult"].push(temp);
           }
           result.push(resultTemp);

      }
     clusterResult.docs=docs;
     clusterResult.cluster=result;
     doubleClusterResult=clusterResult;
  	 return doubleClusterResult;
}




function carrot(docs){
		  var reponse;
          var xml = "<searchresult>";
          for (var i = 0; i < docs.length; i++) {
            xml += carrot2XmlDoc(docs[i].title, docs[i].snippet, docs[i].url);
          }
          xml += "</searchresult>";
          
          // Make a POST request. Here we'll submit the documents XML we 
          // created above. We'll use the JSON-P response format
          // to avoid same-origin-domain restrictions. The downside of JSON-P
          // is that we won't be able to catch errors.
          $.support.cors = true;
          $.ajax({
            
            // The URL at which the DCS service is running
            url: "http://localhost:8080/dcs/rest",
            
            type: "post",
            
            dataType: "json",
            
            async:false,
            // Request parameters
            data: {
              "dcs.c2stream": xml,              
              "dcs.output.format": "JSON"
            },

            // Show the results when request is complete
            success: function (data) {
            	  response=data;
	              
            },
            
            // Show errors            
            error: function(jqXHR, textStatus, errorThrown) {
                 alert(text("Request failed. Possible causes: DCS service not available, " +
                      "cross-domain restriction."));
            },
           
            complete: function() {
              // $button.attr("disabled", false);
             
            }
          });
          return response;
          // Formats XML for one document in Carrot2 format
          function carrot2XmlDoc(title, snippet, url) {
            return "<document><title>" + escape(title) + "</title><snippet>" + escape(snippet) + "</snippet><url>" + escape(url) + "</url></document>";
            
            function escape(s) {
              return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
          }
}





// function carrot(docs){

// 	     // console.log(docs)
//           // var $button = $(this),
//           var $result = $("#cluster");
          
//           // Disable the button for the duration of the query
//           // $button.attr("disabled", true);
          
//           // Show that content is loading
//           $result.text("Loading...").show(100);
          
//           // Before we make the request, we need to convert the documents
//           // to the XML format required by the DCS.
//           var xml = "<searchresult>";
//           for (var i = 0; i < docs.length; i++) {
//             xml += carrot2XmlDoc(docs[i].title, docs[i].snippet, docs[i].url);
//           }
//           xml += "</searchresult>";
          
//           // Make a POST request. Here we'll submit the documents XML we 
//           // created above. We'll use the JSON-P response format
//           // to avoid same-origin-domain restrictions. The downside of JSON-P
//           // is that we won't be able to catch errors.
//           //new
//           var docs2= [];
           

//           $.support.cors = true;
//           $.ajax({
            
//             // The URL at which the DCS service is running
//             url: "http://localhost:8080/dcs/rest",
            
//             type: "post",
            
//             dataType: "json",
            
//             // Request parameters
//             data: {
//               "dcs.c2stream": xml,              
//               "dcs.output.format": "JSON"
//             },

			

//             // Show the results when request is complete
//             success: function (data) {
//               $result.empty();
              
//               $("<div />").text(data.documents.length + " documents processed, " +
//                                 data.clusters.length + " clusters created:")
//                           .appendTo($result);
             
//               console.log("data");
//               console.log(data);
//               var $list = $("<ul />");
//               for (var i = 0; i < data.clusters.length; i++) {
//                 var cluster = data.clusters[i];
//                 $("<li />").text(cluster.phrases[0] + " (" + cluster.size + ")" ).appendTo($list);
//                 docs_temp2 = {}
// 				docs_temp2["title"] = data.clusters[i].phrases[0];
// 				docs_temp2["yinshe"]= i;
// 				// cluster.phrases[0];
// 				docs_temp2["size"] = cluster.size;
// 				// videoinfo_temp["cluster"] = stedata_clur[i].title;
// 				// videoinfo_temp["duration(min)"] = data_cluster[i].size;
// 				docs_temp2["shotCount"] = Math.floor((Math.random() * 1000) + 1);
// 				docs_temp2["viewcnt"] = Math.floor((Math.random() * 1000) + 1);
// 				docs_temp2["year"] = Math.floor((Math.random() * 10) + 2005);
// 				// docs_temp["url"] = videos[i].videoId; // 后面可加内容
// 				docs2.push(docs_temp2)
//               }
//               $list.appendTo($result);
//               console.log("docs2");
//          	  console.log(docs2);
//           	  // return docs2;
//           	  parallel_co(docs2);
              
              
//             },
            
//             // Show errors            
//             error: function(jqXHR, textStatus, errorThrown) {
//               $result.text("Request failed. Possible causes: DCS service not available, " +
//                       "cross-domain restriction.");
//             },
            
//             complete: function() {
//               // $button.attr("disabled", false);
//             }
          		
//           });
          
//           // Formats XML for one document in Carrot2 format
//           function carrot2XmlDoc(title, snippet, url) {
//             return "<document><title>" + escape(title) + "</title><snippet>" + escape(snippet) + "</snippet><url>" + escape(url) + "</url></document>";
            
//             function escape(s) {
//               return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
//             }
//           }
//          console.log("docs2");
//          	  console.log(docs2);

// }


function parallel_co(videoinfo){
	// $("#parallel").text("hello")
	var colors = {
	 
	  "2005": [229, 93, 135],
	  "2006": [200, 115, 155],
	  "2007": [209, 108, 148],
	  "2008": [217, 103, 144],
	  "2009": [221, 100, 141],
 	  "2010": [95, 195, 228],
	  "2011": [107, 187, 220],
	  "2012": [129, 169, 204],
	  "2013": [156, 148, 185],
	  "2014": [177, 133, 172],
	  "2015": [190, 122, 161]
	  // "80": [229, 93, 135],
	  // "81": [240,85,130],
	  // "82": [250,72,123]
	};
	// var colors = {
	//   "70": [255, 255, 204],
	//   "71": [238, 248, 198],
	//   "72": [218, 242, 194],
	//   "73": [199, 239, 195],
	//   "74": [193, 242, 230],
	//   "75": [194, 229, 242],
	//   "76": [192, 217, 240],
	//   "77": [191, 202, 238],
	//   "78": [196, 190, 237],
	//   "79": [217, 189, 236],
	//   "80": [241, 193, 236],
	//   "81": [247, 198, 219],
	//   "82": [255, 204, 204]
	// };

	// videoinfo = videoinfo.map(function(d) { return [ +d["x-coordinate"], +d["y-coordinate"] ]; });
	var margin = {top: 30, right: 10, bottom: 10, left: 10},
    width = 560 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

   	var x = d3.scale.ordinal().rangePoints([0, width], 1),
	    y = {};

	var line = d3.svg.line(),
	    axis = d3.svg.axis().orient("left"),
	    background,
	    foreground;

	var svg = d3.select("#parallel").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  	.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// d3.csv("js/cars.csv", function(error, cars) {
		console.log("videoinfo");
		console.log(videoinfo);
		console.log("videoinfo[0]");
		console.log(videoinfo[0]);
		console.log("videoinfo[0]");
		// cars = videoinfo
	  // Extract the list of dimensions and create a scale for each.
	  // x.domain(dimensions = d3.keys(videoinfo[0]).filter(function(d) {
	  //   return d != "name" && (y[d] = d3.scale.linear()
	  //       .domain(d3.extent(videoinfo, function(p) { return +p[d]; }))
	  //       .range([height, 0]));
	  // }));
	  x.domain(dimensions = d3.keys(videoinfo[0]).filter(function(d) {
	    return   d != "title" &&(y[d] = d3.scale.linear()
	        .domain(d3.extent(videoinfo, function(p) {
	        return +p[d]; 
	    }))
	        .range([height, 0]));
	  }));




	  // Add grey background lines for context.
	  background = svg.append("g")
	      .attr("class", "background")
	    .selectAll("path")
	      .data(videoinfo)
	    .enter().append("path")
	      .attr("d", path);

	  // Add blue foreground lines for focus.
	  foreground = svg.append("g")
	      .attr("class", "foreground")
	    	.selectAll("path")
	    	.data(videoinfo)
	   		.enter().append("path")
	     	.attr("d", path)
	     	.attr("stroke", function(d){
	     		console.log(d)
	     		 var c = colors[d["year"]];
	     		 
 				 return ["rgba(",c[0],",",c[1],",",c[2],",","0.5)"].join("");
	     	});

	  // Add a group element for each dimension.
	  var g = svg.selectAll(".dimension")
	      .data(dimensions)
	    .enter().append("g")
	      .attr("class", "dimension")
	      
	      .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

	  // Add an axis and title.
	  g.append("g")
	      .attr("class", "axis")
	      .each(function(d,i) { 
	      	d3.select(this).call(axis.scale(y[d])); })
	   	  .append("text")
	      .style("text-anchor", "middle")
	      .attr("y", -9)
	      .text(function(d) { 
	      	return d; })
	      // .append("text");

	  // Add and store a brush for each axis.
	  g.append("g")
	      .attr("class", "brush")
	      .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
	    .selectAll("rect")
	      .attr("x", -8)
	      .attr("width", 16);
	// });

	// Returns the path for a given data point.
	function path(d) {
	  return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
	}

	// Handles a brush event, toggling the display of foreground lines.
	function brush() {
	  var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
	      extents = actives.map(function(p) { return y[p].brush.extent(); });
	  foreground.style("display", function(d) {
	    return actives.every(function(p, i) {
	      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
	    }) ? null : "none";
	  });
	}

}
function time_To_hhmmss(seconds){
			var hh;
			var mm;
			var ss;
   //传入的时间为空或小于0
   if(seconds==null||seconds<0){
   	return;
   }
   //得到小时
   hh=seconds/3600|0;
   seconds=parseInt(seconds)-hh*3600;
   if(parseInt(hh)<10){
   	hh="0"+hh;
   }
   //得到分
   mm=seconds/60|0;
   //得到秒
   ss=parseInt(seconds)-mm*60;
   if(parseInt(mm)<10){
   	mm="0"+mm;    
   }
   if(ss<10){
   	ss="0"+ss;      
   }
   return String(hh+":"+mm+":"+ss);
}

