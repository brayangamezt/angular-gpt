import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMessageEvent, TextMessageBoxEvent, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '../../presentation/components';
import { OpenaiService } from '../../presentation/services/openai.service';
import { Message } from '../../interfaces';

@Component({
    selector: 'app-chat-template',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent],
    templateUrl: './chatTemplate.component.html',
    styleUrl: './chatTemplate.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {

    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    private openAiService = inject( OpenaiService );

    handleMessage(prompt:string){
         console.log('Recibiendo el texto desde el hijo: ', prompt);
    }

 }
