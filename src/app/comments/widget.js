'use client';

import { Create } from "./components/create";
import { ListAll } from "./components/listAll";
import { CommentContext, CommentProvider } from "./client/provider";

function Widget() {
    return <div className="w-full flex flex-col justify-center gap-6  max-w-256 mx-auto">
        <CommentProvider>
            <h2 className="text-2xl font-bold mb-4 mx-auto">Comments</h2>
            <Create />
            <ListAll />
        </CommentProvider>
    </div>;
}

export { Widget };