# Library client for PostgreSQL DB written in electron

A semester project involving the creation of a client application operating on the PostgreSQL database. The application allows for all CRUD operation.
The project allowed me to develop my JavaScript programming skills.


## Run Locally

Clone the project

```bash
  git clone https://github.com/Opyd/library_client_electron
```

Go to the project directory

```bash
  cd library_client_electron
```

Install dependencies

```bash
  npm install
```

Run docker-compose to create PostgreSQL DB instance

```bash
  docker-compose up -d
```


Start the server

```bash
  npm run start
```


## Tech Stack

 - [Electron](https://www.electronjs.org/)
 - [pg](https://www.npmjs.com/package/pg)
