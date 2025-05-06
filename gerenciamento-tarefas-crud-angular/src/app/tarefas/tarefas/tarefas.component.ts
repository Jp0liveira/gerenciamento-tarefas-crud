import {Component, OnInit} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {Tarefa} from '../model/tarefa';

@Component({
  selector: 'app-tarefas',
  imports: [MatTableModule],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.scss'
})
export class TarefasComponent implements OnInit{
  tarefa: Tarefa[] = [
    { idTerafa: '1',
      nomeTarefa: 'programar',
      categoriaTarefa: '2'
    }
  ];

  displayedColumns = ['nomeTarefa', 'categoriaTarefa']

  constructor() {
  }

  ngOnInit(): void { }

}
