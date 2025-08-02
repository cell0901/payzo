# Clone the repo
```
git clone https://github.com/myreponame
```

* npm install
* Run postgres either locally or on the cloud (neon.tech)
```
docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

* Copy over all .env.example files to .env
* Update .env files everywhere with the right db url
* Go to `packages/db`

  ○ npx prisma migrate dev

  ○ npx prisma db seed

Go to `apps/user-app` , run `npm run dev`

Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)

! You might some errors on Components importing from `lucide-react`, thats because of the version mismatch of react and @types/react. But it doesnt affects the code

`Also the dashboard page is currently dummy but u just need to imoprt the balances and transfers component to it. You can igore it`
