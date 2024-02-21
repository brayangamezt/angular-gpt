import { Injectable } from '@angular/core';
import { consProsStreamUseCase, imageGenarationUseCase, imageVariationUseCase, ortographyUseCase, prosConstUseCase, textToAudioUseCase, translationUseCase} from '../../core';
import { from } from 'rxjs';
import { audioToTextUseCase } from '../../core/use-cases/audios/audio-to-text.use-case';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor() { }

  checkOrtography( prompt:string ){
    return from( ortographyUseCase( prompt ) )
  }

  prosConsDiscosser(prompt:string){
    return from( prosConstUseCase(prompt) );
  }

  prosConsDiscosserStream(prompt:string, abortSignal:AbortSignal){
    return consProsStreamUseCase(prompt, abortSignal);
  }

  translateText(prompt:string, lang:string){
    return from( translationUseCase(prompt, lang) );
  }

  textToAudio(prompt:string, voice:string){
    return from( textToAudioUseCase(prompt, voice) );
  }

  audioToText(file:File, prompt?:string){
    return from( audioToTextUseCase(file, prompt) );
  }

  imageGeneration(prompt:string, originalImage?:string, maskImage?:string){
    return from( imageGenarationUseCase( prompt, originalImage, maskImage ) );
  }

  imageVariation( originalImage:string ){
    return from( imageVariationUseCase( originalImage ) );
  }

}
