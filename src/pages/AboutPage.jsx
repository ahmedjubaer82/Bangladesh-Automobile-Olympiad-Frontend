import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-text-primary">{t('aboutUs')}</h2>
          <p className="text-lg text-text-primary mb-8 text-center">{t('aboutUsText')}</p>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t('ourVision')}</h3>
              <p className="text-text-primary">{t('ourVisionText')}</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t('ourMission')}</h3>
              <p className="text-text-primary">{t('ourMissionText')}</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">{t('ourValues')}</h3>
            <ul className="inline-flex flex-wrap space-x-4 md:space-x-8 text-text-primary">
              <li className="hover:text-secondary-light transition-colors duration-300">{t('integrity')}</li>
              <li className="hover:text-secondary-light transition-colors duration-300">{t('innovation')}</li>
              <li className="hover:text-secondary-light transition-colors duration-300">{t('excellence')}</li>
              <li className="hover:text-secondary-light transition-colors duration-300">{t('community')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;