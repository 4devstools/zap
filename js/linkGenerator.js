export function generateWhatsAppLink(phoneNumber, message) {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/55${digitsOnly}${encodedMessage ? '?text=' + encodedMessage : ''}`;
}