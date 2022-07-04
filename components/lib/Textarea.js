export default function Textarea({ onChange, required, placeholder, value, defaultValue, type, name, children, ref }) {
    return <textarea className="textarea"
        onChange={onChange}
        value={value}
        required={required}
        placeholder={placeholder}
        type={type}
        defaultValue={defaultValue}
        name={name}
    >{children}</textarea>
}