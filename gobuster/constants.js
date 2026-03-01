import { Separator } from '@inquirer/prompts'
import { BACK } from '../utils/constants.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

const wlDir = path.join(__dirname, 'wordlists')

export const GOBUSTER_WORDLISTS = {
    dir: [
        { name: 'common.txt', value: path.join(wlDir, 'dir', 'common.txt'), description: 'Lista comun (~4700 entries)' },
        { name: 'directory-list-2.3-small', value: path.join(wlDir, 'dir', 'directory-list-lowercase-2.3-small.txt'), description: 'SecLists directory list small' },
        { name: 'directory-list-2.3-medium', value: path.join(wlDir, 'dir', 'directory-list-lowercase-2.3-medium.txt'), description: 'SecLists directory list medium' },
        { name: 'raft-large-directories', value: path.join(wlDir, 'dir', 'raft-large-directories-lowercase.txt'), description: 'Raft large directories' },
        { name: 'raft-large-words', value: path.join(wlDir, 'dir', 'raft-large-words-lowercase.txt'), description: 'Raft large words' },
        { name: 'quickhits.txt', value: path.join(wlDir, 'dir', 'quickhits.txt'), description: 'Rutas conocidas rapidas' },
        { name: 'big.txt', value: path.join(wlDir, 'dir', 'big.txt'), description: 'Lista grande de archivos' },
        { name: 'common-files.txt', value: path.join(wlDir, 'dir', 'common-files.txt'), description: 'Archivos comunes' },
        { name: 'starter.txt', value: path.join(wlDir, 'dir', 'starter.txt'), description: 'Lista starter para empezar' },
        { name: 'lottery-dirs.txt', value: path.join(wlDir, 'dir', 'lottery-dirs.txt'), description: 'Directorios lottery curados' },
        new Separator(),
        { name: '📂 Ruta personalizada...', value: '__custom__', description: 'Ingresar ruta absoluta o relativa' },
        new Separator(),
        { name: BACK, value: 'back' },
    ],
    dns: [
        { name: '📂 Ruta personalizada...', value: '__custom__', description: 'Ingresar ruta absoluta o relativa' },
        new Separator(),
        { name: BACK, value: 'back' },
    ],
    vhost: [
        { name: '📂 Ruta personalizada...', value: '__custom__', description: 'Ingresar ruta absoluta o relativa' },
        new Separator(),
        { name: BACK, value: 'back' },
    ],
    fuzz: [
        { name: 'Generic_SQLI.txt', value: path.join(wlDir, 'fuzz', 'Generic_SQLI.txt'), description: 'Payloads SQLi genericos' },
        { name: 'xss-payload-list.txt', value: path.join(wlDir, 'fuzz', 'xss-payload-list.txt'), description: 'Payloads XSS' },
        { name: 'xxe-payload-list.txt', value: path.join(wlDir, 'fuzz', 'xxe-payload-list.txt'), description: 'Payloads XXE' },
        { name: 'linux_lfi.txt', value: path.join(wlDir, 'fuzz', 'linux_lfi.txt'), description: 'LFI Linux paths' },
        { name: 'win_lfi.txt', value: path.join(wlDir, 'fuzz', 'win_lfi.txt'), description: 'LFI Windows paths' },
        { name: 'linux-cmd-injection.txt', value: path.join(wlDir, 'fuzz', 'linux-cmd-injection.txt'), description: 'Command injection Linux' },
        { name: 'windows-cmd-injection.txt', value: path.join(wlDir, 'fuzz', 'windows-cmd-injection.txt'), description: 'Command injection Windows' },
        { name: 'open-redirect.txt', value: path.join(wlDir, 'fuzz', 'open-redirect.txt'), description: 'Open redirect payloads' },
        { name: 'naughtystrings.txt', value: path.join(wlDir, 'fuzz', 'naughtystrings.txt'), description: 'Strings problematicos para fuzzing' },
        { name: 'params.txt', value: path.join(wlDir, 'fuzz', 'params.txt'), description: 'Parametros comunes' },
        { name: 'keywords.txt', value: path.join(wlDir, 'fuzz', 'keywords.txt'), description: 'Keywords para fuzzing' },
        new Separator(),
        { name: '📂 Ruta personalizada...', value: '__custom__', description: 'Ingresar ruta absoluta o relativa' },
        new Separator(),
        { name: BACK, value: 'back' },
    ],
}
