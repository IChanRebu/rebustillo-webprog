import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="about-page min-h-screen bg-black text-white px-6 py-10 sm:px-12">
      <div className="rounded-[1.25rem] border border-white/20 bg-white/5 px-6 py-6 shadow-xl shadow-black/50 backdrop-blur-sm">
        <button className="max-w-md rounded-full border border-white/20 bg-black/40 px-5 py-3 font-bold text-white shadow-sm shadow-white/10" type="button">
          About Ulquiorra Cifer
        </button>
      </div>

      <div className="mt-8 max-w-4xl space-y-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
          The Fourth Espada
        </div>
        <div className="text-4xl font-bold leading-tight text-white sm:text-5xl">
          Ulquiorra Cifer: Emissary of Emptiness
        </div>

        <div className="text-base leading-8 text-white/80">
          Ulquiorra Cifer is the No. 4 Espada in Sōsuke Aizen's army. Calm, analytical, and consumed by Nihil, he observes humanity with detached curiosity while embracing his role as a hollow enforcer.
        </div>

        <Button to="/articles" variant="primary" className="mt-1">Explore Ulquiorra</Button>
      </div>

      <section className="mt-12 space-y-8">
        <div className="rounded-3xl border border-white/20 bg-white/5 p-8 shadow-xl shadow-black/50">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            Hollow Powers
          </div>
          <h2 className="mt-3 text-3xl font-bold text-white">Espada Abilities</h2>
          <div className="mt-3 text-base leading-8 text-white/80">Ulquiorra wields immense Cero energy, regeneration, and the power to transform into Segunda Etapa.</div>
          <article className="mt-8 rounded-3xl border border-white/20 bg-black/80 p-6 shadow-sm shadow-black/40">
            <h3 className="text-lg font-semibold text-white">Resurrection Form</h3>
            <p className="mt-3 text-white/75">His Segunda Etapa reveals even greater strength, speed, and durability than his base Arrancar form.</p>
          </article>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/5 p-8 shadow-xl shadow-black/50">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            Allies
          </div>
          <h2 className="mt-3 text-3xl font-bold text-white">Espada Brotherhood</h2>
          <article className="mt-8 rounded-3xl border border-white/20 bg-black/80 p-6 shadow-sm shadow-black/40">
            <h3 className="text-lg font-semibold text-white">Aizen and the Espada</h3>
            <p className="mt-3 text-white/75">Ulquiorra serves Aizen loyally, standing alongside his fellow Espada as a calm and ruthless adversary.</p>
          </article>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/5 p-8 shadow-xl shadow-black/50">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            Rogues Gallery
          </div>
          <h2 className="mt-3 text-3xl font-bold text-white">Key Opponents</h2>
          <article className="mt-8 rounded-3xl border border-white/20 bg-black/80 p-6 shadow-sm shadow-black/40">
            <h3 className="text-lg font-semibold text-white">Ichigo Kurosaki</h3>
            <p className="mt-3 text-white/75">Ulquiorra's most defining battle was against Ichigo, where he tested the limits of emotion and emptiness.</p>
          </article>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/5 p-8 shadow-xl shadow-black/50">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            Achievements
          </div>
          <h2 className="mt-3 text-3xl font-bold text-white">Hollow Legacy</h2>
          <article className="mt-8 rounded-3xl border border-white/20 bg-black/80 p-6 shadow-sm shadow-black/40">
            <h3 className="text-lg font-semibold text-white">Unmatched Resolve</h3>
            <p className="mt-3 text-white/75">He is remembered for his cold logic, unwavering loyalty, and the chilling question, “What is a heart?”</p>
          </article>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/5 p-8 shadow-xl shadow-black/50">
          <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            Personal Life
          </div>
          <h2 className="mt-3 text-3xl font-bold text-white">Emptiness and Thought</h2>
          <article className="mt-8 rounded-3xl border border-white/20 bg-black/80 p-6 shadow-sm shadow-black/40">
            <h3 className="text-lg font-semibold text-white">Questions of the Heart</h3>
            <p className="mt-3 text-white/75">Although emotion seems distant, Ulquiorra's encounters with Orihime force him to question what it means to feel.</p>
          </article>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/5 p-8 shadow-xl shadow-black/50">
          <div className="grid gap-4 sm:grid-cols-[1.1fr,0.9fr]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
              True Origin
            </div>
            <button className="text-2xl font-bold leading-tight text-white">Read Full Story</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;