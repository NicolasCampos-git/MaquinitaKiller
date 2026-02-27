import { Separator } from '@inquirer/prompts'

export const NMAP_CHOICES = [
    new Separator('── Uso frecuente ──'),
    {
        name: '-sV',
        value: '-sV',
        description: 'Escaneo de versiones de servicios'
    },
    {
        name: '-sS',
        value: '-sS',
        description: 'Escaneo SYN de puertos TCP (requiere root)'
    },
    {
        name: '-p-',
        value: '-p-',
        description: 'Escanea todos los puertos (1-65535)'
    },
    {
        name: '-O',
        value: '-O',
        description: 'Detecta el sistema operativo (requiere root)'
    },
    new Separator('── Tipos de escaneo ──'),
    {
        name: '-sT',
        value: '-sT',
        description: 'Escaneo completo TCP connect (sin root)'
    },
    {
        name: '-sU',
        value: '-sU',
        description: 'Escaneo de puertos UDP (requiere root)'
    },
    {
        name: '-sn',
        value: '-sn',
        description: 'Ping scan, sin escaneo de puertos (descubrimiento de hosts)'
    },
    new Separator('── Output y velocidad ──'),
    {
        name: '-A',
        value: '-A',
        description: 'Escaneo agresivo (OS + versiones + scripts + traceroute)'
    },
    {
        name: '-T4',
        value: '-T4',
        description: 'Velocidad agresiva (mas rapido, mas detectable)'
    },
    {
        name: '-T2',
        value: '-T2',
        description: 'Velocidad lenta (mas sigiloso)'
    },
    {
        name: '-oN',
        value: '-oN',
        description: 'Guardar output en formato normal'
    },
    {
        name: '-oX',
        value: '-oX',
        description: 'Guardar output en formato XML'
    },
    {
        name: '-v',
        value: '-v',
        description: 'Modo verbose'
    },
]

export const NMAP_FLAGS_CON_VALOR = ['-oN', '-oX']

export const INCOMPATIBLE_FLAGS = [
    { flags: ['-sS', '-sT'], mensaje: '-sS y -sT son incompatibles (ambos son tipos de escaneo TCP, usa solo uno)' },
    { flags: ['-sS', '-sn'], mensaje: '-sS y -sn son incompatibles (-sn desactiva el escaneo de puertos)' },
    { flags: ['-sT', '-sn'], mensaje: '-sT y -sn son incompatibles (-sn desactiva el escaneo de puertos)' },
    { flags: ['-sU', '-sn'], mensaje: '-sU y -sn son incompatibles (-sn desactiva el escaneo de puertos)' },
    { flags: ['-T4', '-T2'], mensaje: '-T4 y -T2 son incompatibles (usa solo un nivel de velocidad)' },
    { flags: ['-oN', '-oX'], mensaje: '-oN y -oX son incompatibles en esta CLI (usa solo un formato de salida)' },
]
