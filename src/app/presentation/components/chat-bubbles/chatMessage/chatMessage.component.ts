import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

interface ImageInputInfo{
    url:string;
    alt?:string;
}

@Component({
    selector: 'app-chat-message',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chatMessage.component.html',
    styleUrl: './chatMessage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent { 

    @Input({required:true}) text!:string;
    @Input() audioUrl?:string;
    @Input() imageInfo?:ImageInputInfo;


 }
