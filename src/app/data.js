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

    getTherapyNotesCollection(db) {
        return db.collection('therapy-notes');
    }

    async safeTherapyNotesAction(action) {
        const client = await this.getConnectedClient();

        try {
            const db = this.getTergaDb(client);
            const collection = this.getTherapyNotesCollection(db);
            await action(collection);
        } finally {
            await client.close();
        }
    }

    async createNote(note) {
        console.log("Creating note:", { note });
        await this.safeTherapyNotesAction(async (collection) => {
            await collection.insertOne(note);
        });
    }

    async getAllNotes() {
        let notes = [];
        await this.safeTherapyNotesAction(async (collection) => {
            notes = await collection
                .find({})
                .sort({ date: -1 })
                .toArray();
        });
        console.log("Fetched notes:", { notes });
        return notes;
    }
}

export { DataContext };