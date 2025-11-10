import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <header
  className="relative bg-cover bg-center text-white text-center py-20 md:py-40"
  style={{
    // FIX: Replaced broken Google search link with the direct image URL.
    // NOTE: This image is a movie poster and may not be ideal for a banner.
    backgroundImage: "url('https://wallpapercave.com/wp/wp2739947.jpg')",
  }}
>
  {/* Black overlay for better text readability */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  {/* Content (z-10 ensures it appears above the overlay) */}
  <div className="relative z-10">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-shadow-md">{t('heroTitle')}</h1>
    <p className="text-xl mb-8 text-shadow-md">{t('heroSubtitle')}</p>
    <a 
      href="/registration" 
      className="bg-secondary-light text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition duration-300 transform hover:scale-105"
    >
      {t('registerNow')}
    </a>
  </div>
</header>

      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">{t('premierCompetition')}</h2>
          <p className="text-lg text-text-primary max-w-3xl mx-auto">{t('premierCompetitionText')}</p>
        </div>
      </section>

      <section className="py-20 bg-tertiary-light">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-primary">{t('whyParticipate')}</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t('showcaseSkills')}</h3>
              <p className="text-text-primary">{t('showcaseSkillsText')}</p>
            </div>
            <div className="p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t('winPrizes')}</h3>
              <p className="text-text-primary">{t('winPrizesText')}</p>
            </div>
            <div className="p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t('networkExperts')}</h3>
              <p className="text-text-primary">{t('networkExpertsText')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;