import { environment } from "../../../../environments/environment";
import { ProsConsResponse } from "../../../interfaces";

export const prosConstUseCase = async(prompt:string) =>{

    try {

        const resp = await fetch( `${environment.backendApi}/pros-cons-discusser`, { 
            method:'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify( {prompt} ) //Debe enviarse como json
        } );

        if( !resp.ok ) throw new Error( 'Se intento hacer la comparacion' );

        const data = await resp.json() as ProsConsResponse;

        return {
            ok:true,
            ...data
        }
        
    } catch (error) {
        
        return {
            ok:false,
            role:'',
            content:'No se pudo realizar la comparacion'
        }
    }

}