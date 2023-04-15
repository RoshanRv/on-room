import { LinkButton } from "@components/Button/Button"
import Image from "next/image"

const Section = ({ title, subtitle, imageSrc, reverse = false }: any) => {
    const image = (
        <div
            className={`relative w-full md:w-5/12 lg:w-4/12 h-80 border-2 border-dPri rounded-lg overflow-hidden  ${
                reverse ? "order-1" : "order-2"
            }`}
        >
            <Image
                src={imageSrc}
                alt={title}
                fill
                className="hover:scale-110 bg-cover object-cover w-full h-full transition-all"
            />
        </div>
    )

    const content = (
        <div
            className={`flex flex-col items-center md:items-start w-full md:w-1/2 ${
                reverse ? "order-2 md:pl-10" : "order-1 md:pr-10"
            }`}
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dPri ">
                {title}
            </h2>
            <p className="text-lg mb-8 text-gray-800 dark:text-gray-200 ">
                {subtitle}
            </p>
            <LinkButton variant={"primary"} link={"signup"}>
                <h1>Get Started</h1>
            </LinkButton>
        </div>
    )

    return (
        <section className="flex flex-col md:flex-row items-around justify-around py-12  gap-y-6 px-20">
            {reverse ? content : image}
            {reverse ? image : content}
        </section>
    )
}

export default Section
