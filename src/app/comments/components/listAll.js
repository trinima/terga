'use client';

import { useContext } from "react";
import { CommentContext } from "../client/provider"
import { LoadingOverlay } from "@/app/client/components/loadingOverlay";

function ListAll() {
    const { comments, isLoading } = useContext(CommentContext);

    return (<div className="relative min-h-64">
        {comments ?
            <ul id="comment-list">
                {comments.map((comment) => (
                    <li className="border-b border-primary py-2 px-2 flex" key={comment.id}>
                        <p className="mr-2 font-bold">{comment.author || "Anonymous"}</p>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
            :
            <p>No comments to see</p>
        }
        {isLoading && <LoadingOverlay />}
    </div>);
}

export { ListAll };