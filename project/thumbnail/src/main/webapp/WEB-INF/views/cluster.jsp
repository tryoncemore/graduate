<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>MOOCTube</title>
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
			<a class="navbar-brand" href="../"><span id="MOOC">MOOC</span><span
				id="tube">Tube</span></a>
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
	<div class="container">
		<div id="main">
			<div class="col-lg-5" id="left">clustering</div>
			<div class="col-lg-7" id="right">
				<div id="search_result_info">
					<span id="videocnt"></span> results.
				</div>

				<div id="search_result">

					<!--<ul id="og-grid" class="og-grid">
				
				 <li class='video_li'>
					<a class='videolink'>
						<div class='divPoster'>
						<img src='https://i.ytimg.com/vi/lAPvdnBGsrI/maxresdefault.jpg'><span class='duration'>12:12:12</span>
						</div>
						<div class='divInfo'>
							<div class='divTitle'>123</div>
							<div class='divDescription'>123323233</div>
							<div class='divUploader'>
								<div><span class='glyphicon glyphicon-time' aria-hidden='true'></span><span>20170210</span></div>
								<div><span class='glyphicon glyphicon-user' aria-hidden='true'></span><span class='uploader'>baoquan</span></div>
								<div><span class='glyphicon glyphicon-eye-open" aria-hidden="true'> </span><span class='viewcnt'>2000</span></div>
							</div>
						</div>
					</a>
				</li> 
			</ul>-->
				</div>
				<div id='divPager'>
					<ul class='pager' id='pagerid'></ul>
				</div>
				<!-- <div>
			<img src="https://i.ytimg.com/vi/lapwgqzWC5g/hqdefault.jpg">
			<p>Dangerous Object: Hallmark Dummy Launcher - Wired</p>
			</div>
			
			<img src="https://i.ytimg.com/vi/lAPvdnBGsrI/maxresdefault.jpg">
			<img src="https://i.ytimg.com/vi/lApQhSopgds/maxresdefault.jpg">
			<img src="https://i.ytimg.com/vi/LaP3JZS0PYQ/maxresdefault.jpg"> -->
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
		function oSearchSuggest(searchFuc) {
			var input = $('#searchTxt');
			var suggestWrap = $('#gov_search_suggest');
			var key = "";
			var init = function() {
				input.bind('keyup', sendKeyWord);
				input.bind('blur', function() {
					setTimeout(hideSuggest, 100);
				})
			}
			var hideSuggest = function() {
				suggestWrap.hide();
			}

			//发送请求，根据关键字到后台查询
			var sendKeyWord = function(event) {

				//键盘选择下拉项
				if (suggestWrap.css('display') == 'block'
						&& event.keyCode == 38 || event.keyCode == 40) {
					var current = suggestWrap.find('li.hover');
					if (event.keyCode == 38) {
						if (current.length > 0) {
							var prevLi = current.removeClass('hover').prev();
							if (prevLi.length > 0) {
								prevLi.addClass('hover');
								input.val(prevLi.html());
							}
						} else {
							var last = suggestWrap.find('li:last');
							last.addClass('hover');
							input.val(last.html());
						}

					} else if (event.keyCode == 40) {
						if (current.length > 0) {
							var nextLi = current.removeClass('hover').next();
							if (nextLi.length > 0) {
								nextLi.addClass('hover');
								input.val(nextLi.html());
							}
						} else {
							var first = suggestWrap.find('li:first');
							first.addClass('hover');
							input.val(first.html());
						}
					}

					//输入字符
				} else {
					var valText = $.trim(input.val());
					if (valText == '' || valText == key) {
						return;
					}
					searchFuc(valText);
					key = valText;
				}

			}
			//请求返回后，执行数据展示
			this.dataDisplay = function(data) {
				if (data.length <= 0) {
					suggestWrap.hide();
					return;
				}

				//往搜索框下拉建议显示栏中添加条目并显示
				var li;
				var tmpFrag = document.createDocumentFragment();
				suggestWrap.find('ul').html('');
				for (var i = 0; i < data.length; i++) {
					li = document.createElement('LI');
					li.innerHTML = data[i];
					tmpFrag.appendChild(li);
				}
				suggestWrap.find('ul').append(tmpFrag);
				suggestWrap.show();

				//为下拉选项绑定鼠标事件
				suggestWrap.find('li').hover(function() {
					suggestWrap.find('li').removeClass('hover');
					$(this).addClass('hover');

				}, function() {
					$(this).removeClass('hover');
				}).bind('click', function() {
					//alert(this.innerHTML);
					input.val(this.innerHTML);
					suggestWrap.hide();
				});
			}
			init();
		};

		//实例化输入提示的JS,参数为进行查询操作时要调用的函数名
		var searchSuggest = new oSearchSuggest(sendKeyWordToBack);

		//这是一个模似函数，实现向后台发送ajax查询请求，并返回一个查询结果数据，传递给前台的JS,再由前台JS来展示数据。本函数由程序员进行修改实现查询的请求
		//参数为一个字符串，是搜索输入框中当前的内容
		function sendKeyWordToBack(keyword) {
				 $.ajax({
						   type: "POST",
						   url: "/getRelatedWords",
						   async:false,
						   data: "key="+keyword,
						   dataType: "json",
						   success: function(data){
							 console.log(data);
							 var aData = [];
							 for(var i=0;i<data.length;i++){
									//以下为根据输入返回搜索结果的模拟效果代码,实际数据由后台返回
									
								if(data[i]!=""){
									  aData.push(data[i]);
								}
							 }
							//将返回的数据传递给实现搜索输入框的输入提示js类
							 searchSuggest.dataDisplay(aData);
						   }
			 });	  
/*
			//以下为根据输入返回搜索结果的模拟效果代码,实际数据由后台返回
			var aData = [];
			aData.push(keyword + 'return data 1');
			aData.push(keyword + 'return data 2');
			aData.push(keyword + 'return data 3');
			aData.push(keyword + 'return data 4');
			aData.push(keyword + 'return data 5');
			aData.push(keyword + 'return data 6');
			//将返回的数据传递给实现搜索输入框的输入提示js类
			searchSuggest.dataDisplay(aData);
			*/

		}

		$('#searchTxt').keypress(function(e) {
			var key = e.which;
			if (key == 13) // the enter key code
			{
				var url = "/tocluster?q=" + encodeURIComponent(this.value);
				window.location.href = url;
				return false;
			}
		});

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
			}
			// console.log(queryString)
			if (queryString["q"]) {
				$('#searchTxt').val(queryString["q"]);
				ajax_search(queryString["q"], queryString["page"]);
			}

		});
	</script>
</body>
</html>