import * as PortOne from '@portone/server-sdk';
import CONFIG from './config';

const clinet = PortOne.PortOneClient(CONFIG.PORTONE_API_SECRET);

const portone = {
  payment: clinet.payment,
  webhook: PortOne.Webhook,
};

export { portone };
