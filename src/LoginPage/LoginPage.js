import React, { Fragment } from 'react'
import Input from '../components/Input'
import LoginButton from '../components/LoginButton'
import Checkbox from '../components/Checkbox'
import './LoginPage.css'
import logo from './embassy_english.png'

function LoginPage({ onSubmit, passwordLink }) {
  return (
    <div>
      <img src={logo} alt="embassy english logo" />
      <h2>Welcome Back!</h2>
      <form onSubmit={onSubmit}>
        <Input type="name" name="username" placeholder="User" iconName="user" />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          iconName="lock"
        />
        <LoginButton />
        <div className="d-flex justify-content-between">
          <Checkbox name="rememberMe" value="rememberMe" text="Remember me" />
          <a href={passwordLink} className="password-link">
            Forgot your password?
          </a>
        </div>
      </form>
      <p>An app for sending bulk SMS and email notifications</p>
    </div>
  )
}

export default LoginPage
