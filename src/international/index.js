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
    smallDescription: 'We are glad you want to register with us. If your GP is signed up to the scheme then you will have recieved a registration code, please enter this now.',
    label: 'Please enter your registration code',
    submit: 'submit'
}

export const passcodeLogin = {
    title: `Passcode`
}

export const bookingTypeContent = {
	emergency: 'Emergency',
	scheduled: 'Scheduled'
}

export default {
    loginTitle: 'Login'
}