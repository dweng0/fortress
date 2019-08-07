/**
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "App Name": "applicationName",
          "Passcode": "Passcode",

        }
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

const { t } = useTranslation();
//https://react.i18next.com/guides/the-drawbacks-of-other-i18n-solutions

*/
export const homeContent = {
    bookAppointment: 'Book',
    showBookings: 'My Bookings'
}

export const loginContent = {
    title: `App Name`,
    usePasscode: `Login`,
	useFingerPrint: 'Fingerprint',
	fingerPrintError: `That didn't work, please try again`,
	fingerPrintErrorAlert: `That didn't work, try again?`,
	failedToAuthenticateTitle: 'Failed to authenticate',
	fingerScanPromptTitle: 'Fingerprint Scan',
	fingerScanPromptMessage: 'Place your finger over the touch sensor.',
    loginOptions: 'Choose how you want to login',
    register: 'Register'
}

export const register = {
    title: 'Register',
    smallDescription: 'We are glad you want to register with us. If your GP is signed up to the scheme then you will have recieved a activation code, please enter this now.',
    label: 'Please enter your registration code',
    submit: 'submit',
    birthDate: 'Date of Birth',
    postCode: 'Postcode',
    errorRegistrationCodeMissing: 'Registration code required',
    errorRegistrationCodeIncorrect: 'The registration code was incorrect',
    errorDateOfBirthMissing: 'Date of birth is required',
    errorDateOfBirthIncorrect: 'Date of birth is required',
    errorDateOfBirthPostcodeMissing: 'Postcode is required',
    errorDateOfBirthPostcodeIncorrect: 'Postcode incorrect'
}

export const passcodeLogin = {
    title: `Passcode`
}

export const bookingTypeContent = {
	emergency: 'Emergency',
	scheduled: 'Scheduled'
}

export const emailAndPassword = {
    username: 'Email',
    password: 'Password',
    confirm: 'Confirm password',
    errorEmailIncorrect: 'Email address is incorrect',
    errorPassword: 'Passwords do not match'
}

export default {
    loginTitle: 'Login'
}