const validTypes = ["pdf", "image"]

const validateFile = (files: FileProps[], attachments: FileProps[]) => {
    return files.filter((file) => {
        for (let i of validTypes) {
            if (file.type.includes(i)) {
                if (
                    attachments.find(
                        (assignment) => assignment.name === file.name
                    )
                )
                    return false
                return true
            }
        }
        return false
    })
}

export default validateFile
