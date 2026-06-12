# 11. Design System

## Objetivo de este documento

Este documento define el sistema visual base de **EduGrade Flow**.

Su propósito es servir como referencia técnica para diseñar y construir las interfaces del proyecto, especialmente cuando se usen herramientas de IA, agentes de código o generadores visuales.

Este archivo debe guiar:

* estructura visual
* colores
* tipografía
* botones
* tablas
* tarjetas
* badges
* navegación
* estados
* formularios
* pantallas principales

La meta es mantener una interfaz consistente, profesional y alineada con el flujo real del sistema.

---

## Relación con otros documentos

Este documento complementa:

```text id="gtaryv"
docs/10-diseno-ui.md
docs/12-ai-ui-rules.md
```

* `10-diseno-ui.md` define la visión visual general.
* `11-design-system.md` define reglas concretas de diseño y componentes.
* `12-ai-ui-rules.md` dará instrucciones directas para agentes de IA.

---

## Principio central

EduGrade Flow debe verse como una herramienta administrativa escolar seria.

No debe parecer:

* app infantil
* dashboard genérico
* plantilla decorativa
* diseño saturado
* maqueta sin uso real

Debe parecer:

* sistema interno de secretaría
* panel de control escolar
* herramienta de captura de datos
* aplicación de validación académica
* sistema para generar documentos

---

# 1. Tokens visuales base

## Estilo general

```text id="v6e1v8"
Estilo: institucional, limpio y profesional
Prioridad: legibilidad y operación
Formato principal: desktop
Densidad visual: media-alta
Decoración: mínima
Uso principal: tablas, validaciones y control administrativo
```

---

## Paleta base

La paleta debe estar inspirada en tonos neutros tipo `zinc`, `slate` y azul institucional.

| Uso                  | Color conceptual   | Tailwind sugerido  |
| -------------------- | ------------------ | ------------------ |
| Fondo general        | Gris muy claro     | `bg-zinc-50`       |
| Superficie principal | Blanco             | `bg-white`         |
| Borde suave          | Gris claro         | `border-slate-200` |
| Texto principal      | Gris carbón        | `text-slate-900`   |
| Texto secundario     | Gris medio         | `text-slate-500`   |
| Texto auxiliar       | Gris suave         | `text-slate-400`   |
| Color principal      | Azul institucional | `blue-700`         |
| Hover principal      | Azul oscuro        | `blue-800`         |
| Fondo azul suave     | Azul muy claro     | `blue-50`          |

---

## Colores de estado

| Estado      | Uso                               | Tailwind sugerido         |
| ----------- | --------------------------------- | ------------------------- |
| Correcto    | Captura completa o validada       | `green-600`, `green-50`   |
| Pendiente   | Falta información                 | `amber-600`, `amber-50`   |
| Error       | Error crítico                     | `red-600`, `red-50`       |
| Duplicado   | Registro repetido                 | `orange-600`, `orange-50` |
| En progreso | Captura parcial                   | `blue-600`, `blue-50`     |
| Bloqueado   | Trimestre cerrado o no disponible | `slate-500`, `slate-100`  |

---

## Uso correcto del color

El color debe comunicar estado o jerarquía.

No se debe usar color solo para decorar.

Ejemplos correctos:

```text id="5vcuvf"
Verde → captura correcta
Naranja → pendiente
Rojo → error
Azul → acción principal o estado activo
Gris → información secundaria o bloqueada
```

Ejemplos incorrectos:

```text id="j0c5zc"
Usar muchos colores por tarjeta
Usar degradados innecesarios
Usar colores neón
Usar fondos saturados
Usar color sin significado operativo
```

---

# 2. Tipografía

## Fuente

Se recomienda usar una fuente sans-serif limpia.

Opciones aceptadas:

```text id="50afad"
Geist
Inter
System UI
Arial
```

Para el proyecto con Next.js, se recomienda usar `Geist` si ya está disponible.

---

## Jerarquía tipográfica

| Elemento             | Tamaño sugerido         | Peso                          | Uso                 |
| -------------------- | ----------------------- | ----------------------------- | ------------------- |
| Título principal     | `text-2xl` / `text-3xl` | `font-semibold` / `font-bold` | Título de pantalla  |
| Subtítulo de sección | `text-lg` / `text-xl`   | `font-semibold`               | Cards o bloques     |
| Texto normal         | `text-sm` / `text-base` | `font-normal`                 | Contenido principal |
| Texto de tabla       | `text-sm`               | `font-normal`                 | Filas y columnas    |
| Label                | `text-xs` / `text-sm`   | `font-medium`                 | Etiquetas y filtros |
| Badge                | `text-xs`               | `font-medium`                 | Estados             |
| Ayuda secundaria     | `text-xs` / `text-sm`   | `font-normal`                 | Descripciones       |

---

## Reglas de texto

La interfaz debe usar textos cortos y directos.

Ejemplos correctos:

```text id="37n8bb"
Revisar pendientes
Validar capturas
Generar acta
Guardar captura
Faltan datos
Con error
Duplicado
```

Evitar:

```text id="hz5vil"
Optimize process
Review insights
Explore analytics
Smart grading
Performance health
```

---

# 3. Layout principal

## Estructura base de la aplicación

La aplicación debe usar una estructura desktop con:

```text id="926dlj"
Sidebar lateral fija
+
Barra superior
+
Área principal de contenido
```

---

## Medidas sugeridas

| Elemento            | Medida sugerida |
| ------------------- | --------------- |
| Sidebar             | 240px - 280px   |
| Topbar              | 64px - 72px     |
| Padding principal   | 24px - 32px     |
| Gap entre secciones | 16px - 24px     |
| Radio de borde      | 8px - 12px      |
| Borde               | 1px sólido      |
| Sombra              | mínima o nula   |

---

## Contenedor principal

Ejemplo visual:

```text id="670c88"
<body bg-zinc-50>
  <Sidebar />
  <main>
    <Topbar />
    <PageContent />
  </main>
</body>
```

La pantalla no debe sentirse flotante o decorativa. Debe sentirse como una herramienta de trabajo.

---

# 4. Sidebar

## Objetivo

La sidebar debe permitir navegación rápida entre módulos.

Debe mantenerse simple, estable y fácil de escanear.

---

## Módulos sugeridos

Para versión completa:

```text id="v4dc51"
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

Para MVP:

```text id="5xai40"
Dashboard
Capturas
Actas
Boletas
Configuración
```

---

## Estilo visual

| Elemento      | Regla                               |
| ------------- | ----------------------------------- |
| Fondo         | Blanco o zinc muy claro             |
| Borde derecho | `border-r border-slate-200`         |
| Item activo   | Fondo azul suave, texto azul fuerte |
| Item normal   | Texto gris                          |
| Hover         | Fondo gris claro                    |
| Iconos        | Discretos, no decorativos           |
| Espaciado     | Compacto y consistente              |

---

## Ejemplo de item activo

```text id="tywi3j"
Dashboard
bg-blue-50
text-blue-700
border o indicador lateral azul
```

---

# 5. Topbar

## Objetivo

La barra superior debe mostrar contexto, no saturar.

---

## Elementos sugeridos

```text id="54qd9f"
Nombre de pantalla
Ciclo escolar
Trimestre activo
Usuario actual
Rol del usuario
```

---

## Ejemplo

```text id="tu5jb6"
Panel administrativo
Ciclo escolar 2025-2026
II Trimestre
Secretaría / Admin
```

---

## Reglas

La topbar no debe contener demasiados botones.

Las acciones principales deben ir dentro del contenido de cada pantalla, no escondidas en la topbar.

---

# 6. Cards

## Objetivo

Las cards deben resumir información crítica del proceso.

No deben usarse como decoración.

---

## Estilo visual

| Propiedad | Regla                       |
| --------- | --------------------------- |
| Fondo     | Blanco                      |
| Borde     | `border border-slate-200`   |
| Radio     | `rounded-lg` o `rounded-xl` |
| Sombra    | Muy ligera o ninguna        |
| Padding   | `p-4` o `p-5`               |
| Título    | Pequeño, semibold           |
| Número    | Grande, claro               |
| Icono     | Opcional y discreto         |

---

## Cards correctas para EduGrade Flow

```text id="to4jcl"
Trimestre activo
Grupos activos
Alumnos activos
Materias pendientes
Capturas con error
Duplicados detectados
Actas pendientes
Boletas pendientes
Alumnos con bajo promedio
```

---

## Cards que se deben evitar

```text id="2nehp1"
Performance global
Process health
Engagement
Smart insights
Academic analytics
Growth percentage
```

A menos que tengan una relación directa con el flujo real.

---

# 7. Botones

## Tipos de botones

El sistema debe tener pocos tipos de botones.

```text id="bzhp0a"
Primario
Secundario
Peligro
Fantasma
```

---

## Botón primario

Uso:

```text id="9gk6zt"
Guardar captura
Generar acta
Generar boleta
Validar capturas
```

Estilo sugerido:

```text id="fxcrxc"
bg-blue-700
text-white
hover:bg-blue-800
rounded-lg
height 36px - 40px
```

---

## Botón secundario

Uso:

```text id="g2m3mt"
Revisar pendientes
Pegar desde Excel
Limpiar tabla
Ver detalle
```

Estilo sugerido:

```text id="ws26ph"
bg-white
border border-slate-200
text-slate-700
hover:bg-slate-50
rounded-lg
```

---

## Botón de peligro

Uso:

```text id="c7zbxm"
Eliminar
Cerrar trimestre
Rechazar corrección
```

Estilo sugerido:

```text id="m6hm3s"
bg-red-600
text-white
hover:bg-red-700
```

Usarlo con cuidado.

---

## Botón fantasma

Uso:

```text id="d66n0m"
Acciones menores
Cancelar
Cerrar
Volver
```

Estilo sugerido:

```text id="1vwspa"
bg-transparent
text-slate-600
hover:bg-slate-100
```

---

## Reglas de botones

Los botones deben decir exactamente qué hacen.

Correcto:

```text id="h1z9l6"
Guardar captura
Generar acta
Validar errores
Pegar desde Excel
```

Incorrecto:

```text id="70zxn7"
Enviar
Procesar
Continuar
Optimizar
Explorar
```

---

# 8. Tablas

## Objetivo

Las tablas son el componente más importante del sistema.

Deben priorizar lectura, alineación y captura rápida.

---

## Estilo general

| Elemento     | Regla                                         |
| ------------ | --------------------------------------------- |
| Fondo        | Blanco                                        |
| Borde        | `border border-slate-200`                     |
| Header       | Fondo `slate-50`                              |
| Texto header | `text-xs`, `font-semibold`, mayúsculas suaves |
| Filas        | Separadas por borde inferior                  |
| Hover fila   | `bg-slate-50`                                 |
| Inputs       | Compactos                                     |
| Estado       | Badge pequeño                                 |

---

## Tabla administrativa

Uso:

```text id="uo4saj"
Revisar capturas
Revisar pendientes
Ver duplicados
Ver estado por grupo y materia
```

Columnas sugeridas:

```text id="v8m5qv"
Grupo
Materia
Maestro
Avance
Estado
Acción
```

---

## Tabla de captura docente

Uso:

```text id="0we5xj"
Capturar calificaciones por alumno
```

Columnas sugeridas:

```text id="8ctg7h"
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

---

## Reglas para tablas de captura

La tabla de captura debe:

* permitir edición directa
* mantener encabezados claros
* calcular calificación final
* marcar errores por fila
* permitir pegado desde Excel
* mostrar estado por alumno
* permitir scroll si hay muchos alumnos

---

## Qué evitar en tablas

No usar:

* sombras pesadas
* celdas demasiado grandes
* filas con muchos colores
* iconos innecesarios en cada celda
* textos largos dentro de badges
* columnas irrelevantes para el flujo

---

# 9. Inputs

## Estilo general

Los inputs deben ser simples y compactos.

Estilo sugerido:

```text id="bcj6u6"
height 32px - 36px
border border-slate-200
rounded-md
text-sm
bg-white
focus:ring-blue-600
```

---

## Inputs numéricos

Para calificaciones se deben usar inputs claros y alineados.

Reglas:

```text id="xbhw32"
Aceptar solo números
Evitar valores negativos
Mostrar error si el valor no es válido
Alinear valores numéricos al centro o derecha
```
## Inputs de calificación

Los campos de calificación deben adaptarse al nivel educativo.

### Secundaria

```text
Escala permitida: 1 a 10
```

### Preparatoria

```text
Escala permitida: 0 a 100
```

### Reglas visuales

* El campo debe mostrar placeholder acorde a la escala.
* El contexto de la captura debe mostrar el nivel educativo.
* El aviso de escala debe aparecer antes de la tabla.
* Los errores deben marcar la celda o fila correspondiente.
* Las advertencias deben permitir revisión antes de guardar.

### Placeholders sugeridos

| Nivel educativo | Placeholder |
| --------------- | ----------- |
| Secundaria      | Ej. 8.5     |
| Preparatoria    | Ej. 85      |

### Mensajes cercanos al input

```text
Secundaria usa escala de 1 a 10.
```

```text
Preparatoria usa escala de 0 a 100.
```

---

## Inputs con error

Estilo sugerido:

```text id="7buooo"
border-red-500
bg-red-50
text-red-700
```

El error debe ser visible sin saturar la fila.

---

# 10. Badges

## Objetivo

Los badges deben comunicar estado rápidamente.

---

## Estados principales

| Estado      | Estilo sugerido |
| ----------- | --------------- |
| Completo    | Verde suave     |
| Pendiente   | Ámbar suave     |
| En progreso | Azul suave      |
| Con error   | Rojo suave      |
| Duplicado   | Naranja suave   |
| Validado    | Verde suave     |
| Bloqueado   | Gris suave      |

---

## Texto de badges

Debe ser corto.

Correcto:

```text id="mo6l3m"
Completo
Pendiente
Con error
Duplicado
Validado
```

Incorrecto:

```text id="r4rjzu"
The capture contains an unresolved validation issue
This entry has duplicated student metadata
```
## Componentes para ventanas de captura

### CaptureWindowBadge

Componente visual para representar el estado de una ventana de captura por nivel educativo.

### Estados

| Estado | Texto visible | Color sugerido     | Uso                               |
| ------ | ------------- | ------------------ | --------------------------------- |
| active | Activo        | Verde              | La captura está habilitada        |
| locked | Bloqueado     | Gris o ámbar       | La captura aún no está habilitada |
| closed | Cerrado       | Rojo o gris oscuro | La captura ya terminó             |

### Ejemplo visual

```text
Secundaria    II Trimestre    Bloqueado
Preparatoria  II Trimestre    Activo
```

### Reglas de uso

* Usar siempre texto en español.
* No usar únicamente color; el estado debe tener texto visible.
* El badge debe ser compacto y legible.
* Debe usarse en dashboard administrativo y en pantallas de configuración.

---

# 11. Alertas y mensajes

## Tipos de alerta

```text id="39n7as"
Información
Advertencia
Error
Éxito
```

---

## Ejemplos de mensajes

Información:

```text id="s0x7vk"
El trimestre activo es II Trimestre.
```

Advertencia:

```text id="i8qj3i"
Hay alumnos pendientes de captura.
```

Error:

```text id="01752d"
No se puede guardar porque existen errores.
```

Éxito:

```text id="ksh48a"
Captura guardada correctamente.
```

---

## Reglas

Los mensajes deben ser:

* cortos
* claros
* en español
* enfocados en la acción
* sin lenguaje técnico innecesario

## Componente Alert

El componente `Alert` se usa para mostrar avisos, advertencias o errores relacionados con captura de calificaciones.

### Variantes

| Variante | Uso                      | Color sugerido |
| -------- | ------------------------ | -------------- |
| info     | Aviso informativo        | Azul claro     |
| warning  | Posible error corregible | Ámbar claro    |
| error    | Error que impide guardar | Rojo claro     |
| success  | Confirmación correcta    | Verde claro    |

### Alert informativo de escala

Se usa para recordar al maestro la escala correcta antes de capturar.

Ejemplo secundaria:

```text
Recuerda capturar calificaciones en escala de 1 a 10 para secundaria.
```

Ejemplo preparatoria:

```text
Recuerda capturar calificaciones en escala de 0 a 100 para preparatoria.
```

### Alert de advertencia

Se usa cuando el sistema detecta una posible escala incorrecta, pero el valor no necesariamente está fuera del rango técnico.

Ejemplo:

```text
Preparatoria usa escala de 0 a 100. Revisa si quisiste capturar 80 en lugar de 8.
```

### Alert de error

Se usa cuando el valor capturado está fuera del rango permitido.

Ejemplo:

```text
Secundaria usa escala de 1 a 10. Revisa si quisiste capturar 8.5 en lugar de 85.
```

### Reglas visuales

* El aviso informativo no debe parecer error.
* La advertencia debe llamar la atención sin bloquear visualmente toda la pantalla.
* El error debe ser visible y estar cerca del campo afectado.
* Todos los mensajes deben ser claros, breves y accionables.

---

# 12. Página landing

## Objetivo

La landing page debe presentar el proyecto como caso de portafolio.

No debe verse como una página comercial exagerada.

Debe verse como una portada profesional de software.

---

## Diferencia entre landing y aplicación interna

La aplicación interna usa alta densidad de datos.

La landing puede tener más espacio visual, pero debe mantener:

* sobriedad
* paleta institucional
* tipografía limpia
* bordes finos
* tono profesional
* nada infantil
* nada genérico

---

## Secciones sugeridas para landing

```text id="5utqjo"
Hero principal
Problema actual
Solución propuesta
Módulos principales
Flujo simplificado
Beneficios
Estado del proyecto
Acceso a demo
```

---

## Hero

Debe incluir:

```text id="um3dmp"
Nombre del proyecto
Descripción breve
Botón para ver demo
Botón para ver documentación
```

Ejemplo:

```text id="hsz77p"
EduGrade Flow
Sistema web para capturar, validar y generar actas y boletas escolares en Excel.
```

---

## Tono de landing

Debe comunicar:

```text id="73bcrh"
Este proyecto resuelve un problema operativo real.
El sistema reduce captura repetitiva.
El sistema ayuda a validar errores.
El sistema genera documentos escolares.
El proyecto usa datos ficticios.
```

---

## Qué evitar en landing

No usar:

* frases exageradas de marketing
* ilustraciones infantiles
* claims falsos
* métricas inventadas
* capturas con datos reales
* fondos saturados
* degradados excesivos
* texto demasiado largo

---

# 13. Dashboard administrativo

## Objetivo visual

Debe ser una pantalla de control operativo.

No debe verse como analytics genérico.

---

## Componentes obligatorios

```text id="hup96l"
Encabezado con ciclo escolar y trimestre activo
Cards de control
Tabla de estado de capturas
Acciones rápidas
Registro de actividad
Indicadores de errores o pendientes
```

---

## Prioridad visual

Orden sugerido:

```text id="6fy6du"
1. Trimestre activo
2. Acciones rápidas
3. Métricas críticas
4. Tabla de estado de capturas
5. Actividad reciente
```

---

# 14. Captura de calificaciones

## Objetivo visual

Debe ser una pantalla de trabajo de alta precisión.

El maestro debe poder capturar rápido sin confundirse.

---

## Componentes obligatorios

```text id="l5y3py"
Contexto de materia/grupo/trimestre
Botón Pegar desde Excel
Botón Validar errores
Botón Guardar captura
Tabla de alumnos
Estados por fila
Resumen de captura
Nota para inglés por niveles, si aplica
```

---

## Prioridad visual

Orden sugerido:

```text id="q6vxhn"
1. Contexto de captura
2. Acciones principales
3. Tabla
4. Errores visibles
5. Resumen de captura
```

---

# 15. Espaciado y bordes

## Reglas generales

| Elemento | Regla                       |
| -------- | --------------------------- |
| Cards    | `rounded-lg` o `rounded-xl` |
| Botones  | `rounded-md` o `rounded-lg` |
| Inputs   | `rounded-md`                |
| Tablas   | `rounded-lg` en contenedor  |
| Bordes   | `1px`                       |
| Sombras  | mínimas                     |

---

## Evitar

```text id="c91zk1"
rounded-3xl en exceso
sombras muy grandes
cards flotantes sin estructura
separaciones exageradas
efectos visuales innecesarios
```

---

# 16. Iconografía

## Reglas

Los iconos deben ser discretos.

Deben ayudar a identificar módulos o acciones, no decorar.

Uso aceptado:

```text id="33660m"
Dashboard
Alumnos
Capturas
Actas
Boletas
Errores
Pendientes
Guardar
Excel
```

Evitar:

```text id="qh25d4"
Iconos grandes sin propósito
Ilustraciones genéricas en dashboards
Mascotas escolares
Elementos infantiles
```

---

# 17. Datos ficticios

Toda pantalla debe usar datos ficticios o anonimizados.

## Ejemplos permitidos

```text id="3lnz0q"
Alumno 01
Alumno 02
Maestro A
Maestra B
3A Secundaria
Nivel 4
II Trimestre
Ciclo escolar 2025-2026
```

## No permitido

```text id="xdaxam"
Nombres reales
CURP reales
Calificaciones reales
Links reales
Formularios reales
Archivos Excel reales
Nombre real de institución sin autorización
```

---

# 18. Reglas de consistencia

Todas las pantallas deben compartir:

* misma paleta
* misma tipografía
* misma estructura base
* mismos estados
* mismos estilos de botón
* mismos estilos de tabla
* mismo tono en español
* misma navegación
* misma densidad visual

La landing puede tener más espacio visual, pero no debe romper la identidad general.

---

# 19. Criterios de aceptación visual

Una pantalla cumple el design system si:

```text id="m8kewf"
Se ve profesional.
Se entiende rápido.
Está en español.
Usa datos ficticios.
No parece infantil.
No parece dashboard genérico.
Prioriza tablas y operación.
Usa colores con significado.
Los botones dicen acciones claras.
Los estados son visibles.
Los errores se distinguen.
La interfaz sirve para secretaría o maestros.
```

---

## Resumen

El design system de EduGrade Flow define una interfaz sobria, institucional y orientada al trabajo administrativo.

El diseño debe ayudar a capturar calificaciones, validar errores, revisar pendientes y generar documentos escolares.

La prioridad es construir una herramienta clara, consistente y útil, no una interfaz decorativa.
