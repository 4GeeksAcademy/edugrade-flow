# 12. AI UI Rules


# 2. Objetivo visual obligatorio

Toda interfaz debe verse:

```text id="60tao5"
limpia
sobria
institucional
profesional
desktop-first
orientada a tablas
orientada a validaciones
orientada a flujo administrativo real
```

La interfaz no debe verse:

```text id="3c5q8s"
infantil
genérica
decorativa
saturada
tipo plantilla común
tipo dashboard de IA
tipo SaaS sin contexto
```

---

# 3. Reglas visuales obligatorias

## Paleta

Usar una paleta sobria:

```text id="cd1mjx"
fondo gris muy claro
superficies blancas
bordes slate/zinc claros
texto gris carbón
azul institucional como color principal
verde solo para correcto
naranja/ámbar para pendiente
rojo solo para error
gris para bloqueado o secundario
```

No usar:

```text id="cswcfv"
colores neón
gradientes exagerados
fondos saturados
tarjetas con muchos colores
paletas infantiles
colores sin significado operativo
```

---

## Bordes y sombras

Usar:

```text id="dkyki8"
bordes de 1px
rounded-md, rounded-lg o rounded-xl
sombras mínimas o ninguna
separación visual limpia
```

Evitar:

```text id="d3m9r7"
rounded-3xl excesivo
sombras grandes
cards flotantes sin estructura
efectos glassmorphism
efectos 3D
decoración innecesaria
```

---

## Tipografía

Usar fuente sans-serif limpia:

```text id="st73iv"
Geist
Inter
System UI
Arial
```

Reglas:

* títulos claros
* texto de tabla legible
* labels compactos
* badges cortos
* nada de textos largos dentro de botones
* nada de frases de marketing dentro de la app interna

---

# 4. Reglas de idioma

Toda la interfaz visible debe estar en español.

Usar términos como:

```text id="13ew4m"
Panel administrativo
Captura de calificaciones
Revisar pendientes
Validar capturas
Generar acta
Generar boleta
Pegar desde Excel
Guardar captura
Con error
Pendiente
Duplicado
Validado
En progreso
Trimestre activo
Ciclo escolar
```

No usar términos en inglés como:

```text id="76e057"
Overview
Insights
Performance
Process Health
Review Pending
Generate Act
Grade Capture
Missing Data
Duplicate ID
Validated
```

Si una herramienta genera texto en inglés, debe traducirse y adaptarse al contexto del proyecto.

---

# 5. Reglas de datos

La IA debe usar únicamente datos ficticios o anonimizados.

Permitido:

```text id="hxbosa"
Alumno 01
Alumno 02
Maestro A
Maestra B
3A Secundaria
2A Preparatoria
Nivel 4
II Trimestre
Ciclo escolar 2025-2026
Matemáticas
Inglés
Historia
```

Prohibido:

```text id="moujfz"
nombres reales de alumnos
CURP reales
calificaciones reales
links reales de Google Forms
archivos Excel reales
nombre real de la institución sin autorización
capturas reales con datos sensibles
correos reales
```

---

# 6. Reglas para landing page

La landing page debe ser una portada profesional del proyecto.

Debe explicar:

```text id="g0m7mv"
qué problema resuelve
cómo funciona la solución
qué módulos tiene
qué beneficios busca
que usa datos ficticios
que es un proyecto de portafolio basado en un flujo real
```

La landing debe incluir:

```text id="rvmm9y"
Hero principal
Problema actual
Solución propuesta
Módulos principales
Flujo simplificado
Beneficios esperados
Estado del proyecto
Botón para entrar a demo
Botón para ver documentación
```

La landing puede tener más espacio visual que la app interna, pero debe conservar:

```text id="bc4hq6"
paleta sobria
tipografía limpia
bordes finos
tono profesional
estilo institucional
```

No debe parecer:

```text id="hml0yu"
landing de startup genérica
página con marketing exagerado
sitio infantil
plantilla con gradientes
landing con métricas inventadas
```

---

# 7. Reglas para dashboard administrativo

El dashboard administrativo debe ser una pantalla de control operativo para secretaría/admin.

Debe responder rápidamente:

```text id="yerc0u"
¿Qué trimestre está activo?
¿Qué grupos o materias están pendientes?
¿Hay capturas con error?
¿Hay duplicados?
¿Ya se pueden generar actas?
¿Ya se pueden generar boletas?
```

Debe incluir:

```text id="xcjrgh"
ciclo escolar
trimestre activo
cards de control
acciones rápidas
tabla de estado de captura
errores o duplicados visibles
actividad reciente o registro de procesos
```

Cards recomendadas:

```text id="swyqda"
Grupos activos
Alumnos activos
Materias pendientes
Capturas con error
Duplicados detectados
Actas pendientes
Boletas pendientes
Alumnos con bajo promedio
```

No usar métricas genéricas como:

```text id="xg6epo"
Performance
Process Health
Engagement
Growth
Analytics
Active Enrollment
```

A menos que sean adaptadas a una necesidad real del proyecto.

---

# 8. Reglas para captura de calificaciones

La pantalla de captura debe ser una herramienta de trabajo para maestros.

Debe priorizar:

```text id="zqxl55"
captura rápida
tabla clara
validación inmediata
errores visibles
pegado desde Excel
guardado controlado
```

Debe incluir:

```text id="g9s32u"
materia
grupo oficial o nivel de inglés
trimestre activo
cantidad de alumnos
botón Pegar desde Excel
botón Validar errores
botón Guardar captura
tabla de alumnos
resumen de captura
estados por fila
```

Columnas obligatorias:

```text id="u6qgzp"
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

Estados sugeridos:

```text id="l9avlp"
Correcto
Faltan datos
Error de suma
Duplicado
Pendiente
```

La calificación final debe mostrarse como calculada automáticamente.

---

# 9. Reglas para inglés por niveles

Cuando la pantalla involucre Inglés, la IA debe considerar esta regla:

```text id="ybjyg7"
Inglés puede capturarse por nivel, pero debe reportarse por grupo oficial.
```

La interfaz puede mostrar:

```text id="xms6es"
Materia: Inglés
Nivel de inglés: Nivel 4
Trimestre activo: II Trimestre
```

También debe incluir una nota discreta:

```text id="a8l9n0"
Para Inglés, la captura se realiza por nivel, pero los reportes se generarán por grupo oficial.
```

En boletas y actas finales, la materia debe aparecer como:

```text id="sewhc0"
Inglés
```

No como:

```text id="rxd7ur"
Nivel 4 de Inglés
```

---

# 10. Reglas para botones

Los botones deben decir acciones específicas.

Correcto:

```text id="cn2l9a"
Guardar captura
Validar errores
Pegar desde Excel
Revisar pendientes
Generar acta
Generar boleta
Cerrar trimestre
Autorizar corrección
```

Incorrecto:

```text id="j8hf66"
Enviar
Procesar
Continuar
Optimize
Explore
Smart Action
Get insights
```

El botón principal de cada pantalla debe ser visualmente claro, pero no exagerado.

---

# 11. Reglas para tablas

Las tablas deben ser el componente central del sistema.

La IA debe priorizar:

```text id="j1amcc"
alineación clara
encabezados legibles
filas compactas
bordes finos
estados por fila
inputs simples
scroll si hay muchos registros
```

Evitar:

```text id="8w90bu"
tablas con colores excesivos
filas demasiado altas
sombras pesadas
íconos innecesarios por celda
datos sin relación al sistema
columnas irrelevantes
```

---

# 12. Reglas para estados y errores

Todo error debe ser visible y accionable.

Ejemplos:

```text id="wbp4ac"
No se puede guardar porque existen errores.
Hay 2 registros duplicados.
Faltan calificaciones por capturar.
La calificación final supera 100.
El trimestre está cerrado.
```

Los estados deben usar badges cortos:

```text id="5u9wml"
Completo
Pendiente
Con error
Duplicado
Validado
Bloqueado
```

No usar mensajes largos dentro de badges.

---

# 13. Reglas para componentes

## Cards

Usar cards para información crítica.

No usar cards de relleno.

Cada card debe responder una pregunta operativa.

Ejemplo:

```text id="xxm59t"
¿Cuántas capturas tienen error?
¿Cuántas materias faltan?
¿Cuántas boletas faltan?
```

---

## Inputs

Los inputs deben ser:

```text id="0vqhn6"
compactos
claros
con borde sutil
con estado de error visible
adecuados para captura numérica
```

---

## Badges

Los badges deben ser:

```text id="6f8oqf"
pequeños
legibles
con color de estado
con texto corto
```

---

## Alertas

Las alertas deben ser:

```text id="edyjlx"
claras
breves
en español
relacionadas con una acción
```

---

# 14. Reglas de flujo

La IA no debe diseñar pantallas aisladas sin respetar el flujo del sistema.

Flujo base:

```text id="zlmsxi"
Secretaría configura ciclo escolar y trimestre activo
↓
Maestro captura calificaciones en tabla
↓
Sistema valida errores y duplicados
↓
Secretaría revisa pendientes
↓
Secretaría genera actas y boletas
```

Toda pantalla debe encajar en ese flujo.

---

# 15. Reglas de consistencia

Todas las pantallas deben compartir:

```text id="n4kjgd"
misma paleta
misma tipografía
mismo estilo de botones
mismo estilo de tablas
mismo estilo de cards
mismos estados
misma navegación
mismo tono en español
misma lógica de datos ficticios
```

La landing puede tener más espacio visual, pero debe seguir la identidad del sistema.

---

# 16. Prohibiciones absolutas

La IA no debe:

```text id="36h3qs"
usar datos reales
usar nombres reales
usar CURP reales
usar links reales
usar archivos reales de Excel
usar textos en inglés en la interfaz final
crear dashboards genéricos
inventar métricas sin relación al proyecto
usar diseño infantil
usar gradientes exagerados
usar colores neón
saturar la pantalla con iconos
crear pantallas mobile-first para el MVP
cambiar el flujo de negocio sin justificarlo
ignorar inglés por niveles
hacer la calificación final manual si debe calcularse
```

---

