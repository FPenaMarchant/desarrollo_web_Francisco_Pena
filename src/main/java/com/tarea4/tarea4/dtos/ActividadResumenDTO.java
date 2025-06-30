package com.tarea4.tarea4.dtos;

import java.util.*;
import java.time.LocalDateTime;

public class ActividadResumenDTO {
    private Integer id;
    private LocalDateTime diaHoraInicio;
    private String sector;
    private String nombre;
    private List<String> temas;
    private String promedioNota;

    public ActividadResumenDTO(Integer id, LocalDateTime diaHoraInicio, String sector, String nombre,
                        List<String> temas, String promedioNota) {
        this.id = id;
        this.diaHoraInicio = diaHoraInicio;
        this.sector = sector;
        this.nombre = nombre;
        this.temas = temas;
        this.promedioNota = promedioNota;
    }

    public Integer getId() { return id; }
    public LocalDateTime getDiaHoraInicio() { return diaHoraInicio; }
    public String getSector() { return sector; }
    public String getNombre() { return nombre; }
    public List<String> getTemas() { return temas; }
    public String getPromedioNota() { return promedioNota; }
}