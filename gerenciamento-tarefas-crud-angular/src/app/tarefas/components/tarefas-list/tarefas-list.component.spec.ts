import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarefasListComponent } from './tarefas-list.component';
import { TarefasService } from '../../services/tarefas.service';
import { MatDialog } from '@angular/material/dialog';
import { Tarefa } from '../../model/tarefa';
import { of, throwError } from 'rxjs';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TarefasListComponent', () => {
  let component: TarefasListComponent;
  let fixture: ComponentFixture<TarefasListComponent>;
  let mockTarefasService: jasmine.SpyObj<TarefasService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockTarefas: Tarefa[] = [
    {
      idTarefa: '1',
      tituloTarefa: 'Tarefa 1',
      descricaoTarefa: 'Descrição 1',
      dataVencimentoTarefa: new Date(),
      tarefaConcluida: false
    }
  ];

  beforeEach(async () => {
    mockTarefasService = jasmine.createSpyObj('TarefasService', ['marcarComoConcluida']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [TarefasListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TarefasService, useValue: mockTarefasService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TarefasListComponent);
    component = fixture.componentInstance;
    component.tarefas = mockTarefas;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir as colunas corretamente', () => {
    const expectedColumns = ['tituloTarefa', 'descricaoTarefa', 'dataVencimentoTarefa', 'tarefaConcluida', 'acoes'];
    expect(component.displayedColumns).toEqual(expectedColumns);
  });

  it('deve emitir evento add', () => {
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalledWith(true);
  });

  it('deve emitir evento edit', () => {
    spyOn(component.edit, 'emit');
    component.onEdit(mockTarefas[0]);
    expect(component.edit.emit).toHaveBeenCalledWith(mockTarefas[0]);
  });

  it('deve emitir evento remove', () => {
    spyOn(component.remove, 'emit');
    component.onDelete(mockTarefas[0]);
    expect(component.remove.emit).toHaveBeenCalledWith(mockTarefas[0]);
  });

  it('deve atualizar status da tarefa com sucesso', () => {
    const updatedTarefa = { ...mockTarefas[0], tarefaConcluida: true };
    mockTarefasService.marcarComoConcluida.and.returnValue(of(updatedTarefa));

    component.toggleConclusao(mockTarefas[0]);

    expect(mockTarefasService.marcarComoConcluida).toHaveBeenCalledWith('1');
    expect(mockTarefas[0].tarefaConcluida).toBeTrue();
  });

  it('deve tratar erro na atualização de status', () => {
    mockTarefasService.marcarComoConcluida.and.returnValue(throwError(() => new Error('Erro')));

    component.toggleConclusao(mockTarefas[0]);

    expect(mockDialog.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      data: 'Ocorreu um erro ao concluir a tarefa.'
    });
  });

  it('deve renderizar as tarefas corretamente', () => {
    const compiled = fixture.nativeElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBe(1);

    const cells = rows[0].querySelectorAll('mat-cell');
    expect(cells[0].textContent).toContain('Tarefa 1');
    expect(cells[1].textContent).toContain('Descrição 1');
  });

});
