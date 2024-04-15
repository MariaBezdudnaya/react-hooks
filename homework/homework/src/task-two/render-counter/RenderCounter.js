import React, {useEffect, useRef} from 'react';
import './RenderCounter.css'

const RenderCounter = () => {
    const renderCount = useRef(0); // хук для хранения любых данных между вызовами компонента, возвращает обычный объект со свойством current внутри. В качестве параметра принимает начальное значение хранимого объекта

    useEffect(() => { // Используя этот хук, вы говорите React сделать что-то после рендера. React запомнит функцию (то есть «эффект»), которую вы передали и вызовет её после того, как внесёт все изменения в DOM
        renderCount.current = renderCount.current + 1;
    });

    return <div className="counter-wrapper">
        <span className="render-count">Количество рендеров: {renderCount.current}</span>
    </div>;
};

export default RenderCounter;