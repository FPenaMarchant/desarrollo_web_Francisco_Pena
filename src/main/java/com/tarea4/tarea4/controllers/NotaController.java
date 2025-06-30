package com.tarea4.tarea4.controllers;

import java.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

import com.tarea4.tarea4.repositories.*;
import com.tarea4.tarea4.models.*;

@Controller
@RequestMapping("/notas")
public class NotaController {

    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private ActividadRepository actividadRepository;

    @GetMapping("/nueva/{actividadId}")
    public String mostrarFormularioNuevaNota(@PathVariable Integer actividadId, Model model) {
        model.addAttribute("actividadId", actividadId);
        return "NuevaNota";
    }

    @PostMapping("/guardar")
    public String guardarNota(@RequestParam Integer actividadId,
                            @RequestParam String nota,
                            Model model) {
        Optional<Actividad> actividadOpt = actividadRepository.findById(actividadId);

        // Validation
        if (!actividadOpt.isPresent()) {
            model.addAttribute("error", "Actividad no encontrada.");
            return "NuevaNota";
        }

        if (!nota.matches("^[1-7]$")) {
            model.addAttribute("actividadId", actividadId);
            model.addAttribute("error", "La nota debe ser un número entero entre 1 y 7");
            return "NuevaNota";
        }

        int valorNota = Integer.parseInt(nota);

        Nota nuevaNota = new Nota(null, actividadOpt.get(), valorNota); // store as rounded decimal
        notaRepository.save(nuevaNota);

        return "redirect:/resumen";
    }
}