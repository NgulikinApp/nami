<?php
    /**
       * Check if request is an AJAX call
       *
       * @param string $script script path
    */
    function check_is_ajax($script) {
        $isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest' OR isset($_SERVER['BACKUP_FIREFOX_AJAX']) AND strtolower($_SERVER['BACKUP_FIREFOX_AJAX']);
        if(!$isAjax) {
            die('Access denied');
        }
    }
    
    check_is_ajax(__FILE__); // prevent direct access
?>