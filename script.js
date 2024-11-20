// Import modules with relative paths
import { formatPhoneNumber, validatePhoneNumber } from './js/phoneFormatter.js';
import { generateQRCode, downloadQRCode } from './js/qrCodeHandler.js';
import { generateWhatsAppLink } from './js/linkGenerator.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const whatsappForm = document.getElementById('whatsappForm');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const generateBtn = document.getElementById('generateBtn');
    const generatedLink = document.getElementById('generatedLink');
    const copyBtn = document.getElementById('copyBtn');
    const newLinkBtn = document.getElementById('newLinkBtn');
    const qrCodeElement = document.getElementById('qrCode');
    const qrFormat = document.getElementById('qrFormat');
    const downloadQrBtn = document.getElementById('downloadQrBtn');
    const phoneError = document.getElementById('phoneError');

    let currentQRSvg = null;

    // Formatação do número de telefone em tempo real
    phoneInput.addEventListener('input', (e) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        e.target.value = formattedValue;
        
        const isValid = validatePhoneNumber(formattedValue);
        phoneError.textContent = isValid ? '' : 'O número deve conter 11 dígitos';
        generateBtn.disabled = !isValid;
    });

    // Manipuladores de eventos
    generateBtn.addEventListener('click', () => {
        if (!validatePhoneNumber(phoneInput.value)) return;
        
        const whatsappLink = generateWhatsAppLink(phoneInput.value, messageInput.value);
        generatedLink.value = whatsappLink;
        currentQRSvg = generateQRCode(whatsappLink, qrCodeElement);
        
        screen1.classList.add('hidden');
        screen2.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(generatedLink.value);
            copyBtn.textContent = 'Copiado!';
            setTimeout(() => {
                copyBtn.textContent = 'Copiar Link';
            }, 2000);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    });

    newLinkBtn.addEventListener('click', () => {
        whatsappForm.reset();
        screen2.classList.add('hidden');
        screen1.classList.remove('hidden');
        currentQRSvg = null;
    });

    downloadQrBtn.addEventListener('click', async () => {
        if (!currentQRSvg) return;
        await downloadQRCode(currentQRSvg, qrFormat.value);
    });
});