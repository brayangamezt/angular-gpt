import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '../../../interfaces';
import { OpenaiService } from '../../services/openai.service';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '../../components';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-pros-cons-stream-page',
    standalone: true,
    imports: [ CommonModule, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, ReactiveFormsModule],
    templateUrl: './prosConsStreamPage.component.html',
    styleUrl: './prosConsStreamPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent { 

    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    private openAiService = inject( OpenaiService );

    public aboortSignal = new AbortController();


    async handleMessage(prompt:string){

        this.aboortSignal.abort();
        this.aboortSignal = new AbortController();

        this.messages.update( prev=>[
            ...prev,
            {isGpt:false, text:prompt},
            {isGpt:true, text:'...'}
        ] );

        this.isLoading.set(true);
        const stream = this.openAiService.prosConsDiscosserStream( prompt, this.aboortSignal.signal );
        this.isLoading.set(false);

        for await (const text of stream){
            this.handleStreamResponse(text);
        }

    }

    handleStreamResponse( message:string ){

        this.messages().pop();
        const messages = this.messages();
        this.messages.set([...messages, {isGpt:true, text:message} ]);

    }

 }
