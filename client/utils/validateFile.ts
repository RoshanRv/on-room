const validTypes = ["pdf", "image"]

const validateFile = (files: FileProps[]) => {
    return files.filter((file) => {
        for (let i of validTypes) {
            if (file.type.includes(i)) return true
        }
        return false
    })
}

export default validateFile
