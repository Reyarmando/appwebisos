export function Alert({message}) {
    return (
        <div className="bg-red-200 border border-red-600 text-red-600
        px-4 py-3 rounded-full relative mb-2 text-center flex justify-center">

            <span>{message}</span>
        </div>

    )
}