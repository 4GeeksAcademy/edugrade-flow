# 02. Flujo actual

## Objetivo de este documento

Este documento describe cómo funciona actualmente el proceso de captura, revisión y generación de reportes de calificaciones en la institución educativa.

El flujo actual se divide en dos partes principales:

1. Captura de calificaciones por parte de los maestros.
2. Revisión y generación de reportes por parte del personal administrativo.

---

## Actores involucrados

### Maestro

Es responsable de capturar las calificaciones de los alumnos en los formularios correspondientes.

### Secretaria / Personal administrativo

Es responsable de revisar la información capturada, organizarla y generar documentos en Excel como actas por materia y boletas individuales.

### Alumno

Es el sujeto principal del reporte. Cada alumno debe contar con calificaciones por materia, trimestre, faltas y boleta individual.

---

## Flujo actual de captura de calificaciones

Actualmente, cada grupo cuenta con un formulario digital independiente. La institución maneja aproximadamente 6 grupos, aunque esta cantidad puede variar por ciclo escolar.

Ejemplo de organización:

```text
Grupo 1A → Formulario 1A
Grupo 2A → Formulario 2A
Grupo 3A → Formulario 3A
Grupo 1 de preparatoria → Formulario correspondiente
Grupo 2 de preparatoria → Formulario correspondiente
Grupo 3 de preparatoria → Formulario correspondiente
```

El maestro debe entrar al formulario del grupo donde imparte clase y registrar las calificaciones alumno por alumno.

---

## Pasos realizados por el maestro

El flujo actual para capturar una calificación es el siguiente:

```text
1. Abrir el enlace del formulario del grupo.
2. Seleccionar el maestro.
3. Seleccionar la materia.
4. Seleccionar el alumno.
5. Seleccionar el trimestre.
6. Capturar inasistencias.
7. Capturar participación.
8. Capturar proyecto.
9. Capturar trabajos.
10. Capturar examen.
11. Capturar calificación final.
12. Enviar el formulario.
13. Repetir el proceso para el siguiente alumno.
```

Si el maestro imparte más de una materia, debe repetir el mismo proceso para cada materia.

---

## Ejemplo del problema de repetición

Si un maestro imparte una materia a un grupo de 34 alumnos, debe llenar el formulario 34 veces.

Si además imparte otra materia al mismo grupo o a otro grupo, debe repetir el proceso nuevamente.

Ejemplo:

```text
Maestro: Maestro A
Grupo: 3A
Materia: Inglés
Alumnos: 34

Resultado:
34 envíos del formulario para una sola materia.
```

Si el mismo maestro también imparte otra materia:

```text
Materia 1: Inglés → 34 envíos
Materia 2: Formación Cívica → 34 envíos

Total aproximado:
68 envíos del formulario
```

---

## Información capturada

Los formularios recopilan información como:

* Maestro.
* Materia.
* Alumno.
* Trimestre.
* Inasistencias.
* Participación.
* Proyecto.
* Trabajos.
* Examen.
* Calificación final.

La calificación final actualmente puede depender de la suma o evaluación de distintos criterios establecidos.

---
## Caso especial: materia de inglés por niveles

La materia de inglés no siempre se organiza igual que las demás materias.

En materias normales, la captura se relaciona directamente con un grupo oficial. Por ejemplo:

```text
Grupo: 3A
Materia: Matemáticas
Alumnos: todos pertenecen a 3A
```

En inglés, los alumnos pueden organizarse por nivel. Esto significa que un grupo de inglés puede incluir alumnos de diferentes grupos oficiales.

Ejemplo:

```text
Nivel de Inglés 4
- Alumno de 1° de secundaria
- Alumno de 2° de secundaria
- Alumno de 3° de secundaria
```

La cantidad de niveles puede variar. Dependiendo de secundaria o preparatoria, pueden existir aproximadamente entre 4 y 6 grupos o niveles de inglés.

Aunque la captura se realice por nivel, los reportes finales deben respetar el grupo oficial del alumno.

El acta se genera por grupo oficial, no por nivel de inglés.

La boleta individual también muestra inglés como una materia normal, sin separar necesariamente por nivel.

---

## Asignación de alumnos a niveles de inglés

La asignación de alumnos a niveles de inglés se realiza manualmente por la secretaria o personal administrativo, con base en la información proporcionada por el coordinador de inglés.

Los niveles de inglés permanecen fijos durante el ciclo escolar.

Ejemplo:

```text
Alumno: Alumno 01
Grupo oficial: 2A Secundaria
Nivel de inglés: Nivel 4
Materia en boleta: Inglés
```

Este caso especial debe considerarse en el diseño del sistema, ya que no todas las materias dependen únicamente del grupo oficial.

## Flujo actual después de la captura

Después de que los maestros capturan las calificaciones, la información queda almacenada en una base de respuestas proveniente de los formularios.

El personal administrativo revisa esa base y utiliza archivos de Excel para generar los reportes escolares.

---

## Pasos realizados por el personal administrativo

El flujo administrativo actual es el siguiente:

```text
1. Abrir la base de respuestas.
2. Filtrar información por grupo.
3. Filtrar información por maestro.
4. Filtrar información por materia.
5. Filtrar información por alumno cuando se necesita una boleta.
6. Revisar calificaciones capturadas.
7. Detectar errores o registros duplicados manualmente.
8. Llenar el formato de acta por materia.
9. Llenar o generar la boleta individual por alumno.
10. Revisar promedios, faltas y datos generales.
11. Preparar los documentos para impresión o entrega.
```

---

## Acta por materia

El acta por materia es un archivo de Excel que concentra las calificaciones de todos los alumnos de un grupo para una materia específica.

El formato contiene información como:

* Nombre de la institución.
* Maestro.
* Materia.
* Grupo.
* Periodo o trimestre.
* Ciclo escolar.
* Fecha.
* Lista de alumnos.
* Inasistencias.
* Participación.
* Proyecto.
* Trabajos.
* Examen.
* Calificación.
* Promedio.
* Firma del director.
* Firma del maestro.

El acta se genera por materia.

Ejemplo:

```text
Grupo: 3A
Materia: Inglés
Periodo: II Trimestre

Resultado:
1 acta con la lista de alumnos del grupo y sus calificaciones.
```

---

## Boleta individual

La boleta individual es un archivo de Excel generado por alumno.

El formato contiene información como:

* Nombre del alumno.
* CURP.
* Grupo.
* Ciclo escolar.
* Fecha.
* Lista de asignaturas.
* Calificaciones por trimestre.
* Calificación ordinaria.
* Faltas.
* Promedio.
* Reporte de conducta.
* Firma de dirección.
* Firma del tutor o padre.

La boleta se genera por alumno.

Ejemplo:

```text
Grupo: 3A
Alumnos: 34

Resultado:
34 boletas individuales.
```

---

## Diagrama del flujo actual

```text
Maestro recibe link del formulario
        ↓
Selecciona maestro, materia, alumno y trimestre
        ↓
Captura criterios de evaluación
        ↓
Envía formulario
        ↓
Repite el proceso por cada alumno y materia
        ↓
La información se guarda en una base de respuestas
        ↓
Secretaria revisa y filtra la información
        ↓
Secretaria llena actas por materia
        ↓
Secretaria genera boletas individuales
        ↓
Se revisan documentos para impresión o entrega
```

---

## Puntos críticos del flujo actual

### 1. Repetición de captura

El maestro debe seleccionar varias veces la misma información, como maestro, materia y trimestre.

### 2. Dependencia de formularios separados

Cada grupo tiene un formulario diferente, lo que fragmenta la captura de información.

### 3. Duplicados

Si un maestro envía dos veces la información de un mismo alumno, materia y trimestre, se generan registros duplicados.

### 4. Revisión manual

El personal administrativo debe revisar datos, filtrar información y validar errores manualmente.

### 5. Generación individual de boletas

Por cada alumno se necesita una boleta individual, lo que aumenta el trabajo cuando los grupos son grandes.

### 6. Falta de control centralizado

No existe una vista única para saber qué maestros ya capturaron, qué materias están completas y qué alumnos tienen calificaciones pendientes.

---

## Resumen del flujo actual

El proceso actual permite capturar y generar reportes, pero requiere demasiado trabajo manual.

La captura mediante formularios obliga a los maestros a repetir datos por cada alumno y materia. Después, el personal administrativo debe transformar esa información en actas y boletas usando Excel, lo que genera riesgo de errores, duplicados y retrasos.

Este flujo confirma la necesidad de una aplicación web que centralice la captura, valide los datos y genere reportes escolares automáticamente.

## Control actual de correcciones

Cuando existe un error en la información capturada, la corrección se realiza manualmente desde la base de datos o archivo donde se concentran las respuestas.

Actualmente, la secretaria o personal administrativo es quien puede revisar y corregir registros cuando existe un error, duplicado o captura incorrecta.

Este punto es importante porque en la solución propuesta la secretaria deberá conservar permisos especiales para:

* Corregir registros.
* Autorizar excepciones.
* Desbloquear capturas cerradas.
* Validar cambios después del cierre de un trimestre.
