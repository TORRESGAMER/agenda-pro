import * as React from "react"

const Input = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className || ''}`}
            ref={ref}
            {...props}
        />
    )
})

Input.displayName = "Input"

export { Input }
