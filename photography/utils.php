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

    
    function getSeries() {
        $conn = getDatabaseConnection();
        $sql = 'SELECT id, name FROM series';
        $results = $conn->query($sql);
        $series = array();
        for($i = 0; $row = $results->fetch_assoc(); $i++) {
            $series[$i] = $row;
        }
        return $series;
    }

    function echoImageGrid($seriesId) {
        $images = getImagesInSeries($seriesId);
        for($i = 0; $i < 4; $i++) {
            echo '<div class="col-sm-12 col-md-3">';
            for($j = $i; $j < count($images); $j += 4) {
                $current = $images[$j];
                $path = 'images' . '/' . $current['filename'] . '.jpg';
                echo getImageContainerHTML($current['id'], $path);
            }
            echo '</div>';
        }
    }

    function getImageContainerHTML($id, $path) {
        $html = '';
        $html .= '<div class="img-container">';
        $html .= '    <img id="' . $id . '" src="' . $path . '" />';
        $html .= '    <div class="img-overlay"></div>';
        $html .= '</div>';

        return $html;
    }

    function registerPhoto($seriesId, $caption, $filename) {
        $conn = getDatabaseConnection();
        $sql = 'INSERT INTO photo (series, caption, filename)
                VALUES (' . $seriesId . ', "' . $caption . '", "' . $filename . '")';
        $conn->query($sql);
    }

?>
