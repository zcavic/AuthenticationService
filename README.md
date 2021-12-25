# AuthenticationService

To generate a self-signed certificate, run the following in your shell:

```bash
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```


# TODO

Must:
Reset password
Validate input data
Encrypt password
Port to Azure

Nice to have:
Use JWT token
Separate client app