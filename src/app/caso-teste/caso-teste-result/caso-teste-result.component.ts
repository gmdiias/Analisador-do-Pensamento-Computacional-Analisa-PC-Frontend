import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Linguagem } from 'src/app/linguagem/linguagem.model';
import { CasoTeste } from '../caso-teste.model';
import { CasoTesteService } from '../caso-teste.service';

@Component({
  selector: "app-caso-teste-result",
  templateUrl: "./caso-teste-result.component.html",
  styleUrls: ["./caso-teste-result.component.css"]
})
export class CasoTesteResultComponent implements OnInit {
  entity: CasoTeste;

  constructor(
    private router: Router,
    private casoTesteService: CasoTesteService,
    private snackBar: MatSnackBar,
    protected activatedRoute: ActivatedRoute,
  ) {
  }

  linguagens: Observable<Linguagem[]> = of([]);

  private paramSub: Subscription;
  ngOnInit() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    this.paramSub = this.activatedRoute.params
      .pipe(switchMap(p => this.casoTesteService.findById(Number(p.id))))
      .subscribe((e: CasoTeste) => {
        this.entity = e;
      });
  }

  onVoltarClick() {
    this.router.navigate(["casoteste/list"]);
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000
    });
  }

}
