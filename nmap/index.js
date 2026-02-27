import { checkbox, input } from '@inquirer/prompts'
import 'zx/globals'
import { NMAP_CHOICES, NMAP_FLAGS_CON_VALOR } from './constants.js'
import { validateNmapFlags } from './validations.js'

async function getNmapFlags() {
    const flags = await checkbox({
        message: 'Seleccione las flags a utilizar',
        choices: NMAP_CHOICES,
    })

    const errores = validateNmapFlags(flags)

    if (errores.length > 0) {
        console.log('\n⚠ Flags incompatibles detectadas:')
        errores.forEach(e => console.log(`  - ${e}`))
        console.log('Seleccione nuevamente.\n')
        return getNmapFlags()
    }

    return flags
}

export async function handleNmap() {
    const target = await input({
        message: 'Cual es la direccion a analizar? (vacío para volver)',
    })

    if (!target) return 'back'

    const flags = await getNmapFlags()

    if (flags.length === 0) return 'back'

    const cmdArgs = []
    const displayArgs = []

    for (const flag of flags) {
        if (NMAP_FLAGS_CON_VALOR.includes(flag)) {
            const valor = await input({
                message: `Ingrese el valor para ${flag} (ej: resultado.txt):`,
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

    cmdArgs.push(target)
    displayArgs.push(target)

    console.log(`\n> nmap ${displayArgs.join(' ')}\n`)

    try {
        const result = await $`nmap ${cmdArgs}`
        console.log(result.stdout)
        if (result.stderr) console.log(result.stderr)
    } catch (e) {
        console.log(e.stdout || e.message)
    }
}
