import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-assistant-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './assistantPage.component.html',
    styleUrl: './assistantPage.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPageComponent { }
