function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with zero
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day}.${month}.${year}`; // Return formatted date string
}

module.exports = formatDate