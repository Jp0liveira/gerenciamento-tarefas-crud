import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Tarefa } from '../model/tarefa';
import { MatCard } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { TarefasService } from '../services/tarefas.service';
import {catchError, Observable, of, switchMap, tap} from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { MatIcon } from '@angular/material/icon';
import {MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-tarefas',
  imports: [MatTableModule, MatCard, MatToolbar, MatProgressSpinnerModule, AsyncPipe, NgIf, MatIcon, MatMiniFabButton, MatIconButton, DatePipe, MatCheckbox],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.scss'
})
export class TarefasComponent implements OnInit{
  tarefa$: Observable<Tarefa[]>;

  displayedColumns = ['tituloTarefa', 'descricaoTarefa', 'dataVencimentoTarefa', 'tarefaConcluida', 'acoes']

  constructor(private tarefasService: TarefasService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
  ) {
    this.tarefa$ = this.carregarTarefas();
  }

  ngOnInit(): void {
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['nova'], { relativeTo: this.route });
  }

  toggleConclusao(tarefa: Tarefa) {
    this.tarefasService.marcarComoConcluida(tarefa.idTarefa).pipe(
      tap(tarefaAtualizada => {
        tarefa.tarefaConcluida = tarefaAtualizada.tarefaConcluida;
      })
    ).subscribe({
      error: (erro) => {
        this.onError('Ocorreu um erro ao concluir a tarefa.');
        tarefa.tarefaConcluida = !tarefa.tarefaConcluida;
      }
    });
  }

  carregarTarefas(): Observable<Tarefa[]> {
    return this.tarefasService.listarTarefas().pipe(
      catchError(error => {
        this.onError('Ocorreu um erro ao carregar as tarefas.');
        return of([]);
      })
    );
  }


}
