import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Linguagem } from './linguagem.model';


@Injectable()
export class LinguagemService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/linguagem/pais/');
  }

  search(): Observable<any> {

    const params = new HttpParams()
    .set('page_size', `1`)
    .set('page_page', `2`);

    return this.http.get('http://localhost:8080/api/linguagem/search', {
      params
    });
  }

  findById(id: number): Observable<Linguagem> {
    if (!Number.isInteger(id) || id < 0) {
      return of(new Linguagem());
    }
    return this.http.get<Linguagem>('http://localhost:8080/api/linguagem/' + `${id}`);
  }

  deleteById(id: number): Promise<Linguagem> {
    return this.http
    .delete('http://localhost:8080/api/linguagem/' + `${id}`)
    .toPromise()
    .then(e => <Linguagem>e);
  }

  create(newEntity: Linguagem): Promise<Linguagem> {
    const copy = Object.assign(newEntity);
    delete copy.id;
    delete copy.version;

    return this.http
      .post('http://localhost:8080/api/linguagem/', copy)
      .toPromise()
      .then(value => <Linguagem>value);
  }

  save(entity: Linguagem): Promise<Linguagem> {
    return this.http
      .put('http://localhost:8080/api/linguagem/', entity)
      .toPromise()
      .then(value => <Linguagem>value);
  }

  saveOrCreate(isNew: boolean, entity: Linguagem): Promise<Linguagem> {
    if (isNew) {
      return this.create(entity);
    }
    return this.save(entity);
  }

  autocomplete(search: string) {
    return this.http.get<Linguagem[]>(
      'http://localhost:8080/api/linguagem/autocomplete/' + search,
    );
  }

  count(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/linguagem/count');
  }
}
