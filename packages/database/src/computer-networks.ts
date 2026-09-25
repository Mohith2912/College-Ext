import type { SeedCourse } from './content';

const module = (title: string, description: string, markdown: string) => ({
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  title,
  description,
  markdown: `${markdown.trim()}\n\n---\n\n*Original Computer Networks material for Aetheria Study Companion. Examples are fictional teaching scenarios.*`,
});

export const computerNetworks: SeedCourse = {
  slug: 'computer-networks',
  title: 'Computer Networks',
  subject: 'Computer Networks',
  code: 'CN101',
  term: 1,
  description: 'Understand how data moves from an application to a destination through layers, links, switches, routers, and reliable protocols.',
  modules: [
    module('From browser request to delivered packet', 'Trace one request across end systems, access networks, and the Internet core.', `
## Learning objectives

By the end of this module you can trace an application request, name the protocol data unit at each stage, and explain why the return journey needs the same layered cooperation.

## One request, many decisions

When a learner opens a video or submits a form, the application creates a message for a named service. The browser does not know which cable will carry it. The operating system adds transport information, the network layer chooses a next hop, and the local link turns the packet into a signal. Each layer adds the information needed by the next system and removes information that no longer applies.

The destination address may be found through DNS. A transport connection such as TCP provides ordering and retransmission; QUIC combines transport behaviour with encrypted sessions over UDP. The choice depends on the application and the service, but the responsibility boundary stays clear: applications describe meaning, while lower layers move bytes.

## Access, core, and edge

The access network connects an end device to an organisation or internet provider. Wi-Fi uses radio and a local association; Ethernet uses a wired link and frames. A switch forwards frames inside one local network using MAC addresses. A router connects different IP networks and chooses a next hop using its routing table. The core is a collection of interconnected routers and high-capacity links, while an edge cache may place popular content close to users.

## Case study: the campus lecture stream

The fictional Northbridge College sees the first minute of a lecture stream pause for students in one residence. A packet capture shows DNS replies are quick, but retransmissions begin after traffic leaves the residence gateway. The support team compares the access point, the wired uplink, the gateway queue, and the provider path instead of blaming the video player immediately.

**Worked analysis:** A strong diagnosis follows the path in order: signal quality and frame loss at the access link, queue delay at the gateway, route changes in the provider network, and application buffer behaviour at the edge. The same symptom can have different causes, so each observation needs a layer and a measurement.

## Recall and application

1. Why can a switch forward a frame without choosing an internet route?
2. Which layer is responsible for process-to-process delivery?
3. Draw the path from a browser to an edge cache and label one measurement at each boundary.

## Key takeaways

- A network request is a chain of responsibilities, not one action.
- Switches operate within local links; routers join IP networks.
- Measure the first failing boundary before changing the application.
`),
    module('Layers, addressing, and encapsulation', 'Use the OSI and Internet models to reason about headers, addresses, and boundaries.', `
## Learning objectives

Distinguish the OSI reference model from the practical Internet stack, explain encapsulation, and select the right address for a troubleshooting question.

## Models are maps

The seven-layer OSI model is a teaching model that separates physical signals, link framing, network delivery, transport delivery, sessions, presentation, and applications. The Internet stack commonly groups the upper OSI layers into the application layer. Neither model is a literal list of seven separate boxes in every operating system. Their value is the vocabulary they provide for isolating responsibilities.

## Encapsulation in plain language

An application message becomes a transport segment or datagram. The network layer wraps it in an IP packet. The link layer wraps that packet in a frame for one hop. At the next router, the old frame is removed and a new frame is built for the next link; the IP packet normally survives the hop. At the destination, the process reverses the process. This is why a MAC address is local to a link while an IP address identifies an interface across routed networks.

Ports identify a service or process endpoint. A private address may be translated at a gateway, while a public address is used beyond that boundary. IPv6 provides a much larger address space and changes some local discovery mechanisms, but the same layered reasoning still applies.

## Case study: the address that looked correct

Fictional startup Riverline reports that a server is reachable from its own subnet but not from a partner network. The engineer checks the server's private address, the default gateway, the route table, and the firewall policy. The service is listening on port 8443, but the partner is using the public hostname mapped to a different address.

**Worked analysis:** The correct question is not “is the IP right?” It is “right for which boundary?” A local route, a translated public address, a DNS record, and a listening port can all be individually valid while the complete path is wrong.

## Practice

For a browser request, label the application data, transport port, destination IP, and next-hop MAC address. Explain which labels can change at a router and which normally remain end-to-end.

## Key takeaways

- Models help locate a responsibility; they do not describe every implementation detail.
- Encapsulation adds context and decapsulation removes it.
- Always state whether an address is local-link, routed, translated, or process-specific.
`),
    module('Signals, media, switching, and routing', 'Connect physical transmission choices to the forwarding decisions made by network devices.', `
## Learning objectives

Compare guided and wireless media, explain why encoding needs timing, and distinguish switching from routing decisions.

## Bits need a physical representation

Copper carries changing electrical signals, fibre carries light, and wireless links carry radio waves. A receiver needs a shared timing and encoding agreement to distinguish symbols. Line coding can introduce transitions that help the receiver recover a clock; modulation maps bits onto a carrier. The tradeoff is visible in bandwidth, range, interference tolerance, and hardware cost.

## Frames and forwarding

An Ethernet or Wi-Fi frame carries source and destination MAC addresses plus an error-detection value. A switch learns which MAC address is reachable through each port and forwards a known destination directly. Unknown destinations may be flooded within the broadcast domain. A router removes the local frame, examines the IP destination, decrements the packet lifetime, and selects a next hop from its routing information.

## Case study: a noisy lab link

In a fictional networking lab, file copies fail only when a microwave is running near a wireless access point. Signal strength remains acceptable, but retries and frame-check errors increase. Moving the access point changes the result; replacing the application does not.

**Worked analysis:** The evidence points to the physical and link layers. A practical fix could change the channel, reduce interference, improve placement, or use a wired connection. Throughput is not just the advertised link rate; retransmissions and contention consume capacity.

## Interactive prompt

Imagine a packet moving from a laptop to a server in another network. At the laptop, which device supplies the first-hop MAC address? At the router, why does the destination MAC change while the destination IP remains the server's routed address? Write the two answers before checking the note.

## Key takeaways

- Media and encoding determine how reliably symbols can be recovered.
- Switches forward frames inside a link domain; routers forward packets between networks.
- A high nominal rate does not guarantee useful application throughput.
`),
    module('Reliable transport and network diagnosis', 'Use measurements and controlled tests to explain delay, loss, and service failures.', `
## Learning objectives

Explain reliability, compare latency and throughput, and build a layer-by-layer diagnosis from observable evidence.

## Reliability has a cost

TCP uses sequence numbers, acknowledgements, retransmission, and congestion control to provide an ordered byte stream. UDP offers a small datagram service without built-in delivery guarantees. QUIC adds encrypted streams and connection migration above UDP. Applications choose the service they need; a live voice stream may prefer timely data over retransmitting an old packet, while a file transfer cannot.

Latency is the time for a message to travel and be processed. Throughput is the useful amount delivered over time. A path can have high capacity and still feel slow because of queueing, handshakes, loss, or a distant server. Measuring only a speed-test peak hides those differences.

## Case study: connected but unavailable

Fictional design studio Maple Arc reports that Wi-Fi shows connected, ping to the gateway succeeds, but the learning portal does not open. The support checklist tests, in order: local signal and frame errors, DNS resolution, a route to the server, TCP connection to the service port, TLS negotiation, and the application response.

**Worked analysis:** If DNS fails, testing a browser feature is premature. If DNS and routing succeed but the service port times out, investigate a firewall or listener. If TLS succeeds but the response is an error, the network path is working and the application deserves attention. Each test narrows the boundary instead of producing a random configuration change.

## Diagnostic worksheet

Record the test, result, timestamp, source location, and layer. Compare a working device with the failing device. Change one variable at a time, preserve the original evidence, and state what result would falsify your hypothesis.

## Recall and application

1. Why can a retransmission improve correctness while increasing delay?
2. What does a successful gateway ping prove, and what does it not prove?
3. Choose one test for DNS, one for transport, and one for the application layer.

## Key takeaways

- Reliability, latency, and throughput describe different properties.
- Troubleshooting works best as a sequence of falsifiable tests.
- Stop at the first failing boundary and collect evidence before applying a fix.
`),
  ],
};
