# 🥋 CHUCK NORRIS JOKES 🥋
> *"Chuck Norris doesn't read READMEs. READMEs read Chuck Norris."*

<div align="center">
  
![Chuck Norris Logo](https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png)

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-FF4500?style=flat&logo=netlify&logoColor=white)](https://chuck-norris-jokes-facts.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

## 📺 Overview

**Chuck Norris Jokes** is a retro-styled web application that delivers legendary Chuck Norris jokes with a nostalgic CRT monitor aesthetic. Featuring glowing neon text and classic scanline effects, this app brings the 80's arcade feeling to Chuck's roundhouse kicks of humor.

Built with Vue.js and styled with Tailwind CSS, the app offers both English and French joke experiences with real-time translations.

**[👉 Try the Live Demo Here 👈](https://chuck-norris-jokes-facts.netlify.app/)**

## ⚡ Features

- **Random Jokes**: Fetch random Chuck Norris facts with a single click
- **Multilingual Support**: Toggle between English and French with automatic joke translation
- **Category Filtering**: Browse jokes by categories like "dev", "science", or "animal"
- **Search Functionality**: Find specific jokes with keyword search
- **Retro UI Design**: Experience jokes through:
  - Pixelated retro fonts
  - Neon glow effects
  - CRT scanline overlays
  - Classic arcade button animations

## 🖥️ Screenshots

<div align="center">
  <img src="/public/cnscreen1.png" alt="Chuck Norris Jokes App Screenshot" />
</div>

## 🛠️ Technologies

| Technology | Purpose |
|------------|---------|
| Vue.js | Frontend reactive framework |
| Tailwind CSS | Responsive styling |
| Axios | API requests handling |
| Vue I18n | Language switching & translations |
| MyMemory API | Real-time joke translation |

## 🚀 Installation

```bash
# Clone this legendary repository
git clone https://github.com/leonidsergueigr/chuck-norris-jokes-facts.git

# Enter the dojo
cd chuck-norris-jokes

# Install dependencies (Chuck would do it with one command)
npm install

# Launch the development server
npm run dev

# Open your browser at http://localhost:8080
```

## 🎮 Usage

- **Language Selection**: Switch between 🇺🇸 English and 🇫🇷 French
- **New Joke**: Click the glowing "New Joke" button for random Chuck wisdom
- **Search**: Enter keywords to find specific jokes
- **Categories**: Filter jokes by selecting category pills

<div align="center">
  
  `▶︎` *Press START to continue* `◀︎`
  
</div>

## 📱 Responsive Design

The app features a fully responsive design that works on all devices:

- **Desktop**: Full experience with maximum scanline and glow effects
- **Tablet**: Optimized layout with preserved visual effects
- **Mobile**: Condensed interface with adaptive search bar that never overflows

## 🔌 API Endpoints

```
🔹 Random Joke
GET https://api.chucknorris.io/jokes/random?category={category}

🔹 Categories
GET https://api.chucknorris.io/jokes/categories

🔹 Search
GET https://api.chucknorris.io/jokes/search?query={keyword}

🔹 Translation
GET https://api.mymemory.translated.net/get?q={text}&langpair=en|{lang}
```

## 🤝 Contributing

Chuck Norris approves of contributions. Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/roundhouse-kick`)
3. Commit your changes (`git commit -m 'Add some roundhouse kick'`)
4. Push to the branch (`git push origin feature/roundhouse-kick`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👊 Acknowledgments

- [Chuck Norris API](https://api.chucknorris.io/) for the legendary joke data
- [MyMemory Translation API](https://mymemory.translated.net/doc/spec.php) for translation services  
- [Press Start 2P Font](https://fonts.google.com/specimen/Press+Start+2P) for the authentic retro typography

<div align="center">
  
*Chuck Norris counted to infinity... twice.*

</div>