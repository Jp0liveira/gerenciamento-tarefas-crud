import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Tarefa} from '../model/tarefa';
import {delay, first, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private readonly API = '/api/tarefas';

  constructor(private http: HttpClient) { }

  listarTarefas(){
    return this.http.get<Tarefa[]>(this.API).pipe(
      first(),
      delay(2000),
      tap(tarefas => console.log(tarefas))
    );
  }

  save(record: Tarefa) {
    console.log(record);
   return this.http.post<Tarefa>(this.API, record).pipe(first());
  }

  marcarComoConcluida(idTarefa: string): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.API}/${idTarefa}/concluir`, {});
  }

}
