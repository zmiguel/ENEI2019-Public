
export const validation = {
    email: {
        presence: {
            message: 'Introduza um endereço de email'
        },
        format: {
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Introduza um endereço de email válido'
        }
    },

    password: {
        presence: {
            message: 'Introduza uma password'
        },
        length: {
            minimum: {
                value: 6,
                message: `A password deve ter no mínimo 6 carateres`
            }
        }
    },

};


export function Validate(nameField, value) {
    let response = [null, null];

    if (validation.hasOwnProperty(nameField)) {
        //Validação
        let v = validation[nameField];
        if (value == ''|| value == null){
            //há erro - true
            response[0] = true;
            response[1] = v['presence']['message'];
        }
        else if (v.hasOwnProperty('format') && !v['format']['pattern'].test(value)) {
            response[0] = true;
            response[1] = v['format']['message'];
        }
        else if (v.hasOwnProperty('length')){
            let l = v['length'];

            if (l.hasOwnProperty('minimum') && value.length<l['minimum']['value']){
                response[0] = true;
                response[1] = l['minimum']['message'];
            }
            else if (l.hasOwnProperty('maximum') && value.length<l['maximum']['value']) {
                response[0] = true;
                response[1] = l['maximum']['message'];
            }
        }
    }
    else {
        response[0] = false;
    }
    return response;

}
