// Check if qrcode library is available
if (typeof qrcode === 'undefined') {
    console.error('QR Code library not loaded');
}

export function generateQRCode(url, element) {
    if (!element || !url) return null;
    
    try {
        element.innerHTML = '';
        const qr = qrcode(0, 'L');
        qr.addData(url);
        qr.make();
        element.innerHTML = qr.createSvgTag({ cellSize: 8, margin: 4 });
        return element.querySelector('svg');
    } catch (error) {
        console.error('Error generating QR code:', error);
        return null;
    }
}

export async function downloadQRCode(svg, format) {
    if (!svg) return;

    try {
        if (format === 'svg') {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: 'image/svg+xml' });
            return downloadFile(blob, 'qrcode.svg');
        }
        
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((blob) => {
                    downloadFile(blob, 'qrcode.png');
                    resolve();
                });
            };
            img.src = url;
        });
    } catch (error) {
        console.error('Error downloading QR code:', error);
    }
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}