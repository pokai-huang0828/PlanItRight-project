import React from 'react';

import ButtonGroupItem from './ButtonGroupItem';

const TaskStatusBarItems = [
  <ButtonGroupItem label="All" badgeLabel="primary" />,
  <ButtonGroupItem label="BackLog" badgeLabel="error" />,
  <ButtonGroupItem label="Progress" badgeLabel="warning" />,
  <ButtonGroupItem label="Completed" badgeLabel="success" />,
];

export default TaskStatusBarItems;
