import { Outlet } from 'react-router-dom';
import ceroGif from '../assets/ulq.gif';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        
        {/* LEFT SIDE */}
        <div className="flex items-center justify-center border-b-2 border-gray-700 bg-black p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-gray-700 lg:p-16">
          <div className="flex w-full max-w-2xl items-center justify-center rounded-2xl border border-gray-700 bg-white/5 p-8 sm:p-10">
            <img 
              src={ceroGif} 
              alt="Cero" 
              className="w-full max-w-[60em] rounded-lg"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <main className="flex items-center bg-black px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>

      </div>
    </section>
  );
};

export default AuthLayout;