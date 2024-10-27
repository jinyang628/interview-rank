(() => {
	const { relList } = document.createElement('link');
	if (relList && relList.supports && relList.supports('modulepreload')) {
		return;
	}
	for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
		processPreload(link);
	}
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== 'childList') {
				continue;
			}
			for (const node of mutation.addedNodes) {
				if (node.tagName === 'LINK' && node.rel === 'modulepreload') { processPreload(node); }
			}
		}
	}).observe(document, {
		childList: true,
		subtree: true,
	});
	const getFetchOptions = (link) => {
		const fetchOptions = {};
		if (link.integrity) { fetchOptions.integrity = link.integrity; }
		if (link.referrerPolicy) { fetchOptions.referrerPolicy = link.referrerPolicy; }
		if (link.crossOrigin === 'use-credentials') { fetchOptions.credentials = 'include'; } else if (link.crossOrigin === 'anonymous') { fetchOptions.credentials = 'omit'; } else { fetchOptions.credentials = 'same-origin'; }
		return fetchOptions;
	};
	function processPreload(link) {
		if (link.ep) { return; }
		link.ep = true;
		const fetchOptions = getFetchOptions(link);
		fetch(link.href, fetchOptions);
	}
})();
const print = (method, ...args) => {
	if (typeof args[0] === 'string') {
		const message = args.shift();
		method(`[wxt] ${message}`, ...args);
	} else {
		method('[wxt]', ...args);
	}
};
const logger = {
	debug: (...args) => print(console.debug, ...args),
	log: (...args) => print(console.log, ...args),
	warn: (...args) => print(console.warn, ...args),
	error: (...args) => print(console.error, ...args),
};
let ws;
const getDevServerWebSocket = () => {
	if (ws == null) {
		const serverUrl = `${'ws:'}//${'localhost'}:${3e3}`;
		logger.debug('Connecting to dev server @', serverUrl);
		ws = new WebSocket(serverUrl, 'vite-hmr');
		ws.addWxtEventListener = ws.addEventListener.bind(ws);
		ws.sendCustom = (event, payload) => (ws == null
			? void 0
			: ws.send(JSON.stringify({
				type: 'custom',
				event,
				payload,
			})));
		ws.addEventListener('open', () => {
			logger.debug('Connected to dev server');
		});
		ws.addEventListener('close', () => {
			logger.debug('Disconnected from dev server');
		});
		ws.addEventListener('error', (event) => {
			logger.error('Failed to connect to dev server', event);
		});
		ws.addEventListener('message', (e) => {
			try {
				const message = JSON.parse(e.data);
				if (message.type === 'custom') {
					ws == null
						? void 0
						: ws.dispatchEvent(
							new CustomEvent(message.event, { detail: message.data }),
						);
				}
			} catch (error) {
				logger.error('Failed to handle message', error);
			}
		});
	}
	return ws;
};
{
	try {
		const ws2 = getDevServerWebSocket();
		ws2.addWxtEventListener('wxt:reload-page', (event) => {
			if (event.detail === location.pathname.slice(1)) { location.reload(); }
		});
	} catch (error) {
		logger.error('Failed to setup web socket connection with dev server', error);
	}
}
// # sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtQnh6VVRvUGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS93eHRAMC4xOS4xM19AdHlwZXMrbm9kZUAyMi44LjFfcm9sbHVwQDQuMjQuMC9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvdmlydHVhbC9yZWxvYWQtaHRtbC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcHJpbnQobWV0aG9kLCAuLi5hcmdzKSB7XG4gIGlmIChpbXBvcnQubWV0YS5lbnYuTU9ERSA9PT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgcmV0dXJuO1xuICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYXJncy5zaGlmdCgpO1xuICAgIG1ldGhvZChgW3d4dF0gJHttZXNzYWdlfWAsIC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIG1ldGhvZChcIlt3eHRdXCIsIC4uLmFyZ3MpO1xuICB9XG59XG5jb25zdCBsb2dnZXIgPSB7XG4gIGRlYnVnOiAoLi4uYXJncykgPT4gcHJpbnQoY29uc29sZS5kZWJ1ZywgLi4uYXJncyksXG4gIGxvZzogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUubG9nLCAuLi5hcmdzKSxcbiAgd2FybjogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUud2FybiwgLi4uYXJncyksXG4gIGVycm9yOiAoLi4uYXJncykgPT4gcHJpbnQoY29uc29sZS5lcnJvciwgLi4uYXJncylcbn07XG5cbmxldCB3cztcbmZ1bmN0aW9uIGdldERldlNlcnZlcldlYlNvY2tldCgpIHtcbiAgaWYgKGltcG9ydC5tZXRhLmVudi5DT01NQU5EICE9PSBcInNlcnZlXCIpXG4gICAgdGhyb3cgRXJyb3IoXG4gICAgICBcIk11c3QgYmUgcnVubmluZyBXWFQgZGV2IGNvbW1hbmQgdG8gY29ubmVjdCB0byBjYWxsIGdldERldlNlcnZlcldlYlNvY2tldCgpXCJcbiAgICApO1xuICBpZiAod3MgPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlcnZlclVybCA9IGAke19fREVWX1NFUlZFUl9QUk9UT0NPTF9ffS8vJHtfX0RFVl9TRVJWRVJfSE9TVE5BTUVfX306JHtfX0RFVl9TRVJWRVJfUE9SVF9ffWA7XG4gICAgbG9nZ2VyLmRlYnVnKFwiQ29ubmVjdGluZyB0byBkZXYgc2VydmVyIEBcIiwgc2VydmVyVXJsKTtcbiAgICB3cyA9IG5ldyBXZWJTb2NrZXQoc2VydmVyVXJsLCBcInZpdGUtaG1yXCIpO1xuICAgIHdzLmFkZFd4dEV2ZW50TGlzdGVuZXIgPSB3cy5hZGRFdmVudExpc3RlbmVyLmJpbmQod3MpO1xuICAgIHdzLnNlbmRDdXN0b20gPSAoZXZlbnQsIHBheWxvYWQpID0+IHdzPy5zZW5kKEpTT04uc3RyaW5naWZ5KHsgdHlwZTogXCJjdXN0b21cIiwgZXZlbnQsIHBheWxvYWQgfSkpO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsICgpID0+IHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcIkNvbm5lY3RlZCB0byBkZXYgc2VydmVyXCIpO1xuICAgIH0pO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCAoKSA9PiB7XG4gICAgICBsb2dnZXIuZGVidWcoXCJEaXNjb25uZWN0ZWQgZnJvbSBkZXYgc2VydmVyXCIpO1xuICAgIH0pO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGxvZ2dlci5lcnJvcihcIkZhaWxlZCB0byBjb25uZWN0IHRvIGRldiBzZXJ2ZXJcIiwgZXZlbnQpO1xuICAgIH0pO1xuICAgIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChlKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSBcImN1c3RvbVwiKSB7XG4gICAgICAgICAgd3M/LmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQobWVzc2FnZS5ldmVudCwgeyBkZXRhaWw6IG1lc3NhZ2UuZGF0YSB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2dnZXIuZXJyb3IoXCJGYWlsZWQgdG8gaGFuZGxlIG1lc3NhZ2VcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gd3M7XG59XG5cbmlmIChpbXBvcnQubWV0YS5lbnYuQ09NTUFORCA9PT0gXCJzZXJ2ZVwiKSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgd3MgPSBnZXREZXZTZXJ2ZXJXZWJTb2NrZXQoKTtcbiAgICB3cy5hZGRXeHRFdmVudExpc3RlbmVyKFwid3h0OnJlbG9hZC1wYWdlXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmRldGFpbCA9PT0gbG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyaW5nKDEpKVxuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nZ2VyLmVycm9yKFwiRmFpbGVkIHRvIHNldHVwIHdlYiBzb2NrZXQgY29ubmVjdGlvbiB3aXRoIGRldiBzZXJ2ZXJcIiwgZXJyKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIndzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBUyxNQUFNLFdBQVcsTUFBTTtBQUc5QixNQUFJLE9BQU8sS0FBSyxDQUFDLE1BQU0sVUFBVTtBQUN6QixVQUFBLFVBQVUsS0FBSztBQUNyQixXQUFPLFNBQVMsT0FBTyxJQUFJLEdBQUcsSUFBSTtBQUFBLEVBQUEsT0FDN0I7QUFDRSxXQUFBLFNBQVMsR0FBRyxJQUFJO0FBQUEsRUFDekI7QUFDRjtBQUNBLE1BQU0sU0FBUztBQUFBLEVBQ2IsT0FBTyxJQUFJLFNBQVMsTUFBTSxRQUFRLE9BQU8sR0FBRyxJQUFJO0FBQUEsRUFDaEQsS0FBSyxJQUFJLFNBQVMsTUFBTSxRQUFRLEtBQUssR0FBRyxJQUFJO0FBQUEsRUFDNUMsTUFBTSxJQUFJLFNBQVMsTUFBTSxRQUFRLE1BQU0sR0FBRyxJQUFJO0FBQUEsRUFDOUMsT0FBTyxJQUFJLFNBQVMsTUFBTSxRQUFRLE9BQU8sR0FBRyxJQUFJO0FBQ2xEO0FBRUEsSUFBSTtBQUNKLFNBQVMsd0JBQXdCO0FBSy9CLE1BQUksTUFBTSxNQUFNO0FBQ2QsVUFBTSxZQUFZLEdBQUcsS0FBdUIsS0FBSyxXQUF1QixJQUFJLEdBQW1CO0FBQ3hGLFdBQUEsTUFBTSw4QkFBOEIsU0FBUztBQUMvQyxTQUFBLElBQUksVUFBVSxXQUFXLFVBQVU7QUFDeEMsT0FBRyxzQkFBc0IsR0FBRyxpQkFBaUIsS0FBSyxFQUFFO0FBQ3BELE9BQUcsYUFBYSxDQUFDLE9BQU8sWUFBWSx5QkFBSSxLQUFLLEtBQUssVUFBVSxFQUFFLE1BQU0sVUFBVSxPQUFPLFFBQUEsQ0FBUztBQUMzRixPQUFBLGlCQUFpQixRQUFRLE1BQU07QUFDaEMsYUFBTyxNQUFNLHlCQUF5QjtBQUFBLElBQUEsQ0FDdkM7QUFDRSxPQUFBLGlCQUFpQixTQUFTLE1BQU07QUFDakMsYUFBTyxNQUFNLDhCQUE4QjtBQUFBLElBQUEsQ0FDNUM7QUFDRSxPQUFBLGlCQUFpQixTQUFTLENBQUMsVUFBVTtBQUMvQixhQUFBLE1BQU0sbUNBQW1DLEtBQUs7QUFBQSxJQUFBLENBQ3REO0FBQ0UsT0FBQSxpQkFBaUIsV0FBVyxDQUFDLE1BQU07QUFDaEMsVUFBQTtBQUNGLGNBQU0sVUFBVSxLQUFLLE1BQU0sRUFBRSxJQUFJO0FBQzdCLFlBQUEsUUFBUSxTQUFTLFVBQVU7QUFDekIsbUNBQUE7QUFBQSxZQUNGLElBQUksWUFBWSxRQUFRLE9BQU8sRUFBRSxRQUFRLFFBQVEsTUFBTTtBQUFBO0FBQUEsUUFFM0Q7QUFBQSxlQUNPLEtBQUs7QUFDTCxlQUFBLE1BQU0sNEJBQTRCLEdBQUc7QUFBQSxNQUM5QztBQUFBLElBQUEsQ0FDRDtBQUFBLEVBQ0g7QUFDTyxTQUFBO0FBQ1Q7QUFFeUM7QUFDbkMsTUFBQTtBQUNGLFVBQU1BLE1BQUs7QUFDWEEsUUFBRyxvQkFBb0IsbUJBQW1CLENBQUMsVUFBVTtBQUNuRCxVQUFJLE1BQU0sV0FBVyxTQUFTLFNBQVMsVUFBVSxDQUFDO0FBQ2hELGlCQUFTLE9BQU87QUFBQSxJQUFBLENBQ25CO0FBQUEsV0FDTSxLQUFLO0FBQ0wsV0FBQSxNQUFNLHlEQUF5RCxHQUFHO0FBQUEsRUFDM0U7QUFDRjsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
