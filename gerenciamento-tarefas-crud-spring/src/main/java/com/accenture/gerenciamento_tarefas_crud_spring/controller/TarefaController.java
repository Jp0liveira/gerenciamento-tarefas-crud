package com.accenture.gerenciamento_tarefas_crud_spring.controller;

import com.accenture.gerenciamento_tarefas_crud_spring.dto.TarefaDTO;
import com.accenture.gerenciamento_tarefas_crud_spring.service.TarefaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
