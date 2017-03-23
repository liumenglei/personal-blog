<?php
    print_r($_POST);
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>完整demo</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <script type="text/javascript" charset="utf-8" src="ueditor1_4_3_3-utf8-php/utf8-php/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="ueditor1_4_3_3-utf8-php/utf8-php/ueditor.all.min.js"> </script>
    <style type="text/css">
        div{
            width:100%;
        }
    </style>
</head>
<body>
<form action="" method="post" accept-charset="utf-8">
    <script id="editor" type="text/plain" name="content" style="width:1024px;height:300px;"></script>
    <input type="submit" name="sub" value="提交">
</form>

<script type="text/javascript">
var ue = UE.getEditor('editor');
</script>
</body>
</html>