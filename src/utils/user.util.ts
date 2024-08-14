import jwt from 'jsonwebtoken';
import config from '../config/config';
import amqp from 'amqplib'

var exchange = 'myexchange'
export default class Util {
  public async login(id, username) {
    const token = await jwt.sign({ id, username }, config.development.secret, {
      expiresIn: '1h'
    });
    return token;
  }

  public async verify(body) {
    const data = await jwt.verify(body, config.development.secret);
    return data;
  }

  public forgetUser = async (body) => {
    const token = await jwt.sign({ email: body }, config.development.secret2, {
      expiresIn: '1h'
    });
    return token;
  };

  public forgetUseVerify = async (token) => {
    const { email }: any = await jwt.verify(token, config.development.secret2);
    return email;
  };


  public async sendMessage(message) {
    try {

        let data = JSON.stringify(message);

        const client = await amqp.connect('amqp://localhost');

        const channel = await client.createChannel();

        await channel.assertExchange(exchange, 'fanout', { durable: false });

        channel.publish(exchange, '', Buffer.from(data));
        console.log(`Sent: ${data}`);

    } catch (error) {
        console.log(error);
    }
}
}
