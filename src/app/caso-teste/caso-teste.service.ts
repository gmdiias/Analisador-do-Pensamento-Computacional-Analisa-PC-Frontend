import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CasoTeste } from './caso-teste.model';

@Injectable()
export class CasoTesteService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/estado/');
  }

  findById(id: number): Observable<CasoTeste> {
    if (!Number.isInteger(id) || id < 0) {
      return of(new CasoTeste());
    }
    return this.http.get<CasoTeste>('http://localhost:8080/api/estado/' + `${id}`);
  }

  deleteById(id: number): Promise<CasoTeste> {
    return this.http
    .delete('http://localhost:8080/api/estado/' + `${id}`)
    .toPromise()
    .then(e => <CasoTeste>e);
  }

  create(newEntity: CasoTeste): Promise<CasoTeste> {
    const copy = Object.assign(newEntity);
    delete copy.id;
    delete copy.version;

    return this.http
      .post('http://localhost:8080/api/estado/', copy)
      .toPromise()
      .then(value => <CasoTeste>value);
  }

  save(entity: CasoTeste): Promise<CasoTeste> {
    return this.http
      .put('http://localhost:8080/api/estado/', entity)
      .toPromise()
      .then(value => <CasoTeste>value);
  }

  saveOrCreate(isNew: boolean, entity: CasoTeste): Promise<CasoTeste> {
    if (isNew) {
      return this.create(entity);
    }
    return this.save(entity);
  }

  autocomplete(search: string) {
    return this.http.get<CasoTeste[]>(
      'http://localhost:8080/api/estado/autocomplete/' + search,
    );
  }

  count(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/estado/count');
  }
}
