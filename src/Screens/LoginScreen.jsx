import react from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Alert,
  Form,
} from 'react-native';
import {useFormik} from 'formik';

import auth from '@react-native-firebase/auth';

const validate = values => {
  console.log('called');
  const errors = {};

  if (values.email === '') {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.password === '') {
    errors.password = 'Required';
  }
  return errors;
};

const LoginScreen = ({navigation}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async values => {
      console.log(values, 'showValues');
      // auth()
      //   .signOut()
      //   .then(() => console.log('User signed out!'));
      await auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(userCredential => {
          const user = userCredential.user;

          navigation.navigate('HomeScreen', {userId: user.uid});
          alert('User logged in successfully');
        })
        .catch(err => {
          console.log(err, 'LoginError');
          alert('Something went wrong');
        });
    },
  });

  return (
    <View style={styles.container}>
      {/* <Form onSubmit={formik.handleSubmit}> */}

      <View>
        <TextInput
          style={styles.inputStyle}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          placeholder="Enter Email"
        />
        {console.log(formik.values.email, formik.values.password, 'values')}
        {formik.errors.email && formik.touched.email ? (
          <Text style={styles.errorContainer}>{formik.errors.email}</Text>
        ) : null}
        <TextInput
          style={styles.inputStyle}
          dfg
          placeholder="Enter Password"
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <Text style={styles.errorContainer}>{formik.errors.password}</Text>
        ) : null}

        <TouchableOpacity
          type="submit"
          style={styles.loginBtn}
          onPress={formik.handleSubmit}
          disabled={!formik.isValid}>
          <Text style={{color: 'white', fontSize: 20}}>{'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: -10}}>
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate('SignUp')}>
            {'Not registered? Click here to Sign up'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* </Form> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },

  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loginBtn: {
    width: 300,
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#3740FE',
    marginLeft: 15,
    marginTop: 40,
  },
});
export default LoginScreen;
