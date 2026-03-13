import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { SuperAdminSidebar } from '@/components/common/SuperAdminSidebar'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const companyBasicsData = [
  { label: 'Legal Name', value: 'New York HQ Inc.' },
  { label: 'DBA/Trade Name', value: 'NY HQ' },
  { label: 'Website URL', value: 'https://nyhq.example.com' },
  { label: 'Company Type', value: 'Enterprise' },
  { label: 'Office Type', value: 'Headquarters' },
  { label: 'Region', value: 'North America' },
  { label: 'Industry', value: 'Technology' },
  { label: 'Primary Language', value: 'English' },
  { label: 'Company Phone No.', value: '+1 (555) 123-4567' },
  { label: 'Company Address', value: '123 Main Street, New York, NY 10001' },
]

const parentCorpData = [
  { label: 'Parent Corporation Legal Name', value: 'Global Corp Inc.' },
  { label: 'Ownership Type', value: 'Wholly Owned Subsidiary' },
]

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  )
}

export function CompanyDirectoryViewDetails() {
  return (
    <div
      className="flex min-h-screen bg-background"
      data-node-id="1-11932"
      data-name="Company Directory View Details"
    >
      <SuperAdminSidebar />

      <div
        className="flex flex-1 flex-col overflow-hidden"
        data-node-id="1-11934"
        data-name="Main Wrapper"
      >
        {/* Header */}
        <header
          className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-6"
          data-node-id="1-11935"
          data-name="Header"
        >
          <Breadcrumb
            items={[
              { label: 'Company Directory', href: '#' },
              { label: 'New York HQ' },
            ]}
          />
          <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content Area */}
        <main
          className="flex-1 overflow-auto p-6"
          data-node-id="1-11936"
          data-name="Content Area"
        >
          {/* Title Section */}
          <div
            className="mb-6"
            data-node-id="1-11937"
            data-name="Title Section"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex flex-1 flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-foreground">
                    New York HQ
                  </h1>
                  <Badge variant="secondary">Assigned</Badge>
                  <Badge variant="outline">Enterprise</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Button size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Company
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div data-node-id="1-11950" data-name="Tabs">
            <Tabs defaultValue="basic-info" className="w-full">
              <TabsList className="mb-6 h-10 w-auto">
                <TabsTrigger value="basic-info">Basic Info.</TabsTrigger>
                <TabsTrigger value="key-contacts">Key Contacts</TabsTrigger>
                <TabsTrigger value="plan-seats">Plan & Seats</TabsTrigger>
                <TabsTrigger value="configuration">Configuration</TabsTrigger>
              </TabsList>

              <TabsContent value="basic-info" className="mt-0">
                {/* Cards Wrapper */}
                <div
                  className="flex flex-col gap-6"
                  data-node-id="1-11951"
                  data-name="Cards Wrapper"
                >
                  {/* Company Basics Card */}
                  <Card
                    className="w-full max-w-2xl"
                    data-node-id="1-11952"
                    data-name="Company Basics Card"
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="text-base font-semibold">
                        Company Basics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col">
                        {companyBasicsData.map((item, index) => (
                          <div key={item.label}>
                            <InfoRow label={item.label} value={item.value} />
                            {index < companyBasicsData.length - 1 && (
                              <Separator className="my-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Parent Corporation Info Card */}
                  <Card
                    className="w-full max-w-2xl"
                    data-node-id="1-11996"
                    data-name="Parent Corporation Info Card"
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="text-base font-semibold">
                        Parent Corporation Info.
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col">
                        {parentCorpData.map((item, index) => (
                          <div key={item.label}>
                            <InfoRow label={item.label} value={item.value} />
                            {index < parentCorpData.length - 1 && (
                              <Separator className="my-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="key-contacts" className="mt-0">
                <div className="py-8 text-center text-muted-foreground">
                  Key Contacts content
                </div>
              </TabsContent>

              <TabsContent value="plan-seats" className="mt-0">
                <div className="py-8 text-center text-muted-foreground">
                  Plan & Seats content
                </div>
              </TabsContent>

              <TabsContent value="configuration" className="mt-0">
                <div className="py-8 text-center text-muted-foreground">
                  Configuration content
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
