const checkAnnouncementView = (
    studentId: string | undefined,
    viewedUsers: StudentProps[]
) => {
    return viewedUsers.find((users) => users.id === studentId) ? true : false
}

export default checkAnnouncementView
