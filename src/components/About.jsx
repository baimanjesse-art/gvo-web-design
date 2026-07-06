import { useState } from 'react'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const TEAM = [
  {
    name: 'Jesse',
    title: 'Co-Founder · Strategy & Client Experience',
    photo: '/images/team/jesse.webp',
    initial: 'J',
    bio: [
      'Jesse brings years of hands-on data analytics experience to GVO, having worked with teams and companies to organize their data and drive decisions that measurably improve performance. That background is the backbone of his approach to the web: he understands SEO, what search engines reward, and what a website actually needs to do to turn visitors into customers.',
      'With a coding background of his own, Jesse is fluent on both sides of the build, development and data, a cross-disciplinary perspective few agencies can offer. Clients know him as a clear communicator and an honest, straightforward person to work with. He owns client experience, sales, and every relationship at GVO, and still rolls up his sleeves in the development process on every project.',
    ],
  },
  {
    name: 'Elliott',
    title: 'Co-Founder · Lead Developer',
    photo: '/images/team/elliott.webp',
    initial: 'E',
    bio: [
      'Elliott is the engineering force behind every site GVO ships. A deeply skilled developer across many languages, his portfolio runs far beyond typical web work, from full games to anti-cheat systems, and that depth shows up in the quality and performance of everything he builds.',
      'He thrives in the hands-on construction of websites: architecting, coding, and refining until every page is fast, solid, and exactly right. As the person primarily responsible for the technical outcome of every GVO project, Elliott holds the bar high, and then clears it.',
    ],
  },
]

function TeamPhoto({ member }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    // Fallback avatar shown if the headshot fails to load
    return (
      <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-ink-600 to-ink-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        <span className="text-chrome font-logo text-6xl">{member.initial}</span>
      </div>
    )
  }

  return (
    <img
      src={member.photo}
      alt={`${member.name}, ${member.title}`}
      onError={() => setFailed(true)}
      className="h-40 w-40 rounded-full border border-white/15 object-cover shadow-[0_0_30px_rgba(255,255,255,0.06)]"
    />
  )
}

export default function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Us"
          title="Two builders. One standard."
          sub="GVO is a two-person shop by design, so you talk directly to the people doing the work, and nothing ships until it's right."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.12}>
              <article className="flex h-full flex-col items-center rounded-2xl border border-white/8 bg-ink-800/90 p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm md:p-10">
                <TeamPhoto member={member} />
                <h3 className="text-chrome-soft mt-6 font-display text-2xl font-bold">{member.name}</h3>
                <p className="mt-2 font-display text-xs font-semibold uppercase tracking-[0.22em] text-silver-500">
                  {member.title}
                </p>
                <div className="chrome-hr my-6 max-w-[120px]" />
                <div className="space-y-4 text-left text-sm leading-relaxed text-neutral-400">
                  {member.bio.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
