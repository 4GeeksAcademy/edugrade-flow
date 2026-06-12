# 01. Problema

## Contexto

Este proyecto nace a partir de un proceso real observado en una institución educativa privada que administra grupos de secundaria y preparatoria.

La escuela utiliza formularios digitales y archivos de Excel para capturar, organizar y generar reportes de calificaciones. Aunque el proceso actual permite recopilar la información, todavía requiere trabajo manual para revisar datos, detectar errores, llenar actas por materia y generar boletas individuales por alumno.

El proyecto busca documentar y resolver este problema mediante una aplicación web que permita capturar, validar y generar reportes escolares de forma más eficiente.

---

## Situación actual

La institución maneja aproximadamente 6 grupos activos:

* 3 grupos de secundaria.
* 3 grupos de preparatoria.

La cantidad de grupos puede variar por ciclo escolar. En algunos años puede existir un grupo adicional, llegando aproximadamente a 7 grupos.

La cantidad de alumnos también varía por grupo. Algunos grupos pueden tener cerca de 10 alumnos, mientras que otros pueden superar los 30 alumnos.

Actualmente, cada grupo cuenta con un formulario independiente para la captura de calificaciones. Los maestros deben registrar calificaciones por alumno, materia y trimestre.

---

## Problema principal

El proceso actual depende de captura repetitiva y revisión manual.

Cada maestro debe llenar formularios varias veces, seleccionando información que se repite constantemente, como maestro, materia, alumno y trimestre. Después, el personal administrativo debe revisar los datos capturados y trasladarlos a formatos de Excel para generar actas y boletas.

Esto provoca pérdida de tiempo, riesgo de errores y dificultad para validar si la información está completa antes de generar los reportes finales.

---

## Problemas específicos identificados

### Captura repetitiva

Los maestros deben registrar las calificaciones alumno por alumno. Si un grupo tiene más de 30 alumnos, el proceso debe repetirse más de 30 veces para una sola materia.

### Riesgo de duplicados

Cuando un maestro se equivoca o vuelve a enviar una respuesta, pueden generarse registros duplicados para el mismo alumno, materia y trimestre.

### Validación manual de calificaciones

La calificación final debe obtenerse a partir de criterios establecidos. Si la suma no es correcta, el error puede detectarse tarde o pasar desapercibido.

### Generación manual de documentos

El personal administrativo necesita generar actas por materia y boletas individuales por alumno en Excel. Este proceso requiere revisar, filtrar y acomodar información manualmente.

### Falta de visibilidad de pendientes

No existe una vista centralizada para identificar rápidamente qué maestros ya capturaron calificaciones, qué materias están incompletas o qué alumnos tienen bajo promedio.

### Complejidad por materias organizadas por nivel

Además de los grupos oficiales, existe una situación especial con la materia de inglés.

A diferencia de materias tradicionales, donde todos los alumnos pertenecen al mismo grupo oficial, inglés puede organizarse por niveles. Esto significa que un grupo de inglés puede estar formado por alumnos de diferentes grupos oficiales.

Ejemplo:

```text
Nivel 4 de Inglés
- Alumno de 1° de secundaria
- Alumno de 2° de secundaria
- Alumno de 3° de secundaria
```

Sin embargo, para efectos de actas y boletas, los alumnos deben seguir apareciendo dentro de su grupo oficial.

Esto implica que el sistema debe distinguir entre:

* Grupo oficial del alumno.
* Nivel o grupo especial de inglés.
* Materia que aparecerá en la boleta.

En la boleta, inglés debe mostrarse como una materia normal, sin mostrar necesariamente el nivel del alumno.

---

### Falta de control centralizado del periodo de captura

Actualmente, la captura de calificaciones depende del formulario y de la selección manual del trimestre.

Esto puede generar riesgo de capturar información en un trimestre incorrecto o modificar información que ya debería estar cerrada.

Una mejora importante es que el sistema permita que la secretaria o administrador controle qué trimestre está activo para captura.

Ejemplo:

```text
Periodo activo: II Trimestre
Maestros: solo pueden capturar II Trimestre
I Trimestre: bloqueado
III Trimestre: bloqueado
```

Si existe una excepción, únicamente la secretaria o administrador debería tener permisos para corregir, desbloquear o modificar registros.


---

## Impacto

El proceso actual genera:

* Mayor carga de trabajo para maestros.
* Mayor carga administrativa para la secretaria.
* Riesgo de errores de captura.
* Riesgo de registros duplicados.
* Retrasos en la generación de actas y boletas.
* Dificultad para detectar alumnos reprobados o con bajo promedio.
* Dependencia de filtros y revisión manual en Excel.

---

## Oportunidad de mejora

El proceso puede mejorarse mediante una aplicación web que permita centralizar la captura de calificaciones, validar errores antes de guardar la información y generar documentos escolares en Excel.

La solución propuesta debe enfocarse en reducir trabajo repetitivo, mejorar la confiabilidad de los datos y facilitar la generación de reportes escolares.

---

## Objetivo inicial del proyecto

Diseñar y construir una aplicación web para automatizar la captura, validación y generación de actas y boletas escolares, usando datos ficticios o anonimizados para proteger la información real de alumnos, maestros e institución.
