<?php
require_once "./vendor/autoload.php";
use prodigyview\network\Request;
use prodigyview\network\Router;
use prodigyview\network\Response;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$STREAM_API_KEY = getenv("STREAM_API_KEY");
$STREAM_API_SECRET = getenv("STREAM_API_SECRET");

$client = new GetStream\StreamChat\Client($STREAM_API_KEY, $STREAM_API_SECRET);

//Create And Process The Current Request
$request = new Request();

//Get The Request Method(GET, POST, PUT, DELETE)
$method = strtolower($request->getRequestMethod());

function getToken($username){
    global $client;
    $token = array('token'=>$client->createToken($username));
    return $token;
}

//Token route:: Allwos you to generate a token from the username that was sent
Router::post('/token', array('callback'=>function(Request $request){
    //RETRIEVE Data From The Request
    $data = $request->getRequestData('array');

    if ($data && isset($data['username']) ){
        $token = getToken($data['username']);
        echo Response::createResponse(200, json_encode($token));
    }else{
        $data = array('status' => 'Invalid request');
        echo Response::createResponse(200, json_encode($data));
    }
}));

Router::setRoute();





