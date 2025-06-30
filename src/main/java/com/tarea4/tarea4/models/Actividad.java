package com.tarea4.tarea4.models;

import java.util.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "actividad")
public class Actividad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "comuna_id", nullable = false)
    private Comuna comuna;
    
    @Column(length = 100)
    private String sector;

    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 15)
    private String celular;

    @Column(name = "dia_hora_inicio", nullable = false)
    private LocalDateTime diaHoraInicio;

    @Column(name = "dia_hora_termino")
    private LocalDateTime diaHoraTermino;

    @Column(length = 500)
    private String descripcion;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Foto> fotos = new ArrayList<>();

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContactarPor> mediosContacto = new ArrayList<>();

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ActividadTema> temas = new ArrayList<>();

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<Comentario> comentarios = new ArrayList<>();

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private List<Nota> notas = new ArrayList<>();

    public Actividad() {}

    public Actividad(Integer id, Comuna comuna, String sector, String nombre, String email,
                 String celular, LocalDateTime diaHoraInicio, LocalDateTime diaHoraTermino,
                 String descripcion, List<Foto> fotos, List<ContactarPor> mediosContacto,
                 List<ActividadTema> temas, List<Comentario> comentarios, List<Nota> notas) {
        this.id = id;
        this.comuna = comuna;
        this.sector = sector;
        this.nombre = nombre;
        this.email = email;
        this.celular = celular;
        this.diaHoraInicio = diaHoraInicio;
        this.diaHoraTermino = diaHoraTermino;
        this.descripcion = descripcion;
        this.fotos = fotos;
        this.mediosContacto = mediosContacto;
        this.temas = temas;
        this.comentarios = comentarios;
        this.notas = notas;
    }

    public Integer getId() { return id; }
    public Comuna getComuna() { return comuna; }
    public String getSector() { return sector; }
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
    public String getCelular() { return celular; }
    public LocalDateTime getDiaHoraInicio() { return diaHoraInicio; }
    public LocalDateTime getDiaHoraTermino() { return diaHoraTermino; }
    public String getDescripcion() { return descripcion; }
    public List<Foto> getFotos() { return fotos; }
    public List<ContactarPor> getMediosContacto() { return mediosContacto; }
    public List<ActividadTema> getTemas() { return temas; }
    public List<Comentario> getComentarios() { return comentarios; }
    public List<Nota> getNotas() { return notas; }
}