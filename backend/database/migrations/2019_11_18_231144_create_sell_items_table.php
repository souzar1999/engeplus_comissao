<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sell_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('value', 8, 2);
            $table->double('commission', 8, 2);
            $table->enum('type', ['product', 'service']);
            $table->integer('sell_id')->unsigned();
            $table->foreign('sell_id')->references('id')->on('sells');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sell_items');
    }
}
