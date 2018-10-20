import * as React from 'react';
// import ViewStore from '../stores/ViewStore';
import { login } from '../utils/firebase';
import { observer } from 'mobx-react';

interface LoginProps {
  viewStore: any;
  history: any;
}

interface LoginState {
  email: string;
  pw: string;
}

@observer
class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: '',
    pw: ''
  };

  onChange = ({ target: { name, value } }) =>
    this.setState({
      [name]: value
    });

  handleSubmit = e => {
    e.preventDefault();

    const { viewStore } = this.props;

    login(this.state.email, this.state.pw)
      .then(() => {
        this.props.history.push('/all');
        viewStore.firebaseCheckAuth();
      })
      .catch(err => viewStore.logError(err.message));
  };

  render() {
    const { viewStore } = this.props;
    const { errorMessage } = viewStore;

    return (
      <div id="login-form" className="panel panel-info">
        <div className="panel-heading">
          <div className="panel-title">Sign In</div>
        </div>

        <div className="panel-body">
          <form id="loginform" className="form" role="form" onSubmit={this.handleSubmit}>
            {errorMessage !== '' && (
              <div className="col-sm-12">
                <div className="row form-group">
                  <div id="login-alert" className="alert alert-danger">
                    {errorMessage}
                  </div>
                </div>
              </div>
            )}

            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="pw">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="pw"
                  placeholder="Password"
                  value={this.state.pw}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="col-sm-12">
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
