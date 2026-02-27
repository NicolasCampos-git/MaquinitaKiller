import { select, input, checkbox } from '@inquirer/prompts'
import 'zx/globals'
import { GOBUSTER_MODES, GOBUSTER_FLAGS, GOBUSTER_COMMON_FLAGS, GOBUSTER_FLAGS_CON_VALOR } from './constants.js'

export async function handleGobuster() {
    const mode = await select({
        message: 'Seleccione el modo de gobuster',
        choices: GOBUSTER_MODES,
    })

    if (mode === 'back') return 'back'

    const url = await input({
        message: mode === 'dns'
            ? 'Cual es el dominio a analizar? (vacío para volver)'
            : 'Cual es la URL a analizar? (vacío para volver)',
    })

    if (!url) return 'back'

    const wordlist = await input({
        message: 'Ruta al wordlist (vacío para volver)',
    })

    if (!wordlist) return 'back'

    const modeFlags = GOBUSTER_FLAGS[mode] || []
    const allFlags = [...modeFlags, ...GOBUSTER_COMMON_FLAGS]

    const selectedFlags = await checkbox({
        message: 'Seleccione las flags a utilizar',
        choices: allFlags,
    })

    const cmdArgs = [mode, mode === 'dns' ? '-d' : '-u', url, '-w', wordlist]
    const displayArgs = [...cmdArgs]

    for (const flag of selectedFlags) {
        if (GOBUSTER_FLAGS_CON_VALOR.includes(flag)) {
            const valor = await input({
                message: `Ingrese el valor para ${flag}:`,
            })
            if (valor) {
                cmdArgs.push(flag, valor)
                displayArgs.push(`${flag} ${valor}`)
            }
        } else {
            cmdArgs.push(flag)
            displayArgs.push(flag)
        }
    }

    console.log(`\n> gobuster ${displayArgs.join(' ')}\n`)

    try {
        const result = await $`gobuster ${cmdArgs}`
        console.log(result.stdout)
        if (result.stderr) console.log(result.stderr)
    } catch (e) {
        console.log(e.stdout || e.message)
    }
}
