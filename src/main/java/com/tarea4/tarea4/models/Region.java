package com.tarea4.tarea4.models;

import java.util.*;
import jakarta.persistence.*;

@Entity
@Table(name = "region")
public class Region {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 200)
    private String nombre;

    @OneToMany(mappedBy = "region", cascade = CascadeType.ALL)
    private List<Comuna> comunas = new ArrayList<>();

    public Region() {}

    public Region(Integer id, String nombre, List<Comuna> comunas) {
        this.id = id;
        this.nombre = nombre;
        this.comunas = comunas;
    }

    public Integer getId() { return id; }
    public String getNombre() { return nombre; }
    public List<Comuna> getComunas() { return comunas; }
}