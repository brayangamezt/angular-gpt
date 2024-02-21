import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '../../../interfaces';
import { OpenaiService } from '../../services/openai.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageBoxEvent, TextMessageBoxSelectComponent } from '../../components';

@Component({
    selector: 'app-text-to-audio-page',
    standalone: true,
    imports: [
        CommonModule,ReactiveFormsModule, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxSelectComponent
    ],
    templateUrl: './textToAudioPage.component.html',
    styleUrl: './textToAudioPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent { 
    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    private openAiService = inject( OpenaiService );
    public voices = signal([
        { id: "nova", text: "Nova" },
        { id: "alloy", text: "Alloy" },
        { id: "echo", text: "Echo" },
        { id: "fable", text: "Fable" },
        { id: "onyx", text: "Onyx" },
        { id: "shimmer", text: "Shimmer" },
      ]);

    handleMessageWithSelect(event:TextMessageBoxEvent){
        const { prompt, selectedOption } = event;
        const message = `${ selectedOption } - ${ selectedOption }`;

        this.messages.update( prev=>[...prev, {isGpt:false, text:message} ] );
        this.isLoading.set(true);

        this.openAiService.textToAudio(prompt, selectedOption).subscribe({
            next: resp=>{ 
                const { message, audioUrl } = resp;
                this.isLoading.set(false);
                this.messages.update( prev=>[ ...prev, {isGpt:true, text:message, audioUrl:audioUrl} ] )
            },
            error: err=>{ console.error( err ) }
        });
    }
}
