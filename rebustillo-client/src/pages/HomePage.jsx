import Button from '../components/Button';
import profileImage from '../assets/ciferrr.png';
import card1 from '../assets/card1.png';
import card2 from '../assets/card2.png';
import card3 from '../assets/card3.png';
import card4 from '../assets/card4.png';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="px-6 py-16 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400 mb-8">
            Espada Profile
          </div>
          
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold leading-tight text-white mb-6">
                Ulqiorra Cifer
              </h1>
              <p className="text-base leading-7 text-gray-300 mb-8">
                Cuantro-Espada of Aizen's Hollow Army. A stoic and enigmatic figure, Ulquiorra embodies nihilism and emptiness, wielding immense power with cold precision.
              </p>
              <Button variant="primary" to="/about">
                Learn More
              </Button>
            </div>
            
            {/* Right Image */}
            <div className="flex justify-end min-h-[24rem]">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="max-w-[24rem] h-[22rem] rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Power Statistics Section */}
      <section className="px-6 py-16 sm:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400 mb-4">
            Hollow Stats
          </div>
          <h2 className="text-3xl font-bold text-white mb-12">Battle Data</h2>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-black rounded-lg border border-gray-700 p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-white mb-2">100</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
                Cero
              </div>
            </div>
            
            <div className="bg-black rounded-lg border border-gray-700 p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-white mb-2">99</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
                Attack
              </div>
            </div>
            
            <div className="bg-black rounded-lg border border-gray-700 p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-white mb-2">100</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
                Speed
              </div>
            </div>
            
            <div className="bg-black rounded-lg border border-gray-700 p-8 text-center shadow-sm">
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
                Defeats
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="px-6 py-16 sm:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-400 mb-4">
            Espada Techniques
          </div>
          <h2 className="text-3xl font-bold text-white mb-12">Abilities</h2>
          
          <div className="grid grid-cols-4 gap-6">
            <article className="rounded-2xl overflow-hidden border border-gray-700 hover:shadow-lg transition bg-black">
              <img 
                src={card1} 
                alt="Feature Card One" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Full Resurrection
                </h3>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border border-gray-700 hover:shadow-lg transition bg-black">
              <img 
                src={card2} 
                alt="Feature Card Two" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Segunda Etapa
                </h3>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border border-gray-700 hover:shadow-lg transition bg-black">
              <img 
                src={card3} 
                alt="Feature Card Three" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Cero Oscuras
                </h3>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border border-gray-700 hover:shadow-lg transition bg-black">
              <img 
                src={card4} 
                alt="Feature Card Four" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Lanza Del Relampago
                </h3>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;