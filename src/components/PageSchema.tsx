"use client"

import dynamic from "next/dynamic"
import Navbar from "./Navbar"

// make sure we do not render the background with SSR
const BackgroundNoSSR = dynamic(
    () => import("@/components/Background"),
    { ssr: false }
)

const PageSchema = (props: React.PropsWithChildren) => {

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center select-none">
            <BackgroundNoSSR />
            <Navbar />
            <div className="pt-20 h-full w-full flex flex-col items-center justify-center text-white z-0">
                {props.children}
            </div>
        </div>
    )
}

export default PageSchema