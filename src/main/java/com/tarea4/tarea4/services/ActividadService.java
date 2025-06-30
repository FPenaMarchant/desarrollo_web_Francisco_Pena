package com.tarea4.tarea4.services;

import java.util.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.tarea4.tarea4.dtos.*;
import com.tarea4.tarea4.repositories.*;
import com.tarea4.tarea4.models.*;


@Service
public class ActividadService {

    @Autowired
    private ActividadRepository actividadRepository;

    @Autowired
    private ActividadTemaRepository actividadTemaRepository;

    @Autowired
    private NotaRepository notaRepository;

    public List<ActividadResumenDTO> obtenerResumenActividades() {
        List<Actividad> actividades = actividadRepository.findAll();
        List<ActividadResumenDTO> resumenes = new ArrayList<>();

        for (Actividad actividad : actividades) {
            List<String> temas = actividadTemaRepository.findByActividadId(actividad.getId())
                    .stream()
                    .map(at -> at.getTema().name())
                    .toList();

            List<Integer> notas = notaRepository.findByActividadId(actividad.getId())
                    .stream()
                    .map(Nota::getNota)
                    .toList();

            String promedioNota;
            if (notas.isEmpty()) {
                promedioNota = "-";
            } else {
                double avg = notas.stream().mapToInt(n -> n).average().orElse(0.0);
                promedioNota = String.format("%.2f", avg);
            }

            resumenes.add(new ActividadResumenDTO(
                actividad.getId(),
                actividad.getDiaHoraInicio(),
                actividad.getSector(),
                actividad.getNombre(),
                temas,
                promedioNota
            ));
        }

        return resumenes;
    }
}