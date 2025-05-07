import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from '../model/tarefa';
import { delay, first, Observable, tap } from 'rxjs';

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

  save(record: Partial<Tarefa>) {
    if (record.idTarefa){
      return this.update(record);
    }
    return this.create(record);
  }

  marcarComoConcluida(idTarefa: string): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.API}/${idTarefa}/concluir`, {});
  }

  loadById(idTarefa: string) {
    return this.http.get<Tarefa>(`${this.API}/${idTarefa}`, {});
  }

  private create(record: Partial<Tarefa>){
    return this.http.post<Tarefa>(this.API, record).pipe(first());
  }

  private update(record: Partial<Tarefa>){
    return this.http.put<Tarefa>(`${this.API}/${record.idTarefa}`, record).pipe(first());
  }

  delete(idTarefa: string){
    return this.http.delete(`${this.API}/${idTarefa}`).pipe(first());
  }

}
