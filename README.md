# Переосмысление фронтенда

![CI](https://github.com/Goodzonchik/angular-architectural-sketches/workflows/CI/badge.svg)

## Заменить NPM на Yarn

Почему:

- Блокировка транзитивных зависимостей
- Повторная установка пакетов (аналог npm install), если были установлены пакеты заранее работает около 0,5-5 секунд, против 40 у npm. (Должно работать быстрее на CI)
- Можно сделать команду **yarn install && yarn start** (или что-то похожее под ангуляр). При старте будет проверка всех пакетов. Потеря по времени (0,5-5 секунд на старт) компенсируется проблемами, если никто не сказал, что добавил новый пакет в зависимости
- Легче писать команду "yarn start", чем "npm run start"

Особенности подхода:

- Обратная совместимость с npm
- Простая установка - npm install yarn@latest -g

Пример:

- Файл package.json - Скрипт start, который проверяет зависимости перед стартом.

Комментарий:

Необходимо сделать набор универсальных команд для разных технологий (Angular/React/Vue): "yarn start", "yarn test", "yarn build", "yarn lint". Позволит больше концентрироваться на коде, а не на командах фреймворка/библиотеки.

## ALIAS-ы для базовых путей

Почему:

- Все сущности из папки shared/core/utils/dto и подобных будут импортированы разом.
- Повысится консистентность кода (не будет относительного и абсолютного пути для одного и того же файла в разных местах системы)
- Код будет более сгруппированный
- Легче будет искать нужный импорт

Пример:

- Файл src/app/shared/route/route.service.ts - пример использования внутри папки shared
- Файл src/app/organization/organization-card/organization-card.component.ts - пример использования за пределами папки shared
- Файл src/app/shared/index.ts - настройка barrel-файла с импортами
- Файл tsconfig.json - пример настройки alias-ов

## Донастроить angular.json/tsconfig.json и остальные

- Убрать настройку `prefix: 'app'`

**Почему:** при генерации нового компонента название формируется следующим образом "app-component-name". Так как префикс не несет смысловой нагрузки, то удаляется в ручную у каждого компонента.

- Включить режим strict в TS-е, для более строгих проверок

**Почему:** Меньше статических ошибок в коде, повышается консистентность кода.

- Настроить target в tsconfig, если нет требований по IE, то можно обходиться es6

**Почему:** Билд будет только для тех браузеров, которые указаны в ТЗ.

- Настроить BrowserList исходя из требований к системе

**Почему:** Стили будут формироваться только под те браузеры, которые нужны.

## Настроить lint staged + prettier на pre-commit/pre-push

Почему:

- Проверки линтера перед коммитом, что не дает запушить "плохой код"
- Тоже самое с формотированием
- Увеличивается консистентность кода
- Легче работать с однотипным кодом
- Для форматирования кода не потребуется, чтобы у всех разработчиков были одинаковые настройки форматирования в IDE, хук сделает работу за разработчика и отформатирует по файлу конфигурации

## Добавить - Файлы хэлперы/утилиты

Почему:

- Уменьшится дублирование кода
- Вынесение общего кода из компонентов или сервисов
- Легче тестировать отдельные функции, чем методы компонента/сервиса
- В некоторых ситуациях импортировать функцию проще и правильнее, чем использовать сервис

Пример:

- Файл src/app/utils/todo.ts - файл с типом TodoAny
- Файл shared/app/shared/route.service.ts - файл с применением типа TodoAny

## Добавить тип TodoAny = any, как временную заглушку

Почему:

- Если нет понимания нужного типа, нет контракта, нет времени для выведения типа, то можно поставить временную заглушку.
- Легче искать в коде, чем any (есть слова compANY и подобные).
- Префикс TODO сразу дает понимание, что это технический долг и требует доработки.

Пример:

- Файл src/app/utils/todo.ts - файл с типом TodoAny

## Правильно использовать sharedModule

Сейчас основные модули angular импорируются в каждый модуль, а должны импортироваться через sharedModule

Почему:

- Уменьшится размер бандла, за счет правильного использования tree-shaking
- Уменьшится количество кода модулях, будут подключены sharedModule + компоненты
- Соответствие документации https://angular.io/guide/sharing-ngmodules

Пример:

- Файл src/app/shared/shared.module.ts - в нем экспортируется CommonModule
- Файл src/app/organization/organization.module.ts - в нем импортируется SharedModule, который уже экспортирует CommonModule

## Перейти на названия согласно документации Angular

Для Observable добавлять $ в конце, например object$.subscube().

Для сервисов - обязательно копировать название сервиса, но в camelCase.

linkService = new LinkService. Названия link или linkOf не дают точного представления с тем, какую сущность представляет собой поле.

Почему:

- Легче читать код и понимать какие сущности что значат.
- Код будет более консистентный.
- Соответствие документации https://angular.io/guide/rx-library#naming-conventions-for-observables

Пример:

- Файл organization.service.ts
- Файл organization-card.component.ts

## Сделать сервис для ссылок и класс, реализующий логику путей

Сервис будет агрегатором и хранилищем для основных путей

- корень
- скачивание - Файла

Частный класс возвращает 4 пути:
routeService.organization.registry
routeService.organization.add
routeService.organization.card(id)
routeService.organization.edit(id)

Для одинаковых сущностей будет один и тот же сервис, в который будет передана переменная с url.
Для нестандартных сущностей делать новый класс, наследник от частного для расширения или сделать новый класс с нужным набором путей.

Пример:

- Файл src/app/shared/route.service.ts - сервис агрегатор
- Файл src/app/shared/route-base.service.ts - частный сервис

Почему:

- Все ссылки будут одинаковыми для всех схожих сущностей
- Легче работать с маленькими файлами со схожей структурой
- Отсутсвие дублирования кода для одинаковых структур
- Сервис с ссылками будет более структурированный
- Подсказки IDE будут более конкретные (примерно 10 модулей, а потом 4-6 методов/полей, вместо 100 методов)

## Глобальные сервисы размещаются только в папке shared, остальные рядом с местом использания/инжектирования

Почему:

- Избегание циркулярных зависимостей
- Глобальные сервисы - общие, поэтому и находиться должны в одном месте

Комментарий:

Папка Core не подходит для этих целей, а также ее может не быть в проекте, так как она не обязательна по документации

## Папку shared стоит разграничивать на несколько групп

Почему:

- Легче искать сущности, которые не связаны ничем логически
- Проект будет более структурированный

Описание реализации:

- Pipes (папка с пайпами)
- States (папка с сервисами стейтами-сущностей)
- Icons (папка с компонентами-иконками)
- Папки для отдельных компонетнов/сервисов и т.д., которые содержат 2 и более файлов. Могут иметь вложения из пайпов/сервисов-стейтов, если они не используются больше нигде
- Однофайловые компоненты/директивы и т.д.

Пример:
Папка shared

## Обязательно выносить SVG-иконки в отдельный компонент

Почему:

- Меньше и чище код шаблона
- Повышается реиспользуемость кода
- Легче заменить одну иконку на другую в ходе разработки
- Angular позволяет использовать SVG как шаблон компонента

Пример:

- Файл shared/layout/header/user-icon - компонент с иконкой

## Делать state-сервисы для сущностей, а компоненты максимально использовать для отрисовки

Будет компонент для сущности, например, карточка организации. В нее будет инжектирован сервис, который хранит в себе сущности организации, методы для работы с ней.

Почему:

- Будет отден стейт сущности от стейта компонента
- Легче читать код компонента и сервиса, за счет размеров
- Легче тестировать логику в сервисе, чем в компоненте
- Легче решить проблему с доступом к общим методам сущности
- Легче реиспользовать сущности в проекте, если будет необходимость
- Можно сделать больше stateless-компонентов
- Легче использовать OnPush стратегию для оптимизации работы фронта

Пример:

- Файл organization.service.ts - сервис-стейт сущности
- Файл organization-employee-and-subdivision.component.ts - комнонент с основной информацией
- Файл organization-card.component.ts - компонент с дополнительной информацией

## Выносить данные для отправки на бэкенд в отдельные переменные/константы

Почему:

- Название константы даст понимание того, какие данные мы отправляем
- Легче модифицировать код, если потребуется преобразовать данные перед отправкой, сам запрос, при этом, не будет затронут
- Легче понять, что было изменено в коммите

Пример:

- Файл organization.service.ts, метод `.save()`

## Более граммотно и мелко - Файлы стилей

Почему:

- Легче навигация по стилям, за счет логического и структурного деления кода по файлам
- Легче работать с небольшими кусками кода
- Легче реиспользовать стили между проектами
- Легче поддержка кода

Cтруктура
styles.scss - главный - файл агрегатор
styles - папка с - файлами стилей

- layout.scss - верстка сетки + контейнеры
- variables.scss - переменные цвета, размера и т.д.
- components.scss - файл с импортами стилей базовых компонетнов
- components - папка со стилями для базовых компонентов (кнопки, иконки, инпуты)
- - button.scss
- - input.scss
- overrides.scss - папка с импортами переопределений компонентов из библиотек
- overrides - папка с переопределениями компонентов из библиотек (каждый компонент - файл)
- - ui-input.scss
- - ui-autocomplite.scss

Остальные стили хранятся рядом с компонентами

## Писать свою сетку стилей вместо Bootstrap и аналогов

Почему:

- При использовании фреймворка на него пишется больше костылей, чем на написание свой сетки с нуля. В результате от сетка почти не используется
- Фреймворки могут использовать сторонние шрифты, которые могут загружаться, но не использоваться из-за дизайна
- Сторонние библиотеки не соответствуют методологиям или принятым именованиям классов (например: БЭМ и Bootstrap) - вызовет конфликт с внутренними стилями
- Меньше зависимостей в проекте (Bootstap 3/4 тянет jQuery), соответственно меньше размер билда
- Своя сетка пишется за 4-5 часов на базовые компоненты, остальное подгоняется также, как и при наличии фреймворка

## БЭМ для написания стилей.

Почему:

- Повышается системность в стилях
- Легче реиспользовать стили внутри проекта
- Легче переопределять стили компонента
- Повышается структурная читаемость кода
- БЭМ - достаточно легкая для изучения и реализации методология с документацией

Пример:

- Файл shared/layout/header.component.html
- Файл shared/layout/header.component.scss
