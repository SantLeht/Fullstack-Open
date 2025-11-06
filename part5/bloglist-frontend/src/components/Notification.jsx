import "./Notifications.css"

const Notification = ({message, error}) =>{
    if(message === null && error === null){
        return null
    }

    return(
        <div className={`notification ${error ? "error" : ""}`}>
            {error || message}
        </div>
    )
}
export default Notification