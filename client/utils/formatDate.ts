export const formatDate = (date: string | undefined) => {
    return date && date.split("T")[0].split("-").reverse().join("/")
}

export const isPastDueDate = (dueDate: string | undefined) => {
    if (dueDate) {
        return new Date(dueDate.split("T")[0]) < new Date()
    }
}
