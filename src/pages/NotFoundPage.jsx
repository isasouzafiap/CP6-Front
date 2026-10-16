import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-full flex items-center justify-center p-3 sm:p-6 bg-bg text-text font-body transition-colors duration-300">
      <div className="w-full max-w-[480px] rounded-lg overflow-hidden shadow-app bg-table border border-table-border p-8 text-center">
        <span className="block text-[4rem] font-display text-accent mb-2">404</span>
        <h1 className="font-display text-2xl mb-3">Página não encontrada</h1>
        <p className="text-sm text-text-muted mb-8">
          Essa página não existe. Deve ter se perdido no meio do baralho.
        </p>
        <Link
          to="/"
          className="inline-block rounded-full px-[22px] py-2.5 text-[0.85rem] font-semibold bg-accent text-accent-text hover:brightness-110 transition"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;