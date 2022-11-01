import react from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useFormik} from 'formik';
// import Math from 'Math';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const validate = values => {
  console.log('values', values);
  const errors = {};
  console.log(values.userName, 'xyz');
  if (values.userName === '') {
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

  if (values.confirmPassword && values.confirmPassword === '') {
    errors.confirmPassword = 'Required';
  } else if (values.password != values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  console.log(values.password, values.confirmPassword, 'showbool');

  return errors;
};

const SignUpScreen = ({navigation}) => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: async values => {
      await auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(userCredential => {
          const user = userCredential.user;
          console.log('showUser', user);
          firestore().collection('users').doc(user.uid).set({
            // id: uuidv4()
            id: user.uid,
            Name: values.userName,
            email: values.email,
            password: values.password,
          });
          alert('User account created & signed in!');
          navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }

          console.error(error);
        });
    },
  });

  return (
    <View style={styles.preloader}>
      {/* <Form onSubmit={formik.handleSubmit}> */}

      <TextInput
        style={styles.inputStyle}
        onChangeText={formik.handleChange('userName')}
        onBlur={formik.handleBlur('userName')}
        value={formik.values.userName}
        placeholder="Full Name"
      />
      {formik.errors.userName && formik.touched.userName ? (
        <Text style={styles.errorContainer}>{formik.errors.userName}</Text>
      ) : null}

      <TextInput
        style={styles.inputStyle}
        onChangeText={formik.handleChange('email')}
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
        onChangeText={formik.handleChange('password')}
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
        onChangeText={formik.handleChange('confirmPassword')}
        onBlur={formik.handleBlur('confirmPassword')}
        value={formik.values.confirmPassword}
        secureTextEntry={true}
      />
      {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
        <Text style={styles.errorContainer}>
          {formik.errors.confirmPassword}
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
    // display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
    // fontWeight: 200,
    // alignItems: 'flex-end',
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
    // marginTop: -8,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  preloader: {
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    // position: 'absolute',
    flex: 1,
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
