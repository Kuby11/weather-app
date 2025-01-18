export async function fetchData(city: string){
	const API_KEY = import.meta.env.VITE_API_KEY;
	const API_URL: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

	const response = await fetch(API_URL);

	var data = await response.json();

	if(!response){
		throw new Error('could not fetch weather data')
	}
	console.log(data);
	
	return await data
}
