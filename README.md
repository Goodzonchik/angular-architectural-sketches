# Переосмысление фронтенда

![CI](https://github.com/Goodzonchik/angular-architectural-sketches/workflows/CI/badge.svg)

## Заменить NPM на Yarn

Почему:

- Блокировка транзитивных зависимостей.
- Повторная установка пакетов (аналог npm install), если были установлены пакеты заранее работает около 0,5-5 секунд, против 40 у npm. (Должно работать быстрее на CI).
- Можно сделать команду yarn install && yarn start (или что-то похожее под ангуляр). При старте будет проверка всех пакетов. Потеря по времени (0,5-5 секунд на старт) компенсируется проблемами, если никто не сказал, что добавил пакет.

Особенности подхода:

- Обратная совместимость с npm
- Простая установка - npm install yarn@latest -g

Пример:

- Файл package.json - script start.

## ALIAS-ы для базовых путей

Почему:

- Все сущности из папки shared будут импортированы разом.
- Повысится консистентность кода (не будет относительного и абсолютного пути для одного и того же файла в разных местах системы)
- Код будет более сгруппированный
- Легче будет искать нужный импорт

Пример:

- Файл route.service.ts - пример использования
- Файл src/app/shared/index.ts - настройка barrel-файла с импортами
- Файл tsconfig.json - пример настройки alias-ов

### Добавить - Файлы хэлперы/утилиты

Почему:

- Уходит дублирование кода, которое проскакиевает периодически (одинаковые enum и переменные)
- Вынесение общего кода из компонентов или сервисов
- Легче тестировать отдельные функции, чем методы компоненты
- Импортировать функцию проще, чем использовать сервис

Пример:

- Файл src/app/utils/todo.ts - файл с типом TodoAny
- Файл shared/app/shared/route.service.ts - файл с применением типа TodoAny

### Правильно использовать sharedModule

Сейчас основные модули angular импорируются в каждый модуль, а должны пробрасываться через sharedModule

Почему:

- Уменьшится размер бандла, за счет правильного использования tree-shaking
- Уменьшится количество кода модулях, будут подключены sharedModule + компоненты
- Соответствие документации

Пример:

- Файл src/app/shared/shared.module.ts - в нем экспортируется CommonModule
- Файл src/app/organization/organization.module.ts - в нем импортируется SharedModule, который уже экспортирует CommonModule

### Более граммотно и мелко - Файлы стилей

Почему:

- Легче навигация по стилям, за счет логического и структурного деления кода
- Легче работать с небольшими кусками кода
- Легче реиспользовать стили между проектами
- Легче поддержка кода

Cтруктура
styles.scss - главный - Файл агрегатор
styles - папка с - Файлами стилей

- layout.scss - верстка сетки + контейнеры
- variables.scss - переменные цвета, размера и т.д.
- base_components.scss - базовые компоненты (кнопки, иконки, инпуты)
- overrides - папка с переопределениями компонентов из библиотек (каждый компонент - файл)
  -- ui-input.scss
  -- ui-autocomplite.scss
  Остальные стили хранятся рядом с компонентами

### Сделать два типа сервиса для ссылок

Один сервис будет агрегатором и хранилищем для основных путей

- корень
- скачивание - Файла

Частный класс возвращает 4 пути:
routeService.organization.registry
routeService.organization.add
routeService.organization.card(id)
routeService.organization.edit(id)

Для одинаковых сущностей будет один и тот же сервис, в который будет передана переменная с url.
Для нестандартных сущностей делать новый класс, наследник от частного для расширения или создается новый с набором путей.

Пример:

- Файл src/app/shared/route.service.ts - сервис агрегатор
- Файл src/app/shared/route-base.service.ts - частный сервис

Почему:

- Все ссылки будут одинаковыми для всех схожих сущностей
- Легче работать с маленькими файлами со схожей структурой
- Избежим дублирования кода для одинаковых структур
- Сервис с ссылками будет более структурированный
- Подсказки IDE будут более конкретные (10 модулей, вместо 100 методов)

### Глобальные сервисы размещаются только в папке shared, остальные рядом с местом использания/инжектирования

Почему:

- Избегание циркулярных зависимостей
- Глобальные сервисы - общие, поэтому и находиться должны в одном месте
- Папки Core может не быть на проекте, так как она не обязательна по документации

### Добавить тип TodoAny = any, как временную заглушку

Почему:

- Если нет понимания нужного типа, нет контракта, нет времени для выведения типа, то можно поставить временную заглушку.
- Легче искать в коде, чем any (есть слова compANY и подобные).
- Префикс TODO сразу дает понимание, что это технический долг и требует доработки.

Пример:

- Файл src/app/utils/todo.ts - файл с типом TodoAny

### Включить режим strict в TS-е, для более строгих проверок

Почему:

- Меньше статических ошибок в коде
- Более консистентный код

Пример:

- Файл tsconfig.json, раздел compilerOptions

### Настроить lint staged + prettier на прекоммит (В РБС такого нет, в форе был только преттиер).)

Почему:

- Проверки линтера перед сборкой и не дает запушить "плохой код"
- Тоже самое с формотированием
- Увеличивается консистентность кода
- Легче работать с однотипным кодом
- Для форматирования кода не потребуется, чтобы у всех разработчиков были одинаковые настройки форматирования

# TODO

1. Делать state-сервисы для сущностей, а компоненты максимально использовать для отрисовки
   Будет компонент для сущности, например, карточка организации. В нее будет инжектирован сервис, который хранит в себе сущности организации, методы для нее.
   Почему:

- Будет отден стейт сущности от стейта компонента
- Легче читать код компонента и сервиса, за счет размеров
- Легче тестировать логику в сервисе, чем в компоненте
- Легче решить проблему с доступом к общим методам сущности (например, как в РБС нужно сохранить данные при переходе на другую вкладку, вызвать метод сервиса легче, чем метод компонента)
- Легче реиспользовать сущности в проекте, если будет необходимость
- Можно сделать больше stateless-компонентов (компонентов без состояния). Меньше багов внутри компонентов, легче тестировать
- Легче использовать OnPush стратегию для оптимизации работы фронта

2. БЭМ для написания стилей.
   Почему:

- Повышается система в стилях
- Легче реиспользовать стили внутри проекта
- Легче переопределять стили компонента
- Повышается структурная читаемость кода
- БЭМ - достаточно легкая для изучения и реализации методология с документаций

3. Писать свою сетку стилей вместо Bootstrap и аналогов
   Почему:

- Сторонние библиотеки не соответствую ни одной методологии (Например: БЭМ и бутстрап) - вызовет конфликт с внутренними стилями.
- При использовании фреймворка на него пишется больше костылей, чем на написание свой сетки с нуля. В результате от сетка почти не используется.
- Меньше зависимостей в проекте (Bootstap 3/4 тянет jQuery)
- Меньше размер билда
- Фреймворки могут использовать сторонние шрифты, шрифты могут загружаться, но не использоваться
- Своя черновая сетка пишется за 2-3 часа на весь проект, остальное подгоняется также, как и при наличии фреймворка

4. Обязательно выносить SVG-иконки в отдельный компонент
   Почему:

- Меньше и чище код шаблона
- Повышается реиспользуемость кода
- Легче заменить одну иконку на другую в ходе разработки
- Angular позволяет использовать SVG как шаблон компонента

5. Перейти на названия по Angular

Для Observable добавлять $ в конце, например object$.subscube()
Для сервисов - обязательно копировать название сервиса, но с маленькой буквы
linkService = new LinkService. (Встречал где-то link - не было понятно, что это сервис)

Почему:

- Легче читать код и понимать какие сущности что значат.
- Код будет более консистентный
- Соответствие документации
