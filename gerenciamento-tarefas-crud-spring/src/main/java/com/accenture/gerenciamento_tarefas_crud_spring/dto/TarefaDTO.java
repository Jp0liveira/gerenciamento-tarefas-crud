package com.accenture.gerenciamento_tarefas_crud_spring.dto;

import java.time.LocalDate;

public record TarefaDTO (Long idTarefa,
                         String tituloTarefa,
                         String descricaoTarefa,
                         LocalDate dataVencimentoTarefa,
                         Boolean tarefaConcluida) {}
