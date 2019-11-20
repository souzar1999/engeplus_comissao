<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Seller;
use App\Sell;
use App\SellItem;

class SellsController extends Controller
{ 
    public function index(Seller $seller)
    {
        $sells = DB::table('sells')->where('seller_id', $seller->id)->get();
        
        $return = [];

        foreach ($sells as $sell){
            $mountSell = new Sell;
            $mountSell = $sell;

            $commission = DB::table('sell_items')
                ->select(DB::raw('sum(commission) as commission'))
                ->where('sell_id', $sell->id)
                ->pluck('commission'); 
                
            $value = DB::table('sell_items')
                ->select(DB::raw('sum(value) as value'))
                ->where('sell_id', $sell->id)
                ->pluck('value');
                
            $mountSell->commission = $commission[0];
            $mountSell->value = $value[0];
            array_push($return, $mountSell);
        }

        return $return;
    }
    
    public function show(Seller  $seller, Sell $sell)
    {
        return $sell;
    }

    public function store(Request $request, Seller $seller)
    {
        $sell = new Sell;
        $sell->description = $request->description;
        $sell->seller_id = $seller->id;

        return response()->json($seller->sells()->save($sell), 201);
    }
    
    public function delete(Seller $seller, Sell $sell)
    {
        return response()->json($sell->delete(), 204);
    }
}
