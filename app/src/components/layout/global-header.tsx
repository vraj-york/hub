import { Moon, Bell, FileText } from "lucide-react"

export function GlobalHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-4">
        {/* Espra logo placeholder - multi-colored geometric design */}
        <div className="flex h-8 w-8 items-center justify-center rounded">
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8"
            aria-hidden
          >
            <rect width="16" height="16" fill="#22c55e" />
            <rect x="16" width="16" height="16" fill="#ef4444" />
            <rect y="16" width="16" height="16" fill="#3b82f6" />
            <rect x="16" y="16" width="16" height="16" fill="#eab308" />
          </svg>
        </div>
        <span className="text-sm font-medium text-foreground">Espra</span>
        <span className="text-sm text-muted-foreground">
          powered by BSPBlueprint
        </span>
        <div className="h-6 w-px bg-border" aria-hidden />
        <button
          type="button"
          className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Documents"
        >
          <FileText className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Toggle dark mode"
        >
          <Moon className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
          aria-hidden
        >
          <span className="text-xs font-medium text-white">U</span>
        </div>
      </div>
    </header>
  )
}
