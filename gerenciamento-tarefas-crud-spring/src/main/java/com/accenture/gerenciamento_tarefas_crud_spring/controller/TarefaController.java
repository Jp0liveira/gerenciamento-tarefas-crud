package com.accenture.gerenciamento_tarefas_crud_spring.controller;

import com.accenture.gerenciamento_tarefas_crud_spring.dto.TarefaDTO;
import com.accenture.gerenciamento_tarefas_crud_spring.entity.Tarefa;
import com.accenture.gerenciamento_tarefas_crud_spring.service.TarefaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @GetMapping
    public List<TarefaDTO> findAll(){
        return tarefaService.findAll();
    }

    @PatchMapping("/{idTerafa}/concluir")
    public ResponseEntity<TarefaDTO> marcarComoConcluida(@PathVariable Long idTerafa) {
        return ResponseEntity.ok(tarefaService.marcarComoConcluida(idTerafa));
    }




}
