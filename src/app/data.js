'use server';

import { MongoClient } from 'mongodb';

class DataContext {
    async getConnectedClient() {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI environment variable is not set.");
        }

        const client = new MongoClient(uri);
        await client.connect();
        return client;
    }

    getTergaDb(client) {
        return client.db('terga');
    }

    async safeCollectionAction(action, collectionName) {
        const client = await this.getConnectedClient();

        try {
            const db = this.getTergaDb(client);
            const collection = db.collection(collectionName);
            await action(collection);
        } finally {
            await client.close();
        }
    }
    async safeCommentsAction(action) {
        return this.safeCollectionAction(action, 'comments');
    }

    async createComment(comment) {
        console.log("Creating comment:", { comment });
        await this.safeCommentsAction(async (collection) => {
            await collection.insertOne(comment);
        });
    }

    async getAllComments() {
        let comments = [];
        await this.safeCommentsAction(async (collection) => {
            comments = await collection
                .find({})
                .sort({ createdTimestamp: -1 })
                .toArray();
        });
        return comments;
    }
}

export { DataContext };