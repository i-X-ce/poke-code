import isDevelopment from "@/lib/util/isDevelopment"
import { ReactNode } from "react"

function DevelopmentComponent({ children }: { children: ReactNode }) {
    return (
        <>
            {isDevelopment ? children : null}
        </>
    )
}

export default DevelopmentComponent