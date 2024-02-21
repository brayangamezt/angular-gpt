import { environment } from "../../../../environments/environment";
import { OrtographyResponse } from "../../../interfaces";


export const ortographyUseCase = async( prompt:string ) =>{

    try {

        const resp = await fetch( `${environment.backendApi}/ortography-check`, { 
            method:'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify( {prompt} ) //Debe enviarse como json
        } );

        if( !resp.ok ) throw new Error( 'Se intento hacer la peticion pero no se logro' );

        const data = await resp.json() as OrtographyResponse;

        return {
            ok:true,
            ...data
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            userScore:0,
            errors:[],
            message: 'No se pudo realizar la correcion'
        }
    }

}