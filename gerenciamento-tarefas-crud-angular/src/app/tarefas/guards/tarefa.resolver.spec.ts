import { TestBed } from '@angular/core/testing';
import { TarefaResolver } from './tarefa.resolver';
import { TarefasService } from '../services/tarefas.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Tarefa } from '../model/tarefa';

describe('TarefaResolver', () => {
  let resolver: TarefaResolver;
  let mockTarefasService: jasmine.SpyObj<TarefasService>;
  const mockRoute = { params: {} } as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  const mockTarefa: Tarefa = {
    idTarefa: '1',
    tituloTarefa: 'Tarefa Teste',
    descricaoTarefa: 'Descrição Teste',
    dataVencimentoTarefa: new Date(),
    tarefaConcluida: false
  };

  beforeEach(() => {
    mockTarefasService = jasmine.createSpyObj('TarefasService', ['loadById']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TarefasService, useValue: mockTarefasService }
      ]
    });

    resolver = TestBed.inject(TarefaResolver);
  });

  it('deve ser criado', () => {
    expect(resolver).toBeTruthy();
  });

  describe('quando há idTarefa nos parâmetros', () => {
    it('deve carregar a tarefa pelo ID', (done: DoneFn) => {
      mockRoute.params = { idTarefa: '1' };

      mockTarefasService.loadById.and.returnValue(of(mockTarefa) as Observable<Tarefa>);

      (resolver.resolve(mockRoute, mockState) as Observable<Tarefa>).subscribe({
        next: (result) => {
          expect(result).toEqual(mockTarefa);
          done();
        },
        error: done.fail
      });

      expect(mockTarefasService.loadById).toHaveBeenCalledWith('1');
    });
  });

});
