import { Routes } from '@angular/router';
import {TarefasComponent} from './tarefas/tarefas.component';
import {TarefaFormComponent} from './tarefa-form/tarefa-form.component';

export const TAREFAS_ROUTES: Routes = [
  { path: '', component: TarefasComponent },
  { path: 'nova', component: TarefaFormComponent }
];
