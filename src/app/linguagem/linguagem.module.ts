import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatIconModule, MatPaginatorModule, MatExpansionModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { LinguagemListComponent } from './linguagem-list/linguagem-list.component';
import { LinguagemEditComponent } from './linguagem-edit/linguagem-edit.component';

@NgModule({
  declarations: [
    LinguagemListComponent,
    LinguagemEditComponent
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
    LinguagemListComponent,
    LinguagemEditComponent
  ],
})
export class LinguagemModule { }
