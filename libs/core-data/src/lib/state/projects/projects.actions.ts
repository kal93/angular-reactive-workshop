import { Action } from '@ngrx/store';
import { Project } from '../../projects/project.model';

export enum ProjectsActionTypes {
  SelectProject = '[Projects] Selected',
  AddProject = '[Projects] Added',
  UpdateProject = '[Projects] Updated',
  DeleteProject = '[Projects] Deleted'
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
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

export type ProjectsAction =
  | SelectProject
  | AddProject
  | UpdateProject
  | DeleteProject;
