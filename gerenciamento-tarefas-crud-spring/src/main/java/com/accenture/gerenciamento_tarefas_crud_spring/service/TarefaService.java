package com.accenture.gerenciamento_tarefas_crud_spring.service;

import com.accenture.gerenciamento_tarefas_crud_spring.converter.TarefaConverter;
import com.accenture.gerenciamento_tarefas_crud_spring.dto.TarefaDTO;
import com.accenture.gerenciamento_tarefas_crud_spring.entity.Tarefa;
import com.accenture.gerenciamento_tarefas_crud_spring.repository.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static com.accenture.gerenciamento_tarefas_crud_spring.converter.TarefaConverter.convertToDTO;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    @Transactional
    public List<TarefaDTO> findAll(){
        List<Tarefa> resultTarefaList =  tarefaRepository.findAll();
        List<TarefaDTO> listTarefaDTO = resultTarefaList.stream().map(TarefaConverter::convertToDTO).toList();
        return listTarefaDTO;
    }

    @Transactional
    public TarefaDTO marcarComoConcluida(Long idTerafa) {
        Tarefa tarefa = tarefaRepository.findById(idTerafa)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarefa não encontrada com o ID: " + idTerafa));
        tarefa.setTarefaConcluida(!tarefa.getTarefaConcluida());
        tarefaRepository.save(tarefa);
        return convertToDTO(tarefa);
    }

}
