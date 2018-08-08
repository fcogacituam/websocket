<?php

namespace App;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class Model extends EloquentModel {

    protected $hidden = ['created_at', 'updated_at'];

}

