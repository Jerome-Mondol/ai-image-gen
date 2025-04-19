let input = document.querySelector(".input")
let image = document.querySelector(".img")
let btn = document.querySelector(".generate-btn")
let aiBtn = document.querySelector(".ai-prompt-btn")
let statusText = document.querySelector(".status-text")
const TOKEN = "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"

const imagePrompts = [
    "Futuristic city at golden hour",
    "Cyberpunk girl with neon lights",
    "Astronaut floating above Earth clouds",
    "Vintage car in desert road",
    "Fantasy castle on mountain peak",
    "Robot playing guitar on stage",
    "Forest house under starry sky",
    "Samurai walking in heavy rain",
    "Alien landscape with glowing trees",
    "Cute cat wearing space suit"
  ];


async function getResult() {
    try {
        let response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({"inputs": input.value}),
        })

        const result = response.blob()
    return result

    } catch (error) {
        console.error(error);
    }


}

btn.addEventListener("click", () => {
    if (input.value === "") {
        alert("Please enter a prompt")
        return
    }

    statusText.style.display = "block"
    statusText.innerHTML = "Generating image..."
    statusText.style.color = "black"

    getResult().then((response) => {
        const objectURL = URL.createObjectURL(response)
        console.log(objectURL)
        image.style.display = "block"
        image.src = objectURL

        statusText.innerHTML = "Image generated successfully!"
        statusText.style.color = "green"
    }).catch((error) => {
        console.error(error)
        statusText.innerHTML = "Error generating image"
        statusText.style.color = "red"
        })
})

aiBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * imagePrompts.length);
    input.value = imagePrompts[randomIndex];
    statusText.innerHTML = "Prompt generated successfully!"
    statusText.style.color = "green"
    statusText.style.display = "block"
    image.style.display = "none"
})
