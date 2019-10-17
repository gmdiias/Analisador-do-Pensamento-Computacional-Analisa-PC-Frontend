import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Aluno } from './aluno.model';

@Injectable()
export class AlunoService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/aluno');
  }

  search(): Observable<any> {

    const params = new HttpParams()
    .set('page_size', `1`)
    .set('page_page', `2`);

    return this.http.get('http://localhost:8080/api/aluno/search', {
      params
    });
  }

  findById(id: number): Observable<Aluno> {
    if (!Number.isInteger(id) || id < 0) {
      return of(new Aluno());
    }
    return this.http.get<Aluno>('http://localhost:8080/api/aluno/' + `${id}`);
  }

  deleteById(id: number): Promise<Aluno> {
    return this.http
    .delete('http://localhost:8080/api/aluno/' + `${id}`)
    .toPromise()
    .then(e => <Aluno>e);
  }

  create(newEntity: Aluno): Promise<Aluno> {
    const copy = Object.assign(newEntity);
    delete copy.id;
    delete copy.version;

    return this.http
      .post('http://localhost:8080/api/aluno/', copy)
      .toPromise()
      .then(value => <Aluno>value);
  }

  save(entity: Aluno): Promise<Aluno> {
    return this.http
      .put('http://localhost:8080/api/aluno/', entity)
      .toPromise()
      .then(value => <Aluno>value);
  }

  saveOrCreate(isNew: boolean, entity: Aluno): Promise<Aluno> {
    if (isNew) {
      return this.create(entity);
    }
    return this.save(entity);
  }

  autocomplete(search: string) {
    return this.http.get<Aluno[]>(
      'http://localhost:8080/api/aluno/autocomplete/' + search,
    );
  }

  count(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/aluno/count');
  }
}
