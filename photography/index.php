<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="imagetoolbar" content="no" />

        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

        <!-- JQuery -->
        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>

        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"> 
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        
        <!-- Custom Styles -->
        <link rel="stylesheet" href="css/site.css">
        <link rel="stylesheet" href="css/index.css">

        <!-- Custom Javascript -->
        <script src="js/site.js"></script>
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
        <div class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbarHeaderCollapse">
                         <span class="sr-only">Toggle navigation</span>
                         <span class="icon-bar"></span>
                         <span class="icon-bar"></span>
                         <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">hailey held photography</a>
                </div>
                <div id="navbarHeaderCollapse" class="navbar-collapse collapse navbar-right">
                    <ul class="nav navbar-nav">
                        <li id="navbar-series" class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                               role="button" aria-haspopup="true" aria-expanded="false">
                                <span id="current-series"></span>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu"></ul>
                        </li>
                        <li id="navbar-about"><a class="navbar-link" onclick="onAboutClick()">about</a></li>
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
            <div class="container-fluid">
                <div class="col-sm-6 col-md-3 gallery-column"></div>
                <div class="col-sm-6 col-md-3 gallery-column"></div>
                <div class="col-sm-6 col-md-3 gallery-column"></div>
                <div class="col-sm-6 col-md-3 gallery-column"></div>
            </div>
        </div>
        <div id="about">
            <div class="container-fluid">
                <div class="col-xs-12 col-md-4">
                    <div class="row">
                        <img id="profile-image" src="images/6b8bc2cc42ce97a8f33e3b25eb59c271.jpg" />
                    </div>
                </div>
                <div class="col-xs-12 col-md-8">
                    <div class="row">
                        <div class="about-text">
                            <p>
                            Cray shabby chic seitan, direct trade swag crucifix literally bitters umami tattooed narwhal post-ironic tofu. Pitchfork shabby chic paleo, hammock fanny pack slow-carb flannel. Roof party aesthetic marfa pinterest lomo, hoodie dreamcatcher helvetica flexitarian yr. Gluten-free craft beer shabby chic, asymmetrical vinyl pour-over iPhone cornhole kitsch. Food truck kitsch cray paleo, cliche lumbersexual normcore vinyl wayfarers quinoa seitan retro meh flexitarian. Artisan tattooed roof party occupy, kombucha letterpress sriracha. Taxidermy quinoa lumbersexual, blog before they sold out ugh helvetica organic ethical.
                            </p>

                            <p>
                            Hoodie artisan narwhal roof party occupy, echo park tofu tousled letterpress typewriter. Migas williamsburg selfies wayfarers hoodie, tacos fixie wolf bushwick 90's listicle bicycle rights seitan VHS neutra. Banjo hoodie celiac retro. YOLO art party letterpress, typewriter crucifix organic scenester jean shorts sriracha. Brunch chambray letterpress, cray shabby chic before they sold out bicycle rights. Pabst ramps messenger bag chillwave. Godard photo booth crucifix cray franzen food truck, beard craft beer roof party flannel tumblr pop-up stumptown jean shorts.
                            </p>

                            <p>
                            Butcher fixie slow-carb scenester, single-origin coffee yuccie bespoke hoodie etsy godard meggings shabby chic normcore sustainable. Twee try-hard schlitz, intelligentsia plaid aesthetic stumptown readymade beard chambray heirloom cred pug. Umami street art fap freegan polaroid, kitsch artisan master cleanse dreamcatcher gluten-free plaid PBR&B beard farm-to-table. Lo-fi narwhal cronut fingerstache. Polaroid green juice you probably haven't heard of them, plaid selfies cray bitters master cleanse raw denim celiac pabst aesthetic. Cronut artisan kombucha squid, health goth knausgaard you probably haven't heard of them seitan literally VHS bitters bespoke kinfolk kickstarter. Beard celiac irony, hashtag austin flexitarian four loko.
                            </p>
                        </div>
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
