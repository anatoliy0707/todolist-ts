import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from "./EditableSpan";



export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {description: 'Value EditableSpan changed'},
        title: {
            defaultValue: "HTML",
            description: "Start value EditableSpan"
        }
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
EditableSpanStory.args = {
    onChange: action('Value EditableSpan changed')
};
