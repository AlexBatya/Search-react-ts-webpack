// файл приложения
import React, {useState, useEffect} from 'react';
import './app.components.scss'

import {PopUp} from './static.components'
import {axiosReq} from './functions.components';

import axios from 'axios';

// импортирую картинки
const search = require('../img/search.svg') as string;
const loading = require('../img/loading.gif') as string;
const phone = require('../img/phon.svg') as string;
const email = require('../img/email.svg') as string;

export default function App(){ // экспортируемый компонент в index.tsx
    const [input, setInput] = useState(''); // state для передачи данных из компоненты Search в Users

    const handleChange = (value: string) =>{ // функция, получающая значение из дочернего компонента Search
        setInput(`?term=${value}`); // Подстраиваю переменную сразу под запрос на сервер
    }

    return <main className = ''> 
        <Search value = {handleChange}/> 
        <Users onChange = {setInput} input = {input} />
    </main>
}

// Компонент для поиска сотрудников
function Search(props: any){

    const handlChange = (e: any) => { // получаем вводимый текст и передаём его в родительский компонент
        props.value(e.target.value);
    }
    
    return (
        <div className = 'search container'>
            <input onChange = {(e: any) => handlChange(e)} placeholder = "Поиск по ФИО" className = "search__input" type="text" />
            <img className = "search__img" src={search} alt="search" /> 
        </div>
    )
}

// Компонент для отображения сотрудников
function Users(props: any){
    const [user, setUser] = useState(null) // state для карточки сотрудника
    const [indexCard, setIndexCard] = useState(null) // индекс карточки сотрудника для 
    // дальнейшей настройки popup'а

    useEffect(() => { 
        if(props.input == null ||props.input == undefined || props.input == ''){
            axios(axiosReq('/')) // axios запрос на сервер axiosReq из functions.components.tsx
            .then((res: any) => setUser(res.data)) // меняем массив карточек
        }
        else{
            // тут всё аналогично, только теперь мы ищем конкретных пользователей
            axios(axiosReq(props.input))
            .then((res: any) => {
                if(res.data.length == 0){ // В случае если указанного пользователя нет
                    setUser(['']); // массив с пустой строкой -- чисто для удобства, но в реальных 
                    // проектах так делать не стоит 
                }
                else{ // в случае если такой сотрудник есть в массиве
                    setUser(res.data)
                }
            })
        }
    }, [props.input]) // меняем выборку карточек каждый раз, когда меняется текст в поиске

    const [click, setClick] = useState(false) // Клик по карточке для popup'а
    const handleClick = (key: number) => { 
        setIndexCard(key); // присваиваем индекс карточке
        setClick(true); // закрытие и открытие popup'а
    }

    const handleClickClose = (value: any) => {
        return setClick(false) // закрытие popup'а при клике на крестик 
        //или свободную область за popup'ом
    }

    return (
        <div className="user">
            <div className = "cards container">
                {/* рендер карточек сотрудников */}
                {user != null ?
                    // если данные ещё не подгрузились
                    user.map((elem: any, index: number) => elem == '' ? <h1>Такого человека нет</h1> 
                    // когда данные подгрузились
                    : (
                        <div onClick = {() => handleClick(index)} className = "card">
                            <div className="name">{elem.name}</div>
                            <div className="info">
                                <img src = {phone} alt="" />
                                <p>{elem.phone}</p>
                                
                            </div>
                            <div className="info">
                                <img src = {email} alt="" />
                                <p>{elem.email}</p>
                            </div>
                        </div>
                    ))
                : <img className = "loading" style = {{width: 200 + 'px'}} src = {loading} />}
            </div>

            <PopUp close = {handleClickClose} click = {click}>
                {/* тело popup'а */}
                <div className="popup__content">
                    {/* проверка на содержимое state user */}
                    <div className="name">{user != null && indexCard != null ? user[`${indexCard}`].name : 'loding...'}</div>
                    <div className="info">
                        <div className="info__elem">
                            <p className="title">Телефон:</p>
                            <p className="data">{user != null && indexCard != null ? user[`${indexCard}`].phone: 'loding...'}</p>
                        </div>
                        <div className="info__elem">
                            <p className="title">Почта:</p>
                            <p className="data">{user != null && indexCard != null ? user[`${indexCard}`].email: 'loding...'}</p>
                        </div>
                        <div className="info__elem">
                            <p className="title">Адресс:</p>
                            <p className="data">{user != null && indexCard != null ? user[`${indexCard}`].address: 'loding...'}</p>
                        </div>
                        <div className="info__elem">
                            <p className="title">Дата приёма:</p>
                            <p className="data">{user != null && indexCard != null ? user[`${indexCard}`].hire_date: 'loding...'}</p>
                        </div>
                        <div className="info__elem">
                            <p className="title">Должность:</p>
                            <p className="data">{user != null && indexCard != null ? user[`${indexCard}`].position_name : 'loding...'}</p>
                        </div>
                        <div className="info__elem">
                            <p className="title">Подразделение:</p>
                            <p className="data">{user != null && indexCard != null ? user[`${indexCard}`].department : 'loding...'}</p>
                        </div>
                    </div>
                    <div className="dopInfo">
                        <p className="tiile">Дополнительная информация</p>
                        <p className = "text">Разработчики используют текст в качестве заполнителя макта страницы. Разработчики используют текст в качестве заполнителя макта страницы.</p>
                    </div>
                </div>
            </PopUp>
        </div>
    )
}

