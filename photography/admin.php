<?php
    require_once 'utils.php';

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $target_dir = 'images/';
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
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
        rename($target_file, $target_dir . $name . '.jpg');
        registerPhoto(1, $name);
        header('Location: index.php');
    }

?>
<html>
    <head>
    </head>
    <body>
        <div class="series">
            <select>
                <?php
                    echoSeriesOptions();
                ?>
            </select>
        </div>
        <div class="upload">
            <form method="post" enctype="multipart/form-data">
                Select image to upload:
                <input type="file" name="fileToUpload" id="fileToUpload">
                <input type="submit" value="Upload Image" name="submit">
            </form>
        </div>
    </body>
</html>
