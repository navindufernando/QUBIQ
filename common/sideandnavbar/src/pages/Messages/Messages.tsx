import React, { useState, useRef, useEffect } from 'react';
import { Send, Search } from 'lucide-react';


interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'user' | 'ASANA';
}

interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

const ChatInbox = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: 'Inuthi',
      messages: [
        {
          id: 1,
          text: "Hi Navindu,\nAre you free for a quick call?",
          timestamp: "10:34 AM",
          sender: "ASANA"
        },
        {
          id: 2,
          text: "Yes, I'm free",
          timestamp: "8:54 PM",
          sender: "user"
        }
      ]
    },
    {
      id: 2,
      name: 'Timothy',
      messages: [
        {
          id: 3,
          text: "I will schedule a meeting",
          timestamp: "9:38 PM",
          sender: "ASANA"
        }
      ]
    },
    {
      id: 3,
      name: 'ASANA',
      messages: [
        {
          id: 4,
          text: "Reminder on today's design review meeting",
          timestamp: "1:05 PM",
          sender: "ASANA"
        }
      ]
    }
  ]);

  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: selectedChat.messages.length + 1,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'user'
      };
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, message]
      };
      setChats(chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat));
      setSelectedChat(updatedChat);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter chats based on search query
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-purple-50 h-[650px]">
      {/* Chat Inbox */}
      <div className="flex flex-col w-3/4">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-3 border-b bg-white">
          <span className="text-gray-600 text-sm">
            {selectedChat ? `${selectedChat.name} - last seen 25 min ago` : 'Select a chat'}
          </span>
          <img
            src="" // Replace with your logo URL
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {selectedChat ? (
            selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-2 ${
                    message.sender === 'user' ? 'bg-white text-black' : 'bg-white text-black'
                  }`}
                >
                  {/* ✅ Display chat person's name instead of "ASANA" */}
                  {message.sender !== 'user' && (
                    <div className="text-orange-500 font-semibold mb-1">
                      {selectedChat?.name} {/* Dynamic chat name */}
                    </div>
                  )}

                  <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                  <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
                </div>
              </div>
            ))
          ) : (
            <p>Select a chat to view messages</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {selectedChat && (
          <div className="p-3 bg-white border-t">
            <div className="flex items-center space-x-2">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a message..."
                className="flex-1 resize-none rounded-lg p-2 focus:outline-none min-h-[36px] max-h-[100px] text-sm"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/*Right Sidebar */}
      <div className="w-1/4 bg-[#E2DDFF] ">
        {/* Search Bar */}
        <div className="p-3 border-b">
          <div className="flex items-center space-x-2 bg-white rounded-lg p-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto h-[calc(100%-400px)]">
          {filteredChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-3 hover:bg-[#D1C8FF] cursor-pointer ${
                selectedChat?.id === chat.id ? 'bg-[#D1C8FF]' : ''
              }`}
            >
              <strong>{chat.name}</strong>
            </div>
          ))}
        </div>

        {/* Options Section */}
        <div className="flex flex-col p-6 bg-white rounded-lg m-3">
  {/* Options Heading */}
  <div className="mb-3">
    <h1 className="font-semibold text-xl text-left mr-2"><b>Options</b></h1> 
    <img src = "/assets/logo.png" alt="Logo" className='w-5 h-4'/>
  </div>

  {/* Buttons */}
  <div className="w-full space-y-4.5">
    <button className="w-full p-2.5 bg-[#C3BAFF] text-left rounded-lg hover:bg-[#A9A0FF]">
      <center><b>Create a group</b></center>
    </button>
    <button className="w-full p-2.5 bg-[#C3BAFF] text-left rounded-lg hover:bg-[#A9A0FF]">
      <center><b>Delete messages</b></center>
    </button>
    <button className="w-full p-2.5 bg-[#C3BAFF] text-left rounded-lg hover:bg-[#A9A0FF]">
      <center><b>Personal chats</b></center>
    </button>
    <button className="w-full p-2.5 bg-[#C3BAFF] text-left rounded-lg hover:bg-[#A9A0FF]">
      <center><b>Board meetings</b></center>
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default ChatInbox;
