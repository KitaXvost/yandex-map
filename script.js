// Функция ymaps.ready() будет вызвана, когда
   // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
   ymaps.ready(init);

   function init() {
       // Создание карты.
       // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/map-docpage/
       var myMap = new ymaps.Map("map", {
           // Координаты центра карты.
           // Порядок по умолчнию: «широта, долгота».
           center: [55.748, 37.624],
           // Уровень масштабирования. Допустимые значения:
           // от 0 (весь мир) до 19.
           zoom: 12,
           // Элементы управления
           // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/controls/standard-docpage/
           controls: [
               'zoomControl', // Ползунок масштаба
           ]
       });

       // Добавление метки
       // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
       var myPlacemark = new ymaps.Placemark([55.748, 37.624], {}, {
           'preset': 'islands#dotIcon'
       });

       // После того как метка была создана, добавляем её на карту.
       myMap.geoObjects.add(myPlacemark);

       // Рисуем полигон
       // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/
       var myPolygon = new ymaps.Polygon([
           // Координаты внешнего контура
           [
                    [55.74699276295599, 37.58251563287506],
                    [55.7588413940383, 37.584390549799195],
                    [55.764046734639265, 37.58835553806947],
                    [55.76957988956998, 37.5963469873303],
                    [55.77257092446132, 37.60486095438763],
                    [55.773539071537, 37.617401382359674],
                    [55.77364280015361, 37.62404043256745],
                    [55.772363461252816, 37.6354743523051],
                    [55.76945886028385, 37.64617059966303],
                    [55.768421450296046, 37.64988969712456],
                    [55.7642542422459, 37.656006229491915],
                    [55.75993094149642, 37.65769672826592],
                    [55.75719836823282, 37.65772746461507],
                    [55.751334796010475, 37.65591402036132],
                    [55.743619136888405, 37.655022666394316],
                    [55.74041824759744, 37.65225639548474],
                    [55.73152358785193, 37.638117677567266],
                    [55.72975825861788, 37.623763805312144],
                    [55.72984479621593, 37.61211473135447],
                    [55.73841044122875, 37.58635335073437],
                  ],
           [] // Координаты внутреннего контура
       ], {}, {
           // Курсор в режиме добавления новых вершин.
           editorDrawingCursor: "crosshair",
           // Максимально допустимое количество вершин.
           editorMaxPoints: 20,
           fill: true, // Наличие заливки
           fillColor: 'ff240045', // Цвет заливки.
           strokeColor: 'ff2b2b65', // Цвет обводки.
           strokeWidth: 3, // Ширина обводки.

           // Убираем возможность добавлять внутренний контур в режиме редактирования
           editorMenuManager: function (t) {
               return t.filter(function (t) {
                   return "addInterior" !== t.id
               });
           }
       });

       myMap.geoObjects.add(myPolygon);

       // Включаем режим редактирования полигона
       $('#startDrawing').on('click', function () {
           myPolygon.editor.startDrawing();
       });

       // Отключаем режим редактирования полигона
       $('#stopDrawing').on('click', function () {
           myPolygon.editor.stopDrawing();
           myPolygon.editor.stopEditing();
       });

       // Определяем площадь полигона
       // Для расчета площади используется модуль mapsapi-area
       // https://github.com/yandex/mapsapi-area
       ymaps.ready(['util.calculateArea']).then(function () {

           $('#map').on('click', function() {
             area();
             });

             function area(){
               // Вычисляем площадь геообъекта.
               var area = Math.round(ymaps.util.calculateArea(myPolygon));

               // Если площадь превышает 1 000 000 м², то приводим ее к км².
               if (area <= 1e6) {
                   area += ' м²';
               } else {
                   area = (area / 1e6).toFixed(3) + ' км²';
               }
                $("#square").text('Площадь полигона ' + area);
             }
              area();
           });



   }
