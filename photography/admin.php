<?php
    require_once 'utils.php';
    require_once 'constants.php';

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $target_file = IMAGE_FOLDER . '/' . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
            $uploadOk = ($check !== false);
            if(file_exists($target_file)) {
                $uploadOk = 0;
            }
            
        }
        $success = move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);
        $name = hash_file('md5', $target_file);
        rename($target_file, IMAGE_FOLDER . '/' . $name . '.jpg');
        registerPhoto($_POST["series"], $_POST["caption"], $name);
        header('Location: index.php');
    }

    function echoSeriesOptions() {
        $series = getSeries();
        for($i = 0; $i < count($series); $i++) {
            $current = $series[$i];
            echo '<option value="' . $current["id"] . '">' . $current["name"] . '</option>';
        }
    }

?>
<html>
    <head>
        <link rel="stylesheet" href="css/admin.css">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
              integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ=="
              crossorigin="anonymous">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"
              integrity="sha384-aUGj/X2zp5rLCbBxumKTCw2Z50WgIr1vs/PFN4praOTvYXWlVyh2UtNUU0KAUhAX"
              crossorigin="anonymous">

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"
                integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ=="
                crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <label for="series">Series:</label>
                    <select name="series">
                        <?php
                            echoSeriesOptions();
                        ?>
                    </select>
                </label>
            </div>

            <table class="table">
                <tr>
                    <th>Image</th>
                    <th>Caption</th>
                    <th></th>
                </tr>
                <?php
                    $images = getImagesInSeries(1);
                    for($i = 0; $i < count($images); $i++) {
                        $image = $images[$i];
                        echo '<tr>';
                        echo '    <td>';
                        echo '        <div class="cropped">';
                        echo '            <img src="' . IMAGE_FOLDER . '/' . $image['filename'] . '.jpg' . '">';
                        echo '        </div>';
                        echo '    </td>';
                        echo '    <td>';
                        echo          $image['caption'];
                        echo '    </td>';
                        echo '    <td>';
                        echo '        <a href="#">Delete</a>';
                        echo '    </td>';
                        echo '</tr>';
                    }
                ?>
            </table>
            <form method="post" enctype="multipart/form-data">
                <div class="h1 text-center">The Admin Panel of <strong>DOOM</strong></div>

                <div class="form-group">
                    <label for="series">Series:</label>
                    <select class="form-control" name="series">
                        <?php
                            echoSeriesOptions();
                        ?>
                    </select>
                </div>

                <div class="form-group">
                    <label for="caption">Caption:</label>
                    <input class="form-control" type="text" name="caption" id="caption">
                </div>
                
                <div class="form-group"> <label for="fileToUpload">Image</label>
                    <input type="file" name="fileToUpload" id="fileToUpload">
                    <p class="help-block">Only .jpg's right now.</p>
                </div>
                <button type="submit" name="submit" class="btn btn-default">Upload</button>
            </form>
        </div>
    </body>
</html>
