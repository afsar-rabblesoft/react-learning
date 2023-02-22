<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

defined('IMAGE_UPLOAD_PATH') or define("IMAGE_UPLOAD_PATH", public_path() . '/uploads/profile/');

class ImageController extends Controller
{
    //
    public function index()
    {
        $data=Image::where('user_id',Auth::user()->id)->get();
        if($data){
        return response()->json($data);

        }
        return response()->json($data);
    }

    public function store(Request $request)
    {
        // $this->validate($request, [
        //     'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg',
        //     'title'=>'required|string'
        // ]);

        if ($request->hasFile('image')) {

            $file = $request->file('image');
            $fileName = time() . '-' . $file->getClientOriginalName();
            $file->move(IMAGE_UPLOAD_PATH, $fileName);
            $data=new Image();
            $data->image=$fileName ?? "";
            $data->title=$request->title;
            $data->user_id=Auth::user()->id;
            $data->save();
        }
   
        return response()->json($data);
    }
    public function delete($id){
        $image=Image::where('user_id',Auth::user()->id)->where('id',$id)->first();
        if(!$image){
        return response()->json("Record Not Found");

        }
        $image->delete();
        return response()->json(['status'=>200,'message'=>"image deleted successfully"]);

    }
}
