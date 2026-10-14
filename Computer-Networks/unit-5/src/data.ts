import {
  TransitStage,
  ComparisonItem,
  EncapsulationLayer,
  DiagnosticCase,
  QuizQuestion,
  MatchPair,
  GuardrailCard
} from './types';

export const TRANSIT_STAGES: TransitStage[] = [
  {
    id: 1,
    title: 'Message Creation & E2E Encryption',
    subtitle: 'Client Device · Chennai Mobile Terminal',
    domain: 'Client Edge / Application Layer',
    pduLabel: 'Ciphertext PDU + Ephemeral Ratchet Key',
    latencyBudget: '15 - 35 ms',
    statusText: 'Clock Icon (Local Buffer)',
    schematicType: 'client',
    physicalReality:
      'The sender in Chennai taps "Send". The phone CPU generates cryptographic material locally before any bit touches the cellular antenna.',
    engineeringMechanism:
      'WhatsApp utilizes the Signal Protocol (Double Ratchet Algorithm, Curve25519, AES-256-GCM, HMAC-SHA256). Ephemeral ratchet keys advance, ensuring Forward Secrecy. The server never possesses plaintext decryption keys.',
    syllabusConcept:
      'Virtualized Communication Services & Zero-Trust Endpoints: Security boundaries migrate completely to edge software nodes, rendering intermediary cloud routers zero-knowledge transport conduits.'
  },
  {
    id: 2,
    title: '5G Radio Access Network & Network Slicing',
    subtitle: 'Chennai gNodeB · 5G NR Cell Site',
    domain: 'Radio Access Network (RAN) / Physical & MAC',
    pduLabel: '5G NR MAC PDU · Slice ID: SST-1 (eMBB/Reliable)',
    latencyBudget: '4 - 12 ms',
    statusText: 'Cellular Uplink Frame',
    schematicType: 'slicing',
    physicalReality:
      'The phone broadcasts high-frequency millimeter/sub-6GHz radio waves to the nearest gNodeB mobile tower in Chennai.',
    engineeringMechanism:
      'Network Slicing partitions physical 5G radio and core resources into isolated virtual subnets. WhatsApp chat traffic is mapped to an ultra-reliable, low-jitter slice (SST 1 / custom eMBB-QoS), while concurrent 4K video calls or smart city IoT sensors occupy entirely separate slices without resource starvation.',
    syllabusConcept:
      '5G Network Slicing & QoS Differentiation: Virtualizing a single physical RF infrastructure into multiple logical networks with independent SLA, throughput, and latency guarantees.'
  },
  {
    id: 3,
    title: 'Telecom Core via NFV (VNF, NFVI & MANO)',
    subtitle: 'Telecom Edge Data Center · Chennai Core',
    domain: 'Telco Virtualized Core (NFV)',
    pduLabel: 'GTP-U Encapsulated Packet (UDP 2152)',
    latencyBudget: '8 - 20 ms',
    statusText: 'Core Gateway Routing',
    schematicType: 'nfv',
    physicalReality:
      'The radio frames leave the antenna via fiber to the mobile operator’s regional core data center in Chennai.',
    engineeringMechanism:
      'Instead of proprietary ASIC telecom hardware boxes, routing functions execute as Virtual Network Functions (VNFs) like the User Plane Function (UPF) running on commodity x86 servers (NFVI) orchestrated dynamically by MANO (Management and Orchestration).',
    syllabusConcept:
      'Network Function Virtualization (NFV): Decoupling network functions (firewalls, EPC, UPF, NAT) from specialized proprietary hardware to run on standardized cloud hypervisors and COTS hardware.'
  },
  {
    id: 4,
    title: 'WhatsApp Cloud Ingress & VPC Perimeter',
    subtitle: 'Hyperscale Edge PoP · Mumbai Direct Connect',
    domain: 'Cloud Networking & Virtual Private Cloud (VPC)',
    pduLabel: 'TLS 1.3 / Noise WebSocket Frame over IPv6',
    latencyBudget: '18 - 40 ms',
    statusText: 'Single Grey Tick (Server Ingress)',
    schematicType: 'vpc',
    physicalReality:
      'The telecom carrier hands off the IP packets via high-speed peering (Direct Connect / IXP) into WhatsApp / Meta’s private cloud backbone.',
    engineeringMechanism:
      'The packet enters a Virtual Private Cloud (VPC) with strictly segmented subnets and stateless Network ACLs. Security Groups enforce ingress filtering, permitting exclusively mutual TLS on ports 443 and 5222, immediately dropping non-conforming probes.',
    syllabusConcept:
      'Virtual Private Cloud (VPC) & Cloud Isolation: Software-defined overlays (VXLAN/GENEVE) enabling multi-tenant logical network segregation inside hyperscale shared hardware.'
  },
  {
    id: 5,
    title: 'Distributed Layer 7 Load Balancing & Health Probes',
    subtitle: 'Gateway Ingress Cluster · Anycast Proxy',
    domain: 'Application Delivery / Reverse Proxy',
    pduLabel: 'HTTP/2 WebSocket Multiplexed Frame',
    latencyBudget: '5 - 15 ms',
    statusText: 'Single Grey Tick (Enqueued in Broker)',
    schematicType: 'lb',
    physicalReality:
      'Over 100 million concurrent connections hit the ingress cluster simultaneously across India.',
    engineeringMechanism:
      'Layer 7 Load Balancers (Maglev / Envoy / Custom Erlang proxy) distribute sessions using Consistent Hashing on the sender-receiver pair. Active health check probes continuously ping workers; failing pods are evicted within milliseconds with zero dropped connections.',
    syllabusConcept:
      'Load Balancing & High Availability: Eliminating single points of failure by spreading dynamic workloads across heterogeneous server pools with automated health monitoring.'
  },
  {
    id: 6,
    title: 'Elastic Auto-Scaling Group Execution',
    subtitle: 'Container Orchestrator · Dynamic Worker Mesh',
    domain: 'Cloud Orchestration & Elastic Compute',
    pduLabel: 'Internal RPC Message (Erlang Actor Msg)',
    latencyBudget: '10 - 25 ms',
    statusText: 'Queue Processed & Stored',
    schematicType: 'autoscaling',
    physicalReality:
      'Sudden surges (e.g., midnight New Year’s Eve, breaking news) spike traffic 10x within seconds.',
    engineeringMechanism:
      'The cloud platform monitors CPU saturation, queue depth, and socket counts. The Horizontal Pod/Cluster Auto-scaler provisions hundreds of stateless Erlang/BEAM container instances dynamically, contracting them automatically once load normalizes.',
    syllabusConcept:
      'Cloud Elasticity & Dynamic Auto-Scaling: Real-time capacity adaptation minimizing compute expenditure while maintaining strict sub-second SLA compliance.'
  },
  {
    id: 7,
    title: 'Spine-Leaf Fabric & SDN Control Plane',
    subtitle: 'Hyperscale Data Center Interior · Server-to-Server Fabric',
    domain: 'Data Center Architecture / SDN',
    pduLabel: 'VXLAN Encapsulated East-West Frame',
    latencyBudget: '2 - 5 ms',
    statusText: 'Inter-Cluster Transfer (E-W)',
    schematicType: 'spineleaf',
    physicalReality:
      'Inside the data center, the sender’s connection server must communicate with the database and Delhi recipient’s designated session gateway.',
    engineeringMechanism:
      'Modern Spine-Leaf architecture connects every Leaf switch to every Spine switch, providing deterministic 2-hop latency and massive East-West bisectional bandwidth. A central Software-Defined Networking (SDN) controller programs flow tables directly via OpenFlow/P4.',
    syllabusConcept:
      'Spine-Leaf Topology & SDN: Replacing legacy hierarchical spanning-tree bottlenecks with non-blocking full-mesh switching and programmable control/data plane separation.'
  },
  {
    id: 8,
    title: 'Intelligent Routing & Delivery to Delhi Recipient',
    subtitle: 'Inter-City Backbone → Delhi Mobile Tower → Recipient',
    domain: 'Intelligent Path Optimization & Client Push',
    pduLabel: 'E2EE Payload Push + Delivery Receipt ACK',
    latencyBudget: '40 - 120 ms',
    statusText: 'Double Grey Tick (Delivered) → Double Blue Tick (Read)',
    schematicType: 'delivery',
    physicalReality:
      'The message traverses inter-city optical links from Mumbai to Delhi, enters the Delhi gNodeB tower, and arrives at the recipient’s phone screen.',
    engineeringMechanism:
      'Intelligent routing algorithms (Genetic Algorithm heuristics) optimize path selection over multi-carrier transit backbones based on live congestion, packet loss, and jitter. Upon device receipt, an ACK packet flows back, updating the sender UI to double ticks.',
    syllabusConcept:
      'Heuristic / GA-Based Routing & Asynchronous Store-and-Forward: Resolving multi-objective network constraints under fluctuating topological congestion.'
  }
];

export const COMPARISON_TABLE: ComparisonItem[] = [
  {
    dimension: 'Mobile Access Layer',
    legacy: '4G LTE: Single "best-effort" or rigid QCI channel shared by all traffic types',
    modern: '5G Network Slicing: Virtual subnets (eMBB, URLLC, mMTC) with independent radio SLAs',
    advantage: 'Prevents video stream congestion from degrading mission-critical or real-time text packets',
    layer: 'Physical & Data Link (Layer 1/2)'
  },
  {
    dimension: 'Telecom Core Hardware',
    legacy: 'Proprietary ASIC appliances (Cisco, Huawei dedicated EPC racks with vendor lock-in)',
    modern: 'NFV (VNF + NFVI + MANO): Virtual functions running on commercial off-the-shelf x86 servers',
    advantage: '80% lower capital expense, zero-downtime software patches, rapid cloud-native scaling',
    layer: 'Network & Transport (Layer 3/4)'
  },
  {
    dimension: 'Data Center Interior',
    legacy: 'Three-Tier Architecture (Core, Aggregation, Access) bottlenecked by Spanning Tree (STP)',
    modern: 'Spine-Leaf Architecture: Equal-Cost Multi-Path (ECMP), every leaf connects to all spines',
    advantage: 'Predictable 2-hop latency, eliminates blocked STP ports, non-blocking East-West traffic',
    layer: 'Data Center Fabric (Layer 2/3)'
  },
  {
    dimension: 'Network Control Logic',
    legacy: 'Autonomous control plane per switch (distributed OSPF/BGP convergence, slow manual config)',
    modern: 'Software-Defined Networking (SDN): Centralized control plane, decoupled data plane',
    advantage: 'Instant global traffic engineering, automated flow reconfiguration, programmable routing',
    layer: 'Control Plane vs Data Plane'
  },
  {
    dimension: 'Traffic Route Selection',
    legacy: 'Static shortest-path heuristics (Dijkstra, Bellman-Ford relying purely on hop count)',
    modern: 'Genetic Algorithm (GA) & AI heuristics optimizing delay, packet loss, and jitter jointly',
    advantage: 'Avoids micro-burst congestion hotspots on cross-country transit lines (Chennai-Delhi)',
    layer: 'Wide Area Network (WAN)'
  },
  {
    dimension: 'Server Capacity Model',
    legacy: 'Static provisioning: Provisioning physical servers for peak New Year load 365 days a year',
    modern: 'Dynamic Cloud Auto-Scaling: Elastic cluster expansion triggered by live CPU/queue metrics',
    advantage: 'Fractional infrastructure costs during lull hours, instant scale-up during sudden surges',
    layer: 'Cloud Compute Infrastructure'
  }
];

export const ENCAPSULATION_STACK: EncapsulationLayer[] = [
  {
    level: 1,
    name: 'Application Payload (WhatsApp Message)',
    pdu: 'Plaintext Message Struct',
    headerSize: 'Variable (~48 bytes JSON/Protobuf)',
    fields: [
      { name: 'sender_jid', value: '+919840XXXXXX@s.whatsapp.net', desc: 'Unique WhatsApp ID of Chennai sender' },
      { name: 'recipient_jid', value: '+919811XXXXXX@s.whatsapp.net', desc: 'Unique WhatsApp ID of Delhi recipient' },
      { name: 'timestamp', value: '1740000000', desc: 'POSIX epoch time of message origination' },
      { name: 'content', value: '"Good morning!"', desc: 'Message payload prior to local encryption' }
    ],
    securityNote: 'Plaintext lives only in isolated phone RAM memory for microseconds prior to Signal ciphering.'
  },
  {
    level: 2,
    name: 'End-to-End Encryption Layer (Signal Protocol)',
    pdu: 'Noise Protocol Ciphertext Frame',
    headerSize: '32-byte Auth Tag + 16-byte IV',
    fields: [
      { name: 'ratchet_pubkey', value: '0x3F8A2B9C... (Curve25519)', desc: 'Ephemeral public key advancing forward secrecy' },
      { name: 'message_counter', value: '142', desc: 'Monotonically increasing ratchet counter' },
      { name: 'ciphertext_payload', value: '0x88E2B1F04A76C983... (AES-256-GCM)', desc: 'Encrypted message opaque to WhatsApp servers' },
      { name: 'hmac_signature', value: '0x9E71F0AA... (HMAC-SHA256)', desc: 'Cryptographic integrity verification digest' }
    ],
    securityNote: 'Zero-Knowledge guarantee: Cloud servers cannot inspect or modify this encrypted payload.'
  },
  {
    level: 3,
    name: 'Transport & Session Layer (TLS 1.3 / WebSocket)',
    pdu: 'TLS Application Data Record',
    headerSize: '5-byte TLS Record + 2-10 byte WS Header',
    fields: [
      { name: 'content_type', value: '0x17 (Application Data)', desc: 'TLS record type identifier' },
      { name: 'protocol_version', value: '0x0303 (TLS 1.3 Draft/RFC)', desc: 'Negotiated cipher suite' },
      { name: 'ws_opcode', value: '0x2 (Binary Frame)', desc: 'WebSocket frame carrier for Erlang broker' },
      { name: 'masking_key', value: '0xA1B2C3D4', desc: 'Client-to-server WebSocket frame XOR mask' }
    ],
    securityNote: 'Protects metadata in transit between client phone and WhatsApp Cloud Ingress Gateway.'
  },
  {
    level: 4,
    name: 'Transport Layer (TCP)',
    pdu: 'TCP Segment',
    headerSize: '20 bytes (No options)',
    fields: [
      { name: 'src_port', value: '54219 (Ephemeral)', desc: 'Random ephemeral client socket' },
      { name: 'dst_port', value: '5222 / 443 (WhatsApp Gateway)', desc: 'WhatsApp chat gateway ingress listener' },
      { name: 'seq_number', value: '3819204128', desc: 'Byte-stream ordering for packet reassembly' },
      { name: 'ack_flag', value: 'ACK, PSH', desc: 'Push data immediately to application buffer' }
    ],
    securityNote: 'Ensures reliable, ordered delivery across fluctuating mobile radio conditions.'
  },
  {
    level: 5,
    name: 'Network Layer (IPv6 / IPv4)',
    pdu: 'IP Datagram',
    headerSize: '40 bytes (IPv6 fixed)',
    fields: [
      { name: 'version', value: '6 (IPv6)', desc: 'Next-generation cellular IP addressing' },
      { name: 'src_ip', value: '2409:4072:XXXX::10 (Jio Chennai)', desc: 'Public cellular carrier allocated IP' },
      { name: 'dst_ip', value: '2a03:2880:XXXX::14 (Meta Edge PoP)', desc: 'WhatsApp Anycast Edge gateway IP' },
      { name: 'hop_limit', value: '64', desc: 'Time-To-Live decremented at each router' }
    ],
    securityNote: 'End-to-end addressing across public internet and cloud edge ingress.'
  },
  {
    level: 6,
    name: '5G Core Tunneling Layer (GTP-U)',
    pdu: 'GPRS Tunnelling Protocol User Plane',
    headerSize: '8 bytes + UDP encapsulation',
    fields: [
      { name: 'teid', value: '0x004A9F21', desc: 'Tunnel Endpoint Identifier assigned to phone bearer' },
      { name: 'qfi', value: '9 (Standard Internet QoS)', desc: 'QoS Flow Identifier in 5G Service Data Flow' },
      { name: 'udp_port', value: '2152', desc: 'Standard 3GPP GTP-U port between gNodeB and UPF' }
    ],
    securityNote: 'Separates user payload from cellular signaling control plane inside telecom core.'
  }
];

export const DIAGNOSTIC_CASES: DiagnosticCase[] = [
  {
    id: 'case-1',
    title: '5G Slice QoS Mismatch (Traffic Dropped at gNodeB)',
    symptom: 'Sender phone is connected to 5G network with full signal, but WhatsApp messages remain on clock icon for 45 seconds before timing out.',
    layer: 'Radio Access Network (5G Slicing / Layer 2)',
    command: 'ethtool -S wwan0 && ip netns exec radio qos-stat',
    rawOutput: `[wwan0] 5G NR Interface Statistics:
  rx_packets: 419208  tx_packets: 29810
  slice_sst: 1 (eMBB Default)
  active_qfi: 5 (IMS Signaling)
  rejected_flows_qfi_mismatch: 14209 [CRITICAL]
  qfi_queue_overflow: 8991
  buffer_tail_drop_count: 5218
  slice_bandwidth_cap: 1024 kbps [SATURATED]
  5G Core Bearer UPF Status: ATTACHED_UNMAPPED`,
    rootCause:
      'The telecom operator’s Network Slicing engine misclassified the WhatsApp chat bearer to a congested IoT slice (QFI 5) with a 1Mbps cap instead of the high-reliability messaging slice (SST 1 / QFI 9). Packets are tail-dropped at the gNodeB radio scheduler buffer.',
    deduction:
      'Full RF signal bar only indicates physical carrier sync, not slice admission. When slice buffer drops exceed zero, the device cannot transmit packets regardless of 5G tower proximity.',
    remediation:
      'Update 5G Core Unified Data Management (UDM) Policy and Session Management Function (SMF) mapping rules to bind WhatsApp DSCP AF31 tags directly to 5G Slice SST 1 with guaranteed minimum throughput.',
    fixCommand: '5gcore-cli smf update-bearer --imsi 40445XXXXXXXXXX --qfi 9 --slice-sst 1 --commit'
  },
  {
    id: 'case-2',
    title: 'VNF User Plane Function (UPF) Memory Exhaustion',
    symptom: 'Messages across an entire metropolitan telecom zone in Chennai fail to reach the cloud. Telecom logs indicate carrier gateway unreachable.',
    layer: 'Telecom Core NFV (VNF/NFVI)',
    command: 'mano-orchctl vnf status --id upf-chennai-south-04',
    rawOutput: `VNF ID: upf-chennai-south-04
Host NFVI Node: x86-blade-rack12.chn.telco.internal
Status: DEGRADED (OOMKilled worker threads)
Memory Usage: 127.8 GB / 128 GB (99.8%)
CPU Load: 98.4% (DPDK Poll Mode Driver Saturation)
Active GTP-U Tunnels: 2,410,980 (Exceeds SLA 2.0M)
MANO Auto-Heal Trigger: IN_PROGRESS (Waiting for spare NFVI host)`,
    rootCause:
      'The virtualized User Plane Function (UPF) container ran out of memory under peak evening commuter handover traffic. The NFV Management and Orchestration (MANO) failed to spin up a secondary VNF instance due to NFVI host resource lock.',
    deduction:
      'NFV replaces fixed hardware with software, but software can exhaust kernel buffers and hypervisor RAM. When MANO auto-scaling lags, all encapsulated cellular packets are silently blackholed.',
    remediation:
      'Issue an emergency MANO scale-out command to spawn 3 additional UPF instances on adjacent spare NFVI compute blades, and configure DPDK ring buffers to throttle rather than crash worker threads.',
    fixCommand: 'mano-orchctl scale-out --vnf-type UPF --region chn-south --replicas +3 --preempt-low-pri'
  },
  {
    id: 'case-3',
    title: 'Load Balancer Flapping Health Check & Zombie Nodes',
    symptom: 'One grey tick appears, but the message is delayed by 8 minutes before delivering. Ingress HTTP/2 WebSocket connections experience sporadic 502/504 errors.',
    layer: 'Cloud Ingress / Load Balancing (Layer 7)',
    command: 'curl -Iv --resolve chat.whatsapp.net:443:10.0.4.15 https://chat.whatsapp.net/health',
    rawOutput: `* Connecting to 10.0.4.15:443...
* Connected to chat.whatsapp.net (10.0.4.15) port 443
> GET /health HTTP/2
> Host: chat.whatsapp.net
< HTTP/2 503 Service Unavailable
< content-length: 42
< x-backend-cluster: erlang-chat-broker-node-88
< x-health-check-failure-count: 2
* Connection #0 left intact
Node 88 heartbeat jitter: 1420ms (Threshold: 500ms)
Traffic split: 12% directed to unstable backend`,
    rootCause:
      'Load Balancer health check interval was configured too aggressively (500ms timeout with 2-failure trip). Erlang garbage collection pauses triggered false-positive unhealthy flags, causing the proxy to cycle the node in and out of the active pool (flapping), breaking established client sessions.',
    deduction:
      'Misconfigured health checks are more dangerous than server crashes. Flapping causes connection stampedes where thousands of clients reconnect at once, overwhelming the load balancer table.',
    remediation:
      'Adjust health check timeout to 2500ms with 3 consecutive failure trips and a 30-second drain cooldown, enabling smooth connection draining before traffic eviction.',
    fixCommand: 'kubectl patch l7policy edge-ingress-lb --type=merge -p \'{"spec":{"healthCheck":{"timeoutSeconds":3,"unhealthyThreshold":3,"drainTimeSeconds":30}}}\''
  },
  {
    id: 'case-4',
    title: 'Spine-Leaf MTU Mismatch (Silent TCP Black Hole)',
    symptom: 'Small text messages ("Hi") deliver instantly with double blue ticks, but image attachments and longer messages get stuck indefinitely with a rotating clock.',
    layer: 'Data Center Interior (Spine-Leaf Fabric)',
    command: 'ping -M do -s 8972 10.128.4.22 && ip route get 10.128.4.22',
    rawOutput: `PING 10.128.4.22 (10.128.4.22) 8972(9000) bytes of data.
From 10.128.0.1 icmp_seq=1 Frag needed and DF set (mtu = 1500)
--- 10.128.4.22 ping statistics ---
1 packets transmitted, 0 received, +1 errors, 100% packet loss

Leaf-04 Switch Interface Eth1/2: MTU 9000 (Jumbo Frame)
Spine-02 Switch Interface Eth2/1: MTU 1500 (Standard Frame - MISCONFIGURATION)
VXLAN Tunnel Overhead: 50 bytes (Frame size 1550 exceeds Spine MTU)`,
    rootCause:
      'A replacement Spine switch was deployed with default MTU 1500 instead of DC fabric standard Jumbo MTU 9000. When encrypted images produce VXLAN encapsulated packets larger than 1500 bytes with Don’t Fragment (DF) set, the spine switch silently drops them.',
    deduction:
      'Small text packets are under 1400 bytes, so they slip through fine. Media payloads exceed 1500 bytes and vanish into the MTU black hole. Classic Layer 2/3 MTU mismatch syndrome.',
    remediation:
      'Enforce consistent Jumbo MTU 9216 across all Spine and Leaf interfaces in the SDN fabric automation template.',
    fixCommand: 'sdn-fabric-cli set-mtu --all-switches --role all --mtu 9216 --verify-jumbo'
  },
  {
    id: 'case-5',
    title: 'Auto-Scaler Cooldown Throttling During Flash Surge',
    symptom: 'Breaking news causes an 800% traffic spike. End-to-end delivery latency shoots from 1.1s to 24.8s. Cloud monitoring shows massive queue buildup.',
    layer: 'Cloud Compute / Dynamic Auto-Scaling',
    command: 'kubectl describe hpa whatsapp-gateway-prod',
    rawOutput: `Name:                                  whatsapp-gateway-prod
Namespace:                             chat-core
Metrics:
  Resource cpu on pods:                98% / 70% [OVERLOAD]
  Custom broker_queue_length:          412,890 msgs [CRITICAL]
Min replicas:                          40
Max replicas:                          400
Current replicas:                      40
Desired replicas:                      180
Events:
  Warning  ScalingLimited  6s (x12 over 4m)  kube-controller-manager
           ScaleUpCooldown active (300s window remaining); scale-up request blocked`,
    rootCause:
      'The Horizontal Pod Autoscaler (HPA) had a conservative 5-minute (300s) scale-up cooldown configured to prevent node thrashing. During a flash crowd, traffic jumped 8x in 30 seconds, but the auto-scaler refused to launch new pods until the timer expired.',
    deduction:
      'Auto-scaling algorithms require asymmetric hysteresis: scale-up must be nearly instantaneous (0-15s), while scale-down should be gradual (300s) to prevent thrashing without choking on traffic spikes.',
    remediation:
      'Eliminate scale-up stabilization window and configure rapid-burst scaling rule allowing 100% replica doubling every 15 seconds when CPU exceeds 80%.',
    fixCommand: 'kubectl patch hpa whatsapp-gateway-prod --patch \'{"spec":{"behavior":{"scaleUp":{"stabilizationWindowSeconds":0,"policies":[{"type":"Percent","value":100,"periodSeconds":15}]}}}}\''
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario:
      'A user in Chennai sends a WhatsApp message while streaming a 4K football match over 5G. Despite heavy video buffering on the phone, the WhatsApp text message delivers in under 1.2 seconds.',
    question:
      'Which Unit 5 networking mechanism prevents the high-bandwidth video stream from degrading the latency of the text message?',
    options: [
      { id: 'A', text: 'Classic Spanning Tree Protocol (STP) port cost rebalancing' },
      { id: 'B', text: '5G Network Slicing assigning separate virtual network slices with isolated QoS flows' },
      { id: 'C', text: 'End-to-End Encryption running Curve25519 compression' },
      { id: 'D', text: 'Static Dijkstra shortest-path recalculation on the handset' }
    ],
    correctId: 'B',
    explanation:
      '5G Network Slicing multiplexes multiple independent virtualized logical networks over one physical radio network. The text message travels on a high-priority, ultra-reliable slice with reserved radio resource blocks, completely immune to 4K video buffer contention.',
    whyWrong: {
      A: 'STP is an enterprise Ethernet Layer 2 loop-prevention protocol, not a cellular radio multiplexing mechanism.',
      C: 'Encryption secures the data confidentiality but does not allocate RF bandwidth or cellular scheduling priority.',
      D: 'Handsets do not compute routing tables using Dijkstra; wide-area routing occurs across cloud and telecom backbones.'
    }
  },
  {
    id: 2,
    scenario:
      'During New Year’s Eve midnight celebrations, WhatsApp message intake jumps from 40,000 to 450,000 messages per second in under two minutes. No human operator touched the servers, yet latency remained stable.',
    question:
      'What cloud architecture mechanism is directly responsible for absorbing this massive traffic surge?',
    options: [
      { id: 'A', text: 'Autonomous Cloud Auto-Scaling reacting to CPU/queue telemetry by provisioning new virtual instances' },
      { id: 'B', text: 'Manually mounting additional NVMe SSD storage racks in the data center' },
      { id: 'C', text: 'Downgrading all 256-bit encryption keys to 64-bit keys to reduce compute load' },
      { id: 'D', text: 'Converting the cellular network from 5G back to 2G circuit switching' }
    ],
    correctId: 'A',
    explanation:
      'Cloud Auto-Scaling continuously polls telemetry (CPU saturation, socket counts, queue latency). When thresholds breach target SLAs, the orchestrator triggers automated instantiation of stateless microservices/containers within seconds.',
    whyWrong: {
      B: 'Manual physical hardware installation requires weeks and cannot resolve an instantaneous flash surge.',
      C: 'Cryptographic parameters are immutable; downgrading cipher strength would compromise end-to-end security and violate protocol invariants.',
      D: '2G circuit switching has vastly lower capacity and cannot support high-concurrency packet data.'
    }
  },
  {
    id: 3,
    scenario:
      'Inside Meta’s hyperscale data center, Server A needs to communicate with Server B. In traditional 3-tier networks, this east-west traffic often congested core switches. In modern WhatsApp infrastructure, latency is always exactly two switch hops.',
    question:
      'Which data center network topology guarantees this predictable two-hop inter-server latency?',
    options: [
      { id: 'A', text: 'Token Ring topology with dual counter-rotating fiber loops' },
      { id: 'B', text: 'Spine-Leaf (Clos) architecture where every leaf switch connects directly to every spine switch' },
      { id: 'C', text: 'Hub-and-Spoke topology with a single central mainframe gateway' },
      { id: 'D', text: 'Bus topology utilizing CSMA/CD collision detection' }
    ],
    correctId: 'B',
    explanation:
      'In a Spine-Leaf architecture, every Leaf (Top-of-Rack) switch is directly wired to every Spine switch. Server A talks to its Leaf, hops to any Spine, and drops down to Server B’s Leaf — always exactly 2 switch hops with non-blocking Equal-Cost Multi-Path (ECMP) routing.',
    whyWrong: {
      A: 'Token Ring is an obsolete 1980s 16Mbps LAN technology with deterministic token passing, unusable at cloud scale.',
      C: 'Hub-and-spoke creates a catastrophic single bottleneck at the hub, failing hyperscale data center bandwidth demands.',
      D: 'Bus topology with CSMA/CD is a legacy coaxial cable standard that collapses under high load due to packet collisions.'
    }
  },
  {
    id: 4,
    scenario:
      'A telecom provider is upgrading its core network. Instead of purchasing million-dollar specialized hardware routers and firewall boxes from hardware vendors, they install standardized commodity x86 servers and deploy routing software.',
    question:
      'Which Unit 5 technology represents this architectural transformation?',
    options: [
      { id: 'A', text: 'Network Function Virtualization (NFV) utilizing VNFs and MANO orchestration' },
      { id: 'B', text: 'Direct-Sequence Spread Spectrum (DSSS)' },
      { id: 'C', text: 'Asymmetric Digital Subscriber Line (ADSL)' },
      { id: 'D', text: 'Frequency Division Multiple Access (FDMA)' }
    ],
    correctId: 'A',
    explanation:
      'NFV replaces proprietary telecom hardware appliances with software running as Virtual Network Functions (VNFs) on standardized COTS (Commercial Off-The-Shelf) servers, managed by MANO (Management and Orchestration).',
    whyWrong: {
      B: 'DSSS is a physical-layer spread spectrum modulation technique used in early 802.11 Wi-Fi and 3G CDMA.',
      C: 'ADSL is legacy copper-wire telephone broadband technology.',
      D: 'FDMA is a 1G radio spectrum multiplexing technique.'
    }
  }
];

export const MATCH_PAIRS: MatchPair[] = [
  {
    id: 'pair-1',
    concept: '5G Network Slicing',
    conceptDetail: 'Partitioning physical radio and core infrastructure into isolated virtual channels',
    mechanism: 'Separating WhatsApp chat packets from 4K streaming and IoT smart meters over Chennai gNodeB',
    mechanismDetail: 'SST 1 / QFI allocation preventing cellular radio resource starvation'
  },
  {
    id: 'pair-2',
    concept: 'NFV & MANO',
    conceptDetail: 'Decoupling network functions from vendor hardware to run as software on x86 hypervisors',
    mechanism: 'Executing User Plane Function (UPF) on commodity servers in telecom carrier exchange',
    mechanismDetail: 'Rapid automated spin-up of virtual telecom gateways without physical truck rolls'
  },
  {
    id: 'pair-3',
    concept: 'Virtual Private Cloud (VPC)',
    conceptDetail: 'Software-defined isolated network enclave within shared hyperscale cloud infrastructure',
    mechanism: 'Enforcing Security Group firewalls allowing only mutual TLS traffic on ports 443 & 5222',
    mechanismDetail: 'Opaque overlay tenant isolation preventing external probing of database clusters'
  },
  {
    id: 'pair-4',
    concept: 'Layer 7 Load Balancing',
    conceptDetail: 'Reverse proxy distributing client connections using application-layer intelligence',
    mechanism: 'Spreading millions of persistent WebSockets evenly with active health probe monitoring',
    mechanismDetail: 'Consistent hashing ensuring sender-receiver session affinity without single points of failure'
  },
  {
    id: 'pair-5',
    concept: 'Spine-Leaf Architecture',
    conceptDetail: 'Non-blocking 2-hop switching fabric interconnecting every leaf to all spines',
    mechanism: 'Transferring message payload from Chennai ingress worker to Delhi outbound gateway in 2 switch hops',
    mechanismDetail: 'ECMP multi-pathing providing massive east-west inter-server bandwidth'
  },
  {
    id: 'pair-6',
    concept: 'Genetic Algorithm Routing',
    conceptDetail: 'Heuristic evolutionary optimization for multi-constraint path determination',
    mechanism: 'Selecting optimal inter-city transit fiber between Mumbai and Delhi avoiding congested IXP nodes',
    mechanismDetail: 'Fitness evaluation balancing propagation delay, packet loss rate, and jitter'
  }
];

export const GUARDRAILS: GuardrailCard[] = [
  {
    title: 'Encryption & Zero-Knowledge Architecture',
    pedagogicalSimplification:
      'In basic textbooks, encryption is depicted as a simple key locking a message box that the server decrypts and re-encrypts.',
    productionReality:
      'WhatsApp utilizes the Signal Protocol (Double Ratchet Algorithm, Curve25519, AES-256-GCM). Every individual message generates an ephemeral key advancing forward secrecy. WhatsApp servers never have access to private keys and route ciphertext blindly. The server cannot inspect content even for routing purposes.',
    technicalDepth:
      'Ratchet state advances with every round-trip. Compromise of a single ephemeral key reveals zero past or future messages.'
  },
  {
    title: 'Massive Erlang/FreeBSD Clustering vs Generic Web Servers',
    pedagogicalSimplification:
      'Classroom diagrams frequently illustrate simple Apache/Node.js web servers writing directly to an SQL database table.',
    productionReality:
      'WhatsApp famously runs highly customized Erlang/BEAM on stripped-down FreeBSD kernels. A single physical box routinely holds over 2.5 million concurrent long-lived TCP/TLS sockets. Ephemeral messages are not retained on disk once delivered; the cluster acts as a distributed memory routing fabric rather than a persistent document store.',
    technicalDepth:
      'Custom FreeBSD kernel TCP buffer tuning (`sysctl` network stack optimizations) allows millions of idle socket descriptors per host.'
  },
  {
    title: 'Edge PoPs & Anycast BGP Peering',
    pedagogicalSimplification:
      'Students assume a packet travels directly over the open public internet from the user’s phone straight to a single central US data center.',
    productionReality:
      'Packets terminate at the nearest regional Edge Point of Presence (PoP) in Mumbai or Chennai via BGP Anycast routing within 10ms. Once inside the PoP, traffic travels across Meta’s dedicated, privately leased trans-continental optical fiber backbone, completely bypassing the unpredictable public internet.',
    technicalDepth:
      'BGP Anycast advertises the identical IP address from hundreds of edge locations globally; packets naturally route to the closest geographical PoP.'
  },
  {
    title: 'Push Notification Orchestration (APNs / FCM) vs Raw Sockets',
    pedagogicalSimplification:
      'Modules often assume the recipient’s phone maintains an active, awake TCP socket 24/7 awaiting incoming packets.',
    productionReality:
      'Mobile operating systems (iOS and Android) aggressively suspend background apps to preserve battery. When the recipient is offline or phone is locked, WhatsApp dispatches a lightweight wake-up push notification via Apple Push Notification service (APNs) or Google Firebase Cloud Messaging (FCM). The phone OS wakes the WhatsApp daemon to establish the TLS socket and pull the ciphertext.',
    technicalDepth:
      'Silent push packets with high-priority VoIP entitlement wake the background thread within 250ms without battery drain.'
  },
  {
    title: 'Educational Scope Boundary: Modern Tech vs Layer 2/3 Foundations',
    pedagogicalSimplification:
      'This Unit 5 case study focuses on modern virtualization, cloud elasticity, 5G slicing, and software-defined switching.',
    productionReality:
      'Modern systems build atop foundational protocols from Units 1–4 (Ethernet framing, TCP flow control, sliding windows, CRC checks, BGP peering). While Unit 5 introduces the virtualized abstraction layer (NFV, SDN, Clouds), physical optical fiber dispersion, silicon physics, and packet serialization limits still govern the absolute laws of network performance.',
    technicalDepth:
      'Virtualization adds agility and isolation, but speed of light in glass (~200,000 km/s) remains the immutable physical boundary for round-trip latency.'
  }
];
