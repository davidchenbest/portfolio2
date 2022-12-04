export default function Input({ onChange, required, placeholder, value, defaultValue, type, name, children, ref }) {
    return <input className="input"
        onChange={onChange}
        value={value}
        required={required}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        name={name}
    >{children}</input>
}