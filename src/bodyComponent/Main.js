import { Routers } from "./Routers"
import { BrowserRouter } from "react-router-dom"

export function Main() {
    return (
        <main>
            <BrowserRouter>
                <Routers/>
            </BrowserRouter>
        </main>
    )
}