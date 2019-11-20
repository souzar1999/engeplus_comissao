<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sell extends Model
{
    protected $fillable = ['description', 'seller_id'];

    public function seller()
    {
        return $this->belongsTo('App\Seller');
    }
    
    public function sellitems()
    {
        return $this->hasMany('App\SellItem');
    }
}
