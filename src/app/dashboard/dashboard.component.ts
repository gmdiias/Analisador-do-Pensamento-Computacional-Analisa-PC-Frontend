import { Component, OnInit } from '@angular/core';
import { CasoTesteService } from '../caso-teste/caso-teste.service';
import { LinguagemService } from '../linguagem/linguagem.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AppDashboardComponent implements OnInit {

  constructor(private estadoService: CasoTesteService, private paisService: LinguagemService) { }

  countCliente = 0;
  countEstado = 0;
  countPais = 0;

  ngOnInit() {
    this.estadoService.count().subscribe(dado => this.countEstado = dado);
    this.paisService.count().subscribe(dado => this.countPais = dado);
  }

}
