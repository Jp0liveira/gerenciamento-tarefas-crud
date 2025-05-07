import { Routes } from '@angular/router';
import {TarefasComponent} from './containers/tarefas/tarefas.component';
import {TarefaFormComponent} from './containers/tarefa-form/tarefa-form.component';
import {TarefaResolver} from './guards/tarefa.resolver';

export const TAREFAS_ROUTES: Routes = [
  { path: '', component: TarefasComponent },
  { path: 'nova', component: TarefaFormComponent, resolve: { tarefa: TarefaResolver } },
  { path: 'editar/:idTarefa', component: TarefaFormComponent, resolve: { tarefa: TarefaResolver } }

];
