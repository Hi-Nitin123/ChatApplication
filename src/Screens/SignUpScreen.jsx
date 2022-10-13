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
  console.log(!values.userName, 'sdgfyudgfgfjgsdjhdgf');
  if (values.userName === '') {
    console.log(values, 'sdgfyudgfgfjgsdjhdgf');
    errors.userName = 'Required';
  }

  if (values.email === '') {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.password === '') {
    errors.password = 'Required';
  }

  if (values.consfirmPassword === '') {
    errors.consfirmPassword = 'Required';
  } else if (!values.password === values.consfirmPassword) {
    errors.consfirmPassword = 'Passwords do not match';
  }

  return errors;
};

const SignUpScreen = ({navigation}) => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      consfirmPassword: '',
    },
    validate,
    onSubmit: values => {
      Alert.alert('Congratulations', 'You are logged in successfully');
      navigation.navigate('Login');
    },
  });

  return (
    <View style={styles.preloader}>
      {/* <Form onSubmit={formik.handleSubmit}> */}

      <TextInput
        style={styles.inputStyle}
        onChange={formik.handleChange('userName')}
        onBlur={formik.handleBlur('userName')}
        value={formik.values.userName}
        placeholder="Enter userName"
      />
      {formik.errors.userName && formik.touched.userName ? (
        <Text style={styles.errorContainer}>{formik.errors.userName}</Text>
      ) : null}

      <TextInput
        style={styles.inputStyle}
        onChange={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        value={formik.values.email}
        placeholder="Enter Email"
      />

      {formik.errors.email && formik.touched.email ? (
        <Text style={styles.errorContainer}>{formik.errors.email}</Text>
      ) : null}
      <TextInput
        style={styles.inputStyle}
        type="password"
        placeholder="Enter Password"
        onChange={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
        secureTextEntry={true}
      />
      {formik.errors.password && formik.touched.password ? (
        <Text style={styles.errorContainer}>{formik.errors.password}</Text>
      ) : null}
      <TextInput
        style={styles.inputStyle}
        type="password"
        placeholder="Confirm password"
        onChange={formik.handleChange('consfirmPassword')}
        onBlur={formik.handleBlur('consfirmPassword')}
        value={formik.values.consfirmPassword}
        secureTextEntry={true}
      />
      {formik.errors.consfirmPassword && formik.touched.consfirmPassword ? (
        <Text style={styles.errorContainer}>
          {formik.errors.consfirmPassword}
        </Text>
      ) : null}

      <TouchableOpacity
        type="submit"
        style={styles.signUpButton}
        onPress={formik.handleSubmit}
        disabled={!formik.isValid}>
        <Text style={{color: 'white', fontSize: 20}}>{'Sign Up'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: -10}}>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}>
          {' Already Registered? Click here to login'}
        </Text>
      </TouchableOpacity>

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
    fontWeight: 200,
    alignItems: 'flex-end',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 12,
    fontSize: 15,
    paddingLeft: 15,
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
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  errorContainer: {
    fontSize: 15,
    color: 'red',
    marginTop: -8,
    marginLeft: -300,
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
  signUpButton: {
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
export default SignUpScreen;
