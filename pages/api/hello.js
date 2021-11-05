/**
 * All HTTP request methods (ie. GET, POST) go to this function. Use req.method
 * to see which was used and, if necessary, perform request-specific tasks.
 *
 * req is http.IncomingMessage plus some pre-built middlewares
 * res is http.ServerResponse plus some helper functions
 */
export default function handler(req, res) {
	res.status(200).json({ text: 'Hello via API' });
}
