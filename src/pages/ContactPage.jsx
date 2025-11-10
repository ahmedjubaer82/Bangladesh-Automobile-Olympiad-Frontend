import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-text-primary">{t('contactUs')}</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t('getInTouch')}</h3>
              <p className="text-text-primary mb-4">{t('getInTouchText')}</p>
              <div className="space-y-4 text-text-primary">
                <p className="flex items-center"><strong className="mr-2">{t('email')}:</strong> info@auto-olympiad.bd</p>
                <p className="flex items-center"><strong className="mr-2">{t('phone')}:</strong> +880 1234 567890</p>
                <p className="flex items-center"><strong className="mr-2">{t('address')}:</strong> 123 Automobile Road, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t('sendMessage')}</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-text-primary font-bold mb-2">{t('yourName')}</label>
                  <input type="text" id="name" name="name" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-text-primary font-bold mb-2">{t('yourEmail')}</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-text-primary font-bold mb-2">{t('message')}</label>
                  <textarea id="message" name="message" rows="5" className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light" required></textarea>
                </div>
                <div className="text-right">
                  <button type="submit" className="bg-secondary-light text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition duration-300 transform hover:scale-105">{t('send')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;