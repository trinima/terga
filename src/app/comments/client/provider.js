import { createContext, useEffect, useState } from "react";
import { create as command } from "../commands/create";
import { getAll } from "../commands/getAll";

const CommentContext = createContext([]);

function CommentProvider({ children }) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function refresh() {
        setIsLoading(true);
        getAll().then((data) => {
            setComments(data);
            setIsLoading(false);
        });
    }

    function create(comment) {
        setIsLoading(true);
        command(comment).then(() => {
            refresh();
        });
    }

    useEffect(() => {
        refresh();
    }, []);

    return <CommentContext.Provider value={{ comments, isLoading, refresh, create }}>
        {children}
    </CommentContext.Provider>;
}

export { CommentContext, CommentProvider };