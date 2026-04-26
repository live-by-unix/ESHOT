export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/api/check") {
      const d = url.searchParams.get("d");
      if (!d) return new Response(null, { status: 400 });
      const dns = await fetch(`https://cloudflare-dns.com/dns-query?name=${d}&type=A`, {
        headers: { "accept": "application/dns-json" }
      });
      const res = await dns.json();
      return new Response(JSON.stringify({ ok: res.Status === 3 }), {
        headers: { "content-type": "application/json" }
      });
    }
    return fetch(req);
  }
};
