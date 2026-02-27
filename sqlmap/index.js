import { select, input, checkbox } from '@inquirer/prompts'
import 'zx/globals'
import { SQLMAP_TARGET_TYPES, SQLMAP_FLAGS, SQLMAP_FLAGS_CON_VALOR } from './constants.js'

export async function handleSqlmap() {
    const targetType = await select({
        message: 'Seleccione el tipo de objetivo para sqlmap',
        choices: SQLMAP_TARGET_TYPES,
    })

    if (targetType === 'back') return 'back'

    let target = ''
    let targetFlag = ''

    if (targetType === 'url') {
        target = await input({
            message: 'Cual es la URL a analizar? (vacío para volver)',
        })
        if (!target) return 'back'
        targetFlag = '-u'
    } else if (targetType === 'request') {
        target = await input({
            message: 'Ruta al archivo de request (vacío para volver)',
        })
        if (!target) return 'back'
        targetFlag = '-r'
    }

    const selectedFlags = await checkbox({
        message: 'Seleccione las opciones y flags a utilizar',
        choices: SQLMAP_FLAGS,
    })

    const cmdArgs = [targetFlag, target]
    const displayArgs = [targetFlag, target]

    for (const flag of selectedFlags) {
        if (SQLMAP_FLAGS_CON_VALOR.includes(flag)) {
            const defaultVals = { '--level': '3', '--risk': '2', '--tamper': 'space2comment' }
            const descStrings = { '-D': 'nombre de la base de datos', '-T': 'nombre de la tabla', '-C': 'nombre de la columna' }
            const placeholder = defaultVals[flag] ? ` (ej: ${defaultVals[flag]})` : (descStrings[flag] ? ` (${descStrings[flag]})` : '')

            const valor = await input({
                message: `Ingrese el valor para ${flag}${placeholder}:`,
                default: defaultVals[flag] || '',
            })
            if (valor) {
                if (flag.startsWith('--')) {
                    cmdArgs.push(`${flag}=${valor}`)
                    displayArgs.push(`${flag}=${valor}`)
                } else {
                    cmdArgs.push(flag, valor)
                    displayArgs.push(`${flag} ${valor}`)
                }
            }
        } else {
            cmdArgs.push(flag)
            displayArgs.push(flag)
        }
    }

    console.log(`\n> sqlmap ${displayArgs.join(' ')}\n`)

    try {
        const result = await $`sqlmap ${cmdArgs}`
        console.log(result.stdout)
        if (result.stderr) console.log(result.stderr)
    } catch (e) {
        console.log(e.stdout || e.message)
    }
}
