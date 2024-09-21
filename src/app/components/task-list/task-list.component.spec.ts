import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../shared/services/task.service';
import { ManageTask, Task } from '../../shared/common/tasks.model';

// Mock TaskService
class MockTaskService {
  getTaskList(): ManageTask[] {
    return [
      {
        id: 1,
        assignedToUser: "user1",
        status: "inProgress",
        dueDate: "2024-09-11",
        priority: "high",
        comment: "comment for user 1"
      },
      {
        id: 2,
        assignedToUser: "user2",
        status: "inProgress",
        dueDate: "2024-09-11",
        priority: "high",
        comment: "comment for user 2"
      }
    ];
  }

  saveTasksToLocalStorage(task: Task, taskList: ManageTask[]): void {
    // Simulate saving tasks to local storage
  }
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [{ provide: TaskService, useClass: MockTaskService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the task list on initialization', () => {
    const taskList = [
      {
        id: 1,
        assignedToUser: "user1",
        status: "inProgress",
        dueDate: "2024-09-11",
        priority: "high",
        comment: "comment for user 1"
      },
      {
        id: 2,
        assignedToUser: "user2",
        status: "inProgress",
        dueDate: "2024-09-11",
        priority: "high",
        comment: "comment for user 2"
      }
    ];
    spyOn(taskService, 'getTaskList').and.returnValue(taskList);

    component.ngOnInit();

    expect(component.taskList).toEqual(taskList);
  });

  it('should set isEditTask to false when adding a task', () => {
    component.addTask();
    expect(component.isEditTask).toBeFalse();
  });

  it('should set isEditTask to true and assign task id when editing a task', () => {
    const taskId = 1;
    component.editTask(taskId);
    expect(component.isEditTask).toBeTrue();
    expect(component.selectedTaskId).toBe(taskId);
  });

  it('should call getTaskList when saving a task', () => {
    spyOn(component, 'getTaskList');
    component.onSave();
    expect(component.getTaskList).toHaveBeenCalled();
  });

  it('should set the id of the task to delete', () => {
    const taskId = 2;
    component.setIdOfTaskToDelete(taskId);
    expect(component.deleteTaskId).toBe(taskId);
  });

  it('should delete a task and save the updated task list to local storage', () => {
    const taskList = [
      {
        id: 1,
        assignedToUser: "user1",
        status: "inProgress",
        dueDate: "2024-09-11",
        priority: "high",
        comment: "comment for user 1"
      },
      {
        id: 2,
        assignedToUser: "user2",
        status: "inProgress",
        dueDate: "2024-09-11",
        priority: "high",
        comment: "comment for user 2"
      }
    ];
    component.taskList = taskList;
    component.deleteTaskId = 1;

    spyOn(taskService, 'saveTasksToLocalStorage');

    component.deleteTask();

    expect(component.taskList.length).toBe(1);
    expect(component.taskList[0].id).toBe(2);
    expect(taskService.saveTasksToLocalStorage).toHaveBeenCalledWith(null, component.taskList);
  });
});
