import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MaterialModule } from '@workshop/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreDataModule } from '@workshop/core-data';
import { StoreModule } from '@ngrx/store';
import { projectsReducer } from 'libs/core-data/src/lib/state/projects/projects.reducer';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    // StoreModule.forFeature('projects',projectsReducer),
    ReactiveFormsModule,
    FormsModule,
    CoreDataModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
  ]
})
export class ProjectsModule { }
