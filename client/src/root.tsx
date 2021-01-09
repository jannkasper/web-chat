import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import shortId from 'shortid';
import Home from './components/Home';
import configureStore from './store';
import { hasTouchSupport } from './utils/dom';

const store = configureStore();

export default class Root extends Component {
    componentWillMount() {
        if (hasTouchSupport) {
            document.body.classList.add('touch');
        }
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="h-100">
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to={`/${shortId.generate()}`} />} />
                            <Route path="/:roomId" component={Home} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}