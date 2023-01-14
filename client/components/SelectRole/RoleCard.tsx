import Image from "next/image"

const RoleCard = ({ role, img, name, setRole }: CardRoleProps) => {
    return (
        <div
            onClick={() => setRole(name)}
            className={`flex flex-col p-4 text-center bg-gray-800 rounded-md  cursor-pointer  w-max gap-y-6 transition-all border-4 shadow-black shadow-xl
             ${role == name ? "border-dPri scale-105 " : " border-gray-800"}`}
        >
            {/*   Img   */}
            <div className="w-[20vw] overflow-hidden rounded-md">
                <Image
                    src={img}
                    alt={name + "_img"}
                    className="w-full h-full transition-all rounded-md hover:scale-110"
                />
            </div>
            {/*   Role   */}
            <h1 className="capitalize">{name}</h1>
        </div>
    )
}

export default RoleCard
