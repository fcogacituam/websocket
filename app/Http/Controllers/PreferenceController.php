<?php

namespace App\Http\Controllers;

use App\Preference;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use Illuminate\Support\Facades\DB;

class PreferenceController extends Controller
{
    /**
     * -----------------------------------------
     * Standard Methods
     * -----------------------------------------
     */

    public function get(Request $request)
    {
        $paginate = 10;
        if ($request->has('paginate') and (int)$request->paginate > 0) {
            $paginate = (int)$request->paginate > 200 ? 200 : (int)$request->paginate;
        }
        return Preference::paginate($paginate);
    }

    public function find($id)
    {
        return Preference::find($id);
    }

    public function post(Request $request)
    {
        //
    }

    public function put(Request $request, $id)
    {
        //
    }

    public function patch(Request $request, $id)
    {
        //
    }

    public function delete(Request $request, $id)
    {
        //
    }
}
