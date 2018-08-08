<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SocketController extends Controller
{

    private $appId = "5122c8b7dbde7907";
    private $key = "d947d3866208002d616e12490ed0a5cc";


    public function channels(Request $request)
    {
        $appId = $this->appId;
        $key = $this->key;

        $client = new \GuzzleHttp\Client();

        $response = $client->get("https://ecore.widefense.com:6001/apps/$appId/channels", [
            'headers' => [
                'Authorization' => "Bearer $key",
            ],
            'json' => [
                'appId' => $appId,
            ],
        ]);

        return $response->getBody();
    }

    public function kprimasChannels(Request $request)
    {
        $appId = $this->appId;
        $key = $this->key;

        $client = new \GuzzleHttp\Client();

        $response = $client->get("https://ecore.widefense.com:6001/apps/$appId/channels", [
            'headers' => [
                'Authorization' => "Bearer $key",
            ],
            'json' => [
                'appId' => $appId,
            ],
        ]);

        $data = json_decode($response->getBody());
        $channels = $data->channels;

        $arr = [];
        foreach ($channels as $key => $value) {
            if (0 === strpos($key, "private-kprima.")) {
                $arr[$key] = $value;
            }
        }

        return $arr;
    }

    public function users(Request $request)
    {
        $appId = $this->appId;
        $key = $this->key;

        $client = new \GuzzleHttp\Client();

        $response = $client->get("https://ecore.widefense.com:6001/apps/$appId/channels/presence-clients/users", [
            'headers' => [
                'Authorization' => "Bearer $key",
            ],
            'json' => [
                'appId' => $appId,
            ],
        ]);

        return $response->getBody();
    }

    public function kprimas(Request $request)
    {
        $appId = $this->appId;
        $key = $this->key;

        $client = new \GuzzleHttp\Client();

        $response = $client->get("https://ecore.widefense.com:6001/apps/$appId/channels/presence-kprimas/users", [
            'headers' => [
                'Authorization' => "Bearer $key",
            ],
            'json' => [
                'appId' => $appId,
            ],
        ]);

        return $response->getBody();
    }

}

