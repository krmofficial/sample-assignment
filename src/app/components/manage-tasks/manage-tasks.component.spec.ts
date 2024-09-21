import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageTasksComponent } from './manage-tasks.component';
import { TaskService } from '../../shared/services/task.service';

describe('ManageTasksComponent', () => {
  let component: ManageTasksComponent;
  let fixture: ComponentFixture<ManageTasksComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTaskList', 'saveTasksToLocalStorage']);
    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTasksComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.taskForm).toBeDefined();
    expect(component.taskForm.controls['assignedToUser'].valid).toBeFalsy();
    expect(component.taskForm.controls['status'].valid).toBeFalsy();
    expect(component.taskForm.controls['priority'].valid).toBeFalsy();
  });

  it('should patch form data when selectedTaskId changes', () => {
    const mockTask = {
      id: 1,
      assignedToUser: 'User 1',
      status: 'In Progress',
      dueDate: '2024-01-01',
      priority: 'High',
      comment: 'Some comment'
    };
    taskService.getTaskList.and.returnValue([mockTask]);
    component.selectedTaskId = 1;
    component.isEditTask = true;
    
    component.ngOnChanges({ selectedTaskId: { currentValue: 1, previousValue: undefined, firstChange: false, isFirstChange: () => false } });

    expect(component.selectedTask).toEqual(mockTask);
  });

  it('should reset the form if isEditTask is false', () => {
    // component.taskForm = component.createForm();
    component.createForm()
    component.isEditTask = false;
    
    component.ngOnChanges({ isEditTask: { currentValue: false, previousValue: undefined, firstChange: false, isFirstChange: () => false } });

    expect(component.taskForm.value).toEqual({
      assignedToUser: null,
      status: null,
      dueDate: null,
      priority: null,
      comment: null
    });
  });

  it('should save task when saveTask is called in add mode', () => {
    component.isEditTask = false;
    component.createForm();
    
    component.taskForm.patchValue({
      assignedToUser: 'New User',
      status: 'New',
      dueDate: '2024-01-03',
      priority: 'Low',
      comment: 'New comment'
    });
    spyOn(component.emitSaveTask, 'emit')

    component.saveTask();

    expect(taskService.saveTasksToLocalStorage).toHaveBeenCalled();
    expect(taskService.saveTasksToLocalStorage.calls.mostRecent().args[0]).toEqual({
      assignedToUser: 'New User',
      status: 'New',
      dueDate: '2024-01-03',
      priority: 'Low',
      comment: 'New comment'
    }); // Check the first argument
    expect(component.emitSaveTask.emit).toHaveBeenCalled();
  });
});
