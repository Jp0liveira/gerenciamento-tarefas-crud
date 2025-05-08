package com.accenture.gerenciamento_tarefas_crud_spring.service;

import com.accenture.gerenciamento_tarefas_crud_spring.dto.TarefaDTO;
import com.accenture.gerenciamento_tarefas_crud_spring.entity.Tarefa;
import com.accenture.gerenciamento_tarefas_crud_spring.exception.TarefaNotFoundException;
import com.accenture.gerenciamento_tarefas_crud_spring.repository.TarefaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)

class TarefaServiceTest {
    @Mock
    private TarefaRepository tarefaRepository;

    @InjectMocks
    private TarefaService tarefaService;

    private Tarefa tarefa;

    private TarefaDTO tarefaDTO;

    @BeforeEach
    void setUp() {
        tarefa = new Tarefa();
        tarefa.setIdTarefa(1L);
        tarefa.setTituloTarefa("Tarefa Teste");
        tarefa.setDescricaoTarefa("Descrição Teste");
        tarefa.setDataVencimentoTarefa(LocalDate.now());
        tarefa.setTarefaConcluida(false);

        tarefaDTO = new TarefaDTO(
                1L,
                "Tarefa Teste",
                "Descrição Teste",
                LocalDate.now(),
                false
        );

    }

    @Test
    void findAll_DeveRetornarListaDeTarefasDTO() {
        when(tarefaRepository.findAll()).thenReturn(Collections.singletonList(tarefa));
        List<TarefaDTO> result = tarefaService.findAll();
        assertEquals(1, result.size());
        verify(tarefaRepository).findAll();
    }

    @Test
    void findById_QuandoExistir_DeveRetornarTarefaDTO() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));
        TarefaDTO result = tarefaService.findById(1L);
        assertNotNull(result);
        assertEquals("Tarefa Teste", result.tituloTarefa());
        verify(tarefaRepository).findById(1L);
    }

    @Test
    void findById_QuandoNaoExistir_DeveLancarExcecao() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(TarefaNotFoundException.class, () -> tarefaService.findById(1L));
    }

    @Test
    void create_DeveSalvarERetornarTarefaDTO() {
        when(tarefaRepository.save(any(Tarefa.class))).thenReturn(tarefa);
        TarefaDTO result = tarefaService.create(tarefaDTO);
        assertNotNull(result);
        assertEquals(tarefaDTO.tituloTarefa(), result.tituloTarefa());
        verify(tarefaRepository).save(any(Tarefa.class));
    }

    @Test
    void update_QuandoExistir_DeveAtualizarERetornarTarefaDTO() {
        TarefaDTO updatedDTO = new TarefaDTO(
                1L,
                "Tarefa Atualizada",
                "Descrição Atualizada",
                LocalDate.now().plusDays(1),
                true
        );
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));
        when(tarefaRepository.save(any(Tarefa.class))).thenReturn(tarefa);
        TarefaDTO result = tarefaService.update(1L, updatedDTO);
        assertNotNull(result);
        assertEquals(updatedDTO.tituloTarefa(), result.tituloTarefa());
        verify(tarefaRepository).save(any(Tarefa.class));
    }

    @Test
    void delete_QuandoExistir_DeveExcluirTarefa() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));
        doNothing().when(tarefaRepository).delete(tarefa);
        tarefaService.delete(1L);
        verify(tarefaRepository).delete(tarefa);
    }

    @Test
    void toggleConclusao_DeveAlternarStatusConclusao() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefa));
        when(tarefaRepository.save(any(Tarefa.class))).thenReturn(tarefa);
        TarefaDTO result = tarefaService.toggleConclusao(1L);
        assertTrue(result.tarefaConcluida());
        verify(tarefaRepository).save(tarefa);
    }

    @Test
    void toggleConclusao_QuandoNaoExistir_DeveLancarExcecao() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(TarefaNotFoundException.class, () -> tarefaService.toggleConclusao(1L));
    }

}