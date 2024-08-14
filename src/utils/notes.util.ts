import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import redis from '../config/redis';

class Note {
    constructor() {
        this.connection();
    }

    private connection() {
        redis.on('connect', () => {
            console.log('Redis connection: successful');
        });

        redis.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    public get = async (req: Request, res: Response, next: NextFunction) => {
        const id = (req as any).id;

        try {
            const data = await redis.hGetAll(`GetAll${id}`);
            if (data && Object.keys(data).length > 0) {  
                const parsedData = Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [key, JSON.parse(value)])
                );
                console.log('Data returned from Redis');
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    data: parsedData, 
                    message: 'Note Retrieved Successfully from Redis'
                });
            } else {
                next();  
            }
        } catch (err) {
            console.error('Redis error:', err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error'
            });
        }
    }

    public set = async (id, data) => {
        try {
            for (const note of data) {
                const key = (note.dataValues.id).toString();
                const value = JSON.stringify(note.dataValues);

                await redis.hSet(`GetAll${id}`, key, value); 
                console.log('Note saved:', key);
            }

            return true;
        } catch (err) {
            console.error('Redis error:', err);
            throw new Error('Failed to set data in Redis');
        }
    }

    public update = async (id, data) =>{
        try{
            const key = (data.dataValues.id).toString();
            const value = JSON.stringify(data.dataValues);

            const result = await redis.hSet(`GetAll${id}`,key, value);
        } catch (err) {
            console.error('Redis error:', err);
            throw new Error('Failed to set data in Redis');
        }
    }
}

export default Note;