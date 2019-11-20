<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Seller;
use App\Sell;

class SellersController extends Controller
{
    public function index()
    {
        $sellers = Seller::all();
        
        $return = [];

        foreach ($sellers as $seller){
            $mountSeller = new Seller;
            $mountSeller = $seller;

            $sells = DB::table('sells')
                ->select(DB::raw('id'))
                ->where('seller_id', $seller->id)
                ->get();

            $sellerCommission = 0;

            foreach ($sells as $sell){
            
                $commission = DB::table('sell_items')
                    ->select(DB::raw('sum(commission) as commission'))
                    ->where('sell_id', $sell->id)
                    ->pluck('commission'); 

                $sellerCommission += $commission[0];
                
            }

            $mountSeller->commission += $sellerCommission;
            array_push($return, $mountSeller);
        }

        return $return;
    }
 
    public function show(Seller $seller)
    {
        return $seller;
    }
 
    public function store(Request $request)
    {
        $seller = Seller::create($request->all());
 
        return response()->json($seller, 201);
    }
 
    public function update(Request $request, Seller $seller)
    {
        $seller->update($request->all());
 
        return response()->json($seller, 200);
    }
 
    public function delete(Seller $seller)
    {
        $seller->delete();
 
        return response()->json(null, 204);
    }
 
}
