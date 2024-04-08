function Button({ children, onClick }: any) {
    return (
        <button className='button' onClick={onClick}>{children}</button>
    )
}

export default Button
