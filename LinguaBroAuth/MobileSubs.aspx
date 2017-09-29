﻿<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Mobile.Master" AutoEventWireup="true" CodeBehind="MobileSubs.aspx.cs" Inherits="LinguaBroAuth.MobileSubs" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <!--Reference the SignalR library. -->
    <script src="Scripts/jquery.signalR-2.2.2.min.js"></script>
    <script src="Scripts/parse-srt.js"></script>
    <script src="Scripts/SubtitilesWork.js"></script>
    <script src="Scripts/LinguaHub.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <script src="signalr/hubs"></script>
    <script type="text/javascript">
        $(function () {
            $("#subsList").on("click", "a", function () {
                var link = $(this).text();
                var text = $(this).parent().text();

                var result = "";
                $(text.split(' ')).each(function (i, val) {
                    if (val != "") {
                        if (val == link.trim()) {
                            result += "<span class='selected'>" + val + "</span> "
                        }
                        else {
                            result += val + " ";
                        }
                    }
                })

                chat.server.pauseVideo();

                $('.modal-header p').html(result);
                $("#myModal").modal();

                $('.word').text(link);
                showTranslatedWorldInModal(link);
            });

            $("#myModal").on("click", ".close", function () {
                chat.server.playVideo();
            });
        })
    </script>

    <style>
        :root {
            --width: 100vw;
            --height: 100vh;
            --max-height: 100%;
            --chrome: 22.5px;
            --outer-border-radius: 25px;
            --thumb-radius: 0px;
        }

        html {
            box-sizing: border-box;
        }

        * {
            box-sizing: inherit;
        }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: black; /*radial-gradient(turquoise, midnightblue);*/
            font-weight: lighter;
            font-size: 15px;
            margin: 0px;
        }

        .outer {
            position: relative;
            margin: 0 auto;
            width: var(--width);
            height: var(--height);
            border-radius: var(--outer-border-radius);
            border: solid 0px buttonface;
            display: flex;
            align-items: center;
        }

        .inner {
            background: white;
            /*   position: absolute; */
            margin: 0 auto;
            width: calc(100% - var(--chrome));
            height: calc(100% - var(--chrome));
            border-radius: calc(var(--chrome) - 10px);
            overflow-y: scroll;
            overflow-x: hidden;
        }

        .notch {
            position: absolute;
            background: orange;
            width: 3%;
            max-width: 20px;
            height: 50%;
            top: 30%;
            left: calc(var(--chrome)/2);
            border-radius: 0 10px 10px 0;
        }

        ul {
            padding-left: calc(var(--chrome)/4);
            padding-right: 10px;
            margin: 5px 0;
            overflow: hidden;
        }

        li {
            list-style: none;
            padding: 5px 5px;
            border-bottom: 1px solid #dadada;
            transform-origin: center left;
        }

        *::-webkit-scrollbar {
            width: 5px;
            padding: 100px;
            transform: scalex(10);
        }

        *::-webkit-scrollbar-thumb {
            border-radius: var(--thumb-radius);
            background-color: #5555;
            padding-right: 5px;
            transform: scalex(10);
        }

        .selected {
            font-weight: bold;
        }


        #subsList a {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        #subsList li:hover {
            background: rgba(0, 0, 0, 0.05);
            cursor: pointer;
        }

        .header1 {
            background: orange;
            color: white;
            padding: 10px;
            display: block;
            position: relative;
            width: 100%;
            text-align: center;
        }

        .trmodal {
            width: 100%;
            height: 100vh;
            padding: 0;
            border: 0;
            position: relative;
            left: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        .modal-content {
            background: none;
            border-radius: 0;
            height: auto;
            min-height: 100%;
            border-radius: 0;
        }

        .modal-header {
            background: rgba(0, 0, 0, .8);
            color: white;
            border: 0px;
            padding: 20px 40px;
            height: 30vh;
            padding-top: 40px;
        }

        .modal-footer {
            margin-top: 0px;
            background: white;
            height: 70vh;
        }

        .translation {
            margin-bottom: 40px;
            text-align: left;
            font-size: 30px;
            margin-left: 40px;
        }

        .word {
            text-align: left;
            font-size: 40px;
        }

        .trmodal .selected {
            padding: 5px;
            border-radius: 5px;
            background: cadetblue;
        }

        .close {
            float: right;
            font-size: 30px;
            font-weight: bold;
            line-height: 1;
            color: white;
            text-shadow: 0 1px 0 #fff;
            opacity: .6;
            filter: alpha(opacity=20);
        }

        .close:hover, .close:focus {
            color: white;
            text-decoration: none;
            cursor: pointer;
            opacity: .9;
            filter: alpha(opacity=50);
        }
    </style>

    <div>

        <div class="outer">
            <div class="inner">
                <div class="header1">Друзья, сезон 2, серия 3 </div>
                <ul id="subsList">
                </ul>
                <div class="notch"></div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog trmodal">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="form-group">
                        <p>After two years, Hell's Angels has finally finished filming</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <p class="word"></p>
                    <p class="translation"></p>
                    <button type="submit" class="btn btn-default btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-plus"></span>Добавить в словарь</button>

                </div>
            </div>
        </div>
    </div>


</asp:Content>
