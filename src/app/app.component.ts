import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManageTasksComponent } from './components/manage-tasks/manage-tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, ManageTasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'to-list';
}
