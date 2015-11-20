<?php
    require_once 'utils.php';

    $seriesId = $_REQUEST["seriesId"];

    if($seriesId !== '') {
        echoImageGrid($seriesId);
    }
?>
