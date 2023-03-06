interface myObj {
    id: string
}

const isPresent = <T extends Array<myObj>>(
    array: T | undefined,
    val: string | undefined
): boolean => {
    if (array) {
        return array.some((arr) => arr.id === val)
    }
    return false
}

export default isPresent
