import { Buffer } from 'buffer';

interface GowaApiData {
  status?: string;
  id?: string;
  [key: string]: unknown;
}

interface WhatsAppResponse {
  success: boolean;
  data?: GowaApiData; 
  error?: string;
}

export async function sendWhatsAppMessage(phone: string, message: string): Promise<WhatsAppResponse> {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const authUser = process.env.WHATSAPP_AUTH_USER || '';
  const authPass = process.env.WHATSAPP_AUTH_PASS || '';
  const deviceId = process.env.WHATSAPP_DEVICE_ID || '';

  if (!apiUrl) {
    console.error('WHATSAPP_API_URL is not defined');
    return { success: false, error: 'Configuration Error: WHATSAPP_API_URL missing' };
  }

  let formattedPhone = phone.replace(/[^0-9]/g, '');

  if (formattedPhone.startsWith('0')) {
    formattedPhone = '62' + formattedPhone.slice(1);
  } else if (formattedPhone.startsWith('8')) {
    formattedPhone = '62' + formattedPhone;
  }

  if (!formattedPhone.includes('@')) {
    formattedPhone = formattedPhone + '@s.whatsapp.net';
  }

  const authHeader = 'Basic ' + Buffer.from(`${authUser}:${authPass}`).toString('base64');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${apiUrl}/send/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
        'X-Device-Id': deviceId,
      },
      body: JSON.stringify({
        phone: formattedPhone,
        message: message,
      }),
      signal: controller.signal, 
    });

    clearTimeout(timeoutId);

    const result: unknown = await response.json();

    if (!response.ok) {
      let errorMsg = 'Unknown API Error';
      
      if (typeof result === 'object' && result !== null && 'message' in result) {
         errorMsg = String((result as { message: unknown }).message);
      } else {
         errorMsg = JSON.stringify(result);
      }

      console.error('WA Error Response:', errorMsg);
      return { success: false, error: errorMsg };
    }

    return { success: true, data: result as GowaApiData };

  } catch (error: unknown) { 
    clearTimeout(timeoutId);
    
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof Error) {
        if (error.name === 'AbortError') {
            errorMessage = 'Connection timed out (10s limit)';
        } else {
            errorMessage = error.message;
        }
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    console.error('WA Notification Error:', errorMessage);
    
    return { success: false, error: errorMessage };
  }
}