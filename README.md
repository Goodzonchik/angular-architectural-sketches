## Переосмысление фронтенда

1. Заменить NPM на Yarn

Почему:

- Блокировка транзитивных зависимостей.
- Повторная установка пакетов (аналог npm install), если были установлены пакеты заранее работает около 0,5-5 секунд, против 40 у npm. (Должно работать быстрее на CI).
- Можно сделать команду yarn install && yarn start (или что-то похожее под ангуляр). При старте будет проверка всех пакетов. Потеря по времени (0,5-5 секунд на старт) компенсируется проблемами, если никто не сказал, что добавил пакет.

Особенности подхода:

- Обратная совместимость с npm
- Простая установка - npm install yarn@latest -g

Пример:

Файл package.json - script start.

## ALIAS-ы для базовых путей

Почему:

- Все сущности из папки shared будут импортированы разом.
- Повысится консистентность кода (не будет относительного и абсолютного пути для одного и того же файла в разных местах системы)
- Код будет более сгруппированный
- Легче будет искать нужный импорт

Пример:
Файл route.service.ts - пример использования
Файл src/app/shared/index.ts - настройка barrel-файла с импортами
Файл tsconfig.json - пример настройки alias-ов

---

TODO

2. Настроить lint staged + prettier на прекоммит (В РБС такого нет, в форе был только преттиер).)
   Почему:

- Проверки линтера перед сборкой и не дает запушить "плохой код"
- Тоже самое с формотированием
- Увеличивается консистентность кода
- Легче работать с однотипным кодом
- Для форматирования кода не потребуется, чтобы у всех разработчиков были одинаковые настройки форматирования

3. Делать state-сервисы для сущностей, а компоненты максимально использовать для отрисовки
   Будет компонент для сущности, например, карточка организации. В нее будет инжектирован сервис, который хранит в себе сущности организации, методы для нее.
   Почему:

- Будет отден стейт сущности от стейта компонента
- Легче читать код компонента и сервиса, за счет размеров
- Легче тестировать логику в сервисе, чем в компоненте
- Легче решить проблему с доступом к общим методам сущности (например, как в РБС нужно сохранить данные при переходе на другую вкладку, вызвать метод сервиса легче, чем метод компонента)
- Легче реиспользовать сущности в проекте, если будет необходимость
- Можно сделать больше stateless-компонентов (компонентов без состояния). Меньше багов внутри компонентов, легче тестировать
- Легче использовать OnPush стратегию для оптимизации работы фронта

4. БЭМ для написания стилей.
   Почему:

- Повышается система в стилях
- Легче реиспользовать стили внутри проекта
- Легче переопределять стили компонента
- Повышается структурная читаемость кода
- БЭМ - достаточно легкая для изучения и реализации методология с документаций

5. Более граммотно и мелко файлы стилей
   Почему:

- Легче навигация по стилям, за счет логического и структурного деления кода
- Легче работать с небольшими кусками кода
- Легче реиспользовать стили между проектами
- Легче поддержка кода

Cтруктура
styles.scss - главный файл агрегатор
styles - папка с файлами стилей

- layout.scss - верстка сетки + контейнеры
- variables.scss - переменные цвета, размера и т.д.
- base_components.scss - базовые компоненты (кнопки, иконки, инпуты)
- overrides - папка с переопределениями компонентов из библиотек (каждый компонент - файл)
  -- ui-input.scss
  -- ui-autocomplite.scss
  Остальные стили хранятся рядом с компонентами

6. Писать свою сетку стилей вместо Bootstrap и аналогов
   Почему:

- Сторонние библиотеки не соответствую ни одной методологии (Например: БЭМ и бутстрап) - вызовет конфликт с внутренними стилями.
- При использовании фреймворка на него пишется больше костылей, чем на написание свой сетки с нуля. В результате от сетка почти не используется.
- Меньше зависимостей в проекте (Bootstap 3/4 тянет jQuery)
- Меньше размер билда
- Фреймворки могут использовать сторонние шрифты, шрифты могут загружаться, но не использоваться
- Своя черновая сетка пишется за 2-3 часа на весь проект, остальное подгоняется также, как и при наличии фреймворка

7. Правильно использовать sharedModule
   Сейчас основные модули angular импорируются в каждый модуль, а должны пробрасываться через sharedModule
   Почему:

- Уменьшится размер бандла, за счет правильного использования tree-shaking
- Уменьшится количество кода модулях, будут подключены sharedModule + компоненты
- Соответствие документации

8. Добавить тип TODO_ANY = any, как временную заглушку
   Почему:

- Если нет понимания нужного типа, нет контракта, нет времени для выведения типа, то можно поставить временную заглушку.
- Легче искать в коде, чем any (есть слова compANY и подобные).
- Префикс TODO сразу дает понимание, что это технический долг и требует доработки.

9. Добавить файлы хэлперы/утилиты в папке shared
   Почему:

- Уходит дублирование кода, которое проскакиевает периодически (одинаковые enum и переменные)
- Вынесение кода из компонентов - легче работать с меньшим количеством кода
- Легче тестировать отдельные функции, чем методы компоненты

10. Включить режим strict в TS-е, для более строгих проверок
    Почему:

- Меньше статических ошибок в коде
- Более консистентный код

11. Обязательно выносить SVG-иконки в отдельный компонент
    Почему:

- Меньше и чище код шаблона
- Повышается реиспользуемость кода
- Легче заменить одну иконку на другую в ходе разработки
- Angular позволяет использовать SVG как шаблон компонента

12. Глобальные сервисы размещаются в папке shared
    Почему:

- Избегание циркулярных зависимостей
- Глобальные сервисы - общие, поэтому и находиться должны в одном месте
- Папки Core может не быть на проекте, так как она не обязательна по документации

13. Сделать alias-ы для базовых вещей (shared/dto/model/core)
    Почему:

- Все сущности из папки shared будут импортированы разом.
- Повысится консистентность кода (не будет относительного и абсолютного пути для одного и того же файла в разных местах системы)
- Код будет более сгруппированный
- Легче будет читать

14. Перейти на названия по Angular

Для Observable добавлять $ в конце, например object$.subscube()
Для сервисов - обязательно копировать название сервиса, но с маленькой буквы
linkService = new LinkService. (Встречал где-то link - не было понятно, что это сервис)

Почему:

- Легче читать код и понимать какие сущности что значат.
- Код будет более консистентный
- Соответствие документации

14. Сделать 2 типа сервиса для ссылок. (Базовый и частные)

Структура:

routeService.organization.registry
routeService.organization.add
routeService.organization.card(id)
routeService.organization.edit(id)

Для одинаковых сущностей будет один и тот же сервис, в который будет передана переменная с url.
Для нестандартных сущностей делать новый класс

Пример:
export const organizationPath = 'organization'; //Вынесено в переменную, так используется где-нибудь в проекте

...
class RouteService(){
...
this.organization = new ModuleRoute(organizationPath)
this.employees = new ModuleRoute('employees') // строка "employees" не используется в проекте и не требует вынесения
}

Почему:

- Все ссылки будут одинаковыми для всех схожих сущностей
- Легче работать с маленькими файлами со схожей структурой
- Избежим дублирования кода для одинаковых структур
- Сервис с ссылками будет более структурированный
- Подсказки IDE будут более конкретные (10 модулей, вместо 100 методов)

15. Переписать компонент/сервис для реестров, чтобы была возможность хранить параметры в URL
    Почему:

- Не нужен костыль в виде сериализованного JSON внутри localstorage (в крайнем случае будет строка)
- Дополнительный функционал, который позволяет пользователю скопировать реестр с неким фильтром
-

18. Подключить GIT ACtions для понта и с иконкой статуса
