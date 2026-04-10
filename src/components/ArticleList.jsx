import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article key={article.name} className="overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-50 text-zinc-900 shadow-sm sm:px-0 sm:py-0">
          <div className="relative overflow-hidden bg-zinc-100">
            <div className="aspect-[4/3] w-full">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center border-2 border-zinc-300 bg-zinc-100">
                  <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article {String(index + 1).padStart(2, '0')}
            </div>

            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              {article.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {article.content[0].substring(0, 150)}...
            </p>

            <Link to={index === articles.length - 1 ? '/notfound' : `/articles/${article.name}`}>
              <Button className="mt-4" variant="primary">
                Read More
              </Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
