import { useState } from "react";
import {
  Button,
  InfoIcon,
  SocialButton,
  Card,
  CardHeader,
  CardTitle,
  CardKicker,
  CardContent,
  CardSectionTitle,
  CardFooter,
  CardFooterNote,
  MenuItem,
  Checkbox,
  RadioGroup,
  RadioItem,
  Switch,
  TextArea,
  TabBar,
  ButtonGroup,
  Link,
  Breadcrumb,
  Tag,
  Loader,
  Badge,
  ProgressBar,
  ProgressCircle,
  Table,
  Th,
  Td,
  Tr,
} from "./components";

export default function App() {
  const [tab, setTab] = useState("a");
  const [checked, setChecked] = useState(false);
  const [sw, setSw] = useState(false);
  const [radio, setRadio] = useState("one");

  return (
    <div style={{ paddingBottom: 48 }}>
      <section
        style={{
          padding: 24,
          maxWidth: 720,
          margin: "0 auto",
          background: "var(--ds-surface-page-light)",
        }}
      >
        <h1 style={{ marginTop: 0, fontFamily: "var(--ds-font-family-headings)" }}>
          CWPC design system (from Figma)
        </h1>
        <p style={{ color: "var(--ds-text-disabled-default)", maxWidth: 560 }}>
          Tokens and measurements are pulled from your{" "}
          <strong>Design-system_temp</strong> buttons, fields, inputs, and homepage card.
        </p>

        <h2>Button (Figma matrix)</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <Button
            tone="information"
            iconLeft={<InfoIcon />}
            iconRight={<InfoIcon />}
          >
            Information
          </Button>
          <Button tone="primary" iconLeft={<InfoIcon />} iconRight={<InfoIcon />}>
            Primary
          </Button>
          <Button tone="success" iconLeft={<InfoIcon />} iconRight={<InfoIcon />}>
            Success
          </Button>
          <Button variant="outlined" iconLeft={<InfoIcon />} iconRight={<InfoIcon />}>
            Outlined
          </Button>
          <Button variant="transparent" iconLeft={<InfoIcon />} iconRight={<InfoIcon />}>
            Transparent
          </Button>
          <Button disabled iconLeft={<InfoIcon />} iconRight={<InfoIcon />}>
            Disabled
          </Button>
        </div>

        <h2>Field pattern → TextArea</h2>
        <div style={{ maxWidth: 400 }}>
          <TextArea label="Label" placeholder="Text" hint="Hint text" rows={3} />
        </div>

        <h2>Controls</h2>
        <Checkbox checked={checked} onChange={setChecked} label="Subscribe" />
        <div style={{ marginTop: 12 }}>
          <RadioGroup name="demo" value={radio} onChange={setRadio} legend="Choose">
            <RadioItem value="one" label="Option one" />
            <RadioItem value="two" label="Option two" />
          </RadioGroup>
        </div>
        <div style={{ marginTop: 12 }}>
          <Switch checked={sw} onChange={setSw} label="Notifications" />
        </div>

        <h2>Tab bar · Breadcrumb · Link</h2>
        <TabBar
          value={tab}
          onChange={setTab}
          tabs={[
            { id: "a", label: "Overview" },
            { id: "b", label: "Scorecard" },
            { id: "c", label: "Resources" },
          ]}
        />
        <p style={{ marginTop: 8, fontSize: 14 }}>Active: {tab}</p>
        <Breadcrumb
          style={{ marginTop: 16 }}
          items={[
            { label: "Home", href: "#" },
            { label: "Resources", href: "#" },
            { label: "Current" },
          ]}
        />
        <p style={{ marginTop: 12 }}>
          <Link href="#">Information link</Link>
        </p>

        <h2>Button group · Tags · Badges · Loader · Progress</h2>
        <ButtonGroup style={{ marginBottom: 16 }}>
          <Button tone="success" iconLeft={<InfoIcon />} iconRight={<InfoIcon />}>
            Green
          </Button>
          <Button tone="primary" iconLeft={<InfoIcon />} iconRight={<InfoIcon />}>
            Orange
          </Button>
        </ButtonGroup>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <Tag>Tag</Tag>
          <Tag variant="primary">Primary</Tag>
          <Badge>New</Badge>
          <Badge variant="information">Info</Badge>
          <Loader />
          <Loader accent="primary" />
        </div>
        <div style={{ marginTop: 16, maxWidth: 360 }}>
          <ProgressBar value={40} showLabel ariaLabel="Completion" />
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
          <ProgressCircle value={65} showValue />
          <ProgressCircle value={50} tone="primary" showValue />
        </div>

        <h2>Social · Menu · Table (light)</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <SocialButton network="facebook" href="#" label="Facebook" />
          <SocialButton network="linkedin" href="#" label="LinkedIn" />
        </div>
        <div
          style={{
            border: "1px solid var(--ds-border-disabled-subtle)",
            borderRadius: 4,
            maxWidth: 240,
            padding: 4,
            marginBottom: 16,
          }}
        >
          <MenuItem>Action</MenuItem>
          <MenuItem destructive>Delete</MenuItem>
        </div>
        <Table surface="light" style={{ maxWidth: 480 }}>
          <thead>
            <Tr>
              <Th>Area</Th>
              <Th numeric>Score</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>Community A</Td>
              <Td numeric>82</Td>
            </Tr>
            <Tr>
              <Td>Community B</Td>
              <Td numeric>74</Td>
            </Tr>
          </tbody>
        </Table>
      </section>

      {/* Dark strip: homepage card + inputs (Figma) */}
      <section
        style={{
          background: "#1a1a1a",
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontFamily: "var(--ds-font-family-headings)" }}>
            Marketing card + dark UI
          </h2>
          <Card surface="marketing" style={{ maxWidth: 647 }}>
            <CardHeader>
              <CardTitle>Wildfire Innovator Showcase</CardTitle>
              <Badge variant="information">Featured</Badge>
            </CardHeader>
            <CardContent>
              <CardKicker>The Future of Wildfire Resilience Starts Here</CardKicker>
              <p style={{ margin: "24px 0 0" }}>
                Co-hosted by the Catastrophic Wildfire Prevention Consortium and Venture Starters.
              </p>
              <CardSectionTitle tone="green" style={{ marginTop: 28 }}>
                Featuring Trailblazing Ventures
              </CardSectionTitle>
              <p style={{ marginTop: 12 }}>
                Our previous Showcases received incredible responses with over 200 guests and
                6,500+ views!
              </p>
            </CardContent>
            <CardFooter>
              <ButtonGroup>
                <Button tone="success" iconLeft={<InfoIcon />} iconRight={<InfoIcon />}>
                  Apply
                </Button>
                <Button tone="primary" iconLeft={<InfoIcon />} iconRight={<InfoIcon />}>
                  Learn more
                </Button>
              </ButtonGroup>
            </CardFooter>
            <CardFooterNote question="Have questions?" actionLabel="Email us" actionHref="#" />
          </Card>

          <div style={{ marginTop: 40, maxWidth: 400 }}>
            <TextArea
              onDark
              label="Label"
              placeholder="Text"
              hint="Hint text"
              rows={3}
            />
          </div>
          <div style={{ marginTop: 24 }}>
            <Checkbox onDark checked={checked} onChange={setChecked} label="Same as above" />
          </div>
          <div style={{ marginTop: 16 }}>
            <RadioGroup name="dark" value={radio} onChange={setRadio} onDark legend="Options">
              <RadioItem value="one" label="One" />
              <RadioItem value="two" label="Two" />
            </RadioGroup>
          </div>
          <div style={{ marginTop: 16 }}>
            <Switch onDark checked={sw} onChange={setSw} label="Toggle" />
          </div>
          <div style={{ marginTop: 24 }}>
            <TabBar onDark value={tab} onChange={setTab} id="dark-tabs" tabs={[{ id: "a", label: "Tab A" }, { id: "b", label: "Tab B" }]} />
          </div>
          <div style={{ marginTop: 16 }}>
            <Breadcrumb
              onDark
              items={[
                { label: "Home", href: "#" },
                { label: "Section", href: "#" },
                { label: "Here" },
              ]}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <Link onDark href="#">
              Email us
            </Link>
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <Tag onDark>Pilot</Tag>
            <Tag onDark variant="primary">
              CWPC
            </Tag>
          </div>
          <div style={{ marginTop: 24 }}>
            <Table>
              <thead>
                <Tr>
                  <Th>Metric</Th>
                  <Th numeric>Value</Th>
                </Tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>Readiness</Td>
                  <Td numeric>82</Td>
                </Tr>
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}
