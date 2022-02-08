import classNames from "classnames";
import { forwardRef } from "react"

const Section = forwardRef<HTMLElement, { 
    children: React.ReactNode,
    id: string,
    className?: string,
}>(({ children, id, className }, ref) => {
    return(
        <section ref={ref} id={id} className={classNames(
            'section pt-16 pb-8', 
            className
        )}>
            {children}
        </section>
    )
})

export default Section;