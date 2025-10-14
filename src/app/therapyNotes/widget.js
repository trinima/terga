'use client';

import { useEffect, useState } from "react";
import { createNote, getAllNotes } from "./commands";

function EntryCompnonent() {
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [content, setContent] = useState("");

    function onChangeDate(e) {
        setDate(e.target.value);
    }

    function onChangeContent(e) {
        setContent(e.target.value);
    }

    async function onSubmit(e) {
        e.preventDefault();
        const note = {
            date: date,
            content: content
        }
        await createNote(note);

    }

    return <form id="note-entry-form" className="flex flex-col gap-2" onSubmit={onSubmit}>
        <input type="date" id="note-entry-date" value={date} onChange={onChangeDate} />
        <textarea id="note-entry-input" value={content} onChange={onChangeContent}></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Note</button>
    </form>
}

function ListAllComponent() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        async function fetchNotes() {
            const allNotes = await getAllNotes();
            setNotes(allNotes);
        }
        fetchNotes();
    }, []);

    return (
        <ul>
            {notes.map((note) => (
                <li className="border-b border-primary py-2 px-2 flex" key={note.id}>
                    <p className="mr-2 font-bold">{new Date(note.date).toLocaleDateString()}</p>
                    <p>{note.content}</p>
                </li>
            ))}
        </ul>
    );
}

function Widget() {
    return <div>
        <h2 className="text-2xl font-bold mb-4">Therapy Notes</h2>
        <EntryCompnonent />
        <ListAllComponent />
    </div>;
}

export { Widget };