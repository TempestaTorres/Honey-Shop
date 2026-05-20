import { Component, effect, ElementRef, OnDestroy, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ChatBoxService } from './chat-box-service';
import { Subscription } from 'rxjs';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}
const CHAT_STORAGE_KEY = 'chat_messages';

@Component({
  selector: 'app-chat-box',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.css',
})
export class ChatBox implements OnInit, OnDestroy {
  public messages: WritableSignal<ChatMessage[]> = signal<ChatMessage[]>([]);

  public isOpen: WritableSignal<boolean> = signal<boolean>(false);
  public newMessage: WritableSignal<string> = signal<string>('');
  public isTyping: WritableSignal<boolean> = signal<boolean>(false);

  private chatContainer = viewChild<ElementRef<HTMLDivElement>>('chatContainer');
  private audioContext: AudioContext | null = null;

  private subscription$: Subscription | undefined;

  constructor(private chatBoxService: ChatBoxService,) {

    this.loadMessagesFromStorage();

    effect(() => {

      this.saveMessagesToStorage();

      if (this.messages().length > 0) {

        this.scrollToBottom();
      }
    });
  }

  ngOnInit() {
    this.subscription$ = this.chatBoxService.chatBoxOpen$.subscribe(state => {
      this.isOpen.set(state);
    });
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  public toggleChat(): void {
    this.isOpen.update((v) => !v);
  }

  public sendMessage(): void {
    const text = this.newMessage().trim();
    if (!text) return;

    // Add user message
    this.messages.update((msgs) => [...msgs,
      {
        id: Date.now(),
        text: text,
        isUser: true,
        timestamp: new Date(),
      },
    ]);

    this.newMessage.set('');
    this.scrollToBottom();

    setTimeout(() => {

      // Simulate bot typing
      this.isTyping.set(true);
      this.botReply();

    }, 1500);

  }

  private botReply(): void {

    this.scrollToBottom();

    setTimeout(() => {

      this.playFallbackBeep();

      this.isTyping.set(false);

      const botReplies: string[] = [
        "Thank you for your message! I'll forward it to our team.",
        "Got it! Is there anything else you'd like to know?",
        "Great question! Let me check that for you.",
        "We're happy to help! 😊"
      ];

      this.messages.update(msgs => [...msgs, {
        id: Date.now(),
        text: botReplies[Math.floor(Math.random() * botReplies.length)],
        isUser: false,
        timestamp: new Date()
      }]);

      this.scrollToBottom();

    }, 4000);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.chatContainer()?.nativeElement;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight + 30,
          behavior: 'smooth',
        });
      }
    }, 0);
  }

  private loadMessagesFromStorage(): void {

    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);

    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        this.messages.set(messagesWithDates);

      } catch (e) {
        console.error('Failed to parse chat messages', e);
        this.setInitialMessage();
      }
    } else {
      this.setInitialMessage();
    }
  }

  private saveMessagesToStorage(): void {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.messages()));
  }

  private setInitialMessage(): void {
    this.messages.set([{
      id: 1,
      text: "Hello! 👋 How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }]);
  }

  // ====================== SOUND NOTIFICATION ======================
  private playFallbackBeep(): void {
    try {
      const audio = new Audio('https://cdn.freesound.org/previews/401/401722_1241440-lq.mp3'); // short notification sound
      audio.volume = 0.8;
      audio.play().catch(() => {}); // ignore blocked autoplay
    } catch {}
  }

}
