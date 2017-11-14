<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Video Thumbnail</title>
<link rel="stylesheet" type="text/css"
	href="//fonts.googleapis.com/css?family=Orbitron" />

<script src="/js/jquery.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/d3.min.js"></script>
<script src="/js/d3.layout.cloud.js"></script>
<script type="text/javascript" src="/js/carrotsearch.foamtree.js"></script>
<script type="text/javascript" src="/js/hammer.min.js"></script>
<script type="text/javascript" src="/js/jqcloud-1.0.4.js"></script>
<script type="text/javascript" src="/js/main.js"></script>

<!-- Latest compiled and minified CSS -->

<link rel="stylesheet" type="text/css" href="/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="/css/jqcloud.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="/css/main.css" />
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
	<div class="container">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse"
				data-target="#bs-example-navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<!-- <a class="navbar-brand" href="index.html">MOOC<span style="color:#F79626;">Tube</span></a> -->
			<a class="navbar-brand" href="../"><span id="tube">Video
					Thumbnail</span></a>
		</div>
		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse"
			id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav navbar-right">
				<li>
					<form class="navbar-form navbar-left" role="search">
						<div class="form-group">
							<input id="searchTxt" type="text" class="form-control"
								placeholder="Search...">
							<div class="search_suggest" id="gov_search_suggest">
								<ul>
								</ul>
							</div>
						</div>
						<!--<button type="submit" class="btn btn-default">Submit</button>-->
					</form>
				</li>


			</ul>
		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container --> </nav>
	<div id="main">
		<div id="left">
			<ul id="video" class="og-grid">

			</ul>

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
		$(function() {
			var videos=['40riCqvRoMs','F7Id9caYw-Y','xMj_P_6H69g'];
			$ul=$("#video");
			for(var i=0;i<videos.length;i++){
				$li=$("<li class='video_li'></li>");
				$li.attr("id",videos[i]);
				
				$div1=$("<div class='divPoster'></div>");
				$img=$("<img></img>");
				$img.attr("src","/data/thumbnail/"+videos[i]+"/default.jpg");
				$img.attr("id","img_"+videos[i]);
				$div1.append($img);
				$li.append($div1);
				
				$div2=$("<div class='divInfo row'></div>");
				$form=$("<form class='navbar-form navbar-left col-md-12'></form>");
				$div3=$("<div class='form-group'></div>");
				$input=$("<input type='text' class='form-control'>")
				$input.attr("id","query_"+videos[i]);
				$div3.append($input);
				$form.append($div3);
				$button=$("<button type='button' class='btn btn-default' onclick='changeImg(this)'>Search</button>");
				$button.attr("id","search_"+videos[i]);
				
				$form.append($button);
				$div2.append($form);
				$div4=$("<div></div>");
				$div4.attr("id","wordcloud_"+videos[i]);
				$div4.attr("class","col-md-12");
				
				$.ajax({
					url:"/data/keywords/"+videos[i]+".json",
					async:false,
					success:function(data){
						$div4.jQCloud(data,{
							width:700,
							height:130
						});

					}
				});
				$div2.append($div4);
				$li.append($div2);
				
				$ul.append($li);
			}

		});
		
		function changeImg(e){
			var videos=['40riCqvRoMs','F7Id9caYw-Y','xMj_P_6H69g'];
			var id=e.getAttribute('id');
			var videoid=id.substring(7,id.length)
			var query=$("#query_"+videoid).val();
			$.ajax({
				url:"/getThumbnail/"+videoid+"/"+query,
				success:function(data){
					$("#img_"+videoid).attr("src",data);
				}
			});
			//$("#img_"+videoid).attr("src","/data/thumbnail/"+videos[Math.floor(Math.random()*10)%3]+"/default.jpg");
							

		}
	</script>
</body>
</html>