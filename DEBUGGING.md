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
