# MaquinitaKiller

<p align="center">
  <img src="./banner.png" alt="MaquinitaKiller Logo" width="300">
</p>

CLI interactiva para hacking ético. Guía la ejecución de herramientas de reconocimiento, fuzzing y explotación, explicando cada flag seleccionada y lanzando los comandos de forma segura mediante `zx`.

Herramientas integradas: **nmap**, **gobuster**, **curl**, **sqlmap**.

---

## Estructura del Proyecto

```txt
.
├── main.js                  # Punto de entrada y router principal.
├── package.json             # Dependencias (zx, @inquirer/prompts).
├── utils/
│   └── constants.js         # Constantes globales.
│
├── nmap/
│   ├── constants.js         # Flags y menús de nmap.
│   ├── validations.js       # Reglas de incompatibilidad de flags.
│   └── index.js             # Lógica e integración con zx.
│
├── gobuster/
│   ├── constants.js
│   └── index.js
|
├── sqlmap/
│   ├── constants.js
│   └── index.js
|
└── curl/
    ├── constants.js
    └── index.js
```

### `main.js`

Despliega el menú principal y enruta a la herramienta seleccionada.

- **`TOOLS`**: Array con la definición de cada integración (`name`, `value`, `binary`, `handler`).
- **Validación de PATH**: Verifica con `which` que el binario esté instalado antes de ejecutar. Si no existe, informa al usuario y aborta.

---

## Agregar una herramienta nueva

Ejemplo con **`ffuf`**:

1. **Crear el directorio `./ffuf/`** con `constants.js` e `index.js`.

2. **Definir flags en `constants.js`**:
   ```javascript
   export const FFUF_FLAGS = [
     { name: '-H', value: '-H', description: 'Header personalizado.' },
     { name: '-w', value: '-w', description: 'Wordlist.' }
   ];
   export const FFUF_FLAGS_CON_VALOR = ['-H', '-w'];
   ```

3. **Implementar el handler en `index.js`**:
   ```javascript
   import { input, checkbox } from '@inquirer/prompts';
   import 'zx/globals';

   export async function handleFfuf() {
       const cmdArgs = ['-w', wordlist, '-u', url];
       try {
           const result = await $`ffuf ${cmdArgs}`;
           console.log(result.stdout);
       } catch (error) {
           console.error('Error en FFUF:', error);
       }
   }
   ```

4. **Registrar en `main.js`**:
   ```javascript
   import { handleFfuf } from './ffuf/index.js';

   const TOOLS = [
       // ...
       { name: 'ffuf', value: 'ffuf', binary: 'ffuf', handler: handleFfuf }
   ];
   ```

---

## Requisitos

- **Node.js 16+** y npm.
- Herramientas instaladas en el PATH: `sudo apt-get install nmap gobuster sqlmap curl`
