<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('projects', 'ProjectController@index');
Route::post('projects', 'ProjectController@store');
Route::get('projects/{id}', 'ProjectController@show');
//Route::put('projects/{project}', 'ProjectController@markAsCompleted');
Route::put('projects/{project}', 'ProjectController@update');
Route::post('tasks', 'TaskController@store');
Route::put('tasks/{task}', 'TaskController@markAsCompleted');
Route::get('tasks/{project_id}', 'TaskController@getTasksByProjectId');
Route::get('tasks_info/{task_id}', 'TaskController@getTasksInfoByTaskId');
Route::put('update_task_info/{task_id}', 'TaskController@updateTaskInfo');
Route::post('create_project_task', 'TaskController@createProjectTask');