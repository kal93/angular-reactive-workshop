import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  Customer,
  CustomersService,
  NotificationsService,
  Project,
  ProjectsService,
  ProjectsState
} from '@workshop/core-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
};

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService
  ) {
    this.projects$ = store.pipe(
      select('projects'),
      map((projetsState: ProjectsState) => projetsState.projects)
    );
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project: Project) {
    this.store.dispatch({
      type: 'create',
      payLoad: project
    });
    // these will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.store.dispatch({
      type: 'update',
      payLoad: project
    });
    this.ns.emit('Project saved!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.store.dispatch({
      type: 'delete',
      payLoad: project
    });
      this.ns.emit('Project deleted!');
      this.resetCurrentProject();
  }
}
