export default function Button({ onClick, name, style = {}, children, type }) {
    return <button className="button" onClick={onClick} style={style} type={type}>{name} {children}</button>
}