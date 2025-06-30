package com.tarea4.tarea4.controllers;

import java.util.*;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

import com.tarea4.tarea4.dtos.*;
import com.tarea4.tarea4.services.*;

@Controller
public class ActividadController {

    @Autowired
    private ActividadService actividadService;

    @GetMapping("/resumen")
    public String mostrarResumen(Model model) {
        List<ActividadResumenDTO> resumenes = actividadService.obtenerResumenActividades();
        model.addAttribute("actividades", resumenes);
        return "Resumen"; // resumen.html
    }
}