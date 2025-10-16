'use client';

import { useContext, useState } from "react";
import { CommentContext } from "../client/provider";

function Create() {
    const { create } = useContext(CommentContext);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    function onChangeAuthor(e) {
        setAuthor(e.target.value);
    }

    function onChangeContent(e) {
        setContent(e.target.value);
    }

    function resetForm() {
        setAuthor("");
        setContent("");
    }

    async function onSubmit(e) {
        e.preventDefault();

        const comment = {
            author: author,
            content: content
        }

        await create(comment);

        resetForm();
    }

    return <form id="comment-create-form" className="flex flex-col gap-4 justify-center w-full p-4 pt-0" onSubmit={onSubmit}>
        <div class="flex flex-col w-full">
            <label className="py-4 pt-0">Author:</label>
            <input id="comment-create-author"
                className="border-1 border-gray-800 bg-gray-200 text-gray-800 p-4"
                onChange={onChangeAuthor}
                type="text"
                value={author}
            />
        </div>
        <div class="flex flex-col w-full">
            <label className="py-4">Content:</label>
            <textarea id="comment-create-input"
                className="border-1 border-gray-800 bg-gray-200 text-gray-800 p-4"
                onChange={onChangeContent}
                value={content}
            />
        </div>
        <button id="comment-create-submit"
            className="bg-blue-500 text-white px-4 py-4 rounded capitalize w-128 mx-auto my-8"
            type="submit">
            Post
        </button>
    </form>
}

export { Create };