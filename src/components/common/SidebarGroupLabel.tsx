import * as React from 'react'

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SidebarGroupLabel({ className = '', children, ...props }: SidebarGroupLabelProps) {
  return (
    <div
      className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${className}`}
      data-name="Sidebar Group Label"
      {...props}
    >
      {children}
    </div>
  )
}

export { SidebarGroupLabel }
