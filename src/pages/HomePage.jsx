import Button from '../components/Button';
import characterImage from '../assets/character.png';
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
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-400 mb-8">
            Hero Section
          </div>
          
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold leading-tight text-white mb-6">
                Christian Parker
              </h1>
              <p className="text-base leading-7 text-red-200 mb-8">
                Everybody can wear a mask
              </p>
              <Button variant="primary">
                Learn More
              </Button>
            </div>
            
            {/* Right Image */}
            <div className="flex justify-end">
              <img 
                src={characterImage} 
                alt="Character" 
                className="w-full h-72 rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Power Statistics Section */}
      <section className="px-6 py-16 sm:px-12 bg-red-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-200 mb-4">
            Power Statistics
          </div>
          <h2 className="text-3xl font-bold text-white mb-12">Skills</h2>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-black rounded-lg border border-red-700 p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">1</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-red-300">
                Job
              </div>
            </div>
            
            <div className="bg-black rounded-lg border border-red-700 p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">20</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-red-300">
                Wins
              </div>
            </div>
            
            <div className="bg-black rounded-lg border border-red-700 p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">10</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-red-300">
                Huzz
              </div>
            </div>
            
            <div className="bg-black rounded-lg border border-red-700 p-8 text-center">
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-red-300">
                Defeats
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="px-6 py-16 sm:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-400 mb-4">
            Feature Cards
          </div>
          <h2 className="text-3xl font-bold text-white mb-12">Freestyle</h2>
          
          <div className="grid grid-cols-4 gap-6">
            <article className="rounded-2xl overflow-hidden border-2 border-red-700 hover:shadow-lg transition bg-red-900">
              <img 
                src={card1} 
                alt="Feature Card One" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Feature Card One
                </h3>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border-2 border-red-700 hover:shadow-lg transition bg-red-900">
              <img 
                src={card2} 
                alt="Feature Card Two" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Feature Card Two
                </h3>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border-2 border-red-700 hover:shadow-lg transition bg-red-900">
              <img 
                src={card3} 
                alt="Feature Card Three" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Feature Card Three
                </h3>
              </div>
            </article>

            <article className="rounded-2xl overflow-hidden border-2 border-red-700 hover:shadow-lg transition bg-red-900">
              <img 
                src={card4} 
                alt="Feature Card Four" 
                className="aspect-square object-cover bg-slate-300"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  Feature Card Four
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