import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) { 
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) { 
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
});