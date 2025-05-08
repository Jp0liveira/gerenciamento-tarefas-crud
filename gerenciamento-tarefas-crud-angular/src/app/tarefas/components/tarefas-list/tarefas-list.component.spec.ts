import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarefasListComponent } from './tarefas-list.component';
import { Tarefa } from '../../model/tarefa';

describe('TarefasListComponent', () => {
  let component: TarefasListComponent;
  let fixture: ComponentFixture<TarefasListComponent>;

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
    await TestBed.configureTestingModule({
      imports: [TarefasListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TarefasListComponent);
    component = fixture.componentInstance;
    component.tarefas = mockTarefas;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve expor as colunas corretas', () => {
    expect(component.displayedColumns).toEqual([
      'tituloTarefa',
      'descricaoTarefa',
      'dataVencimentoTarefa',
      'tarefaConcluida',
      'acoes'
    ]);
  });

  it('deve emitir event add', () => {
    spyOn(component.add, 'emit');
    component.onAdd();
    expect(component.add.emit).toHaveBeenCalledWith(true);
  });

  it('deve emitir event edit com a tarefa', () => {
    spyOn(component.edit, 'emit');
    component.onEdit(mockTarefas[0]);
    expect(component.edit.emit).toHaveBeenCalledWith(mockTarefas[0]);
  });

  it('deve emitir event remove com a tarefa', () => {
    spyOn(component.remove, 'emit');
    component.onDelete(mockTarefas[0]);
    expect(component.remove.emit).toHaveBeenCalledWith(mockTarefas[0]);
  });

  it('deve emitir event completed ao alternar conclusão', () => {
    spyOn(component.completed, 'emit');
    component.toggleConclusao(mockTarefas[0]);
    expect(component.completed.emit).toHaveBeenCalledWith(mockTarefas[0]);
  });

  it('deve renderizar uma linha de tarefa', () => {
    const rows = fixture.nativeElement.querySelectorAll('mat-row');
    expect(rows.length).toBe(1);
    const cells = rows[0].querySelectorAll('mat-cell');
    expect(cells[0].textContent).toContain('Tarefa 1');
    expect(cells[1].textContent).toContain('Descrição 1');
  });
});
