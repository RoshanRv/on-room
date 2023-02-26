import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

const Modal = ({ isOn, toggleOn, children }: ModalProps) => {
    return (
        <>
            {/*    Modal Overlay   */}
            <main
                onClick={toggleOn}
                className={`fixed bg-black/70 w-full h-full  left-0 z-50 flex flex-col justify-center items-center transition-all  ${
                    isOn ? "top-0" : "hidden"
                }`}
            >
                {/*      Modal Div    */}
                <section
                    onClick={(e) => e.stopPropagation()}
                    className={`dark:bg-back bg-gray-100 rounded-lg p-4 md:p-6 shadow-lg shadow-black/80 relative transition-all duration-1000 border-4 border-dPri text-gray-300 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 ${
                        isOn ? "scale-100" : "scale-0"
                    } `}
                >
                    {/*      close btn    */}
                    <button
                        onClick={toggleOn}
                        className="absolute outline-0 -top-3 -right-3"
                    >
                        <AiOutlineClose className="p-2 text-4xl font-bold text-black rounded-full bg-dPri" />
                    </button>
                    {/*         box content      */}
                    {children}
                </section>
            </main>
        </>
    )
}

export default Modal
