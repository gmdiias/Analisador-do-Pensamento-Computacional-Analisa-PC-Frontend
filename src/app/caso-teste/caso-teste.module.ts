import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatIconModule, MatAutocompleteModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CasoTesteListComponent } from './caso-teste-list/caso-teste-list.component';
import { CasoTesteEditComponent } from './caso-teste-edit/caso-teste-edit.component';

@NgModule({
  declarations: [
    CasoTesteListComponent,
    CasoTesteEditComponent,
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
    ReactiveFormsModule
  ],
  exports: [
    CasoTesteListComponent,
    CasoTesteEditComponent,
  ],
})
export class CasoTesteModule { }
