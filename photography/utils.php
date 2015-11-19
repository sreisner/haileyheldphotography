<?php
    require_once '../external_includes/config.php';
    require_once 'constants.php';

    function getImagesInSeries($seriesId) {
        $conn = getDatabaseConnection();
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
        $html = '';
        $html .= '<div class="img-container">';
        $html .= '    <img id="' . $id . '" src="' . IMAGE_FOLDER . '/' . $filename . '.jpg" />';
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
