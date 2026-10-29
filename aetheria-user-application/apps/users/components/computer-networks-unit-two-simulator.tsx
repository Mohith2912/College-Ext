'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Play, Pause, RotateCcw, ChevronRight, ChevronLeft,
  Server, Shield, Radio, ArrowRight, CheckCircle2,
  XCircle, AlertTriangle, Terminal, Network, Cpu,
  Layers, Database, Truck, Smartphone, Activity,
  BookOpen, Sparkles, Binary, Globe
} from 'lucide-react';

// --- AUTHENTIC AMAZON BRAND LOGO & ACCENTS ---
export function AmazonLogo({ className = "h-7" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      {/* Prime / Amazon Style Wordmark with iconic curved arrow smile */}
      <div className="relative inline-flex flex-col items-start leading-none">
        <div className="flex items-baseline font-black tracking-tight text-[#131921] text-xl font-sans">
          <span>amazon</span>
          <span className="text-[#FF9900] text-xs font-bold ml-1 font-mono tracking-normal">.transit</span>
        </div>
        {/* Amazon smile arrow vector */}
        <svg
          viewBox="0 0 100 24"
          className="w-16 h-3 text-[#FF9900] -mt-0.5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4C35 18 68 18 90 4c1.2-.8 2.5 1 1.4 2-24 16-60 16-81-1-1-1 0-2.4 1.6-1z" />
          <path d="M86 0c2 2 6 5 9 6-1 3-2 7-2 10 1-2 4-6 7-7-2-2-6-5-9-8-2-1-3-1-5-1z" />
        </svg>
      </div>
    </div>
  );
}

// --- DATA STRUCTURES & CONFIG ---

interface StageData {
  id: number;
  title: string;
  subtitle: string;
  layer: string;
  domain: string;
  device: string;
  pdu: string;
  physicalReality: string;
  engineeringMechanism: string;
  syllabusAnchor: string;
  wiresharkSnippet: string;
  telemetry: { label: string; value: string }[];
}

const STAGES: StageData[] = [
  {
    id: 1,
    title: "Phone Tap to Wi-Fi Access Port",
    subtitle: "802.11 Frame encapsulation to 802.3 Ethernet inside VLAN 10",
    layer: "Layer 1 - Physical / Layer 2 - Data Link",
    domain: "Local Edge Network",
    device: "Smartphone & Enterprise Wi-Fi 6 AP",
    pdu: "802.11 Radio Frame -> 802.3 Ethernet Frame",
    physicalReality: "You tap 'Buy Now' on the Amazon app. The phone's radio transceiver modulates electromagnetic signals over 5 GHz Wi-Fi to a nearby Access Point.",
    engineeringMechanism: "The AP decapsulates the 802.11 wireless frame and encapsulates it into an 802.3 Ethernet frame. The switch port is configured as an 'Access Port' mapped to VLAN 10 (Customer/Staff segment), restricting broadcast frames within this broadcast domain.",
    syllabusAnchor: "Access Ports assign un-tagged traffic to a specific broadcast domain (VLAN), providing network segmentation and isolating local broadcast traffic.",
    wiresharkSnippet: "Frame 1: 114 bytes on wire | IEEE 802.3 Ethernet II | Src: 3a:88:21:c4:90 (Phone) -> Dst: e0:cb:bc:12:34 (AP Gateway)",
    telemetry: [
      { label: "VLAN ID", value: "10 (Retail-Access)" },
      { label: "Port Type", value: "Untagged Access Port" },
      { label: "RSSI", value: "-58 dBm" },
      { label: "MTU", value: "1500 Bytes" }
    ]
  },
  {
    id: 2,
    title: "802.1Q Trunking & Inter-VLAN Routing",
    subtitle: "Multiplexed switch link with 4-byte 802.1Q tag to Layer 3 Switch",
    layer: "Layer 2 Switching / Layer 3 Routing",
    domain: "Campus Distribution Core",
    device: "Managed Layer 2/3 Switch Fabric",
    pdu: "Ethernet Frame with 802.1Q Tag (TPID 0x8100, VID 10)",
    physicalReality: "The packet must leave VLAN 10 to reach the local edge router and external default gateway. A single physical uplink carries multiple VLAN streams.",
    engineeringMechanism: "The distribution switch forwards the frame across an 802.1Q Trunk Port. A 4-byte VLAN tag (containing VLAN ID 10 and priority bits) is appended. The Layer 3 Switch reads the destination IP, strips the tag, and performs wire-speed Inter-VLAN routing via its SVI (Switched Virtual Interface).",
    syllabusAnchor: "Trunk ports multiplex multiple VLANs over a single link using IEEE 802.1Q tags; Layer 3 switches bridge broadcast domains without requiring external router-on-a-stick bottlenecks.",
    wiresharkSnippet: "802.1Q Virtual LAN, PRI: 0, DEI: 0, ID: 10, Type: IPv4 (0x0800)",
    telemetry: [
      { label: "Tag Standard", value: "IEEE 802.1Q" },
      { label: "Trunk Native VLAN", value: "VLAN 99" },
      { label: "SVI Interface", value: "Vlan10 (192.168.10.1)" },
      { label: "Forwarding", value: "Wire-Speed ASIC" }
    ]
  },
  {
    id: 3,
    title: "Edge Gateway & NAT / PAT Translation",
    subtitle: "Mapping Private RFC 1918 IPv4 (192.168.10.75) to Public IP + Ephemeral Port",
    layer: "Layer 3 Network / Layer 4 Transport",
    domain: "Network Boundary Gateway",
    device: "Border Edge Firewall / NAT Router",
    pdu: "IPv4 Packet: Src IP rewritten, TCP Src Port translated",
    physicalReality: "The phone possesses a non-routable private IPv4 address (192.168.10.75). Internet transit routers immediately drop RFC 1918 traffic.",
    engineeringMechanism: "The perimeter router executes Port Address Translation (PAT). It swaps `192.168.10.75:52341` with public address `198.51.100.4:41209`, updates the TCP checksum, and logs the translation in its stateful NAT table to route return packets back to the exact phone socket.",
    syllabusAnchor: "NAT and PAT conserve IPv4 address space by multiplexing hundreds of internal private hosts onto single public IP addresses using unique transport-layer port numbers.",
    wiresharkSnippet: "NAT: Translating 192.168.10.75:52341 -> 198.51.100.4:41209 to Dst 54.239.28.85:443",
    telemetry: [
      { label: "Inside Local", value: "192.168.10.75:52341" },
      { label: "Inside Global", value: "198.51.100.4:41209" },
      { label: "Outside Global", value: "54.239.28.85:443" },
      { label: "Protocol", value: "TCP (TLS 1.3)" }
    ]
  },
  {
    id: 4,
    title: "Internet Transit & BGP Path-Vector Routing",
    subtitle: "Autonomous System traversal from ISP AS7018 to Amazon AS16509",
    layer: "Layer 3 - Inter-Autonomous System Routing",
    domain: "Public Internet WAN",
    device: "Tier-1 Carrier Core Routers & IXP Switches",
    pdu: "IP Packet traversing BGP Border Gateways",
    physicalReality: "The packet journeys through fiber optic trunks across city IXPs (Internet Exchange Points), transitioning between distinct autonomous network operators.",
    engineeringMechanism: "Exterior Gateway Protocol BGP (Border Gateway Protocol) dictates the transit route. BGP evaluates the AS Path attribute (e.g., `AS7018 -> AS3356 -> AS16509`). Rather than counting raw hops, BGP uses path-vector policies, peering contracts, and prefix matching to select the stable path to Amazon's edge.",
    syllabusAnchor: "BGP coordinates internet-wide routing between independent Autonomous Systems (AS) using path-vector attributes like AS-PATH, ensuring loop-free policy routing across organizational borders.",
    wiresharkSnippet: "BGP UPDATE: Prefix 54.239.28.0/24 | Path: 7018 3356 16509 | Origin: IGP | Next Hop: 198.32.176.1",
    telemetry: [
      { label: "Source AS", value: "AS7018 (Carrier)" },
      { label: "Destination AS", value: "AS16509 (Amazon.com)" },
      { label: "BGP Path Length", value: "3 AS Hops" },
      { label: "Convergence Protocol", value: "eBGP Peering" }
    ]
  },
  {
    id: 5,
    title: "Amazon DC Edge & Multi-Area OSPF Fabric",
    subtitle: "Internal Gateway Protocol shortest-path Dijkstra routing in Area 0 / Area 20",
    layer: "Layer 3 - Interior Gateway Protocol",
    domain: "Amazon Cloud Data Center Edge",
    device: "Border Routers & Spine-Leaf OSPF Switches",
    pdu: "Encapsulated IP Packet routed through OSPF Area 0 to Area 20",
    physicalReality: "Inside Amazon's regional availability zone, tens of thousands of server racks must communicate with sub-millisecond latency and continuous link-state awareness.",
    engineeringMechanism: "Amazon runs multi-area OSPF (Open Shortest Path First). Border routers flood Link-State Advertisements (LSAs) into Backbone Area 0. Each internal router maintains an identical Link-State Database (LSDB) and computes the shortest loop-free path using Dijkstra's SPF algorithm to reach Area 20.",
    syllabusAnchor: "OSPF divides large enterprise networks into hierarchical areas to confine LSA flooding, optimize SPF calculation frequency, and achieve deterministic sub-second convergence during fiber cuts.",
    wiresharkSnippet: "OSPFv2: Link State Update | Area: 0.0.0.0 | Router ID: 10.240.0.1 | Advertised LSAs: 12",
    telemetry: [
      { label: "Routing Protocol", value: "OSPFv2 (Interior)" },
      { label: "OSPF Area", value: "Area 0 (Backbone) -> Area 20" },
      { label: "Metric Calculation", value: "Cost = 100 Mbps / Bandwidth" },
      { label: "Database State", value: "FULL / LSDB Synchronized" }
    ]
  },
  {
    id: 6,
    title: "Layer 3 ASIC Wire-Speed Switching",
    subtitle: "Hardware-level TCAM lookup & routing directly to Order Checkout Pod",
    layer: "Layer 3 / Layer 4 Hardware Forwarding",
    domain: "Data Center Compute Cluster",
    device: "Custom ASIC Spine Switches & Load Balancers",
    pdu: "TCP Segment: TLS Application Data (JSON payload: PlaceOrder)",
    physicalReality: "Massive scale demands processing millions of concurrent customer transactions per second without software CPU routing queues.",
    engineeringMechanism: "Spine and Leaf switches utilize ASICs (Application-Specific Integrated Circuits) with TCAM (Ternary Content-Addressable Memory). They perform IP routing lookups in a single clock cycle at 'wire speed' (400 Gbps). Network load balancers forward the packet to the active Order Microservice instance.",
    syllabusAnchor: "ASIC-powered Layer 3 switching offloads route lookup from host CPUs into dedicated silicon, enabling deterministic line-rate packet forwarding under peak load.",
    wiresharkSnippet: "TLSv1.3: Application Data Protocol: http/2 | Stream: POST /api/v3/checkout/commit",
    telemetry: [
      { label: "Switching Engine", value: "Silicon ASIC + TCAM" },
      { label: "Forwarding Delay", value: "< 450 nanoseconds" },
      { label: "Fabric Bandwidth", value: "400 Gbps Leaf-Spine" },
      { label: "Destination Port", value: "TCP 443 (mTLS)" }
    ]
  },
  {
    id: 7,
    title: "Distributed Order & Inventory Commit",
    subtitle: "ACID transaction across DynamoDB, Payment Tokenizer & Fulfillment Queue",
    layer: "Layer 7 - Application / Distributed Systems",
    domain: "Amazon Services Core",
    device: "Order Orchestrator & Distributed Database Clusters",
    pdu: "Database Transaction & SQS Fulfillment Message",
    physicalReality: "The order is authorized. Funds are tokenized through the payment processor, inventory is atomically decremented in warehouse tables, and a fulfillment ticket is dispatched.",
    engineeringMechanism: "The order microservice verifies payment authorization, creates an immutable order ledger entry in DynamoDB with two-phase commit semantics, and publishes an encrypted event to Amazon SQS directed to the nearest regional Fulfilment Centre.",
    syllabusAnchor: "Application-layer protocols rely on resilient underlying Layer 2-4 transport to execute distributed state synchronization and event-driven pipeline queues.",
    wiresharkSnippet: "HTTP/2 200 OK | Content-Type: application/json | {\"orderId\":\"114-88921-992\",\"status\":\"QUEUED_FULFILLMENT\"}",
    telemetry: [
      { label: "Order UUID", value: "AMZ-114-88921" },
      { label: "Payment Status", value: "Settled / Tokenized" },
      { label: "Queue Target", value: "FC-OAK4 (Tracy, CA)" },
      { label: "DB Latency", value: "2.1 ms" }
    ]
  },
  {
    id: 8,
    title: "Fulfilment Robotics to Doorstep Delivery",
    subtitle: "Warehouse robotic drive unit pick, sorting matrix, and Last-Mile telematics",
    layer: "Physical Telematics / Logistics Execution",
    domain: "Physical Fulfilment & Delivery Logistics",
    device: "Hercules Drive Units, Conveyor Scanners & Delivery Van Telematics",
    pdu: "Physical 2D Matrix Barcode (Spanner/Carton LPN)",
    physicalReality: "In the fulfillment center, autonomous Kiva robots lift the item's pod to a pack station. A barcode scanner validates the SKU, a box is labeled, and a delivery van routes it to your door.",
    engineeringMechanism: "Industrial IoT wireless networks guide the warehouse mobile drive units over dedicated 5 GHz RF channels. Barcode optical scanners log the package onto automated sorters. Real-time GPS telematics on the delivery van stream transit updates via cellular 4G/5G back to your phone.",
    syllabusAnchor: "End-to-end network architecture seamlessly integrates virtual bitstreams (VLANs, NAT, OSPF) with physical operational technologies (telematics, robotics, barcodes) to deliver tangible real-world outcomes.",
    wiresharkSnippet: "MQTT Publish: topic: telematics/delivery/van-488/gps | {\"lat\":37.7749,\"lng\":-122.4194,\"status\":\"OUT_FOR_DELIVERY\"}",
    telemetry: [
      { label: "Fulfilment Hub", value: "Amazon FC OAK4" },
      { label: "Robotic Unit", value: "Hercules Drive #412" },
      { label: "LPN Tracking", value: "spAMZ882199201" },
      { label: "Last-Mile Status", value: "Delivered to Doorstep" }
    ]
  }
];

// --- MAIN APPLICATION COMPONENT ---

type IntroSection = 'overview' | 'subnetting_expert' | 'vlan_l3' | 'nat_pat' | 'bgp_ospf' | 'asic_nitro';

export function ComputerNetworksUnitTwoSimulator() {
  const [activeTab, setActiveTab] = useState<'intro' | 'simulator' | 'subnetting' | 'nat' | 'routing' | 'wireshark' | 'matrix' | 'lab' | 'quizzes'>('intro');
  const [activeIntroSection, setActiveIntroSection] = useState<'overview' | 'subnetting_expert' | 'vlan_l3' | 'nat_pat' | 'bgp_ospf' | 'asic_nitro'>('overview');
  
  // 1. Simulator State
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed] = useState<number>(3500); // 3.5s per stage

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStageIdx(prev => (prev < STAGES.length - 1 ? prev + 1 : 0));
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  const currentStage = STAGES[currentStageIdx];

  // 2. Subnetting / CIDR State (Initial matching genui prompt)
  const [ipOctets, setIpOctets] = useState<[number, number, number, number]>([192, 168, 10, 75]);
  const [prefixLength, setPrefixLength] = useState<number>(26);

  // Subnetting math calculations
  const subnetCalculations = useMemo(() => {
    const p = Math.max(8, Math.min(30, prefixLength));
    const totalBits = 32;
    const hostBits = totalBits - p;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = hostBits > 1 ? totalHosts - 2 : 0;

    // Mask calculation
    const maskNum = (0xFFFFFFFF << (32 - p)) >>> 0;
    const m1 = (maskNum >>> 24) & 255;
    const m2 = (maskNum >>> 16) & 255;
    const m3 = (maskNum >>> 8) & 255;
    const m4 = maskNum & 255;

    // IP to 32-bit int
    const ipNum = ((ipOctets[0] << 24) | (ipOctets[1] << 16) | (ipOctets[2] << 8) | ipOctets[3]) >>> 0;
    const netNum = (ipNum & maskNum) >>> 0;
    const bcastNum = (netNum | (~maskNum >>> 0)) >>> 0;

    const netIp = `${(netNum >>> 24) & 255}.${(netNum >>> 16) & 255}.${(netNum >>> 8) & 255}.${netNum & 255}`;
    const bcastIp = `${(bcastNum >>> 24) & 255}.${(bcastNum >>> 16) & 255}.${(bcastNum >>> 8) & 255}.${bcastNum & 255}`;

    const firstUsableNum = (netNum + 1) >>> 0;
    const lastUsableNum = (bcastNum - 1) >>> 0;
    const firstUsable = usableHosts > 0 ? `${(firstUsableNum >>> 24) & 255}.${(firstUsableNum >>> 16) & 255}.${(firstUsableNum >>> 8) & 255}.${firstUsableNum & 255}` : 'N/A';
    const lastUsable = usableHosts > 0 ? `${(lastUsableNum >>> 24) & 255}.${(lastUsableNum >>> 16) & 255}.${(lastUsableNum >>> 8) & 255}.${lastUsableNum & 255}` : 'N/A';

    // Binary representation
    const ipBinary = ipOctets.map(o => o.toString(2).padStart(8, '0')).join('.');
    const maskBinary = [m1, m2, m3, m4].map(o => o.toString(2).padStart(8, '0')).join('.');

    return {
      prefix: p,
      mask: `${m1}.${m2}.${m3}.${m4}`,
      netIp,
      bcastIp,
      firstUsable,
      lastUsable,
      totalHosts,
      usableHosts,
      ipBinary,
      maskBinary,
      hostBits
    };
  }, [ipOctets, prefixLength]);

  // 3. NAT Table State
  interface NatEntry {
    id: string;
    clientName: string;
    insideLocal: string;
    insideGlobal: string;
    outsideGlobal: string;
    protocol: string;
    state: string;
  }

  const [natTable, setNatTable] = useState<NatEntry[]>([
    {
      id: "nat-1",
      clientName: "Customer iPhone (Amazon App)",
      insideLocal: "192.168.10.75:52341",
      insideGlobal: "198.51.100.4:41209",
      outsideGlobal: "54.239.28.85:443",
      protocol: "TCP",
      state: "ESTABLISHED"
    },
    {
      id: "nat-2",
      clientName: "Smart TV (Prime Video)",
      insideLocal: "192.168.10.12:49811",
      insideGlobal: "198.51.100.4:41210",
      outsideGlobal: "52.84.14.99:443",
      protocol: "TCP",
      state: "ESTABLISHED"
    },
    {
      id: "nat-3",
      clientName: "Laptop (DNS Lookup)",
      insideLocal: "192.168.10.44:60114",
      insideGlobal: "198.51.100.4:53012",
      outsideGlobal: "8.8.8.8:53",
      protocol: "UDP",
      state: "CLOSED"
    }
  ]);

  const [nextPort, setNextPort] = useState<number>(41211);

  const addNatSession = (clientLabel: string, localIp: string) => {
    const randomLocalPort = Math.floor(40000 + Math.random() * 20000);
    const newEntry: NatEntry = {
      id: `nat-${Date.now()}`,
      clientName: clientLabel,
      insideLocal: `${localIp}:${randomLocalPort}`,
      insideGlobal: `198.51.100.4:${nextPort}`,
      outsideGlobal: "54.239.28.85:443",
      protocol: "TCP",
      state: "ESTABLISHED"
    };
    setNextPort(prev => prev + 1);
    setNatTable(prev => [newEntry, ...prev.slice(0, 7)]);
  };

  // 4. Routing & Topology Failure Sandbox
  const [linkStates, setLinkStates] = useState<{ [key: string]: boolean }>({
    "isp1-amz": true,
    "isp2-amz": true,
    "ospf-spine1": true,
    "ospf-spine2": true,
    "trunk-link": true
  });
  const [convergenceLog, setConvergenceLog] = useState<string[]>([]);

  const toggleLink = (linkKey: string, description: string) => {
    setLinkStates(prev => {
      const newState = !prev[linkKey];
      const logEntry = newState
        ? `[RESTORED] ${description}: SPF recalculation triggered. Link state: UP. Cost normalized.`
        : `[FAILURE] ${description}: Link state: DOWN! LSA Flooding initiated. Alternate path converging via secondary adjacency.`;
      setConvergenceLog(curr => [logEntry, ...curr.slice(0, 5)]);
      return { ...prev, [linkKey]: newState };
    });
  };

  // 5. Diagnostic Lab Scenarios
  interface LabScenario {
    id: string;
    title: string;
    symptom: string;
    terminalCommand: string;
    terminalOutput: string;
    deduction: string;
    remediation: string;
    resolved: boolean;
  }

  const [labScenarios, setLabScenarios] = useState<LabScenario[]>([
    {
      id: "lab-1",
      title: "Case A: Wi-Fi Connected, Local LAN Ping Works, Order Fails with SYN_SENT Timeout",
      symptom: "Device receives DHCP lease on 192.168.10.75, can ping default gateway 192.168.10.1, but fails to reach https://amazon.com.",
      terminalCommand: "show ip nat translations | count",
      terminalOutput: `Router# show ip nat translations | count
Total active translations: 65,535
Router# show ip nat statistics
Total translations: 65535 (0 static, 65535 dynamic, 65535 extended)
Outside interfaces: GigabitEthernet0/0/0
Inside interfaces: GigabitEthernet0/0/1
Hits: 1849201  Misses: 49201
Expired translations: 0
Dynamic mappings:
-- Inside Source
[Id: 1] access-list NAT_ACL pool OVERLOAD refcount 65535
% NAT-6-PORT_EXHAUSTION: Ephemeral PAT ports on 198.51.100.4 completely depleted. Dropping new outbound SYN packet from 192.168.10.75:52341`,
      deduction: "The edge gateway's single public IPv4 address has saturated all 65,535 available 16-bit transport ports due to lingering stale TCP sessions, causing PAT port starvation.",
      remediation: "Configure a larger NAT address pool (e.g. 198.51.100.4 - 198.51.100.7), shorten UDP/TCP idle session timeouts (`ip nat translation timeout 300`), and enable Carrier-Grade NAT (CGNAT) or IPv6 dual-stack.",
      resolved: false
    },
    {
      id: "lab-2",
      title: "Case B: 802.1Q Native VLAN Mismatch Leaking Packets",
      symptom: "Customer devices on VLAN 10 suddenly receive spanning tree errors and lose connectivity to the distribution Layer 3 switch.",
      terminalCommand: "show interfaces trunk",
      terminalOutput: `Switch-A# show interfaces trunk
Port        Mode             Encapsulation  Status        Native vlan
Gi0/1       on               802.1q         trunking      10
Switch-B# show interfaces trunk
Port        Mode             Encapsulation  Status        Native vlan
Gi0/1       on               802.1q         trunking      99

%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/1 (10), with Switch-B GigabitEthernet0/1 (99).
%SPANTREE-2-BLOCK_CONSISTENCY: Blocking Gi0/1 on VLAN 10. Inconsistent port type.`,
      deduction: "Switch-A expects untagged native traffic to be VLAN 10, whereas Switch-B configured native VLAN 99. Spanning Tree Protocol (PVST+) detects native VLAN leakage and err-disables the link to prevent loops.",
      remediation: "Align the native VLAN configurations on both sides of the 802.1Q trunk: `interface Gi0/1; switchport trunk native vlan 99` on Switch-A.",
      resolved: false
    },
    {
      id: "lab-3",
      title: "Case C: OSPF Adjacency Stuck in EXSTART / EXCHANGE State",
      symptom: "Amazon internal distribution router cannot populate its routing table with the new Server Pod routes in Area 20.",
      terminalCommand: "show ip ospf neighbor Gi0/0/2",
      terminalOutput: `Router-Core# show ip ospf neighbor Gi0/0/2
Neighbor ID     Pri   State           Dead Time   Address         Interface
10.240.20.1       1   EXSTART/  -     00:00:34    10.240.20.1     GigabitEthernet0/0/2

Router-Core# debug ip ospf adj
OSPF: Receive DBD from 10.240.20.1 on Gi0/0/2 seq 0x1A2 opt 0x52 flag 0x7 len 1480 mtu 9000
OSPF: Mismatched MTU detected! Local interface MTU is 1500, received neighbor MTU is 9000.
OSPF: Cannot proceed to LOADING/FULL state. DBD exchange stalled.`,
      deduction: "The neighbor router is configured with Jumbo Frames (MTU 9000), while the local interface operates at standard Ethernet MTU 1500. OSPF validates MTU in Database Description (DBD) packets to ensure large LSAs will not cause fragmented packet drops.",
      remediation: "Match MTU across both router interfaces: `interface Gi0/0/2; ip mtu 9000` or temporarily use `ip ospf mtu-ignore` during planned migrations.",
      resolved: false
    },
    {
      id: "lab-4",
      title: "Case D: BGP AS Path Prepend & Route Flapping Blackhole",
      symptom: "Outbound customer traffic reaches ISP 1, but return packets from Amazon AS16509 are routed into a dropped interface.",
      terminalCommand: "show ip bgp 54.239.28.0/24",
      terminalOutput: `Edge-Router# show ip bgp 54.239.28.0/24
BGP routing table entry for 54.239.28.0/24, version 48201
Paths: (2 available, best #2)
  Advertised to update-groups: 1
  7018 3356 16509 16509 16509 16509 (Path length: 6)
    198.32.176.1 from 198.32.176.1 (AS7018)
      Origin IGP, metric 0, localpref 100, valid, external
  174 16509 (Path length: 2, BEST)
    198.32.200.5 from 198.32.200.5 (AS174)
      Origin IGP, metric 0, localpref 100, valid, external, best

%BGP-5-ADJCHANGE: neighbor 198.32.200.5 Down - Hold Timer Expired (BGP Flap)`,
      deduction: "The preferred BGP path via AS174 experienced a hold timer expiration (keepalive loss), triggering route flapping. The backup path contains multiple AS Path prepends intentionally dampening failover.",
      remediation: "Enable Bidirectional Forwarding Detection (BFD) for sub-second BGP neighbor failure detection, verify carrier peering SLAs, and adjust BGP MED/Local-Preference attributes.",
      resolved: false
    }
  ]);

  const markLabResolved = (id: string) => {
    setLabScenarios(prev =>
      prev.map(lab => (lab.id === id ? { ...lab, resolved: !lab.resolved } : lab))
    );
  };

  // 6. Interactive MCQs
  interface Question {
    id: number;
    scenario: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    distractorBreakdowns: string[];
  }

  const QUESTIONS: Question[] = [
    {
      id: 1,
      scenario: "During the Amazon checkout transaction, a customer device has IP 192.168.10.75. When the packet exits the customer's home gateway, the source IP in the IP header is altered to 198.51.100.4, and the source port is changed from 52341 to 41209.",
      question: "Which mechanism executed this modification, and what is its primary operational benefit?",
      options: [
        "IEEE 802.1Q tagging; it inserts a 4-byte priority header to prioritize payment packets.",
        "Port Address Translation (PAT); it allows thousands of private IP hosts to share a single public IP by multiplexing transport-layer ports.",
        "OSPF Multi-Area summarization; it consolidates link-state databases across autonomous systems.",
        "BGP Path-Vector rewriting; it strips carrier autonomous numbers to shorten the AS Path."
      ],
      correctIndex: 1,
      explanation: "Correct! PAT (Port Address Translation / NAT Overload) translates private RFC 1918 addresses into a single public address by assigning unique source port numbers, mitigating IPv4 exhaustion.",
      distractorBreakdowns: [
        "802.1Q operates at Layer 2 to tag VLAN IDs, not Layer 3/4 IP/Port addresses.",
        "OSPF is an Interior Gateway Protocol calculating SPF trees; it does not translate host IP addresses.",
        "BGP exchanges AS paths between Autonomous Systems; it does not alter host source IP socket ports."
      ]
    },
    {
      id: 2,
      scenario: "A switch port connecting a warehouse handheld barcode scanner is configured as a standard Access Port. Another port connecting Switch-A to Switch-B carries traffic for VLAN 10 (Scanners), VLAN 20 (Robotics), and VLAN 30 (Management).",
      question: "What differentiates the frame headers traversing the Access Port versus the Trunk Port?",
      options: [
        "Frames on the access port use IPv6, while frames on the trunk port are restricted to IPv4.",
        "The access port frame contains an extra 16-byte BGP path attribute.",
        "Frames across the trunk port contain a 4-byte IEEE 802.1Q tag (TPID 0x8100 + VLAN ID) to distinguish broadcast domains; access port frames are untagged.",
        "Frames on the trunk port strip all TCP/UDP payload headers to increase MTU throughput."
      ],
      correctIndex: 2,
      explanation: "Correct! IEEE 802.1Q inserts a 4-byte tag into Ethernet frames across trunk links so receiving switches can identify which VLAN each frame belongs to. Access ports connect to end hosts and do not require tags.",
      distractorBreakdowns: [
        "VLAN framing is protocol-agnostic and carries both IPv4 and IPv6 transparently.",
        "BGP operates between autonomous system routers, not local Layer 2 switch trunks.",
        "Trunking maintains complete Layer 3/4/7 payload integrity without stripping transport headers."
      ]
    },
    {
      id: 3,
      scenario: "Within Amazon's data center fabric, OSPF is divided into Area 0 (Backbone) and Area 20 (Server Pods). A fiber link between two internal distribution routers is accidentally severed.",
      question: "How does OSPF maintain connectivity and prevent persistent routing loops?",
      options: [
        "Routers flood updated Link-State Advertisements (LSAs), synchronize their LSDB, and re-run Dijkstra's SPF algorithm to calculate the next-lowest metric path.",
        "The edge router automatically queries the client's phone for an alternative IP route.",
        "OSPF converts all connections to classful routing and halts packet delivery until manual administrator intervention.",
        "The routers perform ARP broadcasts to all internet autonomous systems."
      ],
      correctIndex: 0,
      explanation: "Correct! OSPF is a link-state protocol. When a topology change occurs, routers flood LSAs, update their Link-State Database (LSDB), and execute the Shortest Path First (SPF) Dijkstra algorithm to converge on alternate paths.",
      distractorBreakdowns: [
        "End-user client phones have no awareness of internal datacenter topology or routing state.",
        "OSPF is inherently classless (supporting CIDR/VLSM); it never reverts to classful routing.",
        "ARP broadcasts are strictly confined to local Layer 2 broadcast domains, never across OSPF routers."
      ]
    },
    {
      id: 4,
      scenario: "When routing between the customer's ISP (AS7018) and Amazon's global network (AS16509), network architects deploy BGP instead of OSPF.",
      question: "What makes BGP fundamentally better suited for inter-autonomous system internet transit than OSPF?",
      options: [
        "OSPF cannot run on fiber optic cables, while BGP is designed for fiber optics.",
        "BGP is a path-vector protocol that enforces organizational routing policies and AS-Path loop avoidance without requiring every global router to store the full link-state topology of every competitor.",
        "BGP operates exclusively at the Physical layer (Layer 1) to eliminate electrical impedance.",
        "OSPF requires every router to have the exact same MAC address."
      ],
      correctIndex: 1,
      explanation: "Correct! OSPF requires every router in an area to maintain the exact same link-state topology (LSDB), which cannot scale to the 900,000+ prefixes of the global internet. BGP uses path vectors (AS-PATH) and policy metrics to exchange reachability between untrusted, independent Autonomous Systems.",
      distractorBreakdowns: [
        "Both protocols run over standard IP transport across any physical medium.",
        "BGP operates at Layer 7 / Layer 4 (TCP port 179), not Layer 1.",
        "Routers never share identical MAC addresses; each interface has a unique Layer 2 hardware address."
      ]
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number | null }>({});
  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  // 7. Interactive Match the Following
  interface MatchItem {
    id: string;
    concept: string;
    mechanism: string;
    description: string;
  }

  const MATCH_DATA: MatchItem[] = [
    {
      id: "m-1",
      concept: "IEEE 802.1Q Trunking",
      mechanism: "Multiplexing multiple VLANs over a single inter-switch uplink via 4-byte header tag",
      description: "Tags frames with VLAN ID (VID) between switches"
    },
    {
      id: "m-2",
      concept: "Port Address Translation (PAT)",
      mechanism: "Rewriting private host IP/port to a single public IP to traverse the public Internet",
      description: "Overcomes IPv4 scarcity via ephemeral source port allocation"
    },
    {
      id: "m-3",
      concept: "Border Gateway Protocol (BGP)",
      mechanism: "Exchanging reachability across Autonomous Systems using AS-PATH policy vector",
      description: "Exterior Gateway Protocol connecting ISP AS7018 to Amazon AS16509"
    },
    {
      id: "m-4",
      concept: "OSPF Multi-Area & LSDB",
      mechanism: "Flooding LSAs and running Dijkstra SPF algorithm to determine sub-millisecond DC routes",
      description: "Interior Gateway Protocol scaling data center pods"
    },
    {
      id: "m-5",
      concept: "ASIC Hardware Switching",
      mechanism: "Performing single-clock-cycle TCAM route lookups at wire-speed without CPU overhead",
      description: "Custom silicon processing 400 Gbps Amazon leaf-spine traffic"
    },
    {
      id: "m-6",
      concept: "Classless Inter-Domain Routing (CIDR)",
      mechanism: "Allocating IP blocks with variable-length masks (/26, /24, /30) to eliminate classful waste",
      description: "Flexible host division for warehouse subnets and point-to-point links"
    }
  ];

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [userPairs, setUserPairs] = useState<{ [leftId: string]: string }>({});
  const [matchEvaluation, setMatchEvaluation] = useState<boolean | null>(null);

  const handlePairClick = (type: 'left' | 'right', id: string) => {
    setMatchEvaluation(null);
    if (type === 'left') {
      setSelectedLeft(id);
    } else {
      if (selectedLeft) {
        setUserPairs(prev => ({ ...prev, [selectedLeft]: id }));
        setSelectedLeft(null);
      }
    }
  };

  const removePair = (leftId: string) => {
    setMatchEvaluation(null);
    setUserPairs(prev => {
      const copy = { ...prev };
      delete copy[leftId];
      return copy;
    });
  };

  const evaluateMatching = () => {
    let allCorrect = true;
    if (Object.keys(userPairs).length < MATCH_DATA.length) {
      allCorrect = false;
    } else {
      for (const item of MATCH_DATA) {
        if (userPairs[item.id] !== item.id) {
          allCorrect = false;
          break;
        }
      }
    }
    setMatchEvaluation(allCorrect);
  };

  const resetMatching = () => {
    setUserPairs({});
    setSelectedLeft(null);
    setMatchEvaluation(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* ============================================================ */}
      {/* 3-ZONE HEADER CONTRACT WITH AMAZON BRAND IDENTITY */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-[#131921] text-white border-b border-[#232F3E] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Amazon Wordmark Logo + Unit Title */}
          <div className="flex items-center gap-3">
            <div className="bg-white px-2 py-1 rounded-md flex items-center shadow-xs">
              <AmazonLogo />
            </div>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">|</span>
            <span className="text-xs text-slate-300 font-medium hidden sm:inline">
              Unit 2 · Global Transit Architecture: Phone to Door
            </span>
          </div>

          {/* Zone 2: Clean Navigation Links */}
          <nav className="hidden 2xl:flex items-center gap-1 text-xs font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('intro')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'intro'
                  ? 'text-[#131921] font-bold bg-[#FF9900] shadow-xs'
                  : 'hover:text-[#FF9900] hover:bg-[#232F3E]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              SDR Architectural Brief
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'simulator'
                  ? 'text-[#131921] font-bold bg-[#FF9900] shadow-xs'
                  : 'hover:text-[#FF9900] hover:bg-[#232F3E]'
              }`}
            >
              Transit Pipeline
            </button>
            <button
              onClick={() => setActiveTab('subnetting')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'subnetting'
                  ? 'text-[#131921] font-bold bg-[#FF9900] shadow-xs'
                  : 'hover:text-[#FF9900] hover:bg-[#232F3E]'
              }`}
            >
              CIDR / Subnetting
            </button>
            <button
              onClick={() => setActiveTab('nat')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'nat'
                  ? 'text-[#131921] font-bold bg-[#FF9900] shadow-xs'
                  : 'hover:text-[#FF9900] hover:bg-[#232F3E]'
              }`}
            >
              NAT / PAT
            </button>
            <button
              onClick={() => setActiveTab('routing')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'routing'
                  ? 'text-[#131921] font-bold bg-[#FF9900] shadow-xs'
                  : 'hover:text-[#FF9900] hover:bg-[#232F3E]'
              }`}
            >
              OSPF &amp; BGP
            </button>
            <button
              onClick={() => setActiveTab('wireshark')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'wireshark'
                  ? 'text-[#131921] font-bold bg-[#FF9900] shadow-xs'
                  : 'hover:text-[#FF9900] hover:bg-[#232F3E]'
              }`}
            >
              Encapsulation
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'matrix'
                  ? 'text-[#131921] font-bold bg-[#FF9900] shadow-xs'
                  : 'hover:text-[#FF9900] hover:bg-[#232F3E]'
              }`}
            >
              Matrix
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'lab'
                  ? 'text-[#131921] font-bold bg-[#FF9900] shadow-xs'
                  : 'hover:text-[#FF9900] hover:bg-[#232F3E]'
              }`}
            >
              Diagnostic Lab
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'quizzes'
                  ? 'text-[#131921] font-bold bg-[#FF9900] shadow-xs'
                  : 'hover:text-[#FF9900] hover:bg-[#232F3E]'
              }`}
            >
              Checks
            </button>
          </nav>

          {/* Zone 3: Quick Action */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-amber-400 font-mono hidden lg:inline bg-[#232F3E] px-2.5 py-1 rounded">
              AWS / Core Edge v3.4
            </span>
            <button
              onClick={() => setActiveTab('simulator')}
              className="px-3.5 py-1.5 text-xs font-bold text-[#131921] bg-[#FF9900] hover:bg-[#ffad33] rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 text-[#131921] fill-current" />
              Launch Pipeline
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MOBILE NAV STRIP */}
      {/* ============================================================ */}
      <div className="2xl:hidden bg-[#131921] border-b border-[#232F3E] px-4 py-2 overflow-x-auto flex gap-2">
        {(['intro', 'simulator', 'subnetting', 'nat', 'routing', 'wireshark', 'matrix', 'lab', 'quizzes'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-[#FF9900] text-[#131921] font-bold'
                : 'bg-[#232F3E] text-slate-300'
            }`}
          >
            {tab === 'intro' && '0. SDR Architecture'}
            {tab === 'simulator' && '1. Pipeline'}
            {tab === 'subnetting' && '2. Subnetting'}
            {tab === 'nat' && '3. NAT / PAT'}
            {tab === 'routing' && '4. Routing Sandbox'}
            {tab === 'wireshark' && '5. Encapsulation'}
            {tab === 'matrix' && '6. Architecture Matrix'}
            {tab === 'lab' && '7. Diagnostic Lab'}
            {tab === 'quizzes' && '8. Checks'}
          </button>
        ))}
      </div>

      {/* ============================================================ */}
      {/* MAIN VIEWPORT CONTAINER */}
      {/* ============================================================ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-10">

        {/* ------------------------------------------------------------ */}
        {/* HERO EDITORIAL KICKER WITH AMAZON SQUID INK / AMBER PALETTE */}
        {/* ------------------------------------------------------------ */}
        <section className="border-b border-slate-200 pb-6 bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9900] via-[#146EB4] to-[#131921]" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-[#131921] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#FF9900] animate-pulse"></span>
                Amazon Cloud Infrastructure &amp; Logistics Systems Design · Unit 2
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131921]">
                How Amazon Delivers Your Order From Phone to Door
              </h1>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                An end-to-end engineering dissection: Software-Defined Radio (SDR) physical modulation, IEEE 802.1Q VLAN encapsulation, CIDR / VLSM mathematical partitioning, RFC 1918 PAT socket multiplexing, carrier BGP path-vector peering, AWS multi-area OSPF internal fabrics, and wire-speed ASIC forwarding to physical robotics fulfillment.
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Globe className="w-3.5 h-3.5 text-[#146EB4]" />
                <span>Autonomous System: <strong>AS16509 (Amazon.com)</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Radio className="w-3.5 h-3.5 text-[#FF9900]" />
                <span>Radio &amp; Subnet: <strong>5GHz OFDM / VLSM /26</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* 0. EXPERT SDR & SUBNETTING ARCHITECTURAL BRIEF */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'intro' && (
          <section className="space-y-6">
            {/* Executive Summary Card */}
            <div className="bg-[#131921] text-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#232F3E]">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#232F3E] pb-6 mb-6">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF9900] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Senior Infrastructure Architect &amp; SDR Staff Engineer Brief
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    How &amp; Why It Works: The Invisible Physics and Protocol Machinery
                  </h2>
                  <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                    When you tap "Buy Now" on Amazon, you initiate one of the most sophisticated distributed synchronization pipelines in human history. Here is the rigorous engineering foundation behind each domain.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTab('simulator')}
                    className="px-4 py-2 bg-[#FF9900] hover:bg-[#ffad33] text-[#131921] font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <span>Inspect Pipeline in Action</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#131921]" />
                  </button>
                </div>
              </div>

              {/* Sub-section Navigation Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { id: 'overview', label: '1. SDR & Physical RF', icon: Radio },
                  { id: 'subnetting_expert', label: '2. Subnetting & CIDR', icon: Binary },
                  { id: 'vlan_l3', label: '3. VLANs & 802.1Q', icon: Layers },
                  { id: 'nat_pat', label: '4. NAT / PAT Sockets', icon: Shield },
                  { id: 'bgp_ospf', label: '5. BGP & OSPF SPF', icon: Network },
                  { id: 'asic_nitro', label: '6. ASIC & Hardware', icon: Cpu },
                ].map(item => {
                  const Icon = item.icon;
                  const isSel = activeIntroSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIntroSection(item.id as IntroSection)}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSel
                          ? 'bg-[#232F3E] border-[#FF9900] text-white shadow-xs'
                          : 'bg-[#1b222d] border-[#2b3749] text-slate-400 hover:text-slate-200 hover:bg-[#202937]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-2 ${isSel ? 'text-[#FF9900]' : 'text-slate-400'}`} />
                      <span className="text-xs font-semibold leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deep-Dive Architectural Explanations */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-8">
              {activeIntroSection === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#FF9900]">
                      <Radio className="w-5 h-5 text-[#FF9900]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#131921]">
                        1. Software-Defined Radio (SDR) &amp; Physical RF Modulation
                      </h3>
                      <p className="text-xs text-slate-500">
                        How binary payload bits transform into high-frequency electromagnetic waves and cross physical airspaces.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          How It Works: OFDM &amp; 1024-QAM Constellations
                        </span>
                        A phone's baseband processor passes digital bytes to a Software-Defined Radio (SDR) or RF transceiver chip. The bits are modulated onto 5 GHz radio frequencies using <strong>Orthogonal Frequency Division Multiplexing (OFDM)</strong> and <strong>1024-QAM</strong> (Quadrature Amplitude Modulation), encoding 10 bits per constellation symbol across hundreds of subcarriers.
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          Why It Works: Mathematical Channel Estimation &amp; CSMA/CA
                        </span>
                        Air is a shared, hostile medium prone to reflection, fading, and interference. Wi-Fi uses <strong>CSMA/CA</strong> (Carrier Sense Multiple Access with Collision Avoidance) to listen before transmitting, while MIMO (Multiple-Input Multiple-Output) beamforming shapes RF energy directly toward the access point's antennas.
                      </div>
                    </div>

                    <div className="bg-[#131921] text-slate-200 p-5 rounded-xl border border-[#232F3E] flex flex-col justify-between font-mono text-xs">
                      <div>
                        <div className="text-[10px] text-[#FF9900] uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                          <span>SDR Physical Layer Demodulation Trace</span>
                          <span>Wi-Fi 6 (802.11ax)</span>
                        </div>
                        <div className="space-y-1.5 text-[11px] text-slate-300">
                          <div><span className="text-slate-500">Carrier Freq:</span> 5.180 GHz (UNII-1 Ch 36, 80MHz BW)</div>
                          <div><span className="text-slate-500">SDR Modulation:</span> 1024-QAM (10 bits/symbol)</div>
                          <div><span className="text-slate-500">Subcarrier Spacing:</span> 78.125 kHz (HE-OFDM 1024-FFT)</div>
                          <div><span className="text-slate-500">MIMO Spatial Streams:</span> 2x2:2 MU-MIMO Beamformed</div>
                          <div><span className="text-slate-500">Guard Interval:</span> 0.8 us (Cyclic Prefix)</div>
                          <div><span className="text-slate-500">RSSI / SNR:</span> -58 dBm / 36 dB (Pristine SNR)</div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-[#232F3E] text-[10px] text-[#FF9900]">
                        Result: 1,500 bytes decoded from RF phase angles in under 42 microseconds.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeIntroSection === 'subnetting_expert' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#146EB4]">
                      <Binary className="w-5 h-5 text-[#146EB4]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#131921]">
                        2. IPv4 Subnetting, CIDR &amp; VLSM: The Expert Mathematical Reality
                      </h3>
                      <p className="text-xs text-slate-500">
                        Why IP addresses are broken down into prefix lengths and how bitmasking drives all routing table decisions.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          How It Works: Prefix Masking &amp; Binary Boundary
                        </span>
                        Every IPv4 address is an unsigned 32-bit integer. A <strong>CIDR (Classless Inter-Domain Routing)</strong> prefix length like <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">/26</code> splits this 32-bit field into two distinct regions:
                        <ul className="list-disc pl-4 mt-2 space-y-1 text-slate-600">
                          <li><strong>Network Bits (first 26 bits):</strong> Fixed identifier common to all devices in this broadcast domain.</li>
                          <li><strong>Host Bits (remaining 6 bits):</strong> Available for individual host interfaces ($2^6 = 64$ total, minus 2 reserved = 62 usable).</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          Why It Works: Variable-Length Subnet Masking (VLSM)
                        </span>
                        Traditional classful addressing (Class A, B, C) was disastrously wasteful—a company needing 300 hosts had to take an entire Class B block (65,534 hosts), wasting 99.5% of the block. <strong>VLSM</strong> allows Amazon to tailor subnets precisely: an access VLAN receives a <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">/26</code> (62 hosts), a warehouse robot cluster gets a <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">/23</code> (510 hosts), and a point-to-point router link receives a strict <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">/30</code> (2 hosts).
                      </div>
                    </div>

                    <div className="bg-[#131921] text-slate-200 p-5 rounded-xl border border-[#232F3E] flex flex-col justify-between font-mono text-xs">
                      <div>
                        <div className="text-[10px] text-[#FF9900] uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                          <span>Live Mathematical Subnet Breakdown</span>
                          <span>192.168.10.75 /26</span>
                        </div>
                        <div className="space-y-1 text-[11px]">
                          <div><span className="text-slate-500">Binary IP:</span> 11000000.10101000.00001010.<span className="text-[#FF9900] font-bold">01</span><span className="text-emerald-400">001011</span></div>
                          <div><span className="text-slate-500">Binary Mask:</span> 11111111.11111111.11111111.<span className="text-[#FF9900] font-bold">11</span><span className="text-slate-600">000000</span></div>
                          <div className="pt-2 text-slate-400">------------------------------------------</div>
                          <div><span className="text-slate-500">Bitwise AND:</span> 11000000.10101000.00001010.<span className="text-[#FF9900] font-bold">01000000</span></div>
                          <div><span className="text-slate-500">Network ID:</span> <span className="text-amber-400 font-bold">192.168.10.64</span></div>
                          <div><span className="text-slate-500">Broadcast:</span> <span className="text-rose-400 font-bold">192.168.10.127</span> (all host bits set to 1)</div>
                          <div><span className="text-slate-500">Usable Range:</span> 192.168.10.65 - 192.168.10.126 (62 hosts)</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('subnetting')}
                        className="mt-4 px-3 py-1.5 bg-[#FF9900] text-[#131921] font-bold rounded text-[11px] text-center"
                      >
                        Open Interactive Subnet Calculator &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeIntroSection === 'vlan_l3' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                      <Layers className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#131921]">
                        3. VLAN Segmentation &amp; IEEE 802.1Q Inter-VLAN Routing
                      </h3>
                      <p className="text-xs text-slate-500">
                        How switches isolate broadcast storms and multiplex thousands of logical networks across single physical trunks.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          How It Works: Access Ports vs. 802.1Q Trunk Ports
                        </span>
                        An <strong>Access Port</strong> connects an unmanaged end-user device (phone or barcode scanner) and injects all incoming frames directly into a single designated VLAN ID. An <strong>802.1Q Trunk Port</strong> connects switch-to-switch and switch-to-router. It inserts a 4-byte 802.1Q tag into the Ethernet header with a 12-bit VLAN Identifier (VID), allowing up to 4,094 distinct VLANs to share a 100 Gbps fiber trunk.
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          Why It Works: Broadcast Domain Isolation &amp; Security
                        </span>
                        In Ethernet, ARP requests and DHCP discoveries broadcast to every port in the broadcast domain. Without VLANs, a rogue packet or malware on one guest phone would flood all warehouse robotics and server interfaces. VLANs contain broadcast storms and enforce zero-trust network boundaries.
                      </div>
                    </div>

                    <div className="bg-[#131921] text-slate-200 p-5 rounded-xl border border-[#232F3E] font-mono text-xs space-y-3">
                      <div className="text-[10px] text-[#FF9900] uppercase tracking-wider font-bold">
                        Ethernet Frame Anatomy: The 4-Byte 802.1Q Tag Insertion
                      </div>
                      <div className="border border-slate-700 rounded p-2 text-[10px] space-y-1">
                        <div className="flex justify-between text-slate-400">
                          <span>[Dest MAC 6B]</span>
                          <span>[Src MAC 6B]</span>
                          <span className="text-[#FF9900] font-bold bg-[#FF9900]/20 px-1 rounded">[802.1Q TAG 4B]</span>
                          <span>[EtherType 2B]</span>
                          <span>[IP Payload 46-1500B]</span>
                        </div>
                      </div>
                      <div className="text-[11px] space-y-1 text-slate-300">
                        <div><span className="text-slate-500">TPID (Tag Protocol ID):</span> 0x8100 (Identifies 802.1Q)</div>
                        <div><span className="text-slate-500">PCP (Priority Code Point):</span> 3 bits (802.1p QoS class)</div>
                        <div><span className="text-slate-500">DEI (Drop Eligible):</span> 1 bit (Congestion drop flag)</div>
                        <div><span className="text-slate-500">VID (VLAN ID):</span> 12 bits (VLAN 10 = 0x00A)</div>
                      </div>
                      <div className="pt-2 border-t border-[#232F3E] text-[10px] text-emerald-400">
                        Stripped before delivery to client; maintained across all internal core trunks.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeIntroSection === 'nat_pat' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#131921]">
                        4. Perimeter NAT &amp; Port Address Translation (PAT) Multiplexing
                      </h3>
                      <p className="text-xs text-slate-500">
                        How millions of private RFC 1918 client sockets map across public IPv4 addresses without collision.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          How It Works: Stateful 5-Tuple Socket Translation
                        </span>
                        Every TCP session is defined by a 5-tuple: (Protocol, Source IP, Source Port, Destination IP, Destination Port). When your phone with private IP <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">192.168.10.75:52341</code> initiates an HTTPS session to Amazon <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">54.239.28.85:443</code>, the border gateway swaps the private source IP for its own public address <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">198.51.100.4</code> and assigns an unused ephemeral source port <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">41209</code>.
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          Why It Works: The 16-Bit Port Address Multiplier
                        </span>
                        A single public IPv4 address has $2^{16} = 65,536$ available TCP and UDP transport ports. By tracking active state in high-speed hardware memory, a single public IP can simultaneously support thousands of active user connections.
                      </div>
                    </div>

                    <div className="bg-[#131921] text-slate-200 p-5 rounded-xl border border-[#232F3E] font-mono text-xs flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-[#FF9900] uppercase tracking-wider font-bold mb-2">
                          Active State Translation Table Entry
                        </div>
                        <div className="space-y-2 text-[11px]">
                          <div className="bg-[#1b222d] p-2.5 rounded border border-[#2b3749]">
                            <span className="text-slate-400 block text-[9px] uppercase">Inside Local (Customer Phone)</span>
                            <span className="text-amber-400 font-bold">192.168.10.75 : 52341</span>
                          </div>
                          <div className="text-center text-xs text-[#FF9900] font-bold">&darr; Gateway Hardware Rewrite &darr;</div>
                          <div className="bg-[#1b222d] p-2.5 rounded border border-[#2b3749]">
                            <span className="text-slate-400 block text-[9px] uppercase">Inside Global (Public Internet Facing)</span>
                            <span className="text-emerald-400 font-bold">198.51.100.4 : 41209</span>
                          </div>
                          <div className="bg-[#1b222d] p-2.5 rounded border border-[#2b3749]">
                            <span className="text-slate-400 block text-[9px] uppercase">Outside Global (Amazon AWS Edge Target)</span>
                            <span className="text-blue-400 font-bold">54.239.28.85 : 443 (HTTPS)</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('nat')}
                        className="mt-4 px-3 py-1.5 bg-[#FF9900] text-[#131921] font-bold rounded text-[11px] text-center"
                      >
                        Inspect Live NAT / PAT Table &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeIntroSection === 'bgp_ospf' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                      <Network className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#131921]">
                        5. Global Transit: BGP Path-Vector Peering vs. Interior Multi-Area OSPF
                      </h3>
                      <p className="text-xs text-slate-500">
                        Why the Internet runs on policy-driven BGP while hyperscale cloud data centers rely on Dijkstra link-state OSPF.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          Exterior: BGP (Border Gateway Protocol)
                        </span>
                        Across the public internet, no single entity controls the network. Networks are split into <strong>Autonomous Systems (AS)</strong>—ISP AT&amp;T is AS7018, Cogent is AS174, Amazon is AS16509. BGP exchanges prefix reachability with <strong>AS-PATH</strong> lists. It chooses routes based on business contracts, peering agreements, and shortest AS-PATH, ensuring complete loop-free inter-domain routing without revealing internal network graphs.
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          Interior: Multi-Area OSPF (Open Shortest Path First)
                        </span>
                        Inside Amazon's own data centers, routers need absolute sub-millisecond knowledge of every link. OSPF distributes <strong>Link-State Advertisements (LSAs)</strong> so every router builds an identical <strong>Link-State Database (LSDB)</strong>. Each node independently runs <strong>Dijkstra's Shortest Path First (SPF)</strong> algorithm. To prevent millions of routes from overloading routers, OSPF is partitioned into Backbone Area 0 and Server Pod Areas (e.g., Area 20).
                      </div>
                    </div>

                    <div className="bg-[#131921] text-slate-200 p-5 rounded-xl border border-[#232F3E] font-mono text-xs flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-[#FF9900] uppercase tracking-wider font-bold mb-2">
                          Protocol Comparison: Edge vs Core
                        </div>
                        <div className="space-y-2 text-[11px]">
                          <div className="border border-slate-700 p-2 rounded">
                            <span className="text-amber-400 font-bold">BGP (Path-Vector):</span>
                            <div className="text-slate-300 mt-1">Algorithm: Policy attributes, AS-PATH, Multi-Exit Discriminator</div>
                            <div className="text-slate-400">Scale: Global internet (950,000+ IPv4 prefixes)</div>
                            <div className="text-slate-400">Convergence: 30-90 seconds (damped for stability)</div>
                          </div>
                          <div className="border border-slate-700 p-2 rounded">
                            <span className="text-blue-400 font-bold">OSPF (Link-State):</span>
                            <div className="text-slate-300 mt-1">Algorithm: Dijkstra SPF on synchronized LSDB graph</div>
                            <div className="text-slate-400">Scale: Enterprise / DC pods (hierarchical multi-area)</div>
                            <div className="text-slate-400">Convergence: &lt; 200 milliseconds (instant fiber-cut failover)</div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('routing')}
                        className="mt-4 px-3 py-1.5 bg-[#FF9900] text-[#131921] font-bold rounded text-[11px] text-center"
                      >
                        Test Interactive Routing Sandbox &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeIntroSection === 'asic_nitro' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                      <Cpu className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#131921]">
                        6. Hardware Acceleration: Custom ASICs &amp; AWS Nitro System
                      </h3>
                      <p className="text-xs text-slate-500">
                        Why modern hyperscalers cannot forward packets with software CPUs and how custom silicon delivers wire-speed 400 Gbps line rates.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          The Bottleneck of Software Routing
                        </span>
                        A general-purpose CPU executing an OS kernel requires context switching, memory copying, and algorithmic lookups taking thousands of CPU cycles per packet. At 400 Gbps, millions of 64-byte packets arrive every microsecond, which would instantly overwhelm any Intel/AMD CPU.
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <span className="font-bold text-[#131921] uppercase text-[11px] block mb-1">
                          How It Works: TCAM &amp; ASIC Line-Rate Forwarding
                        </span>
                        Amazon switches deploy <strong>ASICs (Application-Specific Integrated Circuits)</strong> embedded with <strong>TCAM (Ternary Content-Addressable Memory)</strong>. TCAM searches the entire forwarding table in a single clock cycle (&lt; 400 nanoseconds), enabling true "wire-speed" packet switching. In servers, the <strong>AWS Nitro Card</strong> offloads VPC networking, EBS storage, and hardware encryption away from host CPU cores completely.
                      </div>
                    </div>

                    <div className="bg-[#131921] text-slate-200 p-5 rounded-xl border border-[#232F3E] font-mono text-xs flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-[#FF9900] uppercase tracking-wider font-bold mb-2">
                          Hyperscale Hardware Performance Metrics
                        </div>
                        <div className="space-y-1.5 text-[11px] text-slate-300">
                          <div><span className="text-slate-500">Forwarding Engine:</span> Dedicated Custom Silicon ASIC</div>
                          <div><span className="text-slate-500">Lookup Mechanism:</span> Single-cycle Parallel TCAM</div>
                          <div><span className="text-slate-500">Lookup Latency:</span> &lt; 380 nanoseconds</div>
                          <div><span className="text-slate-500">Throughput Capacity:</span> 400 Gbps per leaf port</div>
                          <div><span className="text-slate-500">Nitro Card Offload:</span> 100% network/TLS offloaded from host CPU</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('simulator')}
                        className="mt-4 px-3 py-1.5 bg-[#FF9900] text-[#131921] font-bold rounded text-[11px] text-center"
                      >
                        Watch Packet Flow Through ASICs &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('simulator')}
                className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-[#FF9900] transition-colors text-left flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-amber-50 text-[#FF9900] group-hover:bg-[#FF9900] group-hover:text-white transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#131921]">1. Transit Simulator</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Follow a single order packet across all 8 physical and logical stages.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('subnetting')}
                className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-[#FF9900] transition-colors text-left flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-blue-50 text-[#146EB4] group-hover:bg-[#146EB4] group-hover:text-white transition-colors">
                  <Binary className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#131921]">2. CIDR &amp; Subnetting</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Calculate masks, host boundaries, and binary bitwise operations in real-time.
                  </p>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('lab')}
                className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-[#FF9900] transition-colors text-left flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#131921]">3. Diagnostic Lab</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Troubleshoot real network outages using authentic CLI command outputs.
                  </p>
                </div>
              </button>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 1. END-TO-END TRANSIT SIMULATOR (CENTERPIECE) */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'simulator' && (
          <section className="space-y-6">
            {/* Header + Transport Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <span className="text-xs font-semibold text-[#146EB4] uppercase tracking-wider">
                  Interactive Event Pipeline
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  Step {currentStage.id} of {STAGES.length}: {currentStage.title}
                </h2>
              </div>

              {/* Media Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs ${
                    isPlaying
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-[#FF9900] text-[#131921] hover:bg-[#ffad33]'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  {isPlaying ? "Pause Flow" : "Play Flow"}
                </button>
                <button
                  disabled={currentStageIdx === 0}
                  onClick={() => setCurrentStageIdx(prev => Math.max(0, prev - 1))}
                  className="p-1.5 text-slate-600 hover:text-slate-950 disabled:opacity-30 disabled:pointer-events-none rounded border border-slate-200 hover:bg-slate-50"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentStageIdx === STAGES.length - 1}
                  onClick={() => setCurrentStageIdx(prev => Math.min(STAGES.length - 1, prev + 1))}
                  className="p-1.5 text-slate-600 hover:text-slate-950 disabled:opacity-30 disabled:pointer-events-none rounded border border-slate-200 hover:bg-slate-50"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setCurrentStageIdx(0); setIsPlaying(false); }}
                  className="p-1.5 text-slate-600 hover:text-slate-950 rounded border border-slate-200 hover:bg-slate-50"
                  title="Reset to Stage 1"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Horizontal Interactive Progress Track */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="relative">
                {/* Connecting hairline */}
                <div className="absolute top-5 left-4 right-4 h-0.5 bg-slate-200 -z-0" />
                <div
                  className="absolute top-5 left-4 h-0.5 bg-[#FF9900] transition-all duration-500 -z-0"
                  style={{ width: `${(currentStageIdx / (STAGES.length - 1)) * 100}%` }}
                />

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 relative z-10">
                  {STAGES.map((s, idx) => {
                    const isCurrent = idx === currentStageIdx;
                    const isPassed = idx < currentStageIdx;
                    return (
                      <button
                        key={s.id}
                        onClick={() => { setCurrentStageIdx(idx); setIsPlaying(false); }}
                        className="flex flex-col items-center text-center group cursor-pointer"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                            isCurrent
                              ? 'bg-[#FF9900] text-[#131921] ring-4 ring-amber-100 scale-110 shadow-sm font-extrabold'
                              : isPassed
                              ? 'bg-[#131921] text-white'
                              : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-slate-400'
                          }`}
                        >
                          {s.id}
                        </div>
                        <span className={`mt-2 text-[11px] leading-tight font-medium ${isCurrent ? 'text-[#131921] font-bold' : 'text-slate-500 group-hover:text-slate-800'}`}>
                          {s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Two-Column Stage Inspection Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Hardware / Logical Schematic & Active PDU */}
              <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                    <span className="font-mono uppercase">{currentStage.domain}</span>
                    <span className="font-mono text-[#146EB4] font-semibold">{currentStage.layer}</span>
                  </div>

                  {/* Visual Topology Schematic Node */}
                  <div className="mt-4 p-5 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200 mb-3 text-[#FF9900]">
                      {currentStageIdx === 0 && <Smartphone className="w-8 h-8 text-[#FF9900]" />}
                      {currentStageIdx === 1 && <Layers className="w-8 h-8 text-[#146EB4]" />}
                      {currentStageIdx === 2 && <Shield className="w-8 h-8 text-emerald-600]" />}
                      {currentStageIdx === 3 && <Network className="w-8 h-8 text-[#146EB4]" />}
                      {currentStageIdx === 4 && <Server className="w-8 h-8 text-[#FF9900]" />}
                      {currentStageIdx === 5 && <Cpu className="w-8 h-8 text-rose-600" />}
                      {currentStageIdx === 6 && <Database className="w-8 h-8 text-purple-600" />}
                      {currentStageIdx === 7 && <Truck className="w-8 h-8 text-[#FF9900]" />}
                    </div>

                    <div className="text-sm font-bold text-slate-900">
                      {currentStage.device}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 max-w-xs">
                      {currentStage.subtitle}
                    </div>

                    {/* Active PDU Card */}
                    <div className="mt-4 w-full bg-white p-3 rounded-md border border-slate-200 text-left">
                      <div className="text-[10px] uppercase font-mono text-slate-400">Protocol Data Unit (PDU)</div>
                      <div className="text-xs font-mono font-medium text-slate-800 break-words mt-0.5">
                        {currentStage.pdu}
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Metric Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {currentStage.telemetry.map((t, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-[10px] text-slate-400 uppercase font-mono">{t.label}</div>
                        <div className="text-xs font-mono font-semibold text-slate-900 mt-0.5">{t.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packet Trace Snippet */}
                <div className="bg-[#131921] text-slate-200 p-3 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto border border-[#232F3E]">
                  <div className="text-[9px] uppercase tracking-wider text-slate-400 border-b border-[#232F3E] pb-1 mb-1 flex items-center justify-between">
                    <span>Wireshark Capture Slice</span>
                    <span className="text-[#FF9900]">Live Sniffer</span>
                  </div>
                  <div className="text-emerald-400 whitespace-pre-wrap">{currentStage.wiresharkSnippet}</div>
                </div>
              </div>

              {/* Right Column: Narrative Phenomenon & Deep Engineering Mechanism */}
              <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
                {/* 1. Physical Reality */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    The Physical Reality
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    What You Experience on Your Device
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-3.5 rounded-lg border border-amber-200/50">
                    {currentStage.physicalReality}
                  </p>
                </div>

                {/* 2. Engineering Mechanism */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#146EB4] mb-1">
                    How The System Executes This
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    Underlying Engineering Architecture
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentStage.engineeringMechanism}
                  </p>
                </div>

                {/* 3. Syllabus Anchor */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Why It Matters · Core Syllabus Anchor
                  </div>
                  <div className="text-xs text-slate-800 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
                    <strong>Theoretical Principle:</strong> {currentStage.syllabusAnchor}
                  </div>
                </div>

                {/* Quick Next Stage Prompt */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Press Next to advance to Stage {currentStageIdx === STAGES.length - 1 ? 1 : currentStageIdx + 2}
                  </span>
                  <button
                    onClick={() => setCurrentStageIdx(prev => (prev < STAGES.length - 1 ? prev + 1 : 0))}
                    className="px-3 py-1.5 text-xs font-bold text-[#146EB4] hover:text-[#0f548a] hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                  >
                    Advance Step <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 2. INTERACTIVE SUBNETTING & CIDR CALCULATOR */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'subnetting' && (
          <section className="space-y-6">
            {/* Pedagogical Concept & Interaction Guide */}
            <div className="bg-[#131921] text-white p-6 rounded-2xl border border-[#232F3E] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF9900]">
                <Binary className="w-4 h-4" />
                <span>Pedagogical Guide · CIDR &amp; Subnetting Deep Dive</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* 1. Concept */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    1. The Concept
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>CIDR (Classless Inter-Domain Routing)</strong> treats an IPv4 address as an unsigned 32-bit integer. The prefix length (<code className="text-[#FF9900]">/N</code>) establishes a strict binary boundary: the first <strong>N bits</strong> designate the Network ID, while the remaining <strong>(32 - N) bits</strong> address individual hosts. This eliminates the rigid, wasteful boundaries of legacy Class A/B/C addressing.
                  </p>
                </div>

                {/* 2. Situation */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-blue-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    2. The Amazon Situation
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Amazon architects allocate IP blocks using <strong>VLSM</strong> (Variable Length Subnet Masking):
                  </p>
                  <ul className="text-slate-300 space-y-1 pl-3 list-disc text-[11px]">
                    <li><strong className="text-white">/26 (62 hosts):</strong> Local customer Wi-Fi / office floors.</li>
                    <li><strong className="text-white">/24 (254 hosts):</strong> Data center microservice pod clusters.</li>
                    <li><strong className="text-white">/30 (2 hosts):</strong> Dedicated router-to-router point-to-point fiber links.</li>
                  </ul>
                </div>

                {/* 3. How to Interact */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-emerald-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    3. How to Use Interaction
                  </div>
                  <ol className="text-slate-300 space-y-1 pl-3.5 list-decimal text-[11px]">
                    <li>Click the preset buttons (<code className="text-white">Home Wi-Fi /26</code>, <code className="text-white">Amazon Pod /24</code>, <code className="text-white">WAN /30</code>) or type custom octets.</li>
                    <li>Drag the <strong>Prefix Length Slider</strong> from <code className="text-[#FF9900]">/8</code> to <code className="text-[#FF9900]">/30</code>.</li>
                    <li>Watch the real-time binary stream and metric cards update below.</li>
                  </ol>
                </div>

                {/* 4. What You Observe */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-purple-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    4. What You Observe
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Notice how the <strong>32-bit binary bar</strong> shifts dynamically: Amber highlights Network bits while Yellow highlights Host bits. Increasing the prefix collapses usable host capacity by half for each bit added ($2^H - 2$). You observe why the first address (all host bits 0) is reserved for the Network ID and the last (all host bits 1) for the Broadcast Address.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
                <div>
                  <div className="text-xs font-semibold text-[#146EB4] uppercase tracking-wider">
                    Interactive Mathematics &amp; Bit Visualizer
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    IPv4 Subnetting, CIDR &amp; VLSM Explorer
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Explore how Amazon segments customer access ports, warehouse robotics subnets, and data center pod fabrics using variable-length prefix masks.
                  </p>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-slate-500 mr-1">Presets:</span>
                  <button
                    onClick={() => { setIpOctets([192, 168, 10, 75]); setPrefixLength(26); }}
                    className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono"
                  >
                    Home Wi-Fi (/26)
                  </button>
                  <button
                    onClick={() => { setIpOctets([10, 240, 20, 10]); setPrefixLength(24); }}
                    className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono"
                  >
                    Amazon Pod (/24)
                  </button>
                  <button
                    onClick={() => { setIpOctets([198, 51, 100, 1]); setPrefixLength(30); }}
                    className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono"
                  >
                    WAN P2P Link (/30)
                  </button>
                </div>
              </div>

              {/* Input Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* IP Octet Controls */}
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-slate-700 uppercase">
                    IPv4 Host IP Address (Dotted Decimal)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {ipOctets.map((oct, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-mono text-center mb-1">Octet {i + 1}</span>
                        <input
                          type="number"
                          min="0"
                          max="255"
                          value={oct}
                          onChange={(e) => {
                            const val = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
                            const updated = [...ipOctets] as [number, number, number, number];
                            updated[i] = val;
                            setIpOctets(updated);
                          }}
                          className="w-full text-center py-2 px-2 border border-slate-300 rounded-lg text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Prefix Length Slider */}
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
                      <span>Prefix Length (CIDR Mask):</span>
                      <span className="font-mono text-indigo-600 text-sm">/{prefixLength}</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="30"
                      value={prefixLength}
                      onChange={(e) => setPrefixLength(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>/8 (Class A equivalent)</span>
                      <span>/24 (Class C equivalent)</span>
                      <span>/30 (P2P WAN)</span>
                    </div>
                  </div>
                </div>

                {/* Calculated Results Table */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-semibold uppercase text-slate-500 border-b border-slate-200 pb-2">
                    Subnet Calculation Breakdown
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Subnet Mask</span>
                      <span className="text-slate-900 font-bold">{subnetCalculations.mask}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Network Address</span>
                      <span className="text-indigo-600 font-bold">{subnetCalculations.netIp}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">First Usable Host</span>
                      <span className="text-emerald-700 font-semibold">{subnetCalculations.firstUsable}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Last Usable Host</span>
                      <span className="text-emerald-700 font-semibold">{subnetCalculations.lastUsable}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Broadcast Address</span>
                      <span className="text-rose-600 font-bold">{subnetCalculations.bcastIp}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Usable Host Capacity</span>
                      <span className="text-slate-900 font-bold">{subnetCalculations.usableHosts.toLocaleString()} hosts</span>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200 flex justify-between">
                    <span>Host Bits: <strong>{subnetCalculations.hostBits} bits</strong></span>
                    <span>Total Addresses: <strong>{subnetCalculations.totalHosts.toLocaleString()}</strong> (2^{subnetCalculations.hostBits})</span>
                  </div>
                </div>
              </div>

              {/* Binary Bit-Boundary Visualizer */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-700 uppercase mb-2">
                  32-Bit Binary Boundary Explorer
                </div>
                <div className="bg-slate-950 p-4 rounded-xl text-slate-300 font-mono text-xs overflow-x-auto space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-24 shrink-0 text-[10px]">HOST IP:</span>
                    <span className="tracking-widest">
                      {subnetCalculations.ipBinary.split('').map((char, idx) => {
                        if (char === '.') return <span key={idx} className="text-slate-600">.</span>;
                        // Count bits excluding dots
                        const bitIndex = idx - Math.floor(idx / 9);
                        const isNetBit = bitIndex < prefixLength;
                        return (
                          <span
                            key={idx}
                            className={isNetBit ? "text-indigo-400 font-bold" : "text-amber-400"}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-24 shrink-0 text-[10px]">SUBNET MASK:</span>
                    <span className="tracking-widest text-slate-400">
                      {subnetCalculations.maskBinary}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-2 text-[10px] border-t border-slate-800">
                    <span className="flex items-center gap-1.5 text-indigo-400">
                      <span className="w-2.5 h-2.5 bg-indigo-500 inline-block rounded-xs"></span>
                      Network Bits ({prefixLength})
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <span className="w-2.5 h-2.5 bg-amber-500 inline-block rounded-xs"></span>
                      Host Bits ({32 - prefixLength})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 3. NAT & PORT ADDRESS TRANSLATION (PAT) TABLE */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'nat' && (
          <section className="space-y-6">
            {/* Pedagogical Concept & Interaction Guide */}
            <div className="bg-[#131921] text-white p-6 rounded-2xl border border-[#232F3E] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF9900]">
                <Shield className="w-4 h-4" />
                <span>Pedagogical Guide · NAT &amp; PAT (Port Address Translation) Deep Dive</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* 1. Concept */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    1. The Concept
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>NAT (Network Address Translation)</strong> rewrites IP headers to bridge private RFC 1918 subnets with public addresses. <strong>PAT (Port Address Translation / NAT Overload)</strong> extends this by rewriting Layer 4 TCP/UDP port numbers. By multiplexing source ports, up to <strong>65,535 active connections</strong> can simultaneously share a single public IP address without collision.
                  </p>
                </div>

                {/* 2. Situation */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-blue-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    2. The Amazon Situation
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Your smartphone has a private IP <code className="text-amber-400">192.168.10.75</code>. If transmitted directly across the Internet, Tier-1 carrier routers would immediately discard it. The border gateway swaps this with its own public IP <code className="text-emerald-400">198.51.100.4</code> and assigns a unique ephemeral port <code className="text-emerald-400">41209</code> before sending the packet to Amazon at <code className="text-blue-400">54.239.28.85:443</code>.
                  </p>
                </div>

                {/* 3. How to Interact */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-emerald-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    3. How to Use Interaction
                  </div>
                  <ol className="text-slate-300 space-y-1 pl-3.5 list-decimal text-[11px]">
                    <li>Click <strong>"+ iPad Order Packet"</strong> or <strong>"+ Workstation Packet"</strong> in the top right.</li>
                    <li>Observe a new real-time translation socket injected into the top of the table.</li>
                    <li>Trace the flow from Inside Local &rarr; Inside Global &rarr; Outside Global.</li>
                  </ol>
                </div>

                {/* 4. What You Observe */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-purple-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    4. What You Observe
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Notice how completely distinct local devices (<code className="text-white">192.168.10.82</code> vs <code className="text-white">192.168.10.150</code>) are mapped to the <strong>exact same Inside Global IP (<code className="text-emerald-400">198.51.100.4</code>)</strong>, distinguished strictly by their unique <strong>translated ports</strong> (<code className="text-emerald-400">:41211</code>, <code className="text-emerald-400">:41212</code>). This is how reverse packets find their exact originating socket!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <div className="text-xs font-semibold text-[#146EB4] uppercase tracking-wider">
                    Layer 3/4 Boundary Mechanism
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Dynamic NAT &amp; PAT (Port Address Translation) Table
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    When multiple devices inside a home or office contact Amazon, PAT maps unique internal IP:Port pairs to one public routable IP.
                  </p>
                </div>

                {/* Interactive Session Injectors */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addNatSession("Customer iPad (App)", "192.168.10.82")}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
                  >
                    + iPad Order Packet
                  </button>
                  <button
                    onClick={() => addNatSession("Office Workstation", "192.168.10.150")}
                    className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    + Workstation Packet
                  </button>
                </div>
              </div>

              {/* Visual Flow Diagram */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6 flex flex-col md:flex-row items-center justify-around gap-4 text-center">
                <div className="p-3 bg-white rounded-lg border border-slate-200 w-full md:w-auto">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Inside Network (Private)</div>
                  <div className="text-xs font-mono font-bold text-slate-800">192.168.10.0/24</div>
                  <div className="text-[11px] text-slate-500 mt-1">RFC 1918 Non-Routable</div>
                </div>

                <div className="flex flex-col items-center">
                  <ArrowRight className="w-5 h-5 text-indigo-600 hidden md:block" />
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mt-1">
                    Port Mapping Engine
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-indigo-200 w-full md:w-auto ring-2 ring-indigo-50">
                  <div className="text-[10px] uppercase font-mono text-indigo-600">Perimeter NAT Router</div>
                  <div className="text-xs font-mono font-bold text-indigo-900">Public IP: 198.51.100.4</div>
                  <div className="text-[11px] text-slate-500 mt-1">Overloaded Single Global IP</div>
                </div>

                <div className="flex flex-col items-center">
                  <ArrowRight className="w-5 h-5 text-indigo-600 hidden md:block" />
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mt-1">
                    Public Internet WAN
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 w-full md:w-auto">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Outside Destination</div>
                  <div className="text-xs font-mono font-bold text-slate-800">54.239.28.85:443</div>
                  <div className="text-[11px] text-slate-500 mt-1">Amazon Order Endpoint</div>
                </div>
              </div>

              {/* NAT Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Client Description</th>
                      <th className="py-2.5 px-3">Proto</th>
                      <th className="py-2.5 px-3 text-indigo-700">Inside Local (Private)</th>
                      <th className="py-2.5 px-3 text-emerald-700">Inside Global (Public Trans)</th>
                      <th className="py-2.5 px-3 text-slate-700">Outside Global (Dest)</th>
                      <th className="py-2.5 px-3">State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {natTable.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-800">{row.clientName}</td>
                        <td className="py-2.5 px-3 text-slate-500">{row.protocol}</td>
                        <td className="py-2.5 px-3 font-bold text-indigo-600">{row.insideLocal}</td>
                        <td className="py-2.5 px-3 font-bold text-emerald-600">{row.insideGlobal}</td>
                        <td className="py-2.5 px-3 text-slate-600">{row.outsideGlobal}</td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] ${row.state === 'ESTABLISHED' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'bg-slate-100 text-slate-500'}`}>
                            {row.state}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 4. ROUTING & TOPOLOGY FAILURE SANDBOX */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'routing' && (
          <section className="space-y-6">
            {/* Pedagogical Concept & Interaction Guide */}
            <div className="bg-[#131921] text-white p-6 rounded-2xl border border-[#232F3E] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF9900]">
                <Network className="w-4 h-4" />
                <span>Pedagogical Guide · OSPF (Interior) vs. BGP (Exterior) Deep Dive</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* 1. Concept */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    1. The Concept
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>BGP (Exterior Gateway):</strong> Connects autonomous, untrusted organizations across the Internet using the <strong>AS-PATH</strong> policy vector to guarantee loop-free inter-domain routing. <strong>OSPF (Interior Gateway):</strong> Operates inside a single trusted network using Link-State Advertisements (LSAs) and <strong>Dijkstra's SPF</strong> algorithm to calculate the absolute shortest path across synchronized databases.
                  </p>
                </div>

                {/* 2. Situation */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-blue-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    2. The Amazon Situation
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    When exiting your home gateway, traffic crosses your carrier (e.g., <code className="text-white">AT&amp;T AS7018</code>) to Amazon (<code className="text-[#FF9900]">AS16509</code>) via external BGP peering. Once inside Amazon's hyperscale availability zone, packets navigate leaf-spine fabrics across <strong>OSPF Backbone Area 0</strong> to <strong>Area 20 Pods</strong> to reach order checkout pods.
                  </p>
                </div>

                {/* 3. How to Interact */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-emerald-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    3. How to Use Interaction
                  </div>
                  <ol className="text-slate-300 space-y-1 pl-3.5 list-decimal text-[11px]">
                    <li>Click <strong>"Link Active (Primary)"</strong> on ISP 1 (AS7018) to simulate an ISP BGP link cut.</li>
                    <li>Click <strong>"SPF Cost: 10 (Active)"</strong> on Spine 1 to sever an internal datacenter OSPF link.</li>
                    <li>Click <strong>"● Trunk Link UP"</strong> to break the local 802.1Q switch connection.</li>
                  </ol>
                </div>

                {/* 4. What You Observe */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-purple-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    4. What You Observe
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Watch the <strong>Real-Time Convergence Log</strong> stream live events:
                    BGP switches to backup AS174 (path length 4), preserving transit. OSPF floods LSAs, re-runs Dijkstra's SPF algorithm in milliseconds, and diverts traffic to Spine 2. You observe how layered redundancy provides continuous uptime despite link cuts!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="text-xs font-semibold text-[#146EB4] uppercase tracking-wider">
                  Interactive Failure &amp; Convergence Sandbox
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  OSPF (Interior) vs. BGP (Exterior) Routing Topology
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Click on the network links below to trigger simulated fiber cuts. Watch how OSPF calculates SPF shortest paths internally while BGP reroutes traffic between Autonomous Systems.
                </p>
              </div>

              {/* Interactive Topology Graph */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Topology Diagram */}
                <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl text-white relative">
                  <div className="text-xs font-mono text-slate-400 mb-4 flex justify-between">
                    <span>TOPOLOGY: CLIENT AS64500 &gt; ISP TIER-1 &gt; AMAZON AS16509</span>
                    <span className="text-emerald-400">● LIVE RUNTIME</span>
                  </div>

                  {/* Nodes & Links Layout */}
                  <div className="space-y-8 py-4">
                    {/* Layer 1: Client Edge */}
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center w-36">
                        <Smartphone className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                        <div className="text-xs font-bold">Client Phone</div>
                        <div className="text-[10px] text-slate-400 font-mono">192.168.10.75</div>
                      </div>

                      {/* Trunk Link */}
                      <button
                        onClick={() => toggleLink("trunk-link", "Local Switch 802.1Q Trunk Link")}
                        className={`px-3 py-1.5 rounded text-xs font-mono border transition-all ${
                          linkStates["trunk-link"]
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 hover:bg-emerald-900'
                            : 'bg-rose-950/80 border-rose-500 text-rose-300 hover:bg-rose-900'
                        }`}
                      >
                        {linkStates["trunk-link"] ? "● Trunk Link UP (VLAN 10)" : "▲ Trunk SEVERED"}
                      </button>

                      <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 text-center w-36">
                        <Layers className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                        <div className="text-xs font-bold">Edge Gateway</div>
                        <div className="text-[10px] text-slate-400 font-mono">AS64500 (PAT)</div>
                      </div>
                    </div>

                    {/* BGP Autonomous Systems Transit */}
                    <div className="border-t border-b border-slate-800 py-6 my-4">
                      <div className="text-[10px] font-mono text-amber-400 mb-3 uppercase tracking-wider text-center">
                        External BGP Peering Transit (Path-Vector Routing)
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* ISP 1 (Primary) */}
                        <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 flex flex-col items-center">
                          <div className="text-xs font-bold text-slate-200">ISP 1 (AS7018 - AT&amp;T)</div>
                          <div className="text-[10px] font-mono text-slate-400">Path Length: 3 AS hops</div>
                          <button
                            onClick={() => toggleLink("isp1-amz", "ISP 1 to Amazon BGP Transit Link")}
                            className={`mt-2 px-2 py-1 text-[11px] font-mono rounded w-full border ${
                              linkStates["isp1-amz"]
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300'
                                : 'bg-rose-900/60 border-rose-500 text-rose-300'
                            }`}
                          >
                            {linkStates["isp1-amz"] ? "Link Active (Primary)" : "BGP Peering Down"}
                          </button>
                        </div>

                        {/* ISP 2 (Backup) */}
                        <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 flex flex-col items-center">
                          <div className="text-xs font-bold text-slate-200">ISP 2 (AS174 - Cogent)</div>
                          <div className="text-[10px] font-mono text-slate-400">Path Length: 4 AS hops</div>
                          <button
                            onClick={() => toggleLink("isp2-amz", "ISP 2 to Amazon BGP Backup Link")}
                            className={`mt-2 px-2 py-1 text-[11px] font-mono rounded w-full border ${
                              linkStates["isp2-amz"]
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300'
                                : 'bg-rose-900/60 border-rose-500 text-rose-300'
                            }`}
                          >
                            {linkStates["isp2-amz"] ? "Link Active (Standby)" : "BGP Peering Down"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Amazon Interior OSPF Fabric */}
                    <div>
                      <div className="text-[10px] font-mono text-indigo-400 mb-3 uppercase tracking-wider text-center">
                        Amazon Interior Multi-Area OSPF Fabric (Dijkstra SPF)
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-center">
                          <div className="text-xs font-bold text-slate-200">Spine 1 (Area 0)</div>
                          <button
                            onClick={() => toggleLink("ospf-spine1", "OSPF Area 0 Spine 1 Link")}
                            className={`mt-2 px-2 py-1 text-[11px] font-mono rounded w-full border ${
                              linkStates["ospf-spine1"]
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300'
                                : 'bg-rose-900/60 border-rose-500 text-rose-300'
                            }`}
                          >
                            {linkStates["ospf-spine1"] ? "SPF Cost: 10 (Active)" : "Link Severed"}
                          </button>
                        </div>

                        <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 text-center">
                          <div className="text-xs font-bold text-slate-200">Spine 2 (Area 0)</div>
                          <button
                            onClick={() => toggleLink("ospf-spine2", "OSPF Area 0 Spine 2 Link")}
                            className={`mt-2 px-2 py-1 text-[11px] font-mono rounded w-full border ${
                              linkStates["ospf-spine2"]
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300'
                                : 'bg-rose-900/60 border-rose-500 text-rose-300'
                            }`}
                          >
                            {linkStates["ospf-spine2"] ? "SPF Cost: 10 (Redundant)" : "Link Severed"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Routing Convergence Engine Log */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-700 uppercase mb-2 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-indigo-600" />
                      Routing Engine Console
                    </div>
                    <div className="text-[11px] text-slate-500 mb-3">
                      Link state changes trigger instant Dijkstra recalculation or BGP path updates.
                    </div>

                    <div className="space-y-2 font-mono text-[11px]">
                      {convergenceLog.length === 0 ? (
                        <div className="p-3 bg-white rounded border border-slate-200 text-slate-400 italic">
                          All topology links currently nominal. Click any button on the left to simulate link failure.
                        </div>
                      ) : (
                        convergenceLog.map((log, i) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded border leading-tight ${
                              log.startsWith('[FAILURE]')
                                ? 'bg-rose-50 border-rose-200 text-rose-800'
                                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            }`}
                          >
                            {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <div><strong>OSPF Convergence Time:</strong> ~200 - 800 ms</div>
                    <div><strong>BGP Hold Timer:</strong> 90 - 180 seconds (or &lt;1s with BFD)</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 5. PROTOCOL ENCAPSULATION & WIRESHARK INSPECTOR */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'wireshark' && (
          <section className="space-y-6">
            {/* Pedagogical Concept & Interaction Guide */}
            <div className="bg-[#131921] text-white p-6 rounded-2xl border border-[#232F3E] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF9900]">
                <Layers className="w-4 h-4" />
                <span>Pedagogical Guide · Protocol Encapsulation &amp; PDU Layering Deep Dive</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* 1. Concept */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    1. The Concept
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Encapsulation</strong> wraps application data inside lower-layer headers as it moves down the OSI/TCP-IP stack. Each layer produces a specific <strong>Protocol Data Unit (PDU)</strong>: Layer 7 Data &rarr; Layer 4 Segment &rarr; Layer 3 Packet &rarr; Layer 2 Frame &rarr; Layer 1 Bits. Each layer treats the payload of the higher layer as opaque data.
                  </p>
                </div>

                {/* 2. Situation */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-blue-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    2. The Amazon Situation
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    When you tap "Buy Now", your phone serializes an encrypted JSON payload (<code className="text-amber-400">POST /v3/cart/order-submit</code>). It is encapsulated inside a TCP segment (<code className="text-emerald-400">Port 443</code>), an IPv4 packet (<code className="text-blue-400">54.239.28.85</code>), and an IEEE 802.1Q tagged Ethernet frame (<code className="text-purple-400">VID 10</code>).
                  </p>
                </div>

                {/* 3. How to Interact */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-emerald-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    3. How to Use Interaction
                  </div>
                  <ol className="text-slate-300 space-y-1 pl-3.5 list-decimal text-[11px]">
                    <li>Inspect the nested stack cards from outer (Layer 2) to innermost (Layer 7).</li>
                    <li>Observe how header sizes add protocol overhead (18B Ethernet + 4B 802.1Q + 20B IP + 20B TCP).</li>
                    <li>Notice the 4-byte 802.1Q VLAN Tag placed right between Source MAC and EtherType.</li>
                  </ol>
                </div>

                {/* 4. What You Observe */}
                <div className="bg-[#1b222d] p-4 rounded-xl border border-[#2b3749] space-y-2">
                  <div className="font-bold text-purple-400 uppercase text-[11px] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    4. What You Observe
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Notice how Layer 2 switches only read MAC addresses and the 802.1Q tag, completely agnostic of the encrypted HTTP payload inside! Only the Amazon TLS endpoint decrypts the innermost Layer 7 JSON. This clean separation of concerns makes the global internet interoperable.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="text-xs font-semibold text-[#146EB4] uppercase tracking-wider">
                  Protocol Stack Analysis
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Wireshark Encapsulation Inspector: Placing an Order
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Inspect how a high-level application JSON payload is wrapped layer-by-layer inside transport segments, IP packets, and 802.1Q tagged Ethernet frames.
                </p>
              </div>

              {/* Nested Protocol Stack Representation */}
              <div className="space-y-3">
                {/* Layer 2: 802.3 Frame */}
                <div className="p-4 rounded-lg bg-slate-900 text-white border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-indigo-400">Layer 2: Ethernet II + IEEE 802.1Q VLAN Tag</span>
                    <span className="text-slate-400">18 Bytes Header + 4 Bytes Tag</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-800 p-2 rounded">
                      <span className="text-slate-400 block text-[9px]">DEST MAC</span>
                      e0:cb:bc:12:34:56 (AP Gateway)
                    </div>
                    <div className="bg-slate-800 p-2 rounded">
                      <span className="text-slate-400 block text-[9px]">SRC MAC</span>
                      3a:88:21:c4:90:11 (Phone)
                    </div>
                    <div className="bg-indigo-950 p-2 rounded border border-indigo-700 text-indigo-300">
                      <span className="text-indigo-400 block text-[9px]">802.1Q TAG</span>
                      TPID: 0x8100 | VID: 10
                    </div>
                    <div className="bg-slate-800 p-2 rounded">
                      <span className="text-slate-400 block text-[9px]">ETHERTYPE</span>
                      0x0800 (IPv4)
                    </div>
                  </div>
                </div>

                {/* Layer 3: IPv4 Packet */}
                <div className="p-4 rounded-lg bg-indigo-900/90 text-white border border-indigo-800 ml-3 sm:ml-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-emerald-300">Layer 3: Internet Protocol Version 4 (IPv4)</span>
                    <span className="text-indigo-200">20 Bytes Header</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                    <div className="bg-indigo-950/80 p-2 rounded">
                      <span className="text-indigo-300 block text-[9px]">SOURCE IP</span>
                      192.168.10.75 (Before NAT)
                    </div>
                    <div className="bg-indigo-950/80 p-2 rounded">
                      <span className="text-indigo-300 block text-[9px]">DESTINATION IP</span>
                      54.239.28.85 (Amazon)
                    </div>
                    <div className="bg-indigo-950/80 p-2 rounded">
                      <span className="text-indigo-300 block text-[9px]">TTL (TIME TO LIVE)</span>
                      64 hops
                    </div>
                    <div className="bg-indigo-950/80 p-2 rounded">
                      <span className="text-indigo-300 block text-[9px]">PROTOCOL</span>
                      6 (Transmission Control Protocol)
                    </div>
                  </div>
                </div>

                {/* Layer 4: TCP Segment */}
                <div className="p-4 rounded-lg bg-emerald-900/90 text-white border border-emerald-800 ml-6 sm:ml-12">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-amber-300">Layer 4: Transmission Control Protocol (TCP)</span>
                    <span className="text-emerald-200">20 Bytes Header (3-Way Handshake Established)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                    <div className="bg-emerald-950/80 p-2 rounded">
                      <span className="text-emerald-300 block text-[9px]">SOURCE PORT</span>
                      52341 (Ephemeral)
                    </div>
                    <div className="bg-emerald-950/80 p-2 rounded">
                      <span className="text-emerald-300 block text-[9px]">DEST PORT</span>
                      443 (HTTPS)
                    </div>
                    <div className="bg-emerald-950/80 p-2 rounded">
                      <span className="text-emerald-300 block text-[9px]">FLAGS</span>
                      ACK, PSH (Push Data)
                    </div>
                    <div className="bg-emerald-950/80 p-2 rounded">
                      <span className="text-emerald-300 block text-[9px]">WINDOW SIZE</span>
                      65,535 Bytes
                    </div>
                  </div>
                </div>

                {/* Layer 5-7: TLS 1.3 & Application Data */}
                <div className="p-4 rounded-lg bg-amber-900/90 text-white border border-amber-800 ml-9 sm:ml-16">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="font-bold text-amber-200">Layer 7: TLS 1.3 Record &amp; HTTP/2 POST Payload</span>
                    <span className="text-amber-200">Encrypted Application Data</span>
                  </div>
                  <div className="bg-amber-950/90 p-3 rounded font-mono text-[11px] leading-relaxed">
                    <div className="text-amber-400 mb-1">POST /v3/cart/order-submit HTTP/2</div>
                    <div className="text-slate-300">
                      Host: order.amazon.com<br />
                      Payload: &#123; "sku": "B08N5WRWNW", "qty": 1, "deliveryAddressId": "addr_99182", "paymentToken": "tok_visa_4242" &#125;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 6. COMPONENT COMPARISON MATRIX */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'matrix' && (
          <section className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="text-xs font-semibold text-[#146EB4] uppercase tracking-wider">
                  Architectural Synthesis
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Comprehensive Component Comparison Matrix
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Side-by-side technical evaluation of core networking mechanisms used across the Amazon delivery pipeline.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
                  <thead className="bg-[#131921] text-white uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4 border-b border-[#232F3E]">Technology / Mechanism</th>
                      <th className="py-3 px-4 border-b border-[#232F3E]">Operating Layer</th>
                      <th className="py-3 px-4 border-b border-[#232F3E]">Addressing &amp; Tagging</th>
                      <th className="py-3 px-4 border-b border-[#232F3E]">Real-World Amazon Role</th>
                      <th className="py-3 px-4 border-b border-[#232F3E]">Failure Scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Access Port vs. Trunk Port</td>
                      <td className="py-3 px-4 font-mono text-slate-600">Layer 2 (Data Link)</td>
                      <td className="py-3 px-4 font-mono text-[#146EB4]">Untagged (Access) vs. 802.1Q Tag (Trunk)</td>
                      <td className="py-3 px-4 text-slate-700">Access ports connect warehouse scanners; trunks multiplex traffic to core L3 switches.</td>
                      <td className="py-3 px-4 text-slate-500">Native VLAN mismatch blocks spanning-tree topology.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">OSPF vs. BGP</td>
                      <td className="py-3 px-4 font-mono text-slate-600">Layer 3 (Interior vs Exterior)</td>
                      <td className="py-3 px-4 font-mono text-[#146EB4]">Link-State (Cost) vs. Path-Vector (AS-PATH)</td>
                      <td className="py-3 px-4 text-slate-700">OSPF routes within Amazon DC pods; BGP routes between customer ISP and Amazon AS16509.</td>
                      <td className="py-3 px-4 text-slate-500">OSPF link cut triggers SPF recalculation; BGP flap causes route dampening.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">IPv4 vs. IPv6</td>
                      <td className="py-3 px-4 font-mono text-slate-600">Layer 3 (Network Addressing)</td>
                      <td className="py-3 px-4 font-mono text-[#146EB4]">32-Bit (4.29B) vs. 128-Bit (3.4x10^38)</td>
                      <td className="py-3 px-4 text-slate-700">IPv4 relies on NAT/PAT; IPv6 enables direct end-to-end device routing with native IPsec.</td>
                      <td className="py-3 px-4 text-slate-500">IPv4 port exhaustion causes connection drops; IPv6 eliminates NAT bottlenecks.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">Layer 2 Switch vs. Layer 3 ASIC Switch</td>
                      <td className="py-3 px-4 font-mono text-slate-600">L2 MAC vs. L3/L4 Wire-Speed</td>
                      <td className="py-3 px-4 font-mono text-[#146EB4]">CAM Table vs. TCAM Hardware Lookup</td>
                      <td className="py-3 px-4 text-slate-700">L3 ASIC switches forward 400 Gbps Amazon spine-leaf traffic in under 500 nanoseconds.</td>
                      <td className="py-3 px-4 text-slate-500">TCAM table exhaustion degrades forwarding to software CPU queue.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 7. PRACTICAL DIAGNOSTIC LAB */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'lab' && (
          <section className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="text-xs font-semibold text-[#146EB4] uppercase tracking-wider">
                  Practical Troubleshooting Console
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Diagnostic Lab: "System Fails Under Normal Symptoms"
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Investigate real-world network failure scenarios encountered by Amazon network reliability engineers. Analyze simulated terminal logs, formulate root-cause deductions, and apply engineering fixes.
                </p>
              </div>

              {/* Lab Scenarios Accordion */}
              <div className="space-y-6">
                {labScenarios.map((lab) => (
                  <div
                    key={lab.id}
                    className={`p-5 rounded-xl border transition-all ${lab.resolved ? 'bg-emerald-50/40 border-emerald-300' : 'bg-white border-slate-200 shadow-xs'}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400">{lab.id}</span>
                        <h3 className="text-sm font-bold text-slate-900">{lab.title}</h3>
                      </div>
                      <button
                        onClick={() => markLabResolved(lab.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto ${
                          lab.resolved
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#131921] text-white hover:bg-[#232F3E]'
                        }`}
                      >
                        {lab.resolved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5 text-[#FF9900]" />}
                        {lab.resolved ? "Remediated & Verified" : "Mark as Remediated"}
                      </button>
                    </div>

                    <div className="text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong>Observed Symptom:</strong> {lab.symptom}
                    </div>

                    {/* Simulated Terminal Output */}
                    <div className="bg-[#131921] text-slate-200 p-4 rounded-lg font-mono text-xs overflow-x-auto mb-4 border border-[#232F3E]">
                      <div className="text-slate-400 text-[10px] border-b border-[#232F3E] pb-1 mb-2 flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-[#FF9900]" />
                        <span>Command Execution: <code className="text-[#FF9900]">{lab.terminalCommand}</code></span>
                      </div>
                      <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{lab.terminalOutput}</pre>
                    </div>

                    {/* Root Cause & Remediation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-rose-50/50 rounded-lg border border-rose-200/60">
                        <span className="font-semibold text-rose-800 block mb-1">Root Cause Deduction</span>
                        <p className="text-slate-700 leading-relaxed">{lab.deduction}</p>
                      </div>
                      <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-200/60">
                        <span className="font-semibold text-emerald-800 block mb-1">Actionable Remediation</span>
                        <p className="text-slate-700 leading-relaxed">{lab.remediation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 8. INTERACTIVE UNDERSTANDING CHECKS */}
        {/* ------------------------------------------------------------ */}
        {activeTab === 'quizzes' && (
          <section className="space-y-8">
            {/* Part A: Scenario MCQs */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="text-xs font-semibold text-[#146EB4] uppercase tracking-wider">
                  Conceptual Understanding Check
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Scenario-Grounded Architectural Questions
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Answer the following scenario-based problems to test your mental model of network protocols, boundaries, and failure isolation.
                </p>
              </div>

              <div className="space-y-8">
                {QUESTIONS.map((q, idx) => {
                  const selected = selectedAnswers[q.id];
                  const isAnswered = selected !== undefined && selected !== null;

                  return (
                    <div key={q.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#FF9900] font-bold uppercase">
                          Question 0{idx + 1}
                        </span>
                        <div className="text-xs text-slate-600 italic mt-1 bg-white p-3 rounded-lg border border-slate-200">
                          {q.scenario}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-3">
                          {q.question}
                        </h3>
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = "bg-white border-slate-200 text-slate-700 hover:border-slate-300";

                          if (isAnswered) {
                            if (optIdx === q.correctIndex) {
                              optStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-medium";
                            } else if (selected === optIdx) {
                              optStyle = "bg-rose-50 border-rose-400 text-rose-900 line-through";
                            } else {
                              optStyle = "bg-white border-slate-200 text-slate-400 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start gap-2.5 ${optStyle}`}
                            >
                              <span className="font-mono font-bold text-slate-400 shrink-0">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span className="flex-1">{opt}</span>
                              {isAnswered && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {isAnswered && selected === optIdx && optIdx !== q.correctIndex && (
                                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback Deck */}
                      {isAnswered && (
                        <div className="mt-3 p-4 rounded-lg bg-white border border-slate-200 text-xs space-y-2">
                          <div className={selected === q.correctIndex ? "text-emerald-800 font-bold" : "text-rose-800 font-bold"}>
                            {selected === q.correctIndex ? "✓ Correct Architecture Deduction" : "✕ Incorrect Deduction"}
                          </div>
                          <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                          <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 space-y-1">
                            <strong>Why Distractors Fail:</strong>
                            <ul className="list-disc pl-4 space-y-0.5">
                              {q.distractorBreakdowns.map((d, di) => (
                                <li key={di}>{d}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Part B: Match the Following */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-[#146EB4] uppercase tracking-wider">
                    Interactive Concept-to-Reality Pairing
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Match the Syllabus Concept to the Amazon Flow
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Click a theoretical concept on the left, then click its corresponding real-world engineering mechanism on the right to pair them.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={resetMatching}
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                  >
                    Reset Pairs
                  </button>
                  <button
                    onClick={evaluateMatching}
                    className="px-3.5 py-1.5 text-xs rounded-lg bg-[#FF9900] hover:bg-[#ffad33] text-[#131921] font-bold shadow-xs transition-colors"
                  >
                    Verify Pairs
                  </button>
                </div>
              </div>

              {/* Feedback Banner */}
              {matchEvaluation !== null && (
                <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${matchEvaluation ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                  {matchEvaluation ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      All 6 concepts correctly paired with their operational mechanisms!
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Some pairs are missing or mismatched. Review the relationships and try again.
                    </>
                  )}
                </div>
              )}

              {/* Two Column Matching Interface */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Syllabus Concepts */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Foundational Syllabus Concepts
                  </div>
                  {MATCH_DATA.map((item) => {
                    const isSelected = selectedLeft === item.id;
                    const isPaired = !!userPairs[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => handlePairClick('left', item.id)}
                        className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#FF9900] bg-amber-50/80 ring-2 ring-amber-200'
                            : isPaired
                            ? 'border-slate-300 bg-slate-50/80 text-slate-800'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{item.concept}</span>
                          {isPaired && (
                            <button
                              onClick={(e) => { e.stopPropagation(); removePair(item.id); }}
                              className="text-[10px] text-rose-500 hover:underline"
                            >
                              Unlink
                            </button>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">{item.description}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Concrete Mechanisms */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Real-World Amazon Architecture Mechanism
                  </div>
                  {/* Shuffled display of right items */}
                  {[...MATCH_DATA].reverse().map((item) => {
                    // Check if this item is paired with any left item
                    const pairedLeftId = Object.keys(userPairs).find(k => userPairs[k] === item.id);
                    const pairedConcept = pairedLeftId ? MATCH_DATA.find(m => m.id === pairedLeftId)?.concept : null;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handlePairClick('right', item.id)}
                        className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          pairedLeftId
                            ? 'border-emerald-300 bg-emerald-50/50'
                            : selectedLeft
                            ? 'border-amber-300 bg-white hover:bg-amber-50/40'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <p className="font-medium text-slate-800 leading-snug">{item.mechanism}</p>
                        {pairedConcept && (
                          <div className="mt-2 text-[10px] font-mono text-emerald-800 font-bold flex items-center gap-1">
                            <span>↔ Linked to: {pairedConcept}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* ============================================================ */}
      {/* FOOTER WITH AMAZON SQUID INK / AMBER PALETTE */}
      {/* ============================================================ */}
      <footer className="bg-[#131921] text-white border-t border-[#232F3E] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="bg-white px-2 py-0.5 rounded flex items-center">
              <AmazonLogo className="h-5" />
            </div>
            <span>·</span>
            <span className="font-semibold text-slate-200">Autonomous System 16509 Infrastructure Curriculum</span>
            <span>·</span>
            <span>Unit 2: Networking &amp; Physical Logistics</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Designed for intuitive SDR, VLSM &amp; routing comprehension</span>
            <span className="text-[#FF9900] font-mono">v3.4 · Production Spec</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
