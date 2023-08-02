import { createReactEditorJS } from "react-editor-js"
import React, { useCallback } from "react"
import { EDITOR_JS_TOOLS } from "./../constants/tool"
import { mapDispatchToProps, mapStateToProps } from "./rdSidebar"
import { connect } from "react-redux"

const RichEditor = ({ editorCore, value }) => {
    const ReactEditorJS = createReactEditorJS()
    
    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance
    }, [editorCore])

    return (
        <div>
            {" "}
            <ReactEditorJS
                onInitialize={handleInitialize}
                tools={EDITOR_JS_TOOLS}
                defaultValue={value}
            />{" "}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(RichEditor)