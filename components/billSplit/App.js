import { useState } from "react"
import Input from "components/lib/Input"
import Button from "components/lib/Button"

function calculateShare(payers) {
    //share=totalPayments/payers
    if (!payers.length) return 0
    let totalPaid = 0
    for (const payer of payers) {
        totalPaid += payer.payments.reduce((acc, a) => acc + a, 0)
    }
    return totalPaid / payers.length
}

function setOwed(payers, shared) {
    //owed=payments-share
    for (const payer of payers) {
        const totalPayments = payer.payments.reduce((acc, a) => acc + a, 0)
        payer.owed = totalPayments - shared
    }
}

// const examplePayers =
//     [
//         { name: 'david', payments: [60] }, //20 10 =30 
//         { name: 'susan', payments: [30] }, //20 10
//         { name: 'gina', payments: [] },    //20 10
//     ]

export default function App() {
    const [payers, setPayers] = useState([])
    const [name, setName] = useState('')
    const [payments, setPayments] = useState([])
    const [payment, setPayment] = useState('')
    const [errorM, setErrorM] = useState('')

    const formSubmit = (e) => {
        e.preventDefault()
        if (!name) return setErrorM('enter name')
        if (payers.find((payer) => payer.name === name)) return setErrorM('name already exist')
        const obj = [{ name, payments }, ...payers]
        setOwed(obj, calculateShare(obj))
        setPayers(obj)
        resetForm()
    }

    const resetForm = () => {
        setName('')
        setPayments([])
        setErrorM('')
    }

    const addPayment = e => {
        e.preventDefault()
        if (payment) {
            setPayments(pre => [...pre, +payment])
            setPayment('')
        }

    }
    const removePayment = e => {
        const arr = [...payments]
        const index = arr.findIndex(a => a === e.target.value)
        arr.splice(index, 1)
        setPayments(arr)
    }

    return <>
        <div className="flex flex-col gap-2 p-4">
            <h1 className="text-3xl font-bold">Payment Split</h1>
            {errorM && <p>{errorM}</p>}
            <form onSubmit={formSubmit} className="flex flex-col gap-2">
                <div><Input type='text' name='name' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} /></div>
                <span style={{ display: 'flex', gap: '.5rem' }}>
                    <label >Add Payment</label>
                    <Input type='number' placeholder='payment' value={payment} onChange={e => setPayment(e.target.value)} />
                    <Button onClick={addPayment}>Add</Button>
                </span>
                <>
                    {payments?.length > 0 && <p>total: {payments.reduce((acc, a) => acc + a, 0)}</p>}
                    {payments.map(a => <span key={a}>
                        <label>{a}</label>
                        <input value={a} checked onChange={removePayment} name='payments' type='checkbox' />
                    </span>)}
                </>
                <div><Button name='Submit' /></div>
            </form>
            <section className="">
                {payers.map(({ name, payments, owed }) => <div key={name} className='flex gap-2 items-center'>
                    <h3 className="text-2xl font-bold">{name}</h3>
                    {owed > 0 && <p className="text-green-500">receive: {owed.toFixed(2)}</p>}
                    {owed < 0 && <p className="text-red-500">owe: {owed.toFixed(2)}</p>}
                    {<p className="">totalPaid: {payments.reduce((acc, a) => acc + a, 0)}</p>}
                </div>)}
            </section>
        </div>
    </>
}
