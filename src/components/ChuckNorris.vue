<template>
    <div class="container mx-auto p-4 relative">
        <div class="scanlines"></div>

        <!-- Header -->
        <header class="text-center my-8">
            <h1 class="text-2xl md:text-4xl text-yellow-300 neon-text uppercase tracking-widest mb-2">Chuck Norris</h1>
            <div class="flex justify-center space-x-2">
                <button @click="changeLanguage('en')"
                    :class="{ 'bg-blue-600': currentLocale === 'en', 'bg-blue-900': currentLocale !== 'en' }"
                    class="btn-retro px-3 py-2 text-white rounded">English</button>
                <button @click="changeLanguage('fr')"
                    :class="{ 'bg-red-600': currentLocale === 'fr', 'bg-red-900': currentLocale !== 'fr' }"
                    class="btn-retro px-3 py-2 text-white rounded">Français</button>
            </div>
        </header>

        <!-- Main content -->
        <main class="max-w-3xl mx-auto">
            <!-- Joke display -->
            <div class="joke-card p-6 mb-8 rounded-lg text-center">
                <div v-if="loading" class="text-green-400 text-lg animate-pulse">{{ $t('loading') }}</div>
                <div v-else class="mb-4">
                    <p class="text-lg text-green-400">{{ translatedJoke }}</p>
                </div>
                <div class="mt-4 flex justify-center">
                    <button @click="getRandomJoke"
                        class="btn-retro bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded uppercase">
                        {{ $t('newJoke') }}
                    </button>
                </div>
            </div>

            <!-- Search box -->
            <div class="mb-6 px-4">
                <div class="flex">
                    <input v-model="searchQuery" type="text" :placeholder="$t('searchPlaceholder')"
                        class="flex-grow p-2 border-2 border-purple-500 bg-black text-white" @keyup.enter="searchJokes">
                    <button @click="searchJokes"
                        class="btn-retro bg-purple-600 hover:bg-purple-500 text-white p-2 uppercase">
                        {{ $t('search') }}
                    </button>
                </div>
            </div>

            <!-- Categories -->
            <div class="mb-4">
                <h2 class="text-white text-center mb-4">{{ $t('categories') }}</h2>
                <div class="flex flex-wrap justify-center gap-2">
                    <button v-for="category in categories" :key="category" @click="selectCategory(category)" :class="[
                        'category-pill text-xs px-3 py-1 rounded-full capitalize',
                        selectedCategory === category ? 'active bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
                    ]">
                        {{ category }}
                    </button>
                </div>
            </div>

            <!-- Search results -->
            <div v-if="searchResults.length > 0" class="mt-8">
                <h3 class="text-white text-center mb-4">{{ $t('searchResults') }} ({{ searchResults.length }})</h3>
                <div v-for="(joke, index) in searchResults" :key="joke.id"
                    :class="['joke-card p-4 rounded mb-4', index % 2 === 0 ? 'border-blue-500' : 'border-purple-500']">
                    <p class="text-green-400">{{ joke.translatedValue }}</p>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="text-center text-gray-500 mt-12 text-xs p-4">
            <p>{{ $t('poweredBy') }} <a href="https://api.chucknorris.io" target="_blank"
                    class="text-blue-400 hover:text-blue-300">api.chucknorris.io</a></p>
        </footer>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

export default {
    name: 'ChuckNorrisJokes',
    setup() {
        const { t, locale } = useI18n({
            inheritLocale: true,
            useScope: 'global'
        });

        // Data
        const joke = ref('');
        const translatedJoke = ref('');
        const loading = ref(true);
        const currentLocale = ref(locale.value);
        const categories = ref([]);
        const selectedCategory = ref('');
        const searchQuery = ref('');
        const searchResults = ref([]);

        const detectBrowserLanguage = () => {
            const browserLang = navigator.language || navigator.userLanguage;
            const shortLang = browserLang.split('-')[0];

            if (['en', 'fr'].includes(shortLang)) {
                changeLanguage(shortLang);
            }
        };

        const changeLanguage = (lang) => {
            locale.value = lang;
            currentLocale.value = lang;

            if (joke.value) {
                translateText(joke.value);
            }

            if (searchResults.value.length > 0) {
                translateSearchResults();
            }
        };

        const translateText = async (text) => {
            if (!text || currentLocale.value === 'en') {
                translatedJoke.value = text;
                return;
            }

            try {
                loading.value = true;

                const encodedText = encodeURIComponent(text);
                const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${currentLocale.value}`;

                const response = await fetch(url);
                const data = await response.json();

                if (data && data.responseData && data.responseData.translatedText) {
                    translatedJoke.value = data.responseData.translatedText;
                } else {
                    console.warn('Traduction incomplète, utilisation du texte original', data);
                    translatedJoke.value = text;
                }
            } catch (error) {
                console.error('Erreur lors de la traduction:', error);
                translatedJoke.value = text + ' (' + t('translationError') + ')';
            } finally {
                loading.value = false;
            }
        };

        const translateSearchResults = async () => {
            if (currentLocale.value === 'en') {
                searchResults.value.forEach(joke => {
                    joke.translatedValue = joke.value;
                });
                return;
            }

            for (const joke of searchResults.value) {
                try {
                    await translateText(joke.value);
                    joke.translatedValue = translatedJoke.value;
                } catch (error) {
                    console.error('Erreur lors de la traduction des résultats:', error);
                    joke.translatedValue = joke.value;
                }
            }
        };

        const getRandomJoke = async () => {
            loading.value = true;
            try {
                let url = 'https://api.chucknorris.io/jokes/random';
                if (selectedCategory.value) {
                    url += `?category=${selectedCategory.value}`;
                }
                const response = await axios.get(url);
                joke.value = response.data.value;
                await translateText(joke.value);
            } catch (error) {
                console.error('Erreur lors de la récupération de la blague:', error);
                joke.value = "Chuck Norris a cassé l'API. Réessayez plus tard.";
                translatedJoke.value = joke.value;
            } finally {
                loading.value = false;
            }
        };

        const getCategories = async () => {
            try {
                const response = await axios.get('https://api.chucknorris.io/jokes/categories');
                categories.value = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        const selectCategory = (category) => {
            if (selectedCategory.value === category) {
                selectedCategory.value = '';
            } else {
                selectedCategory.value = category;
            }
            getRandomJoke();
        };

        const searchJokes = async () => {
            if (!searchQuery.value.trim()) return;

            loading.value = true;
            try {
                const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(searchQuery.value)}`);
                searchResults.value = response.data.result;
                await translateSearchResults();
            } catch (error) {
                console.error('Erreur lors de la recherche:', error);
                searchResults.value = [];
            } finally {
                loading.value = false;
            }
        };

        onMounted(() => {
            detectBrowserLanguage();
            getCategories();
            getRandomJoke();
        });

        return {
            joke,
            translatedJoke,
            loading,
            currentLocale,
            categories,
            selectedCategory,
            searchQuery,
            searchResults,
            getRandomJoke,
            selectCategory,
            searchJokes,
            changeLanguage,
            $t: t
        };
    }
}
</script>

<style>
body {
    font-family: 'Press Start 2P', cursive;
    background-color: #000;
    background-image:
        linear-gradient(0deg, transparent 24%, #222 25%, #222 26%, transparent 27%, transparent 74%, #222 75%, #222 76%, transparent 77%, transparent),
        linear-gradient(90deg, transparent 24%, #222 25%, #222 26%, transparent 27%, transparent 74%, #222 75%, #222 76%, transparent 77%, transparent);
    background-size: 50px 50px;
}

.pixelated {
    image-rendering: pixelated;
}

.btn-retro {
    box-shadow: 0 4px 0 #555;
    transition: all 0.1s;
    position: relative;
    top: 0;
}

.btn-retro:active {
    box-shadow: 0 1px 0 #555;
    top: 3px;
}

.neon-text {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00de, 0 0 20px #ff00de;
    animation: neon 1.5s ease-in-out infinite alternate;
}

.joke-card {
    border: 4px solid #fff;
    box-shadow: 0 0 0 4px #000, 0 0 0 8px #ff00de;
    background: rgba(0, 0, 0, 0.8);
}

@keyframes neon {
    from {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00de, 0 0 20px #ff00de;
    }

    to {
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de;
    }
}

.scanlines {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 51%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 50;
}

.category-pill {
    transition: all 0.2s;
}

.category-pill:hover {
    transform: scale(1.05);
}

.category-pill.active {
    box-shadow: 0 0 0 2px #fff, 0 0 10px 2px #ff00de;
}
</style>