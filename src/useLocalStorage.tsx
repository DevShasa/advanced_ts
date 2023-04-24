import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string, initialValue: T |(()=>T)){
    const [value, setValue] =  useState<T>(()=>{
        const jsonValue = localStorage.getItem(key)
        if(jsonValue === null){
            // There is no value in localstorage
            if(typeof initialValue ==="function"){
                // can accept a function that returns type T kind of like setState
                // if it is a function ... execute!
                return (initialValue as ()=>T)()
            }else{
                return initialValue
            }
        }else{
            return JSON.parse(jsonValue)
        }
    })

    // save data in localstorage everytime value or key changes
    useEffect(() =>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}