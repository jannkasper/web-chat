import {useEffect} from "react";
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import shortId from 'shortid';

import { hasTouchSupport } from "../utils/dom";
import Home from "../components/Home"

const Root = () => {

  useEffect(() => {
    return () => {
      if (hasTouchSupport) {
        document.body.classList.add('touch');
      }
    }
  });


  return (
        <BrowserRouter>
          <div className="h-100">
            <Switch>
              <Route exact path="/" render={() => <Redirect to={`/${shortId.generate()}`} />}/>
              <Route path="/:roomId" component={Home}/>
            </Switch>
          </div>
        </BrowserRouter>
  )


}

export default Root
