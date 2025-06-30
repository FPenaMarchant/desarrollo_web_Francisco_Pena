package com.tarea4.tarea4.controllers;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import com.tarea4.tarea4.repositories.*;
import com.tarea4.tarea4.models.*;
import com.tarea4.tarea4.dtos.*;


@RestController
@RequestMapping("/api/notas")
public class NotaRestController {

    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private ActividadRepository actividadRepository;

    @PostMapping("/guardar")
    public ResponseEntity<String> guardarNotaAjax(@RequestBody NotaRequestDTO notaRequest) {
        Optional<Actividad> actividadOpt = actividadRepository.findById(notaRequest.getActividadId());

        if (!actividadOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Actividad no encontrada");
        }

        String notaStr = notaRequest.getNota();

        if (!notaStr.matches("^[1-7]$")) {
            return ResponseEntity.badRequest().body("La nota debe ser un número entero entre 1 y 7.");
        }

        int valorNota = Integer.parseInt(notaStr);
        Nota nuevaNota = new Nota(null, actividadOpt.get(), valorNota);
        notaRepository.save(nuevaNota);

        return ResponseEntity.ok("Nota guardada correctamente");
    }
}