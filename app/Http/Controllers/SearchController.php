<?php
namespace App\Http\Controllers;

use App\Models\Search;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SearchController extends Controller
{
  public function hotSearches(Request $request)
  {
      $period = $request->query('period', 'all');

      $query = Search::select('nickname','tagline','region','count')
                    ->orderByDesc('count');

      switch ($period) {
          case 'today':
            $query->whereBetween('updated_at', [
                now()->toDateString() . ' 00:00:00',
                now()->toDateString() . ' 23:59:59'
            ]);


              break;
          case 'week':
              $query->whereBetween('updated_at', [
                  Carbon::now()->startOfWeek(),
                  Carbon::now()
              ]);
              break;
          case 'month':
              $query->whereYear('updated_at', Carbon::now()->year)
                    ->whereMonth('updated_at', Carbon::now()->month);
              break;
          case 'year':
              $query->whereYear('updated_at', Carbon::now()->year);
              break;
          case 'all':
          default:
              // no filter
      }

      $hot = $query->limit(10)->get();
      return response()->json($hot);
  }
  
}