<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Task;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

   public function tasks()
{
    return $this->hasMany(Task::class);
}
   public function createdBy(){

    return $this ->belongsTo(User::class, 'created_by');
   }

   public function updatedBy() {
    return $this->belongsTo(User::class, 'updated_by');
}

}  
            //problem is here                 <td className="px-3 py-2">{project.createdBy.name}</td>


    
