export function sendMessage(message, user, room) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'},
		body: JSON.stringify({message: message, user: user, room: room})
	};

	fetch('http://localhost:8000/sendMessage', requestOptions)
		.then(res => res.json())
		.then((result) => {
			console.log(result);
		});
}