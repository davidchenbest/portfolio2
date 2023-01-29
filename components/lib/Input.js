export default function Input({ onBlur, onFocus, onChange, required, placeholder, value, defaultValue, type, name, children, ref }) {
    return <input className="input"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        required={required}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        name={name}
    >{children}</input>
}