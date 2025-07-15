import * as React from "react"

const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors"
    const variants = {
        default: "bg-primary text-white hover:bg-primary-hover",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    }

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className || ''}`}
            ref={ref}
            {...props}
        />
    )
})

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button, buttonVariants }
