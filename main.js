import { select, Separator } from '@inquirer/prompts'
import 'zx/globals'

import { handleNmap } from './nmap/index.js'
import { handleGobuster } from './gobuster/index.js'
import { handleSqlmap } from './sqlmap/index.js'
import { handleCurl } from './curl/index.js'

const TOOLS = [
    { name: 'nmap', value: 'nmap', binary: 'nmap', handler: handleNmap },
    { name: 'gobuster', value: 'gobuster', binary: 'gobuster', handler: handleGobuster },
    { name: 'sqlmap', value: 'sqlmap', binary: 'sqlmap', handler: handleSqlmap },
    { name: 'curl', value: 'curl', binary: 'curl', handler: handleCurl },
]

async function isToolInstalled(binaryName) {
    try {
        await $`which ${binaryName}`.quiet()
        return true
    } catch {
        return false
    }
}

async function mainMenu() {
    try {
        const choices = [
            ...TOOLS.map(t => ({ name: t.name, value: t.value })),
            new Separator(),
            { name: '✖ Salir', value: 'exit' },
        ]

        const toolId = await select({
            message: 'Que herramienta queres usar?',
            choices,
        })

        if (toolId === 'exit') {
            console.log('Hasta luego!')
            process.exit(0)
        }

        const selectedTool = TOOLS.find(t => t.value === toolId)

        if (selectedTool) {
            const installed = await isToolInstalled(selectedTool.binary)

            if (!installed) {
                console.log(`\n❌ Error: La herramienta '${selectedTool.binary}' no está instalada o no se encuentra en tu PATH.`)
                console.log(`Por favor, instálala antes de usar esta opción.\n`)
            } else {
                await selectedTool.handler()
            }
        }

        // Siempre volver al menu principal
        return mainMenu()
    } catch (error) {
        if (error.name === 'ExitPromptError') {
            console.log('\n\nSaliendo de la aplicación. ¡Hasta luego!')
            process.exit(0)
        } else {
            console.error('\nError inesperado:', error)
            process.exit(1)
        }
    }
}

mainMenu()
