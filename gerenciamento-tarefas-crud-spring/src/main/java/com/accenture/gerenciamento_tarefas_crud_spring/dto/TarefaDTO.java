package com.accenture.gerenciamento_tarefas_crud_spring.dto;

import java.time.LocalDateTime;

public record TarefaDTO (Long idTarefa,
                         String tituloTarefa,
                         String descricaoTarefa,
                         LocalDateTime dataVencimentotarefa,
                         Boolean tarefaConcluida) {}
