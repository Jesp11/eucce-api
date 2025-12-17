import 'reflect-metadata';
import { DataSource } from 'typeorm';

import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    synchronize: false,
    logging: true
});

try {
    AppDataSource.initialize().then(() => {
        console.log('El Data Source se ha sido inicializado correctamente!');
    });
} catch (err) {
    console.error('Error al inicializar el Data Source', err);
}