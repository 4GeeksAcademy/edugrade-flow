# EduGrade Flow

Aplicación web para automatizar la captura, validación y generación de actas y boletas escolares en Excel.

## Descripción

EduGrade Flow es un proyecto de portafolio basado en un proceso real observado en una institución educativa privada.

El sistema busca reemplazar un flujo manual de captura y generación de reportes escolares por una aplicación web donde los maestros puedan capturar calificaciones en tabla, el sistema valide errores automáticamente y el personal administrativo pueda generar actas por materia y boletas individuales en Excel.

> Este repositorio usa únicamente datos ficticios o anonimizados. No contiene información real de alumnos, maestros, formularios, calificaciones ni archivos internos de la institución.

---

## Problema

Actualmente, la captura de calificaciones se realiza mediante formularios digitales separados por grupo.

El maestro debe capturar información alumno por alumno, repitiendo datos como:

* Maestro.
* Materia.
* Alumno.
* Trimestre.
* Criterios de evaluación.
* Calificación final.

Después, el personal administrativo revisa las respuestas, filtra información y genera documentos en Excel como:

* Actas por materia.
* Boletas individuales por alumno.

Este flujo genera trabajo repetitivo, riesgo de duplicados, errores de captura y dificultad para validar si la información está completa.

---

## Solución propuesta

EduGrade Flow propone una aplicación web con dos áreas principales:

### Panel de secretaria/admin

Permite administrar:

* Ciclo escolar.
* Grupos oficiales.
* Alumnos.
* Maestros.
* Materias.
* Niveles de inglés.
* Trimestre activo.
* Revisión de capturas.
* Validación de errores.
* Generación de actas y boletas.

### Panel de maestro

Permite:

* Ver materias, grupos o niveles asignados.
* Capturar calificaciones en tabla.
* Copiar y pegar datos desde Excel.
* Calcular automáticamente la calificación final.
* Validar errores antes de guardar.

---

## Funcionalidades principales

* Captura de calificaciones en tabla.
* Control de trimestre activo.
* Bloqueo de trimestres cerrados o futuros.
* Cálculo automático de calificación final.
* Validación de sumas incorrectas.
* Detección de duplicados.
* Detección de alumnos sin calificación.
* Reporte de maestros pendientes.
* Reporte de alumnos con bajo promedio.
* Manejo especial de inglés por niveles.
* Generación de acta por materia en Excel.
* Generación de boleta individual en Excel.

---

## Caso especial: inglés por niveles

La materia de inglés puede organizarse por niveles, no necesariamente por grupo oficial.

Un nivel de inglés puede tener alumnos de distintos grupos oficiales. Sin embargo, para reportes finales:

* El acta se genera por grupo oficial.
* La boleta individual muestra la materia como “Inglés”.
* El nivel de inglés no cambia el grupo oficial del alumno.

---

## Documentación

La documentación del proyecto está dividida en archivos Markdown dentro de la carpeta `docs/`.

| Documento                                         | Descripción                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| [01. Problema](docs/01-problema.md)               | Contexto, problema principal e impacto                             |
| [02. Flujo actual](docs/02-flujo-actual.md)       | Proceso actual de captura y generación de reportes                 |
| [03. Requerimientos](docs/03-requerimientos.md)   | Requerimientos funcionales, no funcionales y reglas de negocio     |
| [04. Flujo propuesto](docs/04-flujo-propuesto.md) | Nuevo flujo con la aplicación web                                  |
| [05. Modelo de datos](docs/05-modelo-datos.md)    | Entidades, relaciones y reglas de datos                            |
| [06. Pantallas](docs/06-pantallas.md)             | Pantallas principales del sistema                                  |
| [07. Validaciones](docs/07-validaciones.md)       | Validaciones de captura, administración y generación de documentos |
| [08. Roadmap](docs/08-roadmap.md)                 | Plan de desarrollo por fases                                       |
| [09. Caso de estudio](docs/09-caso-estudio.md)    | Resumen del proyecto para portafolio                               |

---

## MVP

La primera versión del proyecto se enfocará en:

1. Landing page del proyecto.
2. Login simulado por rol.
3. Panel de secretaria/admin.
4. Panel de maestro.
5. Control de trimestre activo.
6. Captura de calificaciones en tabla.
7. Copiar y pegar desde Excel.
8. Cálculo automático de calificación final.
9. Validaciones principales.
10. Revisión administrativa de capturas.
11. Generación de acta en Excel.
12. Generación de boleta individual en Excel.

---

## Tecnologías

Tecnologías iniciales:

* Next.js
* React
* TypeScript
* Tailwind CSS

Tecnologías previstas para fases posteriores:

* Base de datos
* Autenticación
* API propia
* Generación de archivos Excel
* Dashboard administrativo
* Despliegue web

---

## Estructura del proyecto

```text
edugrade-flow/
│
├── docs/
│   ├── 01-problema.md
│   ├── 02-flujo-actual.md
│   ├── 03-requerimientos.md
│   ├── 04-flujo-propuesto.md
│   ├── 05-modelo-datos.md
│   ├── 06-pantallas.md
│   ├── 07-validaciones.md
│   ├── 08-roadmap.md
│   └── 09-caso-estudio.md
│
├── screenshots/
│   ├── flujo-actual/
│   ├── prototipo/
│   └── demo/
│
├── data/
│   └── sample/
│
├── public/
├── src/
├── package.json
└── README.md
```

---

## Protección de datos

Este proyecto no debe incluir información real o sensible.

No se debe subir al repositorio:

* Archivos Excel reales.
* Formularios reales.
* Links reales de captura.
* Nombres reales de alumnos.
* CURP reales.
* Calificaciones reales.
* Capturas con datos personales.
* Formatos internos sin anonimizar.

Los datos usados en la demo serán ficticios.

---

## Cómo ejecutar el proyecto

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:3000
```

---

## Estado del proyecto

```text
Fase actual: documentación y planeación del MVP.
```

Ya se cuenta con:

* Análisis del problema.
* Flujo actual.
* Requerimientos iniciales.
* Flujo propuesto.
* Modelo de datos.
* Pantallas principales.
* Validaciones.
* Roadmap.
* Caso de estudio.

---

## Objetivo de portafolio

Este proyecto busca demostrar habilidades de:

* Levantamiento de requerimientos.
* Análisis de procesos.
* Modelado de datos.
* Diseño de flujos.
* Diseño de interfaces.
* Desarrollo web con React y Next.js.
* Validación de reglas de negocio.
* Automatización de documentos.
* Protección de datos sensibles.

---

## Próximos pasos

* Crear datos ficticios.
* Diseñar landing page.
* Crear login simulado.
* Construir panel de maestro.
* Construir panel de secretaria/admin.
* Implementar captura en tabla.
* Implementar validaciones.
* Preparar generación de documentos Excel.
