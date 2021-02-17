// HELPFUL SNIPPET
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { Project } from '@workshop/core-data';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs/operators';

// import { Project } from './../../core/projects/project.model';
import { ProjectsService } from '../../projects/projects.service';
import {
  CreateProject,
  DeleteProject,
  LoadProjects,
  ProjectCreated,
  ProjectDeleted,
  ProjectsActionTypes,
  ProjectsLoaded
} from './projects.actions';
import { ProjectsState } from './projects.reducer';

@Injectable({ providedIn: 'root' })
export class ProjectsEffects {
  // listen for action LoadProject.This triggers the request in run block which then transforms the response to Projectp[] in pipe via map
  @Effect() loadProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.LoadProject,
    {
      run: (action: LoadProjects, state: ProjectsState) => {
          console.log(action);
        return (
          this.projectsService
            .all()
            // new ProjectsLoaded is completed action and passes the response to reducer.Similar to how actions are dispatched from projects.component
            .pipe(map((resp: Project[]) => new ProjectsLoaded(resp)))
        );
      },
      onError: () => {}
    }
  );

  @Effect() createProjects$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.CreateProject,
    {
      run: (action: CreateProject, state: ProjectsState) => {
        console.log(action);
        return this.projectsService
          .create(action.payLoad)
          .pipe(map((resp: Project) => new ProjectCreated(resp)));
      },
      onError: () => {}
    }
  );

  @Effect() deleteProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.DeleteProject, {
      run: (action: DeleteProject, state: ProjectsState) => {
        return this.projectsService.delete(action.payLoad).pipe(
          map((resp:Project) => new LoadProjects())
        )
      },
      onError: () => {}
    }
  );
  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}
