import './Notification.css'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.error !== undefined) {
        return (
            <div className='error'>
              {message.error}
            </div>
          )
    }
    if (message.success !== undefined) {
        return (
            <div className='success'>
              {message.success}
            </div>
          )
    }
    return null
}

export default Notification