const validTypes = ["pdf", "image"]

const validateFile = (files: File[], attachments: FileProps[]) => {
    console.log({ files, attachments })

    return files.filter((file) => {
        for (let i of validTypes) {
            if (file.type.includes(i)) {
                if (
                    attachments.find(
                        (assignment) => assignment.filename === file.name
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
