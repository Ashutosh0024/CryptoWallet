import React from 'react'
import { Link } from 'react-router-dom'

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded'
import SwapVertRoundedIcon from '@material-ui/icons/SwapVertRounded'
import SendRoundedIcon from '@material-ui/icons/SendRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded'
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded'
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded'

import './SideNav.scss'

const SideNav = () => {
    return (
        <div className="links">
            <Link to="/dashboard/myaccount" className="menu-link">
                <div className="icon">
                    <AccountCircleRoundedIcon />
                </div>
                My Account
            </Link>

            <Link to="/dashboard/transactions" className="menu-link">
                <div className="icon">
                    <SwapVertRoundedIcon />
                </div>
                Transactions
            </Link>

            <Link to="/dashboard/sendcoins" className="menu-link">
                <div className="icon">
                    <SendRoundedIcon />
                </div>
                Send Your Coins
            </Link>

            <a href="/" className="menu-link">
                <div className="icon">
                    <ExitToAppRoundedIcon />
                </div>
                Logout From Device
            </a>

            <Link to="/dashboard/allAccounts" className="menu-link">
                <div className="icon">
                    <SupervisorAccountRoundedIcon />
                </div>
                All accounts
            </Link>

            <Link to="/dashboard/allTransactions" className="menu-link">
                <div className="icon">
                    <ListAltRoundedIcon />
                </div>
                All transactions
            </Link>

            {/* <a href="#" className="menu-link">
                <div className="icon">
                    <AssessmentRoundedIcon />
                </div>
                Statistics
            </a> */}
        </div>
    )
}

export default SideNav
