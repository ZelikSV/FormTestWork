$(document).ready(function () {

// создаем массив под базу данных машин
const cars = [];
    
// Функция подгрузки машин с базы данных в JSON
function load() {
    fetch('../cars.json')
    .then(function(response) { return response.json(); })
    .then(data => {
     cars.push(data);
    });
};

load();

// Функция проверки инпутов на наличие валидности для отображения кнопки далее
function checkInputsAll(elem) {
    if(elem.find('.form-group').hasClass('error')){
     elem.find('.btn-next').addClass('hidden');
 }else{
     elem.find('.btn-next').removeClass('hidden');
 } 
 }

//  Вешаем обработчики на кнопки далее 
 $('.btn-next').on('click', function(){
    var a = $('.blocks-info.active');
    a.next().addClass('active');
    a.removeClass('active');
    return false;
});
// Вешаем обработчики на кнопки назад 
$('.btn-prev').on('click', function(){
    var a = $('.blocks-info.active');
    a.prev().addClass('active');
    a.removeClass('active');
    return false;
});
// Находим активный блок информации
var activeBlock = $('.active');

// Функция валидации инпутов
function validateInput(elem, patern){
    var a = elem.val();
    if(!patern.test(a)){
        elem.parent().addClass('error');
    }else{
        elem.parent().removeClass('error');
    }
}
// Проверяем валидность полей введенных данных

// Имени
$('.first_name').on("change blur" ,function() {
    var n = $(this);
    var testName = /.[a-zA-Z]+$/;
    validateInput(n, testName);
 });

// Фамилии
 $('.last_name').on("change blur" ,function() {
    var n = $(this);
    var testName = /.[a-zA-Z]+$/;
    validateInput(n, testName);
 });

//  Возраста
$('.age').on('change blur', function() {
    var n = $(this);
    var testAge = /^(?:1(?:00?|\d)|[2-5]\d|[6-9]\d?)$/;
    validateInput(n, testAge);
});

// Номера водительского удостовирения
$('.driver_license').on('change blur', function() {
    var n = $(this);
    var testLicense = /^\d{8}$/;
    validateInput(n, testLicense);
    checkInputsAll(activeBlock);
});

// Номера телефона
$('.phone_number').on('change blur', function() {
    var n = $(this);
    var testNumber = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
    validateInput(n, testNumber);
});

// Email
$('.mail').on('change blur', function() {
   
    var n = $(this);
    var testMail = /.+@.+\..+/i;
    validateInput(n, testMail);
    $('.send-btn').removeAttr('disabled');
});
// Город
$('#location-search').on('change blur', function() {
    var n = $(this);
    var testCity = /^[а-я]+(?:[- ][а-я]+)*$/i;
    validateInput(n, testCity);
});


// Работаем над seleсt-ами

// Функуия выбора модели авто по выбранной марке
function checkCarsModel(elem, wrapper){
    $(wrapper).children().remove();
    $.each(elem, function (item) {
        $(wrapper).append(
            $("<option></option>").text(item).val(item)
        );
    });
}

// Выбор года выпуска авто по выбранной модели авто
function checkCarsYear(elem){
    $("#year_car").children().remove();
    $.each(elem, function (index, item) {
        $.each(item, function(i, k){
             $("#year_car").append(
            $("<option></option>").text(k).val(k)
    );
        });
    });

    // Отображаем кнопку далее для окончания заполнения формы
    $(".second-part").find('.btn-next').removeClass('hidden');
}

// Функция выбора марки авто и заполнение соответствующих полей следующих селекторов
$("#cars").change(function () {   
    if($(this).val()==='BMW'){
         checkCarsModel(cars[0].cars.bmw.models, "#model_car");
    }else if($(this).val()==='Mersedes'){
        checkCarsModel(cars[0].cars.Mersedes.models, "#model_car");
    }else if($(this).val()==='opel'){
        checkCarsModel(cars[0].cars.Opel.models, "#model_car");
    }
   
});
// Выбор модели авто с последующим заполнением след полей (год выпуска)
$("#model_car").change(function () {
    var modelOfCar = $(this).val();
    switch (modelOfCar) {
        case('x5'):
        checkCarsYear(cars[0].cars.bmw.models.x5);
        break;
        case('x6'):
        checkCarsYear(cars[0].cars.bmw.models.x6);
        break;
        case('X7'):
        checkCarsYear(cars[0].cars.bmw.models.X7);
        break;
        case('CORSA-OPC'):
        checkCarsYear(cars[0].cars.Opel.models.CORSA-OPC);
        break;
        case('GRANDLAND'):
        checkCarsYear(cars[0].cars.Opel.models.GRANDLAND);
        break;
        case('OMEGA'):
        checkCarsYear(cars[0].cars.Opel.models.OMEGA);
        break;
        case('S1'):
        checkCarsYear(cars[0].cars.Mersedes.models.S1);
        break;
        case('S2'):
        checkCarsYear(cars[0].cars.Mersedes.models.S2);
        break;
        case('S3'):
        checkCarsYear(cars[0].cars.Mersedes.models.S3);
        break;
    }
});

$('.send-btn').on('click', function(e) {
    $('.blocks-info').removeClass('active');
    $('.thanks-window').addClass('show');
    // Выводим информацию о пользователе
    console.log("Fist Name: " + $('.first_name').val());
    console.log("Last Name: " + $('.last_name').val());
    console.log("Age: " + $('.age').val());
    console.log("Your Car: " + $('#cars').val());
    console.log("Your model of car: " + $('#model_car').val());
    console.log("Your year of car: " + $('#year_car').val());
    console.log("City: " + $('#location-search').val());
    console.log("Phone: " + $('.phone_number').val());
    console.log("Your Email: " + $('.mail').val());

    return false;
});

// Закрываем благодарственное окно и очищаем инпуты
$('.close-modal').on('click', function(){
    $(this).parent().removeClass('show');
    $('.first-part').addClass('active');
    $('input').val('');
});


});
