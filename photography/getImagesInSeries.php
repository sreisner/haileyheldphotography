<?php
    require_once 'utils.php';

    $seriesId = $_REQUEST["seriesId"];

    if($seriesId !== '') {
        echo json_encode(getImagesInSeries($seriesId));
    }
?>
