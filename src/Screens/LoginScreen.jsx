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
    onSubmit: values => {
      navigation.navigate('HomePage');
    },
  });

  return (
    <View style={styles.container}>
      {/* <Form onSubmit={formik.handleSubmit}> */}

      <View>
        <TextInput
          style={styles.inputStyle}
          onChange={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          placeholder="Enter Email"
        />
        {console.log(formik.values.email, formik.values.password, 'showerr')}
        {formik.errors.email && formik.touched.email ? (
          <Text style={styles.errorContainer}>{formik.errors.email}</Text>
        ) : null}
        <TextInput
          style={styles.inputStyle}
          dfg
          placeholder="Enter Password"
          onChange={formik.handleChange('password')}
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
