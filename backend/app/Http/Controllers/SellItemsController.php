<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Seller;
use App\Sell;
use App\SellItem;

class SellItemsController extends Controller
{
    
    public function index(Seller $Seller,Sell $sell)
    {
        $sellitems = DB::table('sell_items')->where('sell_id', $sell->id)->get();

        return $sellitems;
    }

    public function store(Request $request, Seller $seller, Sell $sell)
    {
        $today = Carbon::now();

        if( $seller->start_at->addYear(5)->lte($today) ){
            $commission = $request->value * 0.3;
        } else {
            if( $request->type == 'Product'){
                $commission = $request->value * 0.1;
            } else {
                $commission = $request->value * 0.25;
            }
        }

        $sellitem = new SellItem;
        $sellitem->value = $request->value;
        $sellitem->type = $request->type;
        $sellitem->commission = $commission;
        $sellitem->sell_id = $sell->id;

        return response()->json($sell->sellitems()->save($sellitem), 201);
    }
    
    public function delete(Seller $seller, Sell $sell, SellItem $sellitem)
    {
        return response()->json($sellitem->delete(), 204);
    }
}
