import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-gpt-message-ortography',
    standalone: true,
    imports: [CommonModule,],
    templateUrl: './gptMessageOrtography.component.html',
    styleUrl: './gptMessageOrtography.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrtographyComponent { 

    @Input({required:true}) userScore!:number;
    @Input({required:true}) text!:string;
    @Input()                errors:string[]=[];

 }
