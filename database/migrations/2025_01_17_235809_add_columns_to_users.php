<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {          
            $table->string('phonenumber')->nullable();
            $table->string('avatar')->nullable();
            $table->string('address1', length: 100)->nullable();
            $table->string('address2', length: 100)->nullable();
            $table->string('city', length: 100)->nullable();
            $table->string('province', length:100)->nullable();
            $table->integer('zipcode')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phonenumber',
                'avatar',
                'address1',
                'address2',
                'city',
                'province',
                'zipcode'
            ]);
        });
    }
};
