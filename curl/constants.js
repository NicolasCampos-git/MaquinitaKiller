import { Separator } from '@inquirer/prompts'
import { BACK } from '../utils/constants.js'

export const CURL_METHODS = [
    { name: 'GET', value: 'GET', description: 'Obtener recurso' },
    { name: 'POST', value: 'POST', description: 'Enviar datos para crear recurso' },
    { name: 'PUT', value: 'PUT', description: 'Actualizar recurso completo' },
    { name: 'PATCH', value: 'PATCH', description: 'Actualizar recurso parcialmente' },
    { name: 'DELETE', value: 'DELETE', description: 'Eliminar recurso' },
    { name: 'HEAD', value: 'HEAD', description: 'Solo headers, sin body' },
    { name: 'OPTIONS', value: 'OPTIONS', description: 'Opciones de comunicacion disponibles' },
    new Separator(),
    { name: BACK, value: 'back' },
]

export const CURL_FLAGS = [
    new Separator('── Uso frecuente ──'),
    { name: '-v', value: '-v', description: 'Modo verbose (muestra headers enviados/recibidos)' },
    { name: '-i', value: '-i', description: 'Incluir headers en el output' },
    { name: '-s', value: '-s', description: 'Modo silencioso (sin barra de progreso)' },
    { name: '-L', value: '-L', description: 'Seguir redirecciones' },
    { name: '-k', value: '-k', description: 'Ignorar errores de certificado SSL' },
    new Separator('── Output ──'),
    { name: '-o', value: '-o', description: 'Guardar respuesta en archivo' },
    { name: '-w', value: '-w', description: 'Formato de output personalizado' },
    new Separator('── Autenticacion ──'),
    { name: '-u', value: '-u', description: 'Usuario:password para autenticacion basica' },
    { name: '-b', value: '-b', description: 'Enviar cookies (archivo o string)' },
    { name: '-c', value: '-c', description: 'Guardar cookies en archivo' },
    new Separator('── Conexion ──'),
    { name: '--connect-timeout', value: '--connect-timeout', description: 'Timeout de conexion en segundos' },
    { name: '-m', value: '-m', description: 'Timeout maximo total en segundos' },
    { name: '--proxy', value: '--proxy', description: 'Usar proxy (ej: http://127.0.0.1:8080)' },
]

export const CURL_CONTENT_TYPES = [
    { name: 'application/json', value: 'application/json', description: 'JSON' },
    { name: 'application/x-www-form-urlencoded', value: 'application/x-www-form-urlencoded', description: 'Form URL encoded' },
    { name: 'multipart/form-data', value: 'multipart/form-data', description: 'Form multipart (archivos)' },
    { name: 'text/plain', value: 'text/plain', description: 'Texto plano' },
    { name: 'text/xml', value: 'text/xml', description: 'XML' },
    { name: 'Personalizado', value: 'custom', description: 'Ingresar manualmente' },
    new Separator(),
    { name: 'Sin Content-Type', value: 'none', description: 'No enviar header Content-Type' },
]

export const CURL_FLAGS_CON_VALOR = ['-o', '-w', '-u', '-b', '-c', '--connect-timeout', '-m', '--proxy']
