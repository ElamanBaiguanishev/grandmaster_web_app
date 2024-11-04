import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    async createFile(file: Express.Multer.File): Promise<string> {
        try {
            // Получаем оригинальное расширение файла
            const extension = path.extname(file.originalname);  
            // Генерируем уникальное имя файла с оригинальным расширением
            const fileName = uuid.v4() + extension;
            console.log('Пришёл файл', file);

            // Путь для сохранения файла
            const filePath = path.resolve(__dirname, '../..', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }

            // Записываем файл в файловую систему
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
