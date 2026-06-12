# 05. Modelo de datos

## Objetivo de este documento

Este documento define el modelo de datos inicial para la aplicación web de captura, validación y generación de reportes escolares.

El objetivo es representar las entidades principales del sistema, sus relaciones y las reglas necesarias para soportar:

* Grupos oficiales.
* Alumnos.
* Maestros.
* Materias.
* Trimestres.
* Captura de calificaciones.
* Inglés por niveles.
* Actas por materia.
* Boletas individuales.
* Control de periodos activos.
* Detección de duplicados.

Este modelo es una propuesta inicial para el MVP y podrá ajustarse conforme avance el desarrollo.

---

## Entidades principales

El sistema necesita manejar las siguientes entidades:

```text
Usuario
Ciclo escolar
Trimestre
Grupo oficial
Alumno
Maestro
Materia
Asignación docente
Nivel de inglés
Asignación de alumno a nivel de inglés
Calificación
Documento generado
```

---

## 1. Usuario

Representa a las personas que pueden ingresar al sistema.

En el MVP se consideran dos roles principales:

* Secretaria / Admin.
* Maestro.

| Campo    | Tipo    | Descripción                      |
| -------- | ------- | -------------------------------- |
| id       | string  | Identificador único del usuario  |
| name     | string  | Nombre del usuario               |
| email    | string  | Correo del usuario               |
| role     | string  | Rol del usuario: admin o teacher |
| isActive | boolean | Indica si el usuario está activo |

### Ejemplo

```json
{
  "id": "user_001",
  "name": "Maestro A",
  "email": "maestro@example.com",
  "role": "teacher",
  "isActive": true
}
```

---

## 2. Ciclo escolar

Representa el periodo académico general.

| Campo     | Tipo    | Descripción                            |
| --------- | ------- | -------------------------------------- |
| id        | string  | Identificador único del ciclo escolar  |
| name      | string  | Nombre del ciclo escolar               |
| startYear | number  | Año de inicio                          |
| endYear   | number  | Año de cierre                          |
| isActive  | boolean | Indica si el ciclo escolar está activo |

### Ejemplo

```json
{
  "id": "cycle_2025_2026",
  "name": "2025-2026",
  "startYear": 2025,
  "endYear": 2026,
  "isActive": true
}
```

---

## 3. Trimestre

Representa los periodos de evaluación del ciclo escolar.

| Campo   | Tipo   | Descripción                       |
| ------- | ------ | --------------------------------- |
| id      | string | Identificador único del trimestre |
| cycleId | string | Ciclo escolar al que pertenece    |
| name    | string | Nombre del trimestre              |
| order   | number | Orden del trimestre               |
| status  | string | Estado: locked, active o closed   |

### Estados posibles

```text
locked  → todavía no se puede capturar
active  → trimestre habilitado para captura
closed  → trimestre cerrado
```

### Ejemplo

```json
{
  "id": "term_002",
  "cycleId": "cycle_2025_2026",
  "name": "II Trimestre",
  "order": 2,
  "status": "active"
}
```

---

## 4. Grupo oficial

Representa el grupo escolar oficial del alumno.

Ejemplo:

```text
1A Secundaria
2A Secundaria
3A Secundaria
1A Preparatoria
2A Preparatoria
3A Preparatoria
```

| Campo    | Tipo    | Descripción                                |
| -------- | ------- | ------------------------------------------ |
| id       | string  | Identificador único del grupo              |
| name     | string  | Nombre del grupo                           |
| level    | string  | Nivel educativo: secundaria o preparatoria |
| cycleId  | string  | Ciclo escolar                              |
| isActive | boolean | Indica si el grupo está activo             |

### Ejemplo

```json
{
  "id": "group_3a_sec",
  "name": "3A",
  "level": "secundaria",
  "cycleId": "cycle_2025_2026",
  "isActive": true
}
```

---

## 5. Alumno

Representa a cada alumno de la institución.

Cada alumno pertenece a un grupo oficial.

| Campo           | Tipo    | Descripción                     |
| --------------- | ------- | ------------------------------- |
| id              | string  | Identificador único del alumno  |
| fullName        | string  | Nombre completo del alumno      |
| curp            | string  | CURP del alumno, si aplica      |
| officialGroupId | string  | Grupo oficial al que pertenece  |
| cycleId         | string  | Ciclo escolar                   |
| isActive        | boolean | Indica si el alumno está activo |

### Ejemplo

```json
{
  "id": "student_001",
  "fullName": "Alumno 01",
  "curp": "CURP_EJEMPLO_001",
  "officialGroupId": "group_3a_sec",
  "cycleId": "cycle_2025_2026",
  "isActive": true
}
```

---

## 6. Maestro

Representa a los maestros que capturan calificaciones.

| Campo    | Tipo    | Descripción                      |
| -------- | ------- | -------------------------------- |
| id       | string  | Identificador único del maestro  |
| userId   | string  | Usuario relacionado al maestro   |
| fullName | string  | Nombre completo del maestro      |
| isActive | boolean | Indica si el maestro está activo |

### Ejemplo

```json
{
  "id": "teacher_001",
  "userId": "user_001",
  "fullName": "Maestro A",
  "isActive": true
}
```

---

## 7. Materia

Representa las asignaturas del sistema.

| Campo     | Tipo    | Descripción                                |
| --------- | ------- | ------------------------------------------ |
| id        | string  | Identificador único de la materia          |
| name      | string  | Nombre de la materia                       |
| level     | string  | Nivel educativo: secundaria o preparatoria |
| isEnglish | boolean | Indica si la materia es inglés             |
| isActive  | boolean | Indica si la materia está activa           |

### Ejemplo de materia normal

```json
{
  "id": "subject_math",
  "name": "Matemáticas",
  "level": "secundaria",
  "isEnglish": false,
  "isActive": true
}
```

### Ejemplo de inglés

```json
{
  "id": "subject_english",
  "name": "Inglés",
  "level": "secundaria",
  "isEnglish": true,
  "isActive": true
}
```

---

## 8. Asignación docente

Relaciona maestros con materias y grupos oficiales o niveles de inglés.

Para materias normales, la asignación se hace por grupo oficial.

Ejemplo:

```text
Maestro A → Matemáticas → 3A Secundaria
```

Para inglés, la asignación puede hacerse por nivel.

Ejemplo:

```text
Maestro B → Inglés → Nivel 4 de Inglés
```

| Campo           | Tipo        | Descripción                          |
| --------------- | ----------- | ------------------------------------ |
| id              | string      | Identificador único de la asignación |
| teacherId       | string      | Maestro asignado                     |
| subjectId       | string      | Materia asignada                     |
| officialGroupId | string/null | Grupo oficial, si aplica             |
| englishLevelId  | string/null | Nivel de inglés, si aplica           |
| cycleId         | string      | Ciclo escolar                        |
| isActive        | boolean     | Indica si la asignación está activa  |

### Ejemplo de asignación normal

```json
{
  "id": "assignment_001",
  "teacherId": "teacher_001",
  "subjectId": "subject_math",
  "officialGroupId": "group_3a_sec",
  "englishLevelId": null,
  "cycleId": "cycle_2025_2026",
  "isActive": true
}
```

### Ejemplo de asignación de inglés

```json
{
  "id": "assignment_002",
  "teacherId": "teacher_002",
  "subjectId": "subject_english",
  "officialGroupId": null,
  "englishLevelId": "english_level_4_sec",
  "cycleId": "cycle_2025_2026",
  "isActive": true
}
```

---

## 9. Nivel de inglés

Representa los grupos especiales de inglés.

Los niveles de inglés pueden contener alumnos de distintos grupos oficiales.

| Campo    | Tipo    | Descripción                                |
| -------- | ------- | ------------------------------------------ |
| id       | string  | Identificador único del nivel              |
| name     | string  | Nombre del nivel                           |
| level    | string  | Nivel educativo: secundaria o preparatoria |
| cycleId  | string  | Ciclo escolar                              |
| isActive | boolean | Indica si el nivel está activo             |

### Ejemplo

```json
{
  "id": "english_level_4_sec",
  "name": "Nivel 4",
  "level": "secundaria",
  "cycleId": "cycle_2025_2026",
  "isActive": true
}
```

---

## 10. Asignación de alumno a nivel de inglés

Relaciona alumnos con su nivel de inglés durante el ciclo escolar.

Esta asignación la realiza la secretaria/admin según la información proporcionada por coordinación de inglés.

| Campo          | Tipo    | Descripción                         |
| -------------- | ------- | ----------------------------------- |
| id             | string  | Identificador único                 |
| studentId      | string  | Alumno asignado                     |
| englishLevelId | string  | Nivel de inglés                     |
| cycleId        | string  | Ciclo escolar                       |
| isActive       | boolean | Indica si la asignación está activa |

### Ejemplo

```json
{
  "id": "english_student_001",
  "studentId": "student_001",
  "englishLevelId": "english_level_4_sec",
  "cycleId": "cycle_2025_2026",
  "isActive": true
}
```

---

## 11. Calificación

Representa la captura de calificaciones de un alumno en una materia y trimestre.

| Campo           | Tipo        | Descripción                            |
| --------------- | ----------- | -------------------------------------- |
| id              | string      | Identificador único de la calificación |
| studentId       | string      | Alumno evaluado                        |
| officialGroupId | string      | Grupo oficial del alumno               |
| subjectId       | string      | Materia evaluada                       |
| teacherId       | string      | Maestro que captura                    |
| termId          | string      | Trimestre                              |
| cycleId         | string      | Ciclo escolar                          |
| englishLevelId  | string/null | Nivel de inglés, si aplica             |
| absences        | number      | Inasistencias                          |
| participation   | number      | Participación                          |
| project         | number      | Proyecto                               |
| assignments     | number      | Trabajos                               |
| exam            | number      | Examen                                 |
| finalGrade      | number      | Calificación final calculada           |
| status          | string      | Estado de la calificación              |
| createdAt       | string      | Fecha de creación                      |
| updatedAt       | string      | Fecha de actualización                 |

### Estados posibles de calificación

```text
draft      → captura en proceso, si se implementa en el futuro
submitted  → capturada por maestro
validated  → revisada por admin
error      → contiene error
corrected  → fue corregida por admin
```

Para el MVP, puede usarse principalmente:

```text
submitted
validated
error
corrected
```

### Ejemplo

```json
{
  "id": "grade_001",
  "studentId": "student_001",
  "officialGroupId": "group_3a_sec",
  "subjectId": "subject_english",
  "teacherId": "teacher_002",
  "termId": "term_002",
  "cycleId": "cycle_2025_2026",
  "englishLevelId": "english_level_4_sec",
  "absences": 2,
  "participation": 10,
  "project": 25,
  "assignments": 25,
  "exam": 35,
  "finalGrade": 95,
  "status": "submitted",
  "createdAt": "2026-01-15",
  "updatedAt": "2026-01-15"
}
```

---

## 12. Documento generado

Representa un documento exportado por el sistema.

Los documentos iniciales serán:

* Acta por materia.
* Boleta individual.

| Campo           | Tipo        | Descripción                       |
| --------------- | ----------- | --------------------------------- |
| id              | string      | Identificador único del documento |
| type            | string      | Tipo: acta o boleta               |
| cycleId         | string      | Ciclo escolar                     |
| termId          | string/null | Trimestre, si aplica              |
| officialGroupId | string/null | Grupo oficial                     |
| subjectId       | string/null | Materia, si aplica                |
| studentId       | string/null | Alumno, si aplica                 |
| fileName        | string      | Nombre del archivo generado       |
| generatedBy     | string      | Usuario que generó el documento   |
| generatedAt     | string      | Fecha de generación               |

### Ejemplo de acta

```json
{
  "id": "document_001",
  "type": "acta",
  "cycleId": "cycle_2025_2026",
  "termId": "term_002",
  "officialGroupId": "group_3a_sec",
  "subjectId": "subject_english",
  "studentId": null,
  "fileName": "acta_3a_ingles_ii_trimestre.xlsx",
  "generatedBy": "user_admin",
  "generatedAt": "2026-01-20"
}
```

### Ejemplo de boleta

```json
{
  "id": "document_002",
  "type": "boleta",
  "cycleId": "cycle_2025_2026",
  "termId": null,
  "officialGroupId": "group_3a_sec",
  "subjectId": null,
  "studentId": "student_001",
  "fileName": "boleta_alumno_001.xlsx",
  "generatedBy": "user_admin",
  "generatedAt": "2026-01-20"
}
```

---

## Relaciones principales

```text
Usuario 1 ─── 1 Maestro
Ciclo escolar 1 ─── N Trimestres
Ciclo escolar 1 ─── N Grupos oficiales
Ciclo escolar 1 ─── N Niveles de inglés
Grupo oficial 1 ─── N Alumnos
Maestro 1 ─── N Asignaciones docentes
Materia 1 ─── N Asignaciones docentes
Nivel de inglés 1 ─── N Alumnos asignados
Alumno 1 ─── N Calificaciones
Materia 1 ─── N Calificaciones
Trimestre 1 ─── N Calificaciones
Grupo oficial 1 ─── N Calificaciones
```

---

## Reglas de integridad

### Una calificación válida por alumno, materia y trimestre

No debe existir más de una calificación válida para la misma combinación:

```text
studentId + subjectId + termId + cycleId
```

Esta regla ayuda a detectar duplicados.

---

### El grupo oficial siempre viene del alumno

Aunque una materia se capture por nivel de inglés, el grupo oficial de la calificación debe venir del alumno.

Ejemplo:

```text
Alumno: Alumno 01
Grupo oficial: 2A Secundaria
Nivel de inglés: Nivel 4
Materia: Inglés
```

La calificación se captura en Nivel 4, pero se reporta dentro de 2A Secundaria.

---

### Inglés se captura por nivel y se reporta como materia normal

El sistema puede usar `englishLevelId` para organizar la captura, pero en actas y boletas la materia debe mostrarse como:

```text
Inglés
```

---

### Solo el admin controla el trimestre activo

Los maestros no deben modificar el estado de los trimestres.

El admin puede marcar un trimestre como:

```text
locked
active
closed
```

---

### Trimestres cerrados no se editan sin excepción

Cuando un trimestre está cerrado, los maestros no pueden modificar calificaciones.

Solo la secretaria/admin puede corregir o desbloquear una captura específica.

---

## Modelo simplificado para MVP

Para la primera versión, se puede iniciar con una estructura simplificada usando datos locales o arreglos en TypeScript.

Ejemplo:

```ts
type Student = {
  id: string;
  fullName: string;
  officialGroupId: string;
  curp?: string;
};

type OfficialGroup = {
  id: string;
  name: string;
  level: "secundaria" | "preparatoria";
};

type Subject = {
  id: string;
  name: string;
  isEnglish: boolean;
};

type EnglishLevel = {
  id: string;
  name: string;
  level: "secundaria" | "preparatoria";
};

type Grade = {
  id: string;
  studentId: string;
  officialGroupId: string;
  subjectId: string;
  teacherId: string;
  termId: string;
  englishLevelId?: string;
  absences: number;
  participation: number;
  project: number;
  assignments: number;
  exam: number;
  finalGrade: number;
  status: "submitted" | "validated" | "error" | "corrected";
};
```

---

## Pendientes por definir

Antes de construir el modelo final de base de datos, todavía se deben confirmar o decidir algunos detalles:

* Si la CURP será obligatoria o opcional.
* Si se manejará historial de cambios desde el MVP.
* Si la conducta se capturará por alumno, por trimestre o directamente en la boleta.
* Si los retardos se capturarán como campo independiente.
* Si el promedio se calcula por trimestre, por materia o como promedio general del ciclo.
* Si las boletas se generarán una por una o también en paquete por grupo en una fase posterior.
* Si el sistema usará base de datos desde el inicio o datos simulados durante el prototipo.

---

## Resumen

El modelo de datos debe permitir capturar calificaciones por materia, alumno y trimestre, pero también manejar el caso especial de inglés por niveles.

La regla central es que todo alumno pertenece a un grupo oficial, y ese grupo oficial debe usarse para reportes finales, aunque la captura de alguna materia se realice en una agrupación especial.

Este modelo permite construir una aplicación web con captura en tabla, validaciones, reportes administrativos y generación de actas y boletas en Excel.
