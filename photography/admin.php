<?php
    require_once '../external_includes/config.php';

    $image_upload_success = false;
    $error_message = '';

    function registerPhoto($seriesId, $caption, $filename) {
        $conn = getDatabaseConnection();
        $sql = 'INSERT INTO photo (series, caption, filename)
                VALUES (' . $seriesId . ', "' . $caption . '", "' . $filename . '")';
        $conn->query($sql);

        if(mysqli_error($conn)) {
            $error_message = 'Database error.  Email Shawn.  ' . mysqli_error($conn);
        }
    }

    function convertImageToJpeg($originalImagePath, $outputImagePath, $quality) {
        $file_type = pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION);
        switch($file_type) {
            case 'jpg':
            case 'jpeg':
                $tempImage = imagecreatefromjpeg($originalImagePath);
                break;
            case 'png':
                $tempImage = imagecreatefrompng($originalImagePath);
                break;
            default:
                return 0;
        }
        imagejpeg($tempImage, $outputImagePath, $quality);
        imagedestroy($tempImage);

        return 1;
    }

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $seriesId = $_POST["series"];
        $caption = $_POST["caption"];
        $image_temp_name = $_FILES["fileToUpload"]["tmp_name"];
        if($seriesId == '') {
            $error_message = 'You must select a series.';
        } else if($image_temp_name == '') {
            if($_FILES["fileToUpload"]['error'] == UPLOAD_ERR_INI_SIZE) {
                $error_message = 'Image must be < 32M.  Tell Shawn if that\'s a problem and we can raise the limit.';
            } else if($_FILES["fileToUpload"]['error'] == UPLOAD_ERR_NO_FILE) {
                $error_message = 'You must select a file to upload.';
            } else if($_FILES["fileToUpload"]['error']) {
                $error_message = 'Internal error #' . $_FILES["fileToUpload"]['error'] . '. Tell Shawn.';
            } else {
                $error_message = 'Okay, there\'s really no reason for this happening.  Tell Shawn.';
            }
        } else {
            $file_hash = hash_file('md5', $image_temp_name);
            $target_path = 'images/' . $file_hash . '.jpg';
            if(!file_exists($target_path)) {
                $success = convertImageToJpeg($image_temp_name, $target_path, 50);
                if(!$success) {
                    $error_message = "Unsupported file format.  Only jpg/jpeg/png allowed.";
                }
            }

            registerPhoto($seriesId, $caption, $target_path);
            $image_upload_success = strlen($error_message) == 0;
        }
    }
?>
<html>
    <head>
        <!-- JQuery -->
        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>

        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

        <!-- Custom Styles -->
        <link rel="stylesheet" href="css/site.css">
        <link rel="stylesheet" href="css/admin.css">

        <!-- Custom Javascript -->
        <script src="js/site.js"></script>
        <script src="js/admin.js"></script>

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
        <div class="row">
            <div class="page-header h1 text-center">
                the admin panel of <strong>doom</strong>
            </div>
        </div>

        <div class="container">
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#upload" aria-controls="upload" role="tab" data-toggle="tab">upload</a></li>
                <li role="presentation"><a href="#manage" aria-controls="manage" role="tab" data-toggle="tab">manage</a></li>
            </ul>

            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="upload">
                    <div class="page-header h2">upload</div>
                    <form method="post" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-xs-9">
                                <div class="form-group">
                                    <label for="fileToUpload">image</label>
                                    <input type="file" name="fileToUpload" id="fileToUpload">
                                </div>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <label for="series">series</label>
                                    <select id="upload-series" class="series form-control" name="series"></select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label for="caption">caption</label>
                                    <input class="form-control" type="text" name="caption" id="caption">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-9">
                                <button type="submit" name="submit" class="btn btn-default">upload</button>
                            </div>
                        </div>
                    </form>
                    <?php
                        if($error_message) {
                            echo '<div class="alert alert-danger" role="alert">' . $error_message . '</div>';
                        } else if($image_upload_success) {
                            echo '<div class="alert alert-success" role="alert">Image uploaded successfully.</div>';
                        }
                    ?>
                </div>
                <div role="tabpanel" class="tab-pane" id="manage">
                    <div class="page-header h2">manage</div>
                    <div class="row">
                        <div class="col-xs-8">
                            <div class="row preview-series-row">
                                <div class="col-xs-3">
                                    <label for="series">series</label>
                                    <select id="preview-series" class="series form-control" name="series" onchange="updateManageGallery()"></select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12" id="gallery">
                                    <div class="col-sm-3 gallery-column"></div>
                                    <div class="col-sm-3 gallery-column"></div>
                                    <div class="col-sm-3 gallery-column"></div>
                                    <div class="col-sm-3 gallery-column"></div>
                                </div>
                            </div>
                        </div>
                        <div id="manage-form" class="col-xs-4">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label for="caption">series</label>
                                    <select id="edit-series" class="series form-control" name="series"></select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <label for="caption">caption</label>
                                    <input id="edit-caption" class="form-control" type="text" name="caption">
                                </div>
                            </div>
                            <div class="row text-right edit-buttons-row">
                                <div class="col-xs-12">
                                    <button type="button" class="btn btn-danger" id="delete-image-button" onclick="deleteImage()">delete</button>
                                    <button type="button" class="btn btn-primary" id="save-image-button" onclick="saveImageMetadata()">save</button>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
