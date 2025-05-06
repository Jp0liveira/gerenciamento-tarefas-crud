package com.accenture.gerenciamento_tarefas_crud_spring.repository;

import com.accenture.gerenciamento_tarefas_crud_spring.entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}
