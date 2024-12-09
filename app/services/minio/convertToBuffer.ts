import { MultipartFile } from "@adonisjs/core/bodyparser";
import { promises as fs } from 'fs';

export async function convertFileToBuffer(file: MultipartFile): Promise<Buffer | null> {
    if (file.tmpPath) {
        try {
            // Lê o arquivo e retorna um buffer diretamente
            const buffer = await fs.readFile(file.tmpPath);
            return buffer;
        } catch (error) {
            console.error('Erro ao ler o arquivo:', error);
            return null; // Retorna null em caso de erro
        }
    }
    return null; // Retorna null se o tmpPath não for válido
}
