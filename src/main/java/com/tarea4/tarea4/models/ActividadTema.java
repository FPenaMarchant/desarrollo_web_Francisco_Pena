package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "actividad_tema")
public class ActividadTema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tema tema;

    @Column(name = "glosa_otro", length = 15)
    private String glosaOtro;

    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public ActividadTema() {}

    public ActividadTema(Integer id, Tema tema, String glosaOtro, Actividad actividad) {
        this.id = id;
        this.tema = tema;
        this.glosaOtro = glosaOtro;
        this.actividad = actividad;
    }

    public Integer getId() { return id; }
    public Tema getTema() { return tema; }
    public String getGlosaOtro() { return glosaOtro; }
    public Actividad getActividad() { return actividad; }
}