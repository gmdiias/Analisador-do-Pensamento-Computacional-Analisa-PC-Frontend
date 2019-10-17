import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {
  displayedColumns: string[] = ['registro', 'nome', 'options'];
  dataSource = new MatTableDataSource();

  constructor(private linguagemService: AlunoService, private router: Router, private snackBar: MatSnackBar) {
    linguagemService.search().pipe(
      tap(console.log)
    ).subscribe(value => value);
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(filtro?: string) {
    if (filtro) {
      console.log(filtro);
    }
    this.linguagemService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  applyFilter(filterValue: string) {
    this.refreshList(filterValue.trim().toLowerCase());
  }

  onAddClick() {
    this.router.navigate(['aluno/edit']);
  }

  onVoltarClick() {
    this.router.navigate(['/']);
  }

  onEditClick(id: number) {
    this.router.navigate(['aluno/edit/', id]);
  }

  onDeleteClick(id: number) {
    this.linguagemService.deleteById(id).then(_ => {
      this.openSnackBar('Linguagem deletada com sucesso!', 'Ok');
      this.refreshList();
    },
    ).catch(_ => this.openSnackBar('Ocorreu um erro ao remover a Linguagem!', 'Erro'));
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }

}
