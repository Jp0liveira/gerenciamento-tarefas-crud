import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { TarefasService } from '../services/tarefas.service';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TarefaResolver {
  constructor(private service: TarefasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (route.params && route.params['idTarefa']) {
      return this.service.loadById(route.params['idTarefa']);
    }
    const dataAtualFormatada = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

    return of({
      idTarefa: '',
      tituloTarefa: '',
      descricaoTarefa: '',
      dataVencimentoTarefa: dataAtualFormatada,
      tarefaConcluida: false
    });
  }

}



