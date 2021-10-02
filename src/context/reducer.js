import { actions } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.getActor:
            return {
                ...state,
                actorLoader: true,
                actorError: null,
            };
        case actions.getActorSuccess:
            return {
                ...state,
                actor: action.payload,
                actorLoader: false,
            };
        case actions.getActorError:
            return {
                ...state,
                actorLoader: false,
                actorError: action.payload,
            };
        default:
            return state;
    }
}