import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Message } from '../../../interfaces';
import { OpenaiService } from '../../services/openai.service';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '../../components';

@Component({
    selector: 'app-pros-cons-page',
    standalone: true,
    imports: [ CommonModule,ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextMessageBoxComponent ],
    templateUrl: './prosConsPage.component.html',
    styleUrl: './prosConsPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    private openAiService = inject( OpenaiService );

    handleMessage(prompt:string){
         this.isLoading.set(true);
         this.openAiService.prosConsDiscosser( prompt ).subscribe({
            next:response =>{
                this.isLoading.set(false);
                this.messages.update( prev =>[ ...prev, {isGpt:true, text:response.content} ] );
            },
            error: err => console.error(err)
         });
    }
 }
