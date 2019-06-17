import { Linguagem } from '../linguagem/linguagem.model';
import { Resultado } from './resultado.model';

export class CasoTeste {
  id = -1;
  version = 0;
  dataCriacao = 0;
  codigo = '';
  linguagem: Linguagem = new Linguagem();
  avaliacao: Resultado = new Resultado();
}
