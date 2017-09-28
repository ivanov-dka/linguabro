﻿<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="LinguaBroAuth._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <script src="Scripts/jquery-1.10.2.min.js"></script>
    <!--Reference the SignalR library. -->
    <script src="Scripts/jquery.signalR-2.2.2.min.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <script src="signalr/hubs"></script>
    <script type="text/javascript">
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
                       
            //подключение к хабу
            $.connection.hub.start().done(function () {

                var lastTimeUpdate = 0;
                //событие перемотки видео
                $('video').get(0).ontimeupdate = function () {
                    if (Date.now() - lastTimeUpdate > 500) {
                        console.log('ontimeupdate');

                        var second = parseInt(this.currentTime, 10);
                        chat.server.send(second);

                        lastTimeUpdate = Date.now();
                    }
                };                

                var lastTimeUpdate = 0;
                //событие клика по субтитру
                $("#subs .sub").on("click", function () {
                    fakeTranslate($(this).text());
                    //translate($(this).text());
                });
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

        }

        //фейк перевод
        function fakeTranslate(word) {
            console.log('translation: ' + translation);
            showTranslation(translation);
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
    </script>

    <div class="jumbotron">
        <h1>ASP.NET</h1>
        <p class="lead">ASP.NET is a free web framework for building great Web sites and Web applications using HTML, CSS, and JavaScript.</p>
        <p><a href="http://www.asp.net" class="btn btn-primary btn-lg">Learn more &raquo;</a></p>
    </div>


    <div class="row">
        <video width="640" height="480" controls>
            <source src="https://linguabro.blob.core.windows.net/test/big_buck_bunny.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

    <div id="subs">
        <a href="#" class="sub">hello</a>
    </div>
    

</asp:Content>
