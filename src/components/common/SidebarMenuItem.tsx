import * as React from 'react'

interface SidebarMenuItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode
  label: string
  badge?: string | number
  isActive?: boolean
}

function SidebarMenuItem({
  icon,
  label,
  badge,
  isActive = false,
  className = '',
  ...props
}: SidebarMenuItemProps) {
  return (
    <a
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
      } ${className}`}
      data-name="Sidebar Menu item"
      {...props}
    >
      {icon && <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
          {badge}
        </span>
      )}
    </a>
  )
}

export { SidebarMenuItem }
