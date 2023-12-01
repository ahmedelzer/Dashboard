export default async function APIHandling(url, methodType, sendBody) {
  try {
    const response = await fetch("http://ihs.ddnsking.com/api/"+url, {
      method: methodType,
      headers: {
        'Content-Type': 'application/json',
        'LanguageName': 'arabic'
      },
      body: methodType !== 'GET' ? JSON.stringify(sendBody) : null
    });
    console.error('a11:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return 'REQUEST_ERROR';
  }
}
