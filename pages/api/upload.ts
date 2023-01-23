import type { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import { initMongoose } from '../../lib/mongoose';
import { authOptions } from './auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import User from '../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();

  const session = await unstable_getServerSession(req, res, authOptions);

  //==================1) PREPARING=======================
  //aws-iin account-aasa utguudaa awna.
  const s3Client = new S3({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    // signatureVersion: 'v4',
  });

  //saving to "public" folder
  const form = new multiparty.Form({
    uploadDir: './public', //public folder-t upload hsen zurag hadgalagdana.
  });

  // front tald image drag drop hiihed
  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw err;
    }

    //===============2) UPLOAD PROCESS==============
    //1) Getting type 'cover' or 'image'
    const type = Object.keys(files)[0];

    //2) Getting fileInfo "path:"public\\GbAYhz8i2AJ47IQHB-3Gx8TV.jpg"
    const fileInfo = files[type][0];
    //3)  Getting fileName "GbAYhz8i2AJ47IQHB-3Gx8TV.jpg"
    const fileName = fileInfo.path.split('\\')[1];

    //4) Uploading to AWS-S3 service
    s3Client.upload(
      {
        Bucket: 'twitter-clone-ganzo',
        Body: fs.readFileSync(fileInfo.path),
        ACL: 'public-read',
        Key: fileName,
        ContentType: fileInfo.headers['content-type'],
      },
      // returning response from AWS
      async (err: any, data: any) => {
        if (type === 'cover' || type === 'image') {
          //updating image depends on "cover img" or "avatar img"
          await User.findByIdAndUpdate(session?.user.id, {
            [type]: data.Location, //cover:'img url" irne.
          });
        }

        // removing image from "/public/14NDuTXC1Xjms-LPE5R-gCfj.jpg"
        fs.unlinkSync(fileInfo.path);

        //5) RETURNING FINAL RESULT
        res.json({ files, err, data, fileInfo, src: data.Location });
      }
    );
  });
}

//https://nextjs.org/docs/api-routes/request-helpers
export const config = {
  api: {
    bodyParser: false,
  },
};

//https://medium.com/analytics-vidhya/upload-web-app-using-node-to-aws-s3-bcd7cc03ebd
