import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TarefasComponent } from './tarefas.component';
import { TarefasService } from '../../services/tarefas.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Tarefa } from '../../model/tarefa';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

describe('TarefasComponent', () => {
  let component: TarefasComponent;
  let fixture: ComponentFixture<TarefasComponent>;
  let mockTarefasService: jasmine.SpyObj<TarefasService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockTarefas: Tarefa[] = [
    { idTarefa: '1', tituloTarefa: 'Tarefa 1', descricaoTarefa: 'Desc 1', dataVencimentoTarefa: new Date(), tarefaConcluida: false },
    { idTarefa: '2', tituloTarefa: 'Tarefa 2', descricaoTarefa: 'Desc 2', dataVencimentoTarefa: new Date(), tarefaConcluida: true }
  ];

  beforeEach(async () => {
    mockTarefasService = jasmine.createSpyObj('TarefasService', {
      listarTarefas: of(mockTarefas),
      delete: of(null)
    });
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [TarefasComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: TarefasService, useValue: mockTarefasService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TarefasComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicializacao', () => {
    it('deve carregar tarefas no init', fakeAsync(() => {
      mockTarefasService.listarTarefas.and.returnValue(of(mockTarefas));
      component.ngOnInit();
      tick();

      component.tarefasFiltradas$.subscribe(tarefas => {
        expect(tarefas.length).toBe(2);
      });
    }));
  });

  describe('Filtro', () => {
    beforeEach(() => {
      mockTarefasService.listarTarefas.and.returnValue(of(mockTarefas));
      component.ngOnInit();
    });

    it('deve filtrar tarefas concluídas', fakeAsync(() => {
      component.atualizarFiltro('concluidas');
      tick();

      component.tarefasFiltradas$.subscribe(tarefas => {
        expect(tarefas.length).toBe(1);
        expect(tarefas[0].tarefaConcluida).toBeTrue();
      });
    }));

    it('deve filtrar tarefas pendentes', fakeAsync(() => {
      component.atualizarFiltro('pendentes');
      tick();

      component.tarefasFiltradas$.subscribe(tarefas => {
        expect(tarefas.length).toBe(1);
        expect(tarefas[0].tarefaConcluida).toBeFalse();
      });
    }));

    it('deve mostrar todas as tarefas quando o filtro estiver todas', fakeAsync(() => {
      component.atualizarFiltro('todas');
      tick();

      component.tarefasFiltradas$.subscribe(tarefas => {
        expect(tarefas.length).toBe(2);
      });
    }));
  });

  describe('Acoes', () => {
    it('deve navegar para adicionar nova tarefa', () => {
      component.onAdd();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['nova'], { relativeTo: TestBed.inject(ActivatedRoute) });
    });

    it('deve navegar para editar tarefa', () => {
      const tarefa = mockTarefas[0];
      component.onEdit(tarefa);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['editar', tarefa.idTarefa], { relativeTo: TestBed.inject(ActivatedRoute) });
    });

    it('deve excluir tarefa e mostrar mensagem de sucesso', fakeAsync(() => {
      mockTarefasService.delete.and.returnValue(of([]));
      component.onDelete(mockTarefas[0]);
      tick();

      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Tarefa exluída com sucesso!',
        'X',
        jasmine.objectContaining({
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
      );
      expect(mockTarefasService.listarTarefas).toHaveBeenCalledTimes(2); // Initial load + refresh
    }));

    it('deve tratar o erro de exclusão', fakeAsync(() => {
      mockTarefasService.delete.and.returnValue(throwError(() => new Error('Error')));
      component.onDelete(mockTarefas[0]);
      tick();

      expect(mockDialog.open).toHaveBeenCalledWith(ErrorDialogComponent, {
        data: 'Ocorreu um erro ao excluir a tarefa.'
      });
    }));
  });

  describe('Refresh', () => {
    it('deve atualizar a lista de tarefas', fakeAsync(() => {
      mockTarefasService.listarTarefas.calls.reset();
      component.refresh();
      tick();

      expect(mockTarefasService.listarTarefas).toHaveBeenCalledTimes(1);
    }));
  });

});
