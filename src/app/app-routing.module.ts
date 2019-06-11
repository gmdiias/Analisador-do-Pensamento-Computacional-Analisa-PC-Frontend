import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { LinguagemListComponent } from './linguagem/linguagem-list/linguagem-list.component';
import { LinguagemEditComponent } from './linguagem/linguagem-edit/linguagem-edit.component';
import { CasoTesteListComponent } from './caso-teste/caso-teste-list/caso-teste-list.component';
import { CasoTesteEditComponent } from './caso-teste/caso-teste-edit/caso-teste-edit.component';

const routes: Routes = [
  { path: 'pais/list', component: LinguagemListComponent },
  { path: 'pais/edit', redirectTo: 'pais/edit/new', pathMatch: 'full' },
  { path: 'pais/edit/:id', component: LinguagemEditComponent },
  { path: 'estado/list', component: CasoTesteListComponent },
  { path: 'estado/edit', redirectTo: 'estado/edit/new', pathMatch: 'full' },
  { path: 'estado/edit/:id', component: CasoTesteEditComponent },
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
