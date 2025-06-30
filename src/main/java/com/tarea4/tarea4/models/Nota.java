package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "nota")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    @Column(nullable = false)
    private Integer nota;

    public Nota() {}

    public Nota(Integer id, Actividad actividad, Integer nota) {
        this.id = id;
        this.actividad = actividad;
        this.nota = nota;
    }

    public Integer getId() {
        return id;
    }

    public Actividad getActividad() {
        return actividad;
    }

    public Integer getNota() {
        return nota;
    }
}