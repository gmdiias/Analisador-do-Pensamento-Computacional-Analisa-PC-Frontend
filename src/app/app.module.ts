import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AppNavbarComponent } from './navbar/navbar.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatIconModule } from '@angular/material';
import { LinguagemModule } from './linguagem/linguagem.module';
import { CasoTesteModule } from './caso-teste/caso-teste.module';
import { LinguagemService } from './linguagem/linguagem.service';
import { CasoTesteService } from './caso-teste/caso-teste.service';
import { AlunoModule } from './aluno/aluno.module';
import { AlunoService } from './aluno/aluno.service';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LinguagemModule,
    MatIconModule,
    CasoTesteModule,
    DashboardModule,
    AlunoModule
  ],
  providers: [LinguagemService, CasoTesteService, AlunoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
