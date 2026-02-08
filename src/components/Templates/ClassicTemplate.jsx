import React from 'react'

const ClassicTemplate = ({ data }) => {
    return (
        <>
            <div className="bg-white p-6 font-serif">
                <h1 className="text-2xl font-bold">{data.fullName}</h1>
                <p className="text-sm text-gray-600">{data.email}</p>

                <hr className="my-4" />

                <h2 className="font-semibold">Skills</h2>
                <ul className="list-disc ml-5">
                    {data.skills?.map((skill, i) => (
                        <li key={i}>{skill}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ClassicTemplate