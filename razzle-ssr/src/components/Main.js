import React from 'react';
import './Main.module.scss';

const Main = () => {
    return (
<form className="box mt-4">
  <div className="field">
    <label className="label">Email</label>
    <div className="control">
      <input className="input" type="email" placeholder="e.g. alex@example.com" />
    </div>
  </div>

  <div className="field">
    <label className="label">Password</label>
    <div className="control">
      <input className="input" type="password" placeholder="********" />
    </div>
  </div>

  <button className="button is-primary">Sign in</button>
</form>    )
}

export default Main;