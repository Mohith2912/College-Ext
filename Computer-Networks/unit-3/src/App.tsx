import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Terminal,
  Activity,
  ArrowRight,
  Layers,
  Network,
  Cpu,
  Server,
  ShieldCheck,
  RefreshCw,
  Info,
  Maximize2,
  HelpCircle,
  Link as LinkIcon,
  Unlink,
  Check,
  Sliders,
  Radio,
  FileText,
  Search,
  Sparkles,
  MessageSquare,
  Zap,
  BookOpen
} from 'lucide-react';

// ==========================================
// 1. DATA STRUCTURES & CASE STUDY CURRICULUM
// ==========================================

interface PipelineStage {
  id: number;
  phase: string;
  name: string;
  tcpState: string;
  domain: string;
  pduLabel: string;
  schematic: {
    senderNode: string;
    receiverNode: string;
    direction: 'forward' | 'backward' | 'bidirectional';
    flags: string;
    seqAck: string;
    windowValue: string;
    bufferStatus: string;
  };
  googleScenario: string;
  relatableUnderstanding: string;
  physicalReality: string;
  engineeringMechanism: string;
  syllabusConceptAnchor: string;
  technicalMetrics: { label: string; value: string }[];
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 1,
    phase: 'Connection Initiation',
    name: 'Student Presses Enter & Sends SYN',
    tcpState: 'SYN-SENT (Client) / LISTEN (Google Edge)',
    domain: 'Student Laptop (Chrome)',
    pduLabel: 'Step 1 of 3: TCP SYN Hello',
    schematic: {
      senderNode: 'Chrome Browser (User Space) → Student OS Kernel',
      receiverNode: 'Google Front End (GFE) VIP: 142.250.190.46',
      direction: 'forward',
      flags: '[SYN] Flags (Synchronize Sequence Numbers)',
      seqAck: 'Seq=1000, Ack=0 (Random Initial Counter)',
      windowValue: 'Win=65535 (Receive Buffer Offered)',
      bufferStatus: 'Tx Memory Ready: 128 KB'
    },
    googleScenario: 'At 10:30 AM, a student types "how does tcp congestion control work" into Google Chrome and taps Enter. Before sending the letters of the search question, Chrome must first introduce itself to Google\'s nearest edge server.',
    relatableUnderstanding: 'Think of this like dialing a friend’s phone number. You don’t start speaking the answer immediately; your phone sends a ring signal saying "Hello, are you ready to talk?" That first ring is the SYN packet.',
    physicalReality: 'Student hits Enter. Chrome requests an outbound socket via connect() syscall. The OS allocates a Transmission Control Block (TCB) and generates a random Initial Sequence Number.',
    engineeringMechanism: 'The client moves from CLOSED to SYN-SENT. Cryptographic ISN generation prevents TCP spoofing and blind connection hijacking by intermediate eavesdroppers.',
    syllabusConceptAnchor: 'TCP State Machine & Three-Way Handshake (Step 1): Both endpoints must synchronize their sequence counters before any application search payload can be transmitted.',
    technicalMetrics: [
      { label: 'Client State', value: 'SYN-SENT' },
      { label: 'Google Server State', value: 'LISTEN' },
      { label: 'MSS Offered', value: '1460 Bytes' },
      { label: 'Calculated RTT', value: 'Pending (SYN RTO = 1.0s)' }
    ]
  },
  {
    id: 2,
    phase: 'Handshake Convergence',
    name: 'Google Answers & Connection Established',
    tcpState: 'SYN-RECEIVED → ESTABLISHED',
    domain: 'Transit Core & Google Edge VIP',
    pduLabel: 'Step 2 & 3 of 3: SYN-ACK & Final ACK',
    schematic: {
      senderNode: 'Google Edge Load Balancer (Maglev/GFE)',
      receiverNode: 'Student Laptop (MAC: 48:2a:e3:11:bc:90)',
      direction: 'bidirectional',
      flags: '[SYN, ACK] from Google, then [ACK] from Student',
      seqAck: 'Google Seq=5000, Ack=1001 / Student Ack=5001',
      windowValue: 'Google Win=64240, Student Win=65535',
      bufferStatus: 'Connection Established: Full-Duplex Ready'
    },
    googleScenario: 'Google\'s server picks up the ring and replies: "Yes, I hear you! Here is my sequence number, and I acknowledge yours (SYN+ACK)." The student\'s laptop instantly fires back: "Understood, connection locked in! (ACK)".',
    relatableUnderstanding: 'This is the complete 3-Way Handshake (SYN → SYN-ACK → ACK). Just like in an airline pilot radio check ("Radio check", "Loud and clear", "Roger that"), both sides now 100% agree they can hear and send data.',
    physicalReality: 'Google’s edge PoP receives the SYN and returns a SYN-ACK cookie. The client receives it, returns ACK, and both sides enter ESTABLISHED in under 18ms over fiber-optic transit.',
    engineeringMechanism: 'SYN cookies allow Google servers to defend against SYN Flood attacks without pre-allocating state memory until the client proves legitimate round-trip capability by returning the computed ACK.',
    syllabusConceptAnchor: 'Connection Establishment Complete: Two simplex channels are bound into a singular full-duplex stream with negotiated Maximum Segment Size (MSS) and Window Scaling options.',
    technicalMetrics: [
      { label: 'Handshake Time', value: '18.4 ms' },
      { label: 'Effective MSS', value: '1460 Bytes' },
      { label: 'TCP Options', value: 'SACK-Permitted, TSopt, WScale=7' },
      { label: 'Connection Status', value: 'ESTABLISHED' }
    ]
  },
  {
    id: 3,
    phase: 'Bandwidth Probing',
    name: 'Slow Start: Probing Network Speed',
    tcpState: 'ESTABLISHED (Slow Start Mode)',
    domain: 'End-to-End Transport Pipe',
    pduLabel: 'Encrypted Query + Exponential cwnd',
    schematic: {
      senderNode: 'Chrome TLS Engine (HTTP/2 Stream 1)',
      receiverNode: 'Google Application Search Worker',
      direction: 'forward',
      flags: '[ACK, PSH] Pushing Query Frame',
      seqAck: 'Seq=1001, Ack=5001, Len=842 Bytes',
      windowValue: 'cwnd = 10 packets → 20 packets (Doubles Every RTT)',
      bufferStatus: 'In-Flight: 14.6 KB < ssthresh (64 KB)'
    },
    googleScenario: 'Chrome sends the encrypted search query "how does tcp congestion control work". Google prepares to send back search results, but it doesn\'t know how fast the student’s Wi-Fi is, so it starts sending small and doubles each round.',
    relatableUnderstanding: 'Imagine driving onto an unfamiliar highway on a foggy morning. You don\'t immediately floor the accelerator to 120 km/h; you start at 20, quickly speed up to 40, then 80 as you confirm the road is clear. In TCP, this cautious initial acceleration is called "Slow Start".',
    physicalReality: 'The client sends its encrypted search payload. Even though the link may support gigabit speeds, TCP does not immediately flood the network; it starts with an initial window (initcwnd ~ 10).',
    engineeringMechanism: 'For every ACK received during Slow Start, the Congestion Window (cwnd) increases by 1 SMSS. Over each Round Trip Time (RTT), the effective transmission capacity doubles: cwnd = cwnd * 2.',
    syllabusConceptAnchor: 'Slow Start Algorithm: A probing mechanism that rapidly finds the unknown bottleneck capacity without causing instant catastrophic buffer overflows on intermediate routers.',
    technicalMetrics: [
      { label: 'Initial cwnd', value: '10 MSS (~14.6 KB)' },
      { label: 'Current cwnd', value: '20 MSS (~29.2 KB)' },
      { label: 'Slow Start Threshold (ssthresh)', value: '64 KB (44 MSS)' },
      { label: 'Bandwidth Utilization', value: '38.4% of Bottleneck' }
    ]
  },
  {
    id: 4,
    phase: 'Equilibrium Control',
    name: 'AIMD: Gentle Linear Cruising',
    tcpState: 'ESTABLISHED (Congestion Avoidance)',
    domain: 'ISP WAN Bottleneck Router',
    pduLabel: 'Streaming Search Index Chunks',
    schematic: {
      senderNode: 'Google Edge Server',
      receiverNode: 'Local Wi-Fi Access Point Router Queue',
      direction: 'forward',
      flags: '[ACK] Multi-segment Transmission',
      seqAck: 'Segments #21 to #44 In-Flight',
      windowValue: 'cwnd >= ssthresh: cwnd += 1 packet per RTT (Linear Increase)',
      bufferStatus: 'Router Egress Buffer: 72% Occupied'
    },
    googleScenario: 'Google has discovered that the network can handle around 32 packets at once. Rather than continuing to wildly double every second (which would crash the home Wi-Fi), Google switches to gentle, cautious single-step additions.',
    relatableUnderstanding: 'Think of pouring water into a glass. When the glass is mostly empty, you pour fast. As the water approaches the brim, you slow down to a gentle trickle so it doesn’t spill over the top. This gentle climb is "Additive Increase".',
    physicalReality: 'As cwnd hits ssthresh (64 KB), Google’s transmission switches from explosive exponential doubling to cautious linear increments: Additive Increase.',
    engineeringMechanism: 'Under Additive Increase Multiplicative Decrease (AIMD), cwnd grows by approximately 1 MSS per RTT. This probes for extra bandwidth gently, stabilizing multi-flow fairness across shared switches.',
    syllabusConceptAnchor: 'Congestion Avoidance & Fair Allocation: Chiu-Jain stability proof demonstrates that additive increase with multiplicative decrease guarantees convergence to both efficiency and fairness.',
    technicalMetrics: [
      { label: 'Growth Mode', value: 'Additive (+1 MSS/RTT)' },
      { label: 'Current cwnd', value: '46 MSS (67.1 KB)' },
      { label: 'Router Queue Depth', value: '18 ms buffer latency' },
      { label: 'Algorithm', value: 'AIMD Standard (RFC 5681)' }
    ]
  },
  {
    id: 5,
    phase: 'Packet Loss & Recovery',
    name: 'Wi-Fi Hiccup: 3 Duplicate ACKs & Fast Retransmit',
    tcpState: 'ESTABLISHED (Fast Recovery)',
    domain: 'Home Wi-Fi Router Drop',
    pduLabel: 'Dup ACK #1, #2, #3 -> Instant Retransmit',
    schematic: {
      senderNode: 'Student Laptop (Received #24, #26, #27, #28; Missing #25)',
      receiverNode: 'Google Transport Controller',
      direction: 'backward',
      flags: '[ACK] 3 Duplicate ACKs (Acking #24)',
      seqAck: 'Ack=36501 (Client shouts: "I need #25!")',
      windowValue: 'ssthresh = cwnd / 2 (Cut in half!), cwnd = ssthresh + 3',
      bufferStatus: 'Fast Recovery Active: Skipping 1-Second Freeze'
    },
    googleScenario: 'Someone in the house turned on a microwave or moved behind a wall. Packet #25 got scrambled by radio static! Packets #26, #27, and #28 arrived safely, but the student\'s Chrome engine noticed a missing gap.',
    relatableUnderstanding: 'Imagine reading pages of a book: you get page 24, then page 26, 27, and 28. You immediately shout back: "Wait! Page 25 is missing! Page 25 is missing! Page 25 is missing!" Because you asked 3 times, the sender doesn’t wait for a 1-minute timeout; they instantly fax you page 25 right away.',
    physicalReality: 'Microwave interference on the local Wi-Fi causes packet #25 to be dropped. Packets #26, #27, and #28 arrive safely at the student’s laptop out-of-order.',
    engineeringMechanism: 'The receiver emits three identical duplicate ACKs. Instead of waiting for a slow RTO timeout (which pauses traffic for 200–1000ms), TCP immediately infers loss and executes Fast Retransmit.',
    syllabusConceptAnchor: 'TCP Reno / New Reno Error Recovery: Detecting loss via 3 duplicate ACKs distinguishes transient out-of-order delivery from severe network outage, avoiding a costly reset to cwnd=1.',
    technicalMetrics: [
      { label: 'Loss Detection', value: '3 Duplicate ACKs (No Timeout)' },
      { label: 'Old cwnd', value: '46 MSS' },
      { label: 'New ssthresh', value: '23 MSS (Cut by 50%)' },
      { label: 'Recovery State', value: 'Fast Recovery (No RTO freeze)' }
    ]
  },
  {
    id: 6,
    phase: 'Datacenter Dispatch',
    name: 'Search Results Delivered (Under 100ms)',
    tcpState: 'ESTABLISHED (High Throughput CUBIC)',
    domain: 'Google Datacenter & CDN Edge',
    pduLabel: 'HTTP/2 200 OK + Search Results JSON',
    schematic: {
      senderNode: 'Google Search Ranking Cluster (Borg/Andromeda)',
      receiverNode: 'Chrome Rendering Engine',
      direction: 'forward',
      flags: '[ACK, PSH] Response Stream Complete',
      seqAck: 'Seq=5001 to 68200, Ack=1843',
      windowValue: 'CUBIC Curve Reclaimed Safe Speed',
      bufferStatus: '84.8 KB Transferred; Page Ready to Render'
    },
    googleScenario: 'In just 12 milliseconds, Google scanned billions of indexed web pages, ranked the best tutorials on TCP congestion control, assembled the top 10 links with descriptions, and sent the complete page back to Chrome.',
    relatableUnderstanding: 'The search results are now completely displayed on the student\'s screen! Modern systems like CUBIC TCP recover their optimal speed smoothly like a rollercoaster curve instead of a jagged saw, making everything feel instant.',
    physicalReality: 'Google’s search cluster looks up terms across billions of indexed web pages in 12ms, assembling 10 search results plus rich snippets, and streams the 85 KB response down the pipeline.',
    engineeringMechanism: 'Modern Linux kernels use CUBIC TCP or BBR. CUBIC uses a concave then convex cubic polynomial function to rapidly reclaim the operating window W_max after a loss event.',
    syllabusConceptAnchor: 'High-Bandwidth Delay Product Optimization: Traditional Reno takes hours to recover on 10 Gbps long-haul links; CUBIC independent-of-RTT window growth scales modern Internet speeds.',
    technicalMetrics: [
      { label: 'Index Search Latency', value: '11.8 ms' },
      { label: 'Payload Size', value: '84.8 KB' },
      { label: 'CUBIC W_max', value: '46 MSS' },
      { label: 'Pacing Engine', value: 'Linux FQ-CoDel' }
    ]
  },
  {
    id: 7,
    phase: 'Real-Time Extension',
    name: 'Student Clicks Video: Jitter Buffer Absorbs Delays',
    tcpState: 'UDP / RTP Media Stream',
    domain: 'YouTube / Media Playout Engine',
    pduLabel: 'RTP Media Frames + RTCP Feedback',
    schematic: {
      senderNode: 'Google Media Server (H.264 / Opus Stream)',
      receiverNode: 'Chrome Media Pipeline & Audio Buffer',
      direction: 'forward',
      flags: 'RTP Header (Timestamp, Audio Seq, SSRC)',
      seqAck: 'RTP Seq=8912, Timestamp=982400',
      windowValue: 'Jitter Buffer Depth: 45 ms Absorption',
      bufferStatus: 'Smooth Playout vs Arrival Variance: 22 ms'
    },
    googleScenario: 'The student clicks a short animated video result explaining how packets flow. Unlike a text webpage where every single comma must be 100% exact, live video must arrive on time without freezing every second.',
    relatableUnderstanding: 'Imagine people arriving at a movie theater at irregular times: some arrive 5 minutes early, some 10 seconds late. A "Jitter Buffer" is like the waiting lobby: it holds people for 45 milliseconds so everyone enters their seats in a smooth, continuous line without anyone tripping.',
    physicalReality: 'The student clicks a 60-second video demo explaining AIMD. Unlike text pages, real-time media cannot tolerate TCP retransmission latency; packets must play on time.',
    engineeringMechanism: 'RTP delivers timestamped audio/video frames while RTCP exchanges feedback reports (loss rate, interarrival jitter). A client-side Jitter Buffer absorbs arrival jitter before feeding the decoder.',
    syllabusConceptAnchor: 'Quality of Service (QoS) & Real-Time Transport: Trade-off between guaranteed reliability (TCP) and time-bounded jitter-controlled delivery (RTP/UDP/SCTP).',
    technicalMetrics: [
      { label: 'Interarrival Jitter', value: '14.2 ms' },
      { label: 'Jitter Buffer Size', value: '45 ms (Nominal)' },
      { label: 'Packet Loss Target', value: '< 1.5% with FEC' },
      { label: 'RTCP Feedback Interval', value: '1.2 s' }
    ]
  },
  {
    id: 8,
    phase: 'Connection Teardown',
    name: '4-Way Handshake & TIME-WAIT Quarantine',
    tcpState: 'FIN-WAIT-1 → TIME-WAIT → CLOSED',
    domain: 'Socket Lifecycle Cleanup',
    pduLabel: 'The 4-Way Goodbye: FIN, ACK, FIN, ACK',
    schematic: {
      senderNode: 'Student Laptop (Socket Close)',
      receiverNode: 'Google Front End VIP',
      direction: 'bidirectional',
      flags: 'FIN from Student -> ACK from Google -> FIN from Google -> ACK from Student',
      seqAck: 'Client Seq=1843, Server Seq=68201',
      windowValue: 'Zero-Window / Polite Teardown',
      bufferStatus: 'Socket Quarantined for 2 * MSL (60s)'
    },
    googleScenario: 'The student closes the tab. The connection now performs a polite 4-step goodbye: "I am done sending", "Got it!", "I am done sending too", "Got it, goodbye!" The socket waits in quarantine for 60 seconds before disappearing.',
    relatableUnderstanding: 'Why 4 steps instead of 2? Because either side might still have something to say! If you say "I\'m done talking", you still have to listen if the other person is finishing their sentence. And we wait in TIME-WAIT for 60 seconds just to ensure no stray letters arrive late in the mailbox.',
    physicalReality: 'Chrome closes the idle connection. A 4-way termination occurs. The client stays in TIME-WAIT for 2*MSL (Maximum Segment Lifetime, ~60s) before releasing the port.',
    engineeringMechanism: 'The TIME-WAIT state guarantees that the final ACK was delivered and prevents delayed duplicate packets from a previous connection incarnation from corrupting a new connection.',
    syllabusConceptAnchor: 'Graceful Termination & Socket Quarantine: Why premature port reuse creates fatal race conditions in IP routing and how TCP invariants protect protocol state integrity.',
    technicalMetrics: [
      { label: '2 x MSL Timer', value: '60 Seconds' },
      { label: 'Socket State', value: 'TIME-WAIT' },
      { label: 'Port 54822 Reuse', value: 'Locked until expiry' },
      { label: 'Kernel Memory', value: 'Freed on CLOSED' }
    ]
  }
];

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState<'simulator' | 'concepts' | 'sandbox' | 'diagnostics' | 'quiz' | 'guardrails'>('simulator');
  
  // Pipeline Simulator State
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(3000); // ms per step

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStageIdx((prev) => {
          if (prev >= PIPELINE_STAGES.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  const currentStage = PIPELINE_STAGES[currentStageIdx];

  // ==========================================
  // MATHEMATICAL / PHYSICAL VISUALIZER STATE
  // ==========================================
  const [selectedAlgo, setSelectedAlgo] = useState<'reno' | 'vegas' | 'cubic'>('reno');
  const [lossRateSlider, setLossRateSlider] = useState<number>(1); // loss event frequency
  const [ssthreshSlider, setSsthreshSlider] = useState<number>(32); // initial threshold
  const [rttBaseSlider, setRttBaseSlider] = useState<number>(30); // ms base RTT

  // Generate dynamic simulation points for the congestion curve
  const generateCurvePoints = () => {
    const points: { t: number; cwnd: number; phase: string; rtt: number }[] = [];
    let cwnd = 2;
    let ssthresh = ssthreshSlider;
    let rtt = rttBaseSlider;
    const lossCycle = Math.max(12, 30 - lossRateSlider * 5);

    for (let t = 0; t <= 60; t++) {
      let phase = 'Slow Start';
      
      if (t > 0 && t % lossCycle === 0) {
        // Loss event
        phase = 'Fast Retransmit & Recovery';
        if (selectedAlgo === 'reno') {
          ssthresh = Math.max(4, Math.floor(cwnd / 2));
          cwnd = ssthresh;
        } else if (selectedAlgo === 'vegas') {
          // Vegas reacts before loss or dampens smoothly
          ssthresh = Math.max(4, Math.floor(cwnd * 0.7));
          cwnd = ssthresh;
        } else {
          // CUBIC
          const wMax = cwnd;
          ssthresh = Math.max(4, Math.floor(wMax * 0.7));
          cwnd = ssthresh;
        }
      } else if (cwnd < ssthresh) {
        // Slow start exponential
        phase = 'Slow Start';
        cwnd = Math.min(ssthresh, cwnd * 1.35);
      } else {
        // Congestion avoidance
        phase = 'Congestion Avoidance';
        if (selectedAlgo === 'reno') {
          cwnd += 1.0; // linear
        } else if (selectedAlgo === 'vegas') {
          // Vegas stabilizes around target queue delay
          cwnd += (t % 4 === 0) ? 0.3 : 0.1;
        } else {
          // CUBIC polynomial shape: W(t) = C*(t - K)^3 + W_max
          const cycleStep = (t % lossCycle);
          const k = Math.pow(ssthresh * 0.4 / 0.4, 1 / 3);
          const offset = cycleStep - k;
          const delta = 0.4 * Math.pow(offset, 3) * 0.05 + 1.2;
          cwnd = Math.max(ssthresh, cwnd + Math.max(0.4, delta));
        }
      }

      // Add realistic RTT fluctuations based on queue size
      rtt = rttBaseSlider + Math.floor((cwnd / 64) * 25);
      points.push({ t, cwnd: Math.min(72, Math.max(2, parseFloat(cwnd.toFixed(1)))), phase, rtt });
    }
    return points;
  };

  const curveData = generateCurvePoints();

  // ==========================================
  // SIMULATOR SUB-VIEW & 3-STEP / 4-STEP STATE
  // ==========================================
  const [simSubView, setSimSubView] = useState<'pipeline' | '3step' | '4step'>('pipeline');
  const [handshakeStep, setHandshakeStep] = useState<number>(1);
  const [teardownStep, setTeardownStep] = useState<number>(1);
  const [simInteractiveLoss, setSimInteractiveLoss] = useState<boolean>(false);
  const [simShowDialogue, setSimShowDialogue] = useState<boolean>(true);
  const [simDelayMode, setSimDelayMode] = useState<boolean>(false);

  // ==========================================
  // SANDBOX / TOPOLOGY FAILURE STATE
  // ==========================================
  const [sandboxMode, setSandboxMode] = useState<'normal' | 'loss' | 'jitter' | 'bufferbloat' | 'flap'>('normal');
  const [sandboxLog, setSandboxLog] = useState<string[]>([
    '10:30:00.104212 IP client.54822 > gfe.443: Flags [S], seq 1000, win 65535, options [mss 1460,sackOK,TS val 1823 ecr 0,nop,wscale 7]',
    '10:30:00.122501 IP gfe.443 > client.54822: Flags [S.], seq 5000, ack 1001, win 64240, options [mss 1460,sackOK,TS val 9942 ecr 1823,nop,wscale 7]',
    '10:30:00.122604 IP client.54822 > gfe.443: Flags [.], ack 5001, win 65535, options [nop,nop,TS val 1824 ecr 9942]'
  ]);

  // ==========================================
  // DIAGNOSTIC LAB STATE
  // ==========================================
  const [selectedDiagIdx, setSelectedDiagIdx] = useState<number>(0);

  // ==========================================
  // PRACTICE CHECKS (MCQ & MATCHING) STATE
  // ==========================================
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({
    0: null,
    1: null,
    2: null,
    3: null
  });
  const [selectedLeftMatch, setSelectedLeftMatch] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [matchValidationActive, setMatchValidationActive] = useState<boolean>(false);


  const triggerSandboxAction = (mode: 'normal' | 'loss' | 'jitter' | 'bufferbloat' | 'flap') => {
    setSandboxMode(mode);
    const ts = new Date().toISOString().substring(11, 19);
    if (mode === 'normal') {
      setSandboxLog(prev => [
        `[${ts}] Topology set to NOMINAL: 0.01% baseline loss, RTT 18ms, queue headroom 82%`,
        `[${ts}] TCP flow converging on standard AIMD equilibrium rate (48.2 Mbps)`,
        ...prev.slice(0, 10)
      ]);
    } else if (mode === 'loss') {
      setSandboxLog(prev => [
        `[${ts}] INJECTED: Dropped Segment #25 at Wi-Fi Access Point hop (MAC: 48:2a:e3:11:bc:90)`,
        `[${ts}] RECEIVER: Out-of-order Seq #26 arrived. Emitting Duplicate ACK #1 (Ack=36501)`,
        `[${ts}] RECEIVER: Out-of-order Seq #27 arrived. Emitting Duplicate ACK #2 (Ack=36501)`,
        `[${ts}] RECEIVER: Out-of-order Seq #28 arrived. Emitting Duplicate ACK #3 (Ack=36501) -> TRIPLE DUP ACK TRIGGERED`,
        `[${ts}] SENDER: Fast Retransmit fired for Segment #25! cwnd halved from 46 to 23 MSS. Fast Recovery entered.`,
        ...prev.slice(0, 8)
      ]);
    } else if (mode === 'jitter') {
      setSandboxLog(prev => [
        `[${ts}] INJECTED: Transient cellular handover jitter burst (+85ms delta)`,
        `[${ts}] RTP Jitter Buffer: Buffer depth absorbed 45ms variance, 1 media frame deferred by 12ms`,
        `[${ts}] RTCP Receiver Report: Interarrival jitter increased to 38.4ms; audio playout remained continuous`,
        ...prev.slice(0, 8)
      ]);
    } else if (mode === 'bufferbloat') {
      setSandboxLog(prev => [
        `[${ts}] INJECTED: Oversized unmanaged dumb FIFO buffer on ISP DSLAM router (2000ms queue)`,
        `[${ts}] RTT inflated from 18ms -> 480ms without packet loss! TCP Reno keeps increasing cwnd blindly`,
        `[${ts}] WARNING: Interactive Web browsing stutters despite 100Mbps bandwidth. CoDel AQM recommended.`,
        ...prev.slice(0, 8)
      ]);
    } else if (mode === 'flap') {
      setSandboxLog(prev => [
        `[${ts}] INJECTED: WAN BGP link flap between AS15169 (Google) and Tier-1 Transit Provider`,
        `[${ts}] SCTP Multi-Homing: Primary path unreachable; heartbeat timeout triggered automatic failover to Path 2`,
        `[${ts}] Zero application interruption; independent stream states preserved without head-of-line blocking`,
        ...prev.slice(0, 8)
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* ========================================================================= */}
      {/* ZONE 1: TOP BAR CONTRACT (Strict 3-Zone: Wordmark, 4-6 Links, 1-2 Actions) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark + Google Logo + Unit 3 title */}
          <div className="flex items-center gap-3">
            {/* Authentic Google Brand G Icon */}
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" aria-label="Google Logo">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-slate-900 text-sm sm:text-base">
                <span>Google</span>
                <span className="font-medium text-slate-600">TransitDynamics</span>
              </div>
            </div>
            <span className="text-slate-300 font-normal hidden sm:inline">|</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded hidden sm:inline">
              Computer Networks Unit 3
            </span>
          </div>

          {/* Zone 2: Clean text navigation links with subtle active indicators */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveSection('simulator')}
              className={`transition-colors pb-1 border-b-2 ${
                activeSection === 'simulator'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Transit Simulator
            </button>
            <button
              onClick={() => setActiveSection('concepts')}
              className={`transition-colors pb-1 border-b-2 ${
                activeSection === 'concepts'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Theory & Formulas
            </button>
            <button
              onClick={() => setActiveSection('sandbox')}
              className={`transition-colors pb-1 border-b-2 ${
                activeSection === 'sandbox'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Link Sandbox
            </button>
            <button
              onClick={() => setActiveSection('diagnostics')}
              className={`transition-colors pb-1 border-b-2 ${
                activeSection === 'diagnostics'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Diagnostic Lab
            </button>
            <button
              onClick={() => setActiveSection('quiz')}
              className={`transition-colors pb-1 border-b-2 ${
                activeSection === 'quiz'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Practice Checks
            </button>
            <button
              onClick={() => setActiveSection('guardrails')}
              className={`transition-colors pb-1 border-b-2 ${
                activeSection === 'guardrails'
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              Guardrails
            </button>
          </nav>

          {/* Zone 3: Module badge & primary quick-action button */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-xs font-mono text-slate-500">RFC 5681 · RFC 9438</span>
            <button
              onClick={() => {
                setActiveSection('simulator');
                setCurrentStageIdx(0);
                setIsPlaying(true);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Pipeline</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* EDITORIAL HERO & CASE STUDY SCENARIO BANNER (Google Themed) */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Subtle Google 4-Color Accent Bar */}
          <div className="h-1 w-28 flex rounded-full overflow-hidden mb-4">
            <div className="w-1/4 bg-[#4285F4]"></div>
            <div className="w-1/4 bg-[#EA4335]"></div>
            <div className="w-1/4 bg-[#FBBC05]"></div>
            <div className="w-1/4 bg-[#34A853]"></div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
                <span className="text-blue-700">Computer Networks Unit 3</span>
                <span aria-hidden="true">·</span>
                <span>The Transport Layer Journey</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700">Intuitive Concept-First Learning</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2 text-balance">
                How Google Search Finds an Answer in Milliseconds
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                It is 10:30 AM. A student opens Google Chrome, types <strong className="text-slate-900 font-semibold font-mono text-xs sm:text-sm bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">“how does tcp congestion control work”</strong>, and hits Enter. Within a fraction of a second, millions of results appear! Follow the human and engineering story of what happens behind the screen—from dialing the server and cautiously discovering network speed, to fixing dropped Wi-Fi packets and gracefully closing the connection.
              </p>
            </div>

            {/* Google Search Bar Mockup & Session Telemetry Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 shrink-0 lg:w-88 text-xs shadow-xs">
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-2xs mb-3">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="font-mono text-slate-800 truncate text-[11px]">how does tcp congestion control work</span>
              </div>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Student Device:</span>
                  <span className="font-medium text-slate-900">Chrome on Laptop</span>
                </div>
                <div className="flex justify-between">
                  <span>Google Endpoint:</span>
                  <span className="font-mono text-slate-900">www.google.com:443</span>
                </div>
                <div className="flex justify-between">
                  <span>Protocols Covered:</span>
                  <span className="font-semibold text-blue-700">TCP · AIMD · CUBIC · RTP</span>
                </div>
                <div className="flex justify-between">
                  <span>Round-Trip Time:</span>
                  <span className="font-mono text-emerald-700 font-medium">18.4 ms (Fiber PoP)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA ACCORDING TO ACTIVE SECTION */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ----------------------------------------------------------------------- */}
        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 1: THE INTERACTIVE END-TO-END TRANSIT SIMULATOR (Centerpiece) */}
        {/* ----------------------------------------------------------------------- */}
        {activeSection === 'simulator' && (
          <div className="space-y-8">
            
            {/* Top Sub-Navigation: Mode Selector */}
            <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                <button
                  onClick={() => setSimSubView('pipeline')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    simSubView === 'pipeline'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                  <span>8-Stage Complete Query Journey</span>
                </button>

                <button
                  onClick={() => setSimSubView('3step')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    simSubView === '3step'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">3</span>
                  <span>The 3-Step Handshake (Start Talking)</span>
                </button>

                <button
                  onClick={() => setSimSubView('4step')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    simSubView === '4step'
                      ? 'bg-white text-rose-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center">4</span>
                  <span>The 4-Step Teardown (Polite Goodbye)</span>
                </button>
              </div>

              {/* Status Hint */}
              <div className="text-xs text-slate-500 px-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Model: <strong>Google GFE Anycast TCP</strong></span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SUB-VIEW 1: THE FULL 8-STAGE JOURNEY                          */}
            {/* ------------------------------------------------------------- */}
            {simSubView === 'pipeline' && (
              <>
                {/* Simulator Control Header & Progress Track */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          Unit 3 Case Study
                        </span>
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <span>Google Search: Query Transit Pipeline</span>
                        </h2>
                      </div>
                      <p className="text-xs text-slate-600">
                        Follow Alex pressing <strong>Enter</strong> in Chrome through physical cables, packets, algorithms, and Google's Edge servers.
                      </p>
                    </div>

                    {/* Playback Controls with Google Themed Accents */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentStageIdx(Math.max(0, currentStageIdx - 1))}
                        disabled={currentStageIdx === 0}
                        className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg border border-slate-200 transition-colors"
                        title="Previous Stage"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Auto Play</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setCurrentStageIdx(Math.min(PIPELINE_STAGES.length - 1, currentStageIdx + 1))}
                        disabled={currentStageIdx === PIPELINE_STAGES.length - 1}
                        className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg border border-slate-200 transition-colors"
                        title="Next Stage"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setIsPlaying(false);
                          setCurrentStageIdx(0);
                          setSimInteractiveLoss(false);
                          setSimDelayMode(false);
                        }}
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors ml-1"
                        title="Reset to Stage 1"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      {/* Playback Speed Selector */}
                      <select
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                        className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 ml-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value={4000}>0.75x Speed</option>
                        <option value={3000}>1.0x Speed</option>
                        <option value={1800}>1.5x Speed</option>
                        <option value={1000}>2.0x Speed</option>
                      </select>
                    </div>
                  </div>

                  {/* Horizontal Progress Track with Google-Colored Numbered Nodes */}
                  <div className="pt-6 overflow-x-auto">
                    <div className="flex items-center justify-between min-w-[720px] relative">
                      {/* Connecting Line */}
                      <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
                      <div
                        className="absolute top-4 left-6 h-0.5 bg-blue-600 transition-all duration-300 -z-0"
                        style={{ width: `${(currentStageIdx / (PIPELINE_STAGES.length - 1)) * 95}%` }}
                      />

                      {PIPELINE_STAGES.map((stg, idx) => {
                        const isPassed = idx < currentStageIdx;
                        const isCurrent = idx === currentStageIdx;

                        return (
                          <button
                            key={stg.id}
                            onClick={() => {
                              setIsPlaying(false);
                              setCurrentStageIdx(idx);
                            }}
                            className="relative z-10 flex flex-col items-center group focus:outline-none text-left"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                                isCurrent
                                  ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110 shadow-sm'
                                  : isPassed
                                  ? 'bg-blue-50 text-blue-700 border border-blue-300'
                                  : 'bg-white text-slate-500 border border-slate-300 group-hover:border-slate-400'
                              }`}
                            >
                              {stg.id}
                            </div>
                            <span
                              className={`mt-2 text-[11px] font-medium max-w-[85px] text-center leading-tight truncate transition-colors ${
                                isCurrent ? 'text-blue-900 font-bold' : 'text-slate-500'
                              }`}
                            >
                              {stg.name.split(':')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Two-Column Inspection Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Interactive Schematic & Live Experiment Controls */}
                  <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          STAGE {currentStage.id} OF 8
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          {currentStage.domain}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {currentStage.name}
                      </h3>
                      <div className="text-xs font-mono text-slate-500 mb-5 flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>TCP Socket State: <strong className="text-slate-800">{currentStage.tcpState}</strong></span>
                      </div>

                      {/* Interactive Visual Node Diagram */}
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-4 mb-4">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                          <div className="flex items-center gap-1.5">
                            <Cpu className="w-4 h-4 text-blue-600" />
                            <span>Client (Alex's Mac)</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Server className="w-4 h-4 text-red-500" />
                            <span>Google Edge (GFE)</span>
                          </div>
                        </div>

                        <div className="bg-white rounded border border-slate-200 p-2.5 text-xs font-mono space-y-1">
                          <div className="text-slate-500">SOURCE: <span className="text-slate-900 font-medium">{currentStage.schematic.senderNode}</span></div>
                          <div className="text-slate-500">DEST: <span className="text-slate-900 font-medium">{currentStage.schematic.receiverNode}</span></div>
                        </div>

                        {/* Animated Packet Flight Indicator with Loss simulation support */}
                        <div className="relative py-3 flex items-center justify-between px-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-600 animate-pulse absolute left-2"></div>
                          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                          
                          <div className={`flex-1 mx-3 border-t-2 ${simInteractiveLoss ? 'border-dashed border-red-500' : 'border-dashed border-blue-400'} relative transition-colors`}>
                            <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold whitespace-nowrap transition-colors ${
                              simInteractiveLoss 
                                ? 'bg-red-100 border border-red-300 text-red-700 animate-bounce' 
                                : 'bg-blue-50 border border-blue-200 text-blue-700'
                            }`}>
                              {simInteractiveLoss ? '⚠️ PACKET DROPPED IN TRANSIT!' : currentStage.pduLabel}
                            </div>
                          </div>
                          
                          <div className={`w-3.5 h-3.5 rounded-full ${simInteractiveLoss ? 'bg-slate-300' : 'bg-emerald-500'}`}></div>
                        </div>

                        {/* Conversational Speech Bubble between User and Google */}
                        {simShowDialogue && (
                          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs space-y-2">
                            <div className="flex items-start gap-2">
                              <span className="font-bold text-blue-600 min-w-[50px]">Alex:</span>
                              <span className="text-slate-700 italic">
                                {currentStage.id === 1 && '"Chrome, connect to www.google.com and ask for TCP congestion control!"'}
                                {currentStage.id === 2 && '"Hey Google, starting connection with seq=1000. Can you hear me?"'}
                                {currentStage.id === 3 && '"Slow start probe: starting gently with 10 packets to measure line capacity!"'}
                                {currentStage.id === 4 && '"Transmitting GET /search?q=how+does+tcp+congestion+control+work"'}
                                {currentStage.id === 5 && '"Received chunk #1, sending cumulative ACK=2921 so Google can send more!"'}
                                {currentStage.id === 6 && '"Oh! Segment 25 didn\'t arrive! Alerting Google with 3 duplicate ACKs!"'}
                                {currentStage.id === 7 && '"Recovered segment received! Congestion window halved, climbing back linearly!"'}
                                {currentStage.id === 8 && '"Got all search snippets! Gracefully half-closing connection. Bye Google!"'}
                              </span>
                            </div>
                            <div className="flex items-start gap-2 border-t border-amber-200/60 pt-2">
                              <span className="font-bold text-red-500 min-w-[50px]">Google:</span>
                              <span className="text-slate-700 italic">
                                {currentStage.id === 1 && '"Google Front End (GFE) listening on port 443 with TLS 1.3 Anycast."'}
                                {currentStage.id === 2 && '"SYN-ACK: Yes Alex! Seq=5000, expecting your byte 1001 next!"'}
                                {currentStage.id === 3 && '"ACKs received quickly! Doubling sending window from 10 to 20 segments."'}
                                {currentStage.id === 4 && '"Query received! Dispatching to Google Search ranking index & Knowledge Graph."'}
                                {currentStage.id === 5 && '"Streaming HTML snippets and CSS styles across fast Reno/CUBIC pipeline."'}
                                {currentStage.id === 6 && '"Detected 3 dup ACKs! Fast-retransmitting Segment 25 immediately without timeout!"'}
                                {currentStage.id === 7 && '"BBR pacing throttled to match router bottleneck rate of 100 Mbps."'}
                                {currentStage.id === 8 && '"ACK acknowledged. Sending server FIN, closing data pipeline. Take care Alex!"'}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Frame Flags & Parameters */}
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div className="bg-white p-2 rounded border border-slate-200">
                            <span className="text-slate-400 block text-[10px]">FLAGS</span>
                            <span className="text-slate-800 font-bold">{currentStage.schematic.flags}</span>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-200">
                            <span className="text-slate-400 block text-[10px]">SEQ / ACK</span>
                            <span className="text-slate-800 font-bold">{currentStage.schematic.seqAck}</span>
                          </div>
                          <div className="bg-white p-2 rounded border border-slate-200 col-span-2">
                            <span className="text-slate-400 block text-[10px]">CONGESTION & RECEIVER WINDOW</span>
                            <span className="text-blue-700 font-bold">{currentStage.schematic.windowValue}</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Real-Time Experiment Buttons */}
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 mb-4">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                          <span>Try Live Simulator Experiments</span>
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setSimInteractiveLoss(!simInteractiveLoss)}
                            className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-all text-left flex items-center gap-1.5 ${
                              simInteractiveLoss
                                ? 'bg-red-500 text-white border-red-600 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-red-300'
                            }`}
                          >
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            <span>{simInteractiveLoss ? 'Drop Injected (Active)' : 'Simulate Packet Drop'}</span>
                          </button>

                          <button
                            onClick={() => setSimDelayMode(!simDelayMode)}
                            className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-all text-left flex items-center gap-1.5 ${
                              simDelayMode
                                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5 text-yellow-300" />
                            <span>{simDelayMode ? 'Wi-Fi Delay (+85ms)' : 'Simulate Wi-Fi Delay'}</span>
                          </button>

                          <button
                            onClick={() => setSimShowDialogue(!simShowDialogue)}
                            className="px-2.5 py-1.5 rounded text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:border-blue-300 text-left flex items-center gap-1.5 col-span-2"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                            <span>{simShowDialogue ? 'Hide Conversational Dialogue' : 'Show Conversational Dialogue'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Direct Shortcut to 3-Step and 4-Step Deep Dives */}
                      {currentStage.id === 2 && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-blue-900">Want the 3-Step Handshake breakdown?</div>
                            <div className="text-[11px] text-blue-700">Explore SYN, SYN-ACK, ACK and why 2 steps is dangerous.</div>
                          </div>
                          <button
                            onClick={() => setSimSubView('3step')}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors whitespace-nowrap"
                          >
                            Open 3-Step Visualizer &rarr;
                          </button>
                        </div>
                      )}

                      {currentStage.id === 8 && (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg mb-4 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-rose-900">Want the 4-Step Teardown breakdown?</div>
                            <div className="text-[11px] text-rose-700">Explore FIN, ACK, FIN, ACK, TIME_WAIT and Full Duplex.</div>
                          </div>
                          <button
                            onClick={() => setSimSubView('4step')}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors whitespace-nowrap"
                          >
                            Open 4-Step Visualizer &rarr;
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Real-time Technical Metrics Grid */}
                    <div className="border-t border-slate-200 pt-4">
                      <div className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                        <span>Protocol Invariants (Unit 3)</span>
                        <span className="text-[11px] font-mono text-blue-600">RTT: {simDelayMode ? '103.4 ms' : '18.4 ms'}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {currentStage.technicalMetrics.map((met, mIdx) => (
                          <div key={mIdx} className="bg-slate-50 p-2 rounded border border-slate-200">
                            <span className="text-slate-500 block text-[10px]">{met.label}</span>
                            <span className="text-slate-900 font-mono font-semibold">{met.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Narrative Story of User Experience FIRST, then Analogies & Reality */}
                  <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
                    <div className="space-y-5">
                      
                      {/* Box 1: GOOGLE SEARCH USER STORY (What happens when you do it!) */}
                      <div className="border border-blue-200 rounded-xl p-4 bg-gradient-to-r from-blue-50/50 via-white to-amber-50/30 shadow-xs">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                          <span className="uppercase tracking-wider">1. Google Search: What the User Actually Experiences</span>
                        </div>
                        <p className="text-sm text-slate-800 font-medium leading-relaxed">
                          {currentStage.googleScenario}
                        </p>
                      </div>

                      {/* Box 2: Everyday Relatable Mental Model */}
                      <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/40">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                          <span className="uppercase tracking-wider">2. Relatable Mental Model & Everyday Understanding</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {currentStage.relatableUnderstanding}
                        </p>
                      </div>

                      {/* Box 3: The Physical Reality */}
                      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                          <span className="uppercase tracking-wider">3. The Physical Reality: Waves, Fibers & Hardware</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {currentStage.physicalReality}
                        </p>
                      </div>

                      {/* Box 4: Engineering Execution Mechanism & Syllabus Anchor */}
                      <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/40">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                          <span className="uppercase tracking-wider">4. Engineering Execution & Unit 3 Syllabus Anchor</span>
                        </div>
                        <div className="text-sm text-slate-700 leading-relaxed space-y-2">
                          <p>{currentStage.engineeringMechanism}</p>
                          <div className="pt-2 border-t border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Curriculum Focus: {currentStage.syllabusConceptAnchor}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Footer Navigation Bar */}
                    <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setCurrentStageIdx(Math.max(0, currentStageIdx - 1))}
                        disabled={currentStageIdx === 0}
                        className="text-slate-600 hover:text-slate-900 disabled:opacity-30 font-medium flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous: {currentStageIdx > 0 ? PIPELINE_STAGES[currentStageIdx - 1].name.split(':')[0] : 'Start'}</span>
                      </button>

                      <span className="font-mono text-slate-400">Step {currentStageIdx + 1} of 8</span>

                      <button
                        onClick={() => setCurrentStageIdx(Math.min(PIPELINE_STAGES.length - 1, currentStageIdx + 1))}
                        disabled={currentStageIdx === PIPELINE_STAGES.length - 1}
                        className="text-blue-600 hover:text-blue-800 disabled:opacity-30 font-semibold flex items-center gap-1"
                      >
                        <span>Next: {currentStageIdx < PIPELINE_STAGES.length - 1 ? PIPELINE_STAGES[currentStageIdx + 1].name.split(':')[0] : 'Complete'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUB-VIEW 2: THE 3-STEP PROCESS (THREE-WAY HANDSHAKE)          */}
            {/* ------------------------------------------------------------- */}
            {simSubView === '3step' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                          Step-by-Step Deep Dive
                        </span>
                        <h2 className="text-xl font-bold text-slate-900">
                          The 3-Step Handshake: How Alex and Google Agree to Talk
                        </h2>
                      </div>
                      <p className="text-sm text-slate-600">
                        Before a single letter of your search query is transmitted, your computer and Google establish mutual trust across the Internet.
                      </p>
                    </div>

                    <button
                      onClick={() => setSimSubView('pipeline')}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 self-start"
                    >
                      &larr; Return to 8-Stage Pipeline
                    </button>
                  </div>

                  {/* 3 Step Interactive Progress Pills */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6">
                    <button
                      onClick={() => setHandshakeStep(1)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        handshakeStep === 1
                          ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-100 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">CLIENT &rarr; SERVER</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Step 1: The SYN Packet</h4>
                      <p className="text-xs text-slate-600 leading-snug">
                        "Hey Google, I want to talk! Here is my starting sequence number: 1000."
                      </p>
                    </button>

                    <button
                      onClick={() => setHandshakeStep(2)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        handshakeStep === 2
                          ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-100 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">SERVER &rarr; CLIENT</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Step 2: The SYN-ACK Packet</h4>
                      <p className="text-xs text-slate-600 leading-snug">
                        "Got your message! I hear you loud and clear. My sequence number is 5000, and I expect byte 1001 next."
                      </p>
                    </button>

                    <button
                      onClick={() => setHandshakeStep(3)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        handshakeStep === 3
                          ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-100 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">CLIENT &rarr; SERVER</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Step 3: The Final ACK</h4>
                      <p className="text-xs text-slate-600 leading-snug">
                        "Awesome! I acknowledge your 5000. Both directions are verified. Here comes my Google Search query!"
                      </p>
                    </button>
                  </div>
                </div>

                {/* Interactive Animated Visual Pipeline for Handshake */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span>Live Interactive Visualizer: Handshake Step {handshakeStep} of 3</span>
                  </h3>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Client Node */}
                      <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs text-center">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                          <Cpu className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Alex's Laptop (Browser)</h4>
                        <div className="text-xs font-mono text-slate-500 mt-1">IP: 192.168.1.105 : 54822</div>
                        <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          State: {handshakeStep === 1 ? 'SYN_SENT' : handshakeStep === 2 ? 'SYN_SENT (Waiting)' : 'ESTABLISHED'}
                        </div>
                        <div className="mt-4 p-3 bg-slate-50 rounded text-xs text-slate-700 italic border border-slate-100">
                          {handshakeStep === 1 && '"Hey Google! Can you hear me? I want to search for TCP!"'}
                          {handshakeStep === 2 && '"Waiting for Google to confirm it heard my seq=1000..."'}
                          {handshakeStep === 3 && '"Confirmed! Google heard me, and I heard Google. Connection ESTABLISHED!"'}
                        </div>
                      </div>

                      {/* Network Transit Line with Animated Packet */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center py-4">
                        <div className="text-xs font-mono font-bold text-slate-500 mb-2">
                          Internet Transit (Fiber & Wi-Fi)
                        </div>

                        <div className="w-full relative py-6 flex items-center justify-center">
                          <div className="w-full h-1 bg-slate-200 rounded"></div>
                          
                          {/* Animated Packet Pill */}
                          <div className={`absolute px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white shadow-md transition-all duration-500 ${
                            handshakeStep === 1 
                              ? 'bg-blue-600 translate-x-4 animate-pulse'
                              : handshakeStep === 2
                              ? 'bg-emerald-600 -translate-x-4 animate-pulse'
                              : 'bg-blue-600 translate-x-4 animate-pulse'
                          }`}>
                            {handshakeStep === 1 && 'Packet: [SYN] seq=1000 &rarr;'}
                            {handshakeStep === 2 && '&larr; Packet: [SYN, ACK] seq=5000, ack=1001'}
                            {handshakeStep === 3 && 'Packet: [ACK] ack=5001 &rarr;'}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => setHandshakeStep(1)}
                            className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                              handshakeStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            1
                          </button>
                          <button
                            onClick={() => setHandshakeStep(2)}
                            className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                              handshakeStep === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            2
                          </button>
                          <button
                            onClick={() => setHandshakeStep(3)}
                            className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                              handshakeStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            3
                          </button>
                        </div>
                      </div>

                      {/* Google Datacenter Node */}
                      <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs text-center">
                        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                          <Server className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Google Front End (GFE)</h4>
                        <div className="text-xs font-mono text-slate-500 mt-1">IP: 142.250.190.46 : 443</div>
                        <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                          State: {handshakeStep === 1 ? 'LISTEN / SYN_RCVD' : handshakeStep === 2 ? 'SYN_RCVD' : 'ESTABLISHED'}
                        </div>
                        <div className="mt-4 p-3 bg-slate-50 rounded text-xs text-slate-700 italic border border-slate-100">
                          {handshakeStep === 1 && '"SYN packet arrived from Alex! Allocating TCP control block..."'}
                          {handshakeStep === 2 && '"Replying with SYN-ACK: I acknowledge 1000, and my seq is 5000!"'}
                          {handshakeStep === 3 && '"ACK received from Alex! Connection is live, ready for search query!"'}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Core Conceptual Questions: WHY 3 STEPS AND NOT 2? */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5">
                      <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-2">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        <span>Why Can't We Do This in 2 Steps?</span>
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Imagine a 2-step handshake: Alex says <em>"Can you hear me?"</em> and Google replies <em>"Yes I can!"</em>.
                        Alex knows Google can hear him, but <strong>Google has no idea whether Alex actually received its reply</strong>!
                        If the second packet got lost in transit, Google would allocate memory, reserve socket buffers, and wait forever for a client that thinks the connection failed.
                      </p>
                    </div>

                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5">
                      <h4 className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Why 3 Steps Creates Absolute Mutual Certainty</span>
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        In 3 steps:
                        <strong> Step 1</strong> verifies Alex can transmit.<br />
                        <strong> Step 2</strong> verifies Google can receive AND transmit back.<br />
                        <strong> Step 3</strong> verifies Alex received Google's response and both sides agree on starting sequence numbers. Mutual trust is mathematically established!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SUB-VIEW 3: THE 4-STEP PROCESS (FOUR-WAY TEARDOWN)            */}
            {/* ------------------------------------------------------------- */}
            {simSubView === '4step' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">
                          Step-by-Step Deep Dive
                        </span>
                        <h2 className="text-xl font-bold text-slate-900">
                          The 4-Step Teardown: How Alex and Google Politely Say Goodbye
                        </h2>
                      </div>
                      <p className="text-sm text-slate-600">
                        TCP connections are Full Duplex (two independent one-way channels). Closing requires 4 steps so both directions close cleanly.
                      </p>
                    </div>

                    <button
                      onClick={() => setSimSubView('pipeline')}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 self-start"
                    >
                      &larr; Return to 8-Stage Pipeline
                    </button>
                  </div>

                  {/* 4 Step Interactive Progress Pills */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-6">
                    <button
                      onClick={() => setTeardownStep(1)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        teardownStep === 1
                          ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-100 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center">1</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded">CLIENT &rarr; GFE</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-0.5">1. Client FIN</h4>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        "Google, I got all search snippets. I'm done sending requests! (FIN)"
                      </p>
                    </button>

                    <button
                      onClick={() => setTeardownStep(2)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        teardownStep === 2
                          ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-100 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center">2</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">GFE &rarr; CLIENT</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-0.5">2. Google ACK</h4>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        "Understood! Client transmission is closed. I am still finishing any lingering data."
                      </p>
                    </button>

                    <button
                      onClick={() => setTeardownStep(3)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        teardownStep === 3
                          ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-100 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center">3</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded">GFE &rarr; CLIENT</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-0.5">3. Google FIN</h4>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        "All my cached search assets are flushed. I'm now done sending too! (FIN)"
                      </p>
                    </button>

                    <button
                      onClick={() => setTeardownStep(4)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        teardownStep === 4
                          ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-100 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">4</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">CLIENT &rarr; GFE</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-0.5">4. Client ACK</h4>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        "Acknowledged! Both sides are closed. Entering TIME_WAIT for 30s."
                      </p>
                    </button>
                  </div>
                </div>

                {/* Interactive Animated Visual Pipeline for Teardown */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-600" />
                    <span>Live Interactive Visualizer: Teardown Step {teardownStep} of 4</span>
                  </h3>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      
                      {/* Client Node */}
                      <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs text-center">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                          <Cpu className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Alex's Laptop</h4>
                        <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          State: {
                            teardownStep === 1 ? 'FIN_WAIT_1' :
                            teardownStep === 2 ? 'FIN_WAIT_2 (Half-Closed)' :
                            teardownStep === 3 ? 'FIN_WAIT_2 (Received FIN)' :
                            'TIME_WAIT (Waiting 2MSL)'
                          }
                        </div>
                        <div className="mt-4 p-3 bg-slate-50 rounded text-xs text-slate-700 italic border border-slate-100">
                          {teardownStep === 1 && '"Google, search results are fully rendered. Sending FIN (no more requests)!"'}
                          {teardownStep === 2 && '"Received Google\'s ACK. My outbound transmission is closed, but I am still listening!"'}
                          {teardownStep === 3 && '"Google is also sending FIN! That means Google is also completely done."'}
                          {teardownStep === 4 && '"Sent final ACK. Waiting in TIME_WAIT for 30 seconds so old packets don\'t ghost future connections!"'}
                        </div>
                      </div>

                      {/* Network Transit Line with Animated Packet */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center py-4">
                        <div className="text-xs font-mono font-bold text-slate-500 mb-2">
                          Half-Duplex Shutdown Channel
                        </div>

                        <div className="w-full relative py-6 flex items-center justify-center">
                          <div className="w-full h-1 bg-slate-200 rounded"></div>
                          
                          {/* Animated Packet Pill */}
                          <div className="absolute px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white shadow-md bg-rose-600 animate-pulse">
                            {teardownStep === 1 && 'Packet: [FIN] seq=1200 &rarr;'}
                            {teardownStep === 2 && '&larr; Packet: [ACK] ack=1201'}
                            {teardownStep === 3 && '&larr; Packet: [FIN] seq=8400'}
                            {teardownStep === 4 && 'Packet: [ACK] ack=8401 &rarr;'}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          {[1, 2, 3, 4].map(s => (
                            <button
                              key={s}
                              onClick={() => setTeardownStep(s)}
                              className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${
                                teardownStep === s ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Google Datacenter Node */}
                      <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs text-center">
                        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                          <Server className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">Google Front End (GFE)</h4>
                        <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          State: {
                            teardownStep === 1 ? 'ESTABLISHED &rarr; CLOSE_WAIT' :
                            teardownStep === 2 ? 'CLOSE_WAIT (Flushing Buffers)' :
                            teardownStep === 3 ? 'LAST_ACK' :
                            'CLOSED'
                          }
                        </div>
                        <div className="mt-4 p-3 bg-slate-50 rounded text-xs text-slate-700 italic border border-slate-100">
                          {teardownStep === 1 && '"Received FIN from Alex. Acknowledging, but keeping my outbound pipe open."'}
                          {teardownStep === 2 && '"Flushed final image bits and ad telemetry to Alex."'}
                          {teardownStep === 3 && '"Now sending my own FIN to Alex. Moving to LAST_ACK state."'}
                          {teardownStep === 4 && '"Final ACK received from Alex! Socket completely closed and memory freed."'}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Core Conceptual Questions: WHY 4 STEPS AND WHAT IS TIME_WAIT? */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-5">
                      <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2 mb-2">
                        <HelpCircle className="w-4 h-4 text-rose-600" />
                        <span>Why 4 Steps Instead of 3? (Full Duplex)</span>
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        A TCP connection is not one pipe; it is <strong>two separate one-way lanes</strong>!
                        When Alex finishes sending requests, Google might still be sending search result images.
                        Alex's FIN only closes Alex &rarr; Google. Google must acknowledge that, finish delivering its payload, and then send its own FIN to close Google &rarr; Alex.
                      </p>
                    </div>

                    <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-5">
                      <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>What is TIME_WAIT & Why Wait 30 Seconds?</span>
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        If the client's final ACK in Step 4 gets dropped by a noisy Wi-Fi packet collision, Google will retransmit its FIN.
                        If Alex had closed immediately, Alex would reply with an error (RST) and Google would report an abnormal connection crash.
                        By waiting <strong>2MSL (Maximum Segment Lifetime, ~30-60s)</strong>, Alex guarantees any retransmitted FIN can be safely answered.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Link to Other Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <button
                onClick={() => setActiveSection('concepts')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors text-left flex items-start justify-between group"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Algorithm Comparison Matrix
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Compare Reno, New Reno, Vegas, and CUBIC growth curves mathematically.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors mt-0.5" />
              </button>

              <button
                onClick={() => setActiveSection('sandbox')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors text-left flex items-start justify-between group"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Failure & Jitter Sandbox
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Inject packet loss, bufferbloat, or route flaps and view live tcpdump frames.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors mt-0.5" />
              </button>

              <button
                onClick={() => setActiveSection('diagnostics')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors text-left flex items-start justify-between group"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Diagnostic Incident Lab
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Troubleshoot real-world outages: Path MTU blackholes, socket exhaustion.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors mt-0.5" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 2: DEEP-DIVE CONCEPTUAL MODULES & MATHEMATICAL VISUALIZER */}
        {/* ----------------------------------------------------------------------- */}
        {activeSection === 'concepts' && (
          <div className="space-y-8">
            
            {/* Mathematical SVG Waveform & Congestion Window Graph */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    <span>Real-Time Congestion Window (cwnd) Dynamics</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Simulate how different algorithms scale throughput over time in response to bottleneck link constraints.
                  </p>
                </div>

                {/* Algorithm Selector Buttons */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setSelectedAlgo('reno')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      selectedAlgo === 'reno'
                        ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    TCP Reno (AIMD)
                  </button>
                  <button
                    onClick={() => setSelectedAlgo('vegas')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      selectedAlgo === 'vegas'
                        ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    TCP Vegas (RTT Proactive)
                  </button>
                  <button
                    onClick={() => setSelectedAlgo('cubic')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      selectedAlgo === 'cubic'
                        ? 'bg-white text-indigo-700 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    CUBIC TCP (Polynomial)
                  </button>
                </div>
              </div>

              {/* Interactive Controls & Live SVG Canvas Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
                
                {/* SVG Graph Canvas */}
                <div className="lg:col-span-8 bg-slate-950 rounded-lg p-4 text-white relative">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>Y: cwnd (Segments / MSS)</span>
                    <span>Algorithm: {selectedAlgo.toUpperCase()}</span>
                    <span>X: Transmission Time (RTT intervals)</span>
                  </div>

                  {/* SVG Line Graph */}
                  <div className="h-64 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 600 240" preserveAspectRatio="none">
                      {/* Grid lines */}
                      {[0, 60, 120, 180, 240].map((y, i) => (
                        <line key={i} x1="0" y1={y} x2="600" y2={y} stroke="#334155" strokeWidth="0.75" strokeDasharray="3 3" />
                      ))}
                      {[0, 100, 200, 300, 400, 500, 600].map((x, i) => (
                        <line key={i} x1={x} y1="0" x2={x} y2="240" stroke="#334155" strokeWidth="0.75" strokeDasharray="3 3" />
                      ))}

                      {/* Threshold horizontal line */}
                      <line
                        x1="0"
                        y1={240 - (ssthreshSlider / 72) * 240}
                        x2="600"
                        y2={240 - (ssthreshSlider / 72) * 240}
                        stroke="#eab308"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />

                      {/* Path Line for cwnd */}
                      <path
                        d={curveData.reduce((acc, pt, idx) => {
                          const x = (pt.t / 60) * 600;
                          const y = 240 - (pt.cwnd / 72) * 240;
                          return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                        }, '')}
                        fill="none"
                        stroke={selectedAlgo === 'cubic' ? '#818cf8' : selectedAlgo === 'vegas' ? '#34d399' : '#38bdf8'}
                        strokeWidth="2.5"
                      />

                      {/* Data Point Dots on Drops */}
                      {curveData.filter(pt => pt.phase.includes('Recovery') || pt.cwnd < 10).map((pt, idx) => {
                        const x = (pt.t / 60) * 600;
                        const y = 240 - (pt.cwnd / 72) * 240;
                        return (
                          <circle key={idx} cx={x} cy={y} r="4" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
                        );
                      })}
                    </svg>
                  </div>

                  {/* Legend & Annotations */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-0.5 bg-indigo-400"></span>
                        <span className="font-mono text-slate-300">cwnd Curve</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-0.5 bg-amber-400 border-dashed"></span>
                        <span className="font-mono text-slate-300">ssthresh ({ssthreshSlider} MSS)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span className="font-mono text-slate-300">Fast Retransmit Event</span>
                      </div>
                    </div>
                    <span className="font-mono text-emerald-400">Peak Efficiency: 94.2%</span>
                  </div>
                </div>

                {/* Parameter Control Deck */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-4">
                    <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Interactive Link Controls
                    </div>

                    {/* Slider 1: Slow Start Threshold */}
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>ssthresh Threshold</span>
                        <span className="font-mono text-indigo-700">{ssthreshSlider} MSS</span>
                      </div>
                      <input
                        type="range"
                        min="12"
                        max="56"
                        value={ssthreshSlider}
                        onChange={(e) => setSsthreshSlider(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Boundary where Slow Start switches to linear Congestion Avoidance.
                      </span>
                    </div>

                    {/* Slider 2: Packet Loss Frequency */}
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>Link Noise / Loss Rate</span>
                        <span className="font-mono text-indigo-700">Level {lossRateSlider} of 3</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        value={lossRateSlider}
                        onChange={(e) => setLossRateSlider(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Simulates Wi-Fi interference triggering 3-Duplicate ACK recoveries.
                      </span>
                    </div>

                    {/* Slider 3: Base RTT Delay */}
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                        <span>Base Fiber RTT</span>
                        <span className="font-mono text-indigo-700">{rttBaseSlider} ms</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={rttBaseSlider}
                        onChange={(e) => setRttBaseSlider(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Physical propagation delay between user and Google Edge PoP.
                      </span>
                    </div>
                  </div>

                  {/* Theoretical Formula Explainer Card */}
                  <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 text-xs">
                    <div className="font-semibold text-indigo-950 mb-1">
                      {selectedAlgo === 'reno' && 'TCP Reno (AIMD / RFC 5681)'}
                      {selectedAlgo === 'vegas' && 'TCP Vegas (Delay-Based Congestion)'}
                      {selectedAlgo === 'cubic' && 'CUBIC TCP (High-BDP Default in Linux)'}
                    </div>
                    <div className="font-mono text-indigo-800 bg-white/80 p-2 rounded border border-indigo-200 mb-2 text-[11px]">
                      {selectedAlgo === 'reno' && 'Additive: cwnd += 1/cwnd per ACK\nDecrease: cwnd = cwnd / 2 upon loss'}
                      {selectedAlgo === 'vegas' && 'Expected = cwnd / BaseRTT\nDiff = Expected - (cwnd / ActualRTT)'}
                      {selectedAlgo === 'cubic' && 'W_cubic(t) = C * (t - K)^3 + W_max\nIndependent of RTT round-trip duration'}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {selectedAlgo === 'reno' && 'Produces the classic "sawtooth" waveform. Loss is the only feedback signal, which frequently forces bottleneck routers into queue drops.'}
                      {selectedAlgo === 'vegas' && 'Measures queuing delay by watching RTT rise above BaseRTT before drops occur. Smooths bandwidth probing but loses out to aggressive Reno flows.'}
                      {selectedAlgo === 'cubic' && 'Replaces linear probing with a cubic function that flattens near the prior loss ceiling (W_max) and accelerates rapidly once stability is established.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep-Dive: Protocol Layering & Encapsulation Inspector */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Protocol Encapsulation: How the Query is Nested</span>
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                From application HTTP/2 string down to physical Ethernet wire frame: every layer wraps the preceding payload with addressing and control invariants.
              </p>

              <div className="space-y-3 font-mono text-xs">
                {/* Layer 1: Physical / Data Link (Ethernet II) */}
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                  <div className="flex items-center justify-between text-slate-700 font-semibold mb-2">
                    <span>1. Layer 2: Ethernet II Frame (14 Bytes Header + 4 Bytes FCS)</span>
                    <span className="text-[11px] text-slate-500 font-normal">Addressing: MAC Address</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <span className="text-slate-400 block text-[9px]">DESTINATION MAC</span>
                      <span className="text-slate-800">f0:99:bf:12:44:01 (Gateway)</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <span className="text-slate-400 block text-[9px]">SOURCE MAC</span>
                      <span className="text-slate-800">48:2a:e3:11:bc:90 (Laptop)</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <span className="text-slate-400 block text-[9px]">ETHERTYPE</span>
                      <span className="text-indigo-600 font-semibold">0x0800 (IPv4)</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <span className="text-slate-400 block text-[9px]">FCS CHECKSUM</span>
                      <span className="text-emerald-700">CRC-32 (Valid)</span>
                    </div>
                  </div>
                </div>

                {/* Layer 2: Network Layer (IPv4) */}
                <div className="border border-indigo-200 rounded-lg p-3 bg-indigo-50/30 ml-2 sm:ml-4">
                  <div className="flex items-center justify-between text-indigo-950 font-semibold mb-2">
                    <span>2. Layer 3: Internet Protocol v4 (20 Bytes Header)</span>
                    <span className="text-[11px] text-indigo-700 font-normal">Addressing: 32-bit IP</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-white p-2 rounded border border-indigo-100">
                      <span className="text-slate-400 block text-[9px]">SRC IP</span>
                      <span className="text-slate-800">192.168.1.105 (Private)</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-indigo-100">
                      <span className="text-slate-400 block text-[9px]">DST IP</span>
                      <span className="text-slate-800">142.250.190.46 (Google)</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-indigo-100">
                      <span className="text-slate-400 block text-[9px]">TTL / PROTOCOL</span>
                      <span className="text-indigo-700 font-semibold">TTL=64, Proto=6 (TCP)</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-indigo-100">
                      <span className="text-slate-400 block text-[9px]">TOTAL LENGTH / DF</span>
                      <span className="text-slate-800">1500 Bytes (DF Bit = 1)</span>
                    </div>
                  </div>
                </div>

                {/* Layer 3: Transport Layer (TCP) */}
                <div className="border border-indigo-300 rounded-lg p-3 bg-indigo-100/40 ml-4 sm:ml-8">
                  <div className="flex items-center justify-between text-indigo-900 font-semibold mb-2">
                    <span>3. Layer 4: Transmission Control Protocol (20–32 Bytes Header)</span>
                    <span className="text-[11px] text-indigo-800 font-normal">Addressing: 16-bit Ports</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="bg-white p-2 rounded border border-indigo-200">
                      <span className="text-slate-400 block text-[9px]">PORTS</span>
                      <span className="text-slate-800">54822 → 443 (HTTPS)</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-indigo-200">
                      <span className="text-slate-400 block text-[9px]">SEQ / ACK</span>
                      <span className="text-slate-800">Seq=1001, Ack=5001</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-indigo-200">
                      <span className="text-slate-400 block text-[9px]">FLAGS</span>
                      <span className="text-indigo-700 font-bold">[ACK, PSH]</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-indigo-200">
                      <span className="text-slate-400 block text-[9px]">RECV WINDOW</span>
                      <span className="text-slate-800">65535 (Scale x7)</span>
                    </div>
                  </div>
                </div>

                {/* Layer 4: Application Layer (TLS 1.3 + HTTP/2 Query) */}
                <div className="border border-emerald-300 rounded-lg p-3 bg-emerald-50/50 ml-6 sm:ml-12">
                  <div className="flex items-center justify-between text-emerald-950 font-semibold mb-2">
                    <span>4. Layer 7: Encrypted Search Query (TLS Application Record)</span>
                    <span className="text-[11px] text-emerald-800 font-normal">AES-256-GCM Cryptographic Payload</span>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-emerald-200 text-[11px] text-slate-800 overflow-x-auto">
                    <span className="text-emerald-700 font-bold">:method</span> GET · <span className="text-emerald-700 font-bold">:path</span> /search?q=how+does+tcp+congestion+control+work · <span className="text-emerald-700 font-bold">:authority</span> www.google.com · <span className="text-slate-400">user-agent: Chrome/131.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Systematic Comparison Table: ARQ & Transport Algorithms */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Systematic Comparison: Error Control & Congestion Architectures
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                How different transport design philosophies balance network efficiency against memory buffers and recovery latency.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                      <th className="py-2.5 px-3">Mechanism</th>
                      <th className="py-2.5 px-3">Window Logic</th>
                      <th className="py-2.5 px-3">Loss Detection</th>
                      <th className="py-2.5 px-3">Retransmission Scope</th>
                      <th className="py-2.5 px-3">Real-World Practical Trade-Off</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-normal">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Stop-and-Wait ARQ</td>
                      <td className="py-3 px-3 font-mono">Window Size = 1</td>
                      <td className="py-3 px-3">Timer expiry only</td>
                      <td className="py-3 px-3">Resends single packet</td>
                      <td className="py-3 px-3 text-slate-700">Abysmal throughput on high BDP links (idle waiting for round trips).</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Go-Back-N ARQ</td>
                      <td className="py-3 px-3 font-mono">Send Win = N, Recv Win = 1</td>
                      <td className="py-3 px-3">Cumulative ACKs + Timer</td>
                      <td className="py-3 px-3">Retransmits missing packet AND all subsequent segments</td>
                      <td className="py-3 px-3 text-slate-700">Wastes network capacity if later segments were already safely received.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Selective Repeat (SACK)</td>
                      <td className="py-3 px-3 font-mono">Send Win = N, Recv Win = N</td>
                      <td className="py-3 px-3">Selective ACKs (RFC 2018)</td>
                      <td className="py-3 px-3 font-medium text-indigo-700">Retransmits ONLY missing holes</td>
                      <td className="py-3 px-3 text-slate-700">Requires receiver reassembly buffers; industry standard for modern TCP.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Forward Error Correction (FEC)</td>
                      <td className="py-3 px-3 font-mono">Block Parity (e.g. Reed-Solomon)</td>
                      <td className="py-3 px-3">Math syndrome decoding</td>
                      <td className="py-3 px-3 text-emerald-700 font-medium">Zero retransmits (reconstructed locally)</td>
                      <td className="py-3 px-3 text-slate-700">Adds ~10% bandwidth overhead; essential for satellite links and live video.</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">SCTP Multi-Streaming</td>
                      <td className="py-3 px-3 font-mono">Multi-channel associations</td>
                      <td className="py-3 px-3">Per-stream Chunk Seq (SSN)</td>
                      <td className="py-3 px-3">Isolated per independent stream</td>
                      <td className="py-3 px-3 text-slate-700">Eliminates Head-of-Line blocking; supports multi-homed IP failover.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 3: INTERACTIVE MECHANISM & LINK FAILURE SANDBOX */}
        {/* ----------------------------------------------------------------------- */}
        {activeSection === 'sandbox' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-blue-600" />
                    <span>Live Link Impairment & Failure Simulation Sandbox</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any network impairment below to inject live physical disturbances into the student’s connection to Google.
                  </p>
                </div>
                <button
                  onClick={() => triggerSandboxAction('normal')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Nominal</span>
                </button>
              </div>

              {/* Impairment Preset Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-6">
                <button
                  onClick={() => triggerSandboxAction('normal')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    sandboxMode === 'normal'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-2 ring-blue-200 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs"></span>
                    <span>1. Nominal Link</span>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">0.01% loss, 18ms RTT, clean fiber to Google edge.</div>
                </button>

                <button
                  onClick={() => triggerSandboxAction('loss')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    sandboxMode === 'loss'
                      ? 'border-rose-600 bg-rose-50/60 text-rose-900 ring-2 ring-rose-200 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs"></span>
                    <span>2. Wi-Fi Packet Drop</span>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">Drops Segment #25; triggers 3 Dup ACKs & Fast Retransmit.</div>
                </button>

                <button
                  onClick={() => triggerSandboxAction('jitter')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    sandboxMode === 'jitter'
                      ? 'border-amber-600 bg-amber-50/60 text-amber-900 ring-2 ring-amber-200 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs"></span>
                    <span>3. Jitter Burst (+85ms)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">Cellular handover delay; tests RTP jitter buffer absorb rate.</div>
                </button>

                <button
                  onClick={() => triggerSandboxAction('bufferbloat')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    sandboxMode === 'bufferbloat'
                      ? 'border-purple-600 bg-purple-50/60 text-purple-900 ring-2 ring-purple-200 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-xs"></span>
                    <span>4. Bufferbloat Spike</span>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">Oversized router queue swells latency from 18ms to 480ms.</div>
                </button>

                <button
                  onClick={() => triggerSandboxAction('flap')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    sandboxMode === 'flap'
                      ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 ring-2 ring-emerald-200 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-xs"></span>
                    <span>5. BGP Route Flap</span>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">Primary WAN path severed; SCTP multi-homing failover test.</div>
                </button>
              </div>

              {/* Physical Topology Interactive Node Visualization */}
              <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-3">
                  <span>Physical Transit Chain & Current Impairment State</span>
                  <span className="font-mono text-blue-600 font-medium">Mode: {sandboxMode.toUpperCase()}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                    <div className="text-[10px] text-slate-400 font-mono">NODE A</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">Student Chrome</div>
                    <div className="text-[10px] text-emerald-600 font-medium mt-1">Status: OK</div>
                  </div>
                  <div className={`p-3 rounded-lg border shadow-xs transition-colors ${
                    sandboxMode === 'loss' || sandboxMode === 'jitter' ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'
                  }`}>
                    <div className="text-[10px] text-slate-400 font-mono">NODE B</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">Home Wi-Fi AP</div>
                    <div className={`text-[10px] font-medium mt-1 ${
                      sandboxMode === 'loss' ? 'text-rose-600 font-bold' : sandboxMode === 'jitter' ? 'text-amber-600 font-bold' : 'text-emerald-600'
                    }`}>
                      {sandboxMode === 'loss' ? 'Dropping Pkts' : sandboxMode === 'jitter' ? 'Jitter Swing' : 'Status: OK'}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border shadow-xs transition-colors ${
                    sandboxMode === 'bufferbloat' ? 'bg-purple-50 border-purple-300' : 'bg-white border-slate-200'
                  }`}>
                    <div className="text-[10px] text-slate-400 font-mono">NODE C</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">ISP Edge DSLAM</div>
                    <div className={`text-[10px] font-medium mt-1 ${
                      sandboxMode === 'bufferbloat' ? 'text-purple-700 font-bold' : 'text-emerald-600'
                    }`}>
                      {sandboxMode === 'bufferbloat' ? 'Queue Full (480ms)' : 'Status: OK'}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border shadow-xs transition-colors ${
                    sandboxMode === 'flap' ? 'bg-rose-50 border-rose-300' : 'bg-white border-slate-200'
                  }`}>
                    <div className="text-[10px] text-slate-400 font-mono">NODE D</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">Tier-1 Fiber Link</div>
                    <div className={`text-[10px] font-medium mt-1 ${
                      sandboxMode === 'flap' ? 'text-rose-600 font-bold' : 'text-emerald-600'
                    }`}>
                      {sandboxMode === 'flap' ? 'BGP Flap Down' : 'Status: OK'}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs">
                    <div className="text-[10px] text-slate-400 font-mono">NODE E</div>
                    <div className="text-xs font-bold text-slate-900 mt-0.5">Google Front End</div>
                    <div className="text-[10px] text-emerald-600 font-medium mt-1">Status: Listening</div>
                  </div>
                </div>
              </div>

              {/* Terminal Frame & Live Simulated Packet Capture */}
              <div className="mt-6 bg-slate-950 rounded-xl p-4 font-mono text-xs border border-slate-800 text-slate-300 shadow-md">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-200">root@edge-probe:~# tcpdump -nn -i wlan0 -s 0 "tcp port 443"</span>
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Live Kernel Capture Filter</span>
                </div>

                <div className="space-y-1.5 overflow-x-auto max-h-64 overflow-y-auto pr-2">
                  {sandboxLog.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className={
                        line.includes('INJECTED')
                          ? 'text-rose-300 font-bold bg-rose-950/40 p-1.5 rounded border-l-2 border-rose-500'
                          : line.includes('Retransmit') || line.includes('HALVED') || line.includes('TRIPLE DUP ACK')
                          ? 'text-amber-300 font-semibold bg-amber-950/20 p-1 rounded'
                          : line.includes('Jitter')
                          ? 'text-cyan-300 font-medium'
                          : line.includes('NOMINAL')
                          ? 'text-emerald-300 font-semibold bg-emerald-950/30 p-1 rounded'
                          : 'text-slate-300 font-mono text-[11px]'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 4: PRACTICAL DIAGNOSTIC LAB ("System Fails Under Normal Symptoms") */}
        {/* ----------------------------------------------------------------------- */}
        {activeSection === 'diagnostics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-indigo-600" />
                    <span>Practical Diagnostic Lab: Real-World Incident Triage</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select a realistic production outage scenario where standard connectivity tests show "Normal" but application delivery fails.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400">Diagnostic Suite v4.2</span>
              </div>

              {/* Incident Selector Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-6">
                {[
                  { title: 'Case 1: MTU Blackhole', subtitle: 'TLS handshake hangs' },
                  { title: 'Case 2: Jitter Starvation', subtitle: 'Video stutters every 3s' },
                  { title: 'Case 3: Transatlantic Reno', subtitle: 'High BDP link crawl' },
                  { title: 'Case 4: Port Exhaustion', subtitle: 'TIME-WAIT accumulation' },
                  { title: 'Case 5: Head-of-Line Block', subtitle: 'Multi-stream freeze' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDiagIdx(idx)}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      selectedDiagIdx === idx
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-100 font-semibold'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs">{item.title}</div>
                    <div className="text-[11px] font-normal text-slate-500 truncate">{item.subtitle}</div>
                  </button>
                ))}
              </div>

              {/* Diagnostic Detail Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                
                {/* Left: Terminal Output Shell */}
                <div className="lg:col-span-7 bg-slate-950 rounded-lg p-4 font-mono text-xs border border-slate-800 text-slate-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>admin@sys-troubleshoot:~#</span>
                      </div>
                      <span className="text-[10px] text-slate-500">Live Shell Output</span>
                    </div>

                    <div className="space-y-2 text-[11px] leading-relaxed">
                      {selectedDiagIdx === 0 && (
                        <>
                          <div className="text-slate-400">$ ping -c 2 -M do -s 1472 142.250.190.46</div>
                          <div className="text-slate-300">PING 142.250.190.46: 1472 data bytes (1500 IP bytes)</div>
                          <div className="text-rose-400 font-bold">From 10.24.0.1 icmp_seq=1 Frag needed and DF set (mtu = 1420)</div>
                          <div className="text-slate-400 mt-2">$ tcpdump -nn "tcp[tcpflags] & (tcp-syn) != 0"</div>
                          <div className="text-slate-300">10:30:01.002 IP 192.168.1.105.54822 &gt; 142.250.190.46.443: Flags [S], mss 1460</div>
                          <div className="text-amber-300">10:30:04.100 IP 142.250.190.46.443 &gt; 192.168.1.105.54822: [TLS ServerHello, Cert (1460B)] -&gt; DROPPED SILENTLY BY TUNNEL</div>
                          <div className="text-slate-500">ICMP Type 3 Code 4 dropped by upstream middlebox firewall. TCP hangs indefinitely.</div>
                        </>
                      )}

                      {selectedDiagIdx === 1 && (
                        <>
                          <div className="text-slate-400">$ rtpdump -F dump -f 127.0.0.1/5004</div>
                          <div className="text-slate-300">Frame #210 arrive: t+0.000s | Frame #211 arrive: t+0.015s (nominal)</div>
                          <div className="text-amber-300">Frame #212 arrive: t+0.098s (delay = +83ms jitter burst)</div>
                          <div className="text-rose-400 font-bold">[JITTER-BUFFER] depth: 30ms | Frame #212 arrived past playout deadline!</div>
                          <div className="text-rose-400 font-bold">[AUDIO-ENGINE] Buffer underrun! Audio packet dropped. Silence inserted (stutter).</div>
                          <div className="text-slate-400 mt-2">$ tc -s qdisc show dev wlan0</div>
                          <div className="text-slate-300">qdisc fq_codel 0: root refcnt 2 limit 10240p flows 1024 drops 0</div>
                        </>
                      )}

                      {selectedDiagIdx === 2 && (
                        <>
                          <div className="text-slate-400">$ sysctl net.ipv4.tcp_congestion_control</div>
                          <div className="text-slate-300">net.ipv4.tcp_congestion_control = reno</div>
                          <div className="text-slate-400 mt-1">$ ss -tin '( sport = :443 or dport = :443 )'</div>
                          <div className="text-amber-300">reno cwnd:8 ssthresh:8 rtt:140/2.1 rto:340 delivery_rate: 1.18Mbps</div>
                          <div className="text-slate-400 mt-2"># Mathis Formula Upper-Bound Calculation:</div>
                          <div className="text-slate-300 font-semibold">Throughput &lt;= (MSS / RTT) * (1 / sqrt(loss_rate))</div>
                          <div className="text-rose-400">At 140ms RTT with 0.1% loss: Max Reno Throughput = 3.3 Mbps on a 1 Gbps physical fiber!</div>
                          <div className="text-slate-500">Linear AIMD (+1 MSS per 140ms RTT) requires 42 minutes to reach full line rate after a drop.</div>
                        </>
                      )}

                      {selectedDiagIdx === 3 && (
                        <>
                          <div className="text-slate-400">$ ss -s</div>
                          <div className="text-slate-300">Total: 32410</div>
                          <div className="text-rose-400 font-bold">TCP: 31800 (estab 42, closed 0, orphaned 8, timewait 31650)</div>
                          <div className="text-slate-400 mt-2">$ curl -v https://www.google.com/search?q=test</div>
                          <div className="text-rose-400">curl: (7) Failed to connect: Cannot assign requested address (EADDRNOTAVAIL)</div>
                          <div className="text-slate-400 mt-2">$ cat /proc/sys/net/ipv4/ip_local_port_range</div>
                          <div className="text-slate-300">32768   60999 (28,231 available ephemeral port space completely consumed by TIME-WAIT!)</div>
                        </>
                      )}

                      {selectedDiagIdx === 5 || selectedDiagIdx === 4 && (
                        <>
                          <div className="text-slate-400">$ tshark -i eth0 -Y "http2" -T fields -e http2.streamid -e tcp.seq</div>
                          <div className="text-slate-300">Stream 1: Data frame Seq=1001-2460 (DROPPED in transit)</div>
                          <div className="text-emerald-400">Stream 3: Data frame Seq=2461-3920 (Arrived in kernel buffer)</div>
                          <div className="text-emerald-400">Stream 5: Data frame Seq=3921-5380 (Arrived in kernel buffer)</div>
                          <div className="text-rose-400 font-bold mt-2">Kernel TCP Stack: Byte stream gap at 1001. read() blocked!</div>
                          <div className="text-rose-400">Application Chrome Engine cannot read Stream 3 or 5 until Stream 1 retransmission completes.</div>
                          <div className="text-slate-500">Classic Transport Head-of-Line (HoL) Blocking across multiplexed logical streams.</div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
                    <span>Audit Status: Reproducible In-Kernel</span>
                    <span className="text-emerald-400">Telemetry Validated</span>
                  </div>
                </div>

                {/* Right: Engineering Deduction & Remediation Playbook */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="text-xs font-semibold text-slate-900 mb-1">
                      {selectedDiagIdx === 0 && 'Root Cause: Path MTU Blackhole (RFC 1191 / RFC 4821)'}
                      {selectedDiagIdx === 1 && 'Root Cause: Fixed-Depth Jitter Buffer Underrun'}
                      {selectedDiagIdx === 2 && 'Root Cause: Reno AIMD Failure on High Bandwidth-Delay Product (BDP)'}
                      {selectedDiagIdx === 3 && 'Root Cause: TIME-WAIT Ephemeral Port Exhaustion (RFC 1323)'}
                      {selectedDiagIdx === 4 && 'Root Cause: TCP Byte-Stream Head-of-Line Blocking'}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedDiagIdx === 0 && 'A VPN, PPPoE encapsulation, or cloud overlay tunnel reduces the true path MTU to 1420 bytes. When the server pushes large TLS certificates with Don\'t Fragment (DF) enabled, an intermediate router drops them and sends ICMP Fragmentation Needed, but a broken firewall silently filters ICMP.'}
                      {selectedDiagIdx === 1 && 'Wi-Fi multi-pathing or cellular tower handovers cause arrival packet intervals to swing between 15ms and 95ms. A static 30ms playout buffer empties completely, forcing the audio codec into buffer starvation even though zero packets were actually lost.'}
                      {selectedDiagIdx === 2 && 'TCP Reno increases cwnd by exactly 1 MSS per RTT. Over a 140ms international fiber link, a single dropped packet cuts the window by 50%. The Mathis Formula shows Reno cannot mathematically fill modern gigabit pipes over high RTT.'}
                      {selectedDiagIdx === 3 && 'Every closed connection lingers in TIME-WAIT for 2*MSL (60 seconds) to ensure stray duplicates dissipate. High-frequency micro-benchmarks or short web requests exhaust all 28,231 client ephemeral ports, causing immediate connect() failures.'}
                      {selectedDiagIdx === 4 && 'HTTP/2 multiplexes multiple web streams over a single TCP connection. However, TCP guarantees an ordered byte stream to the kernel. A loss in Stream 1 halts the delivery of Streams 3, 5, and 7 until retransmitted.'}
                    </p>
                  </div>

                  {/* Concrete Remediation Step */}
                  <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                    <div className="text-xs font-semibold text-indigo-950 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      <span>Production Remediation Action</span>
                    </div>
                    <div className="font-mono text-[11px] bg-white p-2 rounded border border-indigo-200 text-indigo-900 mb-2">
                      {selectedDiagIdx === 0 && 'iptables -t mangle -A POSTROUTING -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu'}
                      {selectedDiagIdx === 1 && 'webrtc::JitterBuffer::SetTargetDelay(std::max(min_delay, 2 * interarrival_jitter + 20ms))'}
                      {selectedDiagIdx === 2 && 'sysctl -w net.ipv4.tcp_congestion_control=cubic\n# Or modern: net.ipv4.tcp_congestion_control=bbr'}
                      {selectedDiagIdx === 3 && 'sysctl -w net.ipv4.tcp_tw_reuse=1\nsysctl -w net.ipv4.tcp_timestamps=1\n# Use HTTP/2 Keep-Alive pooling'}
                      {selectedDiagIdx === 4 && 'Upgrade to HTTP/3 (QUIC over UDP) or SCTP Multi-Streaming\n# QUIC stream-level framing isolates loss recovery'}
                    </div>
                    <span className="text-[11px] text-slate-600 block leading-tight">
                      {selectedDiagIdx === 0 && 'Clamps the Maximum Segment Size during the SYN handshake so packets never exceed the tunnel boundary.'}
                      {selectedDiagIdx === 1 && 'Uses RTCP telemetry feedback to dynamically expand the buffer depth during turbulence and contract it during quiet periods.'}
                      {selectedDiagIdx === 2 && 'CUBIC growth scales as a cubic polynomial of elapsed wall-clock time rather than RTT duration, reclaiming 1 Gbps in seconds.'}
                      {selectedDiagIdx === 3 && 'Allows safe reuse of TIME-WAIT sockets for outgoing connections when timestamps prove incoming packets are strictly newer.'}
                      {selectedDiagIdx === 4 && 'QUIC handles loss per-stream: an error on Stream 1 allows Streams 3 and 5 to be consumed by Chrome with zero stall.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 5: INTERACTIVE UNDERSTANDING CHECKS (MCQs & MATCH-THE-FOLLOWING) */}
        {/* ----------------------------------------------------------------------- */}
        {activeSection === 'quiz' && (
          <div className="space-y-8">
            
            {/* Part A: Scenario-Based Multiple Choice Questions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="pb-4 mb-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    <span>Part A: Scenario-Grounded Architecture Checks</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Test failure isolation, protocol state handling, and algorithm trade-offs. Instant visual feedback with full engineering rationales.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400">4 Scenarios</span>
              </div>

              <div className="space-y-6">
                {[
                  {
                    q: '1. A client sending search packets over a noisy Wi-Fi connection receives 3 Duplicate ACKs for Sequence Number 24 (expecting Seq 25). What action does a standard TCP Reno sender execute immediately?',
                    options: [
                      'A) Completely abort the socket with a RST flag due to corrupted sequence sync.',
                      'B) Drop cwnd to 1 MSS, reset ssthresh to 2, and restart Slow Start from scratch.',
                      'C) Halve ssthresh (ssthresh = cwnd / 2), retransmit Segment 25 immediately without waiting for the RTO timer, and enter Fast Recovery.',
                      'D) Wait for the 1.0-second Retransmission Timeout (RTO) timer to expire before resending any packets.'
                    ],
                    correct: 2,
                    whyRight: 'Three duplicate ACKs provide positive proof that three subsequent packets safely reached the receiver (causing it to re-emit ACKs). Since the network is still delivering data, TCP invokes Fast Retransmit to skip the crippling RTO timeout, cuts ssthresh in half, and stays in Fast Recovery.',
                    whyWrong: 'Resetting cwnd to 1 is only done on catastrophic RTO timeouts (when the network goes completely dead). Waiting for RTO or resetting the socket would add 200–1000ms of unnecessary latency.'
                  },
                  {
                    q: '2. Why does the TCP state machine enforce that the connection endpoint initiating the active close must remain in the TIME-WAIT state for 2 × MSL (Maximum Segment Lifetime)?',
                    options: [
                      'A) To allow the browser to continue silently prefetching subsequent search query suggestions.',
                      'B) To ensure the final ACK reached the peer (so a retransmitted FIN can be answered) and to allow all delayed duplicate segments in the WAN to expire before the port tuple is reused.',
                      'C) To negotiate TLS 1.3 session resumption tickets with the local DNS resolver.',
                      'D) To calculate the BBR pacing rate for subsequent TCP handshakes on the same subnet.'
                    ],
                    correct: 1,
                    whyRight: 'If the final ACK is lost in transit, the remote host retransmits its FIN. If the client vanished immediately into CLOSED, it would reply with RST instead of ACK, breaking graceful termination. Furthermore, 2×MSL guarantees old packets from this incarnation die before a new socket opens on the same (IP, Port) pair.',
                    whyWrong: 'Data transfer is completely closed in TIME-WAIT; no search prefetching or TLS tickets are exchanged. Pacing rates are calculated during active transfer, not in teardown.'
                  },
                  {
                    q: '3. On high-speed transatlantic links (e.g., 10 Gbps with 140ms RTT), why does traditional TCP Reno underperform compared to CUBIC TCP?',
                    options: [
                      'A) TCP Reno disables Selective Acknowledgments (SACK) by design.',
                      'B) TCP Reno caps its maximum transmission speed at 100 Mbps in software.',
                      'C) Reno increases cwnd by only 1 MSS per round trip, requiring thousands of round trips to recover from a single loss event on large Bandwidth-Delay Product (BDP) links.',
                      'D) CUBIC compresses all application payloads into gzip format inside the Linux kernel.'
                    ],
                    correct: 2,
                    whyRight: 'The Bandwidth-Delay Product (BDP) of a 10 Gbps link at 140ms is over 175 Megabytes. Reno\'s additive increase of +1 MSS (1.46 KB) per 140ms RTT takes over 40 minutes to ramp up! CUBIC uses a cubic function of elapsed wall-clock time that scales independently of RTT.',
                    whyWrong: 'Reno supports SACK, does not have a 100 Mbps software lock, and CUBIC does not perform gzip payload compression.'
                  },
                  {
                    q: '4. During real-time educational video streaming, packets arrive with high jitter (delays fluctuating between 18ms and 110ms). What mechanism absorbs this variation to prevent choppy playback?',
                    options: [
                      'A) Stop-and-Wait ARQ retransmission.',
                      'B) Increasing the IP packet Time-to-Live (TTL) field to 255.',
                      'C) A client-side Jitter Buffer that introduces a controlled delay to queue and dequeue media frames at an isochronous (steady) playout rate.',
                      'D) Setting the TCP Window Scale factor to 0.'
                    ],
                    correct: 2,
                    whyRight: 'A Jitter Buffer intentionally delays incoming packets by a calibrated depth (e.g. 40–60ms). Early packets wait in the buffer; late packets catch up before their playback deadline, producing smooth continuous audio and video.',
                    whyWrong: 'Stop-and-wait would induce continuous buffering pauses. TTL simply prevents routing loops. Setting window scale to 0 would restrict throughput.'
                  }
                ].map((item, qIdx) => {
                  const userAnswer = quizAnswers[qIdx];
                  const isAnswered = userAnswer !== null;
                  const isCorrect = userAnswer === item.correct;

                  return (
                    <div key={qIdx} className="border border-slate-200 rounded-lg p-5 bg-slate-50/50">
                      <div className="text-sm font-semibold text-slate-900 mb-3 leading-snug">
                        {item.q}
                      </div>

                      <div className="space-y-2 mb-4">
                        {item.options.map((opt, optIdx) => {
                          let optStyle = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300';
                          if (isAnswered) {
                            if (optIdx === item.correct) {
                              optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                            } else if (optIdx === userAnswer) {
                              optStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                            } else {
                              optStyle = 'border-slate-200 bg-white text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
                              }}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {isAnswered && optIdx === item.correct && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2 mt-0.5" />
                              )}
                              {isAnswered && optIdx === userAnswer && optIdx !== item.correct && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2 mt-0.5" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback Block */}
                      {isAnswered && (
                        <div className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                          isCorrect ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' : 'bg-rose-50/80 border-rose-200 text-rose-950'
                        }`}>
                          <div className="font-bold mb-1 flex items-center gap-1.5">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Correct Understanding</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-4 h-4 text-rose-600" />
                                <span>Incorrect Deduction</span>
                              </>
                            )}
                          </div>
                          <div className="mb-1 text-slate-800">{item.whyRight}</div>
                          {!isCorrect && (
                            <div className="text-slate-600 text-[11px] pt-1 border-t border-rose-200/60 mt-1">
                              <strong>Distractor Analysis:</strong> {item.whyWrong}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Part B: Interactive "Match the Following" (Architecture ↔ Real-World Reality) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="pb-4 mb-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-indigo-600" />
                    <span>Part B: Concept ↔ Real-World Mechanism Matching</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click a syllabus concept on the left, then click its corresponding real-world reality on the right to link them.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setMatchedPairs({});
                      setSelectedLeftMatch(null);
                      setMatchValidationActive(false);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-md transition-colors"
                  >
                    Reset Pairs
                  </button>
                  <button
                    onClick={() => setMatchValidationActive(true)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors shadow-xs"
                  >
                    Verify Pairs
                  </button>
                </div>
              </div>

              {/* Match Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column: Syllabus Concepts */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                    Syllabus Concept (Click to Select)
                  </div>
                  {[
                    { id: 'c1', name: '1. TCP State Machine', desc: 'Protocol state tracking' },
                    { id: 'c2', name: '2. AIMD Dynamics', desc: 'Congestion discovery & fairness' },
                    { id: 'c3', name: '3. Fast Retransmit', desc: 'Triple duplicate ACK heuristic' },
                    { id: 'c4', name: '4. Selective Repeat (SACK)', desc: 'Isolated hole retransmission' },
                    { id: 'c5', name: '5. SCTP Multi-Streaming', desc: 'Independent channel multiplexing' },
                    { id: 'c6', name: '6. Jitter Buffer', desc: 'Playout timing stabilization' }
                  ].map((item) => {
                    const isSelected = selectedLeftMatch === item.id;
                    const isPaired = Boolean(matchedPairs[item.id]);

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (matchedPairs[item.id]) {
                            // Unpair on click
                            const next = { ...matchedPairs };
                            delete next[item.id];
                            setMatchedPairs(next);
                          } else {
                            setSelectedLeftMatch(item.id);
                          }
                        }}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200 font-semibold text-indigo-900'
                            : isPaired
                            ? 'border-emerald-300 bg-emerald-50/50 text-slate-800'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-slate-900">{item.name}</div>
                          <div className="text-[11px] text-slate-500">{item.desc}</div>
                        </div>
                        {isPaired && (
                          <span className="text-[10px] font-mono font-medium text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                            Linked
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Concrete Engineering Reality */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                    Case Study Reality (Click to Pair)
                  </div>
                  {[
                    { id: 'r_c3', targetId: 'c3', text: 'Resends dropped Wi-Fi segment immediately upon 3 duplicate ACKs without waiting for a 1-second timeout.' },
                    { id: 'r_c6', targetId: 'c6', text: 'Stores incoming packets with arrival variations (18ms to 110ms) to ensure continuous audio/video playout.' },
                    { id: 'r_c1', targetId: 'c1', text: 'Transitions from CLOSED → SYN-SENT → ESTABLISHED, and quarantines sockets in TIME-WAIT for 60 seconds.' },
                    { id: 'r_c2', targetId: 'c2', text: 'Increases cwnd by +1 MSS per RTT and cuts rate by 50% upon loss, converging to Chiu-Jain stability.' },
                    { id: 'r_c5', targetId: 'c5', text: 'Transmits independent streams in one association so a dropped packet on stream 1 does not freeze stream 2.' },
                    { id: 'r_c4', targetId: 'c4', text: 'Receiver reports exact non-contiguous byte blocks received so only isolated missing holes are retransmitted.' }
                  ].map((target) => {
                    // Check if this right item is linked to anything
                    const linkedLeftId = Object.keys(matchedPairs).find(k => matchedPairs[k] === target.targetId);
                    const isCorrect = linkedLeftId === target.targetId;

                    return (
                      <button
                        key={target.id}
                        onClick={() => {
                          if (selectedLeftMatch) {
                            setMatchedPairs(prev => ({
                              ...prev,
                              [selectedLeftMatch]: target.targetId
                            }));
                            setSelectedLeftMatch(null);
                          }
                        }}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                          linkedLeftId
                            ? matchValidationActive
                              ? isCorrect
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium'
                                : 'border-rose-400 bg-rose-50 text-rose-950'
                              : 'border-indigo-300 bg-indigo-50/30 text-indigo-950 font-medium'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="leading-snug">{target.text}</span>
                          {matchValidationActive && linkedLeftId && (
                            isCorrect ? (
                              <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                            )
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Validation Summary Banner */}
              {matchValidationActive && (
                <div className="mt-6 p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">Matching Result: </span>
                    <span className="text-slate-600">
                      {Object.keys(matchedPairs).filter(k => matchedPairs[k] === k).length} of 6 Correctly Paired
                    </span>
                  </div>
                  {Object.keys(matchedPairs).filter(k => matchedPairs[k] === k).length === 6 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 inline" /> All Concepts Accurately Mapped!
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium">
                      Review highlighted items above to refine pairings.
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* SECTION 6: HYPOTHETICAL CASE STUDY GUARDRAILS & REAL-WORLD REALITY */}
        {/* ----------------------------------------------------------------------- */}
        {activeSection === 'guardrails' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="pb-6 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                  <span>Pedagogical Scope & Architectural Reality</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Hypothetical Case Study Guardrails & Real-World Reality
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
                  To teach transport dynamics clearly, textbook curriculums isolate classical protocols (TCP Reno, AIMD, basic handshakes). Here is how production hyperscale systems at Google actually operate in reality.
                </p>
              </div>

              {/* 5 Structured Guardrail Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Guardrail 1 */}
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>1. Encryption & Zero-RTT Handshakes</span>
                    </div>
                    <div className="text-[11px] font-mono text-indigo-700 mb-2">TLS 1.3 · ALPN · Session Tickets</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Educational Simplification:</strong> We showed TCP 3-way handshake and subsequent plain query frames.
                      <br /><br />
                      <strong>Production Reality:</strong> 100% of Google traffic is encrypted with TLS 1.3. For returning users, TLS 1.3 supports <em>0-RTT early data</em> where encrypted search queries are transmitted alongside the connection setup, saving a full round-trip.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                    Syllabus Layer: Transport (L4) + Presentation (L6)
                  </div>
                </div>

                {/* Guardrail 2 */}
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>2. Edge Caching & Anycast Routing</span>
                    </div>
                    <div className="text-[11px] font-mono text-indigo-700 mb-2">BGP Anycast · Maglev · Edge PoPs</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Educational Simplification:</strong> Packets are depicted travelling directly to a distant monolithic datacenter.
                      <br /><br />
                      <strong>Production Reality:</strong> BGP Anycast routes the user to the nearest Edge Point of Presence (PoP), often inside their local city ISP. Google Maglev software load balancers terminate TCP within 2–5ms, proxying the query over private fiber.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                    Syllabus Layer: Network (L3) Routing Architecture
                  </div>
                </div>

                {/* Guardrail 3 */}
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>3. Modern Congestion Control: Google BBR</span>
                    </div>
                    <div className="text-[11px] font-mono text-indigo-700 mb-2">Bottleneck Bandwidth & Round-Trip</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Educational Simplification:</strong> We modeled loss-based Reno AIMD and CUBIC curves.
                      <br /><br />
                      <strong>Production Reality:</strong> Google developed and deployed <em>BBR (Bottleneck Bandwidth and RTT)</em>. Instead of treating packet loss as congestion, BBR builds an explicit physical model of maximum delivery rate and minimum RTT, preventing router queue bloat.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                    Syllabus Layer: Transport (L4) Algorithmics
                  </div>
                </div>

                {/* Guardrail 4 */}
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      <span>4. QUIC & HTTP/3 Transport Shift</span>
                    </div>
                    <div className="text-[11px] font-mono text-indigo-700 mb-2">QUIC (RFC 9000) over UDP</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Educational Simplification:</strong> We traced raw TCP byte streams and state machines.
                      <br /><br />
                      <strong>Production Reality:</strong> Over 75% of Chrome-to-Google traffic now runs over QUIC (HTTP/3) implemented on top of UDP. QUIC eliminates Head-of-Line blocking, enables connection migration across Wi-Fi/LTE, and integrates TLS keys in the first frame.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                    Syllabus Layer: Next-Gen Transport Protocol
                  </div>
                </div>

                {/* Guardrail 5 */}
                <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col justify-between md:col-span-2 lg:col-span-2">
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span>5. Pedagogical Scope & Foundational Value</span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-700 mb-2">Why Standard TCP Remains Essential Curriculum</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Even with modern protocols like QUIC, HTTP/3, and BBR, the core transport invariants taught in this unit—<strong>sliding windows, sequence synchronization, fair allocation mathematics, fast retransmit heuristics, and jitter mitigation</strong>—are the immutable building blocks of all computer networking. QUIC itself re-implements these exact TCP principles inside user space!
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                    Pedagogical Guarantee: Direct conceptual transfer to any network stack.
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}


      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <span>TransitEdu EdTech Curriculum</span>
            <span className="mx-2">·</span>
            <span>Unit 4: Transport Layer Protocols & Algorithmic Congestion Dynamics</span>
          </div>
          <div>
            <span>Strict RFC 5681, RFC 9438, RFC 3550 Compliance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
