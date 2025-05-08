import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {MatTableModule} from '@angular/material/table';
import {MatCard} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialog} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

import {AsyncPipe, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {Tarefa} from '../../model/tarefa';
import {TarefasService} from '../../services/tarefas.service';
import {ErrorDialogComponent} from '../../../shared/components/error-dialog/error-dialog.component';
import {TarefasListComponent} from '../../components/tarefas-list/tarefas-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [
    MatTableModule,
    MatCard,
    MatToolbar,
    MatProgressSpinnerModule,
    MatFormField,
    MatOption,
    MatSelect,
    MatLabel,
    AsyncPipe,
    NgIf,
    FormsModule,
    TarefasListComponent
  ],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss']
})
export class TarefasComponent implements OnInit {
  private filtroSubject = new BehaviorSubject<string>('todas');
  tarefas$: Observable<Tarefa[]>;
  tarefasFiltradas$: Observable<Tarefa[]>;

  constructor(
    private tarefasService: TarefasService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.tarefas$ = this.carregarTarefas();
    this.tarefasFiltradas$ = this.inicializarFiltro();
  }

  ngOnInit(): void {}

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
        this.onError('Ocorreu um erro ao carregar as tarefas.');
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

  refresh(){
    this.tarefas$ = this.carregarTarefas();
    this.tarefasFiltradas$ = this.inicializarFiltro();
  }

  onAdd(): void {
    this.router.navigate(['nova'], { relativeTo: this.route });
  }

  onEdit(tarefa: Tarefa) {
    this.router.navigate(['editar', tarefa.idTarefa], { relativeTo: this.route });
  }

  onDelete(tarefa: Tarefa) {
    this.tarefasService.delete(tarefa.idTarefa).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError('Ocorreu um erro ao excluir a tarefa.')
    });
  }

  toggleConclusao(tarefa: Tarefa): void {
    this.atualizarStatusTarefa(tarefa);
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

  private tratarErroAtualizacao(tarefa: Tarefa): void {
    this.onError('Ocorreu um erro ao concluir a tarefa.');
    tarefa.tarefaConcluida = !tarefa.tarefaConcluida;
  }

  private onSuccess() {
    this.snackBar.open('Tarefa exluída com sucesso!', 'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
    this.refresh();
  }

  private onError(mensagem: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: mensagem
    });
  }

}
