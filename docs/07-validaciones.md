# 07. Validaciones

## Objetivo de este documento

Este documento define las validaciones que debe realizar la aplicación para asegurar que la captura de calificaciones sea correcta antes de guardar información o generar documentos escolares.

Las validaciones buscan evitar errores comunes como capturas incompletas, duplicados, sumas incorrectas, alumnos sin calificación, trimestres equivocados y documentos generados con información incompleta.

---

## Tipos de validaciones

El sistema debe manejar tres tipos principales de validación:

```text
1. Validaciones de captura
2. Validaciones administrativas
3. Validaciones previas a generación de documentos
```

---

# 1. Validaciones de captura

Estas validaciones ocurren cuando el maestro captura calificaciones en la tabla.

---

## V01. Trimestre activo obligatorio

El maestro solo debe poder capturar calificaciones del trimestre activo definido por la secretaria/admin.

### Regla

```text
Si el trimestre no está activo, no se permite capturar.
```

### Ejemplo

```text
I Trimestre: cerrado
II Trimestre: activo
III Trimestre: bloqueado
```

El maestro solo puede capturar el II Trimestre.

---

## V02. Bloqueo de trimestres cerrados

Si un trimestre ya fue cerrado, el maestro no debe poder modificar las calificaciones.

### Regla

```text
Solo la secretaria/admin puede corregir o desbloquear capturas de trimestres cerrados.
```

---

## V03. Bloqueo de trimestres futuros

Si un trimestre todavía no ha sido abierto, el sistema debe bloquear la captura.

### Regla

```text
No se puede capturar III Trimestre si el periodo activo es II Trimestre.
```

---

## V04. Campos obligatorios

Cada registro de calificación debe tener los datos mínimos necesarios.

### Campos obligatorios

* Alumno.
* Grupo oficial.
* Materia.
* Maestro.
* Trimestre.
* Criterios de evaluación.
* Calificación final.

### Regla

```text
Si falta un campo obligatorio, la fila queda marcada con error.
```

---

## V05. Valores numéricos válidos

Los campos de evaluación deben aceptar únicamente valores numéricos.

### Campos a validar

* Inasistencias.
* Participación.
* Proyecto.
* Trabajos.
* Examen.
* Calificación final.

### Regla

```text
Si el valor no es numérico, se marca error.
```

---

## V06. No permitir valores negativos

Los criterios de evaluación no deben aceptar valores negativos.

### Ejemplo inválido

```text
Participación: -5
```

### Regla

```text
Si el valor es menor a 0, se marca error.
```

---

## V07. Rango máximo de calificación

La calificación final no debe superar el máximo permitido.

### Regla inicial

```text
Calificación final máxima: 100
```

### Ejemplo inválido

```text
Participación: 10
Proyecto: 30
Trabajos: 30
Examen: 40

Total: 110
```

El sistema debe marcar error.

---

## V08. Cálculo automático de calificación final

El sistema debe calcular automáticamente la calificación final con base en los criterios establecidos.

### Regla

```text
Participación + Proyecto + Trabajos + Examen = Calificación final
```

La calificación final no debe capturarse manualmente en el MVP.

---

## V09. Validación de suma correcta

El sistema debe validar que la suma de los criterios corresponda al total esperado.

### Ejemplo válido

```text
Participación: 10
Proyecto: 25
Trabajos: 25
Examen: 40
Total: 100
```

### Ejemplo inválido

```text
Participación: 10
Proyecto: 25
Trabajos: 25
Examen: 45
Total: 105
```

---

## V10. Alumnos sin calificación

El sistema debe identificar alumnos que no tengan calificación capturada en una materia y trimestre.

### Regla

```text
Si un alumno pertenece al grupo o nivel seleccionado y no tiene captura, se marca como pendiente.
```

---

## V11. Pegado desde Excel

Cuando el maestro copie y pegue datos desde Excel, el sistema debe validar que los valores pegados sean compatibles con la columna destino.

### Ejemplo

Si el maestro pega en la columna de inasistencias:

```text
0
1
2
N/A
3
```

El valor `N/A` debe marcarse como error.

---

## V12. Cantidad de valores pegados

Si el maestro pega una columna desde Excel, el sistema debe validar que la cantidad de valores no exceda la cantidad de alumnos visibles en la tabla.

### Regla

```text
Si se pegan más valores que alumnos disponibles, el sistema debe advertir al usuario.
```

---

# 2. Validaciones de duplicados

Estas validaciones buscan evitar más de una calificación válida para la misma materia, alumno y trimestre.

---

## V13. Duplicado por alumno, materia y trimestre

El sistema debe detectar duplicados usando la siguiente combinación:

```text
Alumno + Materia + Trimestre + Ciclo escolar
```

### Ejemplo de duplicado

```text
Alumno: Alumno 01
Materia: Matemáticas
Trimestre: II Trimestre
Ciclo escolar: 2025-2026
```

Si esta combinación aparece más de una vez, se marca como duplicado.

---

## V14. Duplicado en inglés por niveles

En inglés, la captura puede realizarse por nivel, pero la validación debe revisar al alumno contra la materia Inglés y su trimestre.

### Regla

```text
Alumno + Inglés + Trimestre + Ciclo escolar
```

Si un alumno aparece capturado dos veces en inglés durante el mismo trimestre, se marca duplicado aunque venga de niveles distintos.

---

## V15. Alumno asignado a más de un nivel de inglés

El sistema debe detectar si un alumno está asignado a más de un nivel de inglés durante el mismo ciclo escolar.

### Regla

```text
Un alumno solo puede pertenecer a un nivel de inglés activo por ciclo escolar.
```

---

# 3. Validaciones administrativas

Estas validaciones ayudan a la secretaria/admin a controlar el proceso.

---

## V16. Materias pendientes por grupo

El sistema debe identificar materias que aún no han sido capturadas para un grupo.

### Ejemplo

```text
Grupo: 3A Secundaria
Trimestre: II Trimestre

Materias pendientes:
- Historia
- Geografía
```

---

## V17. Maestros pendientes de captura

El sistema debe identificar maestros con capturas incompletas.

### Ejemplo

```text
Maestro: Maestro A
Materia: Historia
Grupo: 2A Secundaria
Capturados: 18/25
Estado: Pendiente
```

---

## V18. Grupos incompletos

El sistema debe detectar grupos que todavía tienen materias o alumnos sin calificación.

### Regla

```text
Un grupo está completo cuando todas sus materias tienen calificaciones válidas para todos sus alumnos.
```

---

## V19. Niveles de inglés incompletos

El sistema debe detectar niveles de inglés con alumnos pendientes de captura.

### Regla

```text
Un nivel de inglés está completo cuando todos los alumnos asignados al nivel tienen calificación de inglés en el trimestre activo.
```

---

## V20. Alumnos con bajo promedio

El sistema debe identificar alumnos con calificación reprobatoria o bajo promedio.

### Regla inicial

```text
Calificación menor a 70 = alumno en riesgo
```

Esta regla puede ajustarse si la institución maneja otro criterio.

---

## V21. Correcciones con permisos de admin

Cuando una captura ya fue enviada o el trimestre está cerrado, solo la secretaria/admin puede corregirla.

### Regla

```text
Los maestros no pueden modificar capturas cerradas sin autorización.
```

---

## V22. Excepciones registradas

Cuando la secretaria/admin autorice una excepción, el sistema debe registrar el cambio.

### Información mínima de la excepción

* Registro corregido.
* Usuario que corrigió.
* Fecha de corrección.
* Motivo de corrección.
* Estado final.

---

# 4. Validaciones antes de generar documentos

Estas validaciones ocurren antes de generar actas o boletas.

---

## V23. Validación antes de generar acta

Antes de generar un acta por materia, el sistema debe revisar:

* Que el grupo oficial exista.
* Que la materia exista.
* Que el trimestre exista.
* Que todos los alumnos del grupo tengan calificación.
* Que no existan duplicados.
* Que no existan errores en la suma.
* Que no existan campos obligatorios vacíos.

### Regla

```text
Si existe un error crítico, no se genera el acta.
```

---

## V24. Validación antes de generar boleta

Antes de generar una boleta individual, el sistema debe revisar:

* Que el alumno exista.
* Que el alumno tenga grupo oficial.
* Que el alumno tenga calificaciones en sus materias.
* Que no existan duplicados.
* Que no existan materias pendientes.
* Que no existan errores críticos.
* Que los datos generales estén completos.

### Regla

```text
Si la información del alumno está incompleta, no se genera la boleta.
```

---

## V25. Inglés en acta por grupo oficial

Antes de generar el acta de inglés, el sistema debe organizar a los alumnos por grupo oficial, aunque la captura se haya hecho por nivel.

### Ejemplo

```text
Alumno: Alumno 01
Grupo oficial: 2A Secundaria
Nivel de inglés: Nivel 4
Materia: Inglés
```

El alumno debe aparecer en el acta de su grupo oficial.

---

## V26. Inglés en boleta individual

En la boleta individual, inglés debe aparecer como una materia normal.

### Regla

```text
Mostrar: Inglés
No mostrar: Nivel 4 de Inglés
```

---

## V27. Formato Excel disponible

Antes de generar documentos, el sistema debe validar que exista una plantilla de Excel disponible para el tipo de documento.

### Tipos de plantilla

* Acta por materia.
* Boleta individual.

---

# 5. Niveles de severidad

El sistema debe clasificar errores por severidad.

---

## Error crítico

Impide guardar o generar documentos.

Ejemplos:

* Alumno sin calificación.
* Duplicado.
* Suma inválida.
* Trimestre cerrado.
* Materia pendiente.

---

## Advertencia

Permite continuar, pero avisa al usuario.

Ejemplos:

* Alumno con bajo promedio.
* Inasistencias altas.
* Captura incompleta no enviada.
* Valores pegados desde Excel que requieren revisión.

---

## Información

Mensaje que ayuda al usuario, pero no representa error.

Ejemplos:

* Captura guardada correctamente.
* Documento generado.
* No hay duplicados.
* Grupo completo.

---

# 6. Estados sugeridos

## Estado de una calificación

```text
submitted  → capturada por maestro
validated  → revisada por admin
error      → contiene error
corrected  → corregida por admin
```

---

## Estado de una captura

```text
pending     → pendiente
incomplete  → incompleta
complete    → completa
with_errors → con errores
validated   → validada
```

---

## Estado de un trimestre

```text
locked  → todavía no se puede capturar
active  → habilitado para captura
closed  → cerrado
```

---

# 7. Resumen de validaciones prioritarias para el MVP

Para la primera versión, las validaciones más importantes son:

```text
1. Solo capturar trimestre activo.
2. Bloquear trimestres cerrados o futuros.
3. Validar campos obligatorios.
4. Validar números y rangos.
5. Calcular calificación final automáticamente.
6. Marcar error si la suma no es válida.
7. Detectar duplicados.
8. Detectar alumnos sin calificación.
9. Detectar maestros pendientes.
10. Validar antes de generar actas.
11. Validar antes de generar boletas.
12. Manejar inglés por nivel y reportarlo por grupo oficial.
```

---

## Resumen

Las validaciones son una parte central del sistema porque evitan que la secretaria/admin tenga que revisar manualmente cada error.

El sistema debe ayudar a prevenir capturas incorrectas, detectar duplicados, controlar periodos activos y asegurar que las actas y boletas se generen únicamente con información completa y confiable.
