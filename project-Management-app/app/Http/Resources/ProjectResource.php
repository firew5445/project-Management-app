<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;




class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'img_path' => $this->img_path,
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
             'due_date' => $this->due_date ? Carbon::parse($this->due_date)->format('Y-m-d H:i:s') : null,
            'created_by' => new UserResource($this->createdBy), 
            'updated_by' => new UserResource($this->updatedBy),
           


        ];
    }
}
