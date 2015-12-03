<?php
    require_once 'utils.php';
    require_once 'constants.php';

    function echoSeriesListItems() {
        $series = getSeries();
        for($i = 0; $i < count($series); $i++) {
            $current = $series[$i];
            echo '<li><a class="series-link" id="' . $current["id"] . '" onclick="onSeriesClick(this)">' . $current["name"] . '</a></li>';
        }
    }

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="imagetoolbar" content="no" />

        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

        <!-- Google Fonts -->
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Raleway:400,200'>

        <!-- JQuery -->
        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>

        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"> 
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        
        <!-- Custom Styles -->
        <link rel="stylesheet" href="css/style.css">

        <!-- Custom javascript -->
        <script src="js/index.js"></script>

        <!-- Google Analytics -->
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-70470640-1', 'auto');
            ga('send', 'pageview');
        </script>
    </head>
    <body onload="onload()">
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbarHeaderCollapse">
                         <span class="sr-only">Toggle navigation</span>
                         <span class="icon-bar"></span>
                         <span class="icon-bar"></span>
                         <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Hailey Held Photography</a>
                </div>
                <div id="navbarHeaderCollapse" class="navbar-collapse collapse navbar-right">
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                               role="button" aria-haspopup="true" aria-expanded="false">
                                <span id="current-series"></span>
                                <span class="caret"></span>
                            </a>
                        </li>
                        <li><a href="about.php" class="navbar-link">About</a></li>
                        <li class="social-links"> 
                            <a href="https://www.instagram.com/haileyheld/"><i class="fa fa-instagram"></i></a>
                            <a href="https://www.facebook.com/haileyheldphotography/"><i class="fa fa-facebook-square"></i></a>
                            <a href="https://www.flickr.com/photos/haileyheld"><i class="fa fa-flickr"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="gallery">
            <div class="col-sm-6 col-md-3">
                <div class="image-preview-container" data-caption="I am Hailey">
                    <img src="images/1.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">I am Hailey</p>
                    </div>
                </div>
                <div class="image-preview-container" data-caption="I like graffiti">
                    <img src="images/2.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">I like graffiti</p>
                    </div>
                </div>
                <div class="image-preview-container" data-caption="Wow.  Windows.">
                    <img src="images/3.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">Wow.  Windows.</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="image-preview-container" data-caption="I am Hailey">
                    <img src="images/4.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">I am Hailey</p>
                    </div>
                </div>
                <div class="image-preview-container" data-caption="I like graffiti">
                    <img src="images/5.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">I like graffiti</p>
                    </div>
                </div>
                <div class="image-preview-container" data-caption="Wow.  Windows.">
                    <img src="images/6.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">Wow.  Windows.</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="image-preview-container" data-caption="I am Hailey">
                    <img src="images/7.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">I am Hailey</p>
                    </div>
                </div>
                <div class="image-preview-container" data-caption="I like graffiti">
                    <img src="images/8.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">I like graffiti</p>
                    </div>
                </div>
                <div class="image-preview-container" data-caption="Wow.  Windows.">
                    <img src="images/9.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">Wow.  Windows.</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="image-preview-container" data-caption="I am Hailey">
                    <img src="images/10.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">I am Hailey</p>
                    </div>
                </div>
                <div class="image-preview-container" data-caption="I like graffiti">
                    <img src="images/11.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">I like graffiti</p>
                    </div>
                </div>
                <div class="image-preview-container" data-caption="Wow.  Windows.">
                    <img src="images/12.jpg" />
                    <div class="image-preview-overlay-container">
                        <div class="image-preview-overlay-rectangle"></div>
                        <p class="image-preview-overlay-caption">Wow.  Windows.</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="imageModal" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title"></h4>
                    </div>
                    <div class="modal-body">
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
