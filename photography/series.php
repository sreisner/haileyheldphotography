<?php
    require_once 'utils.php';

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

    echo json_encode(getSeries());
?>