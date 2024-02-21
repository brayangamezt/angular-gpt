import { environment } from "../../../../environments/environment";
import { TranslateResponse } from "../../../interfaces";

export const translationUseCase = async( prompt:string,lang:string ) =>{

    try {

        const resp = await fetch( `${environment.backendApi}/translate`, { 
            method:'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify( {prompt, lang} ) //Debe enviarse como json
        } );

        if( !resp.ok ) throw new Error( 'No se pudo realizar la traduccion' );

        const { translation } = await resp.json() as TranslateResponse;

        return {
            ok:true,
            translation: translation
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message: 'No se pudo realizar la traduccion'
        }
    }

}