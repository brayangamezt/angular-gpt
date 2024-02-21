import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AudioToTextReponse, Message } from '../../../interfaces';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, TextMessageEvent, TextMessageBoxFileComponent } from '../../components';
import { OpenaiService } from '../../services/openai.service';

@Component({
    selector: 'app-audio-to-text-page',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent,  TextMessageBoxFileComponent
    ],
    templateUrl: './audioToTextPage.component.html',
    styleUrl: './audioToTextPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent { 
    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    private openAiService = inject( OpenaiService );

    handleMessageWithFile(event:TextMessageEvent){

        const { file, prompt } = event;
        // console.log('Informacion del file: ', file);
        let text = '';

        if(!prompt) text ='Traduce el audio';

        this.isLoading.set(true);
        this.messages.update( prev=>[...prev, {isGpt:false, text:text}] );

        this.openAiService.audioToText(file, text).subscribe({
            next:response =>{
                this.handleResponse(response);
            },
            error:error =>{ console.error( error ); }
        })
    }


    handleResponse(resp:AudioToTextReponse | null ){
        this.isLoading.set(false);
        if(!resp) return;

        const text = `## Transcripcion:
        __Duracion:__ ${ Math.round( resp.duration ) } segundos.
        
        ## El texto es:
        ${resp.text}
        `;

        this.messages.update( prev=>[...prev, {isGpt:true, text:text}] );

        for(const segment of resp.segments){
            const sementMessage = `__De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos__
            ${segment.text}`;
            this.messages.update( prev =>[...prev, {isGpt:true, text:sementMessage}] );
        }
    }
}
