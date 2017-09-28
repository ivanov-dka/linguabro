var subData = `1
                00:00:02,000 --> 00:00:06,000
                Субтитры с первой по шестую секунду

                2
                00:00:10,967 --> 01:30:30,958
                Субтитры с 10 и далее`;
var subText;

//на инициализации создаем массив объектов субтитров в глобальной переменной
function initSubCreation() {
    var test = $.ajax({
        type: "GET",
        url: "https://linguabro.blob.core.windows.net/test/vsshort-en.txt",
        cache: false,
        async: false
    }).responseText;
    if (test) {
        subData = parseSRT(test);
    }
    else {
        subData = parseSRT(subData);
    }
}

//выбираем саб для видео
function setSubSelected(second) {
    $('#subsList li').each(function () {
        $('#subsList li.selected').removeClass('.selected');

        var start = parseInt($(this).attr('data-start'), 10);
        var end = parseInt($(this).attr('data-end'), 10);
        if (start <= second && second <= end) {
            $(this).addClass('selected');
            return true;
        }
       
    });
}

//создаем список сабов
function createSubList() {
    var subsList = "";
    for (var i = 0; i < subData.length; i++) {
        var subText = subData[i].text.match(/[^ ]+/g)
        subsList += '<li data-start="' + subData[i].start + '" data-end="' + subData[i].end + '">'
        for (var j = 0; j < subText.length; j++) {
            subsList += '<a href="#" >' + ' ' + subText[j] + ' ' + '</a>';
        }
        subsList += '</li>'
    }

    $('#subsList').append(subsList);
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
            for (var j = 0; j < subText.length; j++) {
                $('#subs').append('<a href="#">' + ' ' + subText[j] + ' '  + '</a>')
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

