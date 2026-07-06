export default function VideoBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-ink-900">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover opacity-80"
      >
        <source src="/videos/gvo-logo-sweep.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-900/88 to-ink-950/92" />
    </div>
  )
}
