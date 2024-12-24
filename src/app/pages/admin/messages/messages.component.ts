import { NgClass } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, Signal, signal } from '@angular/core';
import { IMessage } from '../../../core/types/message.interface';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgClass, FormsModule, TranslatePipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  messages = signal<IMessage[]>([]);
  pageMessages = signal<IMessage[]>([]);
  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  sortCriteria!: string;
  searchQuery!: string;

  private messageService = inject(MessageService);

  ngOnInit() {
    this.loadMessages();
  }

  private loadMessages() {
    this.messageService.getMessages().subscribe({
      next: (messages) => {
        this.messages.set(messages);
        this.updatePagination();
      },
      error: (err) => console.error(err)
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageMessages();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageMessages();
    }
  }

  deleteMessage(message: IMessage) {
    this.messageService.deleteMessage(message._id).subscribe({
      next: () => {
        this.messages.set(this.messages().filter((msg) => msg._id !== message._id));
        this.updatePagination();
      },
      error: (err) => console.error(err)
    });
  }

  onMessageClick(message: IMessage) {
    message.read = !message.read;
    const updateMethod = message.read ? 'updateMessageAsRead' : 'updateMessageAsUnread';
    this.messageService[updateMethod](message._id).subscribe();
  }

  onSort() {
    const criteria = this.sortCriteria;
    this.pageMessages.update((messages) => {
      return messages.sort((a, b) => {
        if (criteria === 'name') return a.name.localeCompare(b.name);
        if (criteria === 'email') return a.email.localeCompare(b.email);
        if (criteria === 'date') return a.createdAt.localeCompare(b.createdAt);
        return 0;
      });
    });
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    const filteredMessages = this.messages().filter((message) => {
      return ['name', 'email', 'phone', 'message'].some((key) =>
        (message as any)[key].toLowerCase().includes(query)
      );
    });
    this.updatePagination(filteredMessages);
  }

  private updatePagination(messages: IMessage[] = this.messages()) {
    this.totalPages = Math.ceil(messages.length / this.itemsPerPage);
    this.updatePageMessages(messages);
  }

  private updatePageMessages(messages: IMessage[] = this.messages()) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.pageMessages.set(messages.slice(start, end));
  }

  showMessages() {
    return this.pageMessages().length > 0;
  }
}
