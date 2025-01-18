import { Tdata } from './renderData';

const appBackground = document.querySelector(".app-background") as HTMLElement;

export function changeBackground(data: Tdata): void {
	const {weather: [{ id, icon }]} = data;
	let color1 = '--color-first:'
	let color2 = '--color-second:'
	switch (true) {
		case (id >= 200 && id < 600 && id >= 700 && id < 800):
			appBackground.style.cssText = `${color1}var(--light-gray); ${color2}var(--dark-gray);`
			break;
		case (id >= 300 && id < 400):
			appBackground.style.cssText = `${color1}var(--dark-gray); ${color2}var(--very-dark-gray)`;
			break;
		case (id >= 600 && id < 700):
			appBackground.style.cssText = `${color1}var(--very-light-blue); ${color2}var(--grayish-light-blue);`
			break;
		case (id === 800):
			if(icon.includes("d")){
				appBackground.style.cssText = `${color1}var(--light-blue-color); ${color2}var(--blue-color);`
			}else{
				appBackground.style.cssText = `${color1}var(--dark-blue); ${color2}var(--dark-purple);`
			}
			break;
		case (id >= 700 && id < 800):
			appBackground.style.cssText = `${color1}var(--light-gray); ${color2}var(--dark-gray);`
			break;
		case (id > 800):
			if(icon.includes("d")){
				appBackground.style.cssText = `${color1}var(--light-gray); ${color2}var(--dark-gray);`
			}else{
				appBackground.style.cssText = `${color1}var(--dark-blue); ${color2}var(--dark-purple);`
			}
			break;
		default:
			break;
	}
}
