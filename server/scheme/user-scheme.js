
const z = require("zod")

// validaciones
const Schema = z.object();
//validaciones totales, sino usar Partial
function validate(object) {
    return Schema.safeParse(object)
}