interface myObj {
    id: string
}

const isPresent = <T extends Array<myObj>>(
    array: T | undefined,
    studId: string | undefined
): boolean => {
    if (array) {
        return array.some((arr) => arr.id === studId)
    }
    return false
}

export default isPresent
