import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, 
         GptMessageOrtographyComponent, 
         MyMessageComponent, 
         TextMessageBoxComponent, 
         TextMessageBoxEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TypingLoaderComponent } from '../../components';
import { Message } from '../../../interfaces';
import { OpenaiService } from '../../services/openai.service';


@Component({
    selector: 'app-orthography-page',
    standalone: true,
    imports: [CommonModule, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, 
              TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, GptMessageOrtographyComponent],
    templateUrl: './orthographyPage.component.html',
    styleUrl: './orthographyPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent { 

    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    public openAiService = inject( OpenaiService );

    handleMessage(prompt:string){
         
         this.isLoading.set( true );
         this.messages.update( (previusMessages)=> [...previusMessages, { isGpt:false, text:prompt }] );
         this.openAiService.checkOrtography( prompt ).subscribe({
            next: response => { 
                this.isLoading.set(false);
                this.messages.update( prev =>[
                    ...prev,
                    { isGpt:true, text:response.message, info: response }
                ] );
            },
            error: error => { console.error( error ) }
         })
    }
}
