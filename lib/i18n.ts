import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      products: 'Products',
      gallery: 'Gallery',
      about: 'About',
      faqs: 'FAQs',
      contact: 'Contact',
      admin: 'Admin',
      
      // Common
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      clear: 'Clear',
      
      // Buttons
      getQuote: 'Get a Free Quote',
      whatsappOrder: 'WhatsApp to Order',
      callNow: 'Call Now',
      viewProducts: 'View Products',
      backToProducts: 'Back to Products',
      details: 'Details',
      
      // Contact
      yourName: 'Your name',
      phoneNumber: 'Phone number',
      yourMessage: 'Your message',
      sendWhatsApp: 'Send via WhatsApp',
      
      // Stats
      sqftInstalled: 'sq ft installed',
      trustedBy: 'Trusted by industrial and residential clients across the city.',
      
      // Features
      durable: 'Durable',
      fastInstall: 'Fast Install',
      costEffective: 'Cost-effective',
      warranty: 'Warranty',
      
      // Admin
      adminLogin: 'Admin Login',
      password: 'Password',
      enter: 'Enter',
      logout: 'Logout',
    }
  },
  hi: {
    translation: {
      // Navigation
      home: 'होम',
      products: 'उत्पाद',
      gallery: 'गैलरी',
      about: 'हमारे बारे में',
      faqs: 'सवाल-जवाब',
      contact: 'संपर्क',
      admin: 'एडमिन',
      
      // Common
      loading: 'लोड हो रहा है...',
      save: 'सेव करें',
      cancel: 'रद्द करें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      add: 'जोड़ें',
      clear: 'साफ करें',
      
      // Buttons
      getQuote: 'मुफ्त कोटेशन पाएं',
      whatsappOrder: 'WhatsApp पर ऑर्डर करें',
      callNow: 'अभी कॉल करें',
      viewProducts: 'उत्पाद देखें',
      backToProducts: 'उत्पादों पर वापस जाएं',
      details: 'विवरण',
      
      // Contact
      yourName: 'आपका नाम',
      phoneNumber: 'फोन नंबर',
      yourMessage: 'आपका संदेश',
      sendWhatsApp: 'WhatsApp के माध्यम से भेजें',
      
      // Stats
      sqftInstalled: 'वर्ग फुट स्थापित',
      trustedBy: 'शहर भर के औद्योगिक और आवासीय ग्राहकों द्वारा भरोसेमंद।',
      
      // Features
      durable: 'टिकाऊ',
      fastInstall: 'तेज़ इंस्टॉल',
      costEffective: 'लागत प्रभावी',
      warranty: 'वारंटी',
      
      // Admin
      adminLogin: 'एडमिन लॉगिन',
      password: 'पासवर्ड',
      enter: 'दर्ज करें',
      logout: 'लॉगआउट',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n