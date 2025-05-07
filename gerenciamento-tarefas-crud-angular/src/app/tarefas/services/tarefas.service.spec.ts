import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TarefasService } from './tarefas.service';
import { Tarefa } from '../model/tarefa';
import { provideHttpClient } from '@angular/common/http';

describe('TarefasService', () => {
  let service: TarefasService;
  let httpMock: HttpTestingController;
  const mockTarefa: Tarefa = {
    idTarefa: '1',
    tituloTarefa: 'Teste',
    descricaoTarefa: 'Descrição tarefa teste',
    dataVencimentoTarefa: new Date(),
    tarefaConcluida: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TarefasService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TarefasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o servico', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar tarefas com os parâmetros corretos', fakeAsync(() => {
    const mockResponse: Tarefa[] = [mockTarefa];

    service.listarTarefas().subscribe(tarefas => {
      expect(tarefas.length).toBe(1);
      expect(tarefas[0]).toEqual(mockTarefa);
    });

    const req = httpMock.expectOne('/api/tarefas');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    tick(2000);
  }));

  it('deve criar uma nova tarefa ao salvar (sem ID)', () => {
    const newTask: Partial<Tarefa> = {
      tituloTarefa: 'Nova Tarefa',
      descricaoTarefa: 'Descrição nova'
    };

    service.save(newTask).subscribe(task => {
      expect(task).toEqual(mockTarefa);
    });

    const req = httpMock.expectOne('/api/tarefas');
    expect(req.request.method).toBe('POST');
    req.flush(mockTarefa);
  });

  it('deve atualizar a tarefa existente ao salvar com ID', () => {
    const updatedTask: Partial<Tarefa> = {
      ...mockTarefa,
      tituloTarefa: 'Título Atualizado'
    };

    service.save(updatedTask).subscribe(task => {
      expect(task.tituloTarefa).toBe('Título Atualizado');
    });

    const req = httpMock.expectOne(`/api/tarefas/${mockTarefa.idTarefa}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('deve marcar a tarefa como concluída', () => {
    service.marcarComoConcluida('1').subscribe(task => {
      expect(task.tarefaConcluida).toBe(true);
    });

    const req = httpMock.expectOne('/api/tarefas/1/concluir');
    expect(req.request.method).toBe('PATCH');
    req.flush({ ...mockTarefa, tarefaConcluida: true });
  });

  it('deve carregar tarefa por ID', () => {
    service.loadById('1').subscribe(task => {
      expect(task).toEqual(mockTarefa);
    });

    const req = httpMock.expectOne('/api/tarefas/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockTarefa);
  });

  it('deve excluir a tarefa', () => {
    service.delete('1').subscribe();

    const req = httpMock.expectOne('/api/tarefas/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('deve tratar o erro para listarTarefas', fakeAsync(() => {
    let errorResponse: any;

    service.listarTarefas().subscribe({
      error: (error) => errorResponse = error
    });

    const req = httpMock.expectOne('/api/tarefas');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    tick(2000);
    expect(errorResponse).toBeDefined();
  }));
});
