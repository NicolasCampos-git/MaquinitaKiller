import { Separator } from '@inquirer/prompts'
import { BACK } from '../utils/constants.js'

export const GOBUSTER_MODES = [
    { name: 'dir', value: 'dir', description: 'Fuerza bruta de directorios y archivos' },
    { name: 'dns', value: 'dns', description: 'Fuerza bruta de subdominios DNS' },
    { name: 'vhost', value: 'vhost', description: 'Fuerza bruta de virtual hosts' },
    { name: 'fuzz', value: 'fuzz', description: 'Fuzzing con palabra clave FUZZ' },
    new Separator(),
    { name: BACK, value: 'back' },
]

export const GOBUSTER_FLAGS = {
    dir: [
        { name: '-x', value: '-x', description: 'Extensiones a buscar (ej: php,html,txt)' },
        { name: '-s', value: '-s', description: 'Codigos de estado a considerar validos' },
        { name: '-r', value: '-r', description: 'Seguir redirecciones' },
        { name: '-k', value: '-k', description: 'Ignorar errores de certificado SSL' },
        { name: '--no-error', value: '--no-error', description: 'No mostrar errores' },
        { name: '-e', value: '-e', description: 'Mostrar URL completa en resultados' },
    ],
    dns: [
        { name: '-i', value: '-i', description: 'Mostrar direcciones IP' },
        { name: '--wildcard', value: '--wildcard', description: 'Forzar procesamiento con wildcard' },
    ],
    vhost: [
        { name: '-k', value: '-k', description: 'Ignorar errores de certificado SSL' },
        { name: '--append-domain', value: '--append-domain', description: 'Agregar dominio base a cada intento' },
    ],
    fuzz: [
        { name: '-k', value: '-k', description: 'Ignorar errores de certificado SSL' },
        { name: '-b', value: '-b', description: 'Codigos de estado a excluir' },
    ],
}

export const GOBUSTER_COMMON_FLAGS = [
    { name: '-t', value: '-t', description: 'Cantidad de hilos concurrentes (default: 10)' },
    { name: '-o', value: '-o', description: 'Guardar resultados en un archivo' },
    { name: '-q', value: '-q', description: 'Modo silencioso (menos output)' },
    { name: '-v', value: '-v', description: 'Modo verbose (mas output)' },
]

export const GOBUSTER_FLAGS_CON_VALOR = ['-x', '-s', '-t', '-o', '-b']
