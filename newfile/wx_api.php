<?php
// set_time_limit(0);
ini_set("max_execution_time", "0");
// print_r(get_loaded_extensions());
//phpinfo();
header('Content-Type:text/html;charset=utf-8');
//获取access_token
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxacbf3a67b67e2491&secret=7485fa4486ee96ac42667d9b98d460ec
$access_token = "CjL6u5g_dGvG2u5rOIj6NvQmhOPsbebYRgs5nvIH819XbfK3kcuS_ZWGIwEZR7_Z5TddZBtJgQO3p7iAmFVjqXRiKCn1zgLsfHCrr-qYmeT00eieB0U2Yvli2gFnCpjOIYSeABACSM";
//获取的二维码ticket，生成二维码参数文件
$title = "wx_unit1";
// $list_unit = file_get_contents("{$title}.txt");
// $list_scan_pcs = explode("\r\n", $list_unit);
// $url = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=' . $access_token;
// foreach ($list_scan_pcs as $key => $value) {
//    $v = explode("----", $value);
//    $data = '{"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_id": ' . $v[0] . '}}}';
//    $res = curl_post($url, $data);
//    if ($res) {
//        $ticket = $res['ticket'];
//        file_put_contents("{$title}_tick.txt", "{$v[1]}\t{$ticket}\r\n", FILE_APPEND);
//        sleep(1);
//    } else {
//        echo "{$value}获取失败！<br>";
//        print_r($res);
//        echo '<br>';
//    }
// }

// 生成二维码图片
$unit_tick = file_get_contents("{$title}_tick.txt");
$list_tick = explode("\r\n", $unit_tick);
$path = 'xsga';
if(!is_readable($path))
    {
        is_file($path) or mkdir($path,0700);  
    }
foreach ($list_tick as $k => $value) {
    if (!$value) {
        continue;
    }
    $v = explode("\t", $value);
    $file_name = $path."/{$v[0]}.jpg";
    $file_name = mb_convert_encoding($file_name, 'gbk', "UTF-8");
    if (is_file($file_name)) {
        continue;
    }
    $url='http://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='.urlencode($v[1]);
    file_put_contents($file_name, file_get_contents($url));
    sleep(1);
}
exit('ok');
function curl_post($url, $data) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); // https请求 不验证证书和hosts
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $handles = curl_exec($ch);
    if (curl_errno($ch)) {
        echo curl_error($ch);
        exit($url);
    }
    curl_close($ch);
    $data = json_decode($handles, true);
    return $data;
}
echo 111;