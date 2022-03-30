import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import SideNav from './SideNav'
import AccountDetails from './AccountDetails'
import Transactions from './Transactions'
import SendCoins from './SendCoins'
import ListAccounts from './ListAccounts'
import AllTransactions from './AllTransactions'

import './Dashboard.scss'

const getCookie = (name) => {
    const match = document.cookie.match(
        RegExp('(?:^|;\\s*)' + name + '=([^;]*)')
    )
    return match ? match[1] : null
}

const Dashboard = () => {
    const [signingKey, setSigningKey] = useState(getCookie('signing_key'))
    const [publicKey, setPublicKey] = useState(getCookie('public_key'))

    return (
        <div className="Dashboard">
            <div className="top-bar">
                <h1 className="title">User Dashboard</h1>
                <Link
                    to="/dashboard/sendcoins"
                    className="menu-link"
                    className="send-coins-nav"
                >
                    Send Coins
                </Link>
            </div>
            <div className="dashboard-body">
                <div className="left-container">
                    <SideNav />
                </div>
                <div className="right-container">
                    <Route path="/dashboard/myaccount">
                        <AccountDetails
                            publicKey={publicKey}
                            signingKey={signingKey}
                        />
                    </Route>
                    <Route path="/dashboard/transactions">
                        <Transactions publicKey={publicKey} />
                    </Route>
                    <Route path="/dashboard/sendcoins">
                        <SendCoins
                            publicKey={publicKey}
                            signingKey={signingKey}
                        />
                    </Route>
                    <Route path="/dashboard/allAccounts">
                        <ListAccounts />
                    </Route>
                    <Route path="/dashboard/allTransactions">
                        <AllTransactions />
                    </Route>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
