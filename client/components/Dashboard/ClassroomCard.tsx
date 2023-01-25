import { classroomSchemaInput } from "@schema/dashboard.schema"
import React from "react"

interface ClassroomDataProp extends classroomSchemaInput {
    id: string
    date: string
    teacher: TeacherProps
    teacherId: string
}
interface ClassroomCardProp {
    classroomData: ClassroomDataProp
}

const ClassroomCard = ({ classroomData }: ClassroomCardProp) => {
    return (
        <div className="flex flex-col p-2 transition-all bg-gray-200 border-2 rounded-md shadow-lg cursor-pointer dark:bg-gray-800 dark:shadow-xl md:p-4 gap-y-6 md:border-4 shadow-gray-400 dark:shadow-black border-dPri/70">
            <div className="overflow-hidden rounded-md ">
                <img
                    src={classroomData.img}
                    alt={"classroom_img"}
                    className="transition-all rounded-md hover:scale-110"
                />
            </div>
            <div className="pt-2 text-gray-700 border-t dark:text-gray-300 border-dPri">
                <h2 className="text-xl font-semibold text-center md:text-2xl lg:text-3xl text-dPri">
                    {classroomData.title}
                </h2>
                <h4 className="mb-2 text-right">{`- ${classroomData.teacher?.name}`}</h4>
                <p className="">{classroomData.description}</p>
            </div>
        </div>
    )
}

export default ClassroomCard
