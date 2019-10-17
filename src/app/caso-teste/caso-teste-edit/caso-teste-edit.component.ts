import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, Observable, of, BehaviorSubject } from "rxjs";
import { switchMap, debounceTime, map } from "rxjs/operators";
import { CasoTeste } from '../caso-teste.model';
import { CasoTesteService } from '../caso-teste.service';
import { LinguagemService } from 'src/app/linguagem/linguagem.service';
import { Linguagem } from 'src/app/linguagem/linguagem.model';
import { Aluno } from 'src/app/aluno/aluno.model';
import { AlunoService } from 'src/app/aluno/aluno.service';


export function linguagemValidator(c: AbstractControl): ValidationErrors | null {
  const linguagem: Linguagem = c.value;

  if (linguagem && linguagem.id && linguagem.id !== -1) {
    return null;
  }
  return { linguagemInvalida: "Linguagem Inválido" };
}

@Component({
  selector: "app-caso-teste-edit",
  templateUrl: "./caso-teste-edit.component.html",
  styleUrls: ["./caso-teste-edit.component.css"]
})
export class CasoTesteEditComponent implements OnInit {
  entity: CasoTeste;
  entityForm: FormGroup;
  isNew = true;

  aluno$ = new BehaviorSubject('');
  alunoList: Observable<Aluno[]> = this.aluno$.asObservable().pipe(debounceTime(500), switchMap(dado => {
    if (dado.length > 1) {
      return this.alunoService.autocomplete(dado);
    }
    return of([]);
  }));

  linguagem$ = new BehaviorSubject('');
  linguagemList: Observable<Linguagem[]> = this.linguagem$.asObservable().pipe(debounceTime(500), switchMap(dado => {
    if (dado.length > 1) {
      return this.linguagemService.autocomplete(dado);
    }
    return of([]);
  }));

  constructor(
    private router: Router,
    fb: FormBuilder,
    private casoTesteService: CasoTesteService,
    private snackBar: MatSnackBar,
    protected activatedRoute: ActivatedRoute,
    private linguagemService: LinguagemService,
    private alunoService: AlunoService
  ) {
    this.entityForm = fb.group(new CasoTeste());
  }

  private paramSub: Subscription;
  ngOnInit() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    this.paramSub = this.activatedRoute.params
      .pipe(switchMap(p => this.casoTesteService.findById(Number(p.id))))
      .subscribe((e: CasoTeste) => {
        this.updateEntity(e);
      });

    const linguagemControl = this.entityForm.get('linguagem');
    linguagemControl.setValidators(linguagemValidator);
  }

  updateEntity(newEntity?: CasoTeste): void {
    this.isNew = this.checkIsNew(newEntity.id);
    this.entity = newEntity || new CasoTeste();
    this.entityForm.patchValue(this.entity);
  }

  private checkIsNew(id: number): boolean {
    if (id <= 0) {
      return true;
    }
    return false;
  }

  onVoltarClick() {
    this.router.navigate(["casoteste/list"]);
  }

  onSubmit() {
    this.entityForm.disable();

    this.casoTesteService
      .saveOrCreate(this.isNew, this.entityForm.value)
      .then(submit => {
        this.openSnackBar("Caso de Teste salvo com sucesso!", "Ok");
        this.router.navigate(["casoteste/result", submit.id]);
      })
      .catch(_ => {
        this.openSnackBar("Ocorreu um erro ao salvar o Caso de Teste!", "Erro");
        this.entityForm.enable();
      });
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000
    });
  }

  formatLinguagemName(linguagem: Linguagem): string {
    if (linguagem) {
      return linguagem.nome;
    }
    return '';
  }
}
