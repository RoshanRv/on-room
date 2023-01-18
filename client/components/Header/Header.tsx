import { LinkButton } from "@components/Button/Button"
import Link from "next/link"
import React from "react"

const Header = () => {
    return (
        <header className="top-0 left-0 z-50 flex items-center justify-between w-full px-3 py-2 shadow-md bg-back md:px-4 lg:px-6 md:py-4 shadow-black/30 ">
            <div>
                <Link href={"/"}>
                    <h1 className="text-4xl font-bold text-white text-shadow-sm ">
                        On-Room
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-8">
                <LinkButton link={"signup"} size={"small"} variant={"primary"}>
                    {<h1>Sign Up</h1>}
                </LinkButton>
                <LinkButton
                    link={"signin"}
                    size={"small"}
                    variant={"secondary"}
                >
                    {<h1>Sign In</h1>}
                </LinkButton>
            </div>
        </header>
    )
}

export default Header
