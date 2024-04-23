import React, { useState, useEffect } from 'react';
import './TaskThree.css';

// функция получения данных от API, 
// но теперь с поддержкой отмены запроса через signal
const fetchData = async (search, signal) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?search=${search}`, { signal });
    return await response.json();
}

// функция debounce попридержит запрос
const useDebounce = (value, delay) => {
    // стейт внутри хука
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

// кастомный хук для запросов к API принимает текст запроса
const useFetchData = (search) => {
    // стейты внутри хука
    const [data, setData] = useState([]); // хранит данные от API. Изначально это пустой массив. Заполняется после успешного запроса к API
    const [loading, setLoading] = useState(false); // индикатор загрузки данных

    // задержка в полсекунды
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedSearch) {
            setLoading(true);
            const controller = new AbortController();
            const signal = controller.signal;

            fetchData(debouncedSearch, signal)
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    if (error.name !== 'AbortError') {
                        console.log('Fetch error:', error);
                    }
                });

            // Отменяем запрос при размонтировании или изменении текста запроса
            return () => controller.abort();
        } else {
            // Очищаем данные, если поисковый запрос пуст, устанавливая пустой массив значением стейта
            setData([]);
        }
    }, [debouncedSearch]);

    return { data, loading };
};

export default function TaskThreeCopy() {
    const [search, setSearch] = useState('');
    const { data: posts, loading } = useFetchData(search);

    return (
        <div className="TaskThree">
            <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search posts..."
            />
            <h1>Posts</h1>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {posts.map((post) => (
                        // Используем `post.id` в качестве ключа элемента списка
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}