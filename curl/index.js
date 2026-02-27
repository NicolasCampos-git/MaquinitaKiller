import { select, input, checkbox } from '@inquirer/prompts'
import 'zx/globals'
import { CURL_METHODS, CURL_FLAGS, CURL_CONTENT_TYPES, CURL_FLAGS_CON_VALOR } from './constants.js'

export async function handleCurl() {
    const method = await select({
        message: 'Seleccione el metodo HTTP',
        choices: CURL_METHODS,
    })

    if (method === 'back') return 'back'

    const url = await input({
        message: 'URL de la solicitud (vacío para volver)',
    })

    if (!url) return 'back'

    const cmdArgs = ['-X', method]
    const displayArgs = ['-X', method]

    // Headers personalizados
    const addHeaders = await select({
        message: 'Agregar headers personalizados?',
        choices: [
            { name: 'No', value: false },
            { name: 'Si', value: true },
        ],
    })

    if (addHeaders) {
        console.log('Ingrese headers en formato "Header: valor" (vacío para terminar)')
        let headerInput = await input({ message: 'Header:' })
        while (headerInput) {
            cmdArgs.push('-H', headerInput)
            displayArgs.push(`-H "${headerInput}"`)
            headerInput = await input({ message: 'Header:' })
        }
    }

    // Body para metodos que lo soportan
    const methodsWithBody = ['POST', 'PUT', 'PATCH']
    if (methodsWithBody.includes(method)) {
        const contentType = await select({
            message: 'Tipo de contenido del body',
            choices: CURL_CONTENT_TYPES,
        })

        if (contentType !== 'none') {
            let ct = contentType
            if (contentType === 'custom') {
                ct = await input({ message: 'Ingrese el Content-Type:' })
            }
            if (ct) {
                cmdArgs.push('-H', `Content-Type: ${ct}`)
                displayArgs.push(`-H "Content-Type: ${ct}"`)
            }
        }

        const body = await input({
            message: 'Body de la solicitud (vacío para omitir)',
        })
        if (body) {
            cmdArgs.push('-d', body)
            displayArgs.push(`-d '${body}'`)
        }
    }

    // Flags adicionales
    const selectedFlags = await checkbox({
        message: 'Seleccione flags adicionales',
        choices: CURL_FLAGS,
    })

    // Pedir valores para flags que lo requieren
    for (const flag of selectedFlags) {
        if (CURL_FLAGS_CON_VALOR.includes(flag)) {
            let placeholder = ''
            if (flag === '-u') placeholder = 'usuario:password'
            if (flag === '--proxy') placeholder = 'http://127.0.0.1:8080'
            if (flag === '-w') placeholder = '%{http_code}\\n'

            const valor = await input({
                message: `Valor para ${flag}:`,
                default: placeholder,
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

    cmdArgs.push(url)
    displayArgs.push(`"${url}"`)

    const cmd = `curl ${displayArgs.join(' ')}`.replace(/\s+/g, ' ').trim()

    console.log(`\n> ${cmd}\n`)

    try {
        const result = await $`curl ${cmdArgs}`
        console.log(result.stdout)
        if (result.stderr) console.log(result.stderr)
    } catch (e) {
        console.log(e.stdout || e.message)
    }
}
