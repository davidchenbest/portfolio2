export default function Button({ onClick, name, style = {}, children, type, disabled }) {
    return <button className="button" onClick={onClick} style={style} type={type} disabled={disabled}>{name} {children}</button>
}