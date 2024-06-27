document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const imageUpload = document.getElementById('imageUpload');
    const file = imageUpload.files[0];

    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function() {
            const base64Image = reader.result.split(',')[1];

            const API_KEY = "RYNXqKB7sJRP2OMoSvfv";
            const DATASET_NAME = "classification-uy6nf";
            const DATASET_VERSION = "5";

            try {
                const response = await fetch(`https://detect.roboflow.com/${DATASET_NAME}/${DATASET_VERSION}?api_key=${API_KEY}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: base64Image
                });

                const result = await response.json();

                document.getElementById('result').innerHTML = `
                    <h2>Diagnosis Result</h2>
                    <p>${JSON.stringify(result)}</p>
                `;
            } catch (error) {
                document.getElementById('result').innerHTML = `
                    <h2>Error</h2>
                    <p>${error.message}</p>
                `;
            }
        };
    }
});
