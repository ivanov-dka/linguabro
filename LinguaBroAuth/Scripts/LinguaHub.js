$(function () {
    // Declare a proxy to reference the hub. 
    var chat = $.connection.linguaHub;
    //синхронизация видео
    chat.client.syncTime = function (second) {
        console.log('second is ' + second);
        //если на странице видео - мотаем его
        seekToTime(second);

        //если на странице сабы - мотаем их
        seekToSub(second);
    };

    $(function () {
        //инициализация блока субтитров поверх видео
        initSubCreation();
        createSubList();
        setScroll();
    })
   

    //подключение к хабу
    $.connection.hub.start().done(function () {

        try {
            var lastTimeUpdate = 0;
            //событие перемотки видео
            $('video').get(0).ontimeupdate = function () {
                if (Date.now() - lastTimeUpdate > 500) {
                    console.log('ontimeupdate');

                    var second = parseInt(this.currentTime, 10);
                    chat.server.send(second);
                    createSub(second);

                    lastTimeUpdate = Date.now();
                }
            };
        }
        catch (e) {
            console.log('lastTimeUpdate error');
        }

        try {
            var lastTimeTranslate = 0;
            //событие клика по субтитру
            $("#subs .sub").on("click", function () {
                if (Date.now() - lastTimeTranslate > 500) {
                    fakeTranslate($(this).text());
                    //translate($(this).text());
                    lastTimeTranslate = Date.now();
                }
            });
        }
        catch (e) {
            console.log('lastTimeTranslate error');
        }
    });
});

//перемотка видео
function seekToTime(ts) {
    var video_element = $('video').get(0);

    if (Math.abs(video_element.currentTime - ts) > 2) {
        // try and avoid pauses after seeking
        video_element.pause();

        video_element.currentTime = ts; // if this is far enough away from current, it implies a "play" call as well...oddly. I mean seriously that is junk.
        // however if it close enough, then we need to call play manually
        // some shenanigans to try and work around this:
        var timer = setInterval(function () {
            if (video_element.paused && video_element.readyState == 4 || !video_element.paused) {
                video_element.play();
                clearInterval(timer);
            }
        }, 50);
    }
}

//перемотка сабов
function seekToSub(ts) {
    setSubSelected(ts);
}

//фейк перевод
function fakeTranslate(text, object) {
    object.popover({
        content: text + " ku",
        animation: "fade",
        placement: "top",
    });
    object.popover('show')
}

//перевести слово
function translate(word) {
    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170928T163527Z.fbfebe4278d9622f.bfd4d9aacf6e694e4c44897c6c3ff53e684f6f23&lang=en-ru&format=plain&text=" + word;
    $.getJSON(url, function (result) {
        if (result.status == 200) {
            var translation = result.responseJSON.text[0];
            console.log('translation: ' + translation);
            showTranslation(translation);
        }
    });
}

function showTranslation(word) {

}

//настройка скролла
function setScroll() {
    //console.clear();
   
    const THRESH = 10;

    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);

    if ($('#subsList').length == 0)
        return;

    const items = $$("li");
    const style = getComputedStyle(document.body);
    // const chromeWidth = style.getPropertyValue("--chrome");
    const chromeWidth = 22.5;

    const setCustomProperty = (property, value) => {
        style.setProperty("--${property}", value);
    };

    let notchRect = $(".notch").getBoundingClientRect();

    window.addEventListener("resize", () => {
        notchRect = $(".notch").getBoundingClientRect();
    });

    bumpItems();

    $(".inner").onscroll = onScroll;

    function onScroll(e) {
        window.requestAnimationFrame(bumpItems);
    }

    function bumpItems() {
        for (let item of items) {
            const itemRect = item.getBoundingClientRect();
            const distFromBottom = itemRect.top - notchRect.bottom;
            const distFromTop = itemRect.bottom - notchRect.top;

            if (Math.abs(distFromTop) < THRESH) {
                item.style.transform = `translateX(${lerp(
                    0,
                    chromeWidth,
                    (distFromTop + THRESH) / (THRESH * 2)
                )}px)`;
            } else if (
                distFromTop > 0 &&
                Math.abs(distFromBottom) > THRESH &&
                distFromBottom < 0
            ) {
                item.style.transform = `translateX(${chromeWidth}px)`;
            } else if (Math.abs(distFromBottom) < THRESH) {
                item.style.transform = `translateX(${lerp(
                    chromeWidth,
                    0,
                    (distFromBottom + THRESH) / (THRESH * 2)
                )}px)`;
            } else {
                item.style.transform = `translateX(0)`;
            }
        }
    }

    function lerp(v0, v1, t) {
        return v0 * (1 - t) + v1 * t;
    }
}