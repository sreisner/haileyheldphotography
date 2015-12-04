<?php
    require_once '../external_includes/config.php';

    function getImages($seriesId) {
        $conn = getDatabaseConnection();
        $sql = 'SELECT id, filename, caption, series, upload_date FROM photo WHERE series = ' . $seriesId . ' ORDER BY upload_date DESC';
        $results = $conn->query($sql);
        $images = array();
        for($i = 0; $row = $results->fetch_assoc(); $i++) {
            $images[$i] = $row;
        }
        return $images;
    }

    $seriesId = $_REQUEST["seriesId"];
    echo json_encode(getImages($seriesId));
?>