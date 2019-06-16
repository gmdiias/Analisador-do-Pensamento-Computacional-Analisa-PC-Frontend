import { Component, OnInit } from '@angular/core';
import { CasoTesteService } from '../caso-teste/caso-teste.service';
import { LinguagemService } from '../linguagem/linguagem.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AppDashboardComponent implements OnInit {

  constructor(private casoTesteService: CasoTesteService, private linguagemService: LinguagemService) { }

  countTestes = 0;
  countLinguagens = 0;

  ngOnInit() {
    this.casoTesteService.count().subscribe(dado => this.countTestes = dado);
    this.linguagemService.count().subscribe(dado => this.countLinguagens = dado);
  }

}
