import { LinkButton } from "@components/Button/Button"
import Link from "next/link"
import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from "react-icons/fa"

const Footer = () => {
    return (
        <footer
            className={`bg-white dark:bg-black p-12 pb-4 border-t-2 border-dPri`}
        >
            <div className="flex justify-around items-center">
                <Link
                    href="/"
                    className={`text-black dark:text-white font-bold hover:text-dPri dark:hover:text-dPri transition-colors duration-200 text-5xl`}
                >
                    OnRoom
                </Link>
                <div className="flex justify-center md:justify-start gap-x-10">
                    <LinkButton
                        size={"small"}
                        variant={"primary"}
                        link={"/signup"}
                    >
                        <h1>Sign Up</h1>
                    </LinkButton>
                    <LinkButton
                        size={"small"}
                        variant={"secondary"}
                        link={"/signin"}
                    >
                        <h1>Sign In</h1>
                    </LinkButton>
                </div>
            </div>
            {/*      Name and Social Links    */}
            <div className=" text-gray-500 dark:text-gray-300    text-md  p-2 md:flex items-center justify-around text-center mt-8">
                {" "}
                <h1 className="text-">
                    Made With&nbsp;{" "}
                    <FaHeart className="text-red-500 beat inline-block text-md beat -z-10" />{" "}
                    &#38; &#129504; &nbsp; By Roshan Kumar{" "}
                </h1>
                <h1>
                    Reach Me On{" "}
                    <a
                        href="https://twitter.com/RoshanK18328680"
                        target="_blank"
                    >
                        <FaTwitter className="text-sky-400 inline-block  text-xl mx-1" />
                    </a>{" "}
                    <a href="https://github.com/RoshanRv" target="_blank">
                        <FaGithub className="text-xl inline-block  mx-1 bg-white text-black rounded-full " />
                    </a>{" "}
                    <a
                        href="https://www.linkedin.com/in/roshan-kumar-5a5020220/"
                        target="_blank"
                    >
                        {" "}
                        <FaLinkedin className="text-xl inline-block mx-1 text-blue-700 bg-white " />
                    </a>
                </h1>
            </div>
        </footer>
    )
}

export default Footer
