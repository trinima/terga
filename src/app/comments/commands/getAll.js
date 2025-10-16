'use server';

import { DataContext } from "../../data";

async function getAll() {
    const dataContext = new DataContext();
    let comments = await dataContext.getAllComments();
    comments = comments.map(comment => ({
        author: comment.author,
        content: comment.content,
        createdTimestamp: comment.createdTimestamp,
        id: comment._id.toString(),
    }))
    return comments;
}

export { getAll };