package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "contactar_por")
public class ContactarPor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MedioContacto nombre;

    @Column(nullable = false, length = 150)
    private String identificador;

    @ManyToOne
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;
    
    public ContactarPor() {}

    public ContactarPor(Integer id, MedioContacto nombre, String identificador, Actividad actividad) {
        this.id = id;
        this.nombre = nombre;
        this.identificador = identificador;
        this.actividad = actividad;
    }

    public Integer getId() { return id; }
    public MedioContacto getNombre() { return nombre; }
    public String getIdentificador() { return identificador; }
    public Actividad getActividad() { return actividad; }
}