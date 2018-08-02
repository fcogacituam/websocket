<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Laravel\Lumen\Auth\Authorizable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements JWTSubject, AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    protected $table = "users";

    /* cols editables */
    protected $fillable = [
        "name",
        "email",
        "role",
        "alpha_access",
        "beta_access",
    ];

    /* cols ocultas por defecto */
    protected $hidden = [
        'password',
        'retries',
    ];

    public function preferences()
    {
        // hasMany('App\Model', 'external_key', 'local_key');
        return $this->hasMany('App\Preference');
    }

    // /**
    //  * Get the password for the user.
    //  *
    //  * @return string
    //  */
    // public function getAuthPassword()
    // {
    //     return $this->Pass;
    // }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
