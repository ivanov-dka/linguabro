using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace LinguaBroAuth
{
    public class LinguaHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        public void Send(string second)
        {
            // Call the broadcastMessage method to update clients.
            Clients.AllExcept(Context.ConnectionId).syncTime(second);
        }

        public void PauseVideo()
        {
            Clients.AllExcept(Context.ConnectionId).pauseVideo();
        }

        public void PlayVideo()
        {
            Clients.AllExcept(Context.ConnectionId).playVideo();
        }

    }
}