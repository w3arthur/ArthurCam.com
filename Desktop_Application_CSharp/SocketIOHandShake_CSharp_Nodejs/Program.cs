﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebSocketSharp;

// change to C# (.NET)
// NuGet\Install-Package WebSocketSharp -Version 1.0.3-rc11

namespace SocketIOHandShake
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // Create an instance of WS Client
            WebSocket ws = new WebSocket("ws://127.0.0.1:5000/ws");   //localhost
            ws.Connect();
            //ws.Ping();
            ws.Send("message");
            Console.ReadKey();
        }
    }
}
