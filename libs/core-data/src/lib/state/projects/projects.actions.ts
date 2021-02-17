import { Action } from '@ngrx/store';
import { Project } from '../../projects/project.model';

export enum ProjectsActionTypes {
  LoadProject = '[Projects] Load Data',
  ProjectsLoaded = '[Projects] Loaded',
  SelectProject = '[Projects] Selecte Project',
  CreateProject = '[Projects] Create Project',
  ProjectCreated = '[Projects] Created',
  UpdateProject = '[Projects] Update Project',
  DeleteProject = '[Projects] Delete Project',
  DeletedProject = '[Projects] Deleted'
}

export class CreateProject implements Action {
  readonly type = ProjectsActionTypes.CreateProject;
  constructor(public payLoad: Project) {}
}

export class ProjectCreated implements Action {
  readonly type = ProjectsActionTypes.ProjectCreated;
  constructor(public payLoad: Project) {}
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(public payLoad: Project) {}
}
export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(public payLoad: Project) {}
}
export class ProjectDeleted implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(public payLoad: Project) {}
}
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.SelectProject;
  constructor(public payLoad: Project) {}
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProject;
  // constructor(public payLoad: Project[]) {}
}

export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoaded;
  constructor(public payLoad: Project[]) {}
}

export type ProjectsAction =
  | LoadProjects
  | SelectProject
  | CreateProject
  | UpdateProject
  | DeleteProject
  | DeleteProject
  |ProjectsLoaded
  |ProjectCreated
  ;
