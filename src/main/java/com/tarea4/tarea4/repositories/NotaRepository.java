package com.tarea4.tarea4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tarea4.tarea4.models.Nota;

import java.util.*;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Integer> {
    List<Nota> findByActividadId(Integer actividadId);
}