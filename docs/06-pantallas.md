# 06. Pantallas

## Objetivo de este documento

Este documento describe las pantallas principales de la aplicación web propuesta para capturar, validar y generar reportes escolares.

El objetivo es definir la estructura visual y funcional del sistema antes de comenzar a desarrollar la interfaz.

La aplicación tendrá dos áreas principales:

* Panel de secretaria/admin.
* Panel de maestro.

---

## Mapa general de pantallas

```text
Aplicación
│
├── Inicio / Landing
├── Login simulado
│
├── Panel secretaria/admin
│   ├── Dashboard administrativo
│   ├── Gestión de ciclo escolar y trimestres
│   ├── Gestión de grupos oficiales
│   ├── Gestión de alumnos
│   ├── Gestión de maestros
│   ├── Gestión de materias
│   ├── Gestión de niveles de inglés
│   ├── Asignación de alumnos a niveles de inglés
│   ├── Revisión de capturas
│   ├── Reporte de pendientes
│   ├── Reporte de alumnos con bajo promedio
│   ├── Generación de actas
│   └── Generación de boletas
│
└── Panel maestro
    ├── Dashboard del maestro
    ├── Selección de materia / grupo / nivel
    ├── Captura de calificaciones en tabla
    └── Resumen de captura
```

---

## 1. Pantalla de inicio / Landing

### Objetivo

Presentar el proyecto de forma clara para portafolio.

Esta pantalla explica qué problema resuelve la aplicación y cuál es su propuesta de valor.

### Contenido sugerido

* Nombre del sistema.
* Descripción breve.
* Problema principal.
* Beneficios.
* Botón para entrar a demo.
* Tecnologías usadas, cuando el proyecto avance.

### Elementos principales

```text
EduGrade Flow
Sistema web para automatizar captura, validación y generación de boletas escolares.

[Ver demo]
[Documentación]
```

### Notas

Esta pantalla será útil para mostrar el proyecto en portafolio, incluso si el sistema usa datos ficticios.

---

## 2. Login simulado

### Objetivo

Permitir elegir el tipo de usuario para probar la aplicación durante el MVP.

En la primera versión no se implementará autenticación real.

### Opciones

```text
Entrar como secretaria/admin
Entrar como maestro
```

### Notas

En fases posteriores esta pantalla puede convertirse en un login real con correo, contraseña y roles.

---

# Panel secretaria/admin

## 3. Dashboard administrativo

### Objetivo

Mostrar un resumen general del estado académico y de captura.

### Información principal

* Trimestre activo.
* Total de grupos.
* Total de alumnos.
* Total de maestros.
* Materias pendientes.
* Capturas completadas.
* Duplicados detectados.
* Alumnos con bajo promedio.
* Documentos generados.

### Ejemplo visual

```text
Dashboard administrativo

Trimestre activo: II Trimestre

[6] Grupos activos
[138] Alumnos activos
[12] Maestros activos
[4] Materias pendientes
[3] Duplicados detectados
[8] Alumnos con bajo promedio
```

### Acciones principales

* Abrir gestión de trimestres.
* Revisar pendientes.
* Revisar duplicados.
* Generar actas.
* Generar boletas.

---

## 4. Gestión de ciclo escolar y trimestres

### Objetivo

Permitir que la secretaria/admin controle el ciclo escolar y el trimestre activo.

### Funciones

* Ver ciclo escolar activo.
* Ver trimestres.
* Activar trimestre.
* Cerrar trimestre.
* Bloquear trimestres futuros.
* Autorizar excepciones.

### Ejemplo visual

```text
Ciclo escolar: 2025-2026

I Trimestre      Cerrado
II Trimestre     Activo
III Trimestre    Bloqueado

[Activar trimestre]
[Cerrar trimestre]
[Autorizar excepción]
```

### Regla importante

Los maestros solo pueden capturar el trimestre activo.

---

## 5. Gestión de grupos oficiales

### Objetivo

Administrar los grupos oficiales de la institución.

### Información por grupo

* Nombre del grupo.
* Nivel educativo.
* Ciclo escolar.
* Cantidad de alumnos.
* Estado.

### Ejemplo visual

```text
Grupo             Nivel           Alumnos       Estado
1A Secundaria     Secundaria      25            Activo
2A Secundaria     Secundaria      34            Activo
3A Secundaria     Secundaria      21            Activo
```

### Acciones

* Crear grupo.
* Editar grupo.
* Desactivar grupo.
* Ver alumnos del grupo.

---

## 6. Gestión de alumnos

### Objetivo

Administrar alumnos y asignarlos a su grupo oficial.

### Información por alumno

* Nombre.
* CURP.
* Grupo oficial.
* Nivel educativo.
* Estado.

### Ejemplo visual

```text
Alumno          CURP              Grupo oficial      Estado
Alumno 01       CURP_EJEMPLO      3A Secundaria      Activo
Alumno 02       CURP_EJEMPLO      3A Secundaria      Activo
```

### Acciones

* Registrar alumno.
* Editar alumno.
* Cambiar grupo oficial.
* Desactivar alumno.

---

## 7. Gestión de maestros

### Objetivo

Administrar maestros y sus asignaciones.

### Información por maestro

* Nombre.
* Materias asignadas.
* Grupos oficiales asignados.
* Niveles de inglés asignados.
* Estado.

### Ejemplo visual

```text
Maestro        Materia        Asignación              Estado
Maestro A      Matemáticas    3A Secundaria           Activo
Maestro B      Inglés         Nivel 4 Secundaria      Activo
```

### Acciones

* Registrar maestro.
* Editar maestro.
* Asignar materia.
* Asignar grupo o nivel.
* Desactivar maestro.

---

## 8. Gestión de materias

### Objetivo

Administrar las materias del sistema.

### Información por materia

* Nombre.
* Nivel educativo.
* Tipo de materia.
* Estado.

### Tipos de materia

```text
Materia normal
Materia especial por nivel, como Inglés
```

### Ejemplo visual

```text
Materia        Nivel           Tipo                  Estado
Matemáticas    Secundaria      Normal                Activa
Inglés         Secundaria      Por niveles           Activa
```

---

## 9. Gestión de niveles de inglés

### Objetivo

Administrar niveles de inglés por ciclo escolar y nivel educativo.

### Información por nivel

* Nombre del nivel.
* Nivel educativo.
* Maestro asignado.
* Cantidad de alumnos.
* Estado.

### Ejemplo visual

```text
Nivel de inglés      Nivel educativo      Maestro       Alumnos
Nivel 1              Secundaria           Maestro A     18
Nivel 2              Secundaria           Maestro B     22
Nivel 3              Secundaria           Maestro C     20
Nivel 4              Secundaria           Maestro D     17
```

### Notas

Los niveles de inglés pueden variar por ciclo escolar. Puede haber aproximadamente de 4 a 6 niveles dependiendo de secundaria o preparatoria.

---

## 10. Asignación de alumnos a niveles de inglés

### Objetivo

Permitir que la secretaria/admin asigne alumnos a niveles de inglés.

### Flujo

1. Seleccionar nivel de inglés.
2. Ver alumnos disponibles.
3. Agregar alumnos al nivel.
4. Guardar asignación.

### Ejemplo visual

```text
Nivel seleccionado: Nivel 4 Secundaria

Alumnos disponibles               Alumnos asignados
Alumno 01 - 1A Secundaria         Alumno 05 - 2A Secundaria
Alumno 02 - 2A Secundaria         Alumno 09 - 3A Secundaria
Alumno 03 - 3A Secundaria         Alumno 12 - 1A Secundaria
```

### Regla importante

Aunque el alumno esté asignado a un nivel de inglés, su grupo oficial no cambia.

---

## 11. Revisión de capturas

### Objetivo

Permitir que la secretaria/admin revise las calificaciones capturadas.

### Filtros

* Ciclo escolar.
* Trimestre.
* Grupo oficial.
* Materia.
* Maestro.
* Nivel de inglés.
* Estado de captura.

### Estados posibles

```text
Completo
Pendiente
Con error
Duplicado
Validado
Corregido
```

### Ejemplo visual

```text
Grupo       Materia        Maestro        Trimestre       Estado
3A          Matemáticas    Maestro A      II              Completo
3A          Inglés         Maestro B      II              Con error
2A          Historia       Maestro C      II              Pendiente
```

---

## 12. Reporte de pendientes

### Objetivo

Mostrar qué maestros, materias o grupos siguen pendientes de captura.

### Información

* Maestro.
* Materia.
* Grupo o nivel.
* Trimestre.
* Alumnos esperados.
* Alumnos capturados.
* Estado.

### Ejemplo visual

```text
Maestro     Materia     Grupo/Nivel      Capturados      Estado
Maestro A   Historia    2A Secundaria    18/25           Pendiente
Maestro B   Inglés      Nivel 4          15/22           Pendiente
```

---

## 13. Reporte de alumnos con bajo promedio

### Objetivo

Identificar alumnos reprobados o con bajo promedio.

### Información

* Alumno.
* Grupo oficial.
* Materia.
* Trimestre.
* Calificación.
* Promedio.

### Ejemplo visual

```text
Alumno       Grupo          Materia       Trimestre       Calificación
Alumno 01    3A Sec         Matemáticas   II              59
Alumno 02    2A Sec         Inglés        II              65
```

---

## 14. Generación de actas

### Objetivo

Generar actas por materia en formato Excel.

### Filtros

* Ciclo escolar.
* Trimestre.
* Grupo oficial.
* Materia.

### Ejemplo visual

```text
Generar acta

Ciclo escolar: 2025-2026
Trimestre: II Trimestre
Grupo oficial: 3A Secundaria
Materia: Inglés

[Validar información]
[Generar acta en Excel]
```

### Validaciones previas

Antes de generar el acta, el sistema debe revisar:

* Que no existan duplicados.
* Que no existan alumnos sin calificación.
* Que la materia esté completa.
* Que no existan errores críticos.

---

## 15. Generación de boletas

### Objetivo

Generar boletas individuales por alumno en formato Excel.

### Filtros

* Ciclo escolar.
* Grupo oficial.
* Alumno.

### Ejemplo visual

```text
Generar boleta

Ciclo escolar: 2025-2026
Grupo oficial: 3A Secundaria
Alumno: Alumno 01

[Validar información]
[Generar boleta en Excel]
```

### Notas

En el MVP, la generación será individual. La generación masiva por grupo puede implementarse en una fase posterior.


## Pantalla: Ventanas de captura

### Objetivo

Permitir que la secretaria/admin controle cuándo se habilita la captura de calificaciones para cada nivel educativo.

Esta pantalla es necesaria porque secundaria y preparatoria pueden tener fechas diferentes de captura.

### Usuario principal

Secretaria/Admin.

### Información visible

La pantalla debe mostrar una tabla con:

| Nivel educativo | Trimestre    | Estado    | Fecha de apertura | Fecha de cierre | Acción  |
| --------------- | ------------ | --------- | ----------------- | --------------- | ------- |
| Secundaria      | II Trimestre | Bloqueado | 2026-03-01        | 2026-03-15      | Activar |
| Preparatoria    | II Trimestre | Activo    | 2026-01-10        | 2026-01-25      | Cerrar  |

### Estados posibles

```text
Bloqueado
Activo
Cerrado
```

### Acciones principales

```text
Activar captura
Cerrar captura
Editar fechas
Ver grupos afectados
```

### Reglas de pantalla

* La captura no se habilita necesariamente para toda la institución al mismo tiempo.
* La secretaria/admin puede tener preparatoria activa y secundaria bloqueada, o al revés.
* El sistema debe mostrar claramente qué nivel educativo tiene captura activa.
* Si una ventana está cerrada, solo administración puede autorizar correcciones especiales.
* Las fechas mostradas deben ser configurables en el sistema.

---

# Panel maestro

## 16. Dashboard del maestro

### Objetivo

Mostrar al maestro sus materias, grupos o niveles asignados.

### Información principal

* Trimestre activo.
* Materias asignadas.
* Grupos oficiales asignados.
* Niveles de inglés asignados.
* Estado de captura.

### Ejemplo visual

```text
Dashboard maestro

Trimestre activo: II Trimestre

Materia        Grupo/Nivel          Estado
Matemáticas    3A Secundaria        Pendiente
Inglés         Nivel 4              En progreso
```

---

## 17. Selección de materia / grupo / nivel

### Objetivo

Permitir que el maestro elija qué calificaciones va a capturar.

### Para materias normales

```text
Materia: Matemáticas
Grupo: 3A Secundaria
Trimestre: II Trimestre
```

### Para inglés

```text
Materia: Inglés
Nivel: Nivel 4 Secundaria
Trimestre: II Trimestre
```

### Regla importante

El maestro no selecciona libremente el trimestre. El sistema muestra el trimestre activo definido por secretaria/admin.

---

## 18. Captura de calificaciones en tabla

### Objetivo

Permitir capturar calificaciones de varios alumnos desde una sola tabla.

### Columnas iniciales

```text
Alumno | Inasistencias | Participación | Proyecto | Trabajos | Examen | Calificación final | Estado
```

### Funciones

* Capturar valores por alumno.
* Pegar datos desde Excel.
* Calcular calificación final.
* Marcar errores por fila.
* Mostrar total de alumnos capturados.
* Guardar captura.

### Ejemplo visual

```text
Materia: Matemáticas
Grupo: 3A Secundaria
Trimestre: II Trimestre

Alumno       Inasistencias   Participación   Proyecto   Trabajos   Examen   Final   Estado
Alumno 01    0               10              25         25         40       100     OK
Alumno 02    2               8               20         25         35       88      OK
Alumno 03    1               10              30         30         45       115     Error
```

### Acciones

```text
[Guardar captura]
[Limpiar tabla]
[Validar errores]
```

---

## 19. Pegado desde Excel

### Objetivo

Facilitar la captura cuando el maestro ya tiene información organizada en una hoja de cálculo.

### Flujo

```text
1. El maestro copia una columna desde Excel.
2. Selecciona una celda inicial en la tabla.
3. Pega los valores.
4. El sistema distribuye los valores hacia abajo.
5. El sistema valida los datos pegados.
```

### Ejemplo

```text
Valores copiados desde Excel:

0
1
0
3
2

Columna destino:
Inasistencias
```

---

## 20. Resumen de captura

### Objetivo

Mostrar un resumen antes o después de guardar.

### Información

* Grupo o nivel.
* Materia.
* Trimestre.
* Total de alumnos.
* Alumnos capturados.
* Filas con error.
* Duplicados detectados.
* Estado final.

### Ejemplo visual

```text
Resumen de captura

Materia: Inglés
Nivel: Nivel 4
Trimestre: II Trimestre

Alumnos esperados: 22
Alumnos capturados: 22
Errores: 0
Duplicados: 0

Estado: Listo para enviar
```
## Aviso de escala en captura de calificaciones

La pantalla de captura del maestro debe mostrar un aviso claro sobre la escala de calificación que corresponde al nivel educativo del grupo.

### Ejemplo para secundaria

```text
Recuerda capturar calificaciones en escala de 1 a 10 para secundaria.
```

### Ejemplo para preparatoria

```text
Recuerda capturar calificaciones en escala de 0 a 100 para preparatoria.
```

### Ubicación recomendada del aviso

El aviso debe mostrarse arriba de la tabla de captura, junto al contexto de:

```text
Materia
Grupo o nivel
Trimestre
Nivel educativo
```

### Reglas de pantalla

* Si el maestro selecciona un grupo de secundaria, el sistema debe mostrar escala 1 a 10.
* Si el maestro selecciona un grupo de preparatoria, el sistema debe mostrar escala 0 a 100.
* El aviso debe ser visible antes de que el maestro capture calificaciones.
* Si el maestro captura una calificación fuera del rango permitido, la fila debe marcarse con error.
* El sistema debe evitar que el maestro guarde una captura con errores de escala.

---

## Pantallas prioritarias para el MVP

```text
1. Landing page
2. Login simulado / selección de rol
3. Dashboard administrativo
4. Ventanas de captura por nivel educativo
5. Panel maestro
6. Captura de calificaciones en tabla
7. Revisión administrativa de capturas
8. Reporte de pendientes
9. Generación de acta
10. Generación de boleta
```

### Nota

La pantalla de ventanas de captura es prioritaria porque define si un maestro puede capturar o no, dependiendo del nivel educativo y del trimestre.

