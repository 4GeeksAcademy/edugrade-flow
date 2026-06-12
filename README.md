# EduGrade Flow

Aplicación web para capturar, validar y generar de forma simulada actas y boletas escolares a partir de calificaciones capturadas por maestros.

EduGrade Flow es un proyecto de portafolio basado en un flujo escolar real, donde la captura de calificaciones, la revisión administrativa y la generación de reportes se realizan de forma manual o repetitiva.

> Este repositorio usa únicamente datos ficticios o anonimizados. No contiene información real de alumnos, maestros, formularios, calificaciones ni archivos internos de ninguna institución.

---

## Descripción

EduGrade Flow propone un sistema web con dos roles principales:

* **Maestro:** captura calificaciones, pega datos desde Excel, revisa errores y envía la captura.
* **Secretaría/Admin:** revisa capturas, filtra pendientes, solicita correcciones, valida información y genera documentos en demo.

El objetivo del proyecto es demostrar un flujo funcional de extremo a extremo:

```text
Maestro captura calificaciones
↓
Sistema valida datos y escalas
↓
Secretaría revisa capturas
↓
Secretaría valida o solicita corrección
↓
Sistema genera actas y boletas en demo
```

---

## Problema

En el flujo manual, los maestros capturan calificaciones en formularios o archivos separados. Posteriormente, el área administrativa debe revisar respuestas, detectar errores, validar información y preparar actas o boletas en Excel.

Este proceso puede generar:

* Captura repetitiva.
* Errores de escala o suma.
* Duplicados.
* Alumnos pendientes de calificación.
* Revisión administrativa lenta.
* Dificultad para saber qué capturas ya están listas.
* Generación manual de documentos.

---

## Solución propuesta

EduGrade Flow centraliza el proceso en una aplicación web con captura en tabla, validaciones automáticas y revisión administrativa.

### Panel del maestro

Permite:

* Ver el ciclo escolar y trimestre activo.
* Identificar si la ventana de captura está activa o bloqueada por nivel educativo.
* Capturar calificaciones por alumno.
* Pegar datos desde Excel.
* Calcular automáticamente la calificación final.
* Limpiar una fila o toda la tabla.
* Detectar errores o posibles problemas de escala.
* Confirmar calificaciones con escala sospechosa.
* Guardar y enviar la captura en modo demo.

### Panel de secretaría/admin

Permite:

* Ver resumen operativo de capturas.
* Revisar capturas por grupo, materia y maestro.
* Filtrar por estado, nivel, grupo, maestro o materia.
* Buscar capturas rápidamente.
* Validar capturas individualmente o en bloque.
* Solicitar correcciones.
* Ver detalle de alumnos incluidos en una captura.
* Generar actas y boletas en modo demo.
* Consultar vista previa de documentos simulados.

---

## Funcionalidades implementadas en el MVP

* Landing page del proyecto.
* Selección de rol.
* Panel de maestro.
* Panel de secretaría/admin.
* Control visual de ventana de captura por nivel educativo.
* Captura de calificaciones en tabla.
* Pegado de datos desde Excel.
* Cálculo automático de calificación final.
* Limpieza por fila.
* Limpieza de tabla completa.
* Validación de pendientes.
* Validación de errores.
* Confirmación de escala por parte del maestro.
* Guardado y envío simulado de captura.
* Revisión administrativa masiva.
* Filtros y búsqueda en capturas.
* Selección múltiple de capturas.
* Validación individual y masiva.
* Solicitud de corrección individual y masiva.
* Estado “Corrección solicitada”.
* Detalle de captura seleccionada.
* Lista de alumnos incluidos en la captura.
* Validación de escala por nivel educativo:

  * Secundaria: 1 a 10.
  * Preparatoria: 0 a 100.
* Pantalla de actas y boletas.
* Vista previa simulada de documentos.
* Generación demo de documentos.

---

## Capturas del MVP

Las capturas principales del flujo se encuentran en:

```text
screenshots/demo/
```

| Pantalla                | Archivo                                            |
| ----------------------- | -------------------------------------------------- |
| Landing page            | `screenshots/demo/01-landing.png`                  |
| Selección de rol        | `screenshots/demo/02-seleccion-rol.png`            |
| Panel del maestro       | `screenshots/demo/03-panel-maestro.png`            |
| Captura del maestro     | `screenshots/demo/04-captura-maestro.png`          |
| Panel administrativo    | `screenshots/demo/05-panel-admin.png`              |
| Revisión administrativa | `screenshots/demo/06-revision-admin.png`           |
| Actas y boletas         | `screenshots/demo/07-documentos-actas-boletas.png` |

---

## Rutas principales

```text
/                         Landing page
/demo                     Selección de rol
/demo/maestro             Panel del maestro
/demo/maestro/captura     Captura de calificaciones
/demo/admin               Panel administrativo
/demo/admin/revision      Revisión administrativa
/demo/admin/documentos    Actas y boletas en demo
```

---

## Tecnologías utilizadas

* Next.js
* React
* TypeScript
* Tailwind CSS
* Datos ficticios en archivos locales

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
│   ├── 09-caso-estudio.md
│   ├── 10-diseno-ui.md
│   ├── 11-design-system.md
│   └── 12-ai-ui-rules.md
│
├── screenshots/
│   ├── demo/
│   ├── flujo-actual/
│   └── prototipo/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── data/
│   └── types/
│
├── public/
├── package.json
└── README.md
```

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

## Estado actual del proyecto

```text
MVP visual funcional completado.
```

El proyecto ya cuenta con un flujo demo completo:

```text
Landing
→ Selección de rol
→ Captura del maestro
→ Revisión administrativa
→ Generación simulada de actas y boletas
```

La aplicación todavía no implementa backend, autenticación real, base de datos ni generación real de archivos Excel. Es una demo funcional de interfaz y flujo de negocio.

---

## Limitaciones actuales

* No hay autenticación real.
* No hay backend.
* No hay base de datos.
* No se guardan datos de forma persistente.
* La generación de actas y boletas es simulada.
* No se descargan archivos Excel reales.
* Los datos usados son ficticios.

---

## Próximas mejoras

* Implementar autenticación por rol.
* Conectar una base de datos.
* Guardar capturas reales.
* Implementar generación real de archivos Excel.
* Agregar historial de correcciones.
* Agregar permisos por usuario.
* Agregar exportación de actas por materia.
* Agregar exportación de boletas por alumno.
* Mejorar trazabilidad administrativa.

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

Los datos usados en la demo son ficticios.

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
* Manejo de estados de captura.
* Simulación de procesos administrativos.
* Protección de datos sensibles.

