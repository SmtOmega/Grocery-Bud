import React, { useEffect } from 'react'


const Alert = ({msg, type, removeAlert, list}) => {

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            removeAlert()
        }, 3000)
        return ()=> clearTimeout(timeout)
    }, [list])
    return (
    <div className={`alert-${type}`}>
        <p>{msg}</p>
    </div>
    )
}
export default Alert