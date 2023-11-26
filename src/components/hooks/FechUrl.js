export default async function fetchDataWithHandling(url, methodType, sendBody) {
  try {
    const response = await fetch(url, {
      method: methodType,
      headers: {
        'Content-Type': 'application/json',
        'LanguageName': 'arabic'
      },
      body: methodType !== 'GET' ? JSON.stringify(sendBody) : null
    });

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
