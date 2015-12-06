<?php
    require_once '../external_includes/config.php';
    
    function deletePhoto($imageId) {
        $conn = getDatabaseConnection();
        $sql = 'DELETE FROM photo WHERE id = ' . $imageId;
        $conn->query($sql);
    }

    $imageId = $_GET["image"];
    deletePhoto($imageId);
?>