export function ComputerNetworksReference({ unit, title }: { unit: number; title: string }) {
  return <><style>{`
    body:has(.cn-original-module) { overflow: hidden; }
    body:has(.cn-original-module) .sidebar,
    body:has(.cn-original-module) .topbar,
    body:has(.cn-original-module) .mobile-nav,
    body:has(.cn-original-module) .skip-link { display: none; }
  `}</style><iframe
    className="cn-original-module"
    src={`/cn-units/unit-${unit}/index.html`}
    title={title}
    style={{ position: 'fixed', inset: 0, width: '100vw', height: '100dvh', border: 0, display: 'block', zIndex: 200 }}
  /></>;
}
