import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'projects',
    loadChildren: () =>
      import('./components/project-list/project-list.module').then(
        (m) => m.ProjectListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:projectId/tasks',
    loadChildren: () =>
      import('./components/task-list/task-list.module').then(
        (m) => m.TaskListModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
