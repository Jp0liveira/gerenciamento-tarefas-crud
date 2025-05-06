package com.accenture.gerenciamento_tarefas_crud_spring.converter;

import com.accenture.gerenciamento_tarefas_crud_spring.dto.TarefaDTO;
import com.accenture.gerenciamento_tarefas_crud_spring.entity.Tarefa;
import org.springframework.stereotype.Component;

@Component
public class TarefaConverter {
    TarefaConverter(){};

    public static TarefaDTO convertToDTO(Tarefa tarefa) {
        return new TarefaDTO(
                tarefa.getIdTarefa(),
                tarefa.getTituloTarefa(),
                tarefa.getDescricaoTarefa(),
                tarefa.getDataVencimentoTarefa(),
                tarefa.getTarefaConcluida()
        );
    }

}
