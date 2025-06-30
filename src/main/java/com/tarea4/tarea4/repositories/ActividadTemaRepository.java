package com.tarea4.tarea4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tarea4.tarea4.models.ActividadTema;

import java.util.*;

@Repository
public interface ActividadTemaRepository extends JpaRepository<ActividadTema, Integer> {
    List<ActividadTema> findByActividadId(Integer actividadId);
}