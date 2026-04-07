import { Calendar } from "lucide-react"
import { Card, CardHeader } from "@/components/ui/card"

/**
 * Static preview shell matching iframe preview /iframe-preview/8004/ (branding column).
 */
export function MeetingTrackerIframePreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <Calendar className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold">TEST</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Comprehensive Meeting Tracking & Management
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Track meetings, manage action items, and collaborate seamlessly.
            </p>
          </div>
        </div>
        <Card className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-sm border-2">
          <CardHeader className="text-center">
            <h4 className="text-2xl font-medium">Welcome TEST</h4>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
