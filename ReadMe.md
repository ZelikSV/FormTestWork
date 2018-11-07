
Создать html-форму, например для страхования авто, форма состоит из трех шагов, переход к следующему шагу без перезагрузки страницы, прежде чем открыть новый шаг валидировать поля.
1 шаг: поля (First Name - required, Last Name - required, Age - required, Driver License - required)

2 шаг: поля связанные при выборе одного подтягиваем данные следующего, данные хранятся в JSON 
(Make (car brand) - required -> Model - required -> Year - required) 
данных будет достаточно для примера по 2-3 позиции в каждом списке.

3 шаг: поля (City - required, Phone - required, Email - optional)
По окончании заполнения формы отправить все поля в console. А на форме показать Thank You Message.
Для внешнего вида можно использовать bootstrap. Из библиотек - jquery.