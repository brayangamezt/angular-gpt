import { environment } from "../../../../environments/environment";


export const textToAudioUseCase = async( prompt:string, voice:string ) =>{

    try {

        const resp = await fetch( `${environment.backendApi}/text-to-audio`, { 
            method:'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify( {prompt, voice} ) //Debe enviarse como json
        } );

        if( !resp.ok ) throw new Error( 'Se no se pudo generar el audio' );

        const audioFile = await resp.blob();
        const audioUrl = URL.createObjectURL(audioFile);

        return {
            ok:true,
            message:prompt,
            audioUrl:audioUrl
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            audioUrl:'',
            message: 'No se pudo generar un audio'
        }
    }

}