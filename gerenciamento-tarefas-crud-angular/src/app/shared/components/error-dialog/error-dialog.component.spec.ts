import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorDialogComponent } from './error-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;
  const mockData = 'Erro de teste';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ErrorDialogComponent,
        MatDialogModule,
        MatButtonModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir a mensagem de erro corretamente', () => {
    const content = fixture.nativeElement.querySelector('div[mat-dialog-content]');
    expect(content.textContent).toContain(mockData);
  });

  it('deve exibir o título em vermelho', () => {
    const title = fixture.nativeElement.querySelector('h1[mat-dialog-title]');
    expect(title.style.color).toBe('red');
  });

  it('deve ter um botão de fechar', () => {
    const button = fixture.nativeElement.querySelector('button[mat-dialog-close]');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Close');
  });

});
