import * as React from 'react';
//  libs
import { Route, RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';
//  components
import { All, NavBar, Home, Login, Loader } from './components';
import Admin from './components/admin/Admin';
//  store
import ViewStore from './stores/ViewStore';

interface AppStore {
  viewStore: ViewStore;
}

interface AppState {}

@observer
class App extends React.Component<RouteComponentProps<any> & AppStore, AppState> {
  componentDidMount() {
    const { viewStore } = this.props;

    viewStore.firebaseCheckAuth();
  }

  render() {
    const { viewStore } = this.props;
    const { isLoading } = viewStore;

    return (
      <div className={isLoading && 'is-loading'}>
        {<DevTools />}
        {/* NavBar - do I need to include the ending tag? :) */}
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <NavBar viewStore={viewStore} />
            <div className="container-fluid">
              <div className="row">
                <div className="container main-content">
                  <div className="row">
                    {/* Main content - start */}
                    <div className={`col-sm-12`}>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/all" component={All} />
                      <Route exact path="/login" render={props => <Login {...props} viewStore={viewStore} />} />
                      <Route exact path="/admin" component={Admin} />
                    </div>
                    {/* Main content - end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
