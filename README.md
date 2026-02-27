# MaquinitaKiller

Una herramienta de interfaz de línea de comandos (CLI) interactiva, pensada para estudiantes y aficionados a la ciberseguridad y el hacking ético. Su objetivo principal es **reducir la fricción** a la hora de resolver máquinas vulnerables , facilitando la ejecución de varias herramientas de reconocimiento, fuzzing, escaneo y explotación, permitiendo enfocarte **en comprender la vulnerabilidad** y aprender las flags correctas de forma guiada, en vez de frustrarte buscando la sintaxis olvidada de un comando largo.

## Filosofía

> "Mejor entender por qué un `-sC` funciona, que solo copiar y pegar".

Esta herramienta guía interactivamente los flujos comunes de comandos complejos como **nmap**, **gobuster**, **curl** y **sqlmap**. Te pregunta el objetivo y te explica el significado de cada bandera o modo seleccionado, integrando todo y lanzando el comando de manera segura a la terminal nativa subyacente de Linux usando `zx`.

---

## Estructura del Proyecto

El proyecto está diseñado pensando en la mantenibilidad y modularidad. Una estructura que divide responsabilidades para que agregar, corregir o estudiar una herramienta sea intuitivo.

```txt
.
├── main.js                  # Punto de entrada. Interfaz principal y validaciones del PATH.
├── package.json             # Manejo de dependencias (zx y @inquirer/prompts).
├── utils/                   # Herramientas globales.
│   └── constants.js         # Constantes, strings como botones de `Atrás`, etc.
│
├── nmap/                    # Módulo para nmap
│   ├── constants.js         # Definición del menú de nmap, flags con explicaciones y reglas.
│   ├── validations.js       # Reglas de incompatibilidad entre las flags de nmap.
│   └── index.js             # Lógica de recolección de variables e inyección a zx.
│
├── gobuster/                # Módulo para gobuster (Misma estructura de nmap).
│   ├── constants.js
│   └── index.js
|
├── sqlmap/                  # Módulo de sqlmap.
│   ├── constants.js
│   └── index.js
|
└── curl/                    # Módulo de utilería HTTP base y manual
    ├── constants.js
    └── index.js
```

### ¿Cómo Funciona la Ejecución? (`main.js`)

El archivo `main.js` no procesa argumentos. Su única función es desplegar el menú maestro y actuar como puente (router) a la herramienta escogida.

1. **El array de herramientas (`TOOLS`)**: Contiene la definición de cada integración:
   - `name`: Nombre que se muestra en la CLI.
   - `value`: ID interno que se usa en las opciones del menú Inquirer.
   - `binary`: El nombre del ejecutable subyacente en el sistema operativo (ej: `"nmap"`).
   - `handler`: Promesa o función a llamar (importada de su módulo homónimo, por ej.`handleNmap`) en caso de ser seleccionado.

2. **Validación Preventiva (Check Path)**: Antes de lanzar la función `handler` y ensuciar la terminal con errores extraños de NodeJS, `main.js` busca si el OS cuenta con ese `binary` instalado usando el comando invisible `$which`. Si no existe, el programa lo avisa y corta el flujo cordialmente.

---

## ¿Cómo integrar una herramienta nueva?

La filosofía modular facilita integrar una herramienta en no más de 10 minutos. Digamos que queremos agregar **`ffuf`**.

1. **Crear su propio directorio y su módulo**:
   Crea la carpeta de tu herramienta `./ffuf/` y adentro, crea `constants.js` y `index.js`. 

2. **Declarar sus flags y menús** (`constants.js`):
   Agrupa en arreglos amigables para _Inquirer_ las banderas que desees. Recuerda añadir las descripciones que dejen al usuario un entendimiento de lo que hace.
   ```javascript
   export const FFUF_FLAGS = [
     { name: '-H', value: '-H', description: 'Añadir un Header personalizado a la peticion.' },
     { name: '-w', value: '-w', description: 'Wordlist (Ruta del archivo con iteraciones).' }
   ];
   export const FFUF_FLAGS_CON_VALOR = ['-H', '-w']; // Flags que requieren ser solicitadas y pedir input al usuario de qué van a cargar.
   ```

3. **Ineractuar y construir la llamada segura** (`index.js`):
   Importa la lógica UI de Inquirer de NPM y tus constantes. Al final, toda recolección de parámetros terminará en un Array de Strings (jamás construir comandos interpolando strings para zx, esto previene inyecciones).
   ```javascript
   import { input, checkbox } from '@inquirer/prompts';
   import 'zx/globals';
   
   export async function handleFfuf() {
       // ... lógicas usando inquirer para armar cmdArgs (flags + variables interactivas)
       
       const cmdArgs = ['-w', wordlist, '-u', url]
       
       // Una vez tengas el arreglo resultante, pásalo a zx (importante no usar `${cmdArgs.join()}`)
       try {
           const result = await $`ffuf ${cmdArgs}`;
           console.log(result.stdout);
       } catch (error) {
           console.error("Algo fallo con FFUF:", error);
       }
   }
   ```
4. **Registrarlo en el CLI Principal** (`main.js`):
   Importa tu función y agrega el objeto al listado maestro.
   ```javascript
   import { handleFfuf } from './ffuf/index.js'
   
   const TOOLS = [
       ...
       { name: 'ffuf', value: 'ffuf', binary: 'ffuf', handler: handleFfuf }
   ]
   ```
¡Y eso es todo!

## Requisitos
* **NodeJS 16+** y NPM.
* Herramientas mencionadas nativamente instaladas en tu Path (`sudo apt-get install nmap gobuster sqlmap curl`) 
