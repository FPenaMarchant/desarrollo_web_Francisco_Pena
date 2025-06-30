package com.tarea4.tarea4.dtos;

public class NotaRequestDTO {
    private Integer actividadId;
    private String nota;

    public Integer getActividadId() { return actividadId; }
    public String getNota() { return nota; }

    public void setActividadId(Integer actividadId) {
        this.actividadId = actividadId;
    }

    public void setNota(String nota) {
        this.nota = nota;
    }
}