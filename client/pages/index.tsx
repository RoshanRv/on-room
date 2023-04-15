import Section from "@components/Home/Section"
import type { NextPage } from "next"
import Image from "next/image"

import Head from "next/head"
import { LinkButton } from "@components/Button/Button"
import Footer from "@components/Home/Footer"

const Home: NextPage = () => {
    return (
        <>
            <Head>
                {/* <!-- HTML Meta Tags --> */}
                <title>OnRoom | Home</title>
                <meta
                    name="description"
                    content="Connecting classrooms with OnRoom"
                />

                {/* <!-- Google / Search Engine Tags --> */}
                <meta itemProp="name" content="OnRoom | Home" />
                <meta
                    itemProp="description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta itemProp="image" content="meta.png" />

                {/* <!-- Facebook Meta Tags --> */}
                <meta
                    property="og:url"
                    content="https://portfolio-roshanrv.vercel.app"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="OnRoom | Home" />
                <meta
                    property="og:description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta property="og:image" content="meta.png" />

                {/* <!-- Twitter Meta Tags --> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="OnRoom | Home" />
                <meta
                    name="twitter:description"
                    content="Connecting classrooms with OnRoom"
                />
                <meta name="twitter:image" content="meta.png" />
            </Head>
            <main className="bg-gray-100 dark:bg-back">
                {/*    Home Hero   */}
                <div className="relative flex flex-col items-center justify-center min-h-screen py-12 bg-dPri mb-20 ">
                    <div className="absolute inset-0">
                        <Image
                            className="w-full h-full object-cover"
                            src="https://jameskennedymonash.files.wordpress.com/2015/03/students-in-classroom.jpg"
                            alt="Hero background image"
                            fill
                        />
                        <div className="absolute inset-0 bg-dPri/70"></div>
                    </div>
                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            OnRoom
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Mauris euismod fringilla vestibulum. Fusce
                            tincidunt tortor sit amet urna ullamcorper, id
                            placerat nibh congue. Etiam suscipit massa in dolor
                            tincidunt sodales.
                        </p>
                        <div className="mt-8">
                            <LinkButton variant={"secondary"} link={"signup"}>
                                <h1>Get Started</h1>
                            </LinkButton>
                        </div>
                    </div>
                </div>
                <Section
                    title="Learn Anytime, Anywhere"
                    subtitle="With OnRoom, you can access your courses and lectures from anywhere, at any time. Our platform is available on desktop, tablet, and mobile devices."
                    imageSrc="https://blog.clarityenglish.com/wp-content/uploads/2022/01/CE_Blog_Jan2022_Blog4-1024x675.jpg"
                />
                <Section
                    title="Engage with Your Peers"
                    subtitle="OnRoom enables you to interact and collaborate with your classmates and instructors through our built-in messaging."
                    imageSrc="https://snacknation.com/wp-content/uploads/2020/04/Virtual-Team-Building-Activities.png"
                    reverse
                />
                <Section
                    title="Personalized Learning Experience"
                    subtitle="Our platform adapts to your learning style and progress, providing personalized recommendations and feedback to help you succeed."
                    imageSrc="https://www.21kschool.com/blog/wp-content/uploads/2022/09/5-Benefits-of-Personalized-Learning.png"
                />
            </main>
            <Footer />
        </>
    )
}

export default Home
