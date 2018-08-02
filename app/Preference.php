<?php

namespace App;

class Preference extends Model
{
    protected $table = "preferences";

    /* cols editables */
    protected $fillable = [
        "user_id",
        "client_id",
    ];

    /* cols ocultas por defecto */
    protected $hidden = [
        "enabled",
    ];

    /**
     * Get the user.
     */
    public function user()
    {
        // belongsTo('App\Model', 'local_key', 'external_key');
        return $this->belongsTo('App\User');
    }

    /**
     * Get the client.
     */
    public function client()
    {
        // belongsTo('App\Model', 'local_key', 'external_key');
        return $this->belongsTo('App\Client');
    }
}
