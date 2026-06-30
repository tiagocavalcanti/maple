const ENDPOINT = "https://maple-production-deda.up.railway.app/v1/traces";

function id(n) { return [...crypto.getRandomValues(new Uint8Array(n))].map(b => b.toString(16).padStart(2, "0")).join(""); }

const now = Date.now() * 1e6; // ns
const traceId = id(16);
const rootId = id(8);
const childId = id(8);

const body = {
  resourceSpans: [{
    resource: { attributes: [{ key: "service.name", value: { stringValue: "poc-checkout" } }] },
    scopeSpans: [{
      scope: { name: "manual-test" },
      spans: [
        { traceId, spanId: rootId, name: "GET /checkout", kind: 2,
          startTimeUnixNano: String(now), endTimeUnixNano: String(now + 120e6),
          attributes: [{ key: "http.method", value: { stringValue: "GET" } },
                       { key: "http.status_code", value: { intValue: 200 } }] },
        { traceId, spanId: childId, parentSpanId: rootId, name: "db.query users", kind: 3,
          startTimeUnixNano: String(now + 10e6), endTimeUnixNano: String(now + 95e6),
          attributes: [{ key: "db.system", value: { stringValue: "postgres" } }] }
      ]
    }]
  }]
};

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body)
});
console.log(res.status, await res.text());
