'use server';

import { DataContext } from "../../data";

async function create(comment) {
    if (!comment) {
        throw new Error("Comment is required.");
    }

    if (!comment.content) {
        throw new Error("Content is required to create a comment.");
    }

    comment.createdTimestamp = new Date();

    const dataContext = new DataContext();
    await dataContext.createComment(comment);
    return { success: true };
}

export { create };