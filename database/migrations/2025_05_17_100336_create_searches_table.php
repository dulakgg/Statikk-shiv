<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('searches', function (Blueprint $table) {
            $table->id();
            $table->string('nickname', 100);
            $table->string('tagline', 20);
            $table->string('region', 10)->default('eun1');
            $table->unsignedInteger('count')->default(0);
            $table->unique(['nickname', 'tagline', 'region']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('searches');
    }
};
