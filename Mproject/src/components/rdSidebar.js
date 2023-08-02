import actSidebar from "../redux/action/actSidebar"

export const mapStateToProps = (globalState) => ({
    collapsed: globalState.sidebar.collapsed,
    selectedLabel: globalState.sidebar.selectedLabel,
    content: globalState.sidebar.content,
})

export const mapDispatchToProps = (dispatch) => {
    return {
        SetCollapsed: (collapsed) => {
            dispatch({
                type: actSidebar.SET_COLLAPSED,
                payload: collapsed,
            })
        },

        SetSelectedLabel: (selectedLabel) => {
            dispatch({
                type: actSidebar.SET_SELECTED_LABEL,
                payload: selectedLabel,
            })
        },

        SetContent: (content) => {
            dispatch({
                type: actSidebar.SET_CONTENT,
                payload: content,
            })
        },
    }
}
