import { Action } from '@ngrx/store';
import { Project } from '../../projects/project.model';

export enum ProjectsActionTypes {
  LoadProject = '[Projects] Loaded',

  SelectProject = '[Projects] Selected',
  CreateProject = '[Projects] Create',
  UpdateProject = '[Projects] Updated',
  DeleteProject = '[Projects] Deleted'
}

export class CreateProject implements Action {
  readonly type = ProjectsActionTypes.CreateProject;
  constructor(private payLoad: Project) {}
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(private payLoad: Project) {}
}
export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(private payLoad: Project) {}
}
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.SelectProject;
  constructor(private payLoad: Project) {}
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProject;
  constructor(private payLoad: Project[]) {}
}

export type ProjectsAction =
  | LoadProjects
  | SelectProject
  | CreateProject
  | UpdateProject
  | DeleteProject;
