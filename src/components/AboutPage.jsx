const aboutParagraphs = [
  'In my twenties, I scribbled down thoughts on scrap paper and of course, in the neo-classical prime real estate of existential rambling: the notes app on my phone.',
  {
    key: 'waa-how',
    content: (
      <>
        Often the handwritten varieties were illegible. Even more often, I would find what I clearly considered to be strikingly meaningful at the time and think, <em>waa-how</em>. What could I have possibly meant by that. :)
      </>
    ),
  },
  'Those that are still decipherable (it’s a gracious admission process), were collated and tucked into a now wrinkled pensioner plastic sleeve, and carted round in that reclusive ‘important docs’ box, with birth certificates, bills, and bank statements, living out their days in the shadows of Narnia.',
  'When revisiting them last year, I found they formed a collection of pitstop stamps.',
  'Scaffolding notes, from a young human, as she was constructing the framework to house her world.',
  'And although some still land off the vault with the same thud as when they were written, and others are now only cold-coal nostalgic reference points,',
  'they all felt a part of a recent bygone era. By and large recent, but bided goodbye and gone.',
  'A sense of finality perhaps. A quiet interlude, where we become aware the first act has finished.',
  'I imagine as we continue to build up more limescale-esque layers of life, with the oldest distinguishable by the darkest shades of corrosion, and the newest still bright, familiar and malleable;',
  'it will probably continue to feel like life can be divided into pitstops. Not necessarily hierarchical. Sometimes parallel, ascending and descending. A warren rendering in real-time.',
  'A vessel constantly morphing while in motion. An evolution of understandings that mold our game plan for making our way through this galactic riptide.',
  'This pitstop feels like pausing on the mezzanine balcony and looking out over the foundation level,',
  'A faint humming in the background, courtesy of a collection of pinned patterns of the past. Elevator music of sorts. Sometimes irritating, and sometimes a comforting affront to silence.',
  'Whether the new installments are vanilla sludge, with a coarse sheen; hidden little chunks of grit in beige custard; the kind that make themselves at home in your molars, announcing their arrival and intention of a long stay, only once they are inextricable;',
  'or, vibrant, light, and soft to the touch.',
  'It’s clear they will pass with new data for the data bucket.',
  'Learnings that are tweaking the algorithm of our approach.',
  'Just as the subjects of meaning and morality were not unlike traveling through a dark tunnel before exiting into a large open field,',
  'I suspect some of the ideas captured at this pitstop will be carried into the next chapters, and maybe even be discarded. Or conversely, become absolute.',
  'I certainly expect juvenile ideas around the nature of our world to be a reversal. Like exiting a large open field (current station) and entering a tunnel once again. (darkness ironically not its defining characteristic, and instead brute illumination of staggering complexity)',
  'Like a gruff, infinitely old and wise, rude and rudimentary canteen buffet lady, this brief existence will continue to serve up “would rather not try that one again, thank you very much Ruth” dishes, and electrifyingly (not in an unpleasant way…) magnificent dishes;',
  'all of which are whipped up at random without consideration for the preferences of palates. A mathematically laden ladle slopping the contents onto our plate.',
  'A long chain of catalysts playing out in the bain-marie.',
  'But all that deliberation is for other pitstops, other floors, other viewing decks. The next chapters.',
  'Here are some scaffolding notes from the mezzanine.',
  'Ellie',
];

export function AboutSection({ className = '', id }) {
  const sectionClassName = ['about-shell', className].filter(Boolean).join(' ');

  return (
    <section id={id} className={sectionClassName} aria-label="About">
      <article className="about-tile">
        {aboutParagraphs.map((paragraph) => (
          <p key={typeof paragraph === 'string' ? paragraph : paragraph.key}>
            {typeof paragraph === 'string' ? paragraph : paragraph.content}
          </p>
        ))}
      </article>
    </section>
  );
}

export function AboutPage() {
  return (
    <main className="art-book-shell">
      <AboutSection id="about" />
    </main>
  );
}
