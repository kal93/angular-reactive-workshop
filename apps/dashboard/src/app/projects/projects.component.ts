import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  CreateProject,
  Customer,
  CustomersService,
  DeleteProject,
  initialProjects,
  NotificationsService,
  Project,
  ProjectsService,
  ProjectsState,
  selectAllProjects,
  SelectProject,
  UpdateProject
} from '@workshop/core-data';
import { LoadProjects } from 'libs/core-data/src/lib/state/projects/projects.actions';
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
      select(selectAllProjects)
      // select('projects'),
      // map(data => data.entities),
      // map(data => Object.keys(data).map(k => data[k]))
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
    this.store.dispatch(new SelectProject(project));
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    this.store.dispatch(new LoadProjects())
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project: Project) {
    this.store.dispatch(new CreateProject(project));
    // these will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
    this.ns.emit('Project saved!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));
      this.ns.emit('Project deleted!');
      this.resetCurrentProject();
  }
}
