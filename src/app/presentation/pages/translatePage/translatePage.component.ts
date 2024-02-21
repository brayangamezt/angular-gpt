import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { Message } from '../../../interfaces';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxEvent, TextMessageBoxSelectComponent, TypingLoaderComponent } from '../../components';

@Component({
    selector: 'app-translate-page',
    standalone: true,
    imports: [
        CommonModule, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxSelectComponent
    ],
    templateUrl: './translatePage.component.html',
    styleUrl: './translatePage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {
    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    private openAiService = inject( OpenaiService );
    public languages =signal([
        { id: 'alemán', text: 'Alemán' },
        { id: 'árabe', text: 'Árabe' },
        { id: 'bengalí', text: 'Bengalí' },
        { id: 'francés', text: 'Francés' },
        { id: 'hindi', text: 'Hindi' },
        { id: 'inglés', text: 'Inglés' },
        { id: 'japonés', text: 'Japonés' },
        { id: 'mandarín', text: 'Mandarín' },
        { id: 'portugués', text: 'Portugués' },
        { id: 'ruso', text: 'Ruso' },
      ]);

    handleMessageWithSelect(event:TextMessageBoxEvent){
        const { prompt, selectedOption } = event;

        const firstTranslation = `Traduce a ${selectedOption} el siguiente texto: ${prompt}`;

        this.isLoading.set(true);
        this.messages.update( prev =>[ ...prev, {text:firstTranslation, isGpt:false} ] );

        this.openAiService.translateText(prompt, selectedOption).subscribe({
            next: response =>{ 
                this.isLoading.set(false);
                const { translation } = response;

                this.messages.update( prev =>[ ...prev, { text:`${translation}`, isGpt:true }] )
             },
            error: error =>{ console.error( error ) }
        });
    }
 }
