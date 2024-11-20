export function formatPhoneNumber(value) {
    // Remove non-digits and limit to 11 digits
    value = value.replace(/\D/g, '').slice(0, 11);
    
    let formattedValue = '';
    if (value.length > 0) {
        formattedValue = '(' + value.substring(0, 2);
        if (value.length > 2) {
            formattedValue += ') ' + value.substring(2, 7);
            if (value.length > 7) {
                formattedValue += '-' + value.substring(7, 11);
            }
        }
    }
    return formattedValue;
}

export function validatePhoneNumber(phoneNumber) {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    return digitsOnly.length === 11;
}