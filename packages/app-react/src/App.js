"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_library_1 = require("react-library");
const react_1 = require("react");
(0, react_library_1.defineCustomElements)();
function App() {
    const [count] = (0, react_1.useState)(0);
    const formSchema = {
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
                conditions: (formData) => formData === null || formData === void 0 ? void 0 : formData.hasEmail,
                details: 'Inserisci la tua email',
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
        onSubmit: (formData) => __awaiter(this, void 0, void 0, function* () {
            console.log('submittinh', formData);
            const res = yield new Promise((resolve) => {
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
        }),
    };
    return (<>
      <h1 className='text-4xl'>Wab Components</h1>
      <react_library_1.WabTextInput label={count + '_label'} name={''}></react_library_1.WabTextInput>
      <react_library_1.WabCheckboxInput label={count + '_label'} name={''}></react_library_1.WabCheckboxInput>
      
      <react_library_1.WabFormBuilder schema={formSchema} useAjax={false} action=""></react_library_1.WabFormBuilder>
    </>);
}
exports.default = App;
//# sourceMappingURL=App.js.map