import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="about-page min-h-screen bg-black text-white">
      <div className="rounded-[1.25rem] border-2 border-red-700 bg-red-900 px-4 py-6">
        <button className="max-w-md border-2 border-red-700 bg-black font-bold text-white px-4 mb-5" type="button">
          About Christian Parker
        </button>
      </div>

      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-red-200">
        The Web-Slinger
      </div>
      <div className="max-w-xl text-xl font-bold leading-tight text-white">
        The Amazing Spider-Man: A Hero's Journey
      </div>

      <div className="mt-4 max-w-xl text-sm leading-7 text-red-100 py-6">
        Christian Parker, known to the world as Spider-Man, is New York City's greatest protector. With extraordinary spider-like abilities and a strong sense of responsibility, he fights crime and protects the innocent every day and night.
      </div>

      <button className="border-y-2 border-red-700 bg-red-900 px-4 py-6">
        <p className="text-white">Explore Spider-Man</p>
      </button>

      <section className="border-y-2 border-red-700 bg-red-900 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-200">
          Superpowers
        </div>
        <h2 className="text-2xl font-bold leading-tight text-white">Spider Abilities</h2>
        <div className="mt-2 text-xl text-red-100">Superhuman strength, agility, web-slinging, and wall-crawling powers make Spider-Man formidable.</div>
        <article className="rounded-3xl border-2 border-red-700 bg-black py-6 px-4">
          <h3 className="text-lg font-semibold text-white">Enhanced Powers</h3>
          <p className="text-red-100 mt-2">Super strength, enhanced reflexes, wall-crawling abilities, and web-generating powers.</p>
        </article>
      </section>

      <section className="border-y-2 border-red-700 bg-red-900 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-200">
          Allies
        </div>
        <h2 className="text-2xl font-bold leading-tight text-white">Trusted Companions</h2>
        <article className="rounded-3xl border-2 border-red-700 bg-black py-6 px-4">
          <h3 className="text-lg font-semibold text-white">His Girlfriend</h3>
          <p className="text-red-100 mt-2">Fiona Stacy help Spider-Man navigate his dual life.</p>
        </article>
      </section>

      <section className="border-y-2 border-red-700 bg-red-900 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-200">
          Rogues Gallery
        </div>
        <h2 className="text-2xl font-bold leading-tight text-white">Greatest Enemies</h2>
        <article className="rounded-3xl border-2 border-red-700 bg-black py-6 px-4">
          <h3 className="text-lg font-semibold text-white">Greatest Rival</h3>
          <p className="text-red-100 mt-2">Symbiote Spiderman.</p>
        </article>
      </section>

      <section className="border-y-2 border-red-700 bg-red-900 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-200">
          Achievements
        </div>
        <h2 className="text-2xl font-bold leading-tight text-white">Hero's Legacy</h2>
        <article className="rounded-3xl border-2 border-red-700 bg-black py-6 px-4">
          <h3 className="text-lg font-semibold text-white">Saved Cities</h3>
          <p className="text-red-100 mt-2">Countless lives saved and major threats prevented through Spider-Man's heroic actions.</p>
        </article>
      </section>

      <section className="border-y-2 border-red-700 bg-red-900 py-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-200">
          Personal Life
        </div>
        <h2 className="text-2xl font-bold leading-tight text-white">Balancing Act</h2>
        <article className="rounded-3xl border-2 border-red-700 bg-black py-6 px-4">
          <h3 className="text-lg font-semibold text-white">Dual Identity</h3>
          <p className="text-red-100 mt-2">Christian Parker struggles to balance his normal life as a student/photographer with his life as Spider-Man.</p>
        </article>
      </section>

      <section className="border-y-2 border-red-700 bg-red-900 py-6">
        <div className="grid gap-4 [grid-cols-[1.1fr,0.9fr]]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-200">
            True Origin
          </div>
          <button className="text-2xl font-bold leading-tight text-white">Read Full Story</button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;