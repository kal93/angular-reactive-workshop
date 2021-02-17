import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Project } from './../../projects/project.model';
import { ProjectsActionTypes } from './projects.actions';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) =>
  projects.map(p => {
    return p.id === project.id ? Object.assign({}, project) : p;
  });
const deleteProject = (projects, project) =>
  projects.filter(w => project.id !== w.id);

// 01 - Define the shape of my state, State for project feature
export interface ProjectsState extends EntityState<Project> {
  selectedProjectedId: string | null;
}

// create entity adapter
export const adapter : EntityAdapter<Project> = createEntityAdapter<Project>();

// 02 - Define the initial state

export const intialState: ProjectsState = adapter.getInitialState({
  selectedProjectedId: null
});


// 03 - Build the most simplest reducer. Every operation that you do in reduce needs to be immutable.
export function projectsReducer(
  state: ProjectsState = intialState,
  action
): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.LoadProject:
      // delegate to standalone functions.This avoids nested logic
      return adapter.addMany(action.payLoad, state);
    case ProjectsActionTypes.SelectProject:
      // delegate to standalone functions.This avoids nested logic
      return Object.assign({}, state, { selectedProjectId: action.payLoad})
    case ProjectsActionTypes.CreateProject:
      // delegate to standalone functions.This avoids nested logic
      return adapter.addOne(action.payLoad, state);
    case ProjectsActionTypes.UpdateProject:
      // delegate to standalone functions.This avoids nested logic
      return adapter.updateOne(action.payLoad, state);
    case ProjectsActionTypes.DeleteProject:
      // delegate to standalone functions.This avoids nested logic
      return adapter.removeOne(action.payLoad, state);
    default:
      return state;
  }
}

// build out low level selectors (composable queries or functions)
export const getSelectedProjectId = (state: ProjectsState) => state.selectedProjectedId;

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
export const selectAllProjects = selectAll;
export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;

