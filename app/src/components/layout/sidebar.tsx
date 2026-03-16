import * as React from "react"
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Users,
  UserCog,
  Users2,
  Shield,
  GraduationCap,
  CreditCard,
  Building,
  Tag,
  HelpCircle,
  BookOpen,
  Activity,
} from "lucide-react"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      }`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="flex-1 text-left">{label}</span>
    </button>
  )
}

interface SidebarGroupProps {
  label: string
  children: React.ReactNode
}

function SidebarGroup({ label, children }: SidebarGroupProps) {
  return (
    <div className="mb-4">
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}

interface SidebarProps {
  collapsed?: boolean
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <aside
      data-node-id="1-10654"
      data-name="Super Admin Sidebar"
      className={`flex flex-col border-r border-border bg-card text-card-foreground ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {!collapsed && (
          <>
            <SidebarGroup label="Main">
              <SidebarItem icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" />
            </SidebarGroup>
            <SidebarGroup label="Administration">
              <SidebarItem
                icon={<Building2 className="h-4 w-4" />}
                label="Corporation Directory"
                active
              />
              <SidebarItem icon={<MapPin className="h-4 w-4" />} label="Company Directory" />
            </SidebarGroup>
            <SidebarGroup label="Users & Access">
              <SidebarItem icon={<Users className="h-4 w-4" />} label="User Directory" />
              <SidebarItem icon={<UserCog className="h-4 w-4" />} label="Company Admins" />
              <SidebarItem icon={<Users2 className="h-4 w-4" />} label="Team Leads" />
              <SidebarItem icon={<Shield className="h-4 w-4" />} label="Roles & Permissions" />
              <SidebarItem icon={<GraduationCap className="h-4 w-4" />} label="Coaches" />
            </SidebarGroup>
            <SidebarGroup label="Finance">
              <SidebarItem icon={<CreditCard className="h-4 w-4" />} label="Billing Overview" />
              <SidebarItem icon={<Building className="h-4 w-4" />} label="Global Billing Settings" />
              <SidebarItem icon={<Tag className="h-4 w-4" />} label="Promo Code Management" />
            </SidebarGroup>
            <SidebarGroup label="Assessments">
              <SidebarItem icon={<HelpCircle className="h-4 w-4" />} label="Question Bank" />
            </SidebarGroup>
            <SidebarGroup label="BSPU">
              <SidebarItem icon={<BookOpen className="h-4 w-4" />} label="Learning Library" />
            </SidebarGroup>
            <SidebarGroup label="System">
              <SidebarItem icon={<Activity className="h-4 w-4" />} label="System Health" />
            </SidebarGroup>
          </>
        )}
      </nav>
    </aside>
  )
}
