import { omit } from "lodash"

const omitEmptyValues = <T extends object>(data: T) => {
    // const test = { title: "sdas", desc: "  ", img: "      " }

    const arr = Object.entries(data)
    const empty = [""]
    arr.forEach((data) => {
        if (data[1].trim().length === 0) {
            empty.push(data[0])
        }
    })

    return omit(data, empty)
}

export default omitEmptyValues
