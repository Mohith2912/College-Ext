export type CaseStage = {
  id: 'brief' | 'path' | 'evidence' | 'decision' | 'debrief';
  label: string;
  shortLabel: string;
  description: string;
};

export type NetworkHop = {
  id: string;
  name: string;
  role: string;
  layer: string;
  address: string;
  observation: string;
  status: 'healthy' | 'warning' | 'unknown';
};

export type EvidenceItem = {
  id: string;
  source: string;
  reading: string;
  interpretation: string;
  relevance: 'high' | 'medium' | 'low';
};

export type DecisionOption = {
  id: string;
  title: string;
  action: string;
  consequence: string;
  isBest: boolean;
};

export type DebriefQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const caseStages: CaseStage[] = [
  { id: 'brief', label: 'Read the incident brief', shortLabel: 'Brief', description: 'Separate the reported symptom from verified facts.' },
  { id: 'path', label: 'Trace the packet path', shortLabel: 'Trace', description: 'Inspect each boundary from the lecture hall to the service edge.' },
  { id: 'evidence', label: 'Triage the evidence', shortLabel: 'Evidence', description: 'Prioritise observations that can prove or disprove a hypothesis.' },
  { id: 'decision', label: 'Choose a response', shortLabel: 'Respond', description: 'Select the least disruptive action supported by the evidence.' },
  { id: 'debrief', label: 'Defend the diagnosis', shortLabel: 'Debrief', description: 'Connect the incident to transport, network, and link-layer reasoning.' },
];

export const networkHops: NetworkHop[] = [
  { id: 'lectern', name: 'Lecture laptop', role: 'Application host', layer: 'Application / Transport', address: '10.24.8.42', observation: 'DNS resolves and the TCP handshake completes.', status: 'healthy' },
  { id: 'access-point', name: 'Hall access point', role: 'Wireless bridge', layer: 'Data link', address: 'BSSID · 9C:3D:CF:18:20:11', observation: 'Signal is strong, but retransmissions rise during the event.', status: 'warning' },
  { id: 'switch', name: 'Building switch', role: 'Frame forwarding', layer: 'Data link', address: 'VLAN 24 · Gi1/0/18', observation: 'No interface errors and the uplink is below capacity.', status: 'healthy' },
  { id: 'gateway', name: 'Campus gateway', role: 'Routing boundary', layer: 'Network', address: '10.24.8.1', observation: 'Routes are stable; queue delay spikes for one traffic class.', status: 'warning' },
  { id: 'edge', name: 'Media service edge', role: 'Streaming endpoint', layer: 'Application', address: '203.0.113.18', observation: 'The service answers normally from outside the campus.', status: 'healthy' },
];

export const evidenceItems: EvidenceItem[] = [
  { id: 'ping', source: 'Gateway probe', reading: '2 ms average, 0% loss over 60 packets', interpretation: 'Local IP reachability is healthy; this weakens a total gateway outage hypothesis.', relevance: 'high' },
  { id: 'dns', source: 'DNS lookup', reading: 'media.example.test → 203.0.113.18 in 18 ms', interpretation: 'Name resolution succeeds, so replacing DNS would not address the observed stall.', relevance: 'medium' },
  { id: 'wifi', source: 'Wireless telemetry', reading: 'RSSI −49 dBm · retry rate 4%', interpretation: 'The radio link is usable. Retries exist, but not at a level that explains a campus-wide pattern.', relevance: 'medium' },
  { id: 'queue', source: 'Gateway queue', reading: 'Video class: 780 ms peak delay · 3.8% drops', interpretation: 'A congested policy queue can trigger transport recovery and player rebuffering without breaking connectivity.', relevance: 'high' },
  { id: 'outside', source: 'External control test', reading: '1080p stream stable for 10 minutes', interpretation: 'The provider edge is responsive, narrowing the fault domain to the campus path or policy.', relevance: 'high' },
  { id: 'printer', source: 'Help-desk note', reading: 'Library printer was offline yesterday', interpretation: 'This is a different device, VLAN, and time window; it should not drive the diagnosis.', relevance: 'low' },
];

export const decisionOptions: DecisionOption[] = [
  { id: 'dns-change', title: 'Replace the DNS resolver', action: 'Point clients to a public resolver and flush caches.', consequence: 'The hostname already resolves quickly. This adds change risk without treating queue delay or loss.', isBest: false },
  { id: 'queue-policy', title: 'Correct the media queue policy', action: 'Restore the intended bandwidth share, then watch delay, drops, and player recovery.', consequence: 'This acts at the measured bottleneck, limits blast radius, and creates clear success signals.', isBest: true },
  { id: 'reboot', title: 'Reboot every access point', action: 'Disconnect all hall clients and restart the wireless layer.', consequence: 'Strong signal and modest retry rates do not justify a building-wide interruption.', isBest: false },
  { id: 'provider', title: 'Escalate to the provider', action: 'Open an external service ticket and wait for a response.', consequence: 'The external control stream is healthy, so this delays restoration and sends weak evidence.', isBest: false },
];

export const debriefQuestions: DebriefQuestion[] = [
  { id: 'fault-domain', prompt: 'Which observation most directly narrows the fault domain to the campus path?', options: ['The laptop received a private IP address', 'The stream is stable from an external control network', 'The lecture starts at 10:00', 'The access point has a BSSID'], answer: 1, explanation: 'A healthy external control removes the service edge as the leading suspect and focuses investigation on the differing campus path.' },
  { id: 'transport', prompt: 'Why can the player buffer even though the TCP handshake succeeds?', options: ['A handshake guarantees unlimited throughput', 'DNS must have failed after the handshake', 'Later loss and delay can reduce useful delivery rate', 'Ethernet frames cannot carry video'], answer: 2, explanation: 'Connection establishment proves an endpoint is reachable. Sustained delivery still depends on latency, loss, congestion control, and available capacity.' },
  { id: 'response', prompt: 'What makes the queue-policy correction the strongest first action?', options: ['It changes the most devices', 'It targets measured symptoms with a limited blast radius', 'It avoids collecting validation data', 'It bypasses the network layer'], answer: 1, explanation: 'Good incident response chooses a reversible action tied to evidence, then validates the predicted improvement.' },
];

export const learningGoals = [
  'Distinguish application symptoms from network evidence',
  'Trace responsibilities across the Internet architecture',
  'Use controls to narrow a fault domain',
  'Choose a proportional, testable remediation',
];
