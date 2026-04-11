exports.handler = async (event) => {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxaC1Ptv2MT0-C18sE-IrhChVk5sOoIuxGmMGDub3So35WbxsWqDCL5805Xn33ycnE/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: event.body
    });
    const data = await response.json();
    return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(data)
    };
};
