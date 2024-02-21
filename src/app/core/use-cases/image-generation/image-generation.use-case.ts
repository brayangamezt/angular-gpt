import { environment } from "../../../../environments/environment";

type  GenerateImage = Image | null ;

interface Image{
    url:string;
    alt?:string;
}

export const imageGenarationUseCase = async( prompt:string, originalImage?:string, maskImage?:string ):Promise<GenerateImage> =>{

    try {

        const response = await fetch(`${environment.backendApi}/image-generation`, {
            method:'POST',
            headers:{ 'content-type': 'application/json' },
            body: JSON.stringify({
                prompt,
                originalImage,
                maskImage
            })
        });

        const { url } = await response.json();

        return {
            url
        };

    } catch (error) {
        console.error(error);
        return null;
    }

}