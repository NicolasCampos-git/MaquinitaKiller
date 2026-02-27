import { Separator } from '@inquirer/prompts'
import { BACK } from '../utils/constants.js'

export const SQLMAP_TARGET_TYPES = [
    { name: 'URL única (-u)', value: 'url', description: 'Analizar una URL específica' },
    { name: 'Archivo de request (-r)', value: 'request', description: 'Analizar un archivo HTTP (ej: de Burp Suite)' },
    new Separator(),
    { name: BACK, value: 'back' },
]

export const SQLMAP_FLAGS = [
    new Separator('── Enumeración ──'),
    { name: '--dbs', value: '--dbs', description: 'Enumerar bases de datos' },
    { name: '--tables', value: '--tables', description: 'Enumerar tablas de la BD' },
    { name: '--columns', value: '--columns', description: 'Enumerar columnas de una tabla' },
    { name: '--dump', value: '--dump', description: 'Volcar datos' },
    { name: '--passwords', value: '--passwords', description: 'Enumerar hashes de contraseñas' },
    { name: '--os-shell', value: '--os-shell', description: 'Intentar obtener una shell interactiva del SO' },
    new Separator('── Filtros específicos ──'),
    { name: '-D', value: '-D', description: 'Base de datos específica a enumerar' },
    { name: '-T', value: '-T', description: 'Tabla específica a enumerar' },
    { name: '-C', value: '-C', description: 'Columna específica a enumerar' },
    new Separator('── Opciones comunes ──'),
    { name: '--batch', value: '--batch', description: 'Modo automático (no pedir confirmación)' },
    { name: '--random-agent', value: '--random-agent', description: 'Usar un User-Agent aleatorio' },
    { name: '--level', value: '--level', description: 'Nivel de pruebas (1-5)' },
    { name: '--risk', value: '--risk', description: 'Riesgo de pruebas (1-3)' },
    { name: '--tamper', value: '--tamper', description: 'Usar scripts de evasión' },
]

export const SQLMAP_FLAGS_CON_VALOR = ['-D', '-T', '-C', '--level', '--risk', '--tamper']
