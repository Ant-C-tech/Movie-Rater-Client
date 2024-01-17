import "./style.css";

import { Form } from 'react-bulma-components';

const { Field, Label, Input, Textarea, Control } = Form;

export const MovieForm = ({ title = '', setTitle, description = '', setDescription }) => {
  return (
    <div className="movie-form">
      <Field>
        <Label className='movie-form-label' size='medium'>
          Movie Title
        </Label>
        <Control>
          <Input
            value={title}
            placeholder='e.g. The Godfather'
            type="text"
            maxLength={32}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Control>
      </Field>
      <Field>
        <Label className='movie-form-label' size='medium'>
          Movie Description
        </Label>
        <Control>
          <Textarea
            value={description}
            placeholder='e.g. The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
            type="text"
            rows={6}
            maxLength={360}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Control>
      </Field>
    </div>
  )
}
