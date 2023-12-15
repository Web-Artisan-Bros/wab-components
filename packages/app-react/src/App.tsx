import './App.css';
import { WabTextInput, WabCheckboxInput, WabFormBuilder,  defineCustomElements } from 'react-library';
import { useState } from 'react';
import { WabFormSchema } from 'wab-components';

defineCustomElements();

function App () {
  const [count] = useState(0);
  const formSchema: WabFormSchema = {
    lazy: true,
    useAjax: true,
    fields: [
      {
        type: 'text',
        name: 'nome',
        label: 'Nome Utente',
        placeholder: 'Inserisci il tuo nomeeeee',
        conditions: (formData) => formData.cognome === 'ciao',
        validators: (yup) => yup.string().defined().min(4),
      },
      {
        type: 'text',
        name: 'cognome',
        label: 'Cognome',
        placeholder: 'Inserisci il tuo cognome',
        readonly: true,
        value: 'ciao',
        validators: (yup) => yup.string().required(),
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email',
         // disabled: (formData) => !formData?.hasEmail,
        conditions: (formData) => formData?.hasEmail,
        details: 'Inserisci la tua email',
        // validators: (yup) => yup.string().email().required(),
      },
      {
        type: 'checkbox',
        name: 'hasEmail',
        label: 'Permetti Email',
        details: 'Inserisci la tua email',
        checked: true,
        value: 'si',
      },
    ],
    onSubmit: async (formData) => {
      console.log('submittinh', formData);
      
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            data: {
              message: 'ok',
            },
          });
        }, 2000);
      });
      
      console.log('res', res);
    },
  };
  
  return (
    <>
      <h1 className='text-4xl'>Wab Components</h1>
      <WabTextInput label={count + '_label'} name={''}></WabTextInput>
      <WabCheckboxInput label={count + '_label'} name={''}></WabCheckboxInput>
      
      <WabFormBuilder schema={formSchema} useAjax={false} action="" ></WabFormBuilder>
    </>
  );
}

export default App;
