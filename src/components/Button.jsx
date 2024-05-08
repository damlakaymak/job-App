
const Button = ({text,type="submit"}) => {
  return (
    <button type={type} className="c_button">
{text}
</button>
  )
}

export default Button
