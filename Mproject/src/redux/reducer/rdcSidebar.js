import actSidebar from "../action/actSidebar"

const initialState = {
    collapsed: false,
    selectedLabel: localStorage.getItem("selectedLabel"),
    content: "",
}

const rdcSidebar = (state = initialState, { type, payload }) => {
    switch (type) {
        case actSidebar.SET_COLLAPSED:
            return {
                ...state,
                collapsed: payload,
            }

        case actSidebar.SET_SELECTED_LABEL:
            localStorage.setItem("selectedLabel", payload)
            return {
                ...state,
                selectedLabel: payload,
            }
        case actSidebar.SET_CONTENT:
            return {
                ...state,
                content: payload,
            }
        default:
            return state
    }
}

export default rdcSidebar
