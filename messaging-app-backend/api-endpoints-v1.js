var lastMessage = {};

export async function sendMessage(req, res, io) {
	console.log("Hitting this");

	const message = req.query.message;
	if (lastMessage != message) {
		lastMessage = {
			message: message,
			user: req.query.user
		};
	}

	console.log("Testing");

	res.send({success: true});
}

export async function listenToChat(req, resp) {

}