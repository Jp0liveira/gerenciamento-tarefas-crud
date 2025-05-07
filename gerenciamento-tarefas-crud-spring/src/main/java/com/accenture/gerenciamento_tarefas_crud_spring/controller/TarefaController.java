package com.accenture.gerenciamento_tarefas_crud_spring.controller;

import com.accenture.gerenciamento_tarefas_crud_spring.dto.TarefaDTO;
import com.accenture.gerenciamento_tarefas_crud_spring.service.TarefaService;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<TarefaDTO> toggleConclusao(@PathVariable Long idTerafa) {
        return ResponseEntity.ok(tarefaService.toggleConclusao(idTerafa));
    }

    @PostMapping
    public ResponseEntity<TarefaDTO> create(@RequestBody TarefaDTO tarefaDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(tarefaService.create(tarefaDTO));
    }

    @GetMapping("/{idTerafa}")
    public ResponseEntity<TarefaDTO> findById(@PathVariable Long idTerafa) {
        return ResponseEntity.ok(tarefaService.findById(idTerafa));
    }

    @PutMapping("/{idTerafa}")
    public ResponseEntity<TarefaDTO> update(@PathVariable Long idTerafa, @RequestBody TarefaDTO tarefaDTO) {
        return ResponseEntity.ok(tarefaService.update(idTerafa, tarefaDTO));
    }

}
