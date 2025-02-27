# Conversor Europeo de Calificaciones Universitarias (Next.js + PostgreSQL)

Estudiantes Erasmus, investigadores y profesionales a menudo necesitan convertir sus calificaciones universitarias entre diferentes países europeos. Este proyecto proporciona una herramienta fácil de usar para realizar estas conversiones de forma precisa.

Este repositorio contiene un conversor de calificaciones universitarias entre países europeos, con backend y frontend, desarrollado en TypeScript utilizando el framework Next.js y PostgreSQL como base de datos.

## Enlace a la Aplicación
[Conversor Europeo de Calificaciones Universitarias](https://grade-conversion.vercel.app/)


## Inicio Rápido

### Prerrequisitos

*   **Node.js:** Necesitas tener instalado Node.js (**versión 18 o superior**, se recomienda la versión 20) y npm (que viene incluido con Node.js). Puedes descargarlo desde la [página oficial de Node.js](https://nodejs.org/es/).
*   **PostgreSQL:** Necesitas tener instalado un servidor PostgreSQL (versión 12 o superior, se recomienda la versión 14 o 15).  Puedes descargarlo desde la [página oficial de PostgreSQL](https://www.postgresql.org/).

    <details>
    <summary>Instalación de PostgreSQL en Windows (ejemplo)</summary>

    1.  Descarga el instalador desde [la página oficial](https://www.postgresql.org/download/windows/).
    2.  Ejecuta el instalador y sigue las instrucciones.  Asegúrate de recordar la contraseña que establezcas para el superusuario `postgres`.
    3.  Durante la instalación, se te preguntará por el puerto (por defecto 5432).  A menos que tengas una razón para cambiarlo, deja el valor por defecto.
    4.  Asegúrate de que el servicio de PostgreSQL se inicie automáticamente.

    </details>

    <details>
    <summary>Instalación de PostgreSQL en macOS (ejemplo usando Homebrew)</summary>

    1.  Si no tienes Homebrew, instálalo: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
    2.  Instala PostgreSQL: `brew install postgresql`
    3.  Inicia el servicio: `brew services start postgresql`
    4.  (Opcional) Para acceder a la línea de comandos de PostgreSQL: `psql postgres`

    </details>

    <details>
    <summary>Instalación de PostgreSQL en Linux (ejemplo usando apt en Debian/Ubuntu)</summary>

    1.  Actualiza los repositorios: `sudo apt update`
    2.  Instala PostgreSQL: `sudo apt install postgresql postgresql-contrib`
    3.  El servicio de PostgreSQL debería iniciarse automáticamente.  Puedes verificarlo con: `sudo systemctl status postgresql`
    4.  (Opcional) Cambia la contraseña del usuario `postgres`: `sudo -u postgres psql` y luego, dentro de la consola de PostgreSQL, ejecuta: `ALTER USER postgres WITH PASSWORD 'nueva_contraseña';`

    </details>

### Configuración de la Base de Datos y Variables de Entorno

Antes de ejecutar el proyecto, debes configurar la conexión a la base de datos PostgreSQL.

1.  **Crea la base de datos:** Crea una base de datos PostgreSQL en tu servidor. Puedes darle el nombre que prefieras (por ejemplo, `conversor_calificaciones`).
2.  **Crea un usuario:** Crea un usuario de PostgreSQL con permisos para acceder a la base de datos que creaste.
3.  **Configura las variables de entorno:**
    *   Copia el archivo `.env.example` y renómbralo a `.env` en la raíz del proyecto.
    *   Abre el archivo `.env` y completa las siguientes variables:

        ```
        DATABASE_URL=postgresql://tu_usuario:tu_contraseña@localhost:5432/tu_base_de_datos
        NEXTAUTH_URL=http://localhost:3000  # O la URL de tu aplicación en producción
        NEXTAUTH_SECRET=un_secreto_largo_y_aleatorio  # Genera un secreto seguro con openssl rand -base64 32
        ```
> [!IMPORTANT]  
>  Reemplaza `tu_usuario`, `tu_contraseña` y `tu_base_de_datos` con los valores correctos para tu configuración.  El `NEXTAUTH_URL` es la URL base de tu aplicación (en desarrollo, suele ser `http://localhost:3000`). El `NEXTAUTH_SECRET` debe ser una cadena larga y aleatoria; puedes generarla con un comando como `openssl rand -base64 32` en la terminal o buscando "secret generator" online.

1.  **Ejecuta los scripts SQL:**
    *   Abre una conexión a tu base de datos PostgreSQL usando tu cliente preferido (pgAdmin, DBeaver, `psql`, etc.).
    *   Primero, ejecuta el script `scripts/create.sql`. Este script creará las tablas necesarias en la base de datos.  Ejemplo con `psql`:

        ```bash
        psql -U tu_usuario -d tu_base_de_datos -f scripts/create.sql
        ```

    *   Segundo, ejecuta el script `scripts/insertData.sql` para insertar los datos iniciales. Ejemplo con `psql`:

        ```bash
        psql -U tu_usuario -d tu_base_de_datos -f scripts/insertData.sql
        ```
    * **Importante**: Sustituye `tu_usuario` y `tu_base_de_datos` por tus credenciales reales.

### Instalación y Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone git@github.com:Saul-Sosa-Diaz/grade-conversion.git
    cd grade-conversion
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Arranca el proyecto en modo desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Arranca el proyecto en modo producción:**
    ```bash
    npm run build && npm run start
    ```

> [!NOTE]
> Para acceder al panel de administración se accederá a través de /admin y se deberá iniciar sesión con las credenciales: 
> * **Usuario:** admin
> * **Contraseña:** 1234

### Estructura de archivos
La estructura de directorios del proyecto sigue el patrón de diseño de arquitectura hexagonal y es el siguiente:
```
.
├── public # Archivos estáticos del proyecto (imágenes, iconos, etc.)
│   ├── flags
│   └── ull
│       └── icono
├── scripts # Scripts SQL para crear la base de datos y insertar datos
│   └── database
└── src # Código fuente del proyecto
    ├── api # Interfaz de API de la arquitectura hexagonal
    │   └── domain
    ├── app 
    │   ├── 403  # Página de error 403
    │   ├── admin # Página de administrador
    │   ├── api  # Rutas de APIS    
    │   │   ├── auth
    │   │   │   └── [...nextauth]
    │   │   ├── converter
    │   │   │   └── convert-grade
    │   │   ├── country
    │   │   │   ├── country-list
    │   │   │   ├── country-with-evaluation-info-list
    │   │   │   ├── create-country
    │   │   │   ├── delete-country
    │   │   │   └── update-country
    │   │   ├── evaluation-system
    │   │   │   ├── create-evaluation-system
    │   │   │   ├── delete-evaluation-system
    │   │   │   ├── evaluation-system-list
    │   │   │   ├── grade-conversion-by-evaluation-system
    │   │   │   └── update-evaluation-system
    │   │   └── university
    │   │       ├── create-university
    │   │       ├── delete-university
    │   │       ├── university-list
    │   │       └── update-university
    │   └── login # Página de login
    ├── application # Capa de aplicación de la arquitectura hexagonal
    │   ├── converter
    │   ├── country
    │   │   ├── getCountryList
    │   │   └── getCountryWithEvaluationInfoList
    │   ├── evaluationSystem
    │   │   ├── getEvaluationSystemList
    │   │   └── getGradeConversionListByEvaluationID
    │   └── university
    │       └── getUniversityList
    ├── constants # Constantes del proyecto
    ├── context # Contextos de la aplicación
    │   └── nextAuthProvider
    ├── domain # Dominio de la arquitectura hexagonal
    │   ├── converter
    │   ├── country
    │   │   └── dto
    │   ├── evaluationSystem
    │   │   └── dto
    │   └── university
    │       └── dto
    ├── hooks # Hooks personalizados
    │   ├── converter
    │   ├── country
    │   ├── evaluationSystem
    │   └── university
    ├── infrastructure # Capa de infraestructura de la arquitectura hexagonal
    │   ├── config # Configuración de la aplicación (base de datos, etc.)
    │   ├── database # Interfaces de base de datos
    │   │   └── postgres # Base de datos PostgreSQL
    │   │       └── queries # Consultas SQL
    │   ├── fixture # Datos de prueba
    │   │ 
    │   ├── repositories # Repositorios de la aplicación
    │   │   ├── auth
    │   │   ├── converter
    │   │   ├── country
    │   │   ├── evaluationSystem
    │   │   └── university
    │   └── screens # Pantallas de la aplicación
    │       ├── 403
    │       ├── 500
    │       ├── admin
    │       │   └── components # Componentes de la pantalla de administrador
    │       │       ├── CountryList
    │       │       ├── dashboard
    │       │       ├── EvaluationSystemList
    │       │       ├── forms
    │       │       │   ├── country
    │       │       │   ├── evaluationSystem
    │       │       │   └── university
    │       │       └── UniversityList
    │       ├── components # Componentes de la aplicación
    │       ├── home # Pantalla de inicio
    │       │   └── components # Componentes de la pantalla de inicio
    │       │       ├── CalculatedGradeComponent
    │       │       ├── CountryAdditionalComponent
    │       │       ├── CountryFromTreeSelectorComponent
    │       │       ├── CountryToTreeSelectComponent.tsx
    │       │       └── InputGradeComponent
    │       └── login # Pantalla de login
    │
    ├── styles # Estilos de la aplicación (Cada componente tiene el suyo propio al lado de u fichero tsx)
    └── tests # Configuración de lo tests 
```

> [!NOTE]  
> Estos son solo directorios dentro de ellos hay varios ficheros.


### APIs de la Aplicación

| Categoría      | Método                                  | Verbo HTTP | Endpoint                                                  | Descripción                                                                 | Requiere Autenticación |
|----------------|-----------------------------------------|------------|-----------------------------------------------------------|-----------------------------------------------------------------------------|-----------------------|
| **country**    | getCountryWithEvaluationInfoList        | GET        | /api/country/country-with-evaluation-info-list            | Devuelve una lista de países con información de evaluación.                | No                    |
|                | getCountryList                          | GET        | /api/country/country-list                                  | Devuelve una lista de países.                                              | No                    |
|                | updateCountry                           | PUT        | /api/country/update-country                                | Actualiza un país.                                                          | Sí                    |
|                | createCountry                           | POST       | /api/country/create-country                                | Crea un país.                                                               | Sí                    |
|                | deleteCountry                           | DELETE     | /api/country/delete-country                                | Elimina un país.                                                            | Sí                    |
| **university** | getUniversityList                       | GET        | /api/university/university-list                           | Devuelve una lista de universidades.                                       | No                    |
|                | updateUniversity                        | PUT        | /api/university/update-university                         | Actualiza una universidad.                                                  | Sí                    |
|                | createUniversity                        | POST       | /api/university/create-university                         | Crea una universidad.                                                       | Sí                    |
|                | deleteUniversity                        | DELETE     | /api/university/delete-university                         | Elimina una universidad.                                                     | Sí                    |
| **evaluationSystem** | getEvaluationSystemList              | GET        | /api/evaluation-system/evaluation-system-list             | Devuelve una lista de sistemas de evaluación.                              | No                    |
|                | getGradeConversionListByEvaluationID    | GET        | /api/evaluation-system/grade-conversion-by-evaluation-system | Devuelve una lista de conversiones de calificaciones por sistema de evaluación. | No                    |
|                | updateEvaluationSystem                  | PUT        | /api/evaluation-system/update-evaluation-system           | Actualiza un sistema de evaluación.                                         | Sí                    |
|                | createEvaluationSystem                  | POST       | /api/evaluation-system/create-evaluation-system           | Crea un sistema de evaluación.                                              | Sí                    |
|                | deleteEvaluationSystem                  | DELETE     | /api/evaluation-system/delete-evaluation-system           | Elimina un sistema de evaluación.                                           | Sí                    |
| **converter**  | convertGrade                            | POST       | /api/converter/convert-grade                               | Convierte una calificación de un país a otro.                               | No                    |

> [!NOTE]
> Los parámetros y respuestas se pueden ver en los respectivos ficheros de la capa de dominio, más específicamente:
> * [country](./src/domain/country/countryRepository.ts)
> * [university](./src/domain/university/universityRepository.ts)
> * [evaluationSystem](./src/domain/evaluationSystem/evaluationSystemRepository.ts)
> * [converter](./src/domain/converter/converterRepository.ts)

## Licencia
Copyright <2025> <Saul Sosa>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
