import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Aluno } from '../aluno.model';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aluno-edit',
  templateUrl: './aluno-edit.component.html',
  styleUrls: ['./aluno-edit.component.css']
})
export class AlunoEditComponent implements OnInit {
  entity: Aluno;
  entityForm: FormGroup;
  isNew = true;

  constructor(private router: Router, fb: FormBuilder, private linguagemService: AlunoService,
    private snackBar: MatSnackBar, protected activatedRoute: ActivatedRoute) {
    this.entityForm = fb.group(new Aluno());
  }

  private paramSub: Subscription;
  ngOnInit() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    this.paramSub = this.activatedRoute.params
      .pipe(switchMap(
        p => this.linguagemService.findById(Number(p.id)),
      ))
      .subscribe((e: Aluno) => {
        this.updateEntity(e);
      });
  }

  updateEntity(newEntity?: Aluno): void {
    this.isNew = this.checkIsNew(newEntity.id);
    this.entity = newEntity || new Aluno();
    this.entityForm.patchValue(this.entity);
  }

  private checkIsNew(id: number): boolean {
    if (id <= 0) {
      return true;
    }
    return false;
  }

  onVoltarClick() {
    this.router.navigate(['aluno/list']);
  }

  onSubmit() {
    this.entityForm.disable();

    this.linguagemService.saveOrCreate(this.isNew, this.entityForm.value).then(_ => {
      this.openSnackBar('Aluno salvo com sucesso!', 'Ok');
      this.router.navigate(['aluno/list']);
    }).catch(_ => {
      this.openSnackBar('Ocorreu um erro ao salvar o Aluno!', 'Erro');
      this.entityForm.enable();
    });
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }
}
