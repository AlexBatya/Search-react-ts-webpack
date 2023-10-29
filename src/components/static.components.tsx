// Вспомогательные компоненты, которые ничего не передают в родительские компоненты 
import React from 'react';
import './static.components.scss';

// импорт картинок
const close = require('../img/close.svg') as string; 

// функциональная компонента шаблона popup'а
export function PopUp(props: any){
    const style = {
        display: props.click ? 'block' : 'none' // проявление popup'а -- быстро, но анимацию
        // сделать мы уже не сможем
    }

    const handleClickClose = () => {
        props.close(true) // закрытие popup'а по клику на крестик
    }

    return (
        <div style = {style} className = "popup">
            {/* Задний фон popup'a */}
            <div onClick = {handleClickClose} className = 'popup__shell'></div>
            {/* Тело popup'а */}
            <div className = 'popup__body'>
                {/* Контейнер с содержимым popup'а */}
                <div className="popup__body__container">
                    {/* Кнопка закрытия popup'a */}
                    <div onClick = {handleClickClose} className="popup__body__container__close"><img src = {close} alt="" /></div>
                    {/* Наполнение popup'a */}
                    {props.children}
                </div>
            </div>
        </div>
    )
}