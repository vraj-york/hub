import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Sidebar } from "@/components/layout/sidebar"
import { GlobalHeader } from "@/components/layout/global-header"
import { MainWrapper } from "@/components/layout/main-wrapper"
import { Breadcrumb } from "@/components/common/breadcrumb"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Pencil, Search, FileText } from "lucide-react"

const COMPANIES = [
  {
    name: "Tech Ventures Digital",
    type: "Operating Company",
    region: "North America",
  },
  {
    name: "Innovation Labs",
    type: "Subsidiary",
    region: "Europe",
  },
  {
    name: "Marit Inc.",
    type: "Franchise",
    region: "United Kingdom",
  },
]

export function CorporationProfilePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("key-contacts")

  return (
    <div
      data-node-id="1-10653"
      data-name="Corporation Directory/ Corporation Profile - Overview"
      className="flex h-screen w-full flex-col bg-background"
    >
      <GlobalHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainWrapper>
          {/* Page Header */}
          <header
            data-node-id="1-10656"
            data-name="Header"
            className="flex flex-col gap-4 border-b border-border bg-card px-6 py-4"
          >
            <Breadcrumb
              items={[
                { label: "Corporation Directory", href: "#" },
                { label: "Acme Corporation" },
              ]}
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(-1)}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-xl font-semibold text-foreground">
                  Acme Corporation
                </h1>
                <Badge className="bg-primary text-primary-foreground">
                  CORP-001
                </Badge>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline-destructive" size="sm">
                  Suspend
                </Button>
                <Button variant="destructive" size="sm">
                  Close Corporation
                </Button>
              </div>
            </div>
          </header>

          {/* Tabs */}
          <div
            data-node-id="1-10671"
            data-name="Tabs"
            className="border-b border-border px-6 pt-4"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="basic-info">Basic Info.</TabsTrigger>
                <TabsTrigger value="key-contacts">Key Contacts</TabsTrigger>
                <TabsTrigger value="plan-seats">Plan & Seats</TabsTrigger>
                <TabsTrigger value="configuration">Configuration</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tab Content */}
          <div
            data-node-id="1-10672"
            data-name="Cards Wrapper"
            className="flex-1 overflow-auto p-6"
          >
            {activeTab === "basic-info" && (
              <div
                data-node-id="1-10673"
                data-name="Row 1"
                className="grid gap-6 lg:grid-cols-2"
              >
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle>Corporation Basics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-0">
                    <InfoRow label="Legal Name" value="Acme Corporation" />
                    <InfoRow label="DBA Name" value="Acme Corp" />
                    <InfoRow label="Corporate Phone No." value="+1 (555) 123-4567" />
                    <InfoRow label="Region" value="North America" />
                    <InfoRow label="Industry" value="Technology" />
                    <InfoRow label="Website URL" value="https://acme.example.com" />
                    <InfoRow
                      label="Address"
                      value="123 Main St, San Francisco, CA 94105"
                    />
                    <InfoRow label="Time Zone" value="America/Los_Angeles (PST)" />
                    <InfoRow label="Created On" value="Jan 15, 2024" last />
                  </CardContent>
                </Card>
                <div className="flex flex-col gap-6">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>Executive Sponsor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0">
                      <InfoRow label="Name" value="Jane Smith" />
                      <InfoRow label="Role" value="VP of Operations" />
                      <InfoRow label="Email" value="jane.smith@acme.example.com" />
                      <InfoRow label="Work Phone No." value="+1 (555) 987-6543" />
                      <InfoRow label="Cell Phone No." value="+1 (555) 456-7890" last />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>Key Contacts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0">
                      <InfoRow
                        label="Primary Corporate Admin"
                        value="John Doe (john.doe@acme.example.com)"
                      />
                      <InfoRow
                        label="Billing/Finance Contact"
                        value="finance@acme.example.com"
                      />
                      <InfoRow
                        label="Legal/Compliance Contact"
                        value="legal@acme.example.com"
                        last
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "key-contacts" && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Companies (3)
                </h2>
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search here..."
                    className="pl-9"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {COMPANIES.map((company) => (
                    <CompanyCard key={company.name} {...company} />
                  ))}
                </div>
              </div>
            )}

            {(activeTab === "plan-seats" || activeTab === "configuration") && (
              <div className="py-8 text-center text-muted-foreground">
                Content for {activeTab === "plan-seats" ? "Plan & Seats" : "Configuration"} tab
              </div>
            )}
          </div>
        </MainWrapper>
      </div>
    </div>
  )
}

function InfoRow({
  label,
  value,
  last = false,
}: {
  label: string
  value: string
  last?: boolean
}) {
  return (
    <div
      className={`flex flex-col gap-1 py-3 ${!last ? "border-b border-border" : ""}`}
    >
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  )
}

function CompanyCard({
  name,
  type,
  region,
}: {
  name: string
  type: string
  region: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-start gap-4 p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground">{name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {type} • {region}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
