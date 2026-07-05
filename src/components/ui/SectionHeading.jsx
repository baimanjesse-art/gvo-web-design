import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, sub }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      {eyebrow && (
        <p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.3em] text-silver-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-chrome font-display text-3xl font-extrabold tracking-tight md:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-neutral-400 md:text-lg">{sub}</p>}
      <div className="chrome-hr mx-auto mt-8 max-w-[240px]" />
    </Reveal>
  )
}
