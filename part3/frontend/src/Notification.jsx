const Notification = ({message, type = "notification"}) =>
    {
    if (message === null){
        return null
    }

    const classType = type === "error" ? "error" : "notification"
    return <div className={classType}>{message}</div>
    
    }
export default Notification