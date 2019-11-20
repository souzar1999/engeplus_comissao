<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    protected $fillable = ['name', 'start_at'];
    protected $dates = ['start_at'];
    
    public function sells()
    {
        return $this->hasMany('App\Sell');
    }
}
