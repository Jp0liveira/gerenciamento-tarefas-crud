package com.accenture.gerenciamento_tarefas_crud_spring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TarefaNotFoundException extends RuntimeException{

    public TarefaNotFoundException(Long idTarefa) {
        super("Tarefa não encontrada com o ID: " + idTarefa);
    }

    public TarefaNotFoundException(String message) {
        super(message);
    }

    public TarefaNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
