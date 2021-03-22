<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate(['title' => 'required']);

        $task = Task::create([
            'title' => $validatedData['title'],
            'project_id' => $request->project_id,
        ]);

        return $task->toJson();
    }

    public function getTasksByProjectId($project_id)
    {
        $tasks = Task::select('tasks.*', 'projects.name AS project_name')->where('project_id', $project_id)
                ->orderBy('tasks.created_at', 'desc')
                ->leftJoin('projects', function($join) {
                    $join->on('projects.id', '=', 'tasks.project_id');
                })
                ->get();

        return $tasks->toJson();
    }

    public function getTasksInfoByTaskId($task_id){
        $tasks = Task::find($task_id);

        return $tasks->toJson();
    }

    public function markAsCompleted(Task $task)
    {
        $task->is_completed = true;
        $task->update();

        return response()->json('Task updated!');
    }

    public function updateTaskInfo(Request $request, $id){
        $task = Task::find($id);
        $task->title = $request->input('name');
        $task->update();

        return response()->json('Task updated!');
    }

    public function createProjectTask(Request $request){
        $task = new Task();
        $task->title = $request->title;
        $task->project_id = $request->project_id;
        $task->is_completed = 0;
        $task->save();

        return response()->json('Task saved!');
    }
}
