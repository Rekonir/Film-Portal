import "../../../App/App.scss";
import "../../../App/reset.scss";
import type { Meta, StoryObj } from '@storybook/react';
import Paginator, { PaginatorProps } from './Paginator';

const meta: Meta<PaginatorProps> = {
  title: 'Paginator',
  component: Paginator,
};

export default meta;

export const Default: StoryObj<PaginatorProps> = {
  args: {
    sliderWidth: 5000,
    scroll: 0
  },
};
