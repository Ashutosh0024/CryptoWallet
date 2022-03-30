import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './Transactions.scss'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#ffffff',
    },
}))

const Transactions = (props) => {
    const { publicKey } = props

    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        setOpen(!open)
        axios({
            method: 'get',
            url:
                'https://hawkcoin-backend.herokuapp.com/txs/account/' +
                publicKey,
            data: {},
        })
            .then((response) => {
                setData(response.data)
                setOpen(false)
            })
            .catch((error) => {
                setOpen(false)
                setError(error)
            })
    }, [])
    return (
        <>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="primary" />
            </Backdrop>
            <table>
                <tr>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Amount</th>
                    <th>Signature</th>
                    <th>Date</th>
                </tr>
                {data.map((txs) => (
                    <tr>
                        <td className="txs-acc-no">{txs.sender}</td>
                        <td className="txs-acc-no">{txs.recipient}</td>
                        <td className="txs-amt">{txs.amount}</td>
                        <td className="txs-signature">{txs.signature}</td>
                        <td className="txs-date">{txs.date_created}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}

export default Transactions
