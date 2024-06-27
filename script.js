let model;

// Загрузите модель
async function init() {
    try {
        const modelURL = "URL_К_ВАШЕЙ_МОДЕЛИ/model.json";
        model = await tf.loadGraphModel(modelURL);
        console.log("Модель загружена");
    } catch (error) {
        console.error("Ошибка загрузки модели:", error);
    }
}

// Предсказание
async function predict(image) {
    try {
        const img = tf.browser.fromPixels(image);
        const resizedImg = tf.image.resizeBilinear(img, [224, 224]); // Измените размер в соответствии с требованиями вашей модели
        const batchedImg = resizedImg.expandDims(0);
        const prediction = await model.predict(batchedImg).data();
        return prediction;
    } catch (error) {
        console.error("Ошибка предсказания:", error);
    }
}

document.getElementById('uploadForm').onsubmit = function(event) {
    event.preventDefault();
    const image = document.getElementById("imageUpload").files[0];
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(image);
    imgElement.onload = async function() {
        try {
            const prediction = await predict(imgElement);
            document.getElementById('result').textContent = JSON.stringify(prediction, null, 2);
        } catch (error) {
            document.getElementById('result').textContent = "Ошибка предсказания";
            console.error("Ошибка предсказания:", error);
        }
    };
};

init();
