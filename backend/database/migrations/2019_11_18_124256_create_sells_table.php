<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('sells')) { 
            Schema::create('sells', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('description');
                $table->integer('seller_id')->unsigned();
                $table->foreign('seller_id')->references('id')->on('sellers');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sells');
    }
}
