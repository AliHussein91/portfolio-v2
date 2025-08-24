import { inject, Injectable } from '@angular/core';
import { END_Points } from '../http/global/global.config';
import { Observable } from 'rxjs';
import { IMessage } from '../types/message.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageURL = END_Points.messages;
  http = inject(HttpClient);

  // getMessages() {
  //   return this.http.get<IMessage[]>(this.messageURL.getMessages);
  // }

  postMessage(message: IMessage): Observable<IMessage> {
    return this.http.post<IMessage>(this.messageURL.postMessage, message);
  }

  // getmessage(id: string): Observable<IMessage> {
  //   return this.http.get<IMessage>(this.messageURL.getMessage(id));
  // }

  // updateMessageAsRead(id: string): Observable<IMessage> {
  //   return this.http.put<IMessage>(this.messageURL.updateMessageAsRead(id), {});
  // }

  // updateMessageAsUnread(id: string): Observable<IMessage> {
  //   return this.http.put<IMessage>(this.messageURL.updateMessageAsUnread(id), {});
  // }

  // deleteMessage(id: string): Observable<IMessage> {
  //   return this.http.delete<IMessage>(this.messageURL.deletMessage(id));
  // }


}
