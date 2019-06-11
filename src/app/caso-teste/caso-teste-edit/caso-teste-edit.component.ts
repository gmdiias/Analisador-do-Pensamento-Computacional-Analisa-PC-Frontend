import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { CasoTeste } from '../caso-teste.model';
import { CasoTesteService } from '../caso-teste.service';
import { LinguagemService } from 'src/app/linguagem/linguagem.service';
import { Linguagem } from 'src/app/linguagem/linguagem.model';


export function paisValidator(c: AbstractControl): ValidationErrors | null {
  const pais: Linguagem = c.value;

  if (pais && pais.id && pais.id !== -1) {
    return null;
  }
  return { paisInvalido: "Pais Inválido" };
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

  constructor(
    private router: Router,
    fb: FormBuilder,
    private estadoService: CasoTesteService,
    private snackBar: MatSnackBar,
    protected activatedRoute: ActivatedRoute,
    private paisService: LinguagemService
  ) {
    this.entityForm = fb.group(new CasoTeste());
  }

  paises: Observable<Linguagem[]> = of([]);

  private paramSub: Subscription;
  ngOnInit() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    this.paramSub = this.activatedRoute.params
      .pipe(switchMap(p => this.estadoService.findById(Number(p.id))))
      .subscribe((e: CasoTeste) => {
        this.updateEntity(e);
      });

    const paisControl = this.entityForm.get('pais');
    paisControl.setValidators(paisValidator);
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
    this.router.navigate(["estado/list"]);
  }

  onSubmit() {
    this.entityForm.disable();

    this.estadoService
      .saveOrCreate(this.isNew, this.entityForm.value)
      .then(_ => {
        this.openSnackBar("Estado salvo com sucesso!", "Ok");
        this.router.navigate(["estado/list"]);
      })
      .catch(_ => {
        this.openSnackBar("Ocorreu um erro ao salvar o Estado!", "Erro");
        this.entityForm.enable();
      });
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000
    });
  }

  onChange(valor: any) {
    this.paises = this._filter(valor);
  }

  private _filter(value: string): Observable<CasoTeste[]> {
    if (value && value.length < 18) {
      return this.paisService.autocomplete(value);
    }
    return this.paises;
  }

  formatFornecedorName(fornecedor: CasoTeste): string {
    return fornecedor.nome;
  }
}
