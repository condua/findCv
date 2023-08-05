import React from "react"

const DataCard = () => {
    return (
        <div className="grid grid-cols-3 gap-x-8 mt-7">
            <div
                className={`flex h-52 bg-white rounded-xl shadow-lg hover:shadow-2xl `}
            ></div>
            <div
                className={`flex h-52 bg-white rounded-xl shadow-lg hover:shadow-2xl `}
            ></div>
            <div
                className={`flex h-52 bg-white rounded-xl shadow-lg hover:shadow-2xl `}
            ></div>
        </div>
    )
}

export default DataCard
