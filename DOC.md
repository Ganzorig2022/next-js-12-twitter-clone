## 1 - Create a new project with NextJS, TailwindCSS and Typescript

```bash
npx create-next-app -e with-tailwindcss PROJECT_NAME
```

## 2 - NEXT-AUTH by using Google Provider

https://next-auth.js.org/getting-started/example

1. Installing next-auth

```bash
npm install next-auth
```

1.1) "pages/api/auth/[...nextauth].js"
1.2) SessionProvider-oo WRAP hiine. "/pages/\_app.tsx" dotor.

2. Installing adapters (for saving USER data to mongoDB when Google Login)
   https://next-auth.js.org/adapters/mongodb

```bash
npm i@next-auth/mongodb-adapter mongodb
```

2.1) https://cloud.mongodb.com/ - ruu orood New Project uusgene.\
2.2) Build Database --> Free --> AWS --> Create Cluster darna.\
2.3) Username --> Password-oo ogood --> Create User dr darna.--> Finish and Close dr darna. Password-oo tvr COPY-dno.\
2.4) Database --> Connect --> Connect your application\
2.5) "mongodb+srv://Ganzorig:<password>@cluster0.bedyne3.mongodb.net/?retryWrites=true&w=majority" iim linkee COPY-dno.\
2.6) .env dre MONGODB_URI=end hadgalna.\
2.7) https://next-auth.js.org/adapters/mongodb ene link dotroos "/pages/api/auth/[...nextauth].ts" dotor adapter huulna.\

3.  Configuring Google OAuth
    https://console.cloud.google.com/apis/credentials

3.1) Create New Project --> neree ogno.\
3.2) Create Credentials --> OAuth cliend ID-g songono.\
3.3) Configure Consent Screen --> dr daraad --> External --> Create dr darna.\
3.4) App name --> neree ogno.\
3.5) User support email --> mail-ee oruulna --> Save and continue\
3.6) Scopes --> .../auth/userinfo.email, .../auth/userinfo.profile 2-g chagtlana. --> Update --> Save and Continue\
3.7) Test users --> Save and Continue\
3.8) Create Credentials --> OAuth cliend ID-g songono.\
3.9) Application type --> Web application songono.\
3.10) Authorised redirect URIs --> http://localhost:3000, https://next-auth.js.org/providers/google ene 2-iig oruulna.\
3.11) Client ID, Client secret 2-oo awaad env dre huulna.\
3.12) http://localhost:3000/api/auth/signin ene linkeer orhod Google erheere newterdeg bolno.\

## Developing BACK-END

1. "/pages/api/posts.ts" dotor shineer hereglegchiin bichsen TWEET TEXT-iig "/components/PostForm.tsx" dotroos "**POST**" request irehed **MongoDB** database-d hadgalah code-iig bichiw.
2. "/models/Post.ts" dotor MongoDB-iin Post collection-ii **SCHEMA**-g bichne.

## Getting data on the FRONT-END side

https://next-auth.js.org/getting-started/typescript

1. "types/next-auth.d.ts" file uusgeed session-ees butsah utguudiin TYPE-iig zaaj ogno.
2. "/models/User.ts" Schema file-aa uusgene.
3. "lib/mongodb.ts" dr next-auth-iin Google OAuth-aar newtersen hereglegchiin medeelliig mongoDB dr hadgalahad shaardlagatai configure-iig hj ogow.
4. "lib/mongoose.ts" dr mongoDB database-rvvgee holbogdono.
5. "pages/login.tsx" dr next-auth-iin useSession()-eer newtersen hereglegchiin medeelliig barij awna.
6.

## DYNAMIC ROUTING

http://localhost:3000/[username]/status/[id]

1.

## Tailwind Theme Customizing

https://tailwindcss.com/docs/theme

1. Custom twitter colors added "/tailwind.config.js"
2. "/pages/login.tsx" "bg-twitterWhite" geed custom color ogow.

## Icon download

> https://www.iconfinder.com/icons/1298745/google_brand_branding_logo_network_icon

1. 64px songood "download in PNG" dr daraad tataj awaad
   "/public/google_logo.png" gd hadgalaw.

<!-- https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax -->
