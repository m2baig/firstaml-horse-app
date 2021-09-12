import './App.scss';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';
import store from './app/store';
import routes from './config/routes';
import Header from './components/common/header';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <div className="content-wrapper ">
            <div className=" content">
              <div className="row">
                <div className="col-md-6 mt-5">
                  <Switch>
                    {routes.map((route, index) => {
                      return (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          render={(props: RouteComponentProps<any>) => (
                            <route.component name={route.name} {...props} {...route.props} />
                          )}
                        />
                      );
                    })}
                    <Redirect to="/" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
