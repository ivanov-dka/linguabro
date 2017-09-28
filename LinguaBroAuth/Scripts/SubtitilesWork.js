var subData;
var subText;

//на инициализации создаем массив объектов субтитров в глобальной переменной
function initSubCreation(subText) {

    subData = parseSRT(subText);
}
// подставляем субтитры под текущий timestamp
function createSub(second) {
    for (var i = 0; i < subData.length; i++) {
        //если текущий timestamp находится в промежутке timestamp объекта субтитров, берем текст и объекта
        if (second < subData[i].end && second > subData[i].start) {
            var subText = subData[i].text.match(/[^ ]+/g)
            //очищаем текущий контейнер субтитров
            $('#subs').html('');
            //заполняем его набором субтитров
            for (var i = 0; i < subText.length; i++) {
                $('#subs').append('<a href="#">' + ' ' + subText[i] + ' '  + '</a>')
            }
            $('#subs a').click(function () {
                fakeTranslate($(this).text(), $(this));
            });
            return;
        }
    }
    // если текущий timestamp не находится ни в одном из промежутков значит субтитров быть не должно
    $('#subs').html('');
}