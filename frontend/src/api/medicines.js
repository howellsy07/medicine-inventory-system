const API_URL = import.meta.env.VITE_API_URL ?? '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(body.message || 'The server could not complete the request.');
    error.status = response.status;
    error.errors = body.errors ?? {};
    throw error;
  }

  return body;
}

export function getMedicines() {
  return request('/medicines');
}

export function getMedicine(id) {
  return request(`/medicines/${id}`);
}

export function createMedicine(medicine) {
  return request('/medicines', {
    method: 'POST',
    body: JSON.stringify(medicine),
  });
}

