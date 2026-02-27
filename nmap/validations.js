import { INCOMPATIBLE_FLAGS } from './constants.js'

export function validateNmapFlags(flags) {
    const errores = []

    for (const regla of INCOMPATIBLE_FLAGS) {
        const presentes = regla.flags.filter(f => flags.includes(f))
        if (presentes.length > 1) {
            errores.push(regla.mensaje)
        }
    }

    return errores
}
