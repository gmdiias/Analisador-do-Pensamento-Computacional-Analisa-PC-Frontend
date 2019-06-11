import { ExpressaoRegular } from './expressao-regular.model';

export class Linguagem {
  id = -1;
  version = 0;
  dataCriacao = 0;
  nome = '';
  condicional: ExpressaoRegular[] = [];
}
