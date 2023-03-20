import * as React from "react"
import { Html } from "@react-email/html"
import { Button } from "@react-email/button"
import { Heading } from "@react-email/heading"
import { Container } from "@react-email/container"
import { Body } from "@react-email/body"
import { Hr } from "@react-email/hr"
import { Preview } from "@react-email/preview"
import { Text } from "@react-email/text"

interface Props {
    name: string
    user: string | undefined
    classroom: string | undefined
}

export function Email({ name, user, classroom }: Props) {
    return (
        <Html>
            <Preview>{`Invitation For ${classroom} Classroom - OnRoom`}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading as="h1">OnRoom</Heading>
                    <Hr style={hr}></Hr>
                    <Heading as="h3">{`Hii ${name}, You Are Invited To ${classroom} Classroom By ${user}`}</Heading>
                    <Text>Click The Button Below To Join The Classroom</Text>
                    <Button href="https://www.google.com" style={btn}>
                        Join Classroom
                    </Button>
                </Container>
            </Body>
        </Html>
    )
}

const dPri = "#eab308"

const main: React.CSSProperties = {
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
}

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    backgroundColor: "#ffffff",
    border: `1px solid #e1e1e1`,
    borderRadius: "5px",
    boxShadow: "1px 5px 10px rgba(20,50,70,.4)",
    margin: "0 auto",
    padding: "30px",
    alignItems: "center",
    justifyContent: "center",
}

const btn: React.CSSProperties = {
    backgroundColor: dPri,
    borderRadius: ".25rem",
    color: "white",
    border: "2px soild black",
    padding: "12px  25px",
}

const hr = {
    borderColor: dPri,
    margin: "20px 0",
}
