import Home from "./Home.js";
import { connect } from "react-redux";
import {
    createUser,
    openModal,
    closeModal,
    toggleWindowFocus,
    toggleSoundEnabled,
    toggleNotificationEnabled,
    toggleNotificationAllowed,
    toggleSocketConnected,
    setLanguage,
    receiveUnencryptedMessage,
    sendUnencryptedMessage,
    receiveEncryptedMessage,
    sendEncryptedMessage,
} from "../../actions";
import WithNewMessageNotification from "./WithNewMessageNotification";

const mapStateToProps = state => {
    const me = state.room.members.find(m => m.id === state.user.id);
    return {
        activities: state.activities.items,
        userId: state.user.id,
        username: state.user.username,
        publicKey: state.user.publicKey,
        privateKey: state.user.privateKey,
        members: state.room.members.filter(m => m.username && m.publicKey),
        roomId: state.room.id,
        roomLocked: state.room.isLocked,
        modalComponent: state.app.modalComponent,
        iAmOwner: Boolean(me && me.isOwner),
        faviconCount: state.app.unreadMessageCount,
        soundIsEnabled: state.app.soundIsEnabled,
        notificationIsEnabled: state.app.notificationIsEnabled,
        notificationIsAllowed: state.app.notificationIsAllowed,
        socketConnected: state.app.socketConnected,
        language: state.app.language,
        translations: state.app.translations,
    };
};

const mapDispatchToProps = {
    createUser,
    openModal,
    closeModal,
    toggleWindowFocus,
    toggleSoundEnabled,
    toggleNotificationEnabled,
    toggleNotificationAllowed,
    toggleSocketConnected,
    setLanguage,
    receiveUnencryptedMessage,
    sendUnencryptedMessage,
    receiveEncryptedMessage,
    sendEncryptedMessage,
};

export default WithNewMessageNotification(connect(mapStateToProps, mapDispatchToProps)(Home));
