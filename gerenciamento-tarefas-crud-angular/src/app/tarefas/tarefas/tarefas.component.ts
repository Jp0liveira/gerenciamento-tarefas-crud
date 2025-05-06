import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Tarefa } from '../model/tarefa';
import { MatCard } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import {TarefasService} from '../services/tarefas.service';
import {catchError, Observable, of} from 'rxjs';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-tarefas',
  imports: [MatTableModule, MatCard, MatToolbar, MatProgressSpinnerModule, AsyncPipe, NgIf],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.scss'
})
export class TarefasComponent implements OnInit{
  tarefa$: Observable<Tarefa[]>;

  displayedColumns = ['nomeTarefa', 'categoriaTarefa']

  constructor(private tarefasService: TarefasService,
              public dialog: MatDialog
  ) {
    this.tarefa$ = this.tarefasService.listarTarefas().pipe(
      catchError(error => {
        this.onError('Ocorreu um erro ao carregar as tarefas.');
        return of([])
      })
    );
  }

  ngOnInit(): void {
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

}
