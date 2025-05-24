import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectService } from '../../services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  form: FormGroup;
  dataSource = new MatTableDataSource<any>([]);
  totalProjects = 0;
  pageSize = 5;
  currentPage = 1;
  editingProjectId: number | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Active', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.projectService.getProjects(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource.data = res.projects;
        this.totalProjects = res.total;
        this.loading = false;
        this.snackBar.open('Projects loaded successfully', 'Close', {
          duration: 2000,
        });
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load projects', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadProjects();
  }

  createOrUpdateProject() {
    if (this.form.invalid) return;

    this.loading = true;

    const request = this.editingProjectId
      ? this.projectService.updateProject(
          this.editingProjectId,
          this.form.value
        )
      : this.projectService.createProject(this.form.value);

    request.subscribe({
      next: () => {
        this.form.reset({ status: 'Active' });
        this.editingProjectId = null;
        this.loadProjects();
        this.snackBar.open(
          this.editingProjectId
            ? 'Project updated successfully'
            : 'Project created successfully',
          'Close',
          { duration: 3000 }
        );
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to save project', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  editProject(project: any) {
    this.form.patchValue(project);
    this.editingProjectId = project.id;
    this.snackBar.open('Editing project: ' + project.name, 'Close', {
      duration: 2000,
    });
  }

  deleteProject(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this project?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        this.projectService.deleteProject(id).subscribe({
          next: () => {
            this.loadProjects();
            this.snackBar.open('Project deleted successfully', 'Close', {
              duration: 3000,
            });
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.snackBar.open('Failed to delete project', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
