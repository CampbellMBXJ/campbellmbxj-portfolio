import { ChannelName } from '../types';
import { Page } from './_app';


const Who: Page = () => {
  return (
    <h1>ME</h1>
  );
}

Who.getChannel = () => ChannelName['02 WHO']

export default Who;