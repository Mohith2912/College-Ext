import React, { useState, useEffect, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Tv,
  Wifi,
  Radio,
  Server,
  Network,
  Cpu,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Zap,
  Sliders,
  Bookmark,
  Compass,
  FileText,
  CornerDownRight,
  ShieldCheck,
  Cable,
} from "lucide-react";

// --- TRANSIT PATH HOP DATA ---
interface TransitHop {
  id: number;
  label: string;
  stageTitle: string;
  category: "Edge" | "Access" | "Local Infra" | "Core" | "CDN Edge";
  device: string;
  medium: string;
  layer: string;
  pdu: string;
  narrative: React.ReactNode;
  mechanism: React.ReactNode;
  whyItMatters: React.ReactNode;
}

const TRANSIT_HOPS: TransitHop[] = [
  {
    id: 1,
    label: "Hostel Laptop",
    stageTitle: "The Click: Generating the Video Request",
    category: "Edge",
    device: "Hostel Laptop (Client End Host)",
    medium: "Host System Bus / Memory",
    layer: "Layer 5: Application Layer",
    pdu: "HTTP/3 / HTTPS GET Request",
    narrative: (
      <>
        You press Play on Netflix. Your laptop becomes the starting point of the
        request.
        <br />
        <br />
        <strong>Where it appears:</strong> At the network edge—your laptop.
      </>
    ),
    mechanism: (
      <>
        <strong>Application Layer:</strong> Creates the request for the video.
        <br />
        <br />
        1. The player requests the video manifest using HTTPS.
        <br />
        2. It works with the Netflix URL—not with cables, radio waves, or
        routes.
      </>
    ),
    whyItMatters: (
      <>
        • End devices are called hosts.
        <br />
        • Hosts create and consume network data.
        <br />• The request begins at the network edge.
      </>
    ),
  },
  {
    id: 2,
    label: "Transport Stack",
    stageTitle: "Stream Segmentation & Port Addressing",
    category: "Edge",
    device: "Operating System Kernel (TCP/IP Stack)",
    medium: "Host Kernel Memory",
    layer: "Layer 4: Transport Layer",
    pdu: "TCP Segment (Dest Port 443)",
    narrative: (
      <>
        Netflix sends the stream in manageable pieces instead of one huge file.
        <br />
        <br />
        <strong>Where it appears:</strong> In your laptop’s TCP/IP stack.
      </>
    ),
    mechanism: (
      <>
        <strong>Transport Layer:</strong> Provides process-to-process delivery.
        <br />
        <br />
        1. Data is divided into segments.
        <br />
        2. Port 443 identifies the HTTPS service.
        <br />
        3. Sequence numbers keep TCP data in order.
      </>
    ),
    whyItMatters: (
      <>
        • IP identifies the host.
        <br />
        • A port identifies the application.
        <br />• TCP supports ordered, reliable delivery.
      </>
    ),
  },
  {
    id: 3,
    label: "IP Routing Logic",
    stageTitle: "Global Addressing & Subnet Decision",
    category: "Edge",
    device: "Host Network Stack & Local Route Table",
    medium: "Host Network Interface Controller (NIC)",
    layer: "Layer 3: Network Layer",
    pdu: "IPv4 / IPv6 Datagram",
    narrative: (
      <>
        Your request must travel beyond the hostel network to a Netflix server.
        <br />
        <br />
        <strong>Where it appears:</strong> In the host’s network stack before
        transmission.
      </>
    ),
    mechanism: (
      <>
        <strong>Network Layer:</strong> Adds logical addresses for host-to-host
        delivery.
        <br />
        <br />
        1. The TCP segment is wrapped in an IP packet.
        <br />
        2. Source and destination IP addresses are added.
        <br />
        3. Because Netflix is remote, the packet is sent to the default gateway.
      </>
    ),
    whyItMatters: (
      <>
        • IP provides logical addressing.
        <br />
        • Routers forward packets between networks.
        <br />• Remote traffic first goes to the default gateway.
      </>
    ),
  },
  {
    id: 4,
    label: "Wi-Fi Airwave",
    stageTitle: "Wireless Framing & Radio Wave Modulation",
    category: "Access",
    device: "Hostel Wi-Fi Access Point (AP)",
    medium: "Unguided Media: 5GHz Radio Frequency (RF)",
    layer: "Layer 2 (Data Link) & Layer 1 (Physical)",
    pdu: "802.11 Wi-Fi Frame → RF Waveform",
    narrative: (
      <>
        The request must cross the room from your laptop to the Wi-Fi access
        point.
        <br />
        <br />
        <strong>Where it appears:</strong> In the wireless link between both
        antennas.
      </>
    ),
    mechanism: (
      <>
        <strong>Data Link + Physical Layers:</strong> Turn a packet into a Wi-Fi
        frame and then a radio signal.
        <br />
        <br />
        1. Layer 2 adds MAC addresses and a CRC to form an 802.11 frame.
        <br />
        2. Layer 1 encodes the bits onto a 5 GHz radio waveform.
        <br />
        3. The antenna transmits the waveform through the air.
      </>
    ),
    whyItMatters: (
      <>
        • Frames use MAC addresses on the local link.
        <br />
        • A CRC detects frame corruption.
        <br />• Wireless is unguided transmission media.
      </>
    ),
  },
  {
    id: 5,
    label: "Switch & Gateway",
    stageTitle: "Local LAN Switching to Campus Border Router",
    category: "Local Infra",
    device: "Floor Ethernet Switch & Gateway Router",
    medium: "Guided Media: Cat6 Twisted-Pair Copper",
    layer: "Switching (L2) & Routing (L3)",
    pdu: "Ethernet 802.3 Frame → Re-routed IP Datagram",
    narrative: (
      <>
        The access point passes your request through the hostel LAN toward the
        campus gateway.
        <br />
        <br />
        <strong>Where it appears:</strong> In the floor switch and gateway
        router.
      </>
    ),
    mechanism: (
      <>
        <strong>Switching and routing:</strong> Move traffic within the LAN,
        then into another network.
        <br />
        <br />
        1. The switch forwards the Ethernet frame using MAC addresses.
        <br />
        2. The router reads the destination IP.
        <br />
        3. NAT maps the private hostel address to a public address before ISP
        transit.
      </>
    ),
    whyItMatters: (
      <>
        • A switch forwards frames inside a LAN.
        <br />
        • A router forwards packets between networks.
        <br />• NAT connects private addressing to the public Internet.
      </>
    ),
  },
  {
    id: 6,
    label: "ISP Optical Core",
    stageTitle: "High-Speed Transit through the Network Core",
    category: "Core",
    device: "Tier-1 Backbone Routers & Internet Exchanges (IXP)",
    medium: "Guided Media: Single-Mode Optical Fiber (Photons)",
    layer: "Network Core & Guided Physical Media",
    pdu: "DWDM Optical Pulses / MPLS Packets",
    narrative: (
      <>
        Your request crosses ISP networks toward the nearest Netflix location.
        <br />
        <br />
        <strong>Where it appears:</strong> In core routers and optical-fiber
        links.
      </>
    ),
    mechanism: (
      <>
        <strong>Network Core:</strong> A mesh that transports packets between
        edge networks.
        <br />
        <br />
        1. Optical transceivers encode bits as light pulses.
        <br />
        2. Fiber carries the pulses over long distances.
        <br />
        3. Core routers use destination prefixes to select the next hop.
      </>
    ),
    whyItMatters: (
      <>
        • Fiber is guided transmission media.
        <br />
        • The core is built from high-speed routers and links.
        <br />• Core routers forward packets; applications run at the edge.
      </>
    ),
  },
  {
    id: 7,
    label: "Netflix OCA Server",
    stageTitle: "Edge Server Delivery & Video Streaming",
    category: "CDN Edge",
    device: "Netflix Open Connect Appliance (CDN Edge Cache)",
    medium: "100GbE Data Center Optical Fabric",
    layer: "Full Stack De-encapsulation & Video Response",
    pdu: "H.264 / AV1 Video Chunk Streamed Back",
    narrative: (
      <>
        A nearby Netflix Open Connect server returns the requested video chunk.
        <br />
        <br />
        <strong>Where it appears:</strong> At a CDN edge cache close to the
        user.
      </>
    ),
    mechanism: (
      <>
        <strong>CDN delivery:</strong> Serves cached content from a nearby edge
        server.
        <br />
        <br />
        1. The server decapsulates the request up the protocol stack.
        <br />
        2. It reads the requested byte range from storage.
        <br />
        3. The response is encapsulated and sent back through the network.
      </>
    ),
    whyItMatters: (
      <>
        • A CDN places content close to users.
        <br />
        • Shorter paths reduce delay and backbone traffic.
        <br />• The receiver decapsulates; the sender encapsulates.
      </>
    ),
  },
];

export default function App() {
  // Navigation / Active View
  const [activeSection, setActiveSection] = useState<string>("transit");

  const navigateToSection = (section: string, targetId: string) => {
    setActiveSection(section);
    window.history.replaceState(null, "", `#${targetId}`);
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Transit Path State
  const [currentHopIndex, setCurrentHopIndex] = useState<number>(0);
  const [isPlayingTransit, setIsPlayingTransit] = useState<boolean>(false);

  // Signal Encoding State
  const [bitString, setBitString] = useState<string>("10110010");

  // Topology State
  const [selectedTopology, setSelectedTopology] = useState<
    "star" | "bus" | "ring" | "mesh"
  >("star");
  const [isSwitchFailed, setIsSwitchFailed] = useState<boolean>(false);

  // Layer Inspector State
  const [selectedLayer, setSelectedLayer] = useState<number>(5);

  // Diagnostic Scenario State
  const [selectedFaultId, setSelectedFaultId] = useState<string>("phys");

  // Interactive Understanding Check State
  const [mcqSelections, setMcqSelections] = useState<Record<number, number>>(
    {},
  );
  const [selectedMatchLeft, setSelectedMatchLeft] = useState<string | null>(
    null,
  );
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({});
  const [showMatchResults, setShowMatchResults] = useState<boolean>(false);

  // Auto-play transit path
  useEffect(() => {
    let timer: any;
    if (isPlayingTransit) {
      timer = setInterval(() => {
        setCurrentHopIndex((prev) => {
          if (prev >= TRANSIT_HOPS.length - 1) {
            setIsPlayingTransit(false);
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlayingTransit]);

  const currentHop = TRANSIT_HOPS[currentHopIndex];

  // Bit parsing for signal encoding
  const parsedBits = useMemo(() => {
    return bitString
      .split("")
      .filter((c) => c === "0" || c === "1")
      .map((c) => parseInt(c, 10));
  }, [bitString]);

  // SVG Waveform Math
  const bitWidth = 54;
  const waveHeight = 44;
  const highY = 8;
  const midY = waveHeight / 2;
  const lowY = waveHeight - 8;

  // Waveform paths
  const clockWavePath = useMemo(() => {
    let d = "";
    parsedBits.forEach((_, i) => {
      const x1 = i * bitWidth;
      const xMid = x1 + bitWidth / 2;
      const x2 = x1 + bitWidth;
      if (i === 0) d += `M ${x1} ${lowY}`;
      d += ` L ${x1} ${highY} L ${xMid} ${highY} L ${xMid} ${lowY} L ${x2} ${lowY}`;
    });
    return d;
  }, [parsedBits]);

  const nrzLWavePath = useMemo(() => {
    let d = "";
    parsedBits.forEach((b, i) => {
      const x1 = i * bitWidth;
      const x2 = x1 + bitWidth;
      const y = b === 1 ? highY : lowY;
      if (i === 0) d += `M ${x1} ${y}`;
      else d += ` L ${x1} ${y}`;
      d += ` L ${x2} ${y}`;
    });
    return d;
  }, [parsedBits]);

  const nrzIWavePath = useMemo(() => {
    let d = "";
    let currentY = lowY;
    parsedBits.forEach((b, i) => {
      const x1 = i * bitWidth;
      const x2 = x1 + bitWidth;
      if (b === 1) currentY = currentY === lowY ? highY : lowY;
      if (i === 0) d += `M ${x1} ${currentY}`;
      else d += ` L ${x1} ${currentY}`;
      d += ` L ${x2} ${currentY}`;
    });
    return d;
  }, [parsedBits]);

  const manchesterWavePath = useMemo(() => {
    let d = "";
    parsedBits.forEach((b, i) => {
      const x1 = i * bitWidth;
      const xMid = x1 + bitWidth / 2;
      const x2 = x1 + bitWidth;
      const y1 = b === 1 ? highY : lowY;
      const y2 = b === 1 ? lowY : highY;
      if (i === 0) d += `M ${x1} ${y1}`;
      else d += ` L ${x1} ${y1}`;
      d += ` L ${xMid} ${y1} L ${xMid} ${y2} L ${x2} ${y2}`;
    });
    return d;
  }, [parsedBits]);

  const bipolarAmiWavePath = useMemo(() => {
    let d = "";
    let lastOneY = lowY;
    parsedBits.forEach((b, i) => {
      const x1 = i * bitWidth;
      const x2 = x1 + bitWidth;
      let y = midY;
      if (b === 1) {
        y = lastOneY === lowY ? highY : lowY;
        lastOneY = y;
      }
      if (i === 0) d += `M ${x1} ${y}`;
      else d += ` L ${x1} ${y}`;
      d += ` L ${x2} ${y}`;
    });
    return d;
  }, [parsedBits]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 3-ZONE EDTECH HEADER */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Zone 1: Course Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-white text-sm">
              <span className="text-rose-500">N</span>1
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Computer Networks</span>
                <span className="text-slate-300 font-normal">/</span>
                <span className="font-semibold text-slate-600">
                  Unit 1 Case Study
                </span>
              </div>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex flex-1 min-w-0 items-center justify-center gap-1 text-xs font-semibold text-slate-600 whitespace-nowrap">
            <button
              onClick={() => navigateToSection("transit", "transit-simulator")}
              title="End-to-End Transit"
              className={`px-2 py-1.5 rounded-md shrink-0 transition-colors hover:text-slate-900 ${
                activeSection === "transit" ? "text-rose-600 font-bold" : ""
              }`}
            >
              Transit
            </button>
            <button
              onClick={() => navigateToSection("edge-core", "edge-core")}
              className={`px-2 py-1.5 rounded-md shrink-0 transition-colors hover:text-slate-900 ${
                activeSection === "edge-core" ? "text-rose-600 font-bold" : ""
              }`}
            >
              Edge & Core
            </button>
            <button
              onClick={() => navigateToSection("hardware", "hardware")}
              title="Router, Switch & Gateway"
              className={`px-2 py-1.5 rounded-md shrink-0 transition-colors hover:text-slate-900 ${
                activeSection === "hardware" ? "text-rose-600 font-bold" : ""
              }`}
            >
              Devices
            </button>
            <button
              onClick={() => navigateToSection("signals", "signals")}
              title="Signal Encoding"
              className={`px-2 py-1.5 rounded-md shrink-0 transition-colors hover:text-slate-900 ${
                activeSection === "signals" ? "text-rose-600 font-bold" : ""
              }`}
            >
              Signals
            </button>
            <button
              onClick={() => navigateToSection("layers", "layers")}
              title="Layering & OSI"
              className={`px-2 py-1.5 rounded-md shrink-0 transition-colors hover:text-slate-900 ${
                activeSection === "layers" ? "text-rose-600 font-bold" : ""
              }`}
            >
              Layers
            </button>
            <button
              onClick={() => navigateToSection("diagnostic", "diagnostic")}
              title="Diagnostic Lab"
              className={`px-2 py-1.5 rounded-md shrink-0 transition-colors hover:text-slate-900 ${
                activeSection === "diagnostic" ? "text-rose-600 font-bold" : ""
              }`}
            >
              Diagnostic
            </button>
            <button
              onClick={() => navigateToSection("checks", "checks")}
              title="Check Understanding"
              className={`px-2 py-1.5 rounded-md shrink-0 transition-colors hover:text-slate-900 ${
                activeSection === "checks" ? "text-rose-600 font-bold" : ""
              }`}
            >
              Checks
            </button>
            <button
              onClick={() => navigateToSection("guardrails", "guardrails")}
              className={`px-2 py-1.5 rounded-md shrink-0 transition-colors hover:text-slate-900 ${
                activeSection === "guardrails" ? "text-rose-600 font-bold" : ""
              }`}
            >
              Guardrails
            </button>
          </nav>

          {/* Zone 3: Action & Progress */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-medium text-slate-500 hidden xl:inline">
              Module 1.1
            </span>
            <div className="h-4 w-px bg-slate-200 hidden xl:block" />
            <a
              href="#transit-simulator"
              onClick={(event) => {
                event.preventDefault();
                navigateToSection("transit", "transit-simulator");
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm"
            >
              Transit Simulator
            </a>
          </div>
        </div>

        {/* Mobile Horizontal Subnav */}
        <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-200/60 gap-4 bg-white text-xs font-semibold text-slate-600">
          <button
            onClick={() => navigateToSection("transit", "transit-simulator")}
            className={`whitespace-nowrap ${activeSection === "transit" ? "text-rose-600 font-bold" : ""}`}
          >
            Transit Path
          </button>
          <button
            onClick={() => navigateToSection("edge-core", "edge-core")}
            className={`whitespace-nowrap ${activeSection === "edge-core" ? "text-rose-600 font-bold" : ""}`}
          >
            Edge & Core
          </button>
          <button
            onClick={() => navigateToSection("hardware", "hardware")}
            className={`whitespace-nowrap ${activeSection === "hardware" ? "text-rose-600 font-bold" : ""}`}
          >
            Hardware & Topologies
          </button>
          <button
            onClick={() => navigateToSection("signals", "signals")}
            className={`whitespace-nowrap ${activeSection === "signals" ? "text-rose-600 font-bold" : ""}`}
          >
            Signals
          </button>
          <button
            onClick={() => navigateToSection("layers", "layers")}
            className={`whitespace-nowrap ${activeSection === "layers" ? "text-rose-600 font-bold" : ""}`}
          >
            Layers
          </button>
          <button
            onClick={() => navigateToSection("diagnostic", "diagnostic")}
            className={`whitespace-nowrap ${activeSection === "diagnostic" ? "text-rose-600 font-bold" : ""}`}
          >
            Diagnostic
          </button>
          <button
            onClick={() => navigateToSection("checks", "checks")}
            className={`whitespace-nowrap ${activeSection === "checks" ? "text-rose-600 font-bold" : ""}`}
          >
            Checks
          </button>
          <button
            onClick={() => navigateToSection("guardrails", "guardrails")}
            className={`whitespace-nowrap ${activeSection === "guardrails" ? "text-rose-600 font-bold" : ""}`}
          >
            Guardrails
          </button>
        </div>
      </header>

      {/* EDITORIAL HERO & CASE STUDY PREMISE */}
      <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-3">
            <span>Case Study</span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span>Computer Networks Unit 1</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            What Actually Happens When You Open Netflix?
          </h1>

          <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
            <span>Hostel to Data Center Journey</span>
            <span aria-hidden="true">·</span>
            <span>7 Hops</span>
            <span aria-hidden="true">·</span>
            <span>OSI & Internet Architecture</span>
          </div>

          <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            You press Play on{" "}
            <strong className="font-semibold text-slate-900">
              Stranger Things
            </strong>
            . Seconds later, video appears. Follow that request from your hostel
            laptop to a nearby Netflix server—and see where each Unit 1 concept
            is used.
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            One journey connects the network edge, core, devices, media,
            signals, and protocol layers.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-16 flex-1">
        {/* ========================================================================= */}
        {/* 1. THE INTERACTIVE END-TO-END TRANSIT PATH SIMULATOR */}
        {/* ========================================================================= */}
        <section
          id="transit-simulator"
          className="flex flex-col gap-6 scroll-mt-20"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Interactive Simulation
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              The End-to-End Transit Path
            </h2>
            <p className="text-sm text-slate-600">
              Follow one Netflix request from your laptop to an Open Connect
              cache. Each hop shows the concept, its real-world location, and
              the steps involved.
            </p>
          </div>

          {/* SIMULATOR CONTAINER */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Visual Top Bar / Progress Header */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                <span className="text-xs font-bold text-slate-900">
                  Hop {currentHopIndex + 1} of {TRANSIT_HOPS.length}:
                </span>
                <span className="text-xs font-medium text-slate-600">
                  {currentHop.stageTitle}
                </span>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingTransit(!isPlayingTransit)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
                >
                  {isPlayingTransit ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                  <span>{isPlayingTransit ? "Pause" : "Auto Play"}</span>
                </button>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button
                    disabled={currentHopIndex === 0}
                    onClick={() => setCurrentHopIndex(currentHopIndex - 1)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                    title="Previous Hop"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={currentHopIndex === TRANSIT_HOPS.length - 1}
                    onClick={() => setCurrentHopIndex(currentHopIndex + 1)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                    title="Next Hop"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setCurrentHopIndex(0)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  title="Reset to Hop 1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stepper Node Runway */}
            <div className="p-6 border-b border-slate-100 bg-white">
              <div className="relative flex items-center justify-between">
                {/* Connecting Track */}
                <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-slate-200 -translate-y-1/2" />
                <div
                  className="absolute top-1/2 left-3 h-0.5 bg-rose-600 -translate-y-1/2 transition-all duration-300"
                  style={{
                    width: `${(currentHopIndex / (TRANSIT_HOPS.length - 1)) * 96}%`,
                  }}
                />

                {TRANSIT_HOPS.map((hop, idx) => {
                  const isActive = idx === currentHopIndex;
                  const isDone = idx < currentHopIndex;
                  return (
                    <button
                      key={hop.id}
                      onClick={() => setCurrentHopIndex(idx)}
                      className="group relative z-10 flex flex-col items-center focus:outline-none"
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isActive
                            ? "bg-rose-600 text-white shadow-md ring-4 ring-rose-100 scale-110"
                            : isDone
                              ? "bg-slate-900 text-white"
                              : "bg-white border-2 border-slate-300 text-slate-500 group-hover:border-slate-400"
                        }`}
                      >
                        {isDone ? "✓" : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] mt-2 font-medium max-w-[64px] text-center truncate hidden sm:block ${
                          isActive
                            ? "text-rose-600 font-bold"
                            : "text-slate-500"
                        }`}
                      >
                        {hop.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hop Visual Diagram & Deep Dive Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              {/* Left Column: Visual Hardware / Topology Schematic */}
              <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-slate-50/30 gap-6">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Network Segment
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {currentHop.device}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {currentHop.medium}
                  </div>
                </div>

                {/* Minimalist Graphic Schematic */}
                <div className="p-6 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-800">
                    {currentHopIndex === 0 && (
                      <Tv className="w-8 h-8 text-rose-600" />
                    )}
                    {currentHopIndex === 1 && (
                      <Cpu className="w-8 h-8 text-slate-800" />
                    )}
                    {currentHopIndex === 2 && (
                      <Network className="w-8 h-8 text-slate-800" />
                    )}
                    {currentHopIndex === 3 && (
                      <Wifi className="w-8 h-8 text-rose-600" />
                    )}
                    {currentHopIndex === 4 && (
                      <Layers className="w-8 h-8 text-slate-800" />
                    )}
                    {currentHopIndex === 5 && (
                      <Radio className="w-8 h-8 text-rose-600" />
                    )}
                    {currentHopIndex === 6 && (
                      <Server className="w-8 h-8 text-emerald-600" />
                    )}
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-900 block font-mono">
                      {currentHop.pdu}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {currentHop.layer}
                    </span>
                  </div>
                </div>

                {/* Scope Anchor */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <span className="text-slate-500">Domain:</span>
                  <span className="font-semibold text-slate-800">
                    {currentHop.category}
                  </span>
                </div>
              </div>

              {/* Right Column: Narrative & Technical Mechanism */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col gap-6">
                <div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                    Hop {currentHop.id} Breakdown
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {currentHop.stageTitle}
                  </h3>
                </div>

                {/* The Narrative Story */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Real-World Case
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    {currentHop.narrative}
                  </p>
                </div>

                {/* The Technical Mechanism */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    What Is This? · How Does It Work?
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {currentHop.mechanism}
                  </p>
                </div>

                {/* Core Concept Takeaway */}
                <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col gap-1 mt-auto">
                  <span className="text-xs font-bold text-rose-400">
                    Key Takeaway
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentHop.whyItMatters}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. NETWORK EDGE VS NETWORK CORE */}
        {/* ========================================================================= */}
        <section id="edge-core" className="flex flex-col gap-6 scroll-mt-20">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Architectural Boundary
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Network Edge vs. Network Core
            </h2>
            <p className="text-sm text-slate-600">
              <strong>Edge:</strong> where data is created and used.{" "}
              <strong>Core:</strong> where packets are moved between edge
              networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Network Edge Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    The Network Edge
                  </h3>
                  <span className="text-xs text-slate-500">
                    End Systems / Hosts
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Your laptop and Netflix’s cache server are edge hosts. They run
                applications, create requests, and consume or serve the video
                data.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Key Components:</span>
                  <span className="font-semibold text-slate-800">
                    Clients, Servers, Access Points
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Primary Responsibility:
                  </span>
                  <span className="font-semibold text-slate-800">
                    Generating and Consuming Data
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Intelligence Location:</span>
                  <span className="font-semibold text-slate-800">
                    High (Full Protocol Stack)
                  </span>
                </div>
              </div>
            </div>

            {/* Network Core Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    The Network Core
                  </h3>
                  <span className="text-xs text-slate-500">
                    Interconnected Routers & Meshes
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                The core is a mesh of ISP routers and high-speed links. Its job
                is simple: read the destination prefix and forward each packet
                to the next hop.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Key Components:</span>
                  <span className="font-semibold text-slate-800">
                    Core Routers, IXPs, Optical Backbones
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Primary Responsibility:
                  </span>
                  <span className="font-semibold text-slate-800">
                    Store-and-Forward Packet Switching
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Intelligence Location:</span>
                  <span className="font-semibold text-slate-800">
                    Minimal (Layers 1-3 only)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. HARDWARE DEMYSTIFIED: ROUTER VS SWITCH VS GATEWAY VS MODEM */}
        {/* ========================================================================= */}
        <section id="hardware" className="flex flex-col gap-6 scroll-mt-20">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Hardware Components
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Router vs. Switch vs. Gateway vs. Modem
            </h2>
            <p className="text-sm text-slate-600">
              Each device has one clear job in the Netflix journey. Compare its
              layer, address type, and failure effect.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold">
                  <th className="py-3.5 px-5">Device</th>
                  <th className="py-3.5 px-4">Primary Layer</th>
                  <th className="py-3.5 px-4">Addressing</th>
                  <th className="py-3.5 px-5">Netflix Transmission Role</th>
                  <th className="py-3.5 px-4">Failure Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-slate-600" /> Switch
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    Layer 2 (Data Link)
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-500">
                    48-bit MAC Addresses
                  </td>
                  <td className="py-4 px-5">
                    Forwards Ethernet frames inside the hostel LAN using MAC
                    addresses.
                  </td>
                  <td className="py-4 px-4 text-rose-600 font-medium">
                    Local hostel floor LAN drops
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                    <Network className="w-4 h-4 text-slate-600" /> Router
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    Layer 3 (Network)
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-500">
                    32-bit / 128-bit IP Addresses
                  </td>
                  <td className="py-4 px-5">
                    Connects the hostel, campus, and ISP networks. Uses
                    destination IP addresses to choose a next hop.
                  </td>
                  <td className="py-4 px-4 text-rose-600 font-medium">
                    LAN works, but Internet is unreachable
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-600" /> Gateway
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    Layers 4–7 (Application/Transport)
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-500">
                    Protocol Headers / Translation
                  </td>
                  <td className="py-4 px-5">
                    Translates between different protocols or systems, such as
                    IPv4/IPv6 or application APIs.
                  </td>
                  <td className="py-4 px-4 text-rose-600 font-medium">
                    Cross-protocol conversion stalls
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-slate-600" /> Modem
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-600">
                    Layer 1 (Physical)
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-500">
                    Carrier Frequencies / QAM
                  </td>
                  <td className="py-4 px-5">
                    <strong>Modulator + Demodulator:</strong> maps digital data
                    to a signal suited to the access medium, then recovers the
                    data at the receiver.
                  </td>
                  <td className="py-4 px-4 text-rose-600 font-medium">
                    Physical link disconnects (no carrier)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interactive Topology Sandbox */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Network Topology & Resilience
                </h3>
                <p className="text-xs text-slate-500">
                  A topology is the arrangement of nodes and links. Change it to
                  see the failure scope.
                </p>
              </div>

              {/* Segmented Controller */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200 self-start">
                {(["star", "bus", "ring", "mesh"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTopology(t);
                      setIsSwitchFailed(false);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      selectedTopology === t
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Canvas Area */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 min-h-[260px] flex flex-col items-center justify-center relative">
              {selectedTopology === "star" && (
                <div className="w-full flex flex-col items-center justify-center gap-8">
                  {/* Central Hub/Switch */}
                  <div
                    onClick={() => setIsSwitchFailed(!isSwitchFailed)}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 shadow-sm ${
                      isSwitchFailed
                        ? "border-rose-400 bg-rose-50 text-rose-800"
                        : "border-slate-800 bg-white text-slate-900 hover:scale-105"
                    }`}
                  >
                    <Wifi className="w-6 h-6 text-slate-700" />
                    <span className="text-xs font-bold">Central Switch</span>
                    <span className="text-[10px] text-slate-500">
                      {isSwitchFailed
                        ? "STATUS: FAILED (Click to restore)"
                        : "STATUS: NORMAL (Click to kill)"}
                    </span>
                  </div>

                  {/* Connected End Devices */}
                  <div className="grid grid-cols-4 gap-4 w-full max-w-md">
                    {["Your Laptop", "Roommate PC", "Smart TV", "Router"].map(
                      (name, i) => (
                        <div
                          key={i}
                          className={`p-2.5 rounded-lg border text-center flex flex-col items-center gap-1 transition-all ${
                            isSwitchFailed
                              ? "bg-slate-100 border-slate-200 text-slate-400 line-through opacity-60"
                              : "bg-white border-slate-200 text-slate-800"
                          }`}
                        >
                          <Tv className="w-4 h-4 text-slate-500" />
                          <span className="text-[10px] font-semibold">
                            {name}
                          </span>
                        </div>
                      ),
                    )}
                  </div>

                  {isSwitchFailed && (
                    <div className="text-xs text-rose-600 font-semibold bg-rose-50 px-4 py-2 rounded-lg border border-rose-200">
                      Single Point of Failure: Central switch failed,
                      disconnecting all attached hosts.
                    </div>
                  )}
                </div>
              )}

              {selectedTopology === "bus" && (
                <div className="w-full max-w-lg flex flex-col items-center gap-6">
                  <div className="w-full h-3 bg-slate-700 rounded-full relative flex items-center justify-between px-3 text-[9px] font-bold text-white">
                    <span>Terminator</span>
                    <span>Shared Coaxial Bus Cable</span>
                    <span>Terminator</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 w-full">
                    {["Laptop", "PC 2", "PC 3", "Gateway"].map((name, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg text-center flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-700"
                      >
                        <Tv className="w-4 h-4 text-slate-500" />
                        <span>{name}</span>
                        <span className="text-[9px] text-slate-400 font-normal">
                          Vampire Tap
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 text-center">
                    If the bus line breaks at any point, reflections destroy
                    signal impedance for everyone.
                  </div>
                </div>
              )}

              {selectedTopology === "ring" && (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-56 h-56 rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center">
                    <div className="absolute top-0 -translate-y-1/2 px-2.5 py-1 bg-white border border-slate-300 rounded text-[10px] font-bold">
                      Hostel A (Token)
                    </div>
                    <div className="absolute right-0 translate-x-1/2 px-2.5 py-1 bg-white border border-slate-300 rounded text-[10px] font-bold">
                      Hostel B
                    </div>
                    <div className="absolute bottom-0 translate-y-1/2 px-2.5 py-1 bg-white border border-slate-300 rounded text-[10px] font-bold">
                      Hostel C
                    </div>
                    <div className="absolute left-0 -translate-x-1/2 px-2.5 py-1 bg-white border border-slate-300 rounded text-[10px] font-bold">
                      Campus Core
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Token Ring
                    </span>
                  </div>
                </div>
              )}

              {selectedTopology === "mesh" && (
                <div className="relative w-64 h-56 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line
                      x1="30"
                      y1="30"
                      x2="226"
                      y2="30"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="30"
                      y1="30"
                      x2="30"
                      y2="194"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="30"
                      y1="30"
                      x2="226"
                      y2="194"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="226"
                      y1="30"
                      x2="30"
                      y2="194"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="226"
                      y1="30"
                      x2="226"
                      y2="194"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="30"
                      y1="194"
                      x2="226"
                      y2="194"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                  </svg>
                  <div className="absolute top-2 left-2 p-1.5 bg-white border border-slate-300 rounded text-[10px] font-bold">
                    Core Router 1
                  </div>
                  <div className="absolute top-2 right-2 p-1.5 bg-white border border-slate-300 rounded text-[10px] font-bold">
                    Core Router 2
                  </div>
                  <div className="absolute bottom-2 left-2 p-1.5 bg-white border border-slate-300 rounded text-[10px] font-bold">
                    Core Router 3
                  </div>
                  <div className="absolute bottom-2 right-2 p-1.5 bg-white border border-slate-300 rounded text-[10px] font-bold">
                    Core Router 4
                  </div>
                  <div className="z-10 bg-white/90 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] text-slate-700 font-semibold text-center">
                    Full Mesh: n(n-1)/2 = 6 redundant links
                    <br />
                    Zero Single Point of Failure
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SIGNAL ENCODING: HOW BITS BECOME PHYSICAL WAVES */}
        {/* ========================================================================= */}
        <section id="signals" className="flex flex-col gap-6 scroll-mt-20">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Physical Layer Fundamentals
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Signal Encoding: Converting Bits into Physical Voltage
            </h2>
            <p className="text-sm text-slate-600">
              Bits must be represented by physical signal changes. Try a bit
              pattern to compare NRZ-L, NRZ-I, Manchester, and Bipolar AMI.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm">
            {/* Input & Presets */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">
                  Digital Input Stream:
                </span>
                <input
                  type="text"
                  value={bitString}
                  onChange={(e) => {
                    const cleaned = e.target.value
                      .replace(/[^01]/g, "")
                      .slice(0, 16);
                    setBitString(cleaned);
                  }}
                  className="px-3 py-1.5 font-mono text-sm tracking-widest text-slate-900 bg-slate-50 border border-slate-300 rounded-lg w-40 text-center focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Presets:</span>
                <button
                  onClick={() => setBitString("10110010")}
                  className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 font-medium"
                >
                  Netflix Byte (10110010)
                </button>
                <button
                  onClick={() => setBitString("00000000")}
                  className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 font-medium"
                >
                  All 0s (Clock Drift Test)
                </button>
                <button
                  onClick={() => setBitString("11111111")}
                  className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-slate-700 font-medium"
                >
                  All 1s
                </button>
              </div>
            </div>

            {/* Synchronized Waveform Canvas */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[620px]">
                {/* Bit Labels Header Row */}
                <div className="flex items-center ml-48 border-b border-slate-200 pb-2">
                  {parsedBits.map((bit, idx) => (
                    <div
                      key={idx}
                      className="w-14 text-center font-mono font-bold text-xs text-slate-700"
                    >
                      {bit}
                    </div>
                  ))}
                </div>

                {/* Clock Signal */}
                <div className="flex items-center py-2.5 border-b border-slate-100">
                  <div className="w-48 shrink-0 pr-4">
                    <span className="text-xs font-bold text-slate-500 block">
                      Clock Signal
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Transmitter Reference
                    </span>
                  </div>
                  <svg
                    width={parsedBits.length * bitWidth}
                    height={waveHeight}
                    className="overflow-visible"
                  >
                    {parsedBits.map((_, i) => (
                      <line
                        key={i}
                        x1={i * bitWidth}
                        y1={0}
                        x2={i * bitWidth}
                        y2={waveHeight}
                        stroke="#e2e8f0"
                        strokeDasharray="2,2"
                      />
                    ))}
                    <path
                      d={clockWavePath}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* NRZ-L */}
                <div className="flex items-center py-2.5 border-b border-slate-100">
                  <div className="w-48 shrink-0 pr-4">
                    <span className="text-xs font-bold text-slate-800 block">
                      NRZ-L (Level)
                    </span>
                    <span className="text-[10px] text-slate-500">
                      0 = Low, 1 = High
                    </span>
                  </div>
                  <svg
                    width={parsedBits.length * bitWidth}
                    height={waveHeight}
                    className="overflow-visible"
                  >
                    {parsedBits.map((_, i) => (
                      <line
                        key={i}
                        x1={i * bitWidth}
                        y1={0}
                        x2={i * bitWidth}
                        y2={waveHeight}
                        stroke="#f1f5f9"
                        strokeDasharray="2,2"
                      />
                    ))}
                    <path
                      d={nrzLWavePath}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* NRZ-I */}
                <div className="flex items-center py-2.5 border-b border-slate-100">
                  <div className="w-48 shrink-0 pr-4">
                    <span className="text-xs font-bold text-slate-800 block">
                      NRZ-I (Invert)
                    </span>
                    <span className="text-[10px] text-slate-500">
                      1 = Invert, 0 = Keep
                    </span>
                  </div>
                  <svg
                    width={parsedBits.length * bitWidth}
                    height={waveHeight}
                    className="overflow-visible"
                  >
                    {parsedBits.map((_, i) => (
                      <line
                        key={i}
                        x1={i * bitWidth}
                        y1={0}
                        x2={i * bitWidth}
                        y2={waveHeight}
                        stroke="#f1f5f9"
                        strokeDasharray="2,2"
                      />
                    ))}
                    <path
                      d={nrzIWavePath}
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Manchester (IEEE 802.3 Standard) */}
                <div className="flex items-center py-3 bg-rose-50/50 rounded-xl px-2 my-1 border border-rose-100">
                  <div className="w-48 shrink-0 pr-4">
                    <span className="text-xs font-bold text-rose-700 block">
                      Manchester (IEEE 802.3)
                    </span>
                    <span className="text-[10px] text-rose-600">
                      Mid-bit transition: 0 = L→H, 1 = H→L
                    </span>
                  </div>
                  <svg
                    width={parsedBits.length * bitWidth}
                    height={waveHeight}
                    className="overflow-visible"
                  >
                    {parsedBits.map((_, i) => (
                      <line
                        key={i}
                        x1={i * bitWidth}
                        y1={0}
                        x2={i * bitWidth}
                        y2={waveHeight}
                        stroke="#fecdd3"
                        strokeDasharray="2,2"
                      />
                    ))}
                    <path
                      d={manchesterWavePath}
                      fill="none"
                      stroke="#e11d48"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                {/* Bipolar AMI */}
                <div className="flex items-center py-2.5">
                  <div className="w-48 shrink-0 pr-4">
                    <span className="text-xs font-bold text-slate-800 block">
                      Bipolar AMI
                    </span>
                    <span className="text-[10px] text-slate-500">
                      0 = 0V, 1 = Alternating +V / -V
                    </span>
                  </div>
                  <svg
                    width={parsedBits.length * bitWidth}
                    height={waveHeight}
                    className="overflow-visible"
                  >
                    {parsedBits.map((_, i) => (
                      <line
                        key={i}
                        x1={i * bitWidth}
                        y1={0}
                        x2={i * bitWidth}
                        y2={waveHeight}
                        stroke="#f1f5f9"
                        strokeDasharray="2,2"
                      />
                    ))}
                    <line
                      x1={0}
                      y1={midY}
                      x2={parsedBits.length * bitWidth}
                      y2={midY}
                      stroke="#cbd5e1"
                      strokeDasharray="3,3"
                    />
                    <path
                      d={bipolarAmiWavePath}
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Explanatory Takeaways */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block mb-1">
                  1. Clock Synchronization
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  Long flat NRZ-L signals can cause clock drift. Manchester adds
                  a transition in every bit period.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block mb-1">
                  2. Eliminating DC Bias
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  Balanced encodings such as Manchester and Bipolar AMI reduce
                  DC baseline problems.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong className="text-slate-900 block mb-1">
                  3. The Bandwidth Trade-off
                </strong>
                <p className="text-slate-600 leading-relaxed">
                  Manchester improves synchronization but needs more bandwidth:
                  its baud rate is twice the bit rate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. THE 5-LAYER INTERNET VS 7-LAYER OSI MODEL */}
        {/* ========================================================================= */}
        <section id="layers" className="flex flex-col gap-6 scroll-mt-20">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Layering & Protocol Suites
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              5-Layer Internet vs. 7-Layer OSI Model
            </h2>
            <p className="text-sm text-slate-600">
              Layers separate responsibilities. Netflix can change its player
              without redesigning Wi-Fi hardware, and Wi-Fi can improve without
              changing web applications.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm">
            {/* Visual Header Encapsulation Nesting */}
            <div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                Header Encapsulation at Layer {selectedLayer}:
              </div>
              <div className="flex items-center gap-1 overflow-x-auto py-2 font-mono text-xs">
                {selectedLayer <= 2 && (
                  <div className="px-3 py-2 rounded bg-slate-800 text-white font-bold shrink-0">
                    [Ethernet/Wi-Fi MAC Header: 14B]
                  </div>
                )}
                {selectedLayer <= 3 && (
                  <div className="px-3 py-2 rounded bg-slate-700 text-white font-bold shrink-0">
                    [IP Header: 20B]
                  </div>
                )}
                {selectedLayer <= 4 && (
                  <div className="px-3 py-2 rounded bg-slate-600 text-white font-bold shrink-0">
                    [TCP/UDP Header: 20B]
                  </div>
                )}
                <div className="px-4 py-2 rounded bg-rose-50 border border-rose-200 text-rose-900 font-bold flex-1 text-center shrink-0">
                  {selectedLayer === 1
                    ? "01101001... (Physical Bitstream)"
                    : "Netflix Video Payload"}
                </div>
                {selectedLayer <= 2 && (
                  <div className="px-2.5 py-2 rounded bg-slate-800 text-white font-bold shrink-0">
                    [CRC: 4B]
                  </div>
                )}
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  layerNum: 5,
                  name: "Application Layer (OSI 5, 6, 7 Merged)",
                  pdu: "Data / Message",
                  protocols: "HTTP/3, DASH/HLS, DNS, TLS 1.3",
                  desc: "Creates the Netflix request and handles formats, encryption, and sessions. The Internet model combines OSI Layers 5–7 here.",
                },
                {
                  layerNum: 4,
                  name: "Transport Layer (OSI Layer 4)",
                  pdu: "Segment (TCP) / Datagram (UDP)",
                  protocols: "TCP, UDP, QUIC",
                  desc: "Uses ports for process-to-process delivery. TCP manages order and retransmission; Netflix HTTPS uses port 443.",
                },
                {
                  layerNum: 3,
                  name: "Network Layer (OSI Layer 3)",
                  pdu: "IP Datagram / Packet",
                  protocols: "IPv4, IPv6, ICMP, BGP",
                  desc: "Adds logical IP addresses and routes packets from the laptop to the Netflix host across many networks.",
                },
                {
                  layerNum: 2,
                  name: "Data Link Layer (OSI Layer 2)",
                  pdu: "Frame",
                  protocols: "Ethernet (802.3), Wi-Fi (802.11)",
                  desc: "Moves frames across one local link using MAC addresses. A CRC detects corrupted frames.",
                },
                {
                  layerNum: 1,
                  name: "Physical Layer (OSI Layer 1)",
                  pdu: "Bits",
                  protocols: "Manchester, 1000BASE-T, OFDM, QAM",
                  desc: "Carries bits as voltage, radio waves, or light through copper, air, or fiber.",
                },
              ].map((l) => (
                <div
                  key={l.layerNum}
                  onClick={() => setSelectedLayer(l.layerNum)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedLayer === l.layerNum
                      ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900/10"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">
                      {l.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-semibold">
                      {l.pdu}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-rose-600 mb-2">
                    {l.protocols}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {l.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. DIAGNOSTIC CASE STUDY: WI-FI CONNECTED, NETFLIX WON'T LOAD */}
        {/* ========================================================================= */}
        <section id="diagnostic" className="flex flex-col gap-6 scroll-mt-20">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Practical Network Diagnosis
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Troubleshooting: "Wi-Fi Connected, but Netflix Won't Load"
            </h2>
            <p className="text-sm text-slate-600">
              Test from Layer 1 upward. Select a failure, read the evidence, and
              identify the first layer that breaks.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm">
            {/* Scenario Picker */}
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
              {[
                { id: "phys", name: "Case A: Layer 1 (Physical RF Noise)" },
                { id: "link", name: "Case B: Layer 2 (Frame CRC Corruption)" },
                {
                  id: "net",
                  name: "Case C: Layer 3 (DNS / Routing Blackhole)",
                },
                {
                  id: "trans",
                  name: "Case D: Layer 4 (Firewall Drops TCP 443)",
                },
                { id: "app", name: "Case E: Layer 5 (Expired DRM License)" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedFaultId(c.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedFaultId === c.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Diagnostic Workbench */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Terminal Output */}
              <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl text-slate-100 font-mono text-xs flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[10px] text-slate-400">
                  <span>student@hostel-laptop: ~</span>
                  <span>diagnostic-session</span>
                </div>
                <div className="py-2 text-[11px] leading-relaxed whitespace-pre-wrap text-slate-300">
                  {selectedFaultId === "phys" &&
                    `$ iwconfig wlan0\nwlan0: IEEE 802.11ac ESSID:"Hostel-Wi-Fi"\n       Signal level=-89 dBm  Noise level=-90 dBm\n       Link Quality=8/70  SNR=1 dB (Severe Interference)\n$ ping -c 3 192.168.1.1\nRequest timeout for icmp_seq 0\nRequest timeout for icmp_seq 1\n--- 192.168.1.1 ping statistics ---\n3 packets transmitted, 0 received, 100% packet loss`}
                  {selectedFaultId === "link" &&
                    `$ ethtool -S eth0 | grep -E "crc|fcs|drop"\nrx_crc_errors: 41820\nrx_frame_errors: 18402\nrx_dropped: 60222\n$ arp -a\n? (192.168.1.1) at (incomplete) on en0 ifscope [ethernet]`}
                  {selectedFaultId === "net" &&
                    `$ ping 1.1.1.1 -c 1\n64 bytes from 1.1.1.1: icmp_seq=0 ttl=58 time=14.2 ms\n$ nslookup netflix.com\n;; connection timed out; no servers could be reached\n;; SERVER: 192.168.1.1#53 - Refused`}
                  {selectedFaultId === "trans" &&
                    `$ ping netflix.com\n64 bytes from 198.38.118.1: icmp_seq=0 ttl=58 time=12.4 ms\n$ nc -zv 198.38.118.1 443\nnc: connectx to 198.38.118.1 port 443 (tcp) failed: Operation timed out`}
                  {selectedFaultId === "app" &&
                    `$ curl -I https://occ-0-1234.1.nflxso.net/video/chunk_001.mp4\nHTTP/2 403 Forbidden\nContent-Type: application/json\n\n{"error": "WIDEVINE_DRM_CERTIFICATE_EXPIRED", "device_revoked": true}`}
                </div>
              </div>

              {/* Deduction Analysis */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Engineering Deduction:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedFaultId === "phys" &&
                      "SNR is only 1 dB, so noise overwhelms the Wi-Fi signal. The failure is at Layer 1: bits cannot be recovered reliably."}
                    {selectedFaultId === "link" &&
                      "Bits arrive, but every frame fails its CRC. Layer 2 discards the corrupted frames before IP processing."}
                    {selectedFaultId === "net" &&
                      "Direct IP connectivity works, but DNS fails. The browser cannot translate netflix.com into an IP address."}
                    {selectedFaultId === "trans" &&
                      "Ping proves Layer 3 works. The firewall drops TCP SYN packets to port 443, so the Layer 4 handshake cannot start."}
                    {selectedFaultId === "app" &&
                      "Layers 1–4 work and Netflix receives the request. Playback fails at the application layer because the DRM certificate is expired."}
                  </p>
                </div>

                <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-xs">
                  <strong className="text-rose-900 block mb-1">
                    Key Syllabus Insight:
                  </strong>
                  <span className="text-rose-800 leading-relaxed">
                    Find the lowest failed layer first. Bits present + CRC
                    failures means a Layer 2 framing problem.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. INTERACTIVE UNDERSTANDING CHECKS (MCQS & MATCH THE FOLLOWING) */}
        {/* ========================================================================= */}
        <section id="checks" className="flex flex-col gap-6 scroll-mt-20">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Learning Evaluation
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Interactive Understanding Checks
            </h2>
            <p className="text-sm text-slate-600">
              Apply the Netflix journey to four exam-style questions, then match
              each concept to its real-world role.
            </p>
          </div>

          {/* PART A: SCENARIO-GROUNDED MCQS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Scenario-Based Conceptual Questions
                </h3>
                <span className="text-xs text-slate-500">
                  Select an answer to reveal immediate engineering feedback
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                4 Scenarios
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {[
                {
                  id: 0,
                  scenario: "Scenario 1: Network Failure Isolation",
                  question:
                    "The adapter receives bits, but every frame fails its 32-bit CRC and is dropped before IP processing. Which layer failed?",
                  options: [
                    "Layer 1: Physical Layer",
                    "Layer 2: Data Link Layer",
                    "Layer 3: Network Layer",
                    "Layer 4: Transport Layer",
                  ],
                  correct: 1,
                  explanation:
                    "Layer 1 received the bits. Layer 2 checks frame integrity with CRC/FCS and discards corrupted frames before Layer 3.",
                },
                {
                  id: 1,
                  scenario: "Scenario 2: Addressing Domains",
                  question:
                    "Why does the hostel floor switch forward frames using 48-bit MAC addresses, while the campus border router forwards packets using 32-bit IP addresses?",
                  options: [
                    "MAC addresses are faster to calculate with optical lasers than IP addresses.",
                    "Switches operate within a single local flat broadcast domain (LAN); routers interconnect distinct networks across a hierarchical global address space.",
                    "Switches only function over copper cables, whereas routers only function over wireless radio frequencies.",
                    "IP addresses cannot be stored in hardware RAM memory.",
                  ],
                  correct: 1,
                  explanation:
                    "MAC addresses support local-link delivery. Hierarchical IP addresses contain a network prefix and host ID, so routers can scale across networks.",
                },
                {
                  id: 2,
                  scenario: "Scenario 3: Modulation & Medium",
                  question:
                    "Why is a modem needed when digital data must cross an analog carrier medium?",
                  options: [
                    "It modulates digital bits onto a carrier suited to the medium and demodulates them at the receiver.",
                    "Modems are only required to encrypt passwords using TLS/SSL.",
                    "The ISP’s optical cables can only accept human-readable ASCII text files.",
                    "Routers do not possess electrical power converters.",
                  ],
                  correct: 0,
                  explanation:
                    "A modem maps bits onto a carrier using schemes such as QAM, PSK, or FSK, then recovers the bits at the destination.",
                },
                {
                  id: 3,
                  scenario: "Scenario 4: Signal Encoding Trade-Offs",
                  question:
                    "What does Manchester encoding gain over NRZ-L, and what does it cost?",
                  options: [
                    "Manchester tripled data throughput but increased CPU operating temperature.",
                    "A mid-bit transition improves clock synchronization and DC balance, but doubles the required baud rate.",
                    "Manchester eliminated the need for Ethernet cables completely.",
                    "Manchester allowed radio waves to pass through solid concrete barriers without attenuation.",
                  ],
                  correct: 1,
                  explanation:
                    "Manchester guarantees a mid-bit transition for clock recovery and DC balance. The trade-off is two signal intervals per bit, so baud rate = 2 × bit rate.",
                },
              ].map((mcq) => {
                const selected = mcqSelections[mcq.id];
                const isAnswered = selected !== undefined;
                return (
                  <div
                    key={mcq.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col gap-3"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                        {mcq.scenario}
                      </span>
                      <p className="text-sm font-semibold text-slate-900 mt-1">
                        {mcq.question}
                      </p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                      {mcq.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        const isCorrectOpt = optIdx === mcq.correct;
                        let btnStyle =
                          "bg-white border-slate-200 text-slate-700 hover:border-slate-300";

                        if (isAnswered) {
                          if (isCorrectOpt) {
                            btnStyle =
                              "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold";
                          } else if (isChosen && !isCorrectOpt) {
                            btnStyle =
                              "bg-rose-50 border-rose-400 text-rose-900 line-through";
                          } else {
                            btnStyle =
                              "bg-white/60 border-slate-200 text-slate-400 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isAnswered}
                            onClick={() =>
                              setMcqSelections((prev) => ({
                                ...prev,
                                [mcq.id]: optIdx,
                              }))
                            }
                            className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    {isAnswered && (
                      <div
                        className={`p-3.5 rounded-lg border text-xs leading-relaxed mt-2 ${
                          selected === mcq.correct
                            ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                            : "bg-rose-50/70 border-rose-200 text-rose-900"
                        }`}
                      >
                        <strong className="block mb-1">
                          {selected === mcq.correct
                            ? "✓ Correct Deduction"
                            : "✗ Review the Concept"}
                        </strong>
                        <p>{mcq.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* PART B: INTERACTIVE MATCH THE FOLLOWING */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Interactive Matching: Architecture to Netflix Reality
                </h3>
                <p className="text-xs text-slate-500">
                  Click a network element on the left, then click its
                  corresponding real-world responsibility on the right.
                </p>
              </div>
              <button
                onClick={() => {
                  setMatchPairs({});
                  setSelectedMatchLeft(null);
                  setShowMatchResults(false);
                }}
                className="self-start sm:self-auto text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Reset Matching
              </button>
            </div>

            {/* Matching Playground */}
            {(() => {
              const LEFT_ITEMS = [
                { id: "modem", label: "1. Modem (Modulator / Demodulator)" },
                { id: "switch", label: "2. Layer 2 Switch" },
                { id: "router", label: "3. Layer 3 Router" },
                { id: "gateway", label: "4. Application Gateway" },
                { id: "edge", label: "5. Network Edge" },
                { id: "media", label: "6. Transmission Media" },
              ];

              const RIGHT_ITEMS = [
                {
                  id: "A",
                  desc: "Forwards frames inside the hostel LAN using MAC addresses",
                },
                {
                  id: "B",
                  desc: "Maps digital bits to and from a carrier suited to the link",
                },
                {
                  id: "C",
                  desc: "Routes packets between networks using IP addresses",
                },
                {
                  id: "D",
                  desc: "Fiber, copper, or 5 GHz radio carrying physical signals",
                },
                {
                  id: "E",
                  desc: "Translates between different protocols or data formats",
                },
                {
                  id: "F",
                  desc: "Hosts where Netflix requests start and responses end",
                },
              ];

              const CORRECT_MAP: Record<string, string> = {
                modem: "B",
                switch: "A",
                router: "C",
                gateway: "E",
                edge: "F",
                media: "D",
              };

              const allMatched =
                Object.keys(matchPairs).length === LEFT_ITEMS.length;

              return (
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column (Items) */}
                    <div className="flex flex-col gap-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Unit 1 Architectural Element
                      </span>
                      {LEFT_ITEMS.map((item) => {
                        const isSelected = selectedMatchLeft === item.id;
                        const pairedRightId = matchPairs[item.id];
                        const isPaired = pairedRightId !== undefined;
                        const isCorrect =
                          isPaired && CORRECT_MAP[item.id] === pairedRightId;

                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedMatchLeft(null);
                              } else {
                                setSelectedMatchLeft(item.id);
                              }
                            }}
                            className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                              isSelected
                                ? "border-rose-500 bg-rose-50 ring-2 ring-rose-200 text-rose-900 font-semibold"
                                : isPaired
                                  ? showMatchResults
                                    ? isCorrect
                                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                                      : "border-rose-300 bg-rose-50 text-rose-900"
                                    : "border-slate-800 bg-slate-900 text-white font-medium"
                                  : "border-slate-200 bg-white hover:border-slate-300 text-slate-800"
                            }`}
                          >
                            <span>{item.label}</span>
                            {isPaired && (
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                  isSelected
                                    ? "bg-rose-200 text-rose-900"
                                    : "bg-slate-800 text-slate-200"
                                }`}
                              >
                                Linked → [{pairedRightId}]
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Column (Definitions/Roles) */}
                    <div className="flex flex-col gap-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Real-World Netflix Role / Mechanism
                      </span>
                      {RIGHT_ITEMS.map((item) => {
                        const linkedLeftId = Object.keys(matchPairs).find(
                          (k) => matchPairs[k] === item.id,
                        );
                        const isUsed = linkedLeftId !== undefined;

                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              if (selectedMatchLeft) {
                                setMatchPairs((prev) => ({
                                  ...prev,
                                  [selectedMatchLeft]: item.id,
                                }));
                                setSelectedMatchLeft(null);
                              } else if (linkedLeftId) {
                                // Unpair
                                const updated = { ...matchPairs };
                                delete updated[linkedLeftId];
                                setMatchPairs(updated);
                              }
                            }}
                            className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                              isUsed
                                ? "border-slate-700 bg-slate-50 text-slate-900 font-medium"
                                : selectedMatchLeft
                                  ? "border-dashed border-rose-300 bg-white hover:bg-rose-50/40 text-slate-700 cursor-pointer"
                                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-[10px] shrink-0 text-slate-700 mt-0.5">
                              {item.id}
                            </span>
                            <span className="leading-relaxed flex-1">
                              {item.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submission & Feedback Bar */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">
                        Matched: {Object.keys(matchPairs).length} of{" "}
                        {LEFT_ITEMS.length} items
                      </span>
                      {allMatched && !showMatchResults && (
                        <span className="text-rose-600 font-bold">
                          · Ready for evaluation
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={!allMatched}
                        onClick={() => setShowMatchResults(true)}
                        className="px-4 py-2 rounded-lg font-semibold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 transition-colors shadow-sm"
                      >
                        Verify Matches
                      </button>
                    </div>
                  </div>

                  {/* Results Banner */}
                  {showMatchResults && (
                    <div
                      className={`p-4 rounded-xl border text-xs leading-relaxed ${
                        Object.keys(matchPairs).every(
                          (k) => CORRECT_MAP[k] === matchPairs[k],
                        )
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                          : "bg-amber-50 border-amber-300 text-amber-900"
                      }`}
                    >
                      <strong className="block mb-1 font-bold text-sm">
                        {Object.keys(matchPairs).every(
                          (k) => CORRECT_MAP[k] === matchPairs[k],
                        )
                          ? "✓ Perfect Architectural Mapping!"
                          : "Some Pairs Need Adjustment"}
                      </strong>
                      <p>
                        Correct pairing alignment: 1-Modem → [B] Analog Carrier
                        Modulation; 2-Switch → [A] Local MAC Forwarding;
                        3-Router → [C] Inter-Network IP Routing; 4-Gateway → [E]
                        Protocol Translation; 5-Network Edge → [F] Laptop &
                        Netflix OCA; 6-Transmission Media → [D] Fiber & 5GHz
                        Radio Waves.
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. HYPOTHETICAL CASE STUDY GUARDRAILS & PEDAGOGICAL BOUNDARIES */}
        {/* ========================================================================= */}
        <section id="guardrails" className="flex flex-col gap-6 scroll-mt-20">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Academic Context & Scope
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Case Study Guardrails & Real-World Reality
            </h2>
            <p className="text-sm text-slate-600">
              The journey is simplified for learning. These four notes show what
              happens in a real Netflix network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guardrail 1: Encryption & DRM */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  1. End-to-End Encryption & DRM
                </h3>
              </div>
              <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                <p>
                  <strong>In this case:</strong> Requests are shown as readable
                  HTTP and manifest data.
                </p>
                <p>
                  <strong>In reality:</strong> TLS 1.3 encrypts the traffic,
                  while Widevine or FairPlay protects the video. Intermediate
                  routers forward using outer headers; they do not read the
                  video.
                </p>
              </div>
            </div>

            {/* Guardrail 2: Open Connect Edge Caching */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                  <Server className="w-4 h-4 text-rose-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  2. Open Connect Appliance (OCA) Direct Peering
                </h3>
              </div>
              <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                <p>
                  <strong>In this case:</strong> A long core path makes the
                  network core visible.
                </p>
                <p>
                  <strong>In reality:</strong> Open Connect Appliances are
                  placed inside or near ISPs, so much of the video traffic
                  travels from a nearby cache instead of a distant data center.
                </p>
              </div>
            </div>

            {/* Guardrail 3: Private Addressing & NAT */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                  <Network className="w-4 h-4 text-rose-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  3. Private Addressing & NAT (RFC 1918)
                </h3>
              </div>
              <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                <p>
                  <strong>In this case:</strong> The packet is shown with a
                  simple source-to-destination path.
                </p>
                <p>
                  <strong>In reality:</strong> The laptop usually has a private
                  address such as{" "}
                  <code className="font-mono text-[11px] text-slate-800">
                    192.168.1.42
                  </code>
                  . NAT or CGNAT maps it to a public IPv4 address; IPv6 may also
                  be available.
                </p>
              </div>
            </div>

            {/* Guardrail 4: Adaptive Bitrate Streaming (ABR) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
                  <Activity className="w-4 h-4 text-rose-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  4. Dynamic Adaptive Bitrate Streaming
                </h3>
              </div>
              <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                <p>
                  <strong>In this case:</strong> One video-chunk request is
                  followed.
                </p>
                <p>
                  <strong>In reality:</strong> Video is split into short chunks
                  at several quality levels. The player watches throughput and
                  buffer state, then raises or lowers quality as conditions
                  change.
                </p>
              </div>
            </div>
          </div>

          {/* Scope Statement Banner */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-rose-400 shrink-0" />
              <div className="text-xs leading-relaxed text-slate-300">
                <strong className="text-white block mb-0.5">
                  Unit 1 Educational Scope Boundary:
                </strong>
                Focus here on Edge/Core, nodes and links, media, modems,
                topologies, signal encoding, and the Internet/OSI layers. BGP,
                advanced congestion control, QUIC details, and MPLS belong to
                later units.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">
              Unit 1 Computer Networks
            </span>
            <span>·</span>
            <span>Case Study: What Happens When You Open Netflix?</span>
          </div>
          <div>Interactive EdTech Module</div>
        </div>
      </footer>
    </div>
  );
}
