import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { LinguagemListComponent } from './linguagem/linguagem-list/linguagem-list.component';
import { LinguagemEditComponent } from './linguagem/linguagem-edit/linguagem-edit.component';
import { CasoTesteListComponent } from './caso-teste/caso-teste-list/caso-teste-list.component';
import { CasoTesteEditComponent } from './caso-teste/caso-teste-edit/caso-teste-edit.component';
import { CasoTesteResultComponent } from './caso-teste/caso-teste-result/caso-teste-result.component';
import { AlunoEditComponent } from './aluno/aluno-edit/aluno-edit.component';
import { AlunoListComponent } from './aluno/aluno-list/aluno-list.component';

const routes: Routes = [
  { path: 'linguagem/list', component: LinguagemListComponent },
  { path: 'linguagem/edit', redirectTo: 'linguagem/edit/new', pathMatch: 'full' },
  { path: 'linguagem/edit/:id', component: LinguagemEditComponent },
  { path: 'aluno/list', component: AlunoListComponent },
  { path: 'aluno/edit', redirectTo: 'aluno/edit/new', pathMatch: 'full' },
  { path: 'aluno/edit/:id', component: AlunoEditComponent },
  { path: 'casoteste/list', component: CasoTesteListComponent },
  { path: 'casoteste/edit', redirectTo: 'casoteste/edit/new', pathMatch: 'full' },
  { path: 'casoteste/edit/:id', component: CasoTesteEditComponent },
  { path: 'casoteste/result', redirectTo: 'casoteste/result/new', pathMatch: 'full' },
  { path: 'casoteste/result/:id', component: CasoTesteResultComponent },
  { path: '', component: AppDashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
