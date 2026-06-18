export const api = {
  async get(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error GET ${url}`);
    return res.json();
  },

  async post(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error POST ${url}`);
    return res.json();
  },
};
