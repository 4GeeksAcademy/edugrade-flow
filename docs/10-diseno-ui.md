# 10. Diseño UI

## Objetivo de este documento

Este documento define la dirección visual inicial de **EduGrade Flow**.

El propósito es establecer cómo debe verse y sentirse la interfaz antes de comenzar a construir el frontend.

La prioridad del diseño no es que la aplicación se vea decorativa, sino que parezca una herramienta real de trabajo para secretaría y maestros.

---

## Dirección visual general

EduGrade Flow debe verse como un sistema administrativo escolar moderno, sobrio y profesional.

La interfaz debe transmitir:

* orden
* claridad
* control
* confianza
* rapidez
* precisión
* facilidad de uso

La aplicación no debe sentirse como una app infantil ni como un dashboard genérico generado por IA.

Debe sentirse como una herramienta interna de oficina, enfocada en capturar, revisar, validar y generar documentos escolares.

---

## Concepto visual

```text
Sistema administrativo escolar
+
Captura de calificaciones
+
Validación de errores
+
Generación de documentos
```

El diseño debe parecer una mezcla entre:

* panel administrativo
* sistema académico
* herramienta interna de secretaría
* aplicación de captura de datos
* sistema de control operativo

---

## Estilo aprobado como referencia

Después de revisar propuestas visuales, se eligió una línea de diseño basada en:

* fondo claro
* bordes delgados
* tablas limpias
* navegación lateral fija
* botones sobrios
* colores institucionales
* alta densidad de información
* estados visuales claros
* poca decoración
* componentes compactos

La referencia visual aprobada se basa en dos pantallas principales:

1. Dashboard administrativo de secretaría.
2. Pantalla de captura de calificaciones del maestro.

Estas dos pantallas serán la base visual para el resto del sistema.

---

## Principios de diseño

### 1. Funcionalidad antes que decoración

Cada componente debe tener una razón operativa.

No se deben agregar tarjetas, gráficos o elementos visuales solo porque se ven bonitos.

Cada sección debe responder a una pregunta real del proceso.

Ejemplo:

```text
¿Qué trimestre está activo?
¿Qué grupo falta?
¿Qué materia tiene error?
¿Qué maestro no ha capturado?
¿Cuántos duplicados existen?
¿Ya se puede generar el acta?
```

---

### 2. Desktop primero

El sistema se usará principalmente en computadora.

Esto es importante porque el flujo real incluye:

* tablas grandes
* captura de calificaciones
* revisión de alumnos
* validación de errores
* generación de archivos Excel
* trabajo administrativo de secretaría

Por eso, la versión principal debe diseñarse para escritorio.

La versión móvil puede considerarse después, pero no será la prioridad inicial.

---

### 3. Alta legibilidad

La información debe poder leerse rápido.

Esto aplica especialmente para:

* nombres de alumnos
* grupos
* materias
* estados de captura
* errores
* duplicados
* calificaciones
* acciones administrativas

La interfaz debe evitar textos demasiado pequeños, contrastes débiles o saturación visual.

---

### 4. Tablas como centro del sistema

EduGrade Flow no es una app de gráficos.

Es principalmente una app de captura y control de datos.

Por eso, las tablas son componentes centrales del diseño.

Las tablas deben ser:

* limpias
* compactas
* alineadas
* fáciles de escanear
* con estados visibles
* con bordes suaves
* sin sombras exageradas

---

### 5. Estados visuales claros

El sistema debe comunicar rápidamente si algo está correcto, pendiente o con error.

Estados sugeridos:

```text
Correcto      → verde
Pendiente     → naranja o amarillo sobrio
Error         → rojo
Duplicado     → rojo claro o naranja intenso
Validado      → verde
En progreso   → azul
Bloqueado     → gris
```

---

## Paleta visual

La paleta debe ser institucional, sobria y fácil de leer.

### Colores base

| Uso              | Color sugerido            | Descripción                 |
| ---------------- | ------------------------- | --------------------------- |
| Fondo principal  | Gris muy claro / zinc-50  | Fondo general de la app     |
| Superficie       | Blanco                    | Cards, tablas y paneles     |
| Bordes           | Gris claro / slate-200    | Separación visual           |
| Texto principal  | Azul oscuro / gris carbón | Lectura principal           |
| Texto secundario | Gris medio                | Subtítulos y ayudas         |
| Color principal  | Azul institucional        | Botones y navegación activa |

---

## Colores de estado

| Estado      | Color        | Uso                            |
| ----------- | ------------ | ------------------------------ |
| Correcto    | Verde        | Captura validada o completa    |
| Pendiente   | Naranja      | Captura incompleta o pendiente |
| Error       | Rojo         | Error crítico                  |
| Duplicado   | Rojo/Naranja | Registro repetido              |
| En progreso | Azul         | Captura parcial                |
| Bloqueado   | Gris         | Trimestre no disponible        |

---

## Tipografía

La tipografía debe ser limpia, moderna y fácil de leer.

Se puede usar una fuente sans-serif como:

```text
Geist
Inter
Arial
System UI
```

La prioridad es la legibilidad, no la personalidad visual.

### Jerarquía sugerida

| Elemento           | Estilo                                   |
| ------------------ | ---------------------------------------- |
| Título de pantalla | Grande, fuerte, claro                    |
| Subtítulos         | Medianos, semibold                       |
| Texto de tabla     | Compacto, legible                        |
| Etiquetas          | Pequeñas, mayúsculas suaves o gris medio |
| Botones            | Texto claro, directo                     |
| Estados            | Texto corto y visible                    |

---

## Layout general

La aplicación debe usar una estructura fija:

```text
Sidebar lateral
+
Barra superior
+
Área principal de contenido
```

---

## Sidebar

La navegación lateral debe ser simple y constante.

Debe ayudar al usuario a entender en qué módulo está.

### Elementos sugeridos

```text
Dashboard
Grupos
Alumnos
Maestros
Materias
Niveles de inglés
Capturas
Reportes
Actas
Boletas
Configuración
```

Para el MVP, se puede simplificar a:

```text
Dashboard
Capturas
Actas
Boletas
Configuración
```

---

## Barra superior

La barra superior debe mostrar información mínima.

Elementos sugeridos:

* nombre de pantalla
* usuario actual
* rol del usuario
* ciclo escolar
* trimestre activo

Ejemplo:

```text
Panel administrativo
Secretaría / Administrador
II Trimestre
Ciclo escolar 2025-2026
```

---

## Componentes principales

### Cards de resumen

Deben mostrar datos críticos, no métricas decorativas.

Ejemplos correctos:

```text
Trimestre activo
Grupos activos
Materias pendientes
Capturas con error
Duplicados detectados
Actas pendientes
Boletas pendientes
Alumnos con bajo promedio
```

Evitar métricas genéricas como:

```text
Performance general
Process health
Engagement
Analytics decorativos
```

A menos que tengan una utilidad real en el flujo.

---

### Botones

Los botones deben ser claros y operativos.

Ejemplos:

```text
Revisar pendientes
Validar capturas
Generar acta
Generar boleta
Pegar desde Excel
Validar errores
Guardar captura
Limpiar tabla
```

Evitar textos vagos como:

```text
Explore
Get insights
Optimize
Smart action
```

---

### Badges de estado

Los estados deben ser cortos.

Ejemplos:

```text
Completo
Pendiente
Con error
Duplicado
Validado
En progreso
Bloqueado
```

---

### Tablas

Las tablas deben tener:

* encabezados claros
* separación por filas
* alineación precisa
* inputs compactos
* estados por fila
* acciones visibles
* scroll si hay muchos registros

Las tablas no deben tener:

* sombras pesadas
* bordes demasiado redondeados
* colores excesivos
* gráficos innecesarios
* elementos decorativos dentro de cada fila

---

# Pantalla 1: Dashboard administrativo

## Objetivo

El dashboard administrativo debe permitir que secretaría vea rápidamente el estado general de captura y generación de documentos.

Esta pantalla debe responder:

```text
¿Qué trimestre está activo?
¿Qué grupos o materias están pendientes?
¿Hay errores?
¿Hay duplicados?
¿Ya se pueden generar actas o boletas?
```

---

## Contenido principal

### Encabezado

Debe mostrar:

```text
Panel administrativo
Ciclo escolar: 2025-2026
Trimestre activo: II Trimestre
Usuario: Secretaría / Administrador
```

---

### Acciones principales

Debe incluir accesos rápidos para:

```text
Revisar pendientes
Validar capturas
Generar acta
Generar boleta
```

Estas acciones deben estar visibles porque representan tareas reales de secretaría.

---

### Cards de control

Cards sugeridas:

```text
Grupos activos
Alumnos activos
Materias pendientes
Capturas con error
Duplicados detectados
Actas pendientes
Boletas pendientes
```

Cada card debe ser sencilla:

```text
Número grande
Etiqueta clara
Icono discreto
Color sobrio
```

---

### Tabla de estado de captura

Esta tabla es el centro del dashboard administrativo.

Columnas sugeridas:

```text
Grupo
Materia
Maestro
Avance
Estado
Acción
```

Ejemplo de estados:

```text
Completo
En progreso
Pendiente
Con error
Duplicado
```

La tabla debe permitir identificar rápidamente qué falta y qué debe revisar secretaría.

---

### Registro de actividad

Puede incluir una sección de actividad reciente.

Ejemplos:

```text
Acta generada para Matemáticas 3A.
Duplicado detectado en Inglés Nivel 4.
Captura validada para Historia 2A.
Trimestre II abierto para captura.
```

Esta sección ayuda a que el sistema se sienta real y trazable.

---

### Estado del trimestre

Debe existir una sección que muestre el avance del trimestre.

Ejemplo:

```text
Captura de calificaciones: 88%
Validación administrativa: 42%
Actas generadas: 20%
Boletas generadas: 10%
```

Esta información debe ser útil, no decorativa.

---

## Diseño visual del dashboard

El dashboard debe verse:

* limpio
* administrativo
* compacto
* sin exceso de colores
* con prioridad en tablas
* con botones claros
* con estados visibles

## Diseño para ventanas de captura por nivel educativo

El sistema debe mostrar de forma clara cuándo la captura de calificaciones está activa, bloqueada o cerrada para cada nivel educativo.

Esta regla es importante porque secundaria y preparatoria pueden tener calendarios de captura diferentes.

### Objetivo visual

La secretaria/admin debe poder identificar rápidamente:

```text
Qué nivel educativo puede capturar
Qué nivel educativo está bloqueado
Qué nivel educativo ya cerró captura
Cuáles son las fechas de apertura y cierre
```

### Representación recomendada

En el dashboard administrativo debe existir una sección llamada:

```text
Ventanas de captura
```

La sección puede mostrarse como tabla o como cards compactas.

Ejemplo en tabla:

| Nivel educativo | Trimestre    | Estado    | Apertura   | Cierre     |
| --------------- | ------------ | --------- | ---------- | ---------- |
| Secundaria      | II Trimestre | Bloqueado | 2026-03-01 | 2026-03-15 |
| Preparatoria    | II Trimestre | Activo    | 2026-01-10 | 2026-01-25 |

### Colores de estado

```text
Activo    → verde
Bloqueado → gris o ámbar
Cerrado   → rojo o gris oscuro
```

### Reglas visuales

* El estado activo debe ser fácil de identificar.
* No se debe mostrar un único “trimestre activo” como si aplicara igual para toda la institución.
* Si se muestra un trimestre general, debe aclararse que la captura real depende del nivel educativo.
* Las fechas deben tener buena legibilidad.
* Los estados deben usar badges consistentes con el resto del sistema.

---

# Pantalla 2: Captura de calificaciones del maestro

## Objetivo

La pantalla de captura debe permitir que el maestro capture calificaciones de varios alumnos desde una sola tabla.

Esta pantalla reemplaza el flujo repetitivo de llenar un formulario por alumno.

Debe responder:

```text
¿Qué materia estoy capturando?
¿Qué grupo o nivel estoy capturando?
¿Qué trimestre está activo?
¿Qué alumnos faltan?
¿Qué filas tienen error?
¿Ya puedo guardar?
```

---

## Encabezado de contexto

Debe mostrar:

```text
Materia
Grupo oficial o nivel de inglés
Trimestre activo
Cantidad de alumnos
Maestro
```

Ejemplo para materia normal:

```text
Materia: Matemáticas
Grupo: 3A Secundaria
Trimestre activo: II Trimestre
Alumnos: 30
```

Ejemplo para inglés:

```text
Materia: Inglés
Nivel de inglés: Nivel 4
Trimestre activo: II Trimestre
Alumnos: 22
```

---

## Botones principales

Debe incluir:

```text
Pegar desde Excel
Validar errores
Guardar captura
Limpiar
```

El botón más importante debe ser `Guardar captura`.

`Pegar desde Excel` debe tener buena visibilidad porque es una función clave para ahorrar tiempo.

---

## Tabla de captura

Columnas principales:

```text
#
Alumno
Inasistencias
Participación
Proyecto
Trabajos
Examen
Calificación final
Estado
```

La tabla debe permitir captura directa mediante campos editables.

---

## Calificación final

La calificación final debe calcularse automáticamente.

El maestro no debe depender de sumar manualmente.

Regla inicial:

```text
Participación + Proyecto + Trabajos + Examen = Calificación final
```

La inasistencia se registra como dato adicional, no necesariamente como parte de la suma.

---

## Estados por fila

Cada alumno debe mostrar un estado.

Estados sugeridos:

```text
Correcto
Faltan datos
Error de suma
Duplicado
Pendiente
```

Ejemplos:

```text
Alumno 01 → Correcto
Alumno 02 → Faltan datos
Alumno 03 → Duplicado
Alumno 04 → Error de suma
```

---

## Errores visibles

Los errores deben mostrarse directamente en la fila.

Ejemplos:

* borde rojo en el campo incorrecto
* badge rojo con texto corto
* mensaje general en el resumen

El sistema debe evitar que el maestro guarde una captura con errores críticos.

---

## Resumen de captura

Debe existir una barra inferior o panel lateral con:

```text
Alumnos esperados
Alumnos capturados
Errores
Duplicados
Estado general
Auto-guardado, si aplica en el futuro
```

Ejemplo:

```text
4 errores encontrados
2 duplicados detectados
28/30 alumnos capturados
```

---

## Nota para inglés por niveles

Cuando la materia sea inglés, debe mostrarse una nota discreta:

```text
Para Inglés, la captura se realiza por nivel, pero los reportes se generarán por grupo oficial.
```

Esta nota ayuda a explicar el caso especial sin saturar la interfaz.

## Diseño del aviso de escala en captura

La pantalla de captura del maestro debe mostrar un aviso visible indicando la escala correcta de calificación según el nivel educativo.

### Objetivo visual

Evitar que el maestro capture calificaciones en una escala incorrecta.

Ejemplo:

```text
Secundaria: capturar 8 en lugar de 80.
Preparatoria: capturar 80 en lugar de 8.
```

### Ubicación recomendada

El aviso debe aparecer arriba de la tabla de captura, junto al contexto de la materia, grupo, trimestre y nivel educativo.

Ejemplo para secundaria:

```text
Recuerda capturar calificaciones en escala de 1 a 10 para secundaria.
```

Ejemplo para preparatoria:

```text
Recuerda capturar calificaciones en escala de 0 a 100 para preparatoria.
```

### Estilo visual recomendado

* Usar una alerta informativa compacta.
* Fondo azul muy claro o ámbar muy claro.
* Borde sutil.
* Texto claro y directo.
* No debe parecer un error si solo es recordatorio.
* Debe estar visible antes de la tabla.

### Diferencia visual entre aviso, advertencia y error

| Tipo              | Uso                                        | Color sugerido |
| ----------------- | ------------------------------------------ | -------------- |
| Aviso informativo | Recordar escala antes de capturar          | Azul           |
| Advertencia       | Posible escala incorrecta, pero corregible | Ámbar          |
| Error             | Valor fuera de rango o inválido            | Rojo           |

### Ejemplos

```text
Aviso:
Recuerda capturar calificaciones en escala de 1 a 10 para secundaria.

Advertencia:
Preparatoria usa escala de 0 a 100. Revisa si quisiste capturar 80 en lugar de 8.

Error:
Secundaria usa escala de 1 a 10. Revisa si quisiste capturar 8.5 en lugar de 85.
```

---

# Lenguaje de interfaz

El sistema debe usar textos claros y directos en español.

## Términos preferidos

| Evitar            | Usar                              |
| ----------------- | --------------------------------- |
| Overview          | Panel administrativo              |
| Grading Capture   | Captura de calificaciones         |
| Review Pending    | Revisar pendientes                |
| Validate Captures | Validar capturas                  |
| Generate Act      | Generar acta                      |
| Generate Report   | Generar boletas / Generar reporte |
| Missing Data      | Faltan datos                      |
| Duplicate ID      | Duplicado                         |
| Validated         | Validado                          |
| In Progress       | En progreso                       |

---

## Tono de la interfaz

El tono debe ser:

* claro
* directo
* profesional
* sin frases largas
* sin lenguaje técnico innecesario

Ejemplos correctos:

```text
Hay 3 capturas con error.
Faltan 2 materias por validar.
No se puede guardar porque existen errores.
El trimestre activo es II Trimestre.
```

---

# Qué evitar

EduGrade Flow debe evitar:

* apariencia infantil
* colores neón
* gradientes exagerados
* ilustraciones decorativas innecesarias
* dashboards genéricos
* métricas sin utilidad
* cards de relleno
* textos en inglés dentro del producto final
* nombres reales
* datos reales
* exceso de iconos
* sombras pesadas
* bordes demasiado redondeados

---

# Qué conservar de la referencia visual

De las pantallas de referencia se conservará:

* layout con sidebar lateral
* estética limpia y sobria
* tablas compactas
* cards con bordes finos
* botones rectangulares y claros
* estados visuales con badges
* uso de colores solo para comunicar estado
* enfoque en información operativa
* diseño desktop primero
* sensación de herramienta administrativa real

---

# Ajustes necesarios a la referencia visual

Aunque la dirección visual es correcta, se deberán hacer ajustes:

* traducir toda la interfaz al español
* cambiar métricas genéricas por métricas del proceso real
* usar grupos, materias y trimestres representativos
* eliminar nombres reales
* usar datos ficticios
* adaptar inglés por niveles
* dar prioridad a actas y boletas
* simplificar navegación si es necesario
* enfocar el dashboard en pendientes, errores y documentos

---

# Pantallas prioritarias a diseñar

Para iniciar el frontend, se diseñarán primero estas dos pantallas:

```text
1. Dashboard administrativo de secretaría
2. Captura de calificaciones del maestro
```

Estas pantallas representan el flujo principal del sistema.

Después se podrán diseñar:

```text
3. Generación de acta
4. Generación de boleta
5. Gestión de alumnos
6. Gestión de niveles de inglés
7. Revisión de pendientes
```

---

# Criterios para aprobar el diseño

Una pantalla se considera bien diseñada si cumple con lo siguiente:

* se entiende en menos de 10 segundos
* el usuario sabe qué hacer
* las acciones principales están visibles
* los errores se distinguen rápido
* las tablas son legibles
* no se ve saturada
* no parece plantilla genérica
* se siente como sistema de trabajo real
* usa datos ficticios
* respeta el flujo documentado

---

## Resumen

La dirección visual de EduGrade Flow será institucional, limpia y profesional.

La interfaz debe priorizar la captura eficiente, la revisión administrativa y la validación de errores.

El diseño debe evitar verse decorativo o genérico. Su objetivo principal es ayudar a secretaría y maestros a trabajar más rápido, con menos errores y con mayor control del proceso de calificaciones.
