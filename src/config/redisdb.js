import { createClient } from 'redis';

export const client=createClient();
const redis =async()=>{
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
}

export default redis;