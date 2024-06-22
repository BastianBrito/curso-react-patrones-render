import React from "react";
import {TodoIcon} from './'

function DeleteIcon({onDelete}) {
  return (
    <TodoIcon
    onClick={onDelete}
    type='delete'
    color='grey'/> 
  );
}

export { DeleteIcon };
