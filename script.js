document.getElementById('uploadForm').onsubmit = function(event) {
    event.preventDefault();
    const image = document.getElementById("imageUpload").files[0];
    const reader = new FileReader();

    reader.onload = async function() {
        const base64Image = reader.result.split(",")[1];

        const prediction = await predict(base64Image);
        displayResult(prediction);
    };

    reader.readAsDataURL(image);
};

async function predict(base64Image) {
    const apiKey = "RYNXqKB7sJRP2OMoSvfv";
    const modelURL = "https://detect.roboflow.com/classification-uy6nf/5";

    const response = await fetch(`${modelURL}?api_key=${apiKey}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `image=${base64Image}`
    });

    if (response.ok) {
        const result = await response.json();
        return result;
    } else {
        console.error('Ошибка предсказания:', response.statusText);
        return null;
    }
}

function displayResult(prediction) {
    const resultDiv = document.getElementById('result');
    if (prediction) {
        resultDiv.innerHTML = `
            <h2>Diagnosis Result:</h2>
            <pre>${JSON.stringify(prediction, null, 2)}</pre>
        `;
    } else {
        resultDiv.innerHTML = `
            <h2>Error:</h2>
            <p>Could not diagnose the image. Please try again.</p>
        `;
    }
}
