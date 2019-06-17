import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatIconModule, MatAutocompleteModule, MatProgressBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CasoTesteListComponent } from './caso-teste-list/caso-teste-list.component';
import { CasoTesteEditComponent } from './caso-teste-edit/caso-teste-edit.component';
import { CasoTesteResultComponent } from './caso-teste-result/caso-teste-result.component';

@NgModule({
  declarations: [
    CasoTesteListComponent,
    CasoTesteEditComponent,
    CasoTesteResultComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  exports: [
    CasoTesteListComponent,
    CasoTesteEditComponent,
    CasoTesteResultComponent,
  ],
})
export class CasoTesteModule { }
