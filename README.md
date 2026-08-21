# Портфолио Ильи Букреева

Персональный сайт-портфолио full-stack разработчика. Статический сайт на Vite с анимациями GSAP, плавным скроллингом Lenis и адаптивной вёрсткой.

[Сайт](https://fivemanarmy.ru/)

## Стек

- HTML5, CSS3, JavaScript (ES6+)
- [Vite](https://vitejs.dev/) — сборка и dev-сервер
- [GSAP](https://gsap.com/) + ScrollTrigger — анимации
- [Lenis](https://lenis.darkroom.engineering/) — плавный скролл
- Google Fonts: Rader, Formula Narrow, Supply Mono

## Структура проекта

```
├── index.html          # Главная страница
├── work.html           # Портфолио
├── contact.html        # Контакты
├── css/                # Стили
│   ├── globals.css     # CSS-переменные, базовые стили
│   ├── fonts.css       # Подключение шрифтов
│   ├── transition.css  # Анимации переходов
│   ├── menu.css        # Навигация
│   ├── home.css        # Главная страница
│   ├── work.css        # Страница проектов
│   ├── contact.css     # Форма контактов
│   ├── about.css       # Секция «Обо мне»
│   ├── services.css    # Секция услуг
│   └── footer.css      # Подвал
├── js/                 # Скрипты
│   ├── transition.js   # Логика переходов между страницами
│   ├── menu.js         # Мобильное меню
│   ├── hero.js         # Hero-секция
│   ├── featured-work.js # Избранные проекты
│   ├── about.js        # Секция «Обо мне»
│   ├── services.js     # Секция услуг
│   ├── contact.js      # Форма контактов
│   ├── footer.js       # Footer-анимации
│   ├── lenis-scroll.js # Плавный скролл
│   └── project-config.js # Конфигурация (PROJECT_COUNT)
├── public/             # Статика (копируется в dist как есть)
│   ├── images/         # Изображения (WebP)
│   ├── robots.txt      # Правила для ботов
│   ├── sitemap.xml     # Карта сайта
│   └── llms.txt        # Информация для LLM
├── vite.config.js      # Конфигурация Vite
└── package.json
```

## Установка и запуск

```bash
# Клонирование
git clone https://github.com/eliasbukreev/portfolio.git
cd portfolio

# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка
npm run build

# Предпросмотр сборки
npm run preview
```

Dev-сервер: `http://localhost:5173`

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с HMR |
| `npm run build` | Продакшн-сборка в `dist/` |
| `npm run preview` | Локальный предпросмотр сборки |
| `npm run host` | Dev-сервер с доступом по сети |

## Деплой

Деплой через сборку статических файлов в `dist/`. Для деплоя подходит любой хостинг (Coolify, GitHub Pages, традиционный хостинг и т.д.).

## Адаптивность

- Desktop: ≥ 1000px
- Mobile: < 1000px

На мобильных устройствах упрощены анимации, меню работает как overlay, сетки перестраиваются в одну колонку.

## SEO и производительность

- Meta description и canonical URL на каждой странице
- Open Graph + Twitter Card (включая `og:image`)
- JSON-LD (Person + WebSite)
- `robots.txt` и `sitemap.xml`
- `llms.txt` для LLM-агентов
- Изображения в WebP, lazy loading
- Локальные шрифты (без внешних запросов к Google Fonts)

## Лицензия

[MIT](LICENSE)

---

## Благодарности / Credits

### Русский

Данный проект создан на основе открытого шаблона портфолио от Prashant Koirala.

Оригинальный репозиторий:
https://github.com/prashantkoirala465/web-development-portfolio

Оригинальный проект распространяется под лицензией MIT.

### English

This project is based on the open-source portfolio template
by Prashant Koirala.

Original repository:
https://github.com/prashantkoirala465/web-development-portfolio

The original project is licensed under the MIT License.

---

## Контакты

**Илья Букреев**
- GitHub: [@eliasbukreev](https://github.com/eliasbukreev)
- Telegram: [@fivemanarmy](https://t.me/fivemanarmy)
- Email: elias.activity@gmail.com
