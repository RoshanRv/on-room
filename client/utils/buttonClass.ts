import { cva } from "class-variance-authority"

const buttonClass = cva(
    [
        " rounded-md outline-0 text-white font-semibold shadow-lg shadow-black/50 hover:scale-105 active:scale-95 transition-all",
    ],
    {
        variants: {
            variant: {
                primary: ["bg-dPri  "],
                secondary: ["border-2 border-dPri text-whit bg-black"],
            },

            width: {
                true: ["w-full"],
            },

            disabled: {
                true: ["hover:scale-100 active:scale-100 cursor-not-allowed"],
            },
            size: {
                small: ["px-8 md:py-2 py-1 text-lg md:text-xl"],
                large: ["px-10 md:py-3 py-2 text-xl md:text-2xl"],
            },
        },

        defaultVariants: {
            variant: "primary",
            disabled: false,
            size: "large",
        },

        compoundVariants: [
            {
                variant: "primary",
                disabled: true,
                className: ["bg-dPri/50  text-gray-400"],
            },
        ],
    }
)

export default buttonClass
