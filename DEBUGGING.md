## 1 Type 'string | undefined' is not assignable to type 'string'.

https://bobbyhadz.com/blog/typescript-type-undefined-is-not-assignable-to-type-string

"/pages/api/auth/[...nextauth].ts" dotor client id, client secret 2 dr type-iin aldaa zaawal deerh link deerh shig "!" temdeg ard ni tawiad alga bolgono.

Eswel doorh commentiig oruulj bolno.
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion

## 2 Type 'string' is not assignable to type 'SessionStrategy | undefined'

//https://stackoverflow.com/questions/74244256/type-string-is-not-assignable-to-type-sessionstrategy-undefined

session: {strategy:'jwt' } aldaa garwal
session: {strategy:'jwt' as const } gej zasaw.

## 3 Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)

"/lib/mongodb.ts" dotor "global.\_mongoClientPromise" aldaa zaawal...doorh linkeer...

https://stackoverflow.com/questions/70766870/next-js-with-mongodb-convert-to-typescript

## 4 - next-auth JWEDecryptionFailed

Terminal dr iim aldaa garwal
https://next-auth.js.org/configuration/options

1. env dr NEXTAUTH_SECRET-ee oruulna.
2. "/pages/api/auth/[...nextauth].ts" dotroo secret:process.env.NEXTAUTH_secret gej oruulj ogno.

## 5 - React Time-ago date typescript error

https://stackoverflow.com/questions/72503116/typescript-libraryreact-time-ago-thinks-it-requires-a-number-im-giving-it-a

## 6 - Google OAuth2: Error 401 - invalid_client

Herwee Vercel dr deploy-dood linkeeree deploydson linkeeree orood Google-eer newtreh gewel iim aldaa garwal

> https://stackoverflow.com/questions/51179066/google-oauth2-error-401-invalid-client

1. .env dr GOOGLE_CLIENT_ID-gee vercel dr buruu hsen bj boljoshgv...

## 7 - Error 400: redirect_uri_mismatch

> https://console.cloud.google.com/

1. deerh linkeer orood Credentials-rvvgee orood --> Authorised redirect URIs dr "https://next-js-12-twitter-clone.vercel.app/api/auth/callback/google" ene URL-iig zow zaaj ogno.
2.

## 8 - DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7

https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-will-be-switched-back-to

## 9 - Property does not exist on type '{}' in TypeScript [Error ts(2345)]

> https://bobbyhadz.com/blog/typescript-property-does-not-exist-on-type

1. Type guard method

   ERROR --> const { bio, name, username }:User = originalUserInfo;

   CORRECT --> const { bio, name, username } = originalUserInfo as User;

## 10 -How to setState with an object in Typescript? [Error ts(2345)]

> https://stackoverflow.com/questions/71791207/how-to-setstate-with-an-object-in-typescript-error-ts2345

CORRECT --> setProfileInfo((prev) => ({ ...prev, bio, name, username } as User));
