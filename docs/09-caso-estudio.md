# 09. Caso de estudio

## Nombre del proyecto

**EduGrade Flow**

Sistema web para automatizar la captura, validación y generación de actas y boletas escolares en Excel.

---

## Resumen

EduGrade Flow es una aplicación web diseñada a partir de un problema real observado en una institución educativa privada.

El proceso actual de captura y generación de calificaciones depende de formularios digitales, bases de datos en Excel y revisión manual por parte del personal administrativo.

El objetivo del proyecto es transformar ese flujo manual en un sistema centralizado donde los maestros puedan capturar calificaciones en tabla, el sistema valide errores automáticamente y la secretaria/admin pueda generar actas por materia y boletas individuales en Excel.

---

## Contexto del problema

La institución administra grupos de secundaria y preparatoria. Normalmente trabaja con 6 grupos activos, aunque la cantidad puede variar por ciclo escolar.

Los maestros capturan calificaciones mediante formularios digitales. Cada formulario corresponde a un grupo, y cada captura representa una combinación de:

```text
Maestro + Materia + Alumno + Trimestre + Criterios de evaluación
```

Después, la secretaria/admin usa la información recopilada para generar documentos escolares como:

* Actas por materia.
* Boletas individuales por alumno.

El problema principal es que gran parte del proceso requiere captura repetitiva, revisión manual, filtrado de información y traslado de datos a formatos de Excel.

---

## Flujo actual

El flujo actual funciona de la siguiente manera:

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
Secretaria/admin revisa y filtra información
        ↓
Secretaria/admin llena actas por materia
        ↓
Secretaria/admin genera boletas individuales
```

Este flujo permite recopilar información, pero genera carga operativa y riesgo de errores.

---

## Problemas identificados

### Captura repetitiva

Los maestros deben llenar formularios alumno por alumno. Si un grupo tiene 34 alumnos, el proceso debe repetirse 34 veces para una sola materia.

### Riesgo de duplicados

Si un maestro se equivoca y envía nuevamente una respuesta, puede existir más de una calificación para el mismo alumno, materia y trimestre.

### Validación manual

La secretaria/admin debe revisar si existen errores, duplicados, materias pendientes o alumnos sin calificación.

### Generación manual de documentos

Las actas y boletas se generan en Excel, pero requieren revisar y acomodar información manualmente.

### Control limitado del trimestre activo

El sistema actual depende de que el usuario seleccione correctamente el trimestre. Esto puede provocar capturas en periodos incorrectos.

### Caso especial de inglés

La materia de inglés puede organizarse por niveles, no solo por grupo oficial. Un nivel de inglés puede contener alumnos de diferentes grupos oficiales.

Sin embargo, las actas y boletas deben respetar el grupo oficial del alumno.

---

## Usuarios principales

### Secretaria / Admin

Responsable de configurar el ciclo escolar, grupos, alumnos, maestros, materias, niveles de inglés, trimestre activo, revisión de capturas y generación de documentos.

### Maestro

Responsable de capturar calificaciones de los alumnos en las materias, grupos o niveles asignados.

### Alumno

Entidad académica del sistema. Sus datos y calificaciones se usan para generar actas, boletas y reportes.

---

## Solución propuesta

La solución propuesta es una aplicación web con dos paneles principales:

```text
Panel secretaria/admin
Panel maestro
```

El sistema permitirá que la secretaria/admin configure el ciclo escolar, controle el trimestre activo y revise el avance de captura.

Los maestros capturarán calificaciones mediante una tabla, en lugar de llenar formularios repetitivos alumno por alumno.

La aplicación calculará automáticamente la calificación final, validará errores y permitirá generar documentos en Excel.

---

## Flujo propuesto

```text
Secretaria/admin configura ciclo escolar
        ↓
Secretaria/admin registra grupos, alumnos, maestros y materias
        ↓
Secretaria/admin asigna alumnos a niveles de inglés, si aplica
        ↓
Secretaria/admin abre el trimestre activo
        ↓
Maestro entra al sistema
        ↓
Maestro selecciona materia, grupo o nivel asignado
        ↓
Sistema muestra tabla de alumnos
        ↓
Maestro captura calificaciones
        ↓
Sistema calcula calificación final
        ↓
Sistema valida errores
        ↓
Secretaria/admin revisa pendientes y duplicados
        ↓
Secretaria/admin genera actas y boletas en Excel
```

---

## Funcionalidades principales

### Panel de secretaria/admin

* Configurar ciclo escolar.
* Administrar grupos oficiales.
* Administrar alumnos.
* Administrar maestros.
* Administrar materias.
* Administrar niveles de inglés.
* Asignar alumnos a niveles de inglés.
* Activar o cerrar trimestres.
* Autorizar excepciones.
* Revisar capturas pendientes.
* Detectar duplicados.
* Detectar alumnos con bajo promedio.
* Generar actas por materia.
* Generar boletas individuales.

### Panel de maestro

* Ver trimestre activo.
* Ver materias, grupos o niveles asignados.
* Capturar calificaciones en tabla.
* Copiar y pegar datos desde Excel.
* Calcular calificación final automáticamente.
* Validar errores antes de guardar.
* Revisar resumen de captura.

---

## Decisiones de diseño

### Captura en tabla

Se eligió una tabla porque reduce la repetición del proceso actual y permite capturar varios alumnos desde una sola vista.

También permite copiar y pegar columnas desde Excel, lo cual es útil si el maestro ya tiene información previa como inasistencias o criterios de evaluación.

### Trimestre activo controlado por admin

La secretaria/admin define qué trimestre está abierto para captura.

Esto evita que los maestros capturen por error en un trimestre cerrado o futuro.

### Excepciones controladas

Si existe un error después del cierre de un trimestre, solo la secretaria/admin puede corregir o desbloquear la captura.

### Inglés por niveles

El sistema considera que inglés puede capturarse por nivel, pero debe reportarse por grupo oficial.

En la boleta, inglés aparece como una materia normal.

### Datos ficticios o anonimizados

El proyecto usa datos ficticios o anonimizados para proteger la información real de alumnos, maestros e institución.

---

## Validaciones clave

El sistema debe validar:

* Trimestre activo.
* Campos obligatorios.
* Valores numéricos.
* Valores negativos.
* Calificación final mayor a 100.
* Suma incorrecta de criterios.
* Alumnos sin calificación.
* Registros duplicados.
* Materias pendientes.
* Maestros pendientes de captura.
* Inglés capturado por nivel y reportado por grupo oficial.

---

## Documentos generados

### Acta por materia

Documento en Excel generado por grupo oficial, materia y trimestre.

Incluye:

* Maestro.
* Materia.
* Grupo.
* Periodo.
* Ciclo escolar.
* Lista de alumnos.
* Inasistencias.
* Participación.
* Proyecto.
* Trabajos.
* Examen.
* Calificación.
* Promedio.
* Firmas.

### Boleta individual

Documento en Excel generado por alumno.

Incluye:

* Nombre del alumno.
* CURP, si aplica.
* Grupo oficial.
* Ciclo escolar.
* Asignaturas.
* Calificaciones por trimestre.
* Calificación ordinaria.
* Faltas.
* Promedio.
* Conducta.
* Firmas.

---

## Alcance del MVP

El MVP se enfocará en:

```text
1. Landing page del proyecto.
2. Login simulado por rol.
3. Panel secretaria/admin.
4. Panel maestro.
5. Control de trimestre activo.
6. Captura de calificaciones en tabla.
7. Copiar y pegar desde Excel.
8. Cálculo automático de calificación final.
9. Validaciones principales.
10. Revisión administrativa.
11. Generación de acta en Excel.
12. Generación de boleta individual en Excel.
```

---

## Fuera de alcance inicial

La primera versión no incluirá:

* Login real con autenticación completa.
* Roles avanzados.
* Firma digital.
* Envío automático por correo.
* Integración directa con Google Forms.
* Integración directa con Google Sheets.
* Exportación masiva avanzada.
* Historial completo de auditoría.
* Uso de datos reales en el repositorio público.

---

## Tecnologías previstas

Tecnologías iniciales del proyecto:

* Next.js.
* React.
* TypeScript.
* Tailwind CSS.
* Datos simulados en archivos locales.
* Generación de Excel en una fase posterior.

Tecnologías posibles en fases futuras:

* Base de datos.
* Autenticación.
* API propia.
* Librería para exportar Excel.
* Dashboard con métricas.
* Despliegue web.
* Integración con Google Sheets.

---

## Valor del proyecto

Este proyecto tiene valor como portafolio porque no parte de una idea genérica, sino de un problema real.

Demuestra habilidades como:

* Levantamiento de requerimientos.
* Análisis de flujo operativo.
* Modelado de datos.
* Diseño de pantallas.
* Validación de reglas de negocio.
* Construcción de aplicación web.
* Automatización de documentos.
* Protección de datos sensibles.
* Pensamiento de producto.

---

## Resultado esperado

El resultado esperado es una demo funcional que permita mostrar cómo un proceso manual escolar puede transformarse en una aplicación web organizada, validada y preparada para generar documentos automáticamente.

La meta no es exponer información real, sino demostrar la solución con datos ficticios y un flujo representativo del problema original.

---

## Próximos pasos

1. Completar documentación inicial.
2. Preparar datos ficticios.
3. Diseñar pantallas base.
4. Construir landing page.
5. Crear login simulado.
6. Construir panel de maestro.
7. Construir panel de secretaria/admin.
8. Implementar tabla de captura.
9. Implementar validaciones.
10. Preparar generación de actas y boletas en Excel.

---

## Resumen final

EduGrade Flow busca reducir trabajo repetitivo, mejorar la confiabilidad de los datos escolares y facilitar la generación de reportes académicos.

El proyecto se desarrollará como una aplicación web de portafolio basada en un caso real, usando únicamente datos ficticios o anonimizados.
