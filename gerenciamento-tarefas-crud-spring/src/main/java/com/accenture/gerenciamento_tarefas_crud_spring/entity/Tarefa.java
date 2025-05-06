package com.accenture.gerenciamento_tarefas_crud_spring.entity;

import jakarta.persistence.*;

@Entity
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tarefa")
    private Long idTerafa;

    @Column(name = "nome_tarefa", length = 200, nullable = false)
    private String nomeTarefa;

    @Column(name = "categoria_tarefa", length = 200, nullable = false)
    private String categoriaTarefa;

    public Long getIdCategoria() {
        return idTerafa;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idTerafa = idCategoria;
    }

    public String getNomeCategoria() {
        return nomeTarefa;
    }

    public void setNomeCategoria(String nomeCategoria) {
        this.nomeTarefa = nomeCategoria;
    }

    public String getCategoriaTarefa() {
        return categoriaTarefa;
    }

    public void setCategoriaTarefa(String categoriaTarefa) {
        this.categoriaTarefa = categoriaTarefa;
    }

}
