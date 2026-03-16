import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "outline-destructive"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "border border-border bg-background hover:bg-muted",
      ghost: "hover:bg-muted",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      "outline-destructive":
        "border border-destructive bg-background text-destructive hover:bg-destructive/5",
    }
    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-sm",
      lg: "h-10 rounded-md px-8",
    }
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
