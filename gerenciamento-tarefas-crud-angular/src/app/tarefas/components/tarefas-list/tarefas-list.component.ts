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
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Output() completed = new EventEmitter(false);

  readonly displayedColumns = [
    'tituloTarefa',
    'descricaoTarefa',
    'dataVencimentoTarefa',
    'tarefaConcluida',
    'acoes'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(tarefa: Tarefa) {
    this.edit.emit(tarefa);
  }

  onDelete(tarefa: Tarefa) {
    this.remove.emit(tarefa);
  }

  toggleConclusao(tarefa: Tarefa): void {
    this.completed.emit(tarefa);
  }

}
