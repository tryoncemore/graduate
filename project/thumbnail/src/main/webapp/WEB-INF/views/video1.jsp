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
    <!-- Bootstrap Core CSS -->
    <link href="css2/bootstrap.min.css" rel="stylesheet">
    <link href="css2/main2.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css2/modern-business.css" rel="stylesheet">
    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css" rel="stylesheet">
    

</head>

<body>
    <!-- Navigation -->
    <div class="navbarvis" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.php"><p>VideoVis</p></a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
					<li>
                        <form class="navbar-form navbar-left" role="search">
							<div class="form-group">
								<input type="text" id="queryword" class="form-control" placeholder="Search">
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
        <div class="row" >
            <div class="col-md-6 left">
                <div class="upper-left" id="video">
					<iframe class ="videoplayer"id="vp" src="https://www.youtube.com/watch?v=40riCqvRoMs" frameborder="0" allowfullscreen></iframe>
                    <!-- <video id="video1" autoplay="autoplay" controls > -->
                    <!-- <video class="videoplayer" id="vp" preload="auto" controls="controls">
                        <source src="video/ailisi.mkv" type="video/mkv"/>Your browser does not support the video tag.
                    </video> -->
                </div>
            </div>
            <div class="col-md-6 right">
                <div class="upper-right" id="thumbnail">
					
                </div>
            </div>
            <div class="col-lg-12">
                <div class="shotShow">
                        <div id="center">
                            <div id="slider" class="img_show">
                        
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-lg-12">
                <!-- <div id="sentences_form" class="setences">
                    <p class="ppt-text"></p>
                </div> -->
            </div>
            </div>
           

    </div>
    <div class="navbottom">
        &copy;2017 videovis.com
    </div>
     <script src="js2/d3.min.js"></script>
    <script src="js2/jquery-1.12.2.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="js2/jqcloud-1.0.4.js" type="text/javascript" charset="utf-8"></script> 
    <script src="js2/bootstrap.min.js"></script>
    <!-- jQuery -->
    <script src="js2/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js2/bootstrap.min.js"></script>

    <!-- Script to Activate the Carousel -->
    <script>
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    })
    </script>
    <script type="text/javascript">
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
                    // ajax_search(encodeURIComponent("cancer"));
                }
                $('#queryword').val(queryString["q"]);
                if( $("#queryword").val()!=""){
                ajax_search(queryString["q"]);
               
                }
            });
    </script>
 

</body>

    <script src="js2/jqcloud-1.0.4.js" type="text/javascript" charset="utf-8"></script>
    <!-- // <script type="text/javascript" src="js/jqueryCloud/jqcloud.2.0.1.js"></script> -->
    <script src="js2/video.js"></script>
</html>