import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TarefaFormComponent } from './tarefa-form.component';
import { TarefasService } from '../../services/tarefas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { of, throwError } from 'rxjs';
import { Tarefa } from '../../model/tarefa';

describe('TarefaFormComponent', () => {
  let component: TarefaFormComponent;
  let fixture: ComponentFixture<TarefaFormComponent>;
  let mockTarefasService: jasmine.SpyObj<TarefasService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute: any;

  const mockTarefa: Tarefa = {
    idTarefa: '1',
    tituloTarefa: 'Tarefa Teste',
    descricaoTarefa: 'Descrição tarefa teste',
    dataVencimentoTarefa: new Date(),
    tarefaConcluida: false
  };

  beforeEach(async () => {
    mockTarefasService = jasmine.createSpyObj('TarefasService', ['save']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    mockActivatedRoute = {
      snapshot: {
        data: {
          tarefa: mockTarefa
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [TarefaFormComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: TarefasService, useValue: mockTarefasService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MatDialog, useValue: mockDialog },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TarefaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com os dados', () => {
    expect(component.form.value).toEqual({
      idTarefa: '1',
      tituloTarefa: 'Tarefa Teste',
      descricaoTarefa: 'Descrição tarefa teste',
      dataVencimentoTarefa: mockTarefa.dataVencimentoTarefa,
      tarefaConcluida: false
    });
  });

  it('deve enviar o formulário com sucesso', fakeAsync(() => {
    mockTarefasService.save.and.returnValue(of({
      idTarefa: '1',
      tituloTarefa: 'Tarefa Teste',
      descricaoTarefa: 'Descrição Teste',
      dataVencimentoTarefa: mockTarefa.dataVencimentoTarefa,
      tarefaConcluida: false
    }));
    component.onSubmit();
    tick();

    expect(mockTarefasService.save).toHaveBeenCalledWith(component.form.value);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Tarefa salva com sucesso!', '', { duration: 5000 });
    expect(mockLocation.back).toHaveBeenCalled();
  }));

  it('deve tratar o erro de envio', fakeAsync(() => {
    mockTarefasService.save.and.returnValue(throwError(() => new Error('Error')));
    component.onSubmit();
    tick();

    expect(mockDialog.open).toHaveBeenCalledWith(ErrorDialogComponent, {
      data: 'Ocorreu um erro ao salvar a tarefa.'
    });
  }));

  it('deve cancelar e navegar de volta', () => {
    component.onCancel();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('deve inicializar novo formulário de tarefa quando não houver dados', () => {
    mockActivatedRoute.snapshot.data.tarefa = {
      idTarefa: '',
      tituloTarefa: '',
      descricaoTarefa: '',
      dataVencimentoTarefa: null,
      tarefaConcluida: false
    };

    fixture = TestBed.createComponent(TarefaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.form.value).toEqual({
      idTarefa: '',
      tituloTarefa: '',
      descricaoTarefa: '',
      dataVencimentoTarefa: null,
      tarefaConcluida: false
    });
  });

});
