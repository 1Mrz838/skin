const apiKey = "RYNXqKB7sJRP2OMoSvfv";
const modelURL = "https://detect.roboflow.com/classification-uy6nf/4";

document.getElementById('uploadForm').onsubmit = function(event) {
    event.preventDefault();
    const image = document.getElementById("imageUpload").files[0];
    const reader = new FileReader();

    reader.onload = async function() {
        const base64Image = reader.result.split(",")[1]; 

        const prediction = await predict(base64Image);
        document.getElementById('result').textContent = JSON.stringify(prediction, null, 2);
    };

    reader.readAsDataURL(image);
};

async function predict(base64Image) {
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
