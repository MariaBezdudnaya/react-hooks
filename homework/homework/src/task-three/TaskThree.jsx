import React, { useState, useEffect, useCallback } from 'react';
import './TaskThree.css';

const useCustomHook = (search) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortController = new AbortController();

    const fetchData = useCallback(async (search, abortController) => {
        setLoading(true);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?search=${search}`, { signal: abortController.signal });
            const data = await response.json();
            console.log(data);
            setPosts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchData(search, abortController);
        }, 500);

        return () => {
            clearTimeout(debounce);
            abortController.abort();
        };
    }, [search]);

    return { posts, loading, error, fetchData };
};

export default function TaskThree() {
    const [search, setSearch] = useState('');
    const { posts, loading, error, fetchData } = useCustomHook(search);

    const handleSearch = (event) => {
        const searchText = event.target.value;
        setSearch(searchText);
    };

    useEffect(() => {
        fetchData(search);
    }, [search]);

    return (
        <div className="TaskThree">
            <input type="text" onChange={handleSearch} placeholder="Search posts" />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <h1>Posts</h1>
            <ul>
                {posts.map(item => <li key={item.id}>{item.title}</li>)}
            </ul>
        </div>
    );
}
