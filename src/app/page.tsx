
'use client';

import { useState, useRef, useEffect, type FormEvent, memo, useMemo } from 'react';
import Link from 'next/link';
import { Bot, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { aiChatConversation } from '@/ai/flows/ai-chat-conversation';
import type { AIChatConversationInput } from '@/ai/flows/ai-chat-conversation';
import { Skeleton } from '@/components/ui/skeleton';
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

// Memoized loading skeleton component
const MessageSkeleton = memo(() => (
  <div className="flex items-start gap-3">
    <div className="h-9 w-9 border rounded-full overflow-hidden flex-shrink-0 bg-muted animate-pulse">
      <div className="w-full h-full bg-muted-foreground/20 rounded-full" />
    </div>
    <div className="rounded-lg px-4 py-3 max-w-[80%] bg-card border space-y-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-40" />
    </div>
  </div>
));

MessageSkeleton.displayName = 'MessageSkeleton';

// Memoized message component for better performance
const MessageItem = memo(({ message, index }: { message: Message; index: number }) => (
  <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
    {message.role === 'assistant' && (
      <div className="h-9 w-9 border rounded-full overflow-hidden flex-shrink-0">
        <BotLogo size={36} className="w-full h-full rounded-full object-cover" />
      </div>
    )}
    <div className={`rounded-lg px-4 py-3 max-w-[80%] whitespace-pre-wrap ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card border'}`}>
       <p className="text-sm">{message.content}</p>
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
      <div className="h-9 w-9 border rounded-full overflow-hidden flex-shrink-0">
        <UserLogo size={36} className="w-full h-full rounded-full object-cover" />
      </div>
    )}
  </div>
));

MessageItem.displayName = 'MessageItem';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Memoize initial message to prevent re-creation
  const initialMessage = useMemo(() => ([
    { role: 'assistant' as const, content: "Namaste! I'm here to listen and support you. How are you feeling today?" }
  ]), []);

  useEffect(() => {
    const scrollViewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (scrollViewport) {
      scrollViewport.scrollTo({
        top: scrollViewport.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setMessages(initialMessage);
  }, [initialMessage]);

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
    <div className="flex h-[calc(100vh-8rem)] flex-col -m-4 md:-m-6 bg-background">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 sm:p-6 space-y-6">
          {messages.map((message, index) => (
            <MessageItem key={index} message={message} index={index} />
          ))}
          {isLoading && <MessageSkeleton />}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-background/95 sticky bottom-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell me what's on your mind..."
            className="flex-1"
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
}
