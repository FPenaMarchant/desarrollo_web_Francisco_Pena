package com.tarea4.tarea4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comentario")
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 80)
    private String nombre;

    @Column(nullable = false, length = 300)
    private String texto;

    @Column(nullable = false)
    private LocalDateTime fecha = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public Comentario() {}

    public Comentario(Integer id, String nombre, String texto, LocalDateTime fecha, Actividad actividad) {
        this.id = id;
        this.nombre = nombre;
        this.texto = texto;
        this.fecha = fecha;
        this.actividad = actividad;
    }

    public Integer getId() { return id; }
    public String getNombre() { return nombre; }
    public String getTexto() { return texto; }
    public LocalDateTime getFecha() { return fecha; }
    public Actividad getActividad() { return actividad; }
}