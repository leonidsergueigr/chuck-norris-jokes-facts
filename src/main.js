import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n';
import './assets/tailwind.css'

const i18nMessages = {
    en: {
      loading: "Loading Chuck's wisdom...",
      newJoke: "New Joke",
      searchPlaceholder: "Search for jokes...",
      search: "Search",
      categories: "Categories",
      searchResults: "Search Results",
      poweredBy: "Powered by",
      translationError: "Translation error, showing original joke"
    },
    fr: {
      loading: "Chargement de la sagesse de Chuck...",
      newJoke: "Nouvelle Blague",
      searchPlaceholder: "Rechercher des blagues...",
      search: "Rechercher",
      categories: "Catégories",
      searchResults: "Résultats de recherche",
      poweredBy: "Propulsé par",
      translationError: "Erreur de traduction, affichage de la blague originale"
    }
  };
  

  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: i18nMessages,
  });
  

  const app = createApp(App);
  app.use(i18n);
  app.mount('#app');