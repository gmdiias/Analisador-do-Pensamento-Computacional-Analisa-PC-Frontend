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
  displayedColumns: string[] = ['id', 'nome', 'uf', 'pais', 'options'];
  dataSource = new MatTableDataSource();

  constructor(private estadoService: CasoTesteService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(filtro?: string) {
    if (filtro) {
      console.log(filtro);
    }
    this.estadoService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  applyFilter(filterValue: string) {
    this.refreshList(filterValue.trim().toLowerCase());
  }

  onAddClick() {
    this.router.navigate(['estado/edit']);
  }

  onVoltarClick() {
    this.router.navigate(['/']);
  }

  onEditClick(id: number) {
    this.router.navigate(['estado/edit/', id]);
  }

  onDeleteClick(id: number) {
    this.estadoService.deleteById(id).then(_ => {
      this.openSnackBar('Estado deletado com sucesso!', 'Ok');
      this.refreshList();
    },
    ).catch(_ => this.openSnackBar('Ocorreu um erro ao remover o Estado!', 'Erro'));
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }

}
