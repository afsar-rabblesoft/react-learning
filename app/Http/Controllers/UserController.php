<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function login(Request $request)
    {
        //
        $response=[];
        $requestData = $request->all();
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
          
        ];
    
         $validator = Validator::make($requestData, $rules);
    
        if ($validator->fails()) {
            $response['message'] = $validator->errors()->first();
            return response()->json($response);
        }
        $user=User::where('email',$request->email)->first();

        if (Hash::check($request->password, $user->password)) {
            // The passwords match...
            $response['data']=$user;
            $token = $user->createToken('Passport token')->accessToken;
            $response['token']=$token;
        }
        return response()->json($response);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
        $requestData = $request->all();
        $rules = [
            'email' => 'required|unique:users|max:255|email',
            'password' => 'required',
            'name' => 'required|string',
          
        ];
    
        $validator = Validator::make($requestData, $rules);
        
        if ($validator->fails()) {
            $response['message'] = $validator->errors()->first();
            return response()->json($response);
        }

        $password=Hash::make($request->password);

        $user= new User();
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=$password;
        $user->save();

        return response()->json($user);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
       

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
