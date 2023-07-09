async function fetchData() {
    try {
        const response = await fetch("http://localhost:3000/disease");
        return response.json();
    } catch (error) {
        // Handle any errors
        console.error(error);
        throw error;
    }
}

async function loadData() {
    try {
        const diseaseValues = [];
        const response = await fetchData();
        const data = response;
        for (let counter = 0; counter < data.length; counter++) {
            diseaseValues.push(data[counter].disease);
        }
        return diseaseValues;
    } catch (error) {
        // Handle any errors
        console.error(error);
        throw error;
    }
}
