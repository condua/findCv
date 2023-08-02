import React from "react"
import { mapDispatchToProps, mapStateToProps } from "../rdSidebar"
import { connect } from "react-redux"

const IRABanner = ({ selectedLabel }) => {
    return (
        <div className="flex w-full outline-1 outline-slate-950">
            <div className="flex w-full mr-8 ml-4 mt-[-30px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 font-serif text-xl text">{selectedLabel}</div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(IRABanner)
