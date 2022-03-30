import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded'
import QRCode from 'qrcode.react'

import './AccountDetails.scss'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#ffffff',
    },
}))

const AccountDetails = (props) => {
    const { publicKey, signingKey } = props

    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setOpen(!open)
        axios({
            method: 'get',
            url: 'https://hawkcoin-backend.herokuapp.com/account/' + publicKey,
            data: {},
        })
            .then((response) => {
                setData(response.data)
                setOpen(false)
            })
            .catch((error) => {
                setOpen(false)
                console.log(error)
            })
    }, [])

    return (
        <>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="primary" />
            </Backdrop>
            <div className="row">
                <div className="box">
                    <div className="box-text">Balance</div>
                    <div className="box-value bold green">{data.balance}</div>
                </div>
                {/* <div className="box">
                    <div className="box-text">Transactions</div>
                    <div className="box-value bold">{data.balance}</div>
                </div> */}
                <div className="box">
                    <div className="box-text">Joined On</div>
                    <div className="box-value bold">
                        {new Date(data.date_created).toDateString()}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="box">
                    <div className="box-text">Account Number</div>
                    <div className="box-value2">
                        <div className="acc_no">{data.account_number}</div>
                        <button
                            className="copy-button"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    data.account_number
                                )
                            }}
                        >
                            <FileCopyRoundedIcon />
                        </button>
                        <div className="qr">
                            <QRCode
                                value={publicKey}
                                renderAs="svg"
                                className="qr"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="box">
                    <div className="box-text">Signing Key</div>
                    <div className="box-value2">
                        <div className="acc_no">{signingKey}</div>
                        <button
                            className="copy-button"
                            onClick={() => {
                                navigator.clipboard.writeText(signingKey)
                            }}
                        >
                            <FileCopyRoundedIcon />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountDetails
