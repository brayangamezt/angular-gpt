import { environment } from "../../../../environments/environment";

//Funcion generadora
export async function* consProsStreamUseCase (prompt:string, abortSignal:AbortSignal) {

    try {
        
        const resp = await fetch( `${environment.backendApi}/pros-cons-discusser-stream`, { 
            method:'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify( {prompt} ), //Debe enviarse como json
            signal:abortSignal
        } );

        if( !resp.ok ) throw new Error( 'Se intento hacer la comparacion' );

        const reader = resp.body?.getReader(); //Nos va permitir ir leyendo como va generandose la respuesta

        if( !reader ){
            throw new Error('No se pudo generar el reader');
        }

        const decorder = new TextDecoder(); // ***************** investigar decoder ***************
        let text = '';

        while(true){
            const { value, done } = await reader.read();
            if(done) break;
            const decodedChunk = decorder.decode( value, {stream:true} );
            text += decodedChunk;
            yield text;
        }

        return text;

    } catch (error) {
        return null;
    }

}