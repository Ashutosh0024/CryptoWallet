import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import nacl from 'tweetnacl'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './GetStarted.scss'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#ffffff',
    },
}))

const Uint8ArraytoHex = (array) => {
    return Buffer.from(array).toString('hex')
}

const hexToUint8Array = (arr) => {
    return new Uint8Array(Buffer.from(arr, 'hex'))
}

const GetStarted = () => {
    const classes = useStyles()

    const [accountCreationMessage, setAccountCreationMessage] = useState('')
    const [loginMessage, setLoginMessage] = useState('')
    const [signingKey, setSigningKey] = useState('')
    const [open, setOpen] = React.useState(false)
    const [dashboardRedirect, setDashboardRedirect] = useState(false)

    const handleAccountCreation = () => {
        setOpen(!open)

        const { publicKey, secretKey } = nacl.sign.keyPair()
        const uintPublicKey = Uint8ArraytoHex(publicKey)
        const uintSecretKey = Uint8ArraytoHex(secretKey)

        axios({
            method: 'post',
            url: 'https://hawkcoin-backend.herokuapp.com/create_account/',
            data: {
                acc_no: uintPublicKey,
            },
        })
            .then((response) => {
                document.cookie = `signing_key=${uintSecretKey}`
                document.cookie = `public_key=${uintPublicKey}`
                setDashboardRedirect(true)
            })
            .catch((error) => {
                setOpen(false)
                setLoginMessage(error.response.data.message)
            })
    }

    const handleLogin = () => {
        setOpen(true)

        if (signingKey.length !== 128) {
            setLoginMessage('Invalid Signing Key')
            setOpen(false)
            return
        }

        const { publicKey } = nacl.sign.keyPair.fromSecretKey(
            hexToUint8Array(signingKey)
        )
        // const acc_no = unit8
        const acc_no = Uint8ArraytoHex(publicKey)
        axios({
            method: 'get',
            url: 'https://hawkcoin-backend.herokuapp.com/account/' + acc_no,
            data: {},
        })
            .then((response) => {
                setOpen(false)
                if (response.status !== 200) {
                    setLoginMessage('Failed')
                } else {
                    document.cookie = `signing_key=${signingKey}`
                    document.cookie = `public_key=${acc_no}`
                    setDashboardRedirect(true)
                }
            })
            .catch((error) => {
                setOpen(false)
                setLoginMessage(error.response.data.message)
            })
    }

    if (dashboardRedirect) {
        return <Redirect to="/dashboard/myaccount" />
    }

    return (
        <div className="GetStarted">
            <div className="GetStarted-container">
                <h1>Get Started with Crypto Wallet</h1>
                
                <div className="Cards">
                    <div className="card-left">
                        <h2>Create a new Account</h2>
                        <p className="Error">{accountCreationMessage}</p>

                        <p>
                            Create your new account by
                            clicking the button below
                        </p>
                        <button onClick={handleAccountCreation}>
                            Create a new Account
                        </button>
                        <Backdrop className={classes.backdrop} open={open}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </div>

                    <div className="card-right">
                        <h2>Login to your Account</h2>
                        <p className="Error">{loginMessage}</p>
                        <p>
                            If you want to login to your previous account
                            enter your Signing Key
                        </p>
                        <input
                            type="password"
                            className="SigningKey"
                            value={signingKey}
                            onInput={(e) => setSigningKey(e.target.value)}
                        />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetStarted
