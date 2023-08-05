import React from "react"
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from "../../components/rdSidebar"

const EventCard = ({ collapsed }) => {
    return (
        <div
            className={`flex h-52 bg-white rounded-xl shadow-lg hover:shadow-2xl `}
        >
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCard)
