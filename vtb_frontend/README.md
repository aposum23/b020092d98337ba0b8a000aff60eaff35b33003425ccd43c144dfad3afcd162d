# Vue 3 + TypeScript + Vite

## Рекомендуемая настройка IDE

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (и отключите Vetur) + [TypeScript Vue Plugin (Волар)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Поддержка типов для импорта `.vue` в TS

TypeScript не может обрабатывать информацию о типе для импорта `.vue` по умолчанию, поэтому мы заменяем CLI `tsc` на `vue-tsc` для проверки типа. В редакторах нам нужен [Плагин TypeScript Vue (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin), чтобы языковая служба TypeScript знала о `.vue` типы.

Если автономный плагин TypeScript кажется вам недостаточно быстрым, Volar также реализовал [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669), который обеспечивает более высокую производительность. Вы можете включить его, выполнив следующие шаги:

1. Отключите встроенное расширение TypeScript.
   1. Запустите «Расширения: Показать встроенные расширения» из палитры команд VSCode.
   2. Найдите «Функции языка TypeScript и JavaScript», щелкните правой кнопкой мыши и выберите «Отключить (рабочая область)».
2. Перезагрузите окно VSCode, запустив «Разработчик: Перезагрузить окно» из палитры команд.

## Запуск проекта

1. Перейти в текущую директорию
2. Установить зависимости командой `npm install`
3. Запустить проект командой `npm run dev`
