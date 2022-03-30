import React, { useState } from 'react'

import axios from 'axios'
import nacl from 'tweetnacl'

import './SendCoins.scss'

const SendCoins = (props) => {
    const { publicKey, signingKey } = props

    const [recipientAccNo, setRAN] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')

    const Uint8ArraytoHex = (array) => {
        return Buffer.from(array).toString('hex')
    }

    const hexToUint8Array = (arr) => {
        return new Uint8Array(Buffer.from(arr, 'hex'))
    }

    const stringToUint8Array = (str) => {
        if (!('TextEncoder' in window))
            alert('Sorry, this browser does not support TextEncoder...')

        var enc = new TextEncoder() // always utf-8
        const encoded = enc.encode(str)
        return encoded
    }

    const handleRecipientChange = (event) => {
        setRAN(event.target.value)
    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }

    const handleSubmission = () => {
        if (recipientAccNo === '' || amount === '') {
            setError('All fields are mandatory')
            return
        }
        if (recipientAccNo == publicKey) {
            setError('Sender and recipient account cannot be same')
            return
        }

        if (!Number.isInteger(parseInt(amount)) || amount == 0) {
            setError('Invalid amount')
            return
        }

        setAmount(parseInt(amount))
        const message = publicKey + '|' + recipientAccNo + '|' + amount
        const signature = Uint8ArraytoHex(
            nacl.sign(stringToUint8Array(message), hexToUint8Array(signingKey))
        )

        axios({
            method: 'post',
            url:
                'https://hawkcoin-backend.herokuapp.com/txs/create_transaction/',
            data: {
                sender: publicKey,
                recipient: recipientAccNo,
                amount: amount,
                signature: signature,
            },
        })
            .then((response) => {
                alert('Success')
            })
            .catch((error) => {
                alert('Could not complete transaction: ' + error.message)
            })
    }

    return (
        <div className="send-coins-form">
            {!!error ? <p className="error">{error}</p> : ''}
            <div className="from-group">
                <label className="form-label">From</label>
                <textarea disabled className="form-input">
                    {publicKey}
                </textarea>
            </div>
            <div className="from-group">
                <label className="form-label">Recipient</label>
                <textarea
                    className="form-input"
                    onChange={handleRecipientChange}
                    value={recipientAccNo || ''}
                ></textarea>
            </div>
            <div className="from-group">
                <label className="form-label">Amount</label>
                <input
                    type="text"
                    className="form-input"
                    value={amount || ''}
                    onChange={handleAmountChange}
                />
            </div>
            <button onClick={handleSubmission} className="send-coins-btn">
                Send Coins
            </button>
        </div>
    )
}

export default SendCoins
