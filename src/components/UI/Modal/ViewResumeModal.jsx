const ViewResumeModal = ({ resume, onClose }) => {

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-xl p-6">
                <h2 className="text-2xl font-bold">{resume.fullName}</h2>
                <p className="text-sm">{resume.email}</p>
                <p className="py-3 text-[0.9rem]">
                    <span className="font-[600] tracking-wide capitalize">Summary:</span> {resume.summary}
                </p>

                <p className="text-[0.9rem]"><span className="font-[600] tracking-wide capitalize">Experience: </span>{resume.experience}</p>
                <p className="text-[0.9rem] mt-1"><span className="font-[600] tracking-wide capitalize">Education: </span>{resume.education}</p>

                <section className="mt-4">
                    <h4 className="font-semibold mb-1">Skills</h4>
                    <div className="flex gap-2 flex-wrap">
                        {Array.isArray(resume.skills) && resume.skills.length > 0 ? (
                            resume.skills.map((s, i) => (
                                <span key={i} className="bg-gray-200 px-3 py-1 rounded-[7px] cursor-pointer">
                                    {s}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No skills added</p>
                        )}
                    </div>
                </section>

                <button
                    onClick={onClose}
                    className="mt-6 bg-gray-700 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ViewResumeModal;