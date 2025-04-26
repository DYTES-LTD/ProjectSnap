// @ts-nocheck
import { useState } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import { nanoid } from "nanoid";
import ParticipantManager from "../components/ParticipantManager";
import ChatPreview from "../components/ChatPreview";
import MessageComposer from "../components/MessageComposer";
import ChatSettings from "../components/ChatSettings";

const defaultParticipants = [
  { id: "1", name: "Me", color: "#FF69B4", icon: "user" },
  { id: "2", name: "Jack", color: "#4CAF50", icon: "user" },
];

const defaultMessages = [
  {
    id: nanoid(),
    senderId: "2",
    text: "Hey! How are you?",
    timestamp: Date.now() - 3600000,
  },
  {
    id: nanoid(),
    senderId: "1",
    text: "I'm good! Just finished work. Want to grab dinner?",
    timestamp: Date.now() - 3300000,
  },
  {
    id: nanoid(),
    senderId: "2",
    text: "Sure! Where do you want to go?",
    timestamp: Date.now() - 3000000,
  },
];

const defaultSettings = {
  headerTitle: "👻 Snapchat",
  dayLabel: "Today",
  backgroundColor: "#ffffff",
};

export default function Home() {
  const [participants, setParticipants] = useState(defaultParticipants);
  const [messages, setMessages] = useState(defaultMessages);
  const [settings, setSettings] = useState(defaultSettings);

  const handleDownload = async () => {
    const element = document.getElementById("chat-preview");
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const link = document.createElement("a");
      link.download = "snapchat-chat.png";
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Snapchat Chat Mockup Generator
          </h1>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Download size={20} />
            Download as Image
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ChatSettings settings={settings} onUpdate={setSettings} />
            <ParticipantManager
              participants={participants}
              onUpdate={setParticipants}
            />
            <MessageComposer
              participants={participants}
              onSend={(message) => setMessages([...messages, message])}
            />
          </div>

          <div className="sticky top-8">
            <ChatPreview
              messages={messages}
              participants={participants}
              settings={settings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
