import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '../../../interfaces';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent } from '../../components';
import { OpenaiService } from '../../services/openai.service';

@Component({
    selector: 'app-image-generation-page',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent
    ],
    templateUrl: './imageGenerationPage.component.html',
    styleUrl: './imageGenerationPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPageComponent { 
    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    private openAiService = inject( OpenaiService );

    handleMessage(prompt:string){
         
       this.isLoading.set(true);
       this.messages.update( prev=>[ ...prev, {isGpt:false, text:prompt} ] );

       this.openAiService.imageGeneration(prompt).subscribe({
        next:response=>{
            if( !response ) return;
            this.isLoading.set(false);
            this.messages.update( prev=>[ ...prev, { isGpt:true, text:`Este es el resultado para: ${prompt}`, imageInfo:response } ] );
        },
        error:error =>{ console.error(error) }
       })

    }

}
