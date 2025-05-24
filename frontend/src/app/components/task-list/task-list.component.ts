import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  projectId!: number;
  form: FormGroup;
  tasks: any[] = [];
  loading: boolean = false;
  projectName: string = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', Validators.required],
      isCompleted: [false],
    });
  }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('projectId')!;
    if (this.projectId) {
      this.loadTasks();
      this.loadProjectName();
    }
  }

  loadProjectName() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        console.log(project.name);
        this.projectName = project.name;
      },
      error: () => {
        this.projectName = '';
      },
    });
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (res) => {
        this.tasks = res.map((task: any) => ({
          ...task,
          isCompleted: task.isCompleted === 1, // convert 1 to true, 0 to false
        }));
        console.log(this.tasks);
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load tasks', 'Close', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  createTask() {
    if (this.form.invalid) return;

    const raw = this.form.value;
    const formattedDate = new Date(raw.dueDate).toISOString().split('T')[0];
    const task = {
      ...raw,
      dueDate: formattedDate,
      projectId: this.projectId,
    };
    this.loading = true;
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.snackBar.open('Task created successfully', 'Close', {
          duration: 3000,
        });
        this.form.reset({ isCompleted: false });
        this.loadTasks();
      },
      error: () => {
        this.snackBar.open('Failed to create task', 'Close', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  toggleCompletion(task: any) {
    task.isCompleted = task.isCompleted ? 0 : 1;

    this.taskService.toggleCompletion(task.id, task).subscribe({
      next: () => {
        this.loadTasks();
        this.snackBar.open('Task updated', 'Close', { duration: 2000 });
      },
      error: () =>
        this.snackBar.open('Failed to update task', 'Close', {
          duration: 2000,
        }),
    });
  }

  deleteTask(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this task?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.snackBar.open('Task deleted', 'Close', { duration: 2000 });
            this.loadTasks();
          },
          error: () => {
            this.snackBar.open('Failed to delete task', 'Close', {
              duration: 2000,
            });
            this.loading = false;
          },
        });
      }
    });
  }
}
