var subData;
var subText;


function initSubCreation(subText) {

    subData = parseSRT(subText);
}

function createSub(second) {
    for (var i = 0; i < subData.length; i++) {
        if (second < subData[i].end && second > subData[i].start) {
            var subText = subData[i].text.match(/[^ ]+/g)
            $('#subs').html('');
            for (var i = 0; i < subText.length; i++) {
                $('#subs').append('<a href="#">' + ' ' + subText[i] + ' '  + '</a>')
            }
            return;
        }
    }
    $('#subs').html('');
}