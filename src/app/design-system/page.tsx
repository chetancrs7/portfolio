import {
  ArrowRight,
  Braces,
  Cpu,
  ExternalLink,
  GitBranch,
  Layers3,
  SlidersHorizontal,
  Terminal,
} from "lucide-react";

import { AmbientGlow } from "@/components/design/ambient-glow";
import { FlagshipBorderBeam } from "@/components/design/flagship-border-beam";
import { MotionNumber } from "@/components/design/motion-number";
import { TechnicalGrid } from "@/components/design/technical-grid";
import { HybridSentimentArchitecture } from "@/components/diagrams/custom/hybrid-sentiment-architecture";
import { DiagramPanel } from "@/components/diagrams/diagram-panel";
import { MermaidDiagram } from "@/components/diagrams/mermaid-diagram";
import CodeShowcase from "@/components/mdx/code-showcase.mdx";
import { TechnicalVisual } from "@/components/sections/home/technical-visual";
import { Metric } from "@/components/shared/metric";
import { StatusBadge } from "@/components/shared/status-badge";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const metrics = [
  { value: "92ms", label: "P95 latency" },
  { value: "0.874", label: "Macro F1" },
  { value: "1.2K", label: "Req / sec" },
];

const colorTokens = [
  { name: "Background", token: "--background", className: "bg-background" },
  { name: "Surface", token: "--surface", className: "bg-surface" },
  {
    name: "Elevated",
    token: "--surface-elevated",
    className: "bg-surface-elevated",
  },
  { name: "Border", token: "--border", className: "bg-border" },
  { name: "Blue", token: "--accent-blue", className: "bg-accent-blue" },
  { name: "Cyan", token: "--accent-cyan", className: "bg-accent-cyan" },
  { name: "Violet", token: "--accent-violet", className: "bg-accent-violet" },
  {
    name: "Muted",
    token: "--muted-foreground",
    className: "bg-muted-foreground",
  },
];

export default function DesignSystemPage() {
  return (
    <div className="technical-background min-h-screen overflow-hidden">
      <section className="border-border relative isolate border-b">
        <TechnicalGrid className="opacity-45" />
        <AmbientGlow className="-top-36 left-[8%]" tone="blue" />
        <AmbientGlow className="right-[4%] -bottom-40" tone="violet" />

        <div className="container-page section-space relative">
          <div className="max-w-4xl">
            <StatusBadge>Available for opportunities</StatusBadge>
            <h1 className="type-display mt-8 max-w-4xl text-balance">
              Engineering
              <br />
              <span className="text-gradient-primary">
                Intelligent Systems.
              </span>
            </h1>
            <p className="type-body-lg text-muted-foreground mt-7 max-w-2xl">
              A visual language test for backend infrastructure, applied AI,
              distributed systems, and research-oriented engineering work.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg">
                View Work
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button size="lg" variant="secondary">
                Source
                <GitBranch data-icon="inline-end" />
              </Button>
            </div>
          </div>

          <div className="border-border mt-16 grid gap-6 border-y py-8 sm:grid-cols-3">
            {metrics.map((metric) => (
              <Metric key={metric.label} {...metric} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-space">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-eyebrow text-accent-cyan">Typography</p>
            <h2 className="type-h2 mt-3">Technical hierarchy</h2>
          </div>
          <p className="type-mono text-muted-foreground max-w-sm">
            Geist Sans for structure. Geist Mono for metrics, labels, and
            technical metadata.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-7">
            <div>
              <p className="type-eyebrow text-muted-foreground mb-3">Display</p>
              <p className="type-display">Systems Research</p>
            </div>
            <div>
              <p className="type-eyebrow text-muted-foreground mb-3">
                Heading 1
              </p>
              <p className="type-h1">Applied intelligence infrastructure</p>
            </div>
            <div>
              <p className="type-eyebrow text-muted-foreground mb-3">
                Heading 2
              </p>
              <p className="type-h2">Reliable machine learning services</p>
            </div>
          </div>
          <div className="space-y-5">
            <p className="type-h3">Heading 3: Data systems and model APIs</p>
            <p className="type-h4">Heading 4: Evaluation and observability</p>
            <p className="type-body-lg text-muted-foreground">
              Body large establishes readable lead copy with a calm technical
              tone and enough spacing for longer engineering descriptions.
            </p>
            <p className="type-body text-muted-foreground">
              Body copy remains soft and high-contrast on near-black surfaces
              without becoming stark white.
            </p>
            <p className="type-body-sm text-muted-foreground">
              Body small is reserved for secondary details, hints, and compact
              interface support text.
            </p>
            <p className="type-mono text-accent-cyan">
              MONO METADATA / VECTOR INDEX / API GATEWAY
            </p>
          </div>
        </div>
      </section>

      <Separator />

      <section className="container-page section-space">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="type-eyebrow text-accent-cyan">Color</p>
            <h2 className="type-h2 mt-3">Dark-first tokens</h2>
            <p className="type-body text-muted-foreground mt-5 max-w-md">
              The palette keeps most interface weight in black, charcoal, white,
              and cool gray, with cyan, blue, and violet used as selective
              hierarchy cues.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {colorTokens.map((color) => (
              <div
                className="border-border bg-surface/60 flex items-center gap-4 rounded-lg border p-3"
                key={color.token}
              >
                <div
                  className={`border-border-strong size-11 rounded-md border ${color.className}`}
                />
                <div>
                  <p className="text-foreground text-sm font-medium">
                    {color.name}
                  </p>
                  <p className="type-mono text-muted-foreground">
                    {color.token}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-[var(--section-spacing)]">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Standard surface</CardTitle>
              <CardDescription>
                Quiet border, dark transparent fill, compact rhythm.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="type-body-sm text-muted-foreground">
                Used for technical notes, small blocks of metadata, and neutral
                content groups.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardHeader>
              <CardTitle>Interactive surface</CardTitle>
              <CardDescription>
                Slight border lift for clickable project-like previews.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Badge variant="blue">Backend</Badge>
                <Badge variant="violet">AI / ML</Badge>
              </div>
            </CardContent>
          </Card>

          <Card variant="featured">
            <CardHeader>
              <CardTitle>Featured surface</CardTitle>
              <CardDescription>
                Faint accent wash without becoming a glowing panel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Metric label="Eval score" value="99.2" />
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="container-page section-space">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-eyebrow text-accent-cyan">Diagrams</p>
            <h2 className="type-h2 mt-3">Technical diagrams</h2>
          </div>
          <p className="type-mono text-muted-foreground max-w-sm">
            Mermaid for authored flows and custom SVG for flagship architecture
            visuals.
          </p>
        </div>

        <div className="space-y-8">
          <DiagramPanel
            title="Mermaid Architecture"
            description="A dark-themed flowchart rendered only on the client."
            caption="Diagram surfaces scroll horizontally on narrow screens while preserving readable node spacing."
            expandable
            wide
          >
            <MermaidDiagram
              accessibleLabel="Architecture diagram showing an API writing to a database and publishing work to a queue consumed by workers."
              chart={`flowchart LR
  Client[Client] --> API[API Boundary]
  API --> DB[(Primary Store)]
  API --> Queue[Event Queue]
  Queue --> Worker[Worker Pool]
  Worker --> Provider[External Provider]
  Worker --> Metrics[Metrics + Logs]`}
            />
          </DiagramPanel>

          <DiagramPanel
            title="Mermaid Sequence"
            description="Sequence diagrams share the same panel, overflow, theming, and expand behavior."
            expandable
            wide
          >
            <MermaidDiagram
              accessibleLabel="Sequence diagram showing an API publishing a job, a worker processing it, and storage recording completion."
              chart={`sequenceDiagram
  participant Client
  participant API
  participant Queue
  participant Worker
  participant Store

  Client->>API: Create request
  API->>Store: Persist intent
  API->>Queue: Publish job
  Queue->>Worker: Deliver job
  Worker->>Store: Record result
  Worker-->>API: Emit completion signal`}
            />
          </DiagramPanel>

          <DiagramPanel
            title="Custom SVG Architecture"
            description="A hand-authored React SVG can carry portfolio-specific visual structure when Mermaid would be too generic."
            caption="The hybrid sentiment diagram is reusable in MDX and keeps accessible title and description text inside the SVG."
            expandable
            wide
          >
            <HybridSentimentArchitecture />
          </DiagramPanel>
        </div>
      </section>

      <Separator />

      <section className="container-page section-space">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-eyebrow text-accent-cyan">Code</p>
            <h2 className="type-h2 mt-3">Technical code blocks</h2>
          </div>
          <p className="type-mono text-muted-foreground max-w-sm">
            Shiki-rendered MDX fences with filenames, language labels, line
            emphasis, and copy controls.
          </p>
        </div>
        <div className="max-w-4xl">
          <CodeShowcase />
        </div>
      </section>

      <Separator />

      <section className="container-page section-space">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-eyebrow text-accent-cyan">Motion</p>
            <h2 className="type-h2 mt-3">Measured emphasis</h2>
          </div>
          <p className="type-mono text-muted-foreground max-w-sm">
            Short reveals, slow loops, and reduced-motion fallbacks.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="relative isolate min-h-44 overflow-hidden">
              <CardHeader>
                <CardTitle>Gradient Accent</CardTitle>
                <CardDescription>
                  Hero-scale emphasis with a slow cyan-to-violet pass.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="type-h3">
                  <AnimatedGradientText
                    className="motion-gradient-text"
                    colorFrom="var(--accent-cyan)"
                    colorTo="var(--accent-violet)"
                    speed={1.15}
                  >
                    Intelligent Software.
                  </AnimatedGradientText>
                </p>
              </CardContent>
            </Card>

            <Card className="relative isolate min-h-44 overflow-hidden">
              <FlagshipBorderBeam />
              <CardHeader>
                <CardTitle>Flagship Border</CardTitle>
                <CardDescription>
                  One highlighted project gets the animated edge.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="status">Featured surface</Badge>
              </CardContent>
            </Card>

            <Card className="min-h-44">
              <CardHeader>
                <CardTitle>Number Ticker</CardTitle>
                <CardDescription>
                  Genuine metrics may count in once on view.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-mono text-3xl font-semibold">
                  <MotionNumber ariaLabel="3 core areas" value={3} />
                </p>
              </CardContent>
            </Card>

            <Card className="relative min-h-44 overflow-hidden">
              <TechnicalGrid className="opacity-35" />
              <CardHeader className="relative">
                <CardTitle>Status Pulse</CardTitle>
                <CardDescription>
                  Availability state keeps the only dot pulse.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <StatusBadge>Available</StatusBadge>
              </CardContent>
            </Card>
          </div>

          <div className="relative hidden min-h-[28rem] lg:block">
            <TechnicalVisual />
          </div>
        </div>
      </section>

      <Separator />

      <section className="container-page section-space">
        <div className="mb-10">
          <p className="type-eyebrow text-accent-cyan">Components</p>
          <h2 className="type-h2 mt-3">Controls and states</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <p className="type-label text-muted-foreground mb-3">Buttons</p>
              <div className="flex flex-wrap gap-3">
                <Button>
                  Primary
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <Button variant="secondary">
                  Secondary
                  <ExternalLink data-icon="inline-end" />
                </Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <p className="type-label text-muted-foreground mb-3">Badges</p>
              <div className="flex flex-wrap gap-2">
                <StatusBadge>Available</StatusBadge>
                <Badge>Project</Badge>
                <Badge variant="blue">Backend</Badge>
                <Badge variant="violet">Research</Badge>
                <Badge variant="outline">System design</Badge>
              </div>
            </div>

            <div>
              <p className="type-label text-muted-foreground mb-3">Metrics</p>
              <div className="border-border bg-surface/50 grid gap-4 rounded-xl border p-5 sm:grid-cols-3">
                <Metric label="P95 latency" value="92ms" />
                <Metric label="Macro F1" value="0.874" />
                <Metric label="Req / sec" value="1.2K" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="surface">
              <TabsList>
                <TabsTrigger value="surface">Surface</TabsTrigger>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="glow">Glow</TabsTrigger>
              </TabsList>
              <TabsContent
                className="border-border bg-surface/50 text-muted-foreground rounded-xl border p-5"
                value="surface"
              >
                Compact tab panels should read like technical controls, not
                marketing blocks.
              </TabsContent>
              <TabsContent
                className="border-border bg-background text-muted-foreground relative min-h-28 overflow-hidden rounded-xl border p-5"
                value="grid"
              >
                <TechnicalGrid className="opacity-60" />
                <span className="relative">CSS-only low-contrast grid.</span>
              </TabsContent>
              <TabsContent
                className="border-border bg-background text-muted-foreground relative min-h-28 overflow-hidden rounded-xl border p-5"
                value="glow"
              >
                <AmbientGlow
                  className="-top-36 right-6 opacity-80"
                  tone="cyan"
                />
                <span className="relative">Blurred radial accent glow.</span>
              </TabsContent>
            </Tabs>

            <div className="flex flex-wrap gap-3">
              <Tooltip>
                <TooltipTrigger render={<Button variant="outline" />}>
                  <SlidersHorizontal data-icon="inline-start" />
                  Tooltip
                </TooltipTrigger>
                <TooltipContent>Short technical hint</TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                  <Terminal data-icon="inline-start" />
                  Menu
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Systems</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Cpu />
                    Inference API
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Braces />
                    Evaluation suite
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DialogTrigger render={<Button variant="outline" />}>
                  <Layers3 data-icon="inline-start" />
                  Dialog
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Technical dialog</DialogTitle>
                    <DialogDescription>
                      A compact modal surface for future detailed actions.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger render={<Button variant="outline" />}>
                  Sheet
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>System panel</SheetTitle>
                    <SheetDescription>
                      A reserved side surface for later navigation or filters.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>

      <section className="border-border bg-background relative isolate border-t">
        <TechnicalGrid className="opacity-30" />
        <AmbientGlow className="-bottom-48 left-1/3" tone="blue" />
        <div className="container-page relative py-20">
          <div className="surface-subtle rounded-2xl p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <StatusBadge>Visual language test</StatusBadge>
                <h2 className="type-h1 mt-7 max-w-3xl text-balance">
                  Building reliable platforms for{" "}
                  <span className="text-gradient-primary">
                    applied intelligence.
                  </span>
                </h2>
                <p className="type-body-lg text-muted-foreground mt-6 max-w-2xl">
                  This composition checks the desired dark, sparse, technical
                  direction without becoming the final homepage.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button>
                    Primary CTA
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                  <Button variant="secondary">
                    Secondary CTA
                    <ExternalLink data-icon="inline-end" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {metrics.map((metric) => (
                  <Metric
                    className="border-border border-l pl-4"
                    key={`composition-${metric.label}`}
                    {...metric}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
