var subData = `1
00:00:04,700 --> 00:00:06,736
where are you going so early?

2
00:00:06,900 --> 00:00:09,494
Don't record any more messages
on my alarm clock.

3
00:00:09,660 --> 00:00:11,252
why not?

4
00:00:11,420 --> 00:00:13,888
I'll start to think we're married
or something.

5
00:00:14,060 --> 00:00:15,732
Don't ever say that word.

6
00:00:15,900 --> 00:00:20,132
I'll never bring you chicken soup
and fuck your brains out again.

7
00:00:20,700 --> 00:00:25,774
- How's your cold?
- Still there. How about yours?

8
00:00:25,940 --> 00:00:29,649
- You definitely took my mind off it.
- Really?

9
00:00:30,540 --> 00:00:32,690
Yes!

10
00:00:39,420 --> 00:00:41,376
Juliana here.

11
00:00:41,540 --> 00:00:45,010
Hi, Rayna. I missed my audition,
I lost my head!

12
00:00:45,180 --> 00:00:46,977
Listen, I have to go.

13
00:00:47,140 --> 00:00:49,017
I'm with David.

14
00:00:52,740 --> 00:00:57,939
Help yourself to whatever you want.
Set the alarm before you go. And...

15
00:01:00,100 --> 00:01:01,738
You are the greatest.

16
00:01:02,540 --> 00:01:06,579
- Bye, honey!
- Bye, honey. I'll call you later.

17
00:01:06,740 --> 00:01:07,968
when?

18
00:01:09,060 --> 00:01:11,255
- When?
- Soon!

`;
var subText;
//на инициализации создаем массив объектов субтитров в глобальной переменной
function initSubCreation() {

    var test = $.ajax({
        type: "GET",
        url: "https://linguabro.blob.core.windows.net/test/The%20Raven.2010.HDRip-AVC%20(720).eng.txt",
        cache: false,
        async: false
    }).responseText;
    if (test) {
        subData = parseSRT(test);
    }
    else {
        subData = parseSRT(subData);
    }
    
    var video = $('video').get(0);
    if (video) {
        video.onwebkitfullscreenchange = function () {
            $('#subs span').popover('hide');
            $('#subs span').removeClass('word_selected');
            if (video.webkitDisplayingFullscreen) {
                $("#subs").css('width', window.innerWidth)
                $("#subs").removeClass('smallFont');
                $("#subs").addClass('largeFont');

            }
            else {
                $("#subs").css('width', video.width)
                $("#subs").addClass('smallFont');
                $("#subs").removeClass('largeFont');
            }
        }
    }
}

//выбираем саб для видео
function setSubSelected(second) {

    $('#subsList li.selected').removeClass('selected');
    $('#subsList li').each(function () {

        second = parseFloat(second);
        var start = parseFloat($(this).attr('data-start'));
        var end = parseFloat($(this).attr('data-end'));
        if (start <= second && second <= end) {
            $(this).addClass('selected');
            console.log($(this).text());
            console.log('top: ' + $(this).offset().top);
            console.log('scrollTop: ' + $('.inner')[0].scrollTop);

            $('.inner').animate({
                scrollTop: $(this).offset().top + $('.inner')[0].scrollTop - 100
            }, 200);
            
            return true;
        }

    });
}

//создаем список сабов
function createSubList() {
    var subsList = "";
    for (var i = 0; i < subData.length; i++) {
        var subText = subData[i].text.replace(/<br\/>/g, ' ').replace(/<br>/g, ' ').match(/[^ ]+/g)
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
    video = $('video').get(0);
    //if (video.paused) return;
    for (var i = 0; i < subData.length; i++) {
        //если текущий timestamp находится в промежутке timestamp объекта субтитров, берем текст и объекта
        if (second < subData[i].end && second > subData[i].start) {
            var subText = subData[i].text.match(/[^ ]+/g)
            //очищаем текущий контейнер субтитров
            $('#subs').html('');
            //заполняем его набором субтитров
            for (var j = 0; j < subText.length; j++) {
                $('#subs').append('<span>' + ' ' + subText[j] + ' ' + '</span>')
            }
            $('#subs span').click(function () {
                if ($(this).hasClass('word_selected')) return;
                $(".word_selected").removeAttr('title')
                $(".word_selected").removeAttr('data-original-title')
                $('#subs span').removeClass('word_selected');
                $('#subs span').popover('hide');
                video.pause();
                $(this).addClass('word_selected')
                showTranslatedWorldInVideoSub($(this).text(), $(this));
            });
            return;
        }
    }
    // если текущий timestamp не находится ни в одном из промежутков значит субтитров быть не должно
    $('#subs').html('');
}

