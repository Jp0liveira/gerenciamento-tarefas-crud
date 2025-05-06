package com.accenture.gerenciamento_tarefas_crud_spring.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tarefa")
    private Long idTarefa;

    @Column(name = "titulo_tarefa", length = 200, nullable = false)
    private String tituloTarefa;

    @Column(name = "descricao_tarefa", length = 250, nullable = false)
    private String descricaoTarefa;

    @Column(name = "data_vencimento_tarefa", nullable = false)
    private LocalDate dataVencimentoTarefa;

    @Column(name = "tarefa_concluida", nullable = false)
    private Boolean tarefaConcluida = false;


    public Long getIdTarefa() {
        return idTarefa;
    }

    public void setIdTarefa(Long idTarefa) {
        this.idTarefa = idTarefa;
    }

    public String getTituloTarefa() {
        return tituloTarefa;
    }

    public void setTituloTarefa(String tituloTarefa) {
        this.tituloTarefa = tituloTarefa;
    }

    public String getDescricaoTarefa() {
        return descricaoTarefa;
    }

    public void setDescricaoTarefa(String descricaoTarefa) {
        this.descricaoTarefa = descricaoTarefa;
    }

    public LocalDate getDataVencimentoTarefa() {
        return dataVencimentoTarefa;
    }

    public void setDataVencimentoTarefa(LocalDate  dataVencimentotarefa) {
        this.dataVencimentoTarefa = dataVencimentotarefa;
    }

    public Boolean getTarefaConcluida() {
        return tarefaConcluida;
    }

    public void setTarefaConcluida(Boolean tarefaConcluida) {
        this.tarefaConcluida = tarefaConcluida;
    }
}
