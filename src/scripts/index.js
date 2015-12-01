import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import Socket from './utils/Websocket.js';
import configureStore from './stores/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import * as ActionTypes from './constants/ActionTypes.js';
import * as Actions from './actions/login.js';

const store = configureStore();
const websocket = {
    connection: null,
    uri: 'localhost:1337',
    dispatcher: message => {
        const state = store.getState();
        console.log(`state: ${JSON.stringify(state,null,2)} \t\t message: ${JSON.stringify(message)}`);
        return store.dispatch(Actions.handleEvent(message));
    },
    listeners: () => {
        const { action } = store.getState();
        console.log(`action : ${JSON.stringify(action)}`);
	    switch (action.type) {
	      case ActionTypes.LOGIN_REQUEST:
            console.log("Handling login request");
	        return websocket.connection.write(action.id, action.type, action.credentials);
	
	      case ActionTypes.LOGIN_SUCCESS:
	        return websocket.connection.write("):", "wut", "okay");
	
	      default:
	        return;
        }
    }
}

render(
    <div>
	    <Provider store={store}>
	        <App/>
	    </Provider>
	    <DebugPanel top right bottom>
	        <DevTools store={store}
	                monitor={LogMonitor}
	                visibleOnLoad={true} />
	    </DebugPanel>
    </div>,
    document.getElementById('app')
)

websocket.connection = new Socket(websocket.uri, websocket.dispatcher);
store.subscribe(() => websocket.listeners());

