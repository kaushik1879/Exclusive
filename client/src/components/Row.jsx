const Row = ({ label, value, bold }) => (
    <div className={`flex justify-between ${bold ? "font-medium" : ""}`}>
        <span>{label}</span>
        <span>{value}</span>
    </div>
)

export default Row