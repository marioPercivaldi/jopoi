import { getDictionary } from "@/i18n/dictionary";

export default function Home() {
  const t = getDictionary();

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide opacity-70">{t.app.name}</p>
      <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{t.home.title}</h1>
      <p className="text-lg opacity-80">{t.home.description}</p>
      <button
        type="button"
        disabled
        className="w-full rounded-lg bg-foreground px-6 py-3 font-semibold text-background opacity-60 sm:w-auto"
      >
        {t.home.cta} · {t.home.comingSoon}
      </button>
    </main>
  );
}
