## CC-photo-front 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started to deploy it locally

First , in you project folder :

```
git clone git@github.com:jpLedos/cc-photos-front
cd cc-photos-front
npm install
```

Second step , run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## modify API server url : 

### first 
install locally  API STRAPI follow link [Github](https://github.com/jpLedos/cc-photos-back)


### don't forget
Modify next.config.js for local or distant access to back-end regarding your choice

```
  env: {
    STRAPI_API_URL: 'http://localhost:1337' ,
    // STRAPI_API_URL: 'https://cc-photos-back.herokuapp.com' 
  },
  
  ```


