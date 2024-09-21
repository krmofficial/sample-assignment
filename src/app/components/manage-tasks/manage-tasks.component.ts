import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TasksConstants } from '../../shared/common/tasks.constants';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TaskService } from '../../shared/services/task.service';
import { ManageTask } from '../../shared/common/tasks.model';

@Component({
  selector: 'app-manage-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-tasks.component.html',
  styleUrl: './manage-tasks.component.css'
})
export class ManageTasksComponent implements OnInit, OnChanges {
  @Input() isEditTask = false;
  @Input() selectedTaskId: number;
  @Output() emitSaveTask = new EventEmitter();

  taskForm: FormGroup;
  userList = TasksConstants.users;
  priorityList = TasksConstants.priority;
  statusList = TasksConstants.status;
  selectedTask: ManageTask;

  constructor(private fb: FormBuilder, private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const taskList = this.taskService.getTaskList();
    const task = taskList?.find((item) => item?.id === this.selectedTaskId);
    if (task) {
      this.selectedTask = task;
      this.patchDataToForm(task)
    }
    if(!this.isEditTask){
      this.taskForm?.reset();
    }
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.taskForm = this.fb.group({
      assignedToUser: ["", Validators.required],
      status: ["", Validators.required],
      dueDate: [""],
      priority: ["", Validators.required],
      comment: [""]
    })
  }

  saveTask(): void {
    if (this.isEditTask) {
      const taskList = this.taskService.getTaskList();
      for (let i = 0; i < taskList?.length; i++) {
        if (taskList[i]?.id === this.selectedTaskId) {
          let taskObject = {
            id: taskList[i]?.id,
            ...this.taskForm?.value
          };
          taskList[i] = taskObject;
        }
      }
      this.taskService.saveTasksToLocalStorage(null, taskList);
    } else {
      this.taskService.saveTasksToLocalStorage(this.taskForm?.value);
    }
    this.emitSaveTask.emit();
  }

  patchDataToForm(selectedTask: ManageTask): void {
    this.taskForm?.patchValue({
      assignedToUser: selectedTask?.assignedToUser,
      status: selectedTask?.status,
      dueDate: selectedTask?.dueDate,
      priority: selectedTask?.priority,
      comment: selectedTask?.comment
    });
  }
}
