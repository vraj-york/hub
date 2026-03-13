import * as React from 'react'
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  UserCheck,
  Shield,
  GraduationCap,
  CreditCard,
  Settings,
  FileText,
  BookOpen,
  Activity,
  ShieldCheck,
  FileCheck,
  Wrench,
  BarChart3,
  Bell,
  Cog,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarGroupLabel } from '@/components/common/SidebarGroupLabel'
import { SidebarMenuItem } from '@/components/common/SidebarMenuItem'

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
  badge?: string | number
  isActive?: boolean
}

const sidebarGroups: { label: string; items: SidebarItem[] }[] = [
  {
    label: 'Main',
    items: [
      { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', href: '#' },
      { icon: <Building2 className="h-5 w-5" />, label: 'Corporation Directory', href: '#' },
      { icon: <Building2 className="h-5 w-5" />, label: 'Company Directory', href: '/', isActive: true },
    ],
  },
  {
    label: 'Administration',
    items: [
      { icon: <Users className="h-5 w-5" />, label: 'User Directory', href: '#' },
      { icon: <UserCog className="h-5 w-5" />, label: 'Company Admins', href: '#' },
      { icon: <UserCheck className="h-5 w-5" />, label: 'Team Leads', href: '#' },
      { icon: <Shield className="h-5 w-5" />, label: 'Roles & Permissions', href: '#' },
      { icon: <GraduationCap className="h-5 w-5" />, label: 'Coaches', href: '#' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { icon: <CreditCard className="h-5 w-5" />, label: 'Billing Overview', href: '#' },
      { icon: <Settings className="h-5 w-5" />, label: 'Global Billing Settings', href: '#' },
      { icon: <FileText className="h-5 w-5" />, label: 'Promo Code Management', href: '#' },
    ],
  },
  {
    label: 'Assessments',
    items: [
      { icon: <FileText className="h-5 w-5" />, label: 'Question Bank', href: '#' },
      { icon: <BookOpen className="h-5 w-5" />, label: 'Learning Library', href: '#' },
    ],
  },
  {
    label: 'BSPU',
    items: [],
  },
  {
    label: 'System',
    items: [
      { icon: <Activity className="h-5 w-5" />, label: 'System Health', href: '#' },
      { icon: <ShieldCheck className="h-5 w-5" />, label: 'Security Baselines', href: '#' },
      { icon: <FileCheck className="h-5 w-5" />, label: 'Audit Logs', href: '#' },
      { icon: <Wrench className="h-5 w-5" />, label: 'Maintenance', href: '#' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { icon: <BarChart3 className="h-5 w-5" />, label: 'Reports', href: '#' },
      { icon: <Bell className="h-5 w-5" />, label: 'Notifications', href: '#', badge: 1 },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { icon: <Cog className="h-5 w-5" />, label: 'Settings', href: '#' },
    ],
  },
]

export function SuperAdminSidebar() {
  return (
    <aside
      className="flex h-screen w-[280px] shrink-0 flex-col border-r border-border bg-background"
      data-node-id="1-11933"
      data-name="Super Admin Sidebar"
    >
      <div className="flex h-16 items-center border-b border-border px-6">
        <span className="text-lg font-semibold text-foreground">Launchpad</span>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 p-3">
            {sidebarGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-0.5">
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                {group.items.map((item) => (
                  <SidebarMenuItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    badge={item.badge}
                    isActive={item.isActive}
                  />
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
