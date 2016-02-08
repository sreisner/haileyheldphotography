<?php
    require_once '../external_includes/config.php';
    
    function updatePhoto($imageId, $series, $caption) {
        $conn = getDatabaseConnection();
        $sql = 'UPDATE photo SET series = ' . $series . ', caption = "' . $caption . '" WHERE id = ' . $imageId;
        $conn->query($sql);
    }

    $imageId = $_GET["image"];
    $series = $_GET["series"];
    $caption = $_GET["caption"];
    updatePhoto($imageId, $series, $caption);
?>