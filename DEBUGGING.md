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
