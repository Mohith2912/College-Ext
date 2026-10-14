import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  PhoneCall,
  Share2,
  Hand,
  Settings,
  Info,
  Users,
  MessageSquare,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Lock,
  Unlock,
  Radio,
  Wifi,
  Server,
  Key,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Cpu,
  Layers,
  Activity,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Zap,
  Globe
} from 'lucide-react';

// --- DATA STRUCTURES & SYLLABUS CONTENT ---

interface StageData {
  id: number;
  title: string;
  subtitle: string;
  securityConcept: string;
  attackPrevented: string;
  schematicTag: string;
  pduLabel: string;
  physicalReality: string;
  engineeringMechanism: string;
  whyItMatters: string;
  technicalDetails: {
    protocol: string;
    layer: string;
    cryptoPrimitive: string;
    handshakeStep: string;
  };
}

const STAGES: StageData[] = [
  {
    id: 1,
    title: '1. User Sign-in & Authentication',
    subtitle: 'AAA Framework & Kerberos-Style Ticket Granting',
    securityConcept: 'Authentication (AAA Framework) & Centralized Identity',
    attackPrevented: 'Credential Theft, Brute Force, Unauthorized Impersonation',
    schematicTag: 'Client ↔ Google Accounts (Gaia / OAuth 2.0 / KDC)',
    pduLabel: 'HTTPS POST /accounts/signin (JSON Web Token & Auth Ticket)',
    physicalReality: 'You open meet.google.com and enter your corporate credentials. No raw password is ever sent over and over again for individual meetings.',
    engineeringMechanism: 'Google implements a central ticket-granting mechanism analogous to Kerberos. Client exchanges primary credentials for an ephemeral signed session ticket (OAuth 2.0 / Gaia Session Cookie) with high cryptographic entropy.',
    whyItMatters: 'Decouples password verification from ongoing services. If a malicious meeting host or proxy intercepts meeting requests, your root Google account password remains completely unexposed.',
    technicalDetails: {
      protocol: 'HTTPS / OAuth 2.0 / OIDC',
      layer: 'Application Layer (L7)',
      cryptoPrimitive: 'SHA-256 with RSA-4096 / ECDSA signatures',
      handshakeStep: 'Ticket Granting Service (TGS) authentication exchange'
    }
  },
  {
    id: 2,
    title: '2. Web Signaling Handshake',
    subtitle: 'TLS 1.3 Transport Security & Certificate Pinning',
    securityConcept: 'Confidentiality, Server Authentication & Asymmetric Cryptography',
    attackPrevented: 'Man-in-the-Middle (MITM), Passive Eavesdropping, DNS Hijacking',
    schematicTag: 'Browser ↔ Google Front-End (GFE Edge Proxy)',
    pduLabel: 'TLS ClientHello / ServerHello + X.509 Certificate Chain',
    physicalReality: 'The padlock icon activates in your browser address bar. The browser verifies Google Meet is legitimate before exchanging any meeting parameters.',
    engineeringMechanism: 'Browser executes a 1-RTT TLS 1.3 handshake. Server presents an X.509 certificate signed by a trusted Certificate Authority (GTS CA). Ephemeral Diffie-Hellman (ECDHE) derives symmetric AES-GCM session keys.',
    whyItMatters: 'Guarantees Perfect Forward Secrecy (PFS). Even if Google’s private key were compromised in the future, past recorded meetings cannot be retroactively decrypted.',
    technicalDetails: {
      protocol: 'TLS 1.3 over TCP 443 / QUIC UDP 443',
      layer: 'Transport Layer Security (L4-L7 boundary)',
      cryptoPrimitive: 'ECDHE Curve25519 + AES-256-GCM + SHA-384',
      handshakeStep: '1-RTT Key Exchange with Public Key Pinning'
    }
  },
  {
    id: 3,
    title: '3. Room Authorization & Knock Admission',
    subtitle: 'Authorization (AAA Framework) & Access Control Lists',
    securityConcept: 'Access Control (MAC/RBAC) & Ephemeral Token Validation',
    attackPrevented: 'Meeting Bombing, Wardialing, Room Snooping',
    schematicTag: 'Client ↔ Google Meet Conference Controller (SFU Coordinator)',
    pduLabel: 'WebSocket JSON-RPC (joinMeetingRequest with Signed Meeting Token)',
    physicalReality: 'You enter a 10-letter meeting code (e.g. sec-u4cn-gmt). If you are outside the organization, you are placed in a waiting room until the host admits you.',
    engineeringMechanism: 'The server verifies the meeting code against the calendar ACL. External guests receive a 403 Forbidden or "Knock" state until the meeting organizer’s client issues a cryptographically signed admission token.',
    whyItMatters: 'Separates who you are (Authentication) from what you can do (Authorization). A valid Google account cannot access arbitrary private executive meetings without explicit authorization.',
    technicalDetails: {
      protocol: 'WSS (Secure WebSockets) / gRPC-Web',
      layer: 'Session & Application Control (L5/L7)',
      cryptoPrimitive: 'HMAC-SHA256 Meeting Tokens with TTL timestamps',
      handshakeStep: 'Token verification against Room Access Matrix'
    }
  },
  {
    id: 4,
    title: '4. Audio & Video Media Ingress',
    subtitle: 'DTLS-SRTP Real-Time Symmetric Stream Ciphers',
    securityConcept: 'Confidentiality & Data Integrity for Datagrams',
    attackPrevented: 'Voice Wiretapping, Video Interception, Packet Payload Tampering',
    schematicTag: 'WebRTC Client ↔ Google Media Selective Forwarding Unit (SFU)',
    pduLabel: 'SRTP (Encrypted Opus Audio + VP9/AV1 Video Frames + HMAC Tag)',
    physicalReality: 'You turn on your webcam and microphone. Your live voice and 1080p video stream seamlessly to the cloud with ultra-low latency (<150ms).',
    engineeringMechanism: 'Standard TLS over TCP introduces unacceptable latency jitter for video. Instead, WebRTC establishes DTLS (Datagram TLS over UDP) to negotiate symmetric keys, then protects raw audio/video using SRTP (Secure Real-time Transport Protocol).',
    whyItMatters: 'SRTP adds minimal byte overhead and uses AES in Counter mode (AES-CTR), allowing out-of-order packet arrival while maintaining full cryptographic confidentiality and message integrity.',
    technicalDetails: {
      protocol: 'DTLS 1.2/1.3 + SRTP (RFC 3711 / RFC 5764)',
      layer: 'Transport Layer (UDP ports 19302-19309 / 3478)',
      cryptoPrimitive: 'AES-128-GCM or AES-CTR with HMAC-SHA1-80',
      handshakeStep: 'DTLS handshake over ICE candidate UDP pair'
    }
  },
  {
    id: 5,
    title: '5. Public Internet Transit & VPN Tunneling',
    subtitle: 'IPsec (ESP/AH) & Tunnel Mode vs Direct Transport',
    securityConcept: 'Network Layer Security & Site-to-Site Encapsulation',
    attackPrevented: 'ISP-level Snooping, Autonomous System (AS) Route Tampering',
    schematicTag: 'Branch Router / Home Client ↔ Google Edge Point of Presence (PoP)',
    pduLabel: 'IPsec ESP Packet (Outer IP + ESP Header + Inner IP + UDP Payload)',
    physicalReality: 'Packets leave your laptop, transit commercial broadband, undersea fiber cables, and intermediate transit providers before entering Google’s private backbone.',
    engineeringMechanism: 'If an employee joins from a corporate laptop, an IPsec VPN client wraps packets in Tunnel Mode. Encapsulating Security Payload (ESP) encrypts the entire original IP packet and signs it with an Integrity Check Value (ICV).',
    whyItMatters: 'IPsec operates at Layer 3 (Network Layer), rendering network topology, internal private IP addresses (RFC 1918), and host identities completely invisible to intermediate ISPs.',
    technicalDetails: {
      protocol: 'IPsec Tunnel Mode (RFC 4303 ESP Protocol 50)',
      layer: 'Network Layer (L3)',
      cryptoPrimitive: 'AES-256-CBC/GCM + HMAC-SHA256 for ICV integrity',
      handshakeStep: 'IKEv2 (Internet Key Exchange) Phase 1 & 2'
    }
  },
  {
    id: 6,
    title: '6. Multi-Party Edge Routing & VPN Diversification',
    subtitle: 'SSL VPN vs IPsec VPN vs Direct MPLS Cloud Peering',
    securityConcept: 'Heterogeneous VPN Architectures & Secure Multi-Tenant Ingress',
    attackPrevented: 'Lateral Network Infiltration, Split-Tunnel Leaks',
    schematicTag: 'Heterogeneous Endpoints (Office, Remote, Mobile) ↔ Cloud Edge',
    pduLabel: 'MPLS Label Switched Path (LSP) / SSL VPN TLS Tunnel Encapsulation',
    physicalReality: 'Colleague 1 joins from a high-security corporate HQ; Colleague 2 joins from a mobile phone on 5G; Colleague 3 joins from home Wi-Fi.',
    engineeringMechanism: 'HQ uses enterprise MPLS VPN or hardware IPsec VPN tunnels with static gateway peering. Remote employees utilize SSL VPN (OpenVPN/WireGuard/TLS portal) or direct DTLS-SRTP into Google’s nearest Edge PoP via Anycast routing.',
    whyItMatters: 'Demonstrates real-world defense-in-depth: the meeting security model does not rely on a single trusted perimeter. Even if a remote user is on an untrusted public coffee shop network, the application-layer encryption remains impenetrable.',
    technicalDetails: {
      protocol: 'IPsec / SSL VPN / MPLS L3VPN',
      layer: 'Network & Session Layer (L3/L4/L5)',
      cryptoPrimitive: 'Multi-Protocol Label Stacking / ChaCha20-Poly1305 / AES',
      handshakeStep: 'Edge BGP Anycast steering to local Media Gateway'
    }
  },
  {
    id: 7,
    title: '7. Continuous Real-Time Defense & IDS/IPS',
    subtitle: 'Stateful Firewalls, Anti-DDoS & 64-Bit Anti-Replay Windows',
    securityConcept: 'Intrusion Detection/Prevention & Stateful Packet Inspection',
    attackPrevented: 'DDoS Floods, Packet Replay Attacks, Malformed Packet Exploits',
    schematicTag: 'Google Cloud Armor / Edge Firewall ↔ Deep Packet Inspection (DPI)',
    pduLabel: 'RTP Sequence Number Verification & TCP SYN Cookie Validation',
    physicalReality: 'While your call is active, malicious botnets attempt to flood Google servers or inject recorded packets into your meeting audio.',
    engineeringMechanism: 'Network firewalls drop unsolicited inbound UDP ports. Intrusion Prevention Systems (IPS) monitor traffic flows with signature matching. SRTP tracks a 64-bit sliding replay window; any packet with a duplicated or stale sequence number is immediately discarded.',
    whyItMatters: 'Passive encryption alone does not prevent denial-of-service or replay attacks. Without active sequence validation, an adversary could re-send previously recorded "Yes, approve the transaction" audio snippets.',
    technicalDetails: {
      protocol: 'SRTP Anti-Replay + Google Cloud Armor Anti-DDoS',
      layer: 'Transport / Application Security (L4/L7)',
      cryptoPrimitive: 'Sliding Window Bitmap + BGP Anycast Sinkholing',
      handshakeStep: 'Continuous sequence audit and flow rate limiting'
    }
  },
  {
    id: 8,
    title: '8. Session Teardown & Cryptographic Shredding',
    subtitle: 'Accounting (AAA Framework), PFS Zeroing & Key Destruction',
    securityConcept: 'Accounting (AAA), Session Revocation & Cryptographic Hygiene',
    attackPrevented: 'Session Hijacking, Residual Data Exfiltration, Replay of Ended Calls',
    schematicTag: 'Client ↔ Meeting Controller ↔ AAA Audit Log Engine',
    pduLabel: 'RTCP BYE Packet + TLS close_notify + Audit Log Event',
    physicalReality: 'You click the red "Leave Call" button. The video window shuts down and the browser camera indicator light immediately turns off.',
    engineeringMechanism: 'Client sends an RTCP BYE packet. All ephemeral symmetric keys (SRTP AES keys, DTLS master secrets) are overwritten in memory (zeroized). Session tokens are revoked in the AAA accounting registry, and meeting duration/participant logs are archived for compliance.',
    whyItMatters: 'Prevents session resurrection attacks. Even if an attacker captures the operating system memory dump minutes after the call, all session cryptographic keys have been destroyed.',
    technicalDetails: {
      protocol: 'RTCP BYE / TLS close_notify / OAuth 2.0 Token Revocation',
      layer: 'Application & Session Layer (L5/L7)',
      cryptoPrimitive: 'Cryptographic Memory Zeroization & Signed Audit Trails',
      handshakeStep: 'Session termination and AAA Accounting event generation'
    }
  }
];

const COMPARISON_MATRIX = [
  {
    protocol: 'TLS 1.3 (HTTPS)',
    layer: 'Transport / Session (L4/L7)',
    cipher: 'AES-GCM / ChaCha20-Poly1305',
    addressing: 'TCP Stream / Hostname:Port',
    integrity: 'HMAC / AEAD Tag',
    failureScope: 'Breaks web signaling and room setup',
    meetRole: 'Protects login, room admission & WebRTC signaling'
  },
  {
    protocol: 'DTLS-SRTP',
    layer: 'Transport (UDP Real-Time)',
    cipher: 'AES-CTR / AES-GCM (RFC 3711)',
    addressing: 'UDP 5-Tuple (IP, Port, Protocol)',
    integrity: 'HMAC-SHA1-80 / GCM Authentication Tag',
    failureScope: 'Immediate audio/video freeze or black screen',
    meetRole: 'Encrypts camera & mic payloads with <150ms latency'
  },
  {
    protocol: 'IPsec (ESP Tunnel)',
    layer: 'Network Layer (L3)',
    cipher: 'AES-CBC / AES-GCM Protocol 50',
    addressing: 'Encapsulates entire original IP packet',
    integrity: 'Integrity Check Value (ICV / HMAC)',
    failureScope: 'All corporate traffic dropped at router',
    meetRole: 'Protects enterprise employees joining via corporate VPN'
  },
  {
    protocol: 'IPsec (AH Mode)',
    layer: 'Network Layer (L3)',
    cipher: 'None (Authentication Only)',
    addressing: 'Original IP Header + AH Header (51)',
    integrity: 'HMAC across IP header & payload',
    failureScope: 'Fails under NAT traversal (NAT breaks hash)',
    meetRole: 'Rarely used directly; replaced by ESP with auth'
  },
  {
    protocol: 'SSL VPN (TLS Portal)',
    layer: 'Transport / Application (L4/L7)',
    cipher: 'TLS ciphers over TCP/UDP',
    addressing: 'User-space virtual network adapter',
    integrity: 'TLS AEAD tag',
    failureScope: 'Remote worker disconnects from intranet',
    meetRole: 'Enables remote workers to access internal Google Meet links'
  },
  {
    protocol: 'MPLS L3VPN',
    layer: 'Data Link / Network (L2.5/L3)',
    cipher: 'Typically plaintext tags (requires IPsec for crypto)',
    addressing: 'MPLS Label Stack (20-bit labels)',
    integrity: 'FCS / Router-level checksums',
    failureScope: 'Dedicated telecom fiber circuit outage',
    meetRole: 'Direct enterprise interconnect to Google Cloud Edge'
  }
];

const DIAGNOSTIC_CASES = [
  {
    id: 'case-mtu',
    title: 'Audio Flows Fine, But Video Freezes After 10 Seconds',
    symptom: 'Small UDP audio packets (120 bytes) arrive continuously, but 1080p video packets (1400+ bytes) are discarded. User sees static thumbnail.',
    command: 'tcpdump -nnvvv -i eth0 "udp and port 3478" and ifconfig eth0',
    terminalOutput: `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
19:14:02.102 IP (tos 0x0, ttl 64, id 41920, offset 0, flags [DF], proto UDP (17), length 1420)
    192.168.1.105.51230 > 142.250.80.42.3478: UDP, length 1392
19:14:02.104 IP (tos 0xc0, ttl 58, proto ICMP (1), length 576)
    198.51.100.1 > 192.168.1.105: ICMP 142.250.80.42 unreachable - fragmentation needed and DF set, mtu 1380
--- Packets exceeding 1380 bytes dropped by intermediate DSL router ---`,
    rootCause: 'Path MTU Black Hole: The client sets the Don’t Fragment (DF) bit on SRTP packets. Intermediate ISP PPPoE router has MTU 1380 instead of 1500. Video frames get dropped while small Opus audio packets pass.',
    remediation: 'Enable WebRTC Path MTU Discovery (PMTUD) or clamp MSS/MTU to 1350 bytes in WebRTC client network stack. Forces SRTP to segment large video keyframes into smaller sub-1300 byte datagrams.'
  },
  {
    id: 'case-mitm',
    title: 'Branch Office Throws "Untrusted Certificate Authority" / TLS Handshake Failure',
    symptom: 'Users on corporate branch office network cannot join Google Meet. Browser flags SSL interception error; WebRTC signaling refuses to open.',
    command: 'openssl s_client -connect meet.google.com:443 -servername meet.google.com -showcerts',
    terminalOutput: `CONNECTED(00000003)
depth=1 C = US, O = AcmeCorp CyberSecurity, CN = AcmeCorp SSL Interception CA
verify error:num=19:self-signed certificate in certificate chain
verify return:1
---
Certificate chain
 0 s:CN = *.google.com
   i:C = US, O = AcmeCorp CyberSecurity, CN = AcmeCorp SSL Interception CA
---
Server certificate: -----BEGIN CERTIFICATE-----...
FAILED: Strict Certificate Pinning violated. WebRTC client aborted DTLS negotiation.`,
    rootCause: 'Corporate SSL Decryption Proxy: An enterprise Next-Gen Firewall (NGFW) is performing active Man-in-the-Middle (MITM) inspection by dynamically re-signing TLS certificates. Google Meet enforces Strict Certificate Pinning, detecting the interception as an active attack.',
    remediation: 'Configure enterprise firewall to bypass SSL inspection for Google Meet IP prefixes (*.google.com, *.googleusercontent.com, UDP 19302-19309). Re-establishes direct end-to-end cryptographic trust.'
  },
  {
    id: 'case-vpn-nat',
    title: 'IPsec Tunnel Keeps Freezing Every 3 Minutes with 100% Packet Loss',
    symptom: 'Remote worker joins via IPsec VPN. Call is crisp for 180 seconds, then completely drops for 20 seconds before recovering.',
    command: 'ipsec status && grep -i "keepalive\\|nat-t" /var/log/charon.log',
    terminalOutput: `Security Associations (1 up, 0 connecting):
  corp-tunnel[1]: ESTABLISHED 3 minutes ago, 192.168.1.105...203.0.113.1
  corp-tunnel{1}:  INSTALLED, TUNNEL, reqid 1, ESP SPIs: c3a49182_i d193f01b_o
[charon] 19:18:22 peer not responding to DPD probes (NAT mapping expired)
[charon] 19:18:25 closing expired IKE_SA [1]
[charon] 19:18:27 initiating IKE_SA re-establishment (NAT-Traversal UDP 4500)`,
    rootCause: 'NAT-Traversal (NAT-T) Keepalive Timeout: The home consumer Wi-Fi router expires UDP NAT mappings after 120 seconds of silence or port flapping. The IPsec tunnel loses its binding and must renegotiate Phase 2 keys from scratch.',
    remediation: 'Configure IPsec client NAT-T keepalive interval to 20 seconds (`nat_keepalive = 20s`). Ensures router state table maintains UDP port 4500 translation continuously during video streams.'
  },
  {
    id: 'case-auth',
    title: 'External Guest Receives 403: "You Can\'t Join This Meeting"',
    symptom: 'Invited vendor tries clicking Google Meet link from personal Gmail account. Meets page rejects admission immediately without even ringing host.',
    command: 'curl -Iv https://meet.google.com/sec-u4cn-gmt -H "Authorization: Bearer ya29.a0PersonalToken..."',
    terminalOutput: `HTTP/2 403 Forbidden
date: Fri, 25 Sep 2026 19:20:00 GMT
content-type: application/json; charset=UTF-8
vary: Origin, X-Origin, Referer
{
  "error": {
    "code": 403,
    "message": "ACCESS_DENIED_ORGANIZATION_POLICY",
    "status": "PERMISSION_DENIED",
    "details": [
      {
        "reason": "DOMAIN_RESTRICTED_MEETING",
        "domainPolicy": "TENANT_INTERNAL_ONLY"
      }
    ]
  }
}`,
    rootCause: 'AAA Authorization Policy Violation: The Google Workspace administrator configured a tenant-level access control list (ACL) requiring explicit domain membership (@acmecorp.com). The central identity token is authentic, but authorization fails.',
    remediation: 'Meeting host must either generate a guest-allowed meeting room or the Workspace administrator must whitelist the vendor’s external tenant domain in Google Admin Console Access Control settings.'
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Why does Google Meet use DTLS-SRTP for audio and video instead of standard TLS over TCP?',
    options: [
      { id: 'a', text: 'TLS does not support modern symmetric encryption like AES-GCM.', correct: false, reason: 'Incorrect. TLS 1.3 natively supports AES-GCM and ChaCha20-Poly1305.' },
      { id: 'b', text: 'TCP retransmission and head-of-line blocking cause unacceptable latency spikes for live speech.', correct: true, reason: 'Correct! TCP guarantees delivery by holding all subsequent data if a packet is lost. Real-time video cannot wait for retransmissions; a dropped frame is discarded to preserve low latency.' },
      { id: 'c', text: 'UDP eliminates the need for any digital certificates or key exchanges.', correct: false, reason: 'Incorrect. DTLS still executes a cryptographic handshake with certificates over UDP.' },
      { id: 'd', text: 'SRTP avoids using symmetric encryption keys to save CPU cycles.', correct: false, reason: 'Incorrect. SRTP uses symmetric encryption (AES-CTR or AES-GCM) on every single packet.' }
    ]
  },
  {
    id: 2,
    question: 'What is the primary vulnerability prevented by the 64-bit sliding window in SRTP?',
    options: [
      { id: 'a', text: 'Active Man-in-the-Middle certificate substitution attacks.', correct: false, reason: 'Incorrect. Certificate pinning and the initial TLS/DTLS handshake prevent MITM.' },
      { id: 'b', text: 'Replay Attacks where an attacker re-broadcasts previously captured encrypted packets.', correct: true, reason: 'Correct! An adversary who captured encrypted "Yes, I agree" audio packets could replay them later. The sliding window tracks sequence numbers and immediately discards duplicate or stale packets.' },
      { id: 'c', text: 'Passive wiretapping of fiber-optic backbones.', correct: false, reason: 'Incorrect. Payload encryption (AES) stops wiretapping, not the sequence window.' },
      { id: 'd', text: 'DNS cache poisoning targeting meet.google.com.', correct: false, reason: 'Incorrect. DNSSEC and DNS-over-HTTPS address DNS poisoning.' }
    ]
  },
  {
    id: 3,
    question: 'When an employee connects to Google Meet via an IPsec VPN in Tunnel Mode, what does the intermediate ISP see?',
    options: [
      { id: 'a', text: 'The employee’s private IP (192.168.1.50) and Google Meet’s video destination port (3478).', correct: false, reason: 'Incorrect. In Tunnel Mode, the original IP header and transport ports are encrypted inside the ESP payload.' },
      { id: 'b', text: 'Plaintext audio codecs (Opus) but encrypted video frames (VP9).', correct: false, reason: 'Incorrect. IPsec operates at Layer 3 and treats all upper-layer data as ciphertext.' },
      { id: 'c', text: 'Only an outer IP packet between the user’s router and the corporate VPN gateway with IP Protocol 50 (ESP).', correct: true, reason: 'Correct! Tunnel Mode encapsulates the entire original IP packet inside a new IP header. The ISP cannot see the true destination IP, port numbers, or application protocols.' },
      { id: 'd', text: 'The decrypted HTTP headers and Google Account session tokens.', correct: false, reason: 'Incorrect. The entire communication is doubly protected by both IPsec and application TLS.' }
    ]
  },
  {
    id: 4,
    question: 'How does Google’s authentication architecture embody the Kerberos ticket philosophy?',
    options: [
      { id: 'a', text: 'The user transmits their raw plaintext password in every WebRTC packet.', correct: false, reason: 'Incorrect. Passwords are never sent repeatedly.' },
      { id: 'b', text: 'Primary credentials are exchanged once with an Auth Server for signed ephemeral tickets used across services.', correct: true, reason: 'Correct! Like Kerberos Ticket-Granting Tickets (TGT), Google issues short-lived cryptographic tokens (Gaia / OAuth 2.0). Meeting rooms authenticate via tickets without seeing user passwords.' },
      { id: 'c', text: 'Meeting hosts must manually re-verify passwords via SMS for every attendee.', correct: false, reason: 'Incorrect. Authentication is automated via central identity providers.' },
      { id: 'd', text: 'All participants share a single static pre-shared key (PSK) across the entire company.', correct: false, reason: 'Incorrect. Pre-shared static keys violate individual accountability and access control.' }
    ]
  }
];

const MATCH_CONCEPTS = [
  {
    id: 'c1',
    concept: 'AAA Framework (Authentication)',
    matchId: 'm1',
    description: 'Central Identity & OAuth 2.0 Ticket Exchange'
  },
  {
    id: 'c2',
    concept: 'Confidentiality & PFS',
    matchId: 'm2',
    description: 'TLS 1.3 ECDHE ephemeral key exchange preventing retro-decryption'
  },
  {
    id: 'c3',
    concept: 'Real-Time Transport Crypto',
    matchId: 'm3',
    description: 'DTLS-SRTP datagram encryption over UDP avoiding TCP head-of-line lag'
  },
  {
    id: 'c4',
    concept: 'Layer 3 Network Tunneling',
    matchId: 'm4',
    description: 'IPsec ESP in Tunnel Mode masking internal topology and original IPs'
  },
  {
    id: 'c5',
    concept: 'Anti-Replay Mechanism',
    matchId: 'm5',
    description: '64-bit sliding sequence bitmap rejecting duplicate captured frames'
  },
  {
    id: 'c6',
    concept: 'Intrusion Prevention (IPS)',
    matchId: 'm6',
    description: 'Cloud Armor & edge firewall dropping malformed packets and DDoS floods'
  }
];

const MATCH_TARGETS = [
  { id: 'm3', text: 'DTLS-SRTP datagram encryption over UDP avoiding TCP head-of-line lag' },
  { id: 'm1', text: 'Central Identity & OAuth 2.0 Ticket Exchange' },
  { id: 'm5', text: '64-bit sliding sequence bitmap rejecting duplicate captured frames' },
  { id: 'm2', text: 'TLS 1.3 ECDHE ephemeral key exchange preventing retro-decryption' },
  { id: 'm6', text: 'Cloud Armor & edge firewall dropping malformed packets and DDoS floods' },
  { id: 'm4', text: 'IPsec ESP in Tunnel Mode masking internal topology and original IPs' }
];

export default function App() {
  // Navigation
  const [activeSection, setActiveSection] = useState<'pipeline' | 'live-call' | 'architecture' | 'visualizers' | 'diagnostic-lab' | 'quiz' | 'guardrails'>('pipeline');

  // Simulator playback state
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(3000); // 3 seconds per stage

  // Live Google Meet Lab State
  const [inCall, setInCall] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeNetwork, setActiveNetwork] = useState<'home' | 'corp' | 'coffee'>('corp');
  const [activeAttack, setActiveAttack] = useState<'none' | 'mitm' | 'replay' | 'ddos' | 'knock'>('none');
  const [securityShieldOpen, setSecurityShieldOpen] = useState(false);
  const [meetLogStream, setMeetLogStream] = useState<string[]>([
    '[INIT] Identity authenticated via Gaia OAuth 2.0 (Ticket: tok_e891af2)',
    '[TLS1.3] Cipher: TLS_AES_256_GCM_SHA384, Server Cert: CN=*.google.com (GTS CA 1C3)',
    '[WEBRTC] ICE Candidate Pair: UDP 192.168.1.105:54321 <-> 142.250.80.42:3478 (STUN Success)',
    '[SRTP] DTLS Handshake verified. AES-CTR Session Keys rotated. Sliding Window initialized (seq: 1042)',
    '[STREAM] Active Opus 48kHz audio + VP9 1080p60 video channels nominal'
  ]);

  // Visualizer State
  const [visualizerMode, setVisualizerMode] = useState<'window' | 'encapsulation' | 'crypto'>('window');
  const [windowPackets, setWindowPackets] = useState([
    { seq: 1040, status: 'accepted', age: 'old' },
    { seq: 1041, status: 'accepted', age: 'old' },
    { seq: 1042, status: 'accepted', age: 'current' },
    { seq: 1043, status: 'accepted', age: 'current' },
    { seq: 1044, status: 'expected', age: 'window' },
    { seq: 1045, status: 'expected', age: 'window' },
    { seq: 1046, status: 'expected', age: 'window' }
  ]);
  const [replayAttemptState, setReplayAttemptState] = useState<'none' | 'blocked' | 'injected'>('none');
  const [selectedEncapsulationLayer, setSelectedEncapsulationLayer] = useState<number>(3);

  // Diagnostic Lab State
  const [selectedDiagnosticCase, setSelectedDiagnosticCase] = useState(0);
  const [diagnosticSolved, setDiagnosticSolved] = useState<Record<string, boolean>>({});

  // Quiz & Matching State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  // Auto-play timer for Simulator
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStageIndex((prev) => (prev + 1) % STAGES.length);
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  // Push log helper
  const addLog = (msg: string) => {
    setMeetLogStream((prev) => [msg, ...prev.slice(0, 7)]);
  };

  // Attack trigger handler
  const triggerAttack = (attack: 'none' | 'mitm' | 'replay' | 'ddos' | 'knock') => {
    setActiveAttack(attack);
    if (attack === 'none') {
      addLog('[DEFENSE] Attack cleared. Normal encrypted channels restored.');
      return;
    }
    if (attack === 'mitm') {
      addLog('[ALERT] MITM Proxy detected! Untrusted CA attempted certificate substitution. TLS Pinning halted connection.');
    } else if (attack === 'replay') {
      addLog('[ALERT] Duplicate packet sequence detected (seq: 1041). SRTP 64-bit sliding window dropped malicious replayed frame!');
    } else if (attack === 'ddos') {
      addLog('[ALERT] Inbound SYN Flood (85,000 pps) detected on edge port. Google Cloud Armor IPS activated BGP Anycast rate-limiting.');
    } else if (attack === 'knock') {
      addLog('[ACCESS] Unauthorized guest knock from unknown domain (attacker@phish.net). AAA Authorization Gate: Admission Denied.');
    }
  };

  const handleLeaveCall = () => {
    setInCall(false);
    addLog('[TEARDOWN] Call terminated. Cryptographic shredding executed. SRTP AES keys zeroized from memory. Session closed.');
  };

  const handleJoinCall = () => {
    setInCall(true);
    setActiveAttack('none');
    addLog('[HANDSHAKE] Joining meeting sec-u4cn-gmt. Ephemeral DTLS-SRTP keys generated. AES-GCM session activated.');
  };

  const currentStage = STAGES[currentStageIndex];

  // Quiz helper
  const handleSelectQuizOption = (qId: number, optId: string) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  // Match helper
  const handleConceptClick = (cId: string) => {
    setSelectedConcept(cId);
  };

  const handleTargetClick = (targetId: string) => {
    if (!selectedConcept) return;
    setMatchedPairs((prev) => ({ ...prev, [selectedConcept]: targetId }));
    setSelectedConcept(null);
  };

  const handleUnpair = (cId: string) => {
    setMatchedPairs((prev) => {
      const copy = { ...prev };
      delete copy[cId];
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* ============================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract)
          Zone 1: Wordmark
          Zone 2: 4-6 Clean text navigation links
          Zone 3: Unboxed metadata + 1 Primary action
         ============================================================ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3">
            {/* Google Meet authentic camera emblem */}
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
              <Video className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900">
              Google Meet Security Architecture
            </span>
          </div>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveSection('pipeline')}
              className={`hover:text-slate-900 transition-colors ${activeSection === 'pipeline' ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''}`}
            >
              Transit Simulator
            </button>
            <button
              onClick={() => setActiveSection('live-call')}
              className={`hover:text-slate-900 transition-colors ${activeSection === 'live-call' ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''}`}
            >
              Interactive Call Lab
            </button>
            <button
              onClick={() => setActiveSection('architecture')}
              className={`hover:text-slate-900 transition-colors ${activeSection === 'architecture' ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''}`}
            >
              Architecture Matrix
            </button>
            <button
              onClick={() => setActiveSection('visualizers')}
              className={`hover:text-slate-900 transition-colors ${activeSection === 'visualizers' ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''}`}
            >
              Packet & Math Lab
            </button>
            <button
              onClick={() => setActiveSection('diagnostic-lab')}
              className={`hover:text-slate-900 transition-colors ${activeSection === 'diagnostic-lab' ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''}`}
            >
              Diagnostic Lab
            </button>
            <button
              onClick={() => setActiveSection('quiz')}
              className={`hover:text-slate-900 transition-colors ${activeSection === 'quiz' ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''}`}
            >
              Knowledge Check
            </button>
            <button
              onClick={() => setActiveSection('guardrails')}
              className={`hover:text-slate-900 transition-colors ${activeSection === 'guardrails' ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''}`}
            >
              Guardrails
            </button>
          </nav>

          {/* Zone 3: Unboxed metadata + Primary action */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Computer Networks</span>
              <span aria-hidden="true">·</span>
              <span>Unit 4 Case Study</span>
            </div>
            <button
              onClick={() => {
                setActiveSection('live-call');
                if (!inCall) handleJoinCall();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Launch Live Meet</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
          MAIN CONTENT CONTAINER
         ============================================================ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-12">

        {/* HERO SECTION: Syllabus Context & Real-World Setting */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Unit 4 · Network Security Cornerstone Case Study
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 text-balance">
              How a Google Meet Call Works: Real-Time Multi-User Cryptographic Architecture
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When you click <strong className="text-slate-900 font-semibold">"Join now"</strong> on Google Meet, an intricate defense-in-depth security engine orchestrates authentication, key derivation, encrypted UDP stream delivery, IPsec network isolation, and runtime intrusion prevention. Explore every layer connecting textbook security theory to production video infrastructure.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                AAA Identity & Kerberos Tokens
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                TLS 1.3 & DTLS-SRTP
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-600" />
                IPsec Tunnel & VPN Diversification
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                Anti-Replay & Edge IPS
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 1: THE INTERACTIVE TRANSIT SIMULATOR (Centerpiece)
           ============================================================ */}
        <section id="pipeline" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                01. The End-to-End Transit Pipeline
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Step-by-step physical and logical progression of a call across 8 security checkpoints
              </p>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm">
              <button
                onClick={() => setCurrentStageIndex((prev) => (prev > 0 ? prev - 1 : STAGES.length - 1))}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-700 transition-colors"
                title="Previous Stage"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors ${isPlaying ? 'bg-amber-100 text-amber-900' : 'bg-emerald-600 text-white'}`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Auto-Play' : 'Auto Play Pipeline'}</span>
              </button>
              <button
                onClick={() => setCurrentStageIndex((prev) => (prev + 1) % STAGES.length)}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-700 transition-colors"
                title="Next Stage"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-slate-200 mx-1" />
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStageIndex(0);
                }}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
                title="Reset to Stage 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Interactive Progress Track */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 overflow-x-auto">
            <div className="min-w-[720px] flex items-center justify-between relative">
              {/* Connector line */}
              <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
              <div
                className="absolute top-5 left-6 h-0.5 bg-emerald-600 transition-all duration-300 -z-0"
                style={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
              />

              {STAGES.map((stg, idx) => {
                const isActive = idx === currentStageIndex;
                const isPassed = idx < currentStageIndex;
                return (
                  <button
                    key={stg.id}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStageIndex(idx);
                    }}
                    className="flex flex-col items-center group relative z-10 focus:outline-none"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-sm ${
                        isActive
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 scale-110'
                          : isPassed
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-white border border-slate-300 text-slate-500 hover:border-slate-400'
                      }`}
                    >
                      0{stg.id}
                    </div>
                    <span
                      className={`mt-2 text-[11px] font-medium max-w-[80px] text-center leading-tight truncate ${
                        isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500 group-hover:text-slate-800'
                      }`}
                    >
                      {stg.title.split('. ')[1]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two-Column Inspection Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            {/* Left Column: Schematic, PDU Payload & Technical Topology */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                  Logical Schematic & Network PDU
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {currentStage.schematicTag}
                </h3>
              </div>

              {/* Graphical Network Block */}
              <div className="p-4 bg-slate-900 rounded-lg text-slate-100 font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2 text-[11px] text-slate-400">
                  <span>FRAME DUMP // STAGE {currentStage.id}</span>
                  <span className="text-emerald-400">STATUS: NOMINAL</span>
                </div>

                <div className="space-y-1 text-slate-300">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Protocol Data Unit (PDU):</div>
                  <div className="bg-slate-800 p-2.5 rounded border border-slate-700 text-emerald-300 break-words font-mono text-[11px]">
                    {currentStage.pduLabel}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-500 block text-[10px]">OSI / TCP LAYER:</span>
                    <span className="font-semibold text-slate-200">{currentStage.technicalDetails.layer}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">PROTOCOL:</span>
                    <span className="font-semibold text-slate-200">{currentStage.technicalDetails.protocol}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block text-[10px]">CRYPTOGRAPHIC PRIMITIVE:</span>
                    <span className="font-semibold text-amber-300">{currentStage.technicalDetails.cryptoPrimitive}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block text-[10px]">KEY HANDSHAKE STEP:</span>
                    <span className="text-slate-300">{currentStage.technicalDetails.handshakeStep}</span>
                  </div>
                </div>
              </div>

              {/* Threat Block */}
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-rose-800 font-semibold">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Vulnerability Prevented:</span>
                </div>
                <p className="text-rose-700 leading-relaxed">
                  {currentStage.attackPrevented}
                </p>
              </div>
            </div>

            {/* Right Column: Physical Reality, Engineering Mechanism, Syllabus Anchor */}
            <div className="lg:col-span-7 space-y-5 lg:pl-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Checkpoint 0{currentStage.id} of 08</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">{currentStage.securityConcept}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {currentStage.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {currentStage.subtitle}
                </p>
              </div>

              {/* 1. The Physical Reality */}
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-emerald-600" />
                  The Physical Reality (What Happens in the Room)
                </div>
                <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
                  {currentStage.physicalReality}
                </p>
              </div>

              {/* 2. Engineering Mechanism */}
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                  How the System Executes This
                </div>
                <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200 leading-relaxed">
                  {currentStage.engineeringMechanism}
                </p>
              </div>

              {/* 3. Core Syllabus Concept Anchor */}
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Why It Matters (Unit 4 Security Principle)
                </div>
                <p className="text-sm text-slate-700 bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-200 leading-relaxed">
                  {currentStage.whyItMatters}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION: LIVE INTERACTIVE GOOGLE MEET STAGE
            "Take Call, Cut Call, Mic, Camera, Network Switching & Attack Simulation"
           ============================================================ */}
        <section id="live-call" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                02. Live Interactive Google Meet Studio
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulate authentic call events: take the call, cut the call, mute, change networks, and inject attacks
              </p>
            </div>

            {/* Quick Network Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Participant Ingress Path:</span>
              <div className="inline-flex bg-white border border-slate-200 rounded-lg p-1">
                <button
                  onClick={() => {
                    setActiveNetwork('home');
                    addLog('[NETWORK] Switched to Home Wi-Fi: Direct DTLS-SRTP to Google Edge Anycast.');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${activeNetwork === 'home' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Home Wi-Fi (Direct)
                </button>
                <button
                  onClick={() => {
                    setActiveNetwork('corp');
                    addLog('[NETWORK] Switched to HQ Office: Encapsulated inside IPsec ESP Tunnel.');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${activeNetwork === 'corp' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Office (IPsec Tunnel)
                </button>
                <button
                  onClick={() => {
                    setActiveNetwork('coffee');
                    addLog('[NETWORK] Switched to Public Wi-Fi: SSL VPN Virtual Adapter routing.');
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${activeNetwork === 'coffee' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Coffee Shop (SSL VPN)
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Google Meet Window Simulation */}
          <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
            {/* Google Meet Window Header Bar */}
            <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 font-mono font-medium text-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>sec-u4cn-gmt</span>
                </div>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400 hidden sm:inline">
                  {inCall ? '5 participants active' : 'Call ended · Session closed'}
                </span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="text-slate-400">
                  Network: {activeNetwork === 'corp' ? 'Corporate IPsec (ESP)' : activeNetwork === 'home' ? 'Broadband (DTLS-SRTP)' : 'Public Wi-Fi (SSL VPN)'}
                </span>
              </div>

              {/* Cryptographic Badges */}
              <div className="flex items-center gap-3">
                {activeAttack !== 'none' && (
                  <span className="flex items-center gap-1 text-rose-400 font-semibold animate-bounce text-[11px]">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    ATTACK BLOCKED: {activeAttack.toUpperCase()}
                  </span>
                )}
                <button
                  onClick={() => setSecurityShieldOpen(!securityShieldOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Security Shield</span>
                </button>
              </div>
            </div>

            {/* Main Stage Grid Area */}
            {inCall ? (
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[440px] bg-slate-950">
                {/* Participant 1: Alex (Eng Lead) */}
                <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center p-6 aspect-video">
                  <div className="w-16 h-16 rounded-full bg-emerald-800/80 text-white font-bold text-xl flex items-center justify-center ring-4 ring-emerald-500/30">
                    AK
                  </div>
                  <div className="absolute top-3 left-3 text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-medium text-slate-200">Alex (Eng Lead)</span>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-slate-950/70 px-2 py-0.5 rounded">
                    SRTP 1080p60
                  </div>
                  <div className="absolute bottom-3 left-3 text-[11px] text-slate-400 italic">
                    "Verifying the 64-bit sequence window..."
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Mic className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                {/* Participant 2: Priya (Security Architect) */}
                <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center p-6 aspect-video">
                  <div className="w-16 h-16 rounded-full bg-indigo-800/80 text-white font-bold text-xl flex items-center justify-center ring-4 ring-indigo-500/30">
                    PS
                  </div>
                  <div className="absolute top-3 left-3 text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="font-medium text-slate-200">Priya (Security Lead)</span>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-indigo-400 bg-slate-950/70 px-2 py-0.5 rounded">
                    TLS 1.3 Pinning
                  </div>
                  <div className="absolute bottom-3 left-3 text-[11px] text-slate-400 italic">
                    "Diffie-Hellman keys rotated cleanly."
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <Mic className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                {/* Participant 3: Marcus (Infra Ops) */}
                <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center p-6 aspect-video">
                  <div className="w-16 h-16 rounded-full bg-amber-800/80 text-white font-bold text-xl flex items-center justify-center ring-4 ring-amber-500/30">
                    ML
                  </div>
                  <div className="absolute top-3 left-3 text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="font-medium text-slate-200">Marcus (Cloud Infra)</span>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-amber-400 bg-slate-950/70 px-2 py-0.5 rounded">
                    Cloud Armor Active
                  </div>
                  <div className="absolute bottom-3 left-3 text-[11px] text-slate-400 italic">
                    "Edge Anycast filtering SYN floods."
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <MicOff className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* Participant 4: Sophia (Product Lead) */}
                <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center p-6 aspect-video">
                  <div className="w-16 h-16 rounded-full bg-cyan-800/80 text-white font-bold text-xl flex items-center justify-center ring-4 ring-cyan-500/30">
                    SC
                  </div>
                  <div className="absolute top-3 left-3 text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="font-medium text-slate-200">Sophia (Product)</span>
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-400 bg-slate-950/70 px-2 py-0.5 rounded">
                    Room ACL Verified
                  </div>
                  <div className="absolute bottom-3 left-3 text-[11px] text-slate-400 italic">
                    "Reviewing Q3 zero-trust milestones."
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <MicOff className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* Participant 5: You (Self Preview) */}
                <div className="relative bg-slate-900 rounded-xl overflow-hidden border-2 border-emerald-500/60 flex flex-col items-center justify-center p-6 aspect-video">
                  {isVideoOn ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800/60">
                      <div className="w-16 h-16 rounded-full bg-slate-700 text-white font-bold text-xl flex items-center justify-center ring-4 ring-emerald-400/40 animate-pulse">
                        YOU
                      </div>
                      <span className="text-xs text-emerald-400 font-mono mt-2">
                        {isMicOn ? 'AUDIO ACTIVE (OPUS 48kHz)' : 'AUDIO MUTED (SILENCE FRAMES)'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <VideoOff className="w-10 h-10 mb-2" />
                      <span className="text-xs">Camera Feed Terminated</span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 text-xs text-slate-200 font-semibold flex items-center gap-1.5">
                    <span>You (Self Preview)</span>
                    {isHandRaised && (
                      <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] rounded border border-amber-500/40">
                        Hand Raised
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 bg-slate-950/70 px-2 py-0.5 rounded">
                    {activeNetwork === 'corp' ? 'IPsec ESP' : 'DTLS-SRTP'}
                  </div>

                  <div className="absolute bottom-3 right-3">
                    {isMicOn ? (
                      <Mic className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <MicOff className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                </div>

                {/* Security Inspector / Attack Monitor Overlay Box */}
                <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 flex flex-col justify-between aspect-video font-mono text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-1.5">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Terminal className="w-3.5 h-3.5" />
                        RUNTIME DEFENSE TELEMETRY
                      </span>
                      <span>PORT 3478 UDP</span>
                    </div>
                    <div className="space-y-1 text-[11px] text-slate-300 pt-1">
                      <div><span className="text-slate-500">Session Key Age:</span> 04m 12s (Auto-rotate at 60m)</div>
                      <div><span className="text-slate-500">Anti-Replay Window:</span> Valid (Seq 1042-1106)</div>
                      <div><span className="text-slate-500">E2EE Tunnel:</span> Active (ECDHE Curve25519)</div>
                      <div>
                        <span className="text-slate-500">Threat Sensor:</span>{' '}
                        {activeAttack === 'none' ? (
                          <span className="text-emerald-400">All Nodes Secure</span>
                        ) : (
                          <span className="text-rose-400 font-bold animate-pulse">DEFENDING AGAINST {activeAttack.toUpperCase()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[10px] text-slate-400 truncate">
                    {meetLogStream[0] || 'Awaiting network event...'}
                  </div>
                </div>
              </div>
            ) : (
              /* Disconnected / Call Ended State */
              <div className="min-h-[440px] flex flex-col items-center justify-center p-8 bg-slate-900 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center">
                  <PhoneOff className="w-8 h-8 text-rose-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">You have left the meeting</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Session keys have been wiped from memory. Perfect Forward Secrecy ensures past conversation packets cannot be decrypted.
                  </p>
                </div>
                <button
                  onClick={handleJoinCall}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Re-join Meeting (sec-u4cn-gmt)</span>
                </button>
              </div>
            )}

            {/* Google Meet Bottom Control Dock */}
            <div className="bg-slate-900 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              {/* Meeting info left */}
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 font-medium">
                <span>19:24 PM</span>
                <span aria-hidden="true" className="text-slate-600">|</span>
                <span className="font-mono text-slate-400">sec-u4cn-gmt</span>
              </div>

              {/* Center Functional Round Buttons */}
              <div className="flex items-center gap-3 mx-auto">
                {/* Mute/Unmute */}
                <button
                  onClick={() => {
                    const next = !isMicOn;
                    setIsMicOn(next);
                    addLog(next ? '[MIC] Unmuted. SRTP voice packets active.' : '[MIC] Muted. Sent silence indicator to SFU.');
                  }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    isMicOn
                      ? 'bg-slate-800 text-white hover:bg-slate-700'
                      : 'bg-rose-600 text-white hover:bg-rose-700 ring-2 ring-rose-400'
                  }`}
                  title={isMicOn ? 'Turn off microphone' : 'Turn on microphone'}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                {/* Video On/Off */}
                <button
                  onClick={() => {
                    const next = !isVideoOn;
                    setIsVideoOn(next);
                    addLog(next ? '[VIDEO] Camera enabled. 1080p VP9 SRTP stream initiated.' : '[VIDEO] Camera disabled. Video payload zeroized.');
                  }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    isVideoOn
                      ? 'bg-slate-800 text-white hover:bg-slate-700'
                      : 'bg-rose-600 text-white hover:bg-rose-700 ring-2 ring-rose-400'
                  }`}
                  title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>

                {/* Hand Raise */}
                <button
                  onClick={() => {
                    setIsHandRaised(!isHandRaised);
                    addLog(isHandRaised ? '[CONTROL] Hand lowered.' : '[CONTROL] Hand raised via WebSocket signaling.');
                  }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    isHandRaised ? 'bg-amber-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                  title="Raise or lower hand"
                >
                  <Hand className="w-5 h-5" />
                </button>

                {/* Screen Share */}
                <button
                  onClick={() => {
                    setIsScreenSharing(!isScreenSharing);
                    addLog(isScreenSharing ? '[SCREEN] Screen sharing stopped.' : '[SCREEN] Second SRTP video track allocated for presentation stream.');
                  }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                    isScreenSharing ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                  title="Present now"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                {/* Cut the call / Take the call button */}
                {inCall ? (
                  <button
                    onClick={handleLeaveCall}
                    className="h-11 px-5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg hover:shadow-rose-600/30"
                    title="Leave call"
                  >
                    <PhoneOff className="w-5 h-5" />
                    <span className="hidden sm:inline">Leave call</span>
                  </button>
                ) : (
                  <button
                    onClick={handleJoinCall}
                    className="h-11 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-lg"
                    title="Join call"
                  >
                    <PhoneCall className="w-5 h-5" />
                    <span>Join call</span>
                  </button>
                )}
              </div>

              {/* Right utility items */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addLog('[INFO] Room: sec-u4cn-gmt, SFU Host: sfu-iad-04.google.com')}
                  className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center"
                  title="Meeting details"
                >
                  <Info className="w-4 h-4" />
                </button>
                <button
                  onClick={() => addLog('[USERS] 5 attendees authorized by Domain Policy.')}
                  className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center"
                  title="People"
                >
                  <Users className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Attack Simulation Bar */}
            <div className="bg-slate-950 px-6 py-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate Threat Scenarios:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => triggerAttack('none')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeAttack === 'none' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Nominal Traffic
                </button>
                <button
                  onClick={() => triggerAttack('mitm')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeAttack === 'mitm' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Fake SSL Cert (MITM)
                </button>
                <button
                  onClick={() => triggerAttack('replay')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeAttack === 'replay' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Inject Replay Packet
                </button>
                <button
                  onClick={() => triggerAttack('ddos')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeAttack === 'ddos' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  DDoS SYN Flood
                </button>
                <button
                  onClick={() => triggerAttack('knock')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeAttack === 'knock' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Unauthorized Knock
                </button>
              </div>
            </div>

            {/* Security Shield Drawer (when opened) */}
            {securityShieldOpen && (
              <div className="bg-slate-900 border-t border-slate-700 p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 animate-in fade-in duration-200">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    Transport Encryption Status
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Signaling: TLS 1.3 (ECDHE-RSA-AES256-GCM-SHA384)<br />
                    Media: DTLS 1.2 with SRTP AEAD-AES-128-GCM<br />
                    Network Path: {activeNetwork === 'corp' ? 'IPsec ESP Tunnel Mode (RFC 4303)' : 'Native UDP with Anycast'}
                  </p>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    AAA Identity Assurance
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Kerberos-style Gaia Session Ticket: Valid<br />
                    Room Access Control: Enforced (Internal Domain Policy)<br />
                    Guest Knock Policy: Host Admission Mandatory
                  </p>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Continuous Intrusion Prevention
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Anti-Replay Window: Active (64-packet bitmap)<br />
                    Cloud Armor DDoS: Ready (BGP Scrubbing PoP)<br />
                    Cryptographic Shredding: Armed on call disconnect
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ============================================================
            SECTION 2: DEEP-DIVE CONCEPTUAL MODULES & COMPARISON
           ============================================================ */}
        <section id="architecture" className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              03. Architectural Boundary & Protocol Comparison
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side engineering matrix contrasting the security mechanisms operating simultaneously inside a call
            </p>
          </div>

          {/* Component Comparison Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                    <th className="py-3 px-4">Protocol / Technology</th>
                    <th className="py-3 px-4">OSI / TCP Layer</th>
                    <th className="py-3 px-4">Cipher & Mode</th>
                    <th className="py-3 px-4">Addressing Scope</th>
                    <th className="py-3 px-4">Integrity Mechanism</th>
                    <th className="py-3 px-4">Role in Google Meet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  {COMPARISON_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {row.protocol}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                        {row.layer}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-emerald-700">
                        {row.cipher}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {row.addressing}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {row.integrity}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800 font-medium">
                        {row.meetRole}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Architectural Boundary Breakdown: Edge vs Core vs Enterprise */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Wifi className="w-4 h-4 text-emerald-600" />
                Domain 1: Client Edge & Access
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Untrusted consumer broadband, coffee shop Wi-Fi, or LTE/5G. Employs <strong className="text-slate-900">DTLS-SRTP</strong> and <strong className="text-slate-900">TLS 1.3</strong> so intermediate routers, rogue access points, or wiretapping ISPs have zero visibility into user payload.
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                Zero Trust Assumption: Local LAN is compromised by default.
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-emerald-600" />
                Domain 2: Enterprise Intranet (VPN)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Branch offices connect to corporate HQ via <strong className="text-slate-900">IPsec Tunnel Mode (ESP)</strong>. The entire original packet is encapsulated inside an outer IP header, shielding internal corporate network topologies and DNS queries from public snooping.
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                Security Duty: Site-to-site perimeter isolation and ACL enforcement.
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Domain 3: Google Global Backbone
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traffic enters Google’s private fiber backbone at the nearest Edge Point of Presence (PoP) via Anycast BGP. Protected by <strong className="text-slate-900">Cloud Armor (IPS/DDoS)</strong>, stateful firewalls, and internal ALTS (Application Layer Transport Security).
              </p>
              <div className="text-[11px] text-slate-500 font-mono pt-1">
                Security Duty: Mass-scale distributed attack absorption and low-jitter SFU forwarding.
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: PACKET & MATHEMATICAL VISUALIZERS
            - Anti-Replay Sliding Window Buffer Visualizer
            - Packet Encapsulation & Header Layering Inspector
           ============================================================ */}
        <section id="visualizers" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                04. Mathematical & Protocol Visualizers
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Interactive real-time demonstration of the SRTP Anti-Replay sliding window and packet encapsulation layering
              </p>
            </div>

            {/* Segmented control */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
              <button
                onClick={() => setVisualizerMode('window')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${visualizerMode === 'window' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Anti-Replay Window
              </button>
              <button
                onClick={() => setVisualizerMode('encapsulation')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${visualizerMode === 'encapsulation' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Packet Encapsulation
              </button>
            </div>
          </div>

          {visualizerMode === 'window' ? (
            /* VISUALIZER A: Anti-Replay Sliding Window Buffer */
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Interactive SRTP 64-Bit Anti-Replay Sliding Window Simulator
                </h3>
                <p className="text-xs text-slate-600">
                  In real-time UDP streams, packets can arrive out of order, but adversaries can also replay previously captured packets. The receiver maintains a sliding bitmap window (RFC 3711) to validate sequence numbers without re-requesting packets.
                </p>
              </div>

              {/* Graphical Sliding Window Track */}
              <div className="p-6 bg-slate-900 rounded-xl text-white space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>RECEIVER PACKET BUFFER (Current Highest Sequence: 1043)</span>
                  <span className="font-mono text-emerald-400">WINDOW SIZE: 64 PACKETS</span>
                </div>

                {/* Packet Cells */}
                <div className="flex items-center gap-2 overflow-x-auto py-2">
                  {windowPackets.map((pkt) => {
                    const isAccepted = pkt.status === 'accepted';
                    return (
                      <div
                        key={pkt.seq}
                        className={`flex-shrink-0 w-24 p-3 rounded-lg border text-center transition-all ${
                          pkt.seq === 1043
                            ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-400 text-emerald-200'
                            : isAccepted
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-slate-800/40 border-dashed border-slate-700 text-slate-500'
                        }`}
                      >
                        <div className="text-[10px] text-slate-400 uppercase">Seq #{pkt.seq}</div>
                        <div className="font-mono font-bold text-xs mt-1">
                          {pkt.seq === 1043 ? 'LATEST' : isAccepted ? 'VERIFIED' : 'PENDING'}
                        </div>
                        <div className="text-[9px] mt-1 text-slate-400 font-mono">
                          {isAccepted ? 'MAC Checked' : 'Awaiting'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Window Boundary Visualizer */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <div className="text-slate-400">SLIDING WINDOW RULE:</div>
                    <div className="text-slate-200">
                      • If <code className="text-emerald-400">Seq &gt; Highest</code>: Accept packet, advance window right.<br />
                      • If <code className="text-amber-400">Highest - 64 &le; Seq &le; Highest</code>: Check bitmap; drop if duplicate.<br />
                      • If <code className="text-rose-400">Seq &lt; Highest - 64</code>: Drop immediately as stale replay attack.
                    </div>
                  </div>

                  {/* Interactive Test Action */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setReplayAttemptState('blocked');
                        setTimeout(() => setReplayAttemptState('none'), 4000);
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded font-sans text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Re-inject Seq #1041 (Replay Attack)</span>
                    </button>
                    <button
                      onClick={() => {
                        const newSeq = windowPackets[windowPackets.length - 1].seq + 1;
                        setWindowPackets((prev) => [
                          ...prev.slice(1),
                          { seq: newSeq, status: 'expected', age: 'window' }
                        ]);
                      }}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-sans text-xs font-medium transition-colors"
                    >
                      Advance Frame Stream (+1)
                    </button>
                  </div>
                </div>

                {/* Replay feedback status banner */}
                {replayAttemptState === 'blocked' && (
                  <div className="p-3 bg-rose-950/80 border border-rose-500 rounded text-rose-200 text-xs flex items-center gap-2 animate-in fade-in duration-150">
                    <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>
                      <strong>PACKET DISCARDED:</strong> Sequence #1041 is already marked as received in the 64-bit sliding bitmap! Replayed audio packet was dropped before reaching audio buffer.
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* VISUALIZER B: Packet Encapsulation & Header Layering Inspector */
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Interactive Layering & Encapsulation Inspector (IPsec Tunnel over Transit)
                </h3>
                <p className="text-xs text-slate-600">
                  Click through the nested header wrappers to inspect how a raw Opus voice payload is encapsulated by SRTP, UDP, and IPsec ESP.
                </p>
              </div>

              {/* Nested Visual Stack */}
              <div className="space-y-2">
                {[
                  {
                    level: 0,
                    title: '1. Ethernet Frame Header (Data Link Layer 2)',
                    size: '14 bytes',
                    fields: 'Dest MAC (Router Gateway), Source MAC (Laptop NIC), EtherType: 0x0800 (IPv4)',
                    desc: 'Physical hop-by-hop delivery across the local Wi-Fi or switch port. Re-written at each intermediate router.'
                  },
                  {
                    level: 1,
                    title: '2. Outer IP Header (IPsec Tunnel Gateway)',
                    size: '20 bytes',
                    fields: 'Source IP: 198.51.100.22 (Public Gateway), Dest IP: 203.0.113.1 (Corporate VPN Hub), Protocol: 50 (ESP)',
                    desc: 'Visible to public internet ISPs. Masks internal private IP addresses and actual cloud destination.'
                  },
                  {
                    level: 2,
                    title: '3. IPsec ESP Header & Initialization Vector (Encapsulating Security Payload)',
                    size: '8 + 16 bytes',
                    fields: 'Security Parameter Index (SPI: 0xc3a49182), Sequence Number (0x00000412), AES-GCM IV',
                    desc: 'Identifies the security association and establishes counter state for decryption.'
                  },
                  {
                    level: 3,
                    title: '4. Inner IP Header (Original Private Endpoints)',
                    size: '20 bytes [ENCRYPTED BY ESP]',
                    fields: 'Source IP: 10.240.12.5 (User Laptop), Dest IP: 142.250.80.42 (Google Meet SFU), Protocol: 17 (UDP)',
                    desc: 'Protected from ISP observation. Contains the real internal route across the enterprise overlay.'
                  },
                  {
                    level: 4,
                    title: '5. UDP Header (Real-Time Datagram)',
                    size: '8 bytes [ENCRYPTED BY ESP]',
                    fields: 'Source Port: 51230, Destination Port: 3478 (WebRTC / STUN / Media)',
                    desc: 'Provides low-latency multiplexing without connection establishment delays.'
                  },
                  {
                    level: 5,
                    title: '6. SRTP Header & Encrypted Media Payload',
                    size: '12 bytes + Payload [DOUBLY ENCRYPTED]',
                    fields: 'RTP Version: 2, Sequence: 1042, Timestamp: 3891024, SSRC: 0x9a8f, AES-CTR Ciphertext',
                    desc: 'Encrypted Opus speech frame. Even if IPsec is terminated, only Google Meet SFU can decrypt the audio payload.'
                  },
                  {
                    level: 6,
                    title: '7. ESP Authentication Trailer & ICV',
                    size: '16 bytes',
                    fields: 'Padding, Pad Length, Next Header (17), HMAC-SHA256 Integrity Check Value',
                    desc: 'Ensures zero bit modification across the entire encrypted inner package during transit.'
                  }
                ].map((layer) => {
                  const isSelected = selectedEncapsulationLayer === layer.level;
                  return (
                    <div
                      key={layer.level}
                      onClick={() => setSelectedEncapsulationLayer(layer.level)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                      }`}
                      style={{ marginLeft: `${layer.level * 12}px` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{layer.title}</span>
                        <span className="text-[11px] font-mono text-slate-500">{layer.size}</span>
                      </div>
                      {isSelected && (
                        <div className="mt-2 text-xs space-y-1 text-slate-700 animate-in fade-in duration-150">
                          <div><strong className="text-slate-900">Fields:</strong> {layer.fields}</div>
                          <div className="text-slate-600">{layer.desc}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* ============================================================
            SECTION 4: PRACTICAL DIAGNOSTIC LAB
            ("System Fails Under Normal Symptoms")
           ============================================================ */}
        <section id="diagnostic-lab" className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              05. Practical Diagnostic Lab
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Troubleshoot real-world production failures using simulated shell diagnostics, logs, and root-cause engineering deductions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-xl p-6">
            {/* Left selector */}
            <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-slate-200 pb-4 lg:pb-0 lg:pr-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                Failure Scenarios
              </span>
              {DIAGNOSTIC_CASES.map((diag, idx) => {
                const isSelected = selectedDiagnosticCase === idx;
                const isSolved = diagnosticSolved[diag.id];
                return (
                  <button
                    key={diag.id}
                    onClick={() => setSelectedDiagnosticCase(idx)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Case 0{idx + 1}</span>
                      {isSolved && (
                        <span className="text-emerald-700 flex items-center gap-1 text-[11px] font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Solved
                        </span>
                      )}
                    </div>
                    <div className="line-clamp-2">{diag.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Right diagnosis terminal & actions */}
            <div className="lg:col-span-8 space-y-4 lg:pl-2">
              {(() => {
                const currentCase = DIAGNOSTIC_CASES[selectedDiagnosticCase];
                const isSolved = diagnosticSolved[currentCase.id];
                return (
                  <>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900">
                        {currentCase.title}
                      </h3>
                      <p className="text-xs text-slate-600">
                        <strong className="text-slate-800">Symptom:</strong> {currentCase.symptom}
                      </p>
                    </div>

                    {/* Simulated Terminal */}
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-200 space-y-2 border border-slate-800 shadow-inner">
                      <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                          <span className="ml-1 text-slate-300">bash — diagnostic terminal</span>
                        </div>
                        <span className="text-slate-500">pty/3</span>
                      </div>
                      <div className="text-emerald-400">$ {currentCase.command}</div>
                      <pre className="text-slate-300 text-[11px] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                        {currentCase.terminalOutput}
                      </pre>
                    </div>

                    {/* Root cause and action */}
                    <div className="space-y-3 pt-2">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                        <span className="font-bold text-slate-900 block">Root-Cause Engineering Deduction:</span>
                        <p className="text-slate-700 leading-relaxed">{currentCase.rootCause}</p>
                      </div>

                      <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 text-xs space-y-2">
                        <span className="font-bold text-emerald-900 block">Actionable Engineering Remediation:</span>
                        <p className="text-emerald-800 leading-relaxed">{currentCase.remediation}</p>

                        {!isSolved ? (
                          <button
                            onClick={() => {
                              setDiagnosticSolved((prev) => ({ ...prev, [currentCase.id]: true }));
                              addLog(`[REMEDIATION] Applied fix for ${currentCase.id}. Nominal service confirmed.`);
                            }}
                            className="mt-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Apply Engineering Remediation</span>
                          </button>
                        ) : (
                          <div className="text-emerald-700 font-semibold flex items-center gap-1.5 pt-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Remediation Applied & Verified in Production</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: INTERACTIVE UNDERSTANDING CHECKS
            - Scenario-Based MCQs
            - Match the Following (Architecture <-> Real-World Reality)
           ============================================================ */}
        <section id="quiz" className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              06. Interactive Understanding Checks
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verify conceptual grasp of failure isolation, cryptographic trade-offs, and protocol boundaries
            </p>
          </div>

          {/* Part A: 4 Scenario-Based MCQs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Part A: Architectural Scenario Checks
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {QUIZ_QUESTIONS.map((q) => {
                const selectedOptId = quizAnswers[q.id];
                const selectedOpt = q.options.find((o) => o.id === selectedOptId);
                return (
                  <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Question 0{q.id}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isChosen = selectedOptId === opt.id;
                        let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                        if (isChosen) {
                          btnStyle = opt.correct
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-medium'
                            : 'bg-rose-50 border-rose-600 text-rose-950 font-medium';
                        }
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectQuizOption(q.id, opt.id)}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2 ${btnStyle}`}
                          >
                            <span className="font-mono font-bold uppercase text-[11px] mt-0.5">{opt.id}.</span>
                            <span className="flex-1">{opt.text}</span>
                            {isChosen && (
                              opt.correct ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                              )
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {selectedOpt && (
                      <div className={`p-3 rounded-lg text-xs leading-relaxed ${selectedOpt.correct ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                        <strong>{selectedOpt.correct ? 'Correct:' : 'Incorrect:'}</strong> {selectedOpt.reason}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Part B: Match the Following */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                  Part B: Interactive Pair Matching (Unit 4 Theory ↔ Google Meet Reality)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click a theoretical concept on the left, then click its corresponding implementation mechanism on the right to link them.
                </p>
              </div>

              <button
                onClick={() => {
                  setMatchedPairs({});
                  setSelectedConcept(null);
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors self-start sm:self-auto"
              >
                Reset Matches
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Concepts */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Foundational Unit 4 Concept
                </span>
                {MATCH_CONCEPTS.map((c) => {
                  const isSelected = selectedConcept === c.id;
                  const isPaired = Boolean(matchedPairs[c.id]);
                  return (
                    <div
                      key={c.id}
                      onClick={() => handleConceptClick(c.id)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-200'
                          : isPaired
                          ? 'bg-slate-100 border-slate-300 text-slate-800'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-semibold">{c.concept}</span>
                      {isPaired && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnpair(c.id);
                          }}
                          className="text-[10px] text-slate-400 hover:text-rose-600 ml-2"
                        >
                          Unpair
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Targets */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Concrete Case Study Mechanism
                </span>
                {MATCH_TARGETS.map((t) => {
                  // Check if this target is matched by any concept
                  const pairedConceptKey = Object.keys(matchedPairs).find((k) => matchedPairs[k] === t.id);
                  const pairedConcept = MATCH_CONCEPTS.find((c) => c.id === pairedConceptKey);
                  const isCorrect = pairedConcept && pairedConcept.matchId === t.id;

                  return (
                    <div
                      key={t.id}
                      onClick={() => handleTargetClick(t.id)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                        pairedConcept
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <p className="leading-relaxed">{t.text}</p>
                      {pairedConcept && (
                        <div className="mt-1.5 pt-1 border-t border-slate-200/60 text-[11px] flex items-center justify-between">
                          <span className="font-medium">Linked to: {pairedConcept.concept}</span>
                          <span className={isCorrect ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                            {isCorrect ? '✓ Match Correct' : '✗ Misaligned'}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: HYPOTHETICAL CASE STUDY GUARDRAILS & DISCLAIMERS
           ============================================================ */}
        <section id="guardrails" className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              07. Hypothetical Case Study Guardrails & Real-World Reality
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explicit engineering boundary declarations clarifying pedagogical simplifications versus enterprise production architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                1. Encryption & Privacy Architecture
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                Hop-by-Hop SFU vs. Client-Side E2EE
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                By default, multi-party Google Meet calls decrypt video packets at Google’s Selective Forwarding Unit (SFU) in RAM to perform active noise reduction, spatial audio mixing, and bandwidth layer down-sampling before re-encrypting to other participants. True Zero-Trust Client-Side Encryption (CSE) is an opt-in enterprise feature requiring third-party key management (KMS).
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                2. Real-World Caching & Edge Architecture
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                Google Global Cache (GGC) & BGP Anycast
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Video calls do not route to a single monolithic data center in California. Google advertises BGP Anycast IP prefixes so client WebRTC traffic is ingested at the nearest Edge Point of Presence (PoP) in under 15 milliseconds, traversing Google’s private backbone rather than the public internet.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                3. Dynamic & Adaptive Rate Control
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                GCC, TWCC, & Forward Error Correction
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                In production, packet drops do not immediately freeze screens. Google Congestion Control (GCC) and Transport Wide Congestion Control (TWCC) continuously probe delay gradients, dynamically dropping video resolution from 1080p to 360p and interleaving Forward Error Correction (FEC) redundant packets to recover from burst losses.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                4. NAT Traversal & Subnet Traversal
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                RFC 5389 STUN & RFC 5766 TURN Relays
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Most home Wi-Fi routers operate behind symmetric NAT, where internal port mappings vary per destination. When direct peer-to-peer UDP candidate pairs fail during the Interactive Connectivity Establishment (ICE) phase, media traffic is automatically relayed through TURN servers over port 443 or TLS fallback.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-sm lg:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                5. Syllabus Scope Boundary
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                Unit 4 Network Security Isolation
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                This case study deliberately isolates <strong className="text-slate-900">Unit 4: Network Security</strong> concepts (Authentication, Authorization, Accounting, TLS 1.3, DTLS-SRTP, IPsec AH/ESP, SSL/MPLS VPNs, Firewalls, and IDS/IPS). Video encoding algorithms (VP9/AV1/Opus codecs), HTTP/3 protocol stacks, and distributed scheduling algorithms are treated as abstracted payloads and covered in Units 3 and 5.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ============================================================
          EDITORIAL FOOTER (No telemetry clutter or fake engines)
         ============================================================ */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Computer Networks · Unit 4</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Security Learning Architecture</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#pipeline" className="hover:text-slate-800 transition-colors">Pipeline</a>
            <a href="#live-call" className="hover:text-slate-800 transition-colors">Live Call</a>
            <a href="#architecture" className="hover:text-slate-800 transition-colors">Architecture</a>
            <a href="#diagnostic-lab" className="hover:text-slate-800 transition-colors">Diagnostics</a>
            <a href="#quiz" className="hover:text-slate-800 transition-colors">Quiz</a>
          </div>

          <div>
            Case study modeled on WebRTC, RFC 3711 (SRTP), RFC 4303 (IPsec), and Google Infrastructure Security.
          </div>
        </div>
      </footer>
    </div>
  );
}
