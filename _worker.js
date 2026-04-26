export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/check") {
      const d = url.searchParams.get("d");
      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${d}&type=A`, {
        headers: { "accept": "application/dns-json" }
      });
      const json = await res.json();
      return new Response(JSON.stringify({ ok: json.Status === 3 }), {
        headers: { "content-type": "application/json" }
      });
    }
    return env.ASSETS.fetch(request);
  }
};
