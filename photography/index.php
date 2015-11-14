<?php
    require_once "../external_includes/utils.php";
?>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
        <link href='https://fonts.googleapis.com/css?family=Raleway:400,200' rel='stylesheet' type='text/css'>
    </head>
    <body>
        <div id="nav-bar">
            <div id="logo">
                <p>Hailey Held Photography</p>
            </div>
            <div id="link-section">
                <div id="site-links">
                    <a href="index.html">Gallery</a>
                    <a href="book.html">Book Me</a>
                    <a href="about.html">About</a>
                </div>
                <div id="social-links">
                    <a href="https://www.instagram.com/haileyheld/"><i class="fa fa-instagram"></i></a>
                    <a href="https://www.facebook.com/haileyheldphotography/"><i class="fa fa-facebook-square"></i></a>
                    <a href="https://www.flickr.com/photos/haileyheld"><i class="fa fa-flickr"></i></a>
                </div>
            </div>
        </div>
        <div id="gallery">
            <div class="gallery-col" id="col1">
                <?php
                    echoGalleryColumn(1);
                ?>
            </div>
            <div class="gallery-col" id="col2">
                <?php
                    echoGalleryColumn(2);
                ?>
            </div>
            <div class="gallery-col" id="col3">
                <?php
                    echoGalleryColumn(3);
                ?>
            </div>
            <div class="gallery-col" id="col4">
                <?php
                    echoGalleryColumn(4);
                ?>
            </div>
        </div>
    </body>
</html>
