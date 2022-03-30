import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './ListAccounts.scss'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#ffffff',
    },
}))

const ListAccounts = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        setOpen(!open)
        axios({
            method: 'get',
            url: 'https://hawkcoin-backend.herokuapp.com/accounts',
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
                    <th>Account Number</th>
                    <th>Date Created</th>
                    <th>Balance</th>
                </tr>
                {data.map((account) => (
                    <tr>
                        <td className="txs-acc-no">{account.account_number}</td>
                        <td className="txs-acc-no">
                            {new Date(account.date_created).toDateString()}
                        </td>
                        <td className="txs-amt">{account.balance}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}

export default ListAccounts
