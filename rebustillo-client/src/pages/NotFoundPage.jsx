import { Link } from 'react-router-dom';
import Button from '../components/Button';
import notFoundGif from '../assets/cero.gif';

function NotFoundPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white px-6 py-24 sm:px-12">
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-zinc-900/90 p-10 text-center shadow-2xl shadow-black/40 backdrop-blur">
                <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white">
                    404 Error
                </div>
                <div className="mx-auto mt-6 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
                    <img
                        src={notFoundGif}
                        alt="Page not found animation"
                        className="w-full rounded-3xl object-cover"
                    />
                </div>
                <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
                    Page Not Found
                </h1>
                <p className="mt-4 text-base leading-8 text-zinc-300">
                    The page you are trying to reach does not exist, or the link is broken. Return to the hollow archives and continue your journey.
                </p>
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button to="/" variant="primary">Back to Home</Button>
                    <Link to="/articles" className="text-sm font-semibold uppercase tracking-[0.24em] text-white hover:text-zinc-200">
                        Browse Articles
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;
