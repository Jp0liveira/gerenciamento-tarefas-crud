import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tarefa} from '../../model/tarefa';
import {MatCheckbox} from '@angular/material/checkbox';
import {DatePipe} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {tap} from 'rxjs/operators';
import {TarefasService} from '../../services/tarefas.service';
import {ErrorDialogComponent} from '../../../shared/components/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatIconButton, MatMiniFabButton} from '@angular/material/button';

@Component({
  selector: 'app-tarefas-list',
  imports: [
    MatCheckbox,
    DatePipe,
    MatTable,
    MatIcon,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderRow,
    MatMiniFabButton,
    MatCell,
    MatIconButton,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './tarefas-list.component.html',
  styleUrl: './tarefas-list.component.scss'
})
export class TarefasListComponent implements OnInit{

  @Input() tarefas: Tarefa[] = [];
  @Output() add = new EventEmitter(false);

  readonly displayedColumns = [
    'tituloTarefa',
    'descricaoTarefa',
    'dataVencimentoTarefa',
    'tarefaConcluida',
    'acoes'
  ];

  constructor(
    private tarefasService: TarefasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.add.emit(true);
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
    this.mostrarErro('Ocorreu um erro ao concluir a tarefa.');
    tarefa.tarefaConcluida = !tarefa.tarefaConcluida;
  }

  private mostrarErro(mensagem: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: mensagem
    });
  }

}
