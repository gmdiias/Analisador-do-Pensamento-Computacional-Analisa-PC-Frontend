import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CasoTesteService } from '../caso-teste.service';

@Component({
  selector: 'app-caso-teste-list',
  templateUrl: './caso-teste-list.component.html',
  styleUrls: ['./caso-teste-list.component.css']
})
export class CasoTesteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'aluno', 'linguagem', 'pontuacao', 'options'];
  dataSource = new MatTableDataSource();

  constructor(private casoTesteService: CasoTesteService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(filtro?: string) {
    if (filtro) {
      console.log(filtro);
    }
    this.casoTesteService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  applyFilter(filterValue: string) {
    this.refreshList(filterValue.trim().toLowerCase());
  }

  onAddClick() {
    this.router.navigate(['casoteste/edit']);
  }

  onVoltarClick() {
    this.router.navigate(['/']);
  }

  onEditClick(id: number) {
    this.router.navigate(['casoteste/edit/', id]);
  }

  onAvaliacaoClick(id: number) {
    this.router.navigate(['casoteste/result/', id]);
  }

  onDeleteClick(id: number) {
    this.casoTesteService.deleteById(id).then(_ => {
      this.openSnackBar('Caso de Teste deletado com sucesso!', 'Ok');
      this.refreshList();
    },
    ).catch(_ => this.openSnackBar('Ocorreu um erro ao remover o Caso de teste!', 'Erro'));
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }

}
