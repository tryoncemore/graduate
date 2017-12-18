var Data_image={"0":[{"STime":0,"ETime":4,"Imgurl":"img/1.jpg"}]
,"1":[{"STime":10,"ETime":15,"Imgurl":"img/300.jpg"}]
,"2":[{"STime":23,"ETime":24,"Imgurl":"img/690.jpg"}]
,"3":[{"STime":135,"ETime":144,"Imgurl":"img/4050.jpg"}]
,"4":[{"STime":172,"ETime":194,"Imgurl":"img/5160.jpg"}]
,"5":[{"STime":293,"ETime":304,"Imgurl":"img/8790.jpg"}]
,"6":[{"STime":396,"ETime":426,"Imgurl":"img/11880.jpg"}]
,"7":[{"STime":463,"ETime":473,"Imgurl":"img/13890.jpg"}]
,"8":[{"STime":503,"ETime":524,"Imgurl":"img/15090.jpg"}]
,"9":[{"STime":546,"ETime":562,"Imgurl":"img/16380.jpg"}]
,"10":[{"STime":699,"ETime":708,"Imgurl":"img/20970.jpg"}]
,"11":[{"STime":1039,"ETime":1066,"Imgurl":"img/31170.jpg"}]
,"12":[{"STime":1066,"ETime":1087,"Imgurl":"img/31980.jpg"}]
,"13":[{"STime":1113,"ETime":1124,"Imgurl":"img/33390.jpg"}]
,"14":[{"STime":1193,"ETime":1219,"Imgurl":"img/35790.jpg"}]
,"15":[{"STime":1262,"ETime":1279,"Imgurl":"img/37860.jpg"}]
,"16":[{"STime":1300,"ETime":1318,"Imgurl":"img/39000.jpg"}]
,"17":[{"STime":1343,"ETime":1353,"Imgurl":"img/40290.jpg"}]
,"18":[{"STime":1353,"ETime":1378,"Imgurl":"img/40590.jpg"}]
,"19":[{"STime":1666,"ETime":1670,"Imgurl":"img/49980.jpg"}]
,"20":[{"STime":1670,"ETime":1679,"Imgurl":"img/50100.jpg"}]
,"21":[{"STime":1736,"ETime":1738,"Imgurl":"img/52080.jpg"}]
,"22":[{"STime":1738,"ETime":1741,"Imgurl":"img/52140.jpg"}]
,"23":[{"STime":1825,"ETime":1834,"Imgurl":"img/54750.jpg"}]
,"24":[{"STime":1881,"ETime":1893,"Imgurl":"img/56430.jpg"}]
,"25":[{"STime":1893,"ETime":1935,"Imgurl":"img/56790.jpg"}]
,"26":[{"STime":1942,"ETime":1955,"Imgurl":"img/58260.jpg"}]
,"27":[{"STime":2061,"ETime":2078,"Imgurl":"img/61830.jpg"}]
,"28":[{"STime":2097,"ETime":2124,"Imgurl":"img/62910.jpg"}]
,"29":[{"STime":2124,"ETime":2138,"Imgurl":"img/63720.jpg"}]
,"30":[{"STime":2143,"ETime":2160,"Imgurl":"img/64290.jpg"}]
,"31":[{"STime":2217,"ETime":2242,"Imgurl":"img/66510.jpg"}]
,"32":[{"STime":2258,"ETime":2292,"Imgurl":"img/67740.jpg"}]
,"33":[{"STime":2478,"ETime":2516,"Imgurl":"img/74340.jpg"}]
,"34":[{"STime":2516,"ETime":2518,"Imgurl":"img/75480.jpg"}]
,"35":[{"STime":2550,"ETime":2521,"Imgurl":"img/76500.jpg"}]
,"36":[{"STime":2553,"ETime":2576,"Imgurl":"img/76590.jpg"}]
,"37":[{"STime":2603,"ETime":2606,"Imgurl":"img/78090.jpg"}]
,"38":[{"STime":2671,"ETime":2686,"Imgurl":"img/80130.jpg"}]
,"39":[{"STime":2686,"ETime":2693,"Imgurl":"img/80580.jpg"}]
,"40":[{"STime":2703,"ETime":2714,"Imgurl":"img/81090.jpg"}]
,"41":[{"STime":2728,"ETime":2737,"Imgurl":"img/81840.jpg"}]
,"42":[{"STime":2782,"ETime":2800,"Imgurl":"img/83460.jpg"}]
,"43":[{"STime":2800,"ETime":2810,"Imgurl":"img/84000.jpg"}]
,"44":[{"STime":2866,"ETime":2868,"Imgurl":"img/85980.jpg"}]
,"45":[{"STime":2868,"ETime":2895,"Imgurl":"img/86040.jpg"}]
,"46":[{"STime":2941,"ETime":2963,"Imgurl":"img/88230.jpg"}]
,"47":[{"STime":2997,"ETime":3026,"Imgurl":"img/89910.jpg"}]
,"48":[{"STime":3031,"ETime":3057,"Imgurl":"img/90930.jpg"}]
,"49":[{"STime":3851,"ETime":3859,"Imgurl":"img/115530.jpg"}]};


//秒转0:0:0
function formatSeconds(seconds)
{
    var date = new Date(1970,0,1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}
//-------------------------quanju bianlian----------------------------
var qujianLen = 9;
var shotLen = 299;
var ImgLen = 50;
var main_svg_w = 1142;
var main_svg_h = 290;
var main_svg_h_max = main_svg_h/2-40;
var pi = Math.PI;

var pos = 20
var svg_marigin = pos
var line_width = 2
var offset = line_width/2

//---------------------------------全局画图区域-------------------------------
var node = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(6)
    .startAngle(0) //converting from degs to radians
    .endAngle(2*pi) //just radians  

var vis = d3.select(".bottom_img")//时间轴
            // .on("mouseleave", function() {return activateEllipse(123);})
            .append("svg")
            .attr("class","main_svg")
            .attr("width", main_svg_w)
            .attr("height",main_svg_h);

var defsVis = vis.append("defs");

var filterVis = defsVis.append("filter")
                 .attr("id","shadowvis");
                 
filterVis.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");

filterVis.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 4)
    .attr("dy", 4)
    .attr("result", "offsetBlur");

var feMergeVis = filterVis.append("feMerge");

feMergeVis.append("feMergeNode")
       .attr("in", "offsetBlur")
feMergeVis.append("feMergeNode")
       .attr("in", "SourceGraphic");

// 给svg设置背景色
vis.append("rect")
    .attr("width", "1140px")
    .attr("height", "97%")
    .attr("fill", "#fffcf8")
    .attr("ry","10")
    .style("filter", "url(#dropshadow)");

var SentenBody = d3.select(".setences")//总结语句
            // .on("mouseleave", function() {return activateEllipse(123);})
            .append("svg")
            .attr("width", main_svg_w)
            .attr("height",100);

var Catlo = d3.select(".upper-right")//目录
            // .on("mouseleave", function() {return activateEllipse(123);})
            .append("svg")
            .attr("class","Catlo_svg")
            .attr("width", 620)
            .attr("height",300);
//给svg设置阴影
var defs = Catlo.append("defs");

var filter = defs.append("filter")
                 .attr("id","dropshadow");
                 

filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");

filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 2)
    .attr("dy", 2)
    .attr("result", "offsetBlur");

var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode")
       .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
       .attr("in", "SourceGraphic");

// 给svg设置背景色
Catlo.append("rect")
    .attr("width", "90%")
    .attr("height", "97%")
    .attr("fill", "#fffcf8")
    .attr("ry","10")
    .style("filter", "url(#dropshadow)");

//-------------------处理最后一张图片的位置关系---------------------------
var total_ImgTime = 0;
  for(var i=0;i<ImgLen;i++){
    total_ImgTime += Data_image[i][0].ETime - Data_image[i][0].STime;
  }
// var EndImgLength = 100-(Data_image[ImgLen-1][0].ETime - Data_image[ImgLen-1][0].STime)/total_ImgTime*main_svg_w+5;
// var ImgShowLen = main_svg_w - EndImgLength;
var ImgShowLen = main_svg_w ;

//-----------------------------------------------------------------------
// var PPTs = d3.select(".img_show")
//             .append("svg")
//             .attr("width", main_svg_w)
//             .attr("height",100);
//  利用node节点来记录当前到达那个镜头，以及剩余的大小
var node_index = [];  //------------记录节点信息
//-----------------------------node节点记录--------------------------------
function shotIndexContent(){
  var Shot_index = 0;
  var Rest_Time = 0;

  var Nodeshot = {};
  Nodeshot["shotId"] = 0;
  Nodeshot["shotIn"] = 0;
  Nodeshot["shotOut"] = data_shot[0][0].ETime;
  node_index.push(Nodeshot);
  
  
  for (var i = 0; i<qujianLen; i++) { 
    Total_iTime = data_qujian[i][0].ETime - data_qujian[i][0].STime;
    count_iTime  = Rest_Time;
    for(var j = Shot_index;j< shotLen;j++){
      count_iTime = count_iTime +data_shot[j][0].ETime - data_shot[j][0].STime; 
      if(count_iTime>=Total_iTime){
        Rest_Time = count_iTime-Total_iTime;
        var Nodeshot = {};
          Nodeshot["shotId"] = j;
          Nodeshot["shotIn"] = data_shot[j][0].ETime - data_shot[j][0].STime-Rest_Time;
          Nodeshot["shotOut"] = Rest_Time;
          Shot_index = j+1;
          node_index.push(Nodeshot);
          break;
      }
    }
  }

}


//-----------------------定义一个数组用于记录变化的区间-----------------------
//初始化为node_index的值。
var quChange = [];
function CreatChangeIndex(){
  for (var i = 0; i<qujianLen; i++) { 
    var qujianChge = {};
    qujianChge["qujian"] = i; //通过合并操作更新原有区间归属什么区间
    qujianChge["ETime"] = data_qujian[i][0].ETime;
    qujianChge["STime"] = data_qujian[i][0].STime;
    var lengthqujian = (data_qujian[i][0].ETime - data_qujian[i][0].STime)/total_Time*(main_svg_w-svg_marigin*2)/2;
    qujianChge["legth"] = lengthqujian;
    // 通过扩大操作更新长度
    quChange.push(qujianChge);
  }
}



//--------------------------draw data Path and Ellipse-----------------------
function drawPathAndEllipse(o_Radius,cx,cy,rx,ry,p,i){
   //p 代表是画的路径方向，1代表顺时针，向上，0代表逆时针，向下  

  var Total_iTime = data_qujian[i][0].ETime - data_qujian[i][0].STime;
  var ss_StartX = -o_Radius+offset;
  var ss_StartY = 0;
  var ss_EndX = o_Radius-offset;
  var ss_EndY = 0;
  
  var StartId = node_index[i].shotId;
  var Inrest = node_index[i].shotOut;  // right node of merged arg
  var EndId = node_index[i+1].shotId;                     // left node of merged arg
  var Erest = node_index[i+1].shotIn;  // right node of merged arg
  var count_iTime = Inrest;
  var MergData = [];
      MergData.push(Inrest/Total_iTime*pi);

  var factor = 0.1/Math.sqrt(100*Total_iTime/total_Time); //镜头分割距离调节因子
  for(var k=StartId+1;k<EndId;k++){

      var angleEnd = (count_iTime+data_shot[k][0].ETime-data_shot[k][0].STime)/Total_iTime*pi;
      MergData.push(angleEnd);
      count_iTime = count_iTime+data_shot[k][0].ETime-data_shot[k][0].STime;

  }

  angleEnd = (count_iTime+Erest)/Total_iTime*pi;
  count_iTime += Erest;
    
  MergData.push(angleEnd);


 for(var k=0;k<MergData.length;k++){
    angleEnd = MergData[k];
    ss_EndX = -Math.cos(angleEnd-factor)*rx;
    ss_EndY = p==0?Math.sin(angleEnd-factor)*ry:-Math.sin(angleEnd-factor)*ry;
    
    var ss="M"+ss_StartX+","+ss_StartY+" A"+rx +","+ry +" 0 0,"+p+" "+ ss_EndX +","+ss_EndY;
        vis.append("path")
         .attr("d", ss)
         .attr("id", "arcS" +(k+StartId).toString()+"_"+i.toString())// 通过弧编号以及区间来确定唯一的地址
         .attr("class", "arcQ"+i.toString())
         .attr("data-name",function(d,index){
          return "arctime" + (index).toString()
         })
         .attr("stroke", "rgb(247, 76, 81)")
         .attr("stroke-width","4")
         .attr('fill-opacity', 0)
         .attr("transform", "translate("+ cx + "," + cy + ")")
         
    ss_StartX = -Math.cos(angleEnd)*rx;
    ss_StartY = p==0?Math.sin(angleEnd)*ry:-Math.sin(angleEnd)*ry;
  }
  

  vis.append("ellipse")
    .attr("id","circle" + i.toString())
    .attr("cx",cx)
    .attr("cy",cy)
    .attr("rx",rx)
    .attr("ry",ry)
    .attr("fill","rgba(255,124,128,0.1)")
  // 现实句子
  Sentences(i,(cx-o_Radius))
}
// 删除空的arc
var arcDeleted = false;
function deleteArc(){
  for(var i = 0; i < document.querySelectorAll('[data-name]').length - 1; i++){
    var m1 = document.querySelectorAll('[data-name]')[i].getAttribute("d").split(/,| |,/)[0].replace("M","") == document.querySelectorAll('[data-name]')[i+1].getAttribute("d").split(/,| |,/)[0].replace("M","");
    var m2 = Math.abs(document.querySelectorAll('[data-name]')[i].getAttribute("d").split(/,| |,/)[1]) == Math.abs(document.querySelectorAll('[data-name]')[i+1].getAttribute("d").split(/,| |,/)[1]);
    if(m1 && m2){
      var element = document.querySelectorAll('[data-name]')[i];
      element.outerHTML = "";
      delete element;
    }
  }
  arcDeleted = true;
}
//---------------draw image--------------------
function drawImage(i,cx,ry){
  var PaddingTop = main_svg_h/2-(ry+50);//上
  if(i%2 == 1){     
    PaddingTop = main_svg_h/2+(ry+10);
  }
  var PaddingLeft = cx-20;
	
	img_x = parseFloat($("#circle" + (i).toString()).attr('cx'));
  img_y = parseFloat($("#circle"+ (i).toString()).attr("cy")) - parseFloat($("#circle"+ (i).toString()).attr("ry"));
  $("#img" + (i).toString()).css({left:PaddingLeft, top:PaddingTop}) 
}

//---------------draw combine image--------------------
function drawCombineImage(ImageStart,ImageEnd,cx,ry){
  var PaddingTop = main_svg_h/2-(ry+50);//上
  if(ImageStart%2 == 1){     
    PaddingTop = main_svg_h/2+(ry+10);
  }
  for(var j=ImageStart;j<ImageEnd;j++){
    var cxNew = cx+(j-ImageStart)*50-(ImageEnd-ImageStart)*25
    var PaddingLeft = cxNew-20; 
    $("#img" + (j).toString()).css({left:PaddingLeft, top:PaddingTop}) ;
  }  
  img_x = parseFloat($("#circle" + (i).toString()).attr('cx'));
  img_y = parseFloat($("#circle"+ (i).toString()).attr("cy")) - parseFloat($("#circle"+ (i).toString()).attr("ry"));

}

//---------------draw Start--------------------
function drawInit(start, end){
  //first node
  vis.append("path")
  .attr("d", node)
  .attr("id","node0")
  .attr("fill", "rgb(247, 76, 81)")
  .attr("transform", "translate("+ svg_marigin +"," + main_svg_h/2 + ")");

  vis.append("text")
     .text("1")
     .attr("id","nodeText1")
     .attr("class","nodeTexts")
     .attr("font-size",11)  
     .attr("font-family","'Times New Roman'")
     .attr("fill","#ffffff")
     .attr("transform", "translate("+ (svg_marigin - 3) +"," + (main_svg_h/2 + 4) + ")");


  for (var i = start; i<end; i++) {  
    var Total_iTime = data_qujian[i][0].ETime - data_qujian[i][0].STime;
    var o_Radius = Total_iTime/total_Time*(main_svg_w-svg_marigin*2)/2
  	var p = 1;                      // 默认椭圆初始化为顺时针，向上
  	var cx = pos + o_Radius;      // 中心点x坐标
  	var cy = main_svg_h/2-5;      // 中心点y坐标，且向上
  	var rx = o_Radius-offset;     // 长半轴
  	var ry = o_Radius>main_svg_h_max?ry = main_svg_h_max:rx;  // 默认为圆 椭圆短半轴,高度过高，半径就重新设定
    
    if(i%2 == 1){       
        cy = main_svg_h/2+5;      // 椭圆中心点y坐标，向下
        p = 0;                 
    }
   
    drawPathAndEllipse(o_Radius,cx,cy,rx,ry,p,i);
   // drawImage(i,cx,ry);
    tagcloud2(cx,cy,rx,ry,i) 


    // d3.select( "#arc" + i.toString()).transition().delay(20*(i+1)).duration(0).attr("fill", "rgb(247, 76, 81)")
    pos = pos + 2*o_Radius
    vis.append("path")
    .attr("d", node)
    .attr("id","node" + (i+1).toString())
    .attr("fill", "rgb(247, 76, 81)")
    .attr("transform", "translate("+ pos +"," + main_svg_h/2 + ")");

     d3.select( "#node" + (i+1).toString()).transition().delay(20*(i+1)).duration(0).attr("fill", "rgb(247, 76, 81)")
     if(i<8){
     vis.append("text")
     .text(i+2)
     .attr("id","nodeText" + (i+2).toString())
     .attr("class","nodeTexts")
     .attr("font-size",11)  
     .attr("font-family","'Times New Roman'")
     .attr("fill","#ffffff")
     .attr("transform", "translate("+ (pos - 3) +"," + (main_svg_h/2 + 4) + ")");   
    }else if (i >= 8 && i < (end - 1)){
     vis.append("text")
     .text(i+2)
     .attr("id","nodeText" + (i+2).toString())
     .attr("class","nodeTexts")
     .attr("font-size",11)  
     .attr("font-family","'Times New Roman'")
     .attr("fill","#ffffff")
     .attr("transform", "translate("+ (pos - 5) +"," + (main_svg_h/2 + 4) + ")");   
    }

    }
}



//---------------------------区域合并，主题合并----------------------------------
var IsBrush = 0;
function IsCombineBrush(){
  if(IsBrush == 0){
    IsBrush = 1;
    
  }
  else{
    IsBrush = 0;
    d3.select("g.brush").remove();
  }
}


  
  //------------------------brush function------------------------

  //---------------------draw the apart part-------------------------
  function draw_subarc(p,q){
    //恢复PPT在时间轴交互上的默认设置
    d3.select(".PPTtime").remove();
    //恢复ppt默认显示设置
    $(".slide").css("border-left-color", "#fafafa")
    $(".slide").css("border-left-width", "2px");
     //恢复默认 目录设置
    //d3.selectAll(".CatloNode").attr("fill", "rgb(247, 76, 81)").style("opacity","1");
    //d3.selectAll(".Catlo").attr("fill", "black").style("opacity","1").attr("stroke", "#666666")    //字体透明度
    //---------------------删除Search操作的字符--------------------------------
    d3.selectAll(".Search").remove();
     // $(".ppt-text").text("")//delete sentences
    //更新原有区间 归属新的区间
    var TTL = 0
    for(var i = 0;i<qujianLen;i++){
    TTL =TTL+quChange[i].legth;
    }
    // console.log(" TTL part "+TTL);
    for(var quNum = p+1; quNum<q; quNum++){
      quChange[quNum].qujian = quNum;
    } 
    // console.log("quChange  part ");
     var node_id = "#node" + p.toString();
     var t = $(node_id).attr('transform');
     var part = t.replace("translate(","").replace(")","").split(",");
     var x = parseFloat(part[0]);

     var StartId = node_index[p].shotId;
     var Inrest = node_index[p].shotOut;  // right node of merged arg
    
  for (var i = p; i< q; i++) { 
      // var o_Radius = (data_qujian[i][0].ETime - data_qujian[i][0].STime)/total_Time*(main_svg_w-svg_marigin*2)/2
      var o_Radius = quChange[i].legth
      // console.log("part length "+o_Radius)
      var m = 1;                      // 默认椭圆初始化为顺时针，向上
      var cx = x + o_Radius;      // 中心点x坐标
      var cy = main_svg_h/2-5;      // 中心点y坐标，且向上
      var rx = o_Radius-offset;     // 长半轴
      var ry = o_Radius>(main_svg_h_max)?ry = main_svg_h_max:rx;  // 默认为圆 椭圆短半轴,高度过高，半径就重新设定
      
      if(i%2 == 1){       
          cy = main_svg_h/2+5;      // 椭圆中心点y坐标，向下
          m = 0;  
      }
          
      drawPathAndEllipse(o_Radius,cx,cy,rx,ry,m,i);
      //drawImage(i,cx,ry);
      tagcloud2(cx,cy,rx,ry,i) 
      // d3.select( "#arc" + i.toString()).transition().delay(20*(i+1)).duration(0).attr("fill", "rgb(247, 76, 81)")

      x = x + 2*o_Radius
      vis.append("path")
      .attr("d", node)
      .attr("id","node" + (i+1).toString())
      .attr("fill", "rgb(247, 76, 81)")
      .attr("transform", "translate("+ x +"," + main_svg_h/2 + ")");
      d3.select( "#node" + (i+1).toString()).transition().delay(20*(i+1)).duration(0).attr("fill", "rgb(247, 76, 81)");

     if(i<8){
     vis.append("text")
     .text(i+2)
     .attr("id","nodeText" + (i+2).toString())
     .attr("class","nodeTexts")
     .attr("font-size",11)  
     .attr("font-family","'Times New Roman'")
     .attr("fill","#ffffff")
     .attr("transform", "translate("+ (x - 3) +"," + (main_svg_h/2 + 4) + ")");   
    }else if (i >= 8 && i < 10){
     vis.append("text")
     .text(i+2)
     .attr("id","nodeText" + (i+2).toString())
     .attr("class","nodeTexts")
     .attr("font-size",11)  
     .attr("font-family","'Times New Roman'")
     .attr("fill","#ffffff")
     .attr("transform", "translate("+ (x - 5) +"," + (main_svg_h/2 + 4) + ")");   
    }
      
    }
  }

  //-----------------------return circle----------------------------
  function returnCircle(node_id){
      var j;
      for(j=0;j<node_id.length;++j){
          if(node_id[j] == '+')
            break;
      }
      var id1 = parseInt(node_id.substr(0, j));                     // left node of merged arg
      var id2 = parseInt(node_id.substr(j+1, node_id.length-j-1));  // right node of merged arg
   // 再次更新区间
    for(var quNum = id1+1;quNum<id2;quNum++){
      quChange[quNum].qujian = quNum;
    }
      d3.select("#node" + id1.toString()).attr("fill", "rgb(247, 76, 81)"); //modify the color of the first node
      d3.select("#node" + id2.toString()).remove();                 //remove the last node, reserve the first node
      d3.select("#nodeText" + (id2+1).toString()).remove();   
      d3.select("#circle" + id1.toString()).remove();
      d3.selectAll(".arcQ" + id1.toString()).remove();
      d3.select("#tag" + id1.toString()).remove();
      draw_subarc(id1,id2);   //draw arg first, then node every time
  }
  //-----------------------merge and update-------------------------
  function update(selected_node_arr){
	    start = selected_node_arr[0]
      end =selected_node_arr[selected_node_arr.length-1]
  
      //console.log("llllllllllllllll#catLine"+(start+"_"+(end-1)).toString());
      d3.select("#node" + start.toString()).attr("fill","rgb(247, 76, 81)")
      d3.select("#node" + end.toString()).attr("fill","rgb(247, 76, 81)")
      d3.select("#circle" + start.toString()).remove();
      d3.select("#control" + start.toString()).remove();
      d3.select("#cross" + start.toString()).remove();
      d3.selectAll(".arcQ" + start.toString()).remove();
      d3.select("#tag" + start.toString()).remove();
/*	  console.log("d3.select update   "+d3.select(".catline" + start.toString()))
*/	 if(d3.select(".catline" + start.toString())!=""){
	  d3.select(".catline" + start.toString()).remove();
	 }
      for(i=start+1; i<end; i++){
          d3.select("#node" + i.toString()).remove();
          d3.select("#nodeText" + (i+1).toString()).remove();
          d3.select("#circle" + i.toString()).remove();
          d3.selectAll(".arcQ" + i.toString()).remove();
          d3.select("#tag" + i.toString()).remove();
          d3.select("#control" + i.toString()).remove();
          d3.select("#cross" + i.toString()).remove();
		   /*console.log("d3.select update   2222 "+d3.select(".catline" + i.toString()))*/
		  if(d3.select(".catline" + i.toString())!=""){
	        d3.select(".catline" + i.toString()).remove();
			}
		
      }
      draw_arc(start,end)
      console.log(brushMerge);      
      
  }
//-------------------------------big 区域放大--------------------------
  //----------------------当鼠标离开交互区域，返回原图-------------------------
  function activateEllipse(t) {
    //---------------------删除Search操作的字符--------------------------------
    console.log("activateEllipse")
    d3.selectAll(".Search").remove();
    // $(".ppt-text").text("")//delete sentences
    //-------------------------big-------------------------------------------
    // var keyIndex=t.replace("circle","_").split("_");
    // var key = keyIndex[1];
    var key = t;
    var keyWidth = d3.select("#circle"+key.toString()).attr("rx");
    console.log("hello")
    var SetWidth = main_svg_h_max;                  //设置变形后的宽度的上限，如果选择区域大于该值，那么不变形
    var RestWidth = main_svg_w-svg_marigin*2 - SetWidth*2;
    var x = 20; //起始点
    var Total_iTime = 0;
    //获取key代表的区间时间以及长度
    var keyTime = 0;
    var keyLength = 0;
      for(var i=0;i<qujianLen;i++){
        if(quChange[i].qujian == key){
          keyTime = keyTime + quChange[i].ETime - quChange[i].STime;
          keyLength++;
        }
      }
    var endKey=  parseInt(keyLength)+parseInt(key)-1;
    var total_RestTime = total_Time-keyTime;  

    //更新半径长
    var lengthqujian = 0;
    for(var i=0;i<qujianLen;i++){
      if(i>=key&&i<=endKey){
        lengthqujian = quChange[i].legth;
        quChange[i].legth= (data_qujian[i][0].ETime - data_qujian[i][0].STime)/keyTime*SetWidth;
        // console.log("become big i "+i+": before:"+lengthqujian+" after: "+quChange[i].legth);
      }
      else{
        lengthqujian = quChange[i].legth;
        quChange[i].legth= (data_qujian[i][0].ETime - data_qujian[i][0].STime)/total_RestTime*RestWidth/2;
        // console.log("become small i "+i+": before:"+lengthqujian+" after: "+quChange[i].legth);
      }
    }

    //变形
    if(keyWidth<SetWidth) { 
      
      var o_Radius = SetWidth;
      var StartId = node_index[0].shotId;
      var Inrest = node_index[0].shotOut;  // right node of merged arg 
      var CurrentIndex = 0;
      // var firstID = 0; 

      for (var i =0; i< qujianLen;) {  
         Total_iTime = Total_iTime + quChange[i].ETime - quChange[i].STime;
         if((i+1)<qujianLen &&quChange[i].qujian==quChange[i+1].qujian){
            i++;
         }
         else{
            var EndId = node_index[i+1].shotId;                     // left node of merged arg
            var Erest = node_index[i+1].shotIn;  // right node of merged arg           
             //处理函数
            if(CurrentIndex!=key){
              o_Radius = Total_iTime/total_RestTime*RestWidth/2;
             }
            else{
              o_Radius = SetWidth;
              // Sentences(key,(x + o_Radius),(main_svg_h/2-5),SetWidth);
              } 
            
            var p = 1;                      // 默认椭圆初始化为顺时针，向上
            var cx = x + o_Radius;          // 中心点x坐标
            var cy = main_svg_h/2-5;        // 中心点y坐标，且向上
            var rx = o_Radius-offset;       // 长半轴
            var ry = o_Radius>main_svg_h_max?ry = main_svg_h_max:rx;  // 默认为圆 椭圆短半轴,高度过高，半径就重新设定
            
            if(CurrentIndex%2 == 1){       
                cy = main_svg_h/2+5;      // 椭圆中心点y坐标，向下
                p = 0;                                 
            }
   
            // ------------drawPathAndEllipse(o_Radius,cx,cy,rx,ry,p,i)重写-----------------------
              var ss_StartX = -o_Radius+offset;
              var ss_StartY = 0;
              var ss_EndX = o_Radius-offset;
              var ss_EndY = 0;
    
              var count_iTime = Inrest;
              var MergData = [];
                  MergData.push(Inrest/Total_iTime*pi);

              var factor = 0.1/Math.sqrt(100*Total_iTime/total_Time); //镜头分割距离调节因子
              for(var k=StartId+1;k<EndId;k++){
                  var angleEnd = (count_iTime+data_shot[k][0].ETime-data_shot[k][0].STime)/Total_iTime*pi;
                  MergData.push(angleEnd);
                  count_iTime = count_iTime+data_shot[k][0].ETime-data_shot[k][0].STime;
              }

              angleEnd = (count_iTime+Erest)/Total_iTime*pi;
              count_iTime += Erest;
             
              MergData.push(angleEnd);
             for(var k=0;k<MergData.length;k++){
                angleEnd = MergData[k];
      
                ss_EndX = -Math.cos(angleEnd-factor)*rx;
                ss_EndY = (p==0)?Math.sin(angleEnd-factor)*ry:-Math.sin(angleEnd-factor)*ry;
                var ss="M"+ss_StartX+","+ss_StartY+" A"+rx +","+ry +" 0 0,"+p+" "+ss_EndX +","+ss_EndY;

                d3.select("#arcS" +(k+StartId).toString()+"_"+CurrentIndex.toString()).transition()
                    .duration(500)
                    .attr("d",ss)
                    .attr("transform", "translate("+ cx + "," + cy + ")")  
                   
                ss_StartX = -Math.cos(angleEnd)*rx;
                ss_StartY = p==0?Math.sin(angleEnd)*ry:-Math.sin(angleEnd)*ry;
              } 
               
               d3.select("#circle"+ CurrentIndex.toString()).transition()
                .duration(500)
                .attr("cx",cx)
                .attr("cy",cy)
                .attr("rx",rx)
                .attr("ry",ry)
             circley = cy - ry -12;
             if(CurrentIndex%2 == 1){       
                circley = cy + ry + 12;
              }

              d3.select("#control"+ CurrentIndex.toString()).transition()
                .duration(500)
                .attr("cx",cx)
                .attr("cy",circley)
                .attr("r",8)
                .attr("fill","rgb(247, 76, 81)");

              d3.select("#cross"+ CurrentIndex.toString()).transition()
                .duration(500)
                .attr("font-size",14)
                .attr("font-family","Arial")
                .attr("fill","#ffffff")  
                .attr("x",cx-4)
                .attr("y",circley+4);
                
                              
              // -------------------------base content----------------------------
              x = x + 2*o_Radius;
              d3.select("#node"+(i+1).toString()).transition()
              .duration(500)
              .attr("transform", "translate("+ x +"," + main_svg_h/2 + ")");

              if(i<8){
                d3.select("#nodeText"+(i+2).toString()).transition()
                  .duration(500)
                  .attr("transform", "translate("+ (x-3) +"," + (main_svg_h/2 + 4) + ")");
              }else if (i >= 8){
                d3.select("#nodeText"+(i+2).toString()).transition()
                  .duration(500)
                  .attr("transform", "translate("+ (x-5) +"," + (main_svg_h/2 + 4) + ")");
                }
              d3.selectAll("#tag" + CurrentIndex.toString()).remove();
             
              if(CurrentIndex == i){
               // drawImage(CurrentIndex,cx,ry);
                tagcloud2(cx,cy,rx,ry,CurrentIndex);
              }
              else{
                CombineTag(cx,cy,rx,ry,CurrentIndex,i+1)
                //drawCombineImage(CurrentIndex,i+1,cx,ry);  
              }


              //重置total_ITime 的值
              StartId = node_index[i+1].shotId;
              Inrest = node_index[i+1].shotOut;  // right node of merged arg 
              i++;
              Total_iTime = 0;
              CurrentIndex = i;
         }  
      }           
    }  
    //---------------------------图片和目录的变化--------------------------------
    ImageChange(key,parseInt(key)+1); 
    CatalogChange(key,parseInt(key)+1);              
  }
  //-------------------------添加该功能-------------------------
  // d3.select(".bottom_img")
  //     .on("mouseenter", function() {return activateEllipse(123);})
  //     .on("mouseleave", function() {})
  //     .on("mouselover", function() {})
  
      
  //-------------------------------------------------

//---------------------------------search------------------------------------
function SearchTag(x)
{
  //---------------------删除Search操作的字符--------------------------------
  d3.selectAll(".Search").remove();
  //--------------------------------搜索画图---------------------------------
  console.log("weiwei pig")
  var txt=document.getElementById(x).value;
  // document.getElementById(x).value=y.toUpperCase()
  for(var i=0;i<qujianLen;i++){
      for(var j=0;j<tag[i].length;j++){
          if(txt.toString()==tag[i][j].text){
             var i_Belong = quChange[i].qujian;
            // console.log("i_Belong  "+i_Belong)
            var Total_iTime = 0;
            var Total_iLength = 0;
              for(var k=0;k<qujianLen;k++){
                if(quChange[k].qujian == i_Belong){
                  Total_iTime = Total_iTime + quChange[k].ETime - quChange[k].STime;
                  Total_iLength = Total_iLength +quChange[k].legth;
                }
              }
           
            var node_id = "#node" + i_Belong.toString();
            
            var t = $(node_id).attr('transform');
            var part = t.replace("translate(","").replace(")","").split(",");
            var x = parseFloat(part[0]);

            // var Total_iTime = data_qujian[i][0].ETime - data_qujian[i][0].STime;           
            var o_Radius = Total_iLength;
            var p = 1;                      // 默认椭圆初始化为顺时针，向上
            var cx = x + o_Radius;      // 中心点x坐标
            var cy = main_svg_h/2-5;      // 中心点y坐标，且向上
            var rx = o_Radius-offset;     // 长半轴
            var ry = o_Radius>(main_svg_h_max)?ry = main_svg_h_max:rx;  // 默认为圆 椭圆短半轴,高度过高，半径就重新设定
            
            if(i_Belong%2 == 1){       
                cy = main_svg_h/2+5;      // 椭圆中心点y坐标，向下
                p = 0;  
            }            
            //deal shot using dot
            var shotRx = rx;
            var shotRy = ry;
            var TagSTime = tag[i][j].SSTime-data_qujian[i_Belong][0].STime; 
            // console.log("TagSTime "+TagSTime+"  bottom bar "+Total_iTime);            
            var angleStart = TagSTime/Total_iTime*pi;
            // console.log("angleStart  "+angleStart)
            var angleEnd = (TagSTime+2)/Total_iTime*pi;
            var ss_StartX = -Math.cos(angleStart)*shotRx;
            var ss_StartY = (p==0)?Math.sin(angleStart)*shotRy:-Math.sin(angleStart)*shotRy;
            var ss_EndX = -Math.cos(angleEnd)*shotRx;
            var ss_EndY = (p==0)?Math.sin(angleEnd)*shotRy:-Math.sin(angleEnd)*shotRy;      
            var ss="M"+ss_StartX+","+ss_StartY+" A"+shotRx +","+shotRy +" 0 0,"+p+" "+ ss_EndX +","+ss_EndY;
                vis.append("path")
                 .attr("d", ss)
                 .attr("id", "arcShot" + i.toString())
                 .attr("class","Search")
                 .attr("stroke", "#FF0000")
                 .attr("stroke-width","3")
                 .attr('fill-opacity', 0)
                 .attr("transform", "translate("+ cx + "," + cy + ")")
            
            //deal OCR using arc
            var ocrRx = rx+4.5;
            var ocrRy = ry+4.5;
            var TagOSTime = tag[i][j].OSTime-data_qujian[i_Belong][0].STime;
            var TagOETime = tag[i][j].OETime-data_qujian[i_Belong][0].STime;
            var OangleStart = TagOSTime/Total_iTime*pi;
            var OangleEnd = TagOETime/Total_iTime*pi;
            var ss_OStartX = -Math.cos(OangleStart)*ocrRx;
            var ss_OStartY = (p==0)?Math.sin(OangleStart)*ocrRy:-Math.sin(OangleStart)*ocrRy;
            var ss_OEndX = -Math.cos(OangleEnd)*ocrRx;
            var ss_OEndY = (p==0)?Math.sin(OangleEnd)*ocrRy:-Math.sin(OangleEnd)*ocrRy;      
            var ssO="M"+ss_OStartX+","+ss_OStartY+" A"+ocrRx +","+ocrRy +" 0 0,"+p+" "+ ss_OEndX +","+ss_OEndY;
                vis.append("path")
                 .attr("d", ssO)
                 .attr("id", "arcOCR" + i.toString())
                 .attr("class","Search")
                 .attr("stroke", "#663366")
                 .attr("stroke-width","3")
                 .attr('fill-opacity', 0)
                 .attr("transform", "translate("+ cx + "," + cy + ")")
            } 
          }
      }
}

function returnNew(){
  tagClick = false;
  brushMerge =[];
  selected_Catlo_arr = [];
  selected_node_arr = [];
  //---------------------删除Search操作的字符--------------------------------
  d3.selectAll(".Search").remove();
  d3.selectAll(".controlCircles").remove();
  d3.selectAll(".controlCross").remove();
  //d3.selectAll(".catlines").remove();
  $(".ppt-text").text(" ")
  //恢复ppt默认显示设置
  $(".slide").css("border-left-color", "#fafafa")
  $(".slide").css("border-left-width", "2px");
  //恢复默认 目录设置
  d3.selectAll(".CatloNode").attr("fill", "rgb(247, 76, 81)").style("opacity","1");
  d3.selectAll(".Catlo").attr("fill", "black").style("opacity","1").attr("stroke", "#666666")    //字体透明度
  //-------------------------还原原状态，以清除区域选择-------------------
  for(var i=0;i<qujianLen;i++){
    d3.select("#node" + i.toString()).remove();
    if(d3.selectAll(".catline" + i.toString())) d3.selectAll(".catline" + i.toString()).remove();    
    d3.select("#nodeText" + i.toString()).remove();
    d3.select("#circle" + i.toString()).remove();
    d3.selectAll(".arcQ" + i.toString()).remove();
    d3.select("#tag" + i.toString()).remove();
    d3.select("#Catlo"+i.toString()).remove();
    d3.select("#CatTxt"+i.toString()).remove();
    d3.select("#CatTime"+i.toString()).remove();
  }
  d3.select("#node11").remove();
  d3.select("#nodeText11").remove();
  pos = 20;
  svg_marigin = pos;
  drawInit(0,qujianLen);
  Drawcatalog();
  // CreatChangeIndex();
  for (var i = 0; i<qujianLen; i++) { 
    quChange[i].qujian = i; //通过合并操作更新原有区间归属什么区间
    quChange[i].ETime = data_qujian[i][0].ETime;
    quChange[i].STime= data_qujian[i][0].STime;
    var lengthqujian = (data_qujian[i][0].ETime - data_qujian[i][0].STime)/total_Time*(main_svg_w-svg_marigin*2)/2;
    quChange[i].legth= lengthqujian;
  }
  
}

//---------------------------tagcloud2------------------------------
function tagcloud2(cx,cy,rx,ry,tag_index){
//-----------------------添加交互的Tag字节--------------------------------

var Tag_New = "";  
  for(var j = 0;j<tag[tag_index].length;j++){
  var t1 = tag[tag_index][j].text;
  var t2 = parseInt(tag[tag_index][j].weight);
 
  Tag_New += "{text: '" + t1 + "', weight: '" + t2 + "',html: {'class': 'span_list tags',onmouseover:'on_mouseover(this,event)',onmouseout:'on_mouseout(this)',onclick:'on_onclick(this)'}},";
  
}
var string_list = Tag_New;
var Tag_NewChang = eval("[" + string_list + "]");

if(rx>=5){
  $(function() {
    // When DOM is ready, select the container element and call the jQCloud method, passing the array of words as the first argument.
    svg = document.createElement("div")

    $(svg).attr("id","tag"+tag_index.toString())
          .attr("class","TagDB");
    $(svg).jQCloud(Tag_NewChang,
        {
        width: 2*rx,
        height: 2*ry,
        shape: 'elliptic'  //rectangular
        }
    );

    $(".bottom_img").append(svg) 
    $("#tag"+tag_index.toString()).css({
                                      "margin-left":cx-rx,
                                      "margin-top":cy-ry,
                                      "padding":"5px"
                                      });
    });
  }
}

//------------------------------combine Tag----------------------------
function CombineTag(cx,cy,rx,ry,tagStart,tagEnd){
if(rx>=5){
  $(function() {
    // When DOM is ready, select the container element and call the jQCloud method, passing the array of words as the first argument.
    var Tag_New = "";  
    for(var i =tagStart;i<tagEnd;i++){
      for(var j = 0;j<tag[i].length;j++){
        var t1 = tag[i][j].text;
        var t2 = parseInt(tag[i][j].weight);
        Tag_New += "{text: '" + t1 + "', weight: '" + t2 + "',html: {'class': 'span_list tags',onmouseover:'on_mouseover(this,event)',onmouseout:'on_mouseout(this)',onclick:'on_onclick(this)'}},";
      }
    }
    var string_list = Tag_New;
    var Tag_NewChang = eval("[" + string_list + "]");

    svg = document.createElement("div")   
    $(svg).attr("id","tag"+tagStart.toString())
          .attr("class","TagDB")

    $(svg).jQCloud(Tag_NewChang,
        {
        width: 2*rx,
        height: 2*ry,
        shape: 'elliptic'  //rectangular
        });     
      // $(svg).attr("id","tag"+tagStart.toString())
      //       .attr("style", "width:"+ (cx+rx) + "px;height:" + (cy+ry) + "px;")
      //       .attr("left",cx-rx)
      //       .attr("top",cy-ry)
      // $(svg).jQCloud(total_tag,
      //     {
      //     width: cx+rx,
      //     height: cy+ry,
      //     center:{x:cx,y:cy},
      //     shape: 'elliptic'  //rectangular
      //     });
    $(".bottom_img").append(svg)   
    $("#tag"+tagStart.toString()).css({
                                    "margin-left":cx-rx,
                                    "margin-top":cy-ry,
                                    "padding":"5px"
                                    });
    });
  }
  

}
//----------------------给文本添加交互------------------------------- 
function on_mouseover(e, ev) {
  var txt = $(e).html();
  ev = ev || event;
  var id_ee = $(e).css("color","red");

  // $.each(data, function(i, item) {
  //   if(txt == item[0]){
  //     var html = item[0]+"<br />曝光数"+item[1]+"<br />"+item[2];
  //     $("#my_favorite_latin_words").after("<div class='append_div' style='left:" + ev.clientX + "px; top:" + ev.clientY + "px; '>" + html + "</div>");
  //     return;
  //   }
  // });
}

function on_mouseout(e) {
  var id_ee = $(e).css("color","inherit");
  
  // $(".append_div").remove();
  
}

function on_onclick(e){
  
  var id_ee = $(e).css("color","red");
  var time_id = $(e).attr("id");
  var txt = $(e).html();

  var time_idi = $(e).attr("id").replace("tag","").split("_word_")[0];
  var time_idj = $(e).attr("id").replace("tag","").split("_word_")[1];
  var time_length = tag[time_idi].length;
  player.seekTo(tag[time_idi][time_idj].SSTime,true);
  
  if(parseInt($("#tag"+(time_idi).toString()).attr("style").split(";")[0].replace("width: ","").replace("px",""))-parseInt($("#tag"+(time_idi-1).toString()).attr("style").split(";")[0].replace("width: ","").replace("px","")) < 100){

  if(parseInt(time_idj)>parseInt(time_length)){
    for(var i=parseInt(time_idi);i<qujianLen;i++){
      for(var j=0;j<tag[i].length;j++){
        if(  txt.toString() ==tag[i][j].text){
           time_idi = i;
           time_idj = j; 
           break;
         }
      }
    } 
  }

  

  }else{
    player.playVideo();
  }
  
}

//-----------------------------背景圆圈放大--------------------------------
//鼠标双击击，时间轴圆圈放大时间 
/*  $(".TagDB").dblclick(function(){
    var tagi = $(this).attr("id").split("tag")[1];
    var tagj = $(this).attr("id").split("tag")[0];
    console.log(tagi+"   "+tagj)
    activateEllipse(tagi);
  });*/

//------------------------------Sentences--------------------------------
function Sentences(i,x){  
      SentenBody.append("path")
      .attr("d", node)
      .attr("id","Sentences"+i.toString())
      .attr("class","Sentences")
      .attr("fill", "rgb(247, 76, 81)")
      .attr("transform", "translate("+ x +"," + (10+20*(i%3)) + ")")
      .style("opacity","0.3") ;

      SentenBody.append("text") //选择body中所有p，但由于没有p，所以选择了一个空集
      .attr("class","SenText")
      .attr("id","SenText"+i.toString())
      .attr("x",(x+7))
      .attr("y",(15+20*(i%3)))
      .attr("width",200)
      .style("opacity","0.3")    //字体透明度
      .attr("stroke", "#666666") //字体颜色
      .text(function(){
        var Str = items[i].content;
       if(Str.length>=30)
         Str = Str.substring(0,30)
       // console.log("strppppppppppppppppppppppppp       "+Str)
      
      Str = Str+" ......"
      return Str
        })
  }

d3.selectAll(".Sentences").on("dblclick", function(d,i) {
      // console.log("d3.eventfffffffffffffffffffff")
           d3.selectAll("#Sentences"+i.toString()).attr("fill", "black").style("opacity","1");
           d3.selectAll("#SenText"+i.toString()).style("opacity","1")    //字体透明度
      // .attr("stroke", "#666666") //字体颜色
           .text(function(){
                      var Str = items[i].content;
                       return Str })
      })


//----------------------------ppt显示----------------------------
function DrawPPT()
{
  //新建显示图片的格式
  var svg = document.createElement("div")        
      $(svg).attr("width", main_svg_w)
             .attr("height",80)
  
  var total_ImgLength = 0;
  
  for(var i=0;i<ImgLen;i++){
    var iImgTime = Data_image[i][0].ETime - Data_image[i][0].STime;
    var iImgLength = iImgTime/total_ImgTime*ImgShowLen;

    var divSlide = document.createElement("div");
        divSlide.className = "slide";
        divSlide.id = "slide" + i.toString();
        divSlide.style = "width:" +iImgLength +"px; left:"+total_ImgLength+"px; opacity:0.3;";
    
    var ImgSlide=document.createElement("img");
        ImgSlide.src=Data_image[i][0].Imgurl;
        ImgSlide.className="diapo";
        ImgSlide.id = "diapo" + i.toString();
     
    var TextSlide = document.createElement("div");
        TextSlide.className="text";

        divSlide.appendChild(ImgSlide);
        divSlide.appendChild(TextSlide);
   svg.appendChild(divSlide)

  total_ImgLength += iImgLength;
  }
//----------最后一块控制超出----------
   /*var LastSlide = document.createElement("div");
        LastSlide.className = "slide";
        LastSlide.id = "slide" + i.toString();
        LastSlide.style = "width:" +total_ImgLength +"px; left:"+total_ImgLength+"px;"+"background :white;"+"overflow:hidden";
   svg.appendChild(LastSlide)*/

  $(".img_show").append(svg)   
}

//-------------------------------------------初始化ppt 设置响应事件交互事件-------------------------------------------
$("#slide31").css("background","#ececec");
  //鼠标滑过，PPT放大、时间轴对应显示相关点

  $(".diapo").mouseover(function(){  
    //this.attr("id")
    var Slidei = parseInt($(this).attr("id").split("diapo")[1]);
    pptOver = true;
        $("#diapo"+Slidei.toString()).css("border", "solid"); 
        $("#diapo"+Slidei.toString()).css("border-color", "#0cf"); 
        $("#diapo"+Slidei.toString()).css("border-top-width", "0"); 
        $("#diapo"+Slidei.toString()).css("border-left-width", "7px"); 
        $("#diapo"+Slidei.toString()).css("border-right-width", "7px"); 
        $("#diapo"+Slidei.toString()).css("border-bottom-width", "0"); 
        d3.select("#slide" + Slidei.toString()).style("opacity","1");
    if(Slidei < ImgLen){
      CircleTimeChange(parseInt(Slidei));
      PPTCatalogChange(parseInt(Slidei));
      var slideRight = $("#slide" + (Slidei + 1).toString()).attr("style");
      if(slideRight) var slideright = parseInt(slideRight.split(/;|:|,/)[3]);
      var slideleft = parseInt($("#slide" + (Slidei).toString()).attr("style").split(/;|:|,/)[3]);
      var slidewidth = slideright - slideleft;
      if( slidewidth >= 100 ){
        $("#slide" + (Slidei).toString()).css("bottom","5px");
        CircleTimeChange(parseInt(Slidei));
      }else{
      $("#slide" + (Slidei).toString()).css("bottom","5px");
      MoAnimationMoPPT(parseInt(Slidei));
      
    }
  }
  });

  $(".diapo").mouseout(function(){
    pptClick = false;
    pptOver = false;
    var Slidei = parseInt($(this).attr("id").split("diapo")[1]);
    $("#slide" + (Slidei).toString()).css("bottom","0px");
    d3.select(".PPTtime").remove();
    for(var i = 0; i < qujianLen; i++){
    if(document.getElementById("Catlo" + (i).toString()).getAttribute("display") !== "none"){   
    if(Data_image[Slidei][0].STime>=data_qujian[i][0].STime && Data_image[Slidei][0].ETime<= data_qujian[i][0].ETime){

      if(document.getElementById("Catlo" + (i).toString()).classList.contains("catloPlayed")){
        //是否已经播放过
       if(data_qujian[i][0].STime <= currentTime && data_qujian[i][0].ETime >= currentTime){
        continue;
       }else{
        //已经播放过，且当前并没有播放，所以ppt点击以后，恢复播放过的灰色状态
        document.getElementById("Catlo" + (i).toString()).setAttribute("fill","#c2baa5");
        document.getElementById("node" + (i).toString()).setAttribute("fill","#c2baa5");
        document.getElementById("Catlo" + (i).toString()).setAttribute("style","opacity:0.9;");

        document.getElementById("CatTxt" + (i).toString()).setAttribute("stroke-width","0");
        document.getElementById("CatTxt" + (i).toString()).setAttribute("stroke","#ec0000");
        document.getElementById("CatTxt" + (i).toString()).setAttribute("style","font-family: 'Times New Roman'; opacity: 0.9;");
        document.getElementById("CatTxt" + (i).toString()).setAttribute("fill","#c2baa5");

        document.getElementById("CatTime" + (i).toString()).setAttribute("fill","#c2baa5");
        document.getElementById("CatTime" + (i).toString()).setAttribute("style","opacity:0.9;");
       }
      }else{
       //没有播放过，ppt点击以后，恢复没有播放过的正常状态
       document.getElementById("Catlo" + (i).toString()).setAttribute("fill","rgb(247, 76, 81)");
       document.getElementById("Catlo" + (i).toString()).setAttribute("style","opacity:0.9;");

       document.getElementById("CatTxt" + (i).toString()).setAttribute("stroke-width","0px");
       document.getElementById("CatTxt" + (i).toString()).setAttribute("style","font-style: normal;font-family: 'Times New Roman'; opacity: 0.9;");

       document.getElementById("CatTime" + (i).toString()).setAttribute("style","opacity:0.9;");
       document.getElementById("CatTime" + (i).toString()).setAttribute("stroke-width","0px");
      }
    }
    }
  }

    $("#diapo"+Slidei.toString()).css("border", "none"); 
    d3.selectAll(".Catlo").style("font-size","12px");

  })
  //鼠标双击击，PPT放大、时间轴对应显示相关点，间轴背景高亮突出、播放的时间点跳转到当前位置，目录突出，
  $(".slide").click(function(){
    var Slidei = $(this).attr("id").split("slide")[1];
    pptClick = true;

    player.seekTo(Data_image[parseInt(Slidei)][0].STime,true);
    player.playVideo();

    if(Slidei<ImgLen){
      dblcAnimationMoPPT(parseInt(Slidei))
    }
  });

//--------------------------------------PPT为主的交互方案--------------------------------
//-------------ppt基本功能和对应时间轴、目录功能设计----------------
function AnimationPPTBig(tis){ //放大一张图片
  var SetShowWidth = 100; //设置默认放大大小规格
  var total_ImgTime = 0;
  for(var i=0;i<ImgLen;i++){
    if(i != tis){
       total_ImgTime += Data_image[i][0].ETime - Data_image[i][0].STime;
    }
  }

  var total_ImgLength = 0;
  for(var i=0;i<ImgLen;i++){
     var iImgTime = Data_image[i][0].ETime - Data_image[i][0].STime;
     var iImgLength = iImgTime/total_ImgTime*(ImgShowLen - SetShowWidth);
    if(i == tis){
      var iImgLength = SetShowWidth;
      $("#slide"+i.toString()).css({left:total_ImgLength});
      //点选的ppt向上移动
      
    }
    else{
     
      $("#slide"+i.toString()).css({left:total_ImgLength+"px" }); //attr("left",total_ImgLength+"px");
    }
    total_ImgLength += iImgLength;
  }
}

function PPTCatalogChange(cati){ //点击PPT，目录变化
  //判断PPT属于哪个区间
  for(var i = 0; i < qujianLen; i++){
    if(Data_image[cati][0].STime>=data_qujian[i][0].STime && Data_image[cati][0].ETime<= data_qujian[i][0].ETime){
      d3.selectAll("#Catlo"+i.toString()).attr("fill", "#ff2e00").style("opacity","1");
      d3.selectAll("#CatTxt"+i.toString()).style("font-size","15");
    }
  }
}
//判断在合并区间的长度，求末端区间编号
  function TimeBelong(strati,quBelong){
    var Belongend =  0;
    for(var j=strati;j<qujianLen;j++){
      if(quChange[j].qujian == quBelong){
        Belongend =  j;
      }
    }
    return Belongend;
  }  

function CircleTimeChange(cati){ //点击PPT，时间轴对应区间的显示变化
  //恢复默认设置
  d3.select(".PPTtime").remove();
  
  //判断PPT属于的交互现有状态下的区间
  var i_Start = 0;        //获得PPT对应的最终区间段的初始编号
  var i_End = 0;          //获得PPT对应的最终区间段的末端编号
  var i_Belong = 0;       //获得PPT对应的区间所属编号
  for(var i=0 ; i<qujianLen; i++){
    if(Data_image[cati][0].STime>=quChange[i].STime ){
      i_Start = i;
      i_Belong = quChange[i].qujian;
      i_End = TimeBelong(i,i_Belong);
      if(Data_image[cati][0].ETime <= quChange[i].ETime||Data_image[cati][0].ETime <= quChange[i_End].ETime){  
        break;
      }
    }
  }
  var Total_iTime = quChange[i_End].ETime - quChange[i_Start].STime;
  var Total_iLength = 0;
  for(var i = i_Start;i<=i_End; i++){
    Total_iLength += quChange[i].legth;
  }
 
  var node_id = "#node" + i_Belong.toString();
  var t = $(node_id).attr('transform');
  if(!t) return;
  var part = t.replace("translate(","").replace(")","").split(",");
  var x = parseFloat(part[0]);
  // var Total_iTime = data_qujian[i][0].ETime - data_qujian[i][0].STime;           
  var o_Radius = Total_iLength;
  var p = 1;                      // 默认椭圆初始化为顺时针，向上
  var cx = x + o_Radius;      // 中心点x坐标
  var cy = main_svg_h/2-5;      // 中心点y坐标，且向上
  var rx = o_Radius-offset;     // 长半轴
  var ry = o_Radius>main_svg_h_max?ry = main_svg_h_max:rx;  // 默认为圆 椭圆短半轴,高度过高，半径就重新设定
  
  if(i_Belong%2 == 1){       
      cy = main_svg_h/2+5;      // 椭圆中心点y坐标，向下
      p = 0;  
  }            
  //deal OCR using arc
  var ocrRx = rx+4.5;
  var ocrRy = ry+4.5;
  var TagOSTime = Data_image[cati][0].STime-data_qujian[i_Start][0].STime;
  var TagOETime = Data_image[cati][0].ETime-data_qujian[i_Start][0].STime;
  var OangleStart = TagOSTime/Total_iTime*pi;
  var OangleEnd = TagOETime/Total_iTime*pi;
  var ss_OStartX = -Math.cos(OangleStart)*ocrRx;
  var ss_OStartY = (p==0)?Math.sin(OangleStart)*ocrRy:-Math.sin(OangleStart)*ocrRy;
  var ss_OEndX = -Math.cos(OangleEnd)*ocrRx;
  var ss_OEndY = (p==0)?Math.sin(OangleEnd)*ocrRy:-Math.sin(OangleEnd)*ocrRy;   
  var ssO="M"+ss_OStartX+","+ss_OStartY+" A"+ocrRx +","+ocrRy +" 0 0,"+p+" "+ ss_OEndX +","+ss_OEndY;
      vis.append("path")
       .attr("d", ssO)
       .attr("class","PPTtime")
       .attr("stroke", "#663366")
       .attr("stroke-width","3")
       .attr('fill-opacity', 0)
       .attr("transform", "translate("+ cx + "," + cy + ")")
}

//------------------------ppt设计交互响应事件的实现------------------
//鼠标双击击，PPT放大、时间轴对应显示相关点，时间轴背景高亮突出
function MoAnimationMoPPT(tis)//划过PPT显示效果
{
  AnimationPPTBig(tis);     //放大图片
  CircleTimeChange(tis);    //显示时间轴对应的位置
}

//鼠标双击击，PPT放大，高亮、时间轴对应显示相关点，时间轴背景高亮突出、目录突出，
function CAnimationMoPPT(tis)//点击PPT显示效果
{
   //恢复ppt默认显示设置
  //变形效果
   AnimationPPTBig(tis);     //放大图片
  //设置点击的ppt的显示设置

  //目录变化
  PPTCatalogChange(tis);
  //时间轴背景高亮，显示时间轴相关点
  CircleTimeChange(tis);    //时间轴的变化
}

//鼠标双击击，PPT放大，高亮、时间轴对应显示相关点，时间轴背景高亮突出、播放的时间点跳转到当前位置，目录突出，
function dblcAnimationMoPPT(tis)//双击PPT显示效果
{
  AnimationPPTBig(tis);     //放大图片
  //目录变化
  PPTCatalogChange(tis);
  CircleTimeChange(tis);    //显示时间轴对应的位置
  VideoOpen(tis)

}

//------------------------------------------------时间轴为主的交互方案----------------------------------------------
function IsIncludeImage(SImge,EImage){ // 点击圆放大，判断在该时间段内，包含PPT的数量
  var ImageNum = new Array();
  for(var i=0;i<ImgLen;i++){
    if(Data_image[i][0].STime>=SImge && Data_image[i][0].ETime<= EImage){
       ImageNum.push(i);
    }
  }
  return ImageNum;
}

function ImageChange(PPTi,PPTj)// PPT变化
{
  //恢复ppt默认显示设置
  $(".slide").css("border-left-color", "#fafafa")
  $(".slide").css("border-left-width", "2px");
    //点击圆放大&&连续选择多个圆圈合并
    //设置关联ppt的显示设置,先获得相关联的ppt初始位置，设置初始位置两端的颜色以及之间元素边框的上下颜色
  var SBtime = data_qujian[PPTi][0].STime;
  
  if(PPTj>=qujianLen-1){
    var EBtime = data_qujian[PPTj-1][0].ETime;
  }
  else{
    var EBtime = data_qujian[PPTj][0].STime;
  }
  var GetImageNum = IsIncludeImage(SBtime,EBtime);
  var SHigh = GetImageNum[0]+0;
  var EHigh = GetImageNum[GetImageNum.length - 1] + 1;
  var pptQujian = new Array();
  for(var m = 0; m <ImgLen; m++){
    if(m >= SHigh && m <= EHigh){
      pptQujian.push(m);
      d3.select("#slide" + m.toString()).style("opacity","0.7");
    }else{
      d3.select("#slide" + m.toString()).style("opacity","0.2");
    }
  }
  if(pptQujian.length == 0) {
    var totalImgLength = 0;
    for(var i=0;i<ImgLen;i++){
      var ImgTime = Data_image[i][0].ETime - Data_image[i][0].STime;
      var ImgLength = ImgTime/totalImgLength*ImgShowLen;
      $("#slide"+i.toString()).css({left:totalImgLength });
      totalImgLength += ImgLength;
    }
    return;
  }
  // -----------变形选区----------
  var SetshowWidth = 100; //设定默认缩小大小的最大值
  var SetSmallWidth = 5; //设定默认缩小大小的最小值
  var RestPPTLen = SetSmallWidth*(ImgLen - (EHigh - SHigh ));
  var ShowTotalLen = SetshowWidth * (EHigh - SHigh);
  var total_ImgTime = 0;
  //计算超出最大值的PPT数量，考虑放大超过特定大小的情况。
  var ImageNum = new Array();
  var ImageNumSum = 0;
  var total_ImgTimeTry = 0;
    for(var i=0;i<ImgLen;i++){
      if(i >= SHigh&&i < EHigh){
        total_ImgTimeTry += Data_image[i][0].ETime - Data_image[i][0].STime;
      }
    }
    for(var i=0;i<ImgLen;i++){
      if(i >= SHigh&&i <EHigh){
        var iImgTimeTry = Data_image[i][0].ETime - Data_image[i][0].STime;
        var iImgLengthN = iImgTimeTry/total_ImgTimeTry*(main_svg_w - RestPPTLen); 
        if(iImgLengthN>=SetshowWidth){
          ImageNum.push(1);
          ImageNumSum +=1;
        }
        else
          ImageNum.push(0);
      }
      else
        ImageNum.push(0);
    }
    
  //画PPT
  if(RestPPTLen+ShowTotalLen>main_svg_w){//最小值固定，一定比例放大相关PPT  
    for(var i=0;i<ImgLen;i++){
      if(i >= SHigh&&i < EHigh&&ImageNum[i] ==0 ){
         total_ImgTime += Data_image[i][0].ETime - Data_image[i][0].STime;
      }
    }
    var total_ImgLength = 0;
    for(var i=0;i<ImgLen;i++){
      if(i >= SHigh&&i <EHigh){
        if(ImageNum[i]==0){
          var iImgTime = Data_image[i][0].ETime - Data_image[i][0].STime;
          var iImgLength = iImgTime/total_ImgTime*(main_svg_w - RestPPTLen - ImageNumSum*SetshowWidth); 
        }
        else{
          var iImgLength = SetshowWidth;

        }
        $("#slide"+i.toString()).css({left:total_ImgLength });
      }
      else{
        var iImgLength = SetSmallWidth;
        $("#slide"+i.toString()).css({left:total_ImgLength }); //attr("left",total_ImgLength+"px");
      }
      total_ImgLength += iImgLength;

    }
  }
  else{ //最大值固定，一定比例缩小剩余PPT
    for(var i=0;i<ImgLen;i++){
      if(i < SHigh||i >=EHigh){
         total_ImgTime += Data_image[i][0].ETime - Data_image[i][0].STime;
      }
    }
    var total_ImgLength = 0;
    for(var i=0;i<ImgLen;i++){
      if(i < SHigh||i >= EHigh){
        var iImgTime = Data_image[i][0].ETime - Data_image[i][0].STime;
        var iImgLength = iImgTime/total_ImgTime*(main_svg_w - ShowTotalLen);
        $("#slide"+i.toString()).css({left:total_ImgLength });
      }
      else{
        var iImgLength = SetshowWidth;
        $("#slide"+i.toString()).css({left:total_ImgLength }); //attr("left",total_ImgLength+"px");
      }
      total_ImgLength += iImgLength;
    }
  }
}

function CatalogChange(Cati,Catj)// 点击圆放大&&选择多个圆，目录变化
{
 
  for(var i = 0; i < qujianLen; i++){
   if(i < parseInt(Cati) || i > parseInt(Cati)){
    d3.selectAll("#Catlo"+i.toString()).style("opacity","0.9");
    d3.selectAll("#CatTxt"+i.toString()).attr("stroke-width","0px");
    d3.selectAll("#CatTime"+i.toString()).attr("stroke-width","0px");

    }else if( i == parseInt(Cati) ){
      //当前播放的目录 文字 "fill", "black"  "opacity","1" "font-style","italic" "stroke","#190b06" "stroke-width","1px"
      d3.selectAll("#CatTxt"+i.toString()).attr("fill", "#ec0000").style("opacity","1").attr("stroke","#ec0000").attr("stroke-width","1px");
      document.getElementById("CatTxt"+i.toString()).classList.add("catTxtPlayed");
      //当前播放的目录 时间  "opacity","1"
      d3.selectAll("#CatTime"+i.toString()).attr("fill", "#ec0000").style("opacity","1").attr("stroke","#ec0000").attr("stroke-width","1px");
      document.getElementById("CatTime"+i.toString()).classList.add("catTimePlayed");  
      document.getElementById("Catlo"+i.toString()).classList.add("catloPlayed");
      if(i != selected_Catlo_arr[0]){
        d3.selectAll("#Catlo"+i.toString()).attr("fill", "#ec0000").style("opacity","1");
      }
    }

    var catloPlayedArray = document.getElementsByClassName("catloPlayed");
    for(var j = 0; j < catloPlayedArray.length; j++){
      if(document.getElementsByClassName("catloPlayed")[j].style.opacity == "0.9"){
        document.getElementsByClassName("catloPlayed")[j].setAttribute("fill","#c2baa5");
        
      } 
    }

    var catTxtPlayedArray = document.getElementsByClassName("catTxtPlayed");
    for(var j = 0; j < catTxtPlayedArray.length; j++){
      if(parseInt(document.getElementsByClassName("catTxtPlayed")[j].getAttribute("stroke-width")) == 0){
        document.getElementsByClassName("catTxtPlayed")[j].setAttribute("fill","#c2baa5");
        
      }
    }

    var catTimePlayedArray = document.getElementsByClassName("catTimePlayed");
    for(var j = 0; j < catTimePlayedArray.length; j++){
      if(parseInt(document.getElementsByClassName("catTimePlayed")[j].getAttribute("stroke-width")) == 0){
        document.getElementsByClassName("catTimePlayed")[j].setAttribute("fill","#c2baa5");
      }
    }
  }

}

//-------------------------------视频播放----------------------------------
function VideoOpen(cati){
   //恢复播放点设置
  for(var i=0;i<qujianLen;i++){  
    var Arc_id =".arcQ" +i.toString();
    var Node_id = "#node" + i.toString();
    var t = $(Arc_id).attr("stroke", "rgb(247, 76, 81)");
    d3.select(Node_id).attr("fill","rgb(247, 76, 81)");
  }
  d3.select(".VideoTime").remove();
  //变形，跳转
  var TimeGet = Data_image[cati][0].STime;
  //跳转视频
  setCurrentTime(TimeGet);
  
  //判断时间在那个镜头区间
  var Shot_Belong = 0;
  for(var i = 0;i<shotLen;i++){
    if(data_shot[i][0].STime<=TimeGet && TimeGet<=data_shot[i][0].ETime){
      Shot_Belong = i;
      break;
    }
  }

  //判断时间属于的区间,用于处理最后一快区域变化
  var i_Start = 0;        //获得对应的最终区间段的初始编号
  var i_End = 0;          //获得对应的最终区间段的末端编号
  var i_Belong = 0;       //获得对应的区间所属编号
  for(var i=0 ; i<qujianLen; i++){
    if(TimeGet>=quChange[i].STime ){
      i_Start = i;
      i_Belong = quChange[i].qujian;
      i_End = TimeBelong(i,i_Belong);
      if(TimeGet <= quChange[i].ETime||TimeGet <= quChange[i_End].ETime){  
        break;
      }
    }
  }
  var Total_iTime = quChange[i_End].ETime - quChange[i_Start].STime;
  var Total_iLength = 0;
  for(var i = i_Start;i<=i_End; i++){
    Total_iLength += quChange[i].legth;
  }
 
  var node_id = "#node" + i_Belong.toString();
  var t = $(node_id).attr('transform');
  var part = t.replace("translate(","").replace(")","").split(",");
  var x = parseFloat(part[0]);
  // var Total_iTime = data_qujian[i][0].ETime - data_qujian[i][0].STime;           
  var o_Radius = Total_iLength;
  var p = 1;                      // 默认椭圆初始化为顺时针，向上
  var cx = x + o_Radius;      // 中心点x坐标
  var cy = main_svg_h/2-5;      // 中心点y坐标，且向上
  var rx = o_Radius-offset;     // 长半轴
  var ry = o_Radius>(main_svg_h_max)?ry = main_svg_h_max:rx;  // 默认为圆 椭圆短半轴,高度过高，半径就重新设定
  
  if(i_Belong%2 == 1){       
      cy = main_svg_h/2+5;      // 椭圆中心点y坐标，向下
      p = 0;  
  }            
  
  //deal OCR using arc
  var ocrRx = rx;
  var ocrRy = ry;
  var TagOSTime = data_shot[Shot_Belong][0].STime-data_qujian[i_Start][0].STime;
  var TagOETime = TimeGet-data_qujian[i_Start][0].STime;
  var OangleStart = TagOSTime/Total_iTime*pi;
  var OangleEnd = TagOETime/Total_iTime*pi;
   
  var ss_OStartX = -Math.cos(OangleStart)*ocrRx;
  var ss_OStartY = (p==0)?Math.sin(OangleStart)*ocrRy:-Math.sin(OangleStart)*ocrRy;
  var ss_OEndX = -Math.cos(OangleEnd)*ocrRx;
  var ss_OEndY = (p==0)?Math.sin(OangleEnd)*ocrRy:-Math.sin(OangleEnd)*ocrRy;   
  
  var ssO="M"+ss_OStartX+","+ss_OStartY+" A"+ocrRx +","+ocrRy +" 0 0,"+p+" "+ ss_OEndX +","+ss_OEndY;
      vis.append("path")
       .attr("d", ssO)
       .attr("class","VideoTime")
       .attr("stroke", "#696969")
       .attr("stroke-width","3")
       .attr('fill-opacity', 0)
       .attr("transform", "translate("+ cx + "," + cy + ")")
  
  for(var i=0;i<i_Belong;i++){  
    var Arc_id =".arcQ" +i.toString();
    var Node_id="#node"+i.toString();
    var t = $(Arc_id).attr("stroke", "#696969");
    $(Node_id).attr("fill", "#696969");
  }
  $("#node"+i_Belong.toString()).attr("fill", "#696969")
  var shotIdStart = node_index[i_Belong].shotId
  for(var i =shotIdStart;i<Shot_Belong;i++){
    var Arc_id ="#arcS" +i.toString()+"_"+i_Belong.toString();
    var t = $(Arc_id).attr("stroke", "#696969");
  }
}

function playMedia(startTime,endTime){
  var myVid=document.getElementById("vp");
  myVid.addEventListener("timeupdate",timeupdate);
  var _endTime;
  //设置结束时间
  _endTime = endTime;
   var file = "http://swf.ws.126.net/openplayer/v01/-0-2_M8I8F52DU_M8ISGH1FA-vimg1_ws_126_net//image/snapshot_movie/2012/12/H/9/M8ISGESH9-1430711943278.swf";
   if(!file){
    alert("请指定视频路径");
    return false;
   }
   var url = (window.URL) ? window.URL.createObjectURL(file) : window.webkitURL.createObjectURL(file);
   myVid.src = url;
   myVid.controls = true;
   setTimeout("setCurrentTime('"+startTime+"')",200);
}
//设置视频开始播放事件
function setCurrentTime(startTime){
  var myVid=document.getElementById("vp");
  myVid.addEventListener("timeupdate",timeupdate);
  var _endTime;
  myVid.currentTime=startTime;
  myVid.play();
}

function timeupdate(){
  var myVid=document.getElementById("vp");
  myVid.addEventListener("timeupdate",timeupdate);
  var _endTime;
  //因为当前的格式是带毫秒的float类型的如：12.231233，所以把他转成String了便于后面分割取秒
  var time = myVid.currentTime+"";
  document.getElementById("showTime").value=time;
  var ts = time.substring(0,time.indexOf("."));
  if(ts==_endTime){
    myVid.pause();
  }
}

var player;
//-------------------视频为主的交互-----------------------
//加载youtube api 
      (function(){
        var s = document.createElement("script");
        s.src = "http://www.youtube.com/player_api";
        var before = document.getElementsByTagName("script")[0];
        before.parentNode.insertBefore(s, before);
      })();
      
     
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('vp', {
          
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

var currentState = 0;
//获取视频播放时间，每秒刷新一次，目录、时间轴等进行相应变化
var currentTime = 0;
var arcPlaying;
//当点击、双击、悬浮ppt时，显示点击、双击、悬浮ppt的状态，而不显示随着视频播放时间的状态，当鼠标移开，恢复显示随着视频播放时间的状态
var pptClick = false;
var pptOver = false;
var tagClick = false;
var catMouseover = false;

function onPlayerStateChange(){
  
 // 目录、ppt、时间轴大圆圈随着视频播放的自然变化
  function getTime(){
    currentTime = player.getCurrentTime();
    currentState = player.getPlayerState();
    //目录播放到框选的最后一个圈结束就暂停
    if(selected_Catlo_arr.length != 0){
      if(currentTime >= data_qujian[selected_Catlo_arr[selected_Catlo_arr.length-1]][0].ETime){
               player.pauseVideo();
            }
    }
    //播放到的ppt抬起来
    if(arcDeleted){
      for(var i = 0; i < ImgLen; i++){
      if(Data_image[i][0].STime < currentTime && Data_image[i][0].ETime > currentTime){
        d3.select("#slide" + i.toString()).style("opacity","1");
      }else if(!pptOver){
        /*$("#slide" + i.toString()).css("bottom","0px");*/
        d3.select("#slide" + i.toString()).style("opacity","0.2");
      }
    }
    }
    
    
  //ppt mouseout以后，恢复突出显示时间轴对应的一段PPt
   if(!pptOver){
    for(var i=0; i<qujianLen; i++){
      if(data_qujian[i][0].STime <= currentTime && data_qujian[i][0].ETime >= currentTime){
        ImageChange(parseInt(i), parseInt(i) + 1);
        CatalogChange(parseInt(i), parseInt(i) + 1);
      }
    }
  }

    //时间轴变大 
    if(currentState == 1){
    for(var i=0; i<qujianLen; i++){
      if(data_qujian[i][0].STime <= currentTime && data_qujian[i][0].ETime >= currentTime){
        if(document.getElementById("circle" + i.toString()) !=null){
        if( IsBrush == 1 && d3.select("#circle"+i.toString()).attr("rx") >= 90){
          break;
        }else{
          document.getElementById("circle"+i.toString()).classList.add("circlePlayed");
          document.getElementById("circle"+i.toString()).setAttribute("fill","rgba(255,124,128,0.3)");
          return activateEllipse(i);
        }
      }
    }
  }
}else{clearInterval(iID);} 

  //播放过的大圆圈变成灰色
  var circlePlayedList = document.getElementsByClassName("circlePlayed");
    for(var m = 0; m < circlePlayedList.length; m++){
      if(document.getElementsByClassName("circlePlayed")[m].getAttribute("rx") >= 90 ){
        continue;
      }else {
        document.getElementsByClassName("circlePlayed")[m].setAttribute("fill","#d2d2d2");
      }
    }

    //区间之间的小圆圈变色，做法是当大圆圈变灰色时，大圆圈左边边的小圆圈变灰
    
    for(m = 0; m < qujianLen; m++){
      var nodeFill = document.getElementById("Catlo" + (m).toString()).getAttribute("fill");
      $("#node"+m.toString()).attr("fill",nodeFill);
    }
}
  var iID = setInterval(getTime,1500);


//弧线变色，首先根据shot的etime获取对应是哪一个shot，再根据quchange得到是哪一个区间的shot
function arcplay(){
  currentTime = player.getCurrentTime();
  currentState = player.getPlayerState();
  

  for(var i = 0; i < shotLen; i++){
    //当前播放的弧线
    if(data_shot[i][0].STime <= currentTime && data_shot[i][0].ETime >= currentTime){
      for(var j = 0; j < quChange.length; j++){
        if(quChange[j].STime <= currentTime && quChange[j].ETime >= currentTime){
          arcPlaying = "arcS" + i.toString() + "_" + (quChange[j].qujian).toString();
          if(document.getElementById(arcPlaying)){
          document.getElementById(arcPlaying).setAttribute("stroke-width","5"); 
          document.getElementById(arcPlaying).setAttribute("stroke","#ec0000"); 
          document.getElementById(arcPlaying).classList.add("arcPlayed");
          }
    
        }
      }
    }    
  }

//当前没有播放的弧线，根据区间去遍历所有的弧线
    for(var j = 0; j < quChange.length; j++){
      var arcQujian = document.getElementsByClassName("arcQ" + j.toString());
      for(var m = 0; m < arcQujian.length; m++){
        var arcNotPlaying = arcQujian[m].getAttribute("id");
        
         if(arcNotPlaying != arcPlaying){
           document.getElementById(arcNotPlaying).setAttribute("stroke-width","4"); 
           if(arcQujian[m].classList.contains("arcPlayed")){
           document.getElementById(arcNotPlaying).setAttribute("stroke","#696969");
           }            
        }
      }
    }
}
setInterval(arcplay,2000);
}
