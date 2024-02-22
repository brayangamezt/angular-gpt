import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from '../../../interfaces';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, GptMessageEditableImageComponent } from '../../components';
import { OpenaiService } from '../../services/openai.service';

@Component({
    selector: 'app-image-tunning-page',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent, GptMessageEditableImageComponent
    ],
    templateUrl: './imageTunningPage.component.html',
    styleUrl: './imageTunningPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent { 
    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    private openAiService = inject( OpenaiService );

    public originalImage = signal<string | undefined>(undefined);
    public maskImage = signal<string|undefined>(undefined);

    handleMessage(prompt:string){
         
       this.isLoading.set(true);
       this.messages.update( prev=>[ ...prev, {isGpt:false, text:prompt} ] );

       this.openAiService.imageGeneration(prompt, this.originalImage(), this.maskImage() ).subscribe({
        next:response=>{
            if( !response ) return;
            this.isLoading.set(false);
            this.messages.update( prev=>[ ...prev, { isGpt:true, text:`Este es el resultado para: ${prompt}`, imageInfo:response } ] );
        },
        error:error =>{ console.error(error); }
       })

    }

    handleImageChange(newImage:string, orignalImage:string){
        this.originalImage.set( orignalImage );
        this.maskImage.set(newImage);
        
    }

    generateVariation(){

        this.isLoading.set(true);
        this.openAiService.imageVariation( this.originalImage()! ).subscribe({
            next:response=>{
                this.isLoading.set(false);
                if( !response ) return;
                this.messages.update( prev => [...prev, {isGpt:true, text:`Imagen editada segun lo especificado`, imageInfo:response} ] );
            },
            error:error =>{ console.error(error); }
        });

    }


 }
