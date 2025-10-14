'use server';

import { DataContext } from "../data";

async function createNote(note) {
    if (!note) {
        throw new Error("Note is required.");
    }

    if (!note.date || !note.content) {
        throw new Error("Both date and content are required to create a note.");
    }

    note.createdTimestamp = new Date();

    const dataContext = new DataContext();
    await dataContext.createNote(note);
    return { success: true };
}

async function getAllNotes() {
    const dataContext = new DataContext();
    let notes = await dataContext.getAllNotes();
    notes = notes.map(note => ({
        content: note.content,
        createdTimestamp: note.createdTimestamp,
        date: note.date.toString(),
        id: note._id.toString(),
    }))
    return notes;
}

export { createNote, getAllNotes };