import React from "react"

interface ClassroomCardProp {
    img: string
    title: string
    teacher: string
    description: string
}

const ClassroomCard = ({
    img,
    teacher,
    title,
    description,
}: ClassroomCardProp) => {
    return (
        <div className="flex flex-col p-2 transition-all bg-gray-200 border-2 rounded-md shadow-lg cursor-pointer dark:bg-gray-800 dark:shadow-xl md:p-4 gap-y-6 md:border-4 shadow-gray-400 dark:shadow-black border-dPri/70">
            <div className="overflow-hidden rounded-md ">
                <img
                    src={img}
                    alt={"classroom_img"}
                    className="transition-all rounded-md hover:scale-110"
                />
            </div>
            <div className="pt-2 text-gray-700 border-t dark:text-gray-300 border-dPri">
                <h2 className="text-xl font-semibold text-center md:text-2xl lg:text-3xl text-dPri">
                    {title}
                </h2>
                <h4 className="mb-2 text-right">{`- ${teacher}`}</h4>
                <p className="">{description}</p>
            </div>
        </div>
    )
}

export default ClassroomCard
