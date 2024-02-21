import { environment } from "../../../../environments/environment";

type  GenerateImage = Image | null ;

interface Image{
    url:string;
    alt?:string;
}

export const imageVariationUseCase = async( originalImage:string ):Promise<GenerateImage> =>{

    try {

        const response = await fetch(`${environment.backendApi}/image-variation`, {
            method:'POST',
            headers:{ 'content-type': 'application/json' },
            body: JSON.stringify({
                baseImage:originalImage,
            })
        });

        console.log('Informacion directa de la respuesta en el USE CASE: ', response);
        const { url } = await response.json();

        return {
            url
        };

    } catch (error) {
        console.error(error);
        return null;
    }

}