﻿<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="LinguaBroAuth._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <script src="Scripts/parse-srt.js"></script>
    <script src="Scripts/SubtitilesWork.js"></script>
    <!--Reference the SignalR library. -->
    <script src="Scripts/jquery.signalR-2.2.2.min.js"></script>
    <script src="Scripts/LinguaHub.js"></script>
    <!--Reference the autogenerated SignalR hub script. -->
    <script src="signalr/hubs"></script>
    <script type="text/javascript">
       
        
    </script>


    <div class="row">
        <video width="640" height="480" controls>
            <source src="https://linguabro.blob.core.windows.net/test/big_buck_bunny.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

    <div id="subs">
        <a href="#" class="sub"></a>
    </div>


</asp:Content>
