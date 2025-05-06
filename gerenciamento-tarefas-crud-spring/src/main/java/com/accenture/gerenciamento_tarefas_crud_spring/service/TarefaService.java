package com.accenture.gerenciamento_tarefas_crud_spring.service;

import com.accenture.gerenciamento_tarefas_crud_spring.dto.TarefaDTO;
import com.accenture.gerenciamento_tarefas_crud_spring.entity.Tarefa;
import com.accenture.gerenciamento_tarefas_crud_spring.repository.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    @Transactional
    public List<TarefaDTO> findAll(){
        List<Tarefa> resultTarefaList =  tarefaRepository.findAll();
        List<TarefaDTO> listTarefaDTO = resultTarefaList.stream().map(
                tarefaList -> new TarefaDTO(tarefaList.getIdCategoria(),
                        tarefaList.getNomeCategoria(), tarefaList.getCategoriaTarefa())).toList();
        return listTarefaDTO;
    }



}
