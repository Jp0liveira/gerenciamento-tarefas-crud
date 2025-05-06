import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Tarefa} from '../model/tarefa';
import {delay, first, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private readonly API = '/api/tarefas';

  constructor(private http: HttpClient) { }

  listarTarefas(){
    return this.http.get<Tarefa[]>(this.API).pipe(
      first(),
      delay(5000),
      tap(tarefas => console.log(tarefas))
    );

    // [
    //   { idTerafa: '1',
    //     nomeTarefa: 'programar',
    //     categoriaTarefa: '2'
    //   }
    // ];
  }

}
