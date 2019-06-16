import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Linguagem } from '../linguagem.model';
import { LinguagemService } from '../linguagem.service';

@Component({
  selector: 'app-linguagem-edit',
  templateUrl: './linguagem-edit.component.html',
  styleUrls: ['./linguagem-edit.component.css']
})
export class LinguagemEditComponent implements OnInit {
  entity: Linguagem;
  entityForm: FormGroup;
  isNew = true;

  constructor(private router: Router, fb: FormBuilder, private linguagemService: LinguagemService,
    private snackBar: MatSnackBar, protected activatedRoute: ActivatedRoute) {
    this.entityForm = fb.group(new Linguagem());
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
      .subscribe((e: Linguagem) => {
        this.updateEntity(e);
      });
  }

  updateEntity(newEntity?: Linguagem): void {
    this.isNew = this.checkIsNew(newEntity.id);
    this.entity = newEntity || new Linguagem();
    this.entityForm.patchValue(this.entity);
  }

  private checkIsNew(id: number): boolean {
    if (id <= 0) {
      return true;
    }
    return false;
  }

  onVoltarClick() {
    this.router.navigate(['linguagem/list']);
  }

  onSubmit() {
    this.entityForm.disable();

    this.linguagemService.saveOrCreate(this.isNew, this.entityForm.value).then(_ => {
      this.openSnackBar('País salvo com sucesso!', 'Ok');
      this.router.navigate(['linguagem/list']);
    }).catch(_ => {
      this.openSnackBar('Ocorreu um erro ao salvar o País!', 'Erro');
      this.entityForm.enable();
    });
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }
}
