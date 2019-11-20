<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SellItem extends Model
{
    protected $fillable = ['value', 'type', 'sell_id'];
    
    public function sell()
    {
        return $this->belongsTo('App\Sell');
    }
}
