<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use phpseclib\Net\SSH2;
use phpseclib\Crypt\RSA;


class repos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */




    protected $signature = 'repos:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Actualiza los repos de storage/vendor';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
	$repos=["api_kprima",
            	"objects-nagios",
            	'scripts-nagios'
    		];



        $user= env('SSH_USER');
        $pass= env('SSH_PASS');
        $key= env('SSH_KEY');

        
        if(empty($key)){
            $ssh = new SSH2('127.0.0.1');
            if (!$ssh->login($user,$pass)) {
                Log::info('SSH Login Failed');
            }
        }else{
            $rsa=new RSA();
            $rsa->loadKey(file_get_contents($key));
            $ssh =new SSH2('127.0.0.1');
            if (!$ssh->login($user,$rsa)) {
                Log::info('RSA Login Failed');
            }
        }
	foreach($repos as $repo){

		$path='/var/www/html/ecore/api/websocket/storage/vendor/';
		Log::info($repo);
	 $result = $ssh->exec("cd {$path}{$repo};sudo git remote set-url origin https://rydwidefense:Wide.1906\!@github.com/widefense/{$repo};sudo git reset --hard; sudo git pull;");
        Log::info($result);

	}

    }
}
