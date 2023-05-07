"use client"

import Link from "next/link";
import { useRef } from "react"

const NavbarLink = (input: { to: string, text: string }) => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    const mouseOver = () => {
        if (!textRef.current) { return }

        let iteration = 0
        let interval: ReturnType<typeof setInterval> | undefined;
        
        // Make sure to cleanup before next iteration
        clearInterval(interval)

        // Set red colour
        if (!textRef.current.classList.contains("text-red-500")) {
            textRef.current.classList.add("text-red-500")
        }

        // Animate text
        interval = setInterval(() => {
            if (!textRef.current) { return }

            textRef.current.innerText = textRef.current.innerText
                .split("")
                .map((_c, i) => {
                    if (i < iteration) {
                        return input.text[i]
                    }

                    return letters[Math.floor(Math.random() * letters.length)]
                }).join("")

            if (iteration >= input.text.length) {
                clearInterval(interval)

                // Remove red colour
                if (textRef.current.classList.contains("text-red-500")) {
                    textRef.current.classList.remove("text-red-500")
                }
            }

            iteration += 1/4
        }, 30)
    }

    return (
        <Link href={input.to} onMouseOver={mouseOver}>
            <p ref={textRef} className="duration-500">{input.text}</p>
        </Link>
    )
}

export default NavbarLink