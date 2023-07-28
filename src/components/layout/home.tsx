import type { PropsWithChildren } from "react"

// COMPONENTS
import Navbar from "../navbar/navbar"

export default function Layout ({children}: PropsWithChildren) {
    return (
        <>
            <div className="transition ease-linear duration-200 dark:text-white h-full flex flex-col dark:bg-gray-800">
                <Navbar></Navbar>
                <main className="flex-grow bg-slate-300 dark:bg-gray-800 transition ease-linear duration-200">
                    {children}
                </main>
                <footer className="dark:bg-gray-800 transition ease-linear duration-200">
                    <h6 className="text-center">Derechos reservados</h6>
                </footer>
            </div>
        </>
    )
}