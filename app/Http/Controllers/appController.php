<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class appController extends Controller
{
   public function index() {
    return response(view("apptest"));
   }
}
