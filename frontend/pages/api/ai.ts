import type {NextApiRequest, NextApiResponse} from 'next';
import {Configuration, OpenAIApi} from 'openai';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    title,
    description,
    university,
    name,
  }: {title: string; description: string; university: string; name: string} =
    req.body;
  const userContent =
    'タイトル: ' +
    title +
    '\n' +
    '内容: ' +
    description +
    '\n' +
    '大学: ' +
    university +
    '\n' +
    '名前: ' +
    name +
    '\n';
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'assistant',
        content:
          '僕ははひよこだピヨ！あなたの学食のご飯の投稿の内容に基づいて，投稿に対してコメントを書くピヨ！',
      },
      {role: 'user', content: userContent},
    ],
  });
  const responseText = completion.data.choices[0].message?.content;
  res.status(200).json({responseText});
};
