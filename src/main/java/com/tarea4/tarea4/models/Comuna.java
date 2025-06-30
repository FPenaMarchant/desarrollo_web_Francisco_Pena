package com.tarea4.tarea4.models;

import java.util.*;
import jakarta.persistence.*;

@Entity
@Table(name = "comuna")
public class Comuna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @OneToMany(mappedBy = "comuna", cascade = CascadeType.ALL)
    private List<Actividad> actividades = new ArrayList<>();

    public Comuna() {}

    public Comuna(Integer id, String nombre, Region region, List<Actividad> actividades) {
        this.id = id;
        this.nombre = nombre;
        this.region = region;
        this.actividades = actividades;
    }

    public Integer getId() { return id; }
    public String getNombre() { return nombre; }
    public Region getRegion() { return region; }
    public List<Actividad> getActividades() { return actividades; }
}