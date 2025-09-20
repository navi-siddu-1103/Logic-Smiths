
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bot, User, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { aiChatConversation } from '@/ai/flows/ai-chat-conversation';
import type { AIChatConversationInput } from '@/ai/flows/ai-chat-conversation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import BotLogo from '@/components/bot-logo';
import UserLogo from '@/components/user-logo';

interface Message {
  role: 'user' | 'assistant' | 'tool';
  content: any;
  navigation?: {
    page: string;
    text: string;
  };
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonImageError, setButtonImageError] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([
        { role: 'assistant', content: "Namaste! I'm here to listen. How can I help you right now?" }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    const scrollViewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (scrollViewport) {
      scrollViewport.scrollTo({
        top: scrollViewport.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = newMessages.slice(0, -1).map(msg => ({ role: msg.role, content: msg.content }));
      const payload: AIChatConversationInput = {
        message: input,
        conversationHistory: conversationHistory
      };
      const result = await aiChatConversation(payload);
      const assistantMessage: Message = { role: 'assistant', content: result.response, navigation: result.navigation };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error with AI chat:', error);
      const errorMessage: Message = { role: 'assistant', content: "I'm having a little trouble connecting right now. Please try again in a moment." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] max-w-sm z-50"
          >
            <Card className="h-[60vh] flex flex-col shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="flex items-center gap-3">
                   <Avatar className="h-9 w-9 border">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  <CardTitle className="font-headline text-lg">Chat with your Assistant</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 flex-1 flex flex-col min-h-0">
                 <ScrollArea className="flex-1" ref={scrollAreaRef}>
                    <div className="p-4 sm:p-6 space-y-6">
                      {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                          {message.role === 'assistant' && (
                            <Avatar className="h-8 w-8 border shrink-0">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <BotLogo size={16} className="rounded-full" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`rounded-lg px-3 py-2 max-w-[85%] whitespace-pre-wrap text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
                            {message.content}
                            {message.navigation && (
                                <Button asChild className="mt-2">
                                    <Link href={message.navigation.page}>
                                        {message.navigation.text}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                          </div>
                          {message.role === 'user' && (
                            <Avatar className="h-8 w-8 border shrink-0">
                              <AvatarFallback>
                                <UserLogo size={16} className="rounded-full" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                      {isLoading && (
                         <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 border shrink-0">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    <BotLogo size={16} className="rounded-full" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg px-3 py-2 max-w-[85%] bg-card border space-y-2">
                                <Skeleton className="h-3 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="border-t p-4">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                        disabled={isLoading}
                        autoComplete="off"
                      />
                      <Button type="submit" disabled={isLoading || !input.trim()}>
                        Send
                      </Button>
                    </form>
                  </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className={cn(
            "fixed bottom-6 right-4 sm:right-6 h-16 w-16 rounded-full shadow-lg z-50 transition-transform duration-300 ease-in-out p-0 overflow-hidden bg-transparent border-0",
            isOpen && "scale-0"
            )}
        onClick={() => setIsOpen(true)}
        aria-label="Open Chat"
      >
        {!buttonImageError ? (
          <Image
            src="/images/logo_bot.jpg"
            alt="Chat Bot"
            width={64}
            height={64}
            className="w-full h-full rounded-full object-cover"
            onError={() => setButtonImageError(true)}
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
            <Bot className="w-8 h-8 text-white" />
          </div>
        )}
      </Button>
    </>
  );
}
