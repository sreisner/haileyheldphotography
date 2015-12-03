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

        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

        <!-- Google Fonts -->
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Raleway:400,200'>

        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"> 
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

        <!-- PhotoSwipe -->
        <link rel="stylesheet" href="css/photoswipe/photoswipe.css">
        <link rel="stylesheet" href="css/photoswipe/default-skin.css">
        <script src="js/photoswipe/photoswipe.min.js"></script>
        <script src="js/photoswipe/photoswipe-ui-default.min.js"></script>
        
        <link rel="stylesheet" href="css/style.css">

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
    <body>
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
                <div class="image-preview-container">
                    <img src="images/1.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
                <div class="image-preview-container">
                    <img src="images/2.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
                <div class="image-preview-container">
                    <img src="images/3.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="image-preview-container">
                    <img src="images/1.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
                <div class="image-preview-container">
                    <img src="images/2.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
                <div class="image-preview-container">
                    <img src="images/3.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="image-preview-container">
                    <img src="images/1.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
                <div class="image-preview-container">
                    <img src="images/2.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
                <div class="image-preview-container">
                    <img src="images/3.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="image-preview-container">
                    <img src="images/1.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
                <div class="image-preview-container">
                    <img src="images/2.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
                <div class="image-preview-container">
                    <img src="images/3.jpg" />
                    <div class="image-preview-overlay"></div>
                </div>
            </div>
        </div>
        <!--
        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <div class="pswp__counter"></div>
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button class="pswp__button pswp__button--share" title="Share"></button>
                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                              <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div> 
                    </div>
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                    </button>
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                    </button>
                    <div class="pswp__caption">
                        <div class="pswp__caption__center"></div>
                    </div>
                </div>
            </div>
        </div>
        -->
    </body>
</html>
