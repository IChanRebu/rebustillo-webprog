import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../components/Button';
import articles from '../assets/article-content';
import NotFoundPage from './NotFoundPage';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);

  useEffect(() => {
    if (article) {
      document.title = article.title;
      const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
      link.rel = 'icon';
      link.href = article.image;
      document.head.appendChild(link);
    }
  }, [article]);

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-black text-white py-6 sm:px-6">
      <section className="rounded-3xl border border-white/10 bg-white p-8 text-black shadow-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          {article.title}
        </div>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-black">
          {article.title}
        </h1>
        <div className="mt-4 text-sm leading-7 text-zinc-600">
          {article.content.join(' ')}
        </div>
      </section>

      <section className="mt-8 space-y-6">
        {article.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-8 text-zinc-400">
            {paragraph}
          </p>
        ))}
      </section>

      <div className="mt-10">
        <Button to="/articles" variant="primary">Back to Articles</Button>
      </div>
    </div>
  );
}

export default ArticlePage;
