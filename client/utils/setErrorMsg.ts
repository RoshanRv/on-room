interface ResponseType {
    status: number
    data: any
    statusText: string
}

const setErrorMsg = (response: ResponseType) => {
    switch (response.status) {
        case 400:
            return typeof response.data === "string"
                ? response.data
                : "Please, Try Again Later"
        case 403:
            return "You're Not Authorized"
        case 404:
            return "Data Not Found"
        case 409:
            return Array.isArray(response.data)
                ? response.data[0].message
                : typeof response.data === "object"
                ? response.data[0].message
                : "Invalid Input"

        default:
            return typeof response.data === "string"
                ? response.data
                : "Error Occured"
    }
}

export default setErrorMsg
