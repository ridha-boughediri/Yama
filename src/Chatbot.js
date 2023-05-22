import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { GiftedChat } from "react-native-gifted-chat-expo";

function ChatbotScreen() {
  const [messages, setMessages] = useState([]);

  const MON_CHATGPT_TOKEN =
    "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";

  const handleSend = async (newMessages = []) => {
    try {
      const userMessage = newMessages[0];
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );

      const messageText = userMessage.text.toLowerCase();
      const keywords = [
        "New England Patriots",
        "Kansas City Chiefs",
        "San Francisco 49ers",
        "Green Bay Packers",
        "Dallas Cowboys",
        "Seattle Seahawks",
        "Pittsburgh Steelers",
        "Baltimore Ravens",
        "New Orleans Saints",
        "Los Angeles Rams",
        "Philadelphia Eagles",
        "Minnesota Vikings",
        "Denver Broncos",
        "Indianapolis Colts",
        "Chicago Bears",
        "Las Vegas Raiders",
        "Tampa Bay Buccaneers",
        "Arizona Cardinals",
        "Houston Texans",
        "Tennessee Titans",
        "Cleveland Browns",
        "Atlanta Falcons",
        "Detroit Lions",
        "Carolina Panthers",
        "Buffalo Bills",
        "Los Angeles Chargers",
        "Miami Dolphins",
        "Washington Football Team",
        "New York Giants",
        "New York Jets",
        "Cincinnati Bengals",
        "Jacksonville Jaguars",
      ];

      if (!keywords.some((keyword) => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "Je suis votre bot sportif. Comment puis-je vous aider ?",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Bot sportif",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
        return;
      }

      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          prompt: `Obtenir une news ${messageText}`,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MON_CHATGPT_TOKEN}`,
          },
        }
      );

      const recipe = response.data.choices[0].text.trim();

      const botMessage = {
        _id: new Date().getTime() + 1,
        text: recipe,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot sportif americain",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#F5F5F5",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          marginTop: 40,
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Bot Alimentaire
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
}

export default ChatbotScreen;
