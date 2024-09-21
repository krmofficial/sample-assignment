import { Injectable } from "@angular/core";
import { ManageTask, Task } from "../common/tasks.model";
import { TasksConstants } from "../common/tasks.constants";

@Injectable({
    providedIn: "root",
})

export class TaskService {
    saveTasksToLocalStorage(task: Task | null, allTasks?: ManageTask[]): void {
        const taskList = this.getTaskList();
        const newTask = {...task, id: taskList.length + 1}
        if(allTasks?.length){
            localStorage.setItem(TasksConstants.taskList, JSON.stringify(allTasks));
        } else {
            localStorage.setItem(TasksConstants.taskList, JSON.stringify([...taskList, newTask]));
        }
    }

    getTaskList(): ManageTask[] {
        const localStorageData = localStorage.getItem(TasksConstants.taskList);
        return localStorageData === null || localStorageData === undefined ? [] : JSON.parse(localStorageData);
    }
}