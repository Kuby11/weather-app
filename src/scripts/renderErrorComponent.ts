export async function errorComponent(message: string){
	const errorMsg = `
		<span class="error-component__icon"></span>
		<h3><b>error</b>: ${message}</h3>`;

	const component = document.createElement('div');
	component.innerHTML = errorMsg;

	document.body.appendChild(component).className = 'error-component';
	await new Promise(resolve => setTimeout(resolve, 1))
	component.classList.add('show-component');
	await new Promise(resolve => setTimeout(resolve, 4000))
	component.classList.remove('show-component')
	await new Promise(resolve => setTimeout(resolve, 1000))
	document.body.removeChild(component);
}

export default errorComponent;
