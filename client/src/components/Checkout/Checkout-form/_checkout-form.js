import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  radioGender: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  radioPaymentMethods: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  radioLabel: {
    color: theme.palette.secondary.dark,
  },
  root: {
    '& .MuiRadio-colorSecondary.Mui-checked': {
      color: theme.palette.primary.main
    },
    '&.MuiFormControlLabel-root': {
      textAlign: 'justify'
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.primary.main
    },
    '&.MuiFormLabel-root': {
      color: theme.palette.secondary.dark
    },
    '&.MuiFormLabel-root.Mui-error ': {
      color: theme.palette.error.dark
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.dark,
    },
    '& .MuiFormHelperText-root.Mui-error ': {
      color: theme.palette.error.dark
    }
  },
  labelText: {
    color: theme.palette.secondary.dark
  },
  blockTitle: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.primary.contrastText,
    padding: '10px 20px',
    marginBottom: '10px'
  },
  confirmationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5px 0',
  }
}));

export default useStyles;
