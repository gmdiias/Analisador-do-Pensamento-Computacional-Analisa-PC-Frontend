import { Linguagem } from '../linguagem/linguagem.model';
import { Resultado } from './resultado.model';
import { Aluno } from '../aluno/aluno.model';

export class CasoTeste {
  id = -1;
  version = 0;
  dataCriacao = 0;
  codigo = '';
  nome = '';
  linguagem: Linguagem = new Linguagem();
  avaliacao: Resultado = new Resultado();
  aluno: Aluno = new Aluno();
}
