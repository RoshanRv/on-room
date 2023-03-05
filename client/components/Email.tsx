import * as React from "react"
import { Html } from "@react-email/html"
import { Button } from "@react-email/button"
import { Tailwind } from "@react-email/tailwind"
import { Heading } from "@react-email/heading"
import { Container } from "@react-email/container"

export function Email() {
    return (
        <Html>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                brand: "#007291",
                            },
                        },
                    },
                }}
            >
                <Container className="flex flex-col gap-y-4 bg-back w-full h-full border-2 border-gray-400">
                    <Heading as="h1">On Room</Heading>
                    <Heading as="h3">Thanks For Registering !!!</Heading>
                    <Button
                        href="https://www.google.com"
                        className="bg-yellow-500 border-2 border-black px-3 py-2 font-medium leading-4 text-white rounded-md"
                    >
                        Click me
                    </Button>
                </Container>
            </Tailwind>
        </Html>
    )
}
