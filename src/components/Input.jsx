
const Input = ({ id, type, placeholder, label, value, onChange, error, max = 15 }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>{label}
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={max}
            />
            { error && <p className="text-red-500 text-xs italic mt-1">{error}</p> }
        </div>
    )
}

export default Input