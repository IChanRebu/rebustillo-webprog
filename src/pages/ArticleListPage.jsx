import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content';

const ArticleListPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-6 sm:px-6">
      <section className="border-b border-white/10 bg-white p-6 text-black sm:px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Ulquiorra Archives
        </div>
        <h1 className="mt-2 text-3xl font-bold leading-tight">
          Ulquiorra Cifer Chronicles
        </h1>
        <div className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
          Explore in-depth articles about Ulquiorra Cifer's battles, philosophy, and transformation from Arrancar to Segunda Etapa.
        </div>
      </section>

      <section className="border-b border-white/10 bg-white p-6 text-black sm:px-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Featured Articles
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">
          Latest Stories
        </h2>
      </section>

      <div className="px-6 py-8">
        <ArticleList articles={articles} />
      </div>
    </div>
  );
};

export default ArticleListPage;
