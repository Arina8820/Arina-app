import type { FC, HtmlHTMLAttributes } from "react"

const Header:FC<HtmlHTMLAttributes<HTMLDivElement>> = function Header({children, ...props}) {
    return <header className="bg-blue-500 py-5 sticky top-0 text-white">
        <div className="container mx-auto">
            {children}
        </div>
    </header>
}

export default Header