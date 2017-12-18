<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>MOOCTube</title>	
	<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Orbitron" />
	
	<script src="/js/jquery.min.js"></script>
	<script src="/js/bootstrap.min.js"></script>
	<script src="/js/d3.v3.js"></script>
	<script src="/js/d3.layout.cloud.js"></script>
	<script type="text/javascript" src="/js/main.js"></script>

	<!-- Latest compiled and minified CSS -->

<link rel="stylesheet" type="text/css" href="/css/bootstrap.css">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="/css/main.css" />
</head>
<body>
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!-- <a class="navbar-brand" href="index.html">MOOC<span style="color:#F79626;">Tube</span></a> -->
				<a class="navbar-brand" href="index.php"><span id="MOOC">Video</span><span id="tube">Vis</span></a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
					<li>
                        <form class="navbar-form navbar-left" role="search">
							<div class="form-group">
								<input id="searchTxt" type="text" class="form-control" placeholder="Search...">
							</div>
							 <!--<button type="submit" class="btn btn-default">Submit</button>-->
						</form>
                    </li>

                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
	<div class="container">
	<div id="main">
<!-- 		<div class="col-lg-12"  style="height: 50px;font-size: 14px;padding-left: 0px;padding-top: 5px;">
			<span class="glyphicon glyphicon-info-sign" aria-hidden="true" style="color:#555;margin-right:5px; "></span>Currently, the system has indexed more than <span style="color:#ff3d00;font-size: 16px;font-weight: bolder;">180,000</span> open educational resources videos from 84 YouTube channels!
		</div> -->
		<div class="col-lg-12 Channels" id="firstpage" style="margin-bottom: 0px;">
			<p>Channels</p>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
				<img class="channel-header-profile-image" src="/img/-yjj95JJQEm8.jpg" title="TEDx Talks" alt="TEDx Talks"></div>
				<div class="channeltitle">TEDx Talks</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
				<img class="channel-header-profile-image" src="/img/-VO_A5Tys4WY.jpg" title="nptelhrd" alt="nptelhrd"></div>
				<div class="channeltitle">nptelhrd</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
				<img class="channel-header-profile-image" src="/img/-sPuzJIGp7jI.jpg" title="UCBerkeley" alt="UCBerkeley"></div>
				<div class="channeltitle">UCBerkeley</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
				<img class="channel-header-profile-image" src="/img/-HKgDgCtmG8g.jpg" title="University of California Television (UCTV)" alt="University of California Television (UCTV)"></div>
				<div class="channeltitle">University of California Television</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
				<img class="channel-header-profile-image" src="/img/-Sxo3Mp6e4Bg.jpg" title="Khan Academy" alt="Khan Academy"></div>
				<div class="channeltitle">Khan Academy</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
				<img class="channel-header-profile-image" src="/img/-OojyL2VZrjg.jpg" title="O&#39;Reilly" alt="O&#39;Reilly"></div>
				<div class="channeltitle">O&#39;Reilly</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
				<img class="channel-header-profile-image" src="/img/-XpQot0v3Sc0.jpg" title="World Economic Forum" alt="World Economic Forum"></div>
				<div class="channeltitle">World Economic Forum</div>
			</div>
			</a>		
			<a href="#">
			<div class="channel">
				<div class="channelimg">
				<img class="channel-header-profile-image" src="/img/-h0e5TkEDX-4.jpg" title="The Aspen Institute" alt="The Aspen Institute"></div>
				<div class="channeltitle">The Aspen Institute</div>
			</div>
			</a>		
		</div>
		<div class="col-lg-12" id="expenddiv">view more</div>

		<div class="col-lg-12" id="firstpage">
			<p>Subjects</p>

			<a href="#">
			<div class="channel">
				<div class="channelimg">
						<img class="channel-header-profile-image" src="/img/math.png">
				</div>
				<div class="channeltitle">Mathmatics</div>
			</div>
			</a>				
			<a href="#">
			<div class="channel">
				<div class="channelimg">
						<img class="channel-header-profile-image" src="/img/cs.png">
				</div>
				<div class="channeltitle">Computer Science</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
						<img class="channel-header-profile-image" src="/img/language.png">
				</div>
				<div class="channeltitle">Language</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
						<img class="channel-header-profile-image" src="/img/chemistry.png">
				</div>
				<div class="channeltitle">Chemistry</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
						<img class="channel-header-profile-image" src="/img/biology.png">
				</div>
				<div class="channeltitle">Biology</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
						<img class="channel-header-profile-image" src="/img/astronomy.png">
				</div>
				<div class="channeltitle">Astronomy</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
						<img class="channel-header-profile-image" src="/img/geography.png">
				</div>
				<div class="channeltitle">Geography</div>
			</div>
			</a>
			<a href="#">
			<div class="channel">
				<div class="channelimg">
						<img class="channel-header-profile-image" src="/img/medicine.png">
				</div>
				<div class="channeltitle">Medicine</div>
			</div>
			</a>
		</div>
		<!-- </div> -->
		<div class="col-lg-12" id="Popularvideos">
			<p>Popular Videos</p>
			<div class="Popularvideosgrid">
				<a href="watch/index.php?v=UF8uR6Z6KLc">
					<div class="Popularvideosimg">
							<img src="https://i.ytimg.com/vi/UF8uR6Z6KLc/hqdefault.jpg">
					</div>
					<div class="Popularvideostitle">Steve Jobs' 2005 Stanford Commencement Address</div>
					<div class="Popularvideosuploader"><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  Stanford</div>
					<div class="Popularvideosuploaderdate"><span class='glyphicon glyphicon-time' aria-hidden='true'></span> 2008-03-07</div>
					<div class="Popularvideosviewcnt"><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span> 26055147</div>
				</a>
			</div>
			
			<div class="Popularvideosgrid">
				<a href="watch/index.php?v=ji5_MqicxSo">
					<div class="Popularvideosimg">
							<img src="https://i.ytimg.com/vi/ji5_MqicxSo/hqdefault.jpg">
					</div>
					<div class="Popularvideostitle">Randy Pausch Last Lecture: Achieving Your Childhood Dreams</div>
					<div class="Popularvideosuploader"><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  Carnegie Mellon University</div>
					<div class="Popularvideosuploaderdate"><span class='glyphicon glyphicon-time' aria-hidden='true'></span> 2007-12-20</div>
					<div class="Popularvideosviewcnt"><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span> 18375446</div>
				</a>
			</div>
			
<!-- 			<div class="Popularvideosgrid">
				<a href="watch/index.php?v=QEllLECo4OM">
					<div class="Popularvideosimg">
							<img src="https://i.ytimg.com/vi/QEllLECo4OM/hqdefault.jpg">
					</div>
					<div class="Popularvideostitle">Carl Orff: Carmina Burana</div>
					<div class="Popularvideosuploader"><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  University of California Television</div>
					<div class="Popularvideosuploaderdate"><span class='glyphicon glyphicon-time' aria-hidden='true'></span> 2008-02-07</div>
					<div class="Popularvideosviewcnt"><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span> 15881343</div>
				</a>
			</div>	 -->

			<div class="Popularvideosgrid">
				<a href="watch/index.php?v=u6XAPnuFjJc">
					<div class="Popularvideosimg">
							<img src="https://i.ytimg.com/vi/u6XAPnuFjJc/hqdefault.jpg">
					</div>
					<div class="Popularvideostitle">RSA ANIMATE: Drive: The surprising truth about what motivates us</div>
					<div class="Popularvideosuploader"><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  The RSA</div>
					<div class="Popularvideosuploaderdate"><span class='glyphicon glyphicon-time' aria-hidden='true'></span> 2010-04-01</div>
					<div class="Popularvideosviewcnt"><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span> 15316603</div>
				</a>
			</div>	
			<div class="Popularvideosgrid">
				<a href="watch/index.php?v=zDZFcDGpL4U">
					<div class="Popularvideosimg">
							<img src="https://i.ytimg.com/vi/zDZFcDGpL4U/hqdefault.jpg">
					</div>
					<div class="Popularvideostitle">RSA ANIMATE: Changing Education Paradigms</div>
					<div class="Popularvideosuploader"><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  The RSA</div>
					<div class="Popularvideosuploaderdate"><span class='glyphicon glyphicon-time' aria-hidden='true'></span> 2010-10-14</div>
					<div class="Popularvideosviewcnt"><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span> 14441254</div>
				</a>
			</div>	

			<div class="Popularvideosgrid">
				<a href="watch/index.php?v=7TXEZ4tP06c">
					<div class="Popularvideosimg">
							<img src="https://i.ytimg.com/vi/7TXEZ4tP06c/hqdefault.jpg">
					</div>
					<div class="Popularvideostitle">Why people believe they can’t draw - and how to prove they can | Graham Shaw | TEDxHull</div>
					<div class="Popularvideosuploader"><span class='glyphicon glyphicon-user' aria-hidden='true'></span>  TEDx Talks</div>
					<div class="Popularvideosuploaderdate"><span class='glyphicon glyphicon-time' aria-hidden='true'></span> 2015-04-01</div>
					<div class="Popularvideosviewcnt"><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span> 13044907</div>
				</a>
			</div>	


		</div>
	
	<footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Sun Yat-Sen University 2017</p>
                </div>
            </div>
    </footer>
	</div>
<script type="text/javascript">

	$('#searchTxt').keypress(function (e) {
	 var key = e.which;
	 if(key == 13)  // the enter key code
	  {
	  	//alert("hehe");
    	var url = "/tocluster?q=" + encodeURIComponent(this.value);
		window.location.href=url;
		return false;
	  }
	});

    var queryString = new Array();
    $(function () {
        if (queryString.length == 0) {
            if (window.location.search.split('?').length > 1) {
                var params = window.location.search.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var key = params[i].split('=')[0];
                    var value = decodeURIComponent(params[i].split('=')[1]);
                    queryString[key] = value;
                }
            }
        }
        // console.log(queryString)
        if(queryString["q"]){
        	$('#searchTxt').val(queryString["q"]);
        	ajax_search(queryString["q"],queryString["page"]);
        }
        
    });
</script>
<script type="text/javascript">
$("#expenddiv").click(function(){
	
	$("#expenddiv").text("-")

	console.log("url");
	xmlHttpSearch = GetXmlHttpObject();
	if (xmlHttpSearch == null) {
		alert("Browser does not support HTTP Request");
		return;
	}
	var url = "src/channel_search.php";
	console.log(url);
	xmlHttpSearch.onreadystatechange = searchchannelCompleted;
	xmlHttpSearch.open("GET", url, true);
	xmlHttpSearch.send(null);
})
function searchchannelCompleted() {
	// $('#divPager').remove();
	if (xmlHttpSearch.readyState == 4 || xmlHttpSearch.readyState == "complete") {
		var response = eval("(" + xmlHttpSearch.responseText + ")");
		var info = response.result;
		channel_info = info.videoinfo
		// $('#videocnt').text(total);
		$(".Channels").find("a").remove();
		href = document.createElement('a');
		for ( var i = 0; i < channel_info.length; i++) {
			href = document.createElement('a');
			$(href).attr("class","newposter");
			$(href).attr("href","#");
			$(href).append("<div class='channel'><div class='channelimg'><img class='channel-header-profile-image' src=''></div><div class='channeltitle'>TEDx Talks</div></div>")
			$(href).find(".channel-header-profile-image").attr("src",channel_info[i].channel_poster)
			$(href).find(".channeltitle").text(channel_info[i].channel_title)
			$(".Channels").append(href);

		}
		$(".Channels").css("height","auto");
	}
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

</script>
</body>
</html>