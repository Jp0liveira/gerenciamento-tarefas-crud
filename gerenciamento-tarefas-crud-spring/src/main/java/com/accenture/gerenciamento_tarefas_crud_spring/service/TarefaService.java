package com.accenture.gerenciamento_tarefas_crud_spring.service;

import com.accenture.gerenciamento_tarefas_crud_spring.converter.TarefaConverter;
import com.accenture.gerenciamento_tarefas_crud_spring.dto.TarefaDTO;
import com.accenture.gerenciamento_tarefas_crud_spring.entity.Tarefa;
import com.accenture.gerenciamento_tarefas_crud_spring.exception.TarefaNotFoundException;
import com.accenture.gerenciamento_tarefas_crud_spring.repository.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static com.accenture.gerenciamento_tarefas_crud_spring.converter.TarefaConverter.convertToDTO;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    @Transactional
    public List<TarefaDTO> findAll() {
        return tarefaRepository.findAll()
                .stream()
                .map(TarefaConverter::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public TarefaDTO findById(Long idTarefa) {
        Tarefa tarefa = findTarefaByIdOrThrow(idTarefa);
        return TarefaConverter.convertToDTO(tarefa);
    }

    @Transactional
    public TarefaDTO create(TarefaDTO tarefaDTO) {
        Tarefa tarefa = TarefaConverter.convertToEntity(tarefaDTO);
        Tarefa savedTarefa = tarefaRepository.save(tarefa);
        return TarefaConverter.convertToDTO(savedTarefa);
    }

    @Transactional
    public TarefaDTO update(Long idTarefa, TarefaDTO tarefaDTO) {
        Tarefa existingTarefa = findTarefaByIdOrThrow(idTarefa);

        existingTarefa.setTituloTarefa(tarefaDTO.tituloTarefa());
        existingTarefa.setDescricaoTarefa(tarefaDTO.descricaoTarefa());
        existingTarefa.setDataVencimentoTarefa(tarefaDTO.dataVencimentoTarefa());
        existingTarefa.setTarefaConcluida(tarefaDTO.tarefaConcluida());

        Tarefa updatedTarefa = tarefaRepository.save(existingTarefa);
        return TarefaConverter.convertToDTO(updatedTarefa);
    }

    @Transactional
    public void delete(Long idTarefa) {
        Tarefa tarefa = findTarefaByIdOrThrow(idTarefa);
        tarefaRepository.delete(tarefa);
    }

    @Transactional
    public TarefaDTO toggleConclusao(Long idTarefa) {
        Tarefa tarefa = findTarefaByIdOrThrow(idTarefa);
        tarefa.setTarefaConcluida(!tarefa.getTarefaConcluida());
        Tarefa savedTarefa = tarefaRepository.save(tarefa);
        return TarefaConverter.convertToDTO(savedTarefa);
    }

    private Tarefa findTarefaByIdOrThrow(Long idTarefa) {
        return tarefaRepository.findById(idTarefa)
                .orElseThrow(() -> new TarefaNotFoundException(idTarefa));
    }

}
