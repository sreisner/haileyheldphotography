<?php
    require_once '../external_includes/config.php';

    function getImagesInSeries($seriesId) {
        $conn = getDatabaseConnection();
        $image_folder = "images";
        $sql = "SELECT id, series, filename, caption, upload_date
                FROM photo
                WHERE series=" . $seriesId . "
                ORDER BY upload_date DESC";
        $result = $conn->query($sql);
        $images = array();
        if($result->num_rows > 0) {
            for($i = 0; $row = $result->fetch_assoc(); $i++) {
                $images[$i] = $row;
            }
        }
        return $images;
    }

    function getImageContainerHTML($id, $filename) {
        // TODO:  Put this variable in config.php, or somewhere else that's global.
        $image_folder = 'images';

        $html = '';
        $html .= '<div class="img-container">';
        $html .= '    <img id="' . $id . '" src="' . $image_folder . '/' . $filename . '.jpg" />';
        $html .= '    <div class="img-overlay"></div>';
        $html .= '</div>';

        return $html;
    }

    function echoSeriesOptions() {
        $conn = getDatabaseConnection();
        $sql = "SELECT id, name FROM series";
        $result = $conn->query($sql);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo '<option value="' . $row["id"] . '">' . $row["name"] . '</option>';
            }
        }
    }

    function registerPhoto($seriesId, $caption, $filename) {
        $conn = getDatabaseConnection();
        $sql = 'INSERT INTO photo (series, caption, filename)
                VALUES (' . $seriesId . ', "' . $caption . '", "' . $filename . '")';
        $conn->query($sql);
    }

?>
