import React from 'react';

// функция-конфиг для отправки get запроса на сервер 
export function axiosReq(url: string){
    return {
        method: 'GET', 
        url: 'http://localhost:3000' + url,  
        headers: {
            'Content-Type': 'application/json',
        },
    }
}