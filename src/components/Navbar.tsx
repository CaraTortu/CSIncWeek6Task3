"use client"

import NavbarLink from "./NavbarLink"

const Navbar = () => {
    return (
        <div className="fixed top-0 w-full flex justify-center items-center h-16 shadow-xl gap-12 backdrop-blur-sm z-20">
            <div className="absolute top-4 left-20 text-xl m-auto">
                <NavbarLink to="/" text="JavierIE" />
            </div>
            <NavbarLink to="/skills" text="SKILLS" />
            <NavbarLink to="/projects" text="PROJECTS" />
            <NavbarLink to="/education" text="EDUCATION" />
        </div>
    )
}

export default Navbar