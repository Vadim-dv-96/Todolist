import { action } from '@storybook/addon-actions';
import { EditableSpan } from "./EditableSpan";

export default {
  title: 'EditableSpan Component',
  component: EditableSpan 
   };
  
const callback = action("Title changed")

export const EditableSpanBaseExample = () => {
  return <EditableSpan tittle='start title' onChange={callback} />
}



