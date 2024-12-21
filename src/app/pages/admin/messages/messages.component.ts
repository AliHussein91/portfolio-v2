import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { IMessage } from '../../../core/types/message.interface';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgClass, FormsModule, TranslatePipe],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  messages: IMessage[] = [];
  totalPages: number = 1
  currentPage: number = 1
  itemsPerPage: number = 5;
  sortCriteria!: string;
  searchQuery!: string;

  constructor() {
    this.totalPages = this.messages.length / this.itemsPerPage;
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
  nextPage() {
    if (this.currentPage <= this.totalPages) this.currentPage++;
  }
  deleteMessage(message: IMessage) {
    console.log('Delete message', message);
  }
  onSort() {
    this.messages.sort((a, b) => {
      if (this.sortCriteria === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortCriteria === 'email') {
        return a.email.localeCompare(b.email);
      } else if (this.sortCriteria === 'phone') {
        return a.phone.localeCompare(b.phone);
      }
      return 0; // Default return value
    });

  }
  onSearch() {
    this.messages = this.messages.filter((message) => {
      return message.name.includes(this.searchQuery) || message.email.includes(this.searchQuery) || message.phone.includes(this.searchQuery) || message.message.includes(this.searchQuery);
    });
  }
  onMessageClick(message: IMessage) {
    console.log('Message click', message);
  }
}
