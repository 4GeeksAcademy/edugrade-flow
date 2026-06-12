# 04. Flujo propuesto

## Objetivo de este documento

Este documento describe cómo debería funcionar el proceso de captura, validación y generación de reportes escolares usando la aplicación web propuesta.

El objetivo es reemplazar el flujo repetitivo basado en formularios individuales por un sistema centralizado, con captura en tabla, validaciones automáticas y generación de documentos en Excel.

---

## Idea general de la solución

La solución propuesta consiste en una aplicación web con dos áreas principales:

1. Panel de secretaria/admin.
2. Panel de maestro.

La secretaria/admin configura grupos, alumnos, maestros, materias, niveles de inglés y trimestre activo.

Los maestros capturan calificaciones únicamente en el periodo habilitado, usando una tabla con la lista completa de alumnos correspondiente a su materia, grupo o nivel.

Después, la secretaria/admin revisa la información, valida pendientes, detecta errores y genera actas por materia y boletas individuales en Excel.

---

## Flujo general propuesto

```text
Secretaria configura ciclo escolar
        ↓
Secretaria registra grupos, alumnos, maestros y materias
        ↓
Secretaria asigna alumnos a grupos oficiales
        ↓
Secretaria asigna alumnos a niveles de inglés, si aplica
        ↓
Secretaria abre el trimestre activo
        ↓
Maestro entra al sistema
        ↓
Maestro selecciona materia, grupo o nivel asignado
        ↓
Sistema muestra la tabla de alumnos
        ↓
Maestro captura calificaciones
        ↓
Sistema calcula calificación final
        ↓
Sistema valida errores
        ↓
Maestro guarda la captura
        ↓
Secretaria revisa pendientes y duplicados
        ↓
Secretaria genera actas y boletas en Excel
```

---

## Flujo propuesto para secretaria/admin

La secretaria/admin tendrá el control principal del sistema.

### 1. Configurar ciclo escolar

La secretaria/admin debe poder definir el ciclo escolar activo.

Ejemplo:

```text
Ciclo escolar: 2025-2026
```

---

### 2. Configurar grupos oficiales

La secretaria/admin registra o valida los grupos oficiales.

Ejemplo:

```text
1A Secundaria
2A Secundaria
3A Secundaria
1A Preparatoria
2A Preparatoria
3A Preparatoria
```

---

### 3. Registrar alumnos

La secretaria/admin registra alumnos y los asigna a su grupo oficial.

Ejemplo:

```text
Alumno: Alumno 01
Grupo oficial: 3A Secundaria
```

El grupo oficial será el que se use para actas y boletas.

---

### 4. Registrar maestros y materias

La secretaria/admin registra maestros y materias.

Cada maestro debe quedar relacionado con las materias, grupos o niveles que imparte.

Ejemplo:

```text
Maestro: Maestro A
Materia: Inglés
Asignación: Nivel 4 de Inglés
```

---

### 5. Asignar alumnos a niveles de inglés

Para la materia de inglés, la secretaria/admin debe poder crear niveles y asignar alumnos manualmente.

Ejemplo:

```text
Nivel 4 de Inglés
- Alumno 01 de 1A Secundaria
- Alumno 02 de 2A Secundaria
- Alumno 03 de 3A Secundaria
```

Aunque el alumno se capture dentro de un nivel de inglés, seguirá perteneciendo a su grupo oficial para actas y boletas.

---

### 6. Abrir trimestre activo

La secretaria/admin define qué trimestre está habilitado para captura.

Ejemplo:

```text
Trimestre activo: II Trimestre
```

Los maestros solo podrán capturar calificaciones de ese trimestre.

---

### 7. Cerrar trimestre

Cuando termine el periodo de captura, la secretaria/admin puede cerrar el trimestre.

Una vez cerrado, los maestros no podrán modificar capturas sin autorización.

---

### 8. Autorizar excepciones

Si existe un error o caso especial, la secretaria/admin puede autorizar una excepción.

Ejemplos:

```text
Corregir calificación capturada incorrectamente.
Eliminar registro duplicado.
Desbloquear una captura específica.
Permitir corrección después del cierre.
```

---

### 9. Revisar estado de captura

La secretaria/admin debe poder revisar qué grupos, materias o niveles están completos o pendientes.

Ejemplo:

```text
Materia: Matemáticas
Grupo: 3A
Estado: Completo

Materia: Inglés
Nivel: Nivel 4
Estado: Pendiente
```

---

### 10. Generar documentos

Cuando la información esté validada, la secretaria/admin genera:

* Acta por materia en Excel.
* Boleta individual por alumno en Excel.

---

## Flujo propuesto para maestro

El maestro tendrá un flujo más simple que el actual.

### 1. Entrar al sistema

El maestro entra a la aplicación y visualiza solo sus materias, grupos o niveles asignados.

---

### 2. Seleccionar materia y grupo o nivel

El maestro selecciona la materia que va a capturar.

Para materias normales:

```text
Materia: Matemáticas
Grupo: 3A Secundaria
```

Para inglés:

```text
Materia: Inglés
Nivel: Nivel 4 de Inglés
```

---

### 3. Capturar únicamente el trimestre activo

El sistema muestra automáticamente el trimestre activo.

Ejemplo:

```text
Trimestre activo: II Trimestre
```

El maestro no necesita elegir manualmente el trimestre si solo hay un periodo habilitado.

---

### 4. Capturar en tabla

El sistema muestra una tabla con todos los alumnos correspondientes.

Ejemplo:

```text
Alumno | Inasistencias | Participación | Proyecto | Trabajos | Examen | Calificación final
```

El maestro captura los criterios de evaluación directamente en la tabla.

---

### 5. Copiar y pegar desde Excel

El sistema debe permitir pegar datos desde Excel en columnas de la tabla.

Ejemplo:

```text
El maestro copia la columna de inasistencias desde su Excel.
La pega en la columna de inasistencias del sistema.
El sistema distribuye los valores en orden por alumno.
```

Esto reduce el tiempo de captura cuando el maestro ya tiene información organizada.

---

### 6. Cálculo automático

El sistema calcula automáticamente la calificación final.

Ejemplo:

```text
Participación + Proyecto + Trabajos + Examen = Calificación final
```

Si la suma no es válida, el sistema marca error.

---

### 7. Validación antes de guardar

Antes de guardar, el sistema revisa:

* Campos vacíos.
* Sumas incorrectas.
* Calificaciones fuera de rango.
* Duplicados.
* Alumnos sin captura.

---

### 8. Guardar captura

Cuando los datos estén correctos, el maestro guarda la captura.

La información queda registrada con:

* Maestro.
* Materia.
* Grupo oficial.
* Nivel de inglés, si aplica.
* Alumno.
* Trimestre.
* Calificaciones.
* Fecha de captura.

---

## Flujo propuesto para materias normales

Las materias normales se capturan por grupo oficial.

Ejemplo:

```text
Grupo: 3A Secundaria
Materia: Matemáticas
Trimestre activo: II Trimestre
```

El sistema muestra todos los alumnos de 3A Secundaria y el maestro captura sus calificaciones en tabla.

El acta se genera para:

```text
Grupo: 3A Secundaria
Materia: Matemáticas
```

La boleta individual toma esa calificación y la coloca en la materia correspondiente del alumno.

---

## Flujo propuesto para inglés por niveles

Inglés se captura por nivel, no necesariamente por grupo oficial.

Ejemplo:

```text
Nivel 4 de Inglés
- Alumno de 1A Secundaria
- Alumno de 2A Secundaria
- Alumno de 3A Secundaria
```

El maestro de inglés captura calificaciones para todos los alumnos del nivel.

Después, el sistema utiliza el grupo oficial de cada alumno para generar actas y boletas.

Ejemplo:

```text
Alumno: Alumno 01
Grupo oficial: 2A Secundaria
Nivel de inglés: Nivel 4
Materia en boleta: Inglés
```

En la boleta, la materia aparece simplemente como:

```text
Inglés
```

---

## Flujo propuesto para generación de actas

El acta se genera por grupo oficial y materia.

Ejemplo:

```text
Grupo oficial: 3A Secundaria
Materia: Inglés
Trimestre: II Trimestre
```

Aunque inglés se haya capturado por nivel, el acta debe mostrar a los alumnos de su grupo oficial.

El sistema debe reunir las calificaciones correspondientes y acomodarlas en el formato de Excel del acta.

---

## Flujo propuesto para generación de boletas

La boleta se genera por alumno.

Ejemplo:

```text
Alumno: Alumno 01
Grupo oficial: 3A Secundaria
```

La boleta debe incluir todas las materias del alumno, sus calificaciones por trimestre, faltas, promedio y reporte de conducta.

Si el alumno pertenece a un nivel de inglés, la boleta no muestra el nivel; solamente muestra la materia como Inglés.

---

## Flujo de validación propuesto

Antes de generar documentos, el sistema debe revisar:

```text
¿Hay materias pendientes?
¿Hay alumnos sin calificación?
¿Hay registros duplicados?
¿Hay sumas incorrectas?
¿Hay calificaciones fuera de rango?
¿El trimestre está cerrado o activo?
¿La información pertenece al ciclo escolar correcto?
```

Si existen errores críticos, el sistema debe impedir la generación de documentos hasta que se corrijan.

---

## Flujo de excepción propuesto

Cuando exista un caso especial, el flujo debe ser:

```text
Maestro detecta error
        ↓
Solicita corrección a secretaria/admin
        ↓
Secretaria/admin revisa el caso
        ↓
Secretaria/admin desbloquea o corrige el registro
        ↓
Sistema guarda la corrección
        ↓
Registro queda listo para validación
```

Los maestros no deben desbloquear periodos cerrados ni modificar trimestres anteriores sin autorización.

---

## Comparación entre flujo actual y flujo propuesto

| Proceso            | Flujo actual                | Flujo propuesto                               |
| ------------------ | --------------------------- | --------------------------------------------- |
| Captura            | Formulario por alumno       | Tabla por grupo o nivel                       |
| Trimestre          | Selección manual            | Periodo activo controlado por admin           |
| Calificación final | Manual o semimanual         | Cálculo automático                            |
| Duplicados         | Revisión manual             | Detección automática                          |
| Inglés             | Manejo separado por niveles | Captura por nivel y reporte por grupo oficial |
| Actas              | Llenado manual o semimanual | Generación en Excel                           |
| Boletas            | Una por una manualmente     | Generación desde datos centralizados          |
| Pendientes         | Revisión manual             | Panel de estado                               |
| Correcciones       | Manuales en base de datos   | Excepciones controladas por admin             |

---

## Resultado esperado

Con el flujo propuesto, la institución podrá:

* Reducir captura repetitiva.
* Disminuir errores.
* Evitar capturas en trimestres incorrectos.
* Detectar duplicados antes de generar documentos.
* Controlar excepciones desde administración.
* Generar actas y boletas a partir de datos centralizados.
* Dar mayor visibilidad del avance de captura por grupo, materia, maestro y trimestre.

---

## Resumen

El flujo propuesto transforma el proceso actual en un sistema centralizado donde la secretaria/admin controla la estructura académica y los periodos de captura, mientras que los maestros capturan calificaciones de forma rápida mediante tablas.

La aplicación debe validar la información antes de generar documentos, respetar los casos especiales como inglés por niveles y producir reportes finales en Excel organizados por grupo oficial y alumno.
