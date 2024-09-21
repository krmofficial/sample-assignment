import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ManageTask, Task } from '../../shared/common/tasks.model';
import { ManageTasksComponent } from '../manage-tasks/manage-tasks.component';
import { TaskService } from '../../shared/services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ManageTasksComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  @ViewChild('taskFormModalDiv', { static: false }) modal: ElementRef;

  taskList: ManageTask[] = [];
  isEditTask = false;
  selectedTaskId: number;
  deleteTaskId: number;
  editTaskBtnClicked:number;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList(): void {
    this.taskList = this.taskService.getTaskList();
  }

  addTask(): void {
    this.isEditTask = false;
    this.editTaskBtnClicked = Math.random() * this.taskList?.length;
  }

  editTask(id: number): void {
    this.isEditTask = true;
    this.selectedTaskId = id;
  }

  onSave(): void {
    this.getTaskList();
  }

  setIdOfTaskToDelete(id: number): void {
    this.deleteTaskId = id;
  }

  deleteTask(): void {
    if (this.taskList?.length === 1) {
      localStorage.clear();
      this.taskList = [];
    } else {
      this.taskList = this.taskList?.filter((item) => item?.id !== this.deleteTaskId);
      this.taskService.saveTasksToLocalStorage(null, this.taskList);
    }
  }
}
