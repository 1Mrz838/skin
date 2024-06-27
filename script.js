const apiKey = "RYNXqKB7sJRP2OMoSvfv";
const modelURL = "https://detect.roboflow.com/classification-uy6nf/4";

document.getElementById('uploadForm').onsubmit = function(event) {
    event.preventDefault();
    const image = document.getElementById("imageUpload").files[0];
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(image);
    imgElement.onload = async function() {
        const prediction = await predict(imgElement);
        document.getElementById('result').textContent = JSON.stringify(prediction, null, 2);
    };
};

async function predict(image) {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch(modelURL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        },
        body: formData
    });

    if (response.ok) {
        const result = await response.json();
        return result;
    } else {
        console.error('Ошибка предсказания:', response.statusText);
        return null;
    }
}
