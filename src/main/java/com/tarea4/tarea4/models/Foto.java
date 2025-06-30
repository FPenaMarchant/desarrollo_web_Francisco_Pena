package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "foto")
public class Foto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ruta_archivo", nullable = false, length = 300)
    private String rutaArchivo;

    @Column(name = "nombre_archivo", nullable = false, length = 300)
    private String nombreArchivo;

    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public Foto() {}

    public Foto(Integer id, String rutaArchivo, String nombreArchivo, Actividad actividad) {
        this.id = id;
        this.rutaArchivo = rutaArchivo;
        this.nombreArchivo = nombreArchivo;
        this.actividad = actividad;
    }

    public Integer getId() { return id; }
    public String getRutaArchivo() { return rutaArchivo; }
    public String getNombreArchivo() { return nombreArchivo; }
    public Actividad getActividad() { return actividad; }
}