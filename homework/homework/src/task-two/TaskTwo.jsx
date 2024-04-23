import React from 'react';
import { memo, useCallback, useState } from 'react';
import RenderCounter from './render-counter/RenderCounter';
import './TaskTwo.css';

export default function TaskTwo() {
    const update = useUpdate() // пользовательский хук, позволяет нам изменять компонент TaskTwo без перерендеривания дочерних компонентов
    return (
        <div className="TaskTwo">
            <button onClick={update}>Обновить компонент</button>
            <RenderCounter />
            <Root />
        </div>
    )
}

const Root = memo(() => { // Компонент Высшего Порядка, оборачивается, мемоизируя тем самым результат, если компонент всегда рендерит одно и то же при неменяющихся пропсах
    const [value, setValue] = useState('') // используется для хранения состояния в функциональном компоненте, текущее значение состояния и функция обновления состояния
    const handleChange = useCallback((event) => { // позволяет кэшировать определение функции между повторными рендерингами. 
        setValue(event.target.value)
    }, []); // Мемоизируем функцию handleChange

    return (
        <form className="form-container">
            Введенное значение: {value}
            <RenderCounter />
            <Input onChange={handleChange} />
        </form>
    );
});

const Input = memo(({ onChange }) => {
    return (
        <div className="input-container">
            <input type="text" className="input-field" name="value" onChange={onChange} />
            <RenderCounter />
        </div>
    );
});

function useUpdate() {
    const [, setCount] = useState(0)
    return useCallback(() => { setCount(counter => counter + 1) }, []); // используем для того, чтобы возвращаемая функция не менялась и не вызывала перерендеры тех компонентов, функции которых зависят от useUpdate.
};