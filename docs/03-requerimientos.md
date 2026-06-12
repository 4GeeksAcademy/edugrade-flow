
# 03. Requerimientos

## Objetivo de este documento

Este documento define los requerimientos iniciales de la aplicación web para automatizar la captura, validación y generación de reportes de calificaciones escolares.

Los requerimientos están basados en el proceso actual observado, las necesidades del personal administrativo y las reglas reales de operación de la institución.

---

## Usuarios del sistema

### Secretaria / Administrador

Usuario principal del sistema. Tiene permisos para configurar periodos de captura, administrar alumnos, grupos, materias, maestros, niveles de inglés, revisar información capturada, corregir excepciones y generar documentos escolares.

### Maestro

Usuario encargado de capturar calificaciones de los alumnos en las materias, grupos o niveles que tiene asignados.

### Alumno

Entidad académica del sistema. No tendrá acceso directo en el MVP, pero sus datos serán usados para capturar calificaciones, generar actas y emitir boletas individuales.

---

## Requerimientos funcionales

### RF01. Gestión de grupos oficiales

El sistema debe permitir administrar grupos oficiales de la institución.

Ejemplo:

```text
1A Secundaria
2A Secundaria
3A Secundaria
1A Preparatoria
2A Preparatoria
3A Preparatoria
```

La cantidad de grupos puede variar por ciclo escolar.

---

### RF02. Gestión de alumnos

El sistema debe permitir registrar alumnos y asignarlos a un grupo oficial.

Cada alumno debe tener como mínimo:

* Nombre.
* Grupo oficial.
* Nivel educativo.
* CURP, si aplica para la boleta.
* Estado activo o inactivo.

---

### RF03. Gestión de maestros

El sistema debe permitir registrar maestros y relacionarlos con las materias o niveles que imparten.

Cada maestro debe tener como mínimo:

* Nombre.
* Materias asignadas.
* Grupos o niveles asignados.
* Estado activo o inactivo.

---

### RF04. Gestión de materias

El sistema debe permitir administrar materias por nivel educativo y grupo.

Ejemplo:

```text
Matemáticas
Español
Historia
Geografía
Inglés
```

Las materias normales se relacionan con grupos oficiales.

---

### RF05. Gestión especial de inglés por niveles

El sistema debe permitir manejar inglés como una materia especial organizada por niveles.

Un nivel de inglés puede contener alumnos de diferentes grupos oficiales.

Ejemplo:

```text
Nivel 4 de Inglés
- Alumno de 1A Secundaria
- Alumno de 2A Secundaria
- Alumno de 3A Secundaria
```

Aunque la captura de inglés se realice por nivel, las actas y boletas deben respetar el grupo oficial del alumno.

En la boleta, inglés debe mostrarse como una materia normal.

---

### RF06. Asignación de alumnos a niveles de inglés

El sistema debe permitir que la secretaria/admin asigne manualmente alumnos a niveles de inglés con base en la información proporcionada por coordinación de inglés.

Los niveles de inglés permanecen fijos durante el ciclo escolar.

---

### RF07. Control de trimestre activo

El sistema debe permitir que la secretaria/admin establezca qué trimestre está activo para captura.

Ejemplo:

```text
Periodo activo: II Trimestre
```

Cuando un trimestre está activo, los maestros solo deben poder capturar calificaciones de ese trimestre.

---

### RF08. Bloqueo de trimestres no activos

El sistema debe bloquear la captura de trimestres que no estén activos.

Ejemplo:

```text
I Trimestre: cerrado
II Trimestre: activo
III Trimestre: bloqueado
```

Los maestros no deben poder capturar o modificar información de trimestres cerrados o futuros sin autorización.

---

### RF09. Excepciones controladas por secretaria/admin

El sistema debe permitir que la secretaria/admin realice excepciones cuando sea necesario.

La secretaria/admin debe poder:

* Corregir registros.
* Desbloquear una captura específica.
* Autorizar cambios después del cierre de un trimestre.
* Resolver errores o duplicados.

Los maestros no deben tener permisos para desbloquear periodos por sí mismos.

---

### RF10. Captura de calificaciones en tabla

El sistema debe permitir capturar calificaciones en formato de tabla.

La tabla debe mostrar la lista de alumnos correspondiente al grupo, materia o nivel seleccionado.

Ejemplo:

```text
Alumno | Inasistencias | Participación | Proyecto | Trabajos | Examen | Calificación final
```

Este formato busca reducir la captura repetitiva y permitir revisar todo el grupo en una sola vista.

---

### RF11. Copiar y pegar datos desde Excel

El sistema debe permitir copiar y pegar datos desde una hoja de cálculo hacia columnas de la tabla de captura.

Ejemplo:

```text
El maestro copia una columna de inasistencias desde Excel.
El maestro pega la columna en la tabla del sistema.
El sistema distribuye los valores en el mismo orden de la lista de alumnos.
```

Esta función debe facilitar la captura cuando el maestro ya cuenta con información organizada en Excel.

---

### RF12. Criterios de evaluación establecidos

El sistema debe manejar criterios de evaluación establecidos.

En el MVP, los maestros no podrán crear criterios personalizados.

Criterios iniciales:

* Inasistencias.
* Participación.
* Proyecto.
* Trabajos.
* Examen.
* Calificación final.

---

### RF13. Cálculo automático de calificación final

El sistema debe calcular automáticamente la calificación final con base en los criterios establecidos.

El maestro no debe calcular manualmente la calificación final en el MVP.

---

### RF14. Validación de suma correcta

El sistema debe marcar error cuando la suma de los criterios no corresponda al total esperado.

Si la suma no es válida, el sistema debe mostrar advertencia o impedir guardar la captura, según la severidad del error.

---

### RF15. Guardado de calificaciones

El sistema debe guardar las calificaciones relacionadas con:

* Alumno.
* Grupo oficial.
* Materia.
* Maestro.
* Trimestre.
* Criterios de evaluación.
* Calificación final.
* Fecha de captura.
* Estado de validación.

---

### RF16. Detección de duplicados

El sistema debe detectar registros duplicados cuando exista más de una calificación para la misma combinación:

```text
Alumno + Materia + Grupo oficial + Trimestre
```

En el caso de inglés, aunque la captura se realice por nivel, la validación final debe relacionarse con el alumno, la materia inglés, el grupo oficial y el trimestre.

---

### RF17. Consulta de calificaciones

El sistema debe permitir consultar calificaciones por:

* Alumno.
* Grupo oficial.
* Materia.
* Maestro.
* Trimestre.
* Nivel de inglés, cuando aplique.

---

### RF18. Reporte de maestros pendientes

El sistema debe mostrar qué maestros tienen capturas pendientes.

El reporte debe ayudar a la secretaria/admin a identificar:

* Materias sin capturar.
* Grupos incompletos.
* Niveles de inglés incompletos.
* Maestros que no han enviado calificaciones.

---

### RF19. Reporte de alumnos con bajo promedio

El sistema debe identificar alumnos reprobados o con bajo promedio.

Este reporte servirá para detectar alumnos en riesgo académico.

---

### RF20. Generación de acta por materia en Excel

El sistema debe generar un acta por materia en formato Excel.

El acta debe generarse por grupo oficial.

Debe incluir:

* Nombre de la institución.
* Maestro.
* Materia.
* Grupo.
* Periodo o trimestre.
* Ciclo escolar.
* Fecha.
* Lista de alumnos del grupo oficial.
* Inasistencias.
* Participación.
* Proyecto.
* Trabajos.
* Examen.
* Calificación.
* Promedio.
* Espacios para firmas.

En el caso de inglés, aunque la captura venga de niveles, el acta debe organizarse por grupo oficial.

---

### RF21. Generación de boleta individual en Excel

El sistema debe generar una boleta individual por alumno en formato Excel.

La boleta debe incluir:

* Nombre del alumno.
* CURP, si aplica.
* Grupo oficial.
* Ciclo escolar.
* Fecha.
* Asignaturas.
* Calificaciones por trimestre.
* Calificación ordinaria.
* Faltas.
* Promedio.
* Reporte de conducta.
* Espacios para firmas.

En la boleta, inglés debe aparecer como una materia normal.

---

### RF22. Generación individual de documentos

El sistema debe permitir generar documentos de forma individual.

Ejemplo:

```text
1 alumno → 1 boleta individual
1 materia de un grupo oficial → 1 acta por materia
```

La generación masiva puede quedar para una fase posterior.

---

### RF23. Uso de datos ficticios o anonimizados

El sistema y el repositorio público deben usar datos ficticios o anonimizados.

No se deben subir archivos reales con información sensible de alumnos, maestros o institución.

---

## Requerimientos no funcionales

### RNF01. Protección de datos sensibles

El repositorio público no debe contener:

* Nombres reales de alumnos.
* CURP reales.
* Calificaciones reales.
* Archivos originales de la institución.
* Capturas con información sensible.
* Formatos internos sin anonimizar.

---

### RNF02. Interfaz clara para maestros

La interfaz de captura debe ser sencilla y rápida de usar.

El sistema debe reducir pasos repetitivos y permitir que el maestro capture varias calificaciones desde una sola vista.

---

### RNF03. Interfaz administrativa centralizada

La secretaria/admin debe contar con una vista centralizada para revisar grupos, materias, trimestres, pendientes, duplicados y reportes.

---

### RNF04. Diseño responsive básico

La aplicación debe visualizarse correctamente en computadora y pantallas medianas.

El uso principal esperado será en escritorio.

---

### RNF05. Trazabilidad de datos

Cada calificación debe poder relacionarse con:

* Alumno.
* Grupo oficial.
* Materia.
* Maestro.
* Trimestre.
* Fecha de captura.
* Usuario que capturó o modificó.

---

### RNF06. Facilidad de mantenimiento

La estructura del sistema debe permitir agregar funcionalidades futuras como:

* Login real.
* Roles avanzados.
* Base de datos persistente.
* Exportación masiva.
* Integración con Google Forms.
* Envío automático de reportes.
* Auditoría de cambios.

---

### RNF07. Consistencia visual

La aplicación debe mantener una interfaz visual consistente entre pantallas, usando componentes reutilizables para tablas, formularios, tarjetas, alertas y reportes.

---

## Reglas de negocio iniciales

### RB01. Solo se captura el trimestre activo

Los maestros solo pueden capturar calificaciones del trimestre habilitado por la secretaria/admin.

---

### RB02. Trimestres cerrados no se modifican sin autorización

Si un trimestre ya fue cerrado, solo la secretaria/admin puede autorizar correcciones.

---

### RB03. Una calificación válida por alumno, materia y trimestre

Para cada alumno debe existir solo una calificación válida por materia y trimestre.

---

### RB04. Inglés se captura por nivel, pero se reporta por grupo oficial

La captura de inglés puede realizarse por nivel, pero los reportes finales deben organizarse por grupo oficial.

---

### RB05. Inglés aparece como materia normal en la boleta

Aunque el alumno pertenezca a un nivel específico de inglés, la boleta debe mostrar la materia como “Inglés”.

---

### RB06. Los niveles de inglés permanecen fijos durante el ciclo escolar

Una vez asignado un alumno a un nivel de inglés, esa asignación se mantiene durante el ciclo escolar, salvo corrección autorizada por la secretaria/admin.

---

### RB07. La calificación final se calcula automáticamente

La calificación final debe calcularse con base en los criterios establecidos.

---

### RB08. Los criterios no son configurables en el MVP

Los criterios de evaluación permanecerán fijos durante la primera versión.

---

### RB09. No se deben generar documentos con errores críticos

No se deben generar actas o boletas si existen errores críticos como:

* Duplicados.
* Calificaciones incompletas.
* Sumas inválidas.
* Materias pendientes.

---

### RB10. Los documentos finales se generan en Excel

La salida inicial del sistema será en formato Excel.

PDF queda fuera del alcance inicial.

---

## Alcance del MVP

La primera versión del sistema debe incluir:

* Panel de secretaria/admin.
* Panel de maestro.
* Gestión básica de grupos oficiales.
* Gestión básica de alumnos.
* Gestión básica de materias.
* Gestión básica de maestros.
* Gestión de niveles de inglés.
* Asignación de alumnos a niveles de inglés.
* Control de trimestre activo.
* Captura de calificaciones en tabla.
* Copiar y pegar datos desde Excel hacia la tabla.
* Cálculo automático de calificación final.
* Validación de errores básicos.
* Detección de duplicados.
* Reporte de maestros pendientes.
* Reporte de alumnos con bajo promedio.
* Generación de acta por materia en Excel.
* Generación de boleta individual en Excel.

---

## Fuera de alcance inicial

La primera versión no incluirá:

* Login real con autenticación completa.
* Roles avanzados con permisos detallados.
* Firma digital.
* Envío automático de boletas por correo.
* Integración directa con Google Forms.
* Exportación masiva avanzada.
* Historial completo de auditoría.
* Base de datos con información real de la institución.
* Uso de datos sensibles en el repositorio público.

Estas funciones podrán evaluarse en fases posteriores.
