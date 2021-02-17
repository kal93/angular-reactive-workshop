import { Project } from './../../projects/project.model';
import { ProjectsActionTypes } from './projects.actions';

const initialProjects: Project[] = [
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
export interface ProjectsState {
  projects: Project[];
  // don't track the entire project object, if I were to select/store a selected project then we have state in two different places
  // so keep a reference selected project via its id
  selectedProjectedId: string | null;
}

// 02 - Define the initial state
export const intialState: ProjectsState = {
  projects: initialProjects,
  selectedProjectedId: null
};

// 03 - Build the most simplest reducer. Every operation that you do in reduce needs to be immutable.
export function projectsReducer(
  state: ProjectsState = intialState,
  action
): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.SelectProject:
      // delegate to standalone functions.This avoids nested logic
      return {
        selectedProjectedId: action.payLoad,
        projects: state.projects
      };
    case ProjectsActionTypes.CreateProject:
      // delegate to standalone functions.This avoids nested logic
      return {
        projects: createProject(state.projects, action.payLoad),
        selectedProjectedId: state.selectedProjectedId
      };
    case ProjectsActionTypes.UpdateProject:
      // delegate to standalone functions.This avoids nested logic
      return {
        projects: updateProject(state.projects, action.payLoad),
        selectedProjectedId: state.selectedProjectedId
      };
    case ProjectsActionTypes.DeleteProject:
      // delegate to standalone functions.This avoids nested logic
      return {
        projects: deleteProject(state.projects, action.payLoad),
        selectedProjectedId: state.selectedProjectedId
      };
    default:
      return state;
  }
}
