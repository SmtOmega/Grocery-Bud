import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'

const List = ({items, deleteItem, editItem}) => {
    return(
    <div className="list-container">
        {items.map(item => {
            const {id, title} = item
            return (
            <div key={id} className="items">
                <p>{title}</p>
                <div>
                    <button onClick={() => editItem(id)} className="edit-btn">
                        <FaEdit />
                    </button>
                    <button onClick={() => deleteItem(id)} className="trash-btn">
                        <FaTrash />
                    </button>
                </div>
            </div>
            )
        })}
    </div>
    )
}

export default List