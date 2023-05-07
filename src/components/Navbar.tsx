"use client"

import NavbarLink from "./NavbarLink"

const Navbar = () => {
    return (
        <div className="fixed top-0 w-full flex justify-center items-center h-16 shadow-xl font-mono gap-12 backdrop-blur-md z-20">
            <div className="absolute top-4 left-20 text-xl m-auto">
                <NavbarLink to="/" text="JavierIE" />
            </div>
            <NavbarLink to="/coding" text="CODING" />
            <NavbarLink to="/projects" text="PROJECTS" />
            <NavbarLink to="/ty" text="TY" />
        </div>
    )
}

export default Navbar