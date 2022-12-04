import React, { useState, createContext } from 'react'


export const UnitContext = createContext()

const UnitProvider = (props) => {
    const [unit, setUnit] = useState('F')

    return (
        <>

            <UnitContext.Provider value={{ unit, setUnit }}>
                {props.children}
            </UnitContext.Provider>

        </>
    )
}

export default UnitProvider