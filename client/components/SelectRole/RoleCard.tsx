import Image from "next/image"

const RoleCard = ({ role, img, name, setRole }: CardRoleProps) => {
    return (
        <div
            onClick={() => setRole(name)}
            className={`flex flex-col p-2 md:p-4 text-center dark:bg-gray-800 bg-gray-200 rounded-md  cursor-pointer  w-max gap-y-6 transition-all border-2 md:border-4 shadow-black shadow-md dark:shadow-xl
             ${
                 role == name
                     ? "border-dPri scale-105 "
                     : " dark:border-gray-800 border-gray-200"
             }`}
        >
            {/*   Img   */}
            <div className="md:w-[20vw] w-[33vw] overflow-hidden rounded-md">
                <Image
                    src={img}
                    alt={name + "_img"}
                    className="w-full h-full transition-all rounded-md hover:scale-110"
                />
            </div>
            {/*   Role   */}
            <h1 className="text-lg capitalize md:text-2xl lg:text-3xl">
                {name}
            </h1>
        </div>
    )
}

export default RoleCard
