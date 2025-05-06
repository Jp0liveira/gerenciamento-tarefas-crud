import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, combineLatest, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MatTableModule } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tarefa } from '../model/tarefa';
import { TarefasService } from '../services/tarefas.service';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [
    MatTableModule,
    MatCard,
    MatToolbar,
    MatProgressSpinnerModule,
    MatIcon,
    MatMiniFabButton,
    MatIconButton,
    MatCheckbox,
    MatFormField,
    MatOption,
    MatSelect,
    MatLabel,
    AsyncPipe,
    NgIf,
    DatePipe,
    FormsModule
  ],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss']
})
export class TarefasComponent implements OnInit {
  private filtroSubject = new BehaviorSubject<string>('todas');
  tarefas$: Observable<Tarefa[]>;
  tarefasFiltradas$: Observable<Tarefa[]>;

  readonly displayedColumns = [
    'tituloTarefa',
    'descricaoTarefa',
    'dataVencimentoTarefa',
    'tarefaConcluida',
    'acoes'
  ];

  constructor(
    private tarefasService: TarefasService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tarefas$ = this.carregarTarefas();
    this.tarefasFiltradas$ = this.inicializarFiltro();
  }

  ngOnInit(): void {}

  onAdd(): void {
    this.navegarParaNovaTarefa();
  }

  toggleConclusao(tarefa: Tarefa): void {
    this.atualizarStatusTarefa(tarefa);
  }

  atualizarFiltro(status: string): void {
    this.filtroSubject.next(status);
  }

  private inicializarFiltro(): Observable<Tarefa[]> {
    return combineLatest([
      this.tarefas$,
      this.filtroSubject.asObservable()
    ]).pipe(
      map(([tarefas, filtro]) => this.aplicarFiltro(tarefas, filtro))
    );
  }

  private carregarTarefas(): Observable<Tarefa[]> {
    return this.tarefasService.listarTarefas().pipe(
      catchError(error => {
        this.mostrarErro('Ocorreu um erro ao carregar as tarefas.');
        return of([]);
      })
    );
  }

  private aplicarFiltro(tarefas: Tarefa[], filtro: string): Tarefa[] {
    switch(filtro) {
      case 'concluidas':
        return tarefas.filter(t => t.tarefaConcluida);
      case 'pendentes':
        return tarefas.filter(t => !t.tarefaConcluida);
      default:
        return tarefas;
    }
  }

  private atualizarStatusTarefa(tarefa: Tarefa): void {
    this.tarefasService.marcarComoConcluida(tarefa.idTarefa).pipe(
      tap(tarefaAtualizada => {
        tarefa.tarefaConcluida = tarefaAtualizada.tarefaConcluida;
      })
    ).subscribe({
      error: () => this.tratarErroAtualizacao(tarefa)
    });
  }

  private navegarParaNovaTarefa(): void {
    this.router.navigate(['nova'], { relativeTo: this.route });
  }

  private mostrarErro(mensagem: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: mensagem
    });
  }

  private tratarErroAtualizacao(tarefa: Tarefa): void {
    this.mostrarErro('Ocorreu um erro ao concluir a tarefa.');
    tarefa.tarefaConcluida = !tarefa.tarefaConcluida;
  }

}
