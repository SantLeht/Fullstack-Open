const Notification = ({message}) =>
    {
    if (message === null){
        return null
    }
    return(
        <div className="notification">{message}</div>
        
    )
    console.log(message)
    }
export default Notification