<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="description" content="">
				<meta name="author" content="">

					<title>VideoVis</title>
					<link href="css2/css.css" rel="stylesheet" type="text/css" />
					<link rel="stylesheet" type="text/css" href="/css/jqcloud.css">
						<!-- Bootstrap Core CSS -->
						<link href="css2/bootstrap.min.css" rel="stylesheet">
							<link href="css2/main2.css" rel="stylesheet">
								<!-- Custom CSS -->
								<link href="css2/modern-business.css" rel="stylesheet">
</head>

<body>
	<!-- Navigation -->
	<div class="navbarvis" role="navigation">
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="/index"><p>VideoVis</p></a>
			</div>
			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav navbar-right">
					<li>
						<form class="navbar-form navbar-left" role="search">
							<div class="form-group">
								<input type="text" id="queryword" class="form-control"
									placeholder="Search">
							</div>
							<!--<button type="submit" class="btn btn-default">Submit</button>-->
						</form>
					</li>

				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container -->
	</div>

	<!-- Page Content -->
	<div class="container">

		<!-- Marketing Icons Section -->
		<div class="row">
			<div class="col-md-6 left">
				<div class="upper-left" id="video">
					<iframe class="videoplayer" id="vp" src="" frameborder="0"
						allowfullscreen></iframe>
					<!-- <video id="video1" autoplay="autoplay" controls > -->
					<!-- <video class="videoplayer" id="vp" preload="auto" controls="controls">
                        <source src="video/ailisi.mkv" type="video/mkv"/>Your browser does not support the video tag.
                    </video> -->
				</div>
			</div>
			<div class="col-md-6 right">
				<div class="upper-right" id="thumbnail"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="shotShow">
					<div id="center">
						<div id="slider" class="img_show"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="row" id="segment"></div>

		<div class="row">
			<div class="col-lg-12">
				<div class="navbottom">&copy;2017 videovis.com</div>
			</div>
		</div>


	</div>




	<!-- jQuery -->
	<script src="js/jquery.js"></script>
	<script src="js/d3.min.js"></script>
	<script type="text/javascript" src="/js/hammer.min.js"></script>
	<script type="text/javascript" src="/js/jqcloud-1.0.4.js"></script>
	<!-- Bootstrap Core JavaScript -->
	<script type="text/javascript">
		var queryString = new Array();
		$(function() {
			if (queryString.length == 0) {
				if (window.location.search.split('?').length > 1) {
					var params = window.location.search.split('?')[1]
							.split('&');
					for (var i = 0; i < params.length; i++) {
						var key = params[i].split('=')[0];
						var value = decodeURIComponent(params[i].split('=')[1]);
						queryString[key] = value;
					}
				}
				// ajax_search(encodeURIComponent("cancer"));
			}
			//init
			var videoId = queryString["videoId"];
			//search text
			$('#queryword').val(queryString["q"]);
			//video player
			var videoUrl = "http://www.youtube.com/embed/" + videoId
					+ "?&rel=0&autohide=1&autoplay=1&start=0";
			$("#vp").attr('src', videoUrl);

			//thumbnail

			$.ajax({
				url : "/getThumbnail/" + queryString["videoId"] + "/"
						+ queryString["q"],
				success : function(data) {
					imgdiv = $("#thumbnail");
					$img = $("<img></img>");
					$img.attr("src", data);
					imgdiv.append($img);
				}
			});

			//Silder
			var main_svg_w = 1130;
			var svg = $("<div></div>");
			svg.attr("width", main_svg_w).attr("height", 180);
			var total_ImgLength = 0;
			for (var i = 0; i < 41; i++) {
				var divSlide = document.createElement("div");
				divSlide.className = "slide";
				divSlide.id = "slide" + i.toString();
				divSlide.style = "width:" + 40 + "px; left:" + total_ImgLength
						+ "px; opacity:0.3;";

				var ImgSlide = document.createElement("img");
				ImgSlide.src = "img/SBD/" + queryString["videoId"] + "/" + i
						+ ".jpg";
				ImgSlide.className = "diapo";
				ImgSlide.id = "diapo" + i.toString();

				divSlide.appendChild(ImgSlide);
				svg.append(divSlide);
				total_ImgLength += 40;
			}
			$(".img_show").append(svg);

			//segment
			$.ajax({
				url : "/data/segmentInfos/" + queryString["videoId"] + ".json",
				success : function(data) {

					for (var i = 0; i < data.length; i++) {
						var segment = data[i];
						var keywords = segment.keywords;
						var imgPath = segment.imgPath;

						$div1 = $("<div></div>");
						$div1.attr('class', 'col-lg-3');
						$img = $("<img></img>");
						$img.attr('src', imgPath);
						$img.attr('id', 's' + i + '_img');
						$img.attr('class', 'segment_img');
						$div1.append($img);
						$("#segment").append($div1);

						$div2 = $("<div></div>");
						$div2.attr('class', 'col-lg-3');
						$div2.attr('id', 's' + i + '_wc');
						$div2.jQCloud(keywords, {
							width : 255,
							height : 165
						});
						$("#segment").append($div2);
					}

				}
			});
		});
	</script>


</body>


<!-- // <script type="text/javascript" src="js/jqueryCloud/jqcloud.2.0.1.js"></script> -->

</html>