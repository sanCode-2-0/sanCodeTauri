let diseasesData = [];
//Fetch from the endpoint  http://localhost:3000/disease
const response = await fetch("http://localhost:3000/disease");
const data = await response.json();

for(let counter = 0; counter < data.length; counter++){
    diseasesData = [...diseasesData, data[counter].disease];
}

export default diseasesData;
