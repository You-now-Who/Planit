import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import TypingAnimation from "../components/TypingAnimation";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);
    
    setInputValue('');
  }

  const sendMessage = (message) => {
    const url = '/api/chat';

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message }]
    };

    setIsLoading(true);

    axios.post(url, data).then((response) => {
      console.log(response);
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }

  return (
    <div>
      {/* <button onClick={toggleOpen}>
        {isOpen ? 'Collapse' : 'Expand'}
      </button> */}
      
        
        {isOpen && (
            <div className="container mx-auto max-w-[410px] rounded-lg fixed bottom-1 right-1 bg-[#1e293b] overflow-x-hidden h-[500px] overflow-y-scroll">
                <div className="flex flex-col h-full">
                    <h1 className="bg-gradient-to-r text-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">PlanIT-BOT</h1>
                    <div className="flex-grow p-6">
                    <div className="flex flex-col space-y-4">
                        {chatLog.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                            message.type === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div
                            className={`${
                                message.type === 'user' ? 'bg-blue-500' : 'bg-gray-700'
                            } rounded-lg p-4 text-white max-w-sm`}
                            >
                            {message.message}
                            </div>
                        </div>
                        ))}
                        {isLoading && (
                        <div key={chatLog.length} className="flex justify-start">
                            <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                            <TypingAnimation />
                            </div>
                        </div>
                        )}
                    </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex-none p-6">
                    <div className="flex rounded-lg border fixed bottom-2 border-gray-700 bg-gray-800">
                        <input
                        type="text"
                        className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        />
                        
                    </div>
                    </form>
                </div>
            </div>
          )}

          <button className="fixed bottom-2 right-2 px-6 py-3 bg-purple-500 rounded-lg text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300" onClick={toggleOpen}>
                    {isOpen ? 'Close Chat' : 'Open Chat'}
          </button>
      
    </div>
  )
}

