# Implementing JWT in Spring Boot

## JWT

- [Information on JWT](https://auth0.com/docs/jwt)
- Composed of a header, payload, and signature.
  - JWT format is `{header}.{payload}.{signature}`
  - The header contains thetToken type and the algorithm to be used in the signature.
  - The payload contains the claims.
    - This just means things like username and role information, or whatever is actually used to authenticate/authorize.
  - The signature contains an encoded version of the header, an encoded version of the payload, a secret, and the algorithm of the header.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}

{
  "sub": "1234",
  "name": "Sareeta Panda",
  "admin": true
}

HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

- JWT replaces SAML and SWT in most applications today.
