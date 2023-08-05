import SimpleImage from "@editorjs/simple-image"
import Header from "@editorjs/header"

export const EDITOR_JS_TOOLS = {
    simpleImage: SimpleImage,
    header: {
        class: Header,
        config: {
            placeholder: "Enter a header",
            defaultLevel: 3,
        },
    },
}