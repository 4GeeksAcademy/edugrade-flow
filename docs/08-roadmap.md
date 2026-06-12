# 08. Roadmap

## Objetivo de este documento

Este documento define el plan de desarrollo del proyecto **EduGrade Flow**.

El roadmap divide el proyecto en fases para construir una aplicación web funcional de manera progresiva, comenzando con documentación y prototipo, hasta llegar a una versión capaz de capturar calificaciones, validar errores y generar documentos escolares en Excel.

---

## Estado actual del proyecto

El proyecto se encuentra en fase de descubrimiento, análisis y documentación.

Ya se identificaron:

* Problema principal.
* Flujo actual.
* Requerimientos iniciales.
* Flujo propuesto.
* Modelo de datos.
* Pantallas principales.
* Validaciones necesarias.

---

# Fase 1. Documentación del problema

## Objetivo

Documentar el caso real, entender el proceso actual y definir el alcance inicial del sistema.

## Entregables

* `01-problema.md`
* `02-flujo-actual.md`
* `03-requerimientos.md`
* `04-flujo-propuesto.md`
* `05-modelo-datos.md`
* `06-pantallas.md`
* `07-validaciones.md`
* `08-roadmap.md`
* `09-caso-estudio.md`

## Resultado esperado

Tener una base clara para explicar el proyecto, justificar su valor y guiar el desarrollo técnico.

## Estado

```text
En progreso
```

---

# Fase 2. Preparación del proyecto base

## Objetivo

Configurar la base técnica de la aplicación web.

## Entregables

* Proyecto Next.js inicializado.
* TypeScript configurado.
* Tailwind CSS configurado.
* Estructura inicial de carpetas.
* README inicial.
* Datos ficticios o anonimizados.
* Archivos reales excluidos del repositorio público.

## Tareas

```text
1. Inicializar Next.js.
2. Configurar Tailwind CSS.
3. Configurar estructura base.
4. Crear carpeta docs.
5. Crear carpeta data/sample.
6. Crear carpeta screenshots.
7. Asegurar .gitignore para evitar archivos sensibles.
8. Preparar datos ficticios.
```

## Resultado esperado

Tener un proyecto limpio, seguro y listo para comenzar el desarrollo visual.

## Estado

```text
Iniciado
```

---

# Fase 3. Landing page de portafolio

## Objetivo

Crear una pantalla inicial que presente el proyecto como caso de portafolio.

## Pantallas

* Inicio / Landing.
* Acceso a demo.
* Resumen del problema.
* Resumen de la solución.
* Beneficios principales.

## Contenido sugerido

* Nombre del sistema.
* Descripción breve.
* Problema que resuelve.
* Usuarios principales.
* Tecnologías usadas.
* Estado del proyecto.
* Link a documentación.

## Resultado esperado

Tener una primera pantalla pública que explique el valor del proyecto sin mostrar datos reales.

## Prioridad

```text
Alta
```

---

# Fase 4. Datos simulados

## Objetivo

Crear una base de datos ficticia para desarrollar la aplicación sin usar información real.

## Datos necesarios

* Ciclo escolar.
* Trimestres.
* Grupos oficiales.
* Alumnos.
* Maestros.
* Materias.
* Niveles de inglés.
* Asignaciones de alumnos a niveles de inglés.
* Calificaciones de ejemplo.

## Ejemplo

```text
Grupo oficial: 3A Secundaria
Alumno: Alumno 01
Materia: Inglés
Nivel de inglés: Nivel 4
Trimestre: II Trimestre
```

## Resultado esperado

Contar con datos suficientes para probar pantallas, validaciones y generación de reportes.

## Prioridad

```text
Alta
```

---

# Fase 5. Login simulado y navegación

## Objetivo

Crear una entrada básica al sistema con selección de rol.

## Funciones

* Entrar como secretaria/admin.
* Entrar como maestro.
* Redirigir al panel correspondiente.
* Mostrar navegación según rol.

## Resultado esperado

Poder probar dos experiencias diferentes dentro de la aplicación:

```text
Admin → Panel administrativo
Maestro → Panel de captura
```

## Prioridad

```text
Media
```

---

# Fase 6. Panel de secretaria/admin

## Objetivo

Construir el panel principal para que la secretaria/admin tenga visibilidad del sistema.

## Funciones iniciales

* Ver trimestre activo.
* Ver total de grupos.
* Ver total de alumnos.
* Ver total de maestros.
* Ver materias pendientes.
* Ver duplicados detectados.
* Ver alumnos con bajo promedio.
* Acceder a generación de actas y boletas.

## Resultado esperado

Tener una vista administrativa centralizada del estado académico y de captura.

## Prioridad

```text
Alta
```

---

# Fase 7. Control de trimestres

## Objetivo

Permitir que la secretaria/admin controle qué trimestre está activo.

## Funciones

* Ver trimestres.
* Activar trimestre.
* Cerrar trimestre.
* Bloquear trimestres futuros.
* Simular autorización de excepciones.

## Reglas

```text
Los maestros solo pueden capturar el trimestre activo.
Los trimestres cerrados no pueden modificarse sin autorización.
Los trimestres futuros permanecen bloqueados.
```

## Resultado esperado

Evitar capturas en periodos incorrectos.

## Prioridad

```text
Alta
```

---

# Fase 8. Panel del maestro

## Objetivo

Construir el panel donde el maestro visualiza sus materias, grupos o niveles asignados.

## Funciones

* Ver trimestre activo.
* Ver materias asignadas.
* Ver grupos oficiales asignados.
* Ver niveles de inglés asignados.
* Ver estado de captura.
* Entrar a tabla de captura.

## Resultado esperado

El maestro debe poder entrar rápidamente a la materia que necesita capturar.

## Prioridad

```text
Alta
```

---

# Fase 9. Captura de calificaciones en tabla

## Objetivo

Reemplazar la captura repetitiva por una tabla donde se capturen varios alumnos a la vez.

## Funciones

* Mostrar lista de alumnos.
* Capturar inasistencias.
* Capturar participación.
* Capturar proyecto.
* Capturar trabajos.
* Capturar examen.
* Calcular calificación final.
* Marcar errores por fila.
* Guardar captura.

## Resultado esperado

Reducir el tiempo de captura y mejorar la revisión visual de calificaciones.

## Prioridad

```text
Muy alta
```

---

# Fase 10. Copiar y pegar desde Excel

## Objetivo

Permitir que el maestro copie columnas desde Excel y las pegue directamente en la tabla de captura.

## Funciones

* Pegar valores en una columna.
* Distribuir valores hacia abajo.
* Validar cantidad de valores pegados.
* Detectar valores inválidos.
* Marcar errores.

## Ejemplo

```text
Columna copiada desde Excel:
0
1
2
0
3

Columna destino:
Inasistencias
```

## Resultado esperado

Acelerar la captura cuando el maestro ya tiene registros previos en hojas de cálculo.

## Prioridad

```text
Alta
```

---

# Fase 11. Validaciones principales

## Objetivo

Implementar las validaciones críticas del MVP.

## Validaciones iniciales

* Trimestre activo.
* Campos obligatorios.
* Valores numéricos.
* Valores negativos.
* Calificación mayor a 100.
* Suma inválida.
* Alumnos sin calificación.
* Duplicados.
* Materias pendientes.
* Inglés por nivel reportado por grupo oficial.

## Resultado esperado

Evitar guardar o generar documentos con errores críticos.

## Prioridad

```text
Muy alta
```

---

# Fase 12. Revisión administrativa de capturas

## Objetivo

Permitir que la secretaria/admin revise capturas completas, pendientes, duplicadas o con error.

## Filtros

* Ciclo escolar.
* Trimestre.
* Grupo oficial.
* Materia.
* Maestro.
* Nivel de inglés.
* Estado.

## Estados

```text
Pendiente
Completo
Con error
Duplicado
Validado
Corregido
```

## Resultado esperado

Dar visibilidad administrativa antes de generar documentos.

## Prioridad

```text
Alta
```

---

# Fase 13. Reportes básicos

## Objetivo

Crear reportes administrativos iniciales.

## Reportes

* Maestros pendientes de captura.
* Materias pendientes por grupo.
* Niveles de inglés incompletos.
* Alumnos con bajo promedio.
* Duplicados detectados.

## Resultado esperado

La secretaria/admin podrá identificar problemas sin revisar manualmente toda la base.

## Prioridad

```text
Media alta
```

---

# Fase 14. Generación de acta por materia en Excel

## Objetivo

Generar un acta por materia en formato Excel.

## Funciones

* Seleccionar ciclo escolar.
* Seleccionar trimestre.
* Seleccionar grupo oficial.
* Seleccionar materia.
* Validar información.
* Generar archivo Excel.

## Regla especial

En inglés, aunque la captura se realice por nivel, el acta debe generarse por grupo oficial.

## Resultado esperado

Crear automáticamente un archivo similar al formato usado por la institución, pero con datos ficticios o anonimizados.

## Prioridad

```text
Alta
```

---

# Fase 15. Generación de boleta individual en Excel

## Objetivo

Generar una boleta individual por alumno en formato Excel.

## Funciones

* Seleccionar ciclo escolar.
* Seleccionar grupo oficial.
* Seleccionar alumno.
* Validar información.
* Generar archivo Excel.

## Reglas

* La boleta se genera por alumno.
* Inglés aparece como materia normal.
* No se muestra el nivel de inglés en la boleta.
* No se genera si hay materias pendientes o errores críticos.

## Resultado esperado

Crear automáticamente una boleta individual en Excel con datos académicos del alumno.

## Prioridad

```text
Alta
```

---

# Fase 16. Caso de estudio para portafolio

## Objetivo

Convertir el proyecto en una historia clara para portafolio.

## Contenido

* Contexto real del problema.
* Flujo actual.
* Dolor principal.
* Solución propuesta.
* Decisiones de diseño.
* Tecnologías usadas.
* Capturas de pantalla.
* Resultados esperados.
* Aprendizajes.

## Resultado esperado

Tener un documento o sección pública que explique el proyecto profesionalmente para GitHub, LinkedIn o entrevistas.

## Prioridad

```text
Alta
```

---

# Fase 17. Mejoras futuras

## Objetivo

Definir funciones que pueden agregarse después del MVP.

## Ideas futuras

* Login real.
* Roles y permisos avanzados.
* Base de datos persistente.
* Historial de cambios.
* Auditoría de correcciones.
* Exportación masiva por grupo.
* Envío de boletas por correo.
* Integración con Google Forms.
* Integración con Google Sheets.
* Dashboard con gráficos.
* Versión privada para uso real de la institución.
* Despliegue en producción.
* IA para detectar inconsistencias o generar resúmenes administrativos.

## Resultado esperado

Mantener una ruta clara de crecimiento sin saturar el MVP.

## Prioridad

```text
Posterior al MVP
```

---

# MVP recomendado

Para que el proyecto sea presentable sin volverse demasiado grande, el MVP debe enfocarse en:

```text
1. Landing page.
2. Login simulado.
3. Panel secretaria/admin.
4. Control de trimestre activo.
5. Panel maestro.
6. Captura en tabla.
7. Copiar y pegar desde Excel.
8. Validaciones principales.
9. Revisión administrativa.
10. Generación de acta en Excel.
11. Generación de boleta individual en Excel.
```

---

# Orden recomendado de construcción

```text
1. Landing page.
2. Datos simulados.
3. Login simulado.
4. Layout general.
5. Dashboard admin.
6. Dashboard maestro.
7. Tabla de captura.
8. Cálculo automático.
9. Validaciones.
10. Revisión administrativa.
11. Exportación de acta.
12. Exportación de boleta.
13. Caso de estudio.
```

---

# Criterios para considerar listo el MVP

El MVP se considerará listo cuando:

* Se pueda entrar como admin o maestro.
* El admin pueda ver el trimestre activo.
* El maestro pueda capturar calificaciones en tabla.
* La tabla calcule la calificación final automáticamente.
* El sistema detecte errores básicos.
* El sistema detecte duplicados.
* El sistema represente el caso de inglés por niveles.
* El admin pueda revisar capturas.
* El sistema pueda generar un acta de ejemplo en Excel.
* El sistema pueda generar una boleta de ejemplo en Excel.
* El proyecto use únicamente datos ficticios o anonimizados.
* El README explique claramente el problema, solución y tecnologías.

---

## Resumen

El roadmap propone construir EduGrade Flow de forma progresiva.

Primero se documenta el problema y se prepara el proyecto. Después se construye una demo funcional con datos ficticios, enfocada en captura en tabla, validaciones y generación de documentos en Excel.

La meta principal es crear un proyecto sólido de portafolio basado en un problema real, sin exponer información sensible de la institución.
