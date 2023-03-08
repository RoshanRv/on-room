interface ResponseType {
    status: number
    data: any
    statusText: string
}

const setErrorMsg = (response: ResponseType) => {
    switch (response.status) {
        case 400:
            return "Something Is Wrong, Try Again Later"
        case 403:
            return "You're Not Authorized"
        case 404:
            return "Data Not Found"
        case 409:
            return "Invalid Input"

        default:
            return "Error Occured"
    }
}

export default setErrorMsg
