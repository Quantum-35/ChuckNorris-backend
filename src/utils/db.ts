import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const { DB_URL } = process.env;

// Connect Mongo
let _db;
export const mongoConnect = async (callback) => {
    try {
        const client = await MongoClient.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
        _db = client.db();
        callback();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getDb = () => {
    if(_db) {
        return _db;
    }
    throw "No Database Found";
};
