import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tarefas' },
  {
    path: 'tarefas',
    loadChildren: () => import('./tarefas/tarefas.routes').then(m => m.TAREFAS_ROUTES)
  }
];
