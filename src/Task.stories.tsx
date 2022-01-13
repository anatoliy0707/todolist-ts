import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';
import { TaskPriorityes, TaskStatuses } from './api/todolist-api';




export default {
  title: 'TODOLISTS/Task',
  component: Task,
  argTypes:{
    removeTask: {description: 'removeTask'},
    changeTaskStatus: {description: 'changeTaskStatus'},
    changeTaskTitle: {description: 'changeTaskTitle'},
    todolistID: {description: 'todolistID'},
    task: {description: 'Task Type'}
  },
  args: {
    removeTask: action('removeTask'),
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
  }
} as ComponentMeta<typeof Task>;



const Template: ComponentStory<typeof Task> = (args:TaskPropsType) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
  todolistID: 'todolistID1',
  task: { id: "taskID1", status: TaskStatuses.Completed, title: 'JS', order: 0, addedDate: '', deadline: null, description: '', 
  priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1' },
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
  todolistID: 'todolistID1',
  task: { id: "taskID2", status: TaskStatuses.New, title: 'HTML', order: 0, addedDate: '', deadline: null, description: '', 
  priority: TaskPriorityes.Low, startDate: '', todoListId: 'todolistId1' },
};
