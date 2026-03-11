export const codeExamples: Record<string, { curl: string; javascript: string; python: string }> = {
    introduction: {
        curl: `# Base URL\nhttps://api.forg.to/v1`,
        javascript: `// The forg.to API is a RESTful API\n// Base URL: https://api.forg.to/v1`,
        python: `# The forg.to API is a RESTful API\n# Base URL: https://api.forg.to/v1`
    },
    authentication: {
        curl: `curl -H "Authorization: Bearer forg_YOUR_API_KEY" \\
  https://api.forg.to/v1/users/kislay`,
        javascript: `const res = await fetch(
  'https://api.forg.to/v1/users/kislay',
  {
    headers: {
      'Authorization': 'Bearer forg_YOUR_API_KEY',
    }
  }
);
const { data } = await res.json();`,
        python: `import requests

headers = {"Authorization": "Bearer forg_YOUR_API_KEY"}

response = requests.get(
    "https://api.forg.to/v1/users/kislay",
    headers=headers,
)
print(response.json())`
    },
    "rate-limits": {
        curl: `curl -I -H "Authorization: Bearer forg_YOUR_API_KEY" \\
  https://api.forg.to/v1/users/kislay

# HTTP/2 200
# X-RateLimit-Limit: 60
# X-RateLimit-Remaining: 59
# X-RateLimit-Reset: 1741699200`,
        javascript: `const res = await fetch(
  'https://api.forg.to/v1/users/kislay',
  { headers: { 'Authorization': 'Bearer forg_YOUR_API_KEY' } }
);
console.log(res.headers.get('X-RateLimit-Remaining')); // "59"
console.log(res.headers.get('X-RateLimit-Reset'));     // unix timestamp`,
        python: `response = requests.get(
    'https://api.forg.to/v1/users/kislay',
    headers={"Authorization": "Bearer forg_YOUR_API_KEY"},
)
print(response.headers.get('X-RateLimit-Remaining'))  # "59"
print(response.headers.get('X-RateLimit-Reset'))       # unix timestamp`
    },
    errors: {
        curl: `curl -H "Authorization: Bearer forg_YOUR_API_KEY" \\
  https://api.forg.to/v1/users/this_user_does_not_exist

# HTTP/2 404
# {
#   "error": {
#     "code": "not_found",
#     "message": "User not found"
#   }
# }`,
        javascript: `const res = await fetch('https://api.forg.to/v1/users/not_found');
if (!res.ok) {
  const data = await res.json();
  console.error(data.error.code); // 'not_found'
}`,
        python: `response = requests.get('https://api.forg.to/v1/users/not_found')
if not response.ok:
    data = response.json()
    print(data['error']['code']) # 'not_found'`
    },
    products: {
        curl: `curl -H "Authorization: Bearer forg_YOUR_API_KEY" \\
  "https://api.forg.to/v1/products?limit=5&sort=trending"`,
        javascript: `const searchParams = new URLSearchParams({
  limit: '5',
  sort: 'trending'
});

const res = await fetch(
  \`https://api.forg.to/v1/products?\${searchParams}\`,
  { headers: { 'Authorization': 'Bearer forg_YOUR_API_KEY' } }
);
const data = await res.json();`,
        python: `import requests

params = {
    "limit": 5,
    "sort": "trending"
}
headers = {
    "Authorization": "Bearer forg_YOUR_API_KEY"
}

response = requests.get(
    "https://api.forg.to/v1/products",
    params=params,
    headers=headers
)
data = response.json()`
    },
    users: {
        curl: `curl -H "Authorization: Bearer forg_YOUR_API_KEY" \\
  https://api.forg.to/v1/users/kislay`,
        javascript: `const res = await fetch(
  'https://api.forg.to/v1/users/kislay',
  { headers: { 'Authorization': 'Bearer forg_YOUR_API_KEY' } }
);
const { data } = await res.json();
// data.username, data.stats.products, etc.`,
        python: `import requests

headers = {"Authorization": "Bearer forg_YOUR_API_KEY"}

response = requests.get(
    "https://api.forg.to/v1/users/kislay",
    headers=headers,
)
data = response.json()["data"]`
    },
    changelog: {
        curl: `# No requests needed — this is reference documentation.
# Visit https://api.forg.to/docs#changelog`,
        javascript: `// Changelog is documentation — no API call needed.
// Subscribe to updates at https://forg.to`,
        python: `# Changelog is documentation — no API call needed.
# Subscribe to updates at https://forg.to`
    }
};
