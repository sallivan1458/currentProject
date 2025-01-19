const trimString = (string) => string.trim().toLowerCase()
const currentTime = () => {
    return new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Yekaterinburg',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
}

exports.trimString = trimString
exports.currentTime = currentTime