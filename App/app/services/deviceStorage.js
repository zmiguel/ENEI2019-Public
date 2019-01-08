import { AsyncStorage } from 'react-native';

const deviceStorage = {

    async saveItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(`Erro a guardar! \n${error.message}`);
        }
    },


    //Carregar token
    async loadJWT() {
        try {
            const value = await AsyncStorage.getItem('id_token');
            if (value !== null) {
                this.setState({
                    jwt: value,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        } catch (error) {
            console.log(`Erro a ler token \n${error.message}`);
        }
    },


    //Apagar Token
    async deleteJWT() {
        try{
            await AsyncStorage.removeItem('id_token')
                .then(
                    () => {
                        this.setState({
                            jwt: ''
                        })
                    }
                );
        } catch (error) {
            console.log(`Erro a ler token \n${error.message}`);
        }
    }



};

export default deviceStorage;