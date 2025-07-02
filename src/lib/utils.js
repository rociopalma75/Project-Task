export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const dateOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }
    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }

    const formattedDate = date.toLocaleDateString("es-ES", dateOptions)
    const formattedTime = date.toLocaleTimeString("es-ES", timeOptions)

    return `${formattedDate} ${formattedTime}`
}

  // Función para truncar texto largo
export const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
}

export const getCurrentDateTime = () => {
    const now = new Date()
    // Ajustar a la zona horaria local
    const offset = now.getTimezoneOffset()
    const localDate = new Date(now.getTime() - offset * 60 * 1000)
    return localDate.toISOString().slice(0, 16) // Formato: YYYY-MM-DDTHH:MM
}

export const validateDate = (dateString) => {
    const selectedDate = new Date(dateString)
    const currentDate = new Date()
    return selectedDate <= currentDate
}
