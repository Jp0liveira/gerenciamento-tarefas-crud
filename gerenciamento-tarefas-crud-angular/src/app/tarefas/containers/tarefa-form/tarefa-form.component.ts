import {Component, OnInit} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {TarefasService} from '../../services/tarefas.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../../shared/components/error-dialog/error-dialog.component';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Tarefa} from '../../model/tarefa';

@Component({
  selector: 'app-tarefa-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatCard,
    MatToolbar,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './tarefa-form.component.html',
  styleUrl: './tarefa-form.component.scss'
})
export class TarefaFormComponent implements OnInit{

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: TarefasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const tarefa: Tarefa = this.route.snapshot.data['tarefa'];
    this.form = this.formBuilder.group({
      idTarefa: [tarefa.idTarefa],
      tituloTarefa: [tarefa.tituloTarefa],
      descricaoTarefa: [tarefa.descricaoTarefa],
      dataVencimentoTarefa: [tarefa.dataVencimentoTarefa],
      tarefaConcluida: [tarefa.tarefaConcluida]
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError()
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Tarefa salva com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.dialog.open(ErrorDialogComponent, {
      data: 'Ocorreu um erro ao salvar a tarefa.'
    });
    console.log(this.form.value);
  }

}
