import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from "./App";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";



export default {
  title: 'TODOLISTS/App',
  component: ()=><App demo={true}/>,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App > = () => <App demo={true}/>

export const AppStory = Template.bind({});
AppStory.args = {};

