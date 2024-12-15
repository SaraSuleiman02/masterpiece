<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use Illuminate\Http\Request;

class ChecklistController extends Controller
{
    /**
     * Show a user's checklist.
     */
    public function showChecklist($userId)
    {
        $checklist = Checklist::where('user_id', $userId)->get();

        if ($checklist->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Checklist not found',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'checklist' => $checklist,
        ]);
    }

    /**
     * Toggle the completed status of a checklist item.
     */
    public function updateChecklist($userId, $checklistId)
    {
        $checklist = Checklist::where('user_id', $userId)->find($checklistId);

        if (!$checklist) {
            return response()->json([
                'status' => false,
                'message' => 'Checklist item not found',
            ], 404);
        }

        $checklist->completed = !$checklist->completed;
        $checklist->save();

        return response()->json([
            'status' => true,
            'message' => 'Checklist item updated successfully',
            'checklist' => $checklist,
        ]);
    }

    /**
     * Add a new task to the user's checklist.
     */
    public function addTask(Request $request, $userId)
    {
        $request->validate([
            'task' => 'required|string',
        ]);

        $checklist = Checklist::create([
            'user_id' => $userId,
            'task' => $request->task,
            'completed' => false,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Task added successfully',
            'checklist' => $checklist,
        ]);
    }

    /**
     * Delete a checklist item.
     */
    public function deleteChecklist($checklistId)
    {
        $checklist = Checklist::find($checklistId);

        if (!$checklist) {
            return response()->json([
                'status' => false,
                'message' => 'Checklist item not found',
            ], 404);
        }

        $checklist->delete();

        return response()->json([
            'status' => true,
            'message' => 'Checklist item deleted successfully',
        ]);
    }
}