import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { AlunoEditComponent } from './aluno-edit/aluno-edit.component';
import { AlunoListComponent } from './aluno-list/aluno-list.component';

@NgModule({
  declarations: [
    AlunoListComponent,
    AlunoEditComponent
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
    MatExpansionModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  exports: [
    AlunoListComponent,
    AlunoEditComponent
  ],
})
export class AlunoModule { }
