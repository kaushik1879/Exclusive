
const Input = ({ label, name, value, onChange, error }) => (
    <div>
        <label className="block text-sm mb-2">{label}</label>
        <input
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full h-[52px] bg-[#F5F5F5] px-4 rounded outline-none 
                ${error ? "border border-red-500 bg-red-50" : ""}`}
        />
        {error && (
            <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
    </div>
)

export default Input