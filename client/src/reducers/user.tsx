const initialState: User = {
    privateKey: {},
    publicKey: {},
    username: '',
    id: '',
};

const user = (state: User = initialState, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                ...action.payload,
                id: action.payload.publicKey.n,
            };
        case 'SEND_ENCRYPTED_MESSAGE_CHANGE_USERNAME':
            return {
                ...state,
                username: action.payload.newUsername,
            };
        default:
            return state;
    }
};

export default user;
